import { useState, useMemo } from 'react'
import { renderPDF } from './pdfExport'
import styles from './PCBCalc.module.css'
import PrivacyNotice from './PrivacyNotice'

// PCB (Potongan Cukai Berjadual) — Monthly tax deduction
// Based on LHDN PCB Schedule 2026 (unchanged from 2024)
const BRACKETS = [
  { min:0,      max:5000,    rate:0,    base:0      },
  { min:5001,   max:20000,   rate:0.01, base:0      },
  { min:20001,  max:35000,   rate:0.03, base:150    },
  { min:35001,  max:50000,   rate:0.08, base:600    },
  { min:50001,  max:70000,   rate:0.13, base:1800   },
  { min:70001,  max:100000,  rate:0.21, base:4400   },
  { min:100001, max:130000,  rate:0.24, base:10700  },
  { min:130001, max:250000,  rate:0.245,base:17900  },
  { min:250001, max:400000,  rate:0.25, base:47250  },
  { min:400001, max:600000,  rate:0.26, base:84750  },
  { min:600001, max:1000000, rate:0.28, base:136750 },
  { min:1000001,max:Infinity,rate:0.30, base:248750 },
]

const EPF_EMP = 0.11
const SOCSO_RATE = 0.005
const EIS_RATE   = 0.002

function calcTax(chargeable) {
  if (chargeable <= 0) return 0
  for (const b of BRACKETS) {
    if (chargeable <= b.max) return b.base + (chargeable - b.min + 1) * b.rate
  }
  return 0
}

const fmt  = n => 'RM ' + Math.max(0,n).toLocaleString('en-MY', {minimumFractionDigits:2, maximumFractionDigits:2})
const fmtN = n => Math.max(0,Math.round(n)).toLocaleString()

