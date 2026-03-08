import { useState, useMemo } from 'react'
import { renderPDF } from './pdfExport'
import styles from './HomeLoanCalc.module.css'
import PrivacyNotice from './PrivacyNotice'

// Rates as of early 2026 (OPR 3.00%, BLR 6.85%)
const BANKS = [
  { name:'Maybank',      rate:4.30 }, { name:'CIMB',        rate:4.35 }, { name:'Public Bank', rate:4.25 },
  { name:'RHB',          rate:4.40 }, { name:'HLB',         rate:4.33 }, { name:'AmBank',      rate:4.45 },
]

function calcMonthly(p, annualRate, months) {
  const r = annualRate / 100 / 12
  if (r === 0) return p / months
  return p * r * Math.pow(1+r, months) / (Math.pow(1+r, months) - 1)
}

export default function HomeLoanCalc() {
  const [salary,    setSalary]    = useState('')
  const [price,     setPrice]     = useState('')
  const [downPct,   setDownPct]   = useState('10')
  const [tenure,    setTenure]    = useState('30')
  const [rate,      setRate]      = useState('4.35')

  const result = useMemo(() => {
    const sal    = parseFloat(salary) || 0
    const pr     = parseFloat(price) || 0
    const down   = pr * (parseFloat(downPct) / 100)
    const loan   = pr - down
    const mths   = parseInt(tenure) * 12
    const monthly= calcMonthly(loan, parseFloat(rate)||4.35, mths)
    const dsr    = sal > 0 ? (monthly / sal) * 100 : 0
    const maxLoan= sal * 0.70 * 12 * parseInt(tenure) * 0.7
    const eligible= dsr <= 70
    const totalPay = monthly * mths
    const interest = totalPay - loan
    return { down, loan, monthly, dsr, eligible, maxLoan, totalPay, interest, pr }
  }, [salary, price, downPct, tenure, rate])

  const fmt = n => `RM ${Math.round(n||0).toLocaleString()}`


  // const exportPDF = () => {
  //   const r = result
  //   renderPDF(
  //     'Home Loan Calculator',
  //     `Property: RM ${(parseFloat(price)||0).toLocaleString()} · ${tenure} years`,
  //     [
  //       { type:'summary', title:'Loan Summary', items:[
  //         { label:'Property Price',  value:`RM ${Math.round(r.pr||parseFloat(price)||0).toLocaleString()}` },
  //         { label:'Loan Amount',     value:`RM ${Math.round(r.loan).toLocaleString()}` },
  //         { label:'Monthly Payment', value:`RM ${Math.round(r.monthly).toLocaleString()}`, highlight:true },
  //         { label:'DSR Ratio',       value:`${(r.dsr||0).toFixed(1)}%` },
  //       ]},
  //       { type:'keyvalue', title:'Full Details', items:[
  //         { label:'Property Price',    value:`RM ${Math.round(r.pr||0).toLocaleString()}` },
  //         { label:'Down Payment',      value:`RM ${Math.round(r.down).toLocaleString()}` },
  //         { label:'Loan Amount (90%)', value:`RM ${Math.round(r.loan).toLocaleString()}` },
  //         { label:'Tenure',            value:`${tenure} years` },
  //         { label:'Monthly Instalment',value:`RM ${Math.round(r.monthly).toLocaleString()}`, bold:true },
  //         { label:'Total Payment',     value:`RM ${Math.round(r.totalPay).toLocaleString()}` },
  //         { label:'Total Interest',    value:`RM ${Math.round(r.interest).toLocaleString()}`, color:'#dc2626' },
  //         { label:'DSR Ratio',         value:`${(r.dsr||0).toFixed(1)}%`, color: r.eligible ? '#16a34a' : '#dc2626' },
  //         { label:'Loan Eligibility',  value: r.eligible ? '✅ Likely Eligible' : '⚠️ May Not Qualify', color: r.eligible ? '#16a34a' : '#dc2626', bold:true },
  //       ]},
  //     ],
  //     { alert:'DSR (Debt Service Ratio) should be below 60-70% for loan approval. Rates based on BLR 6.85% (2026).' }
  //   )
  // }

  const exportPDF = () => {
    const r = result
    renderPDF(
      'Home Loan Calculator',
      `Property: RM ${(parseFloat(price)||0).toLocaleString()} · ${tenure} years`,
      [
        { type:'summary', title:'Loan Summary', items:[
          { label:'Loan Amount',    value:`RM ${Math.round(r.loan).toLocaleString()}` },
          { label:'Monthly Pay',    value:`RM ${Math.round(r.monthly).toLocaleString()}`, highlight:true },
          { label:'Total Interest', value:`RM ${Math.round(r.interest).toLocaleString()}` },
          { label:'DSR',            value:`${(r.dsr||0).toFixed(1)}%` },
        ]},
        { type:'keyvalue', title:'Full Details', items:[
          { label:'Property Price',    value:`RM ${Math.round(r.pr||0).toLocaleString()}` },
          { label:'Down Payment',      value:`RM ${Math.round(r.down).toLocaleString()}` },
          { label:'Loan Amount',       value:`RM ${Math.round(r.loan).toLocaleString()}` },
          { label:'Monthly Instalment',value:`RM ${Math.round(r.monthly).toLocaleString()}`, bold:true },
          { label:'Total Payment',     value:`RM ${Math.round(r.totalPay).toLocaleString()}` },
          { label:'Total Interest',    value:`RM ${Math.round(r.interest).toLocaleString()}`, color:'#dc2626' },
          { label:'DSR Ratio',         value:`${(r.dsr||0).toFixed(1)}%` },
          { label:'Eligibility',       value: r.eligible ? '✅ Likely Eligible' : '⚠️ Review', color: r.eligible ? '#16a34a' : '#dc2626', bold:true },
        ]},
      ],
      { alert:'DSR should be below 60-70% for loan approval.' }
    )
  }
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.headerEmoji}>🏡</span>
        <div>
          <h1 className={styles.headerTitle}>Home Loan Eligibility</h1>
          <button className={styles.pdfBtn} onClick={exportPDF}>📄 Export PDF</button>
        <p className={styles.headerDesc}>DSR calculator + monthly instalment for Malaysian bank loans</p>
        </div>
      </div>
      <PrivacyNotice />
      <div className={styles.inputCard}>
        <div className={styles.grid}>
          {[
            { l:'💰 Monthly Gross Salary (RM)', v:salary, s:setSalary, p:'e.g. 8000', pre:'RM' },
            { l:'🏠 Property Price (RM)',        v:price,  s:setPrice,  p:'e.g. 500000', pre:'RM' },
          ].map(f=>(
            <div key={f.l} className={styles.field}>
              <label>{f.l}</label>
              <div className={styles.inputWrap}>
                <span className={styles.prefix}>{f.pre}</span>
                <input type="number" min="0" value={f.v} onChange={e=>f.s(e.target.value)} placeholder={f.p} />
              </div>
            </div>
          ))}
          <div className={styles.field}>
            <label>📊 Down Payment: {downPct}%</label>
            <input type="range" min="10" max="30" step="5" value={downPct} onChange={e=>setDownPct(e.target.value)} className={styles.slider} />
            <div className={styles.sliderMeta}><span>10% (min)</span><span>30%</span></div>
          </div>
          <div className={styles.field}>
            <label>📅 Loan Tenure: {tenure} years</label>
            <input type="range" min="5" max="35" step="5" value={tenure} onChange={e=>setTenure(e.target.value)} className={styles.slider} />
            <div className={styles.sliderMeta}><span>5 yrs</span><span>35 yrs</span></div>
          </div>
        </div>
        <div className={styles.bankRow}>
          {BANKS.map(b=>(
            <button key={b.name} className={`${styles.bankBtn} ${rate==b.rate.toString()?styles.bankActive:''}`} onClick={()=>setRate(b.rate.toString())}>
              <span>{b.name}</span><span>{b.rate}%</span>
            </button>
          ))}
        </div>
      </div>
      {salary && price && (
        <>
          <div className={`${styles.eligCard} ${result.eligible?styles.eligGood:styles.eligBad}`}>
            <span className={styles.eligEmoji}>{result.eligible?'✅':'❌'}</span>
            <div>
              <div className={styles.eligTitle}>{result.eligible?'Likely Eligible':'DSR Too High'}</div>
              <div className={styles.eligSub}>Your DSR: <strong>{result.dsr.toFixed(1)}%</strong> (max 70% for most banks)</div>
            </div>
          </div>
          <div className={styles.resultsGrid}>
            {[
              ['Down Payment',    fmt(result.down),        ''],
              ['Loan Amount',     fmt(result.loan),        ''],
              ['Monthly Install.', fmt(result.monthly),   'highlight'],
              ['DSR Ratio',       result.dsr.toFixed(1)+'%', result.dsr<=70?'green':'red'],
              ['Total Payable',   fmt(result.totalPay),   ''],
              ['Interest Paid',   fmt(result.interest),   ''],
            ].map(([l,v,c])=>(
              <div key={l} className={`${styles.resCard} ${styles[c]||''}`}>
                <div className={styles.resVal}>{v}</div>
                <div className={styles.resLabel}>{l}</div>
              </div>
            ))}
          </div>
          <div className={styles.note}>💡 <strong>For Indians:</strong> Non-citizens can buy most properties but may need a minimum price floor (varies by state, typically RM 1M in KL). Permanent Residents (PR) get same rates as citizens. Check with a banker for full eligibility.</div>
        </>
      )}
    </div>
  )
}
