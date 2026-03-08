import { useState, useMemo } from 'react'
import styles from './CarLoanCalc.module.css'
import PrivacyNotice from './PrivacyNotice'

const BANKS = [
  { name:'Maybank', rate:2.95, type:'Conventional' },
  { name:'CIMB',    rate:3.00, type:'Conventional' },
  { name:'Public Bank', rate:2.85, type:'Conventional' },
  { name:'RHB',     rate:2.98, type:'Conventional' },
  { name:'HLB',     rate:2.90, type:'Conventional' },
  { name:'AmBank',  rate:3.05, type:'Conventional' },
]

const CARS = [
  { brand:'Perodua Axia', price:40000,  type:'Perodua', tag:'Most affordable' },
  { brand:'Perodua Bezza', price:48000, type:'Perodua', tag:'Best budget sedan' },
  { brand:'Perodua Myvi',  price:58000, type:'Perodua', tag:'Most popular in MY' },
  { brand:'Perodua Ativa', price:68000, type:'Perodua', tag:'Budget SUV' },
  { brand:'Perodua Alza',  price:75000, type:'Perodua', tag:'Family MPV' },
  { brand:'Proton Saga',   price:45000, type:'Proton',  tag:'Cheapest sedan' },
  { brand:'Proton Iriz',   price:55000, type:'Proton',  tag:'Hatchback' },
  { brand:'Proton X50',    price:90000, type:'Proton',  tag:'Popular SUV' },
  { brand:'Proton X70',    price:115000,type:'Proton',  tag:'Premium SUV' },
  { brand:'Honda City',    price:98000, type:'Japanese',tag:'Top sedan' },
  { brand:'Honda HR-V',    price:125000,type:'Japanese',tag:'SUV favourite' },
  { brand:'Toyota Vios',   price:92000, type:'Japanese',tag:'Reliable sedan' },
  { brand:'Toyota Yaris',  price:88000, type:'Japanese',tag:'Compact' },
  { brand:'Mazda CX-3',    price:132000,type:'Japanese',tag:'Premium compact' },
]

function calcMonthly(principal, annualRate, months) {
  const r = annualRate / 100 / 12
  if (r === 0) return principal / months
  return principal * r * Math.pow(1+r, months) / (Math.pow(1+r, months) - 1)
}

const fmt = n => 'RM ' + Math.round(n).toLocaleString()