export default function PCBCalc() {
  const [salary,    setSalary]    = useState('8000')
  const [resident,  setResident]  = useState('yes')
  const [married,   setMarried]   = useState('no')
  const [children,  setChildren]  = useState('0')
  const [epfSelf,   setEpfSelf]   = useState('yes')
  const [otherRelief, setOtherRelief] = useState('0')

  const result = useMemo(() => {
    const gross = parseFloat(salary) || 0
    const isResident = resident === 'yes'
    const isMarried  = married === 'yes'
    const kids = parseInt(children) || 0

    if (!isResident) {
      const tax = gross * 12 * 0.30 / 12
      const epf   = Math.min(gross * EPF_EMP, 6600 * EPF_EMP)
      const socso = Math.min(gross * SOCSO_RATE, 30)
      const eis   = Math.min(gross * EIS_RATE, 12)
      const takehome = gross - tax - epf - socso - eis
      return { gross, tax, epf, socso, eis, takehome, annualTax: tax*12, isResident: false, bracketInfo: '30% flat (non-resident)' }
    }

    const annual = gross * 12
    // Standard reliefs
    const selfRelief   = 9000  // personal relief
    const spouseRelief = isMarried ? 4000 : 0
    const childRelief  = kids * 2000   // RM 2,000 per child under 18
    const epfRelief    = epfSelf === 'yes' ? Math.min(gross * EPF_EMP * 12, 4000) : 0
    const lifeIns      = Math.min(3000, 3000) // assume max life insurance
    const medical      = 8000  // SSPN + medical relief standard
    const lifestyle    = 2500
    const extraRelief  = parseFloat(otherRelief) || 0

    const totalRelief = selfRelief + spouseRelief + childRelief + epfRelief + lifeIns + lifestyle + extraRelief
    const chargeable  = Math.max(0, annual - totalRelief)
    const annualTax   = calcTax(chargeable)
    const monthlyTax  = annualTax / 12

    // EPF, SOCSO, EIS deductions
    const epf   = epfSelf === 'yes' ? Math.min(gross * EPF_EMP, 6600 * EPF_EMP) : 0
    const socso = Math.min(gross * SOCSO_RATE, 30)
    const eis   = Math.min(gross * EIS_RATE, 12)

    const totalDeduct = monthlyTax + epf + socso + eis
    const takehome    = gross - totalDeduct

    // Find bracket
    let bracketInfo = '0%'
    for (const b of BRACKETS) {
      if (chargeable <= b.max) { bracketInfo = `${(b.rate*100).toFixed(0)}% bracket`; break }
    }

    return {
      gross, monthlyTax, annualTax, epf, socso, eis, totalDeduct,
      takehome, chargeable, totalRelief, annual, bracketInfo, isResident: true,
      selfRelief, spouseRelief, childRelief, epfRelief, lifeIns, lifestyle
    }
  }, [salary, resident, married, children, epfSelf, otherRelief])

  const pct = (n, total) => ((n / total) * 100).toFixed(1)


  const exportPDF = () => {
    const res = result
    renderPDF(
      'PCB Monthly Tax Calculator',
      `Salary: RM ${Number(salary).toLocaleString()} · ${res.isResident ? 'Tax Resident' : 'Non-Resident'}`,
      [
        { type:'summary', title:'Monthly Deductions', items:[
          { label:'Gross Salary',  value:`RM ${Math.round(res.gross).toLocaleString()}` },
          { label:'EPF (11%)',     value:`RM ${Math.round(res.epf).toLocaleString()}` },
          { label:'SOCSO+EIS',     value:`RM ${Math.round(res.socso+res.eis).toLocaleString()}` },
          { label:'PCB Tax',       value:`RM ${Math.round(res.tax).toLocaleString()}`, highlight:true },
        ]},
        { type:'keyvalue', title:'Full Breakdown', items:[
          { label:'Gross Monthly Salary',  value:`RM ${Math.round(res.gross).toLocaleString()}` },
          { label:'EPF Deduction (11%)',   value:`− RM ${Math.round(res.epf).toLocaleString()}`,   color:'#dc2626' },
          { label:'SOCSO (0.5%)',          value:`− RM ${Math.round(res.socso).toLocaleString()}`,  color:'#dc2626' },
          { label:'EIS (0.2%)',            value:`− RM ${Math.round(res.eis).toLocaleString()}`,    color:'#dc2626' },
          { label:'PCB Income Tax',        value:`− RM ${Math.round(res.tax).toLocaleString()}`,    color:'#dc2626' },
          { label:'Net Take-Home Pay',     value:`RM ${Math.round(res.takehome).toLocaleString()}`, color:'#16a34a', bold:true },
          { label:'Annual Tax (×12)',      value:`RM ${Math.round(res.annualTax).toLocaleString()}` },
        ]},
      ],
      { alert:'PCB is an estimate. Actual deduction depends on reliefs declared with employer (Form TP1).' }
    )
  }
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.emoji}>📊</span>
        <div>
          <h1 className={styles.title}>PCB Monthly Tax Calculator</h1>
          <button className={styles.pdfBtn} onClick={exportPDF}>📄 Export PDF</button>
          <p className={styles.sub}>Exact monthly tax deduction (Potongan Cukai Berjadual) — 2026</p>
        </div>
      </div>
      <PrivacyNotice />

      <div className={styles.inputCard}>
        <div className={styles.inputGrid}>
          <div className={styles.field}>
            <label>💰 Monthly Gross Salary (RM)</label>
            <div className={styles.inputWrap}>
              <span className={styles.prefix}>RM</span>
              <input type="number" value={salary} onChange={e=>setSalary(e.target.value)} placeholder="8000" />
            </div>
          </div>
          <div className={styles.field}>
            <label>🌏 Tax Residency Status</label>
            <select value={resident} onChange={e=>setResident(e.target.value)}>
              <option value="yes">Resident (182+ days in Malaysia)</option>
              <option value="no">Non-Resident (less than 182 days)</option>
            </select>
          </div>
          <div className={styles.field}>
            <label>💍 Marital Status</label>
            <select value={married} onChange={e=>setMarried(e.target.value)}>
              <option value="no">Single</option>
              <option value="yes">Married</option>
            </select>
          </div>
          <div className={styles.field}>
            <label>👶 Children (under 18)</label>
            <select value={children} onChange={e=>setChildren(e.target.value)}>
              {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n} {n===1?'child':'children'}</option>)}
            </select>
          </div>
          <div className={styles.field}>
            <label>📈 EPF Contribution</label>
            <select value={epfSelf} onChange={e=>setEpfSelf(e.target.value)}>
              <option value="yes">Yes — 11% deducted</option>
              <option value="no">No EPF</option>
            </select>
          </div>
          <div className={styles.field}>
            <label>🧾 Extra Annual Relief (RM)</label>
            <div className={styles.inputWrap}>
              <span className={styles.prefix}>RM</span>
              <input type="number" value={otherRelief} onChange={e=>setOtherRelief(e.target.value)} placeholder="0" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Result */}
      <div className={styles.resultCard}>
        <div className={styles.resultTop}>
          <div className={styles.takeHome}>
            <div className={styles.takeLabel}>Take-Home Pay</div>
            <div className={styles.takeAmt}>{fmt(result.takehome)}</div>
            <div className={styles.takeSub}>per month</div>
          </div>
          <div className={styles.pcbBox}>
            <div className={styles.pcbLabel}>PCB (Tax Deduction)</div>
            <div className={styles.pcbAmt}>{fmt(result.isResident ? result.monthlyTax : result.tax)}</div>
            <div className={styles.pcbBracket}>{result.bracketInfo}</div>
          </div>
        </div>

        {/* Deduction breakdown bar */}
        <div className={styles.barLabel}>Monthly Deductions Breakdown</div>
        <div className={styles.barTrack}>
          {[
            { label:'PCB Tax', val: result.isResident ? result.monthlyTax : result.tax, color:'#ef4444' },
            { label:'EPF 11%', val: result.epf,   color:'#2563eb' },
            { label:'SOCSO',   val: result.socso, color:'#7c3aed' },
            { label:'EIS',     val: result.eis,   color:'#f59e0b' },
          ].map((d,i) => (
            <div key={i} className={styles.barSeg} style={{ width: pct(d.val, result.gross)+'%', background: d.color }} title={`${d.label}: ${fmt(d.val)}`} />
          ))}
        </div>
        <div className={styles.barLegend}>
          {[
            { label:'PCB Tax', val: result.isResident ? result.monthlyTax : result.tax, color:'#ef4444' },
            { label:'EPF 11%', val: result.epf,   color:'#2563eb' },
            { label:'SOCSO',   val: result.socso, color:'#7c3aed' },
            { label:'EIS',     val: result.eis,   color:'#f59e0b' },
          ].map((d,i) => (
            <div key={i} className={styles.legendItem}>
              <span style={{background:d.color}} />
              {d.label}: <strong>{fmt(d.val)}</strong>
            </div>
          ))}
        </div>

        {/* Full table */}
        <div className={styles.tableRows}>
          {[
            ['Gross Salary',     fmt(result.gross),     ''],
            ['PCB Tax',          fmt(result.isResident ? result.monthlyTax : result.tax), '− deducted'],
            ['EPF (11%)',        fmt(result.epf),       '− deducted'],
            ['SOCSO',            fmt(result.socso),     '− deducted'],
            ['EIS (0.2%)',       fmt(result.eis),       '− deducted'],
            ['Take-Home',        fmt(result.takehome),  '✅ net salary'],
          ].map(([k,v,t]) => (
            <div key={k} className={`${styles.tableRow} ${k==='Take-Home'?styles.totalRow:''}`}>
              <span>{k}</span><span>{v} <em>{t}</em></span>
            </div>
          ))}
        </div>
      </div>

      {/* Relief breakdown - residents only */}
      {result.isResident && (
        <div className={styles.reliefCard}>
          <div className={styles.reliefTitle}>🧾 Standard Reliefs Applied (Annual)</div>
          {[
            ['Personal Relief',   fmt(result.selfRelief)],
            ['Spouse Relief',     fmt(result.spouseRelief)],
            ['Child Relief',      fmt(result.childRelief)],
            ['EPF Relief',        fmt(result.epfRelief)],
            ['Life Insurance',    fmt(result.lifeIns)],
            ['Lifestyle Relief',  fmt(result.lifestyle)],
            ['Extra Relief',      fmt(parseFloat(otherRelief)||0)],
            ['Total Relief',      fmt(result.totalRelief)],
            ['Chargeable Income', fmt(result.chargeable)],
            ['Annual Tax',        fmt(result.annualTax)],
          ].map(([k,v]) => (
            <div key={k} className={`${styles.reliefRow} ${k.includes('Total')||k.includes('Annual')||k.includes('Chargeable')?styles.reliefBold:''}`}>
              <span>{k}</span><strong>{v}</strong>
            </div>
          ))}
        </div>
      )}

      <div className={styles.tips}>
        {['💡 PCB is deducted monthly by your employer — your annual tax return adjusts for the exact amount',
          '📋 Submit EA Form from employer + file e-Filing on LHDN by April 30 each year',
          '💰 If PCB deducted > actual tax = you get a REFUND. File early to get refund faster',
          '🧾 More reliefs = lower PCB = higher take-home pay every month',
          '📱 LHDN MyTax app — check your PCB and file return on mobile'
        ].map((t,i) => <div key={i} className={styles.tip}>{t}</div>)}
      </div>
    </div>
  )
}