export default function CarLoanCalc() {
  const [price,    setPrice]    = useState('80000')
  const [down,     setDown]     = useState('10')
  const [tenure,   setTenure]   = useState('7')
  const [bankIdx,  setBankIdx]  = useState(2)
  const [customRate, setCustomRate] = useState('')
  const [showCars, setShowCars] = useState(false)

  const result = useMemo(() => {
    const p = parseFloat(price) || 0
    const downAmt = p * (parseFloat(down) / 100)
    const loan = p - downAmt
    const rate = customRate ? parseFloat(customRate) : BANKS[bankIdx].rate
    const months = parseInt(tenure) * 12
    const monthly = calcMonthly(loan, rate, months)
    const totalPay = monthly * months
    const totalInterest = totalPay - loan

    // Road tax estimate (based on engine cc, approximated)
    const roadTax = p < 60000 ? 90 : p < 100000 ? 140 : 200
    // Insurance estimate (~3.5% of car value year 1)
    const insurance = Math.round(p * 0.035)
    // Hire purchase stamp duty
    const stampDuty = Math.round(loan * 0.005)

    return { p, downAmt, loan, rate, monthly, totalPay, totalInterest, roadTax, insurance, stampDuty, months }
  }, [price, down, tenure, bankIdx, customRate])

  const downAmt = result.downAmt

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.emoji}>🚗</span>
        <div>
          <h1 className={styles.title}>Car Loan Calculator</h1>
          <p className={styles.sub}>Malaysia 2026 — monthly payment, total cost, best banks</p>
        </div>
      </div>
      <PrivacyNotice />

      {/* Quick Pick */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>🚘 Quick Pick — Popular Cars</div>
        <button className={styles.toggleBtn} onClick={() => setShowCars(!showCars)}>
          {showCars ? '▲ Hide car list' : '▼ Browse cars & prices'}
        </button>
        {showCars && (
          <div className={styles.carGrid}>
            {['Perodua','Proton','Japanese'].map(type => (
              <div key={type}>
                <div className={styles.carType}>{type}</div>
                {CARS.filter(c => c.type === type).map((c,i) => (
                  <div key={i} className={styles.carRow} onClick={() => { setPrice(String(c.price)); setShowCars(false) }}>
                    <span>{c.brand}</span>
                    <span className={styles.carTag}>{c.tag}</span>
                    <span className={styles.carPrice}>RM {c.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Inputs */}
      <div className={styles.inputGrid}>
        <div className={styles.field}>
          <label>🚗 Car Price (RM)</label>
          <div className={styles.inputWrap}>
            <span className={styles.prefix}>RM</span>
            <input type="number" value={price} onChange={e=>setPrice(e.target.value)} placeholder="80000" />
          </div>
        </div>
        <div className={styles.field}>
          <label>💵 Down Payment</label>
          <div className={styles.inputWrap}>
            <input type="number" min="10" max="50" value={down} onChange={e=>setDown(e.target.value)} />
            <span className={styles.suffix}>% = {fmt(downAmt)}</span>
          </div>
        </div>
        <div className={styles.field}>
          <label>🏦 Bank</label>
          <select value={bankIdx} onChange={e=>{ setBankIdx(Number(e.target.value)); setCustomRate('') }}>
            {BANKS.map((b,i) => <option key={i} value={i}>{b.name} — {b.rate}% p.a.</option>)}
          </select>
        </div>
        <div className={styles.field}>
          <label>✏️ Custom Rate (optional)</label>
          <div className={styles.inputWrap}>
            <input type="number" step="0.01" value={customRate} onChange={e=>setCustomRate(e.target.value)} placeholder={`${BANKS[bankIdx].rate}`} />
            <span className={styles.suffix}>% p.a.</span>
          </div>
        </div>
        <div className={styles.field}>
          <label>📅 Loan Tenure</label>
          <select value={tenure} onChange={e=>setTenure(e.target.value)}>
            {[3,5,7,9].map(y => <option key={y} value={y}>{y} years ({y*12} months)</option>)}
          </select>
        </div>
      </div>

      {/* Result */}
      <div className={styles.resultCard}>
        <div className={styles.monthly}>{fmt(result.monthly)}<span>/month</span></div>
        <div className={styles.resultGrid}>
          {[
            ['Loan Amount',    fmt(result.loan)],
            ['Interest Rate',  `${result.rate}% p.a.`],
            ['Tenure',         `${tenure} years`],
            ['Total Interest', fmt(result.totalInterest)],
            ['Total Payment',  fmt(result.totalPay)],
            ['Down Payment',   fmt(result.downAmt)],
          ].map(([k,v]) => (
            <div key={k} className={styles.resultRow}><span>{k}</span><strong>{v}</strong></div>
          ))}
        </div>
      </div>

      {/* First year costs */}
      <div className={styles.costsCard}>
        <div className={styles.costsTitle}>📋 First Year Ownership Costs</div>
        {[
          ['Down Payment',        fmt(result.downAmt),       'One-time'],
          ['Stamp Duty (HP)',     fmt(result.stampDuty),     'One-time'],
          ['Road Tax (est.)',     'RM '+result.roadTax,      '/year'],
          ['Insurance (est.)',    'RM '+result.insurance,    '/year'],
          ['Monthly Instalments', fmt(result.monthly)+' × 12', '/year'],
          ['Total Year 1',        fmt(result.downAmt + result.stampDuty + result.roadTax + result.insurance + result.monthly*12), '⚠️ total outflow'],
        ].map(([k,v,t]) => (
          <div key={k} className={`${styles.costRow} ${k.includes('Total') ? styles.costTotal : ''}`}>
            <span>{k}</span><span>{v} <em>{t}</em></span>
          </div>
        ))}
      </div>

      {/* Bank comparison */}
      <div className={styles.bankTable}>
        <div className={styles.costsTitle}>🏦 All Banks Comparison (same loan)</div>
        <table>
          <thead><tr><th>Bank</th><th>Rate</th><th>Monthly</th><th>Total Interest</th></tr></thead>
          <tbody>
            {BANKS.map((b,i) => {
              const m = calcMonthly(result.loan, b.rate, result.months)
              const ti = m * result.months - result.loan
              return (
                <tr key={i} className={i === bankIdx && !customRate ? styles.activeBank : ''}>
                  <td>{b.name}</td>
                  <td>{b.rate}%</td>
                  <td><strong>{fmt(m)}</strong></td>
                  <td>{fmt(ti)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className={styles.tips}>
        {['💡 EP holders can buy cars — banks require EP + 3 months payslip + employment letter',
          '🏦 Public Bank typically offers lowest rates — apply there first',
          '🚗 Perodua Myvi resale value is best — easy to sell when leaving Malaysia',
          '📋 New car: pay booking fee RM 500–2,000, rest on loan approval',
          '⚠️ Monthly car + insurance + parking should not exceed 20% of take-home pay'
        ].map((t,i) => <div key={i} className={styles.tip}>{t}</div>)}
      </div>
    </div>
  )
}
