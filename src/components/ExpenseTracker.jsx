import { useState, useMemo } from 'react'
import styles from './ExpenseTracker.module.css'
import PrivacyNotice from './PrivacyNotice'
import { renderPDF } from './pdfExport'

const CATS = [
  { id:'rent',      label:'Rent',          icon:'🏠', color:'#2563eb', budget:2000 },
  { id:'food',      label:'Food',          icon:'🍛', color:'#f59e0b', budget:800  },
  { id:'grocery',   label:'Groceries',     icon:'🛒', color:'#16a34a', budget:500  },
  { id:'transport', label:'Transport',     icon:'🚗', color:'#7c3aed', budget:400  },
  { id:'utilities', label:'Utilities',     icon:'💡', color:'#ef4444', budget:250  },
  { id:'internet',  label:'Internet/SIM',  icon:'📱', color:'#0891b2', budget:130  },
  { id:'health',    label:'Medical',       icon:'🏥', color:'#dc2626', budget:200  },
  { id:'education', label:'School/Kids',   icon:'🎓', color:'#d97706', budget:0    },
  { id:'remit',     label:'Remittance',    icon:'💸', color:'#059669', budget:1000 },
  { id:'savings',   label:'Savings',       icon:'🏦', color:'#0d0d0d', budget:1500 },
  { id:'leisure',   label:'Leisure',       icon:'🎉', color:'#db2777', budget:500  },
  { id:'other',     label:'Other',         icon:'📦', color:'#6b7280', budget:200  },
]

const PROFILES = {
  single:  { label:'🧑 Single',         salary:7000,  budgets:{ rent:1800, food:700, grocery:400, transport:350, utilities:200, internet:120, health:150, education:0, remit:800, savings:1500, leisure:500, other:200 } },
  couple:  { label:'👫 Couple',         salary:14000, budgets:{ rent:2500, food:1200, grocery:800, transport:600, utilities:280, internet:150, health:300, education:0, remit:1500, savings:3000, leisure:800, other:300 } },
  family:  { label:'👨‍👩‍👧 Family',  salary:12000, budgets:{ rent:3000, food:1800, grocery:1000, transport:800, utilities:350, internet:150, health:400, education:500, remit:1000, savings:2000, leisure:600, other:400 } },
}

const MYR_INR = 19.5
const fmt  = n => 'RM ' + Math.round(n).toLocaleString()
const fmtI = n => '₹' + Math.round(n * MYR_INR).toLocaleString()
const fmtN = n => Math.round(n).toLocaleString()

export default function ExpenseTracker() {
  const [salary,   setSalary]   = useState('8000')
  const [profile,  setProfile]  = useState('single')
  const [expenses, setExpenses] = useState(() => {
    const p = PROFILES.single
    return Object.fromEntries(CATS.map(c => [c.id, String(p.budgets[c.id])]))
  })

  const loadProfile = (pKey) => {
    setProfile(pKey)
    const p = PROFILES[pKey]
    setSalary(String(p.salary))
    setExpenses(Object.fromEntries(CATS.map(c => [c.id, String(p.budgets[c.id])])))
  }

  const totals = useMemo(() => {
    const gross = parseFloat(salary) || 0
    const epf   = Math.min(gross * 0.11, 726)
    const socso = Math.min(gross * 0.005, 30)
    const eis   = Math.min(gross * 0.002, 12)
    const annual = gross * 12
    const chargeable = Math.max(0, annual - 9000 - 4000 - 2500)
    let tax = 0
    if (chargeable > 5000)  tax += Math.min(chargeable-5000,15000) * 0.01
    if (chargeable > 20000) tax += Math.min(chargeable-20000,15000) * 0.03
    if (chargeable > 35000) tax += Math.min(chargeable-35000,15000) * 0.08
    if (chargeable > 50000) tax += Math.min(chargeable-50000,20000) * 0.13
    if (chargeable > 70000) tax += Math.min(chargeable-70000,30000) * 0.21
    if (chargeable > 100000) tax += (chargeable-100000) * 0.24
    const pcb = tax / 12
    const takehome = gross - epf - socso - eis - pcb
    const totalExp = CATS.reduce((sum, c) => sum + (parseFloat(expenses[c.id]) || 0), 0)
    const balance  = takehome - totalExp
    const savingsPct = gross > 0 ? ((balance / gross) * 100).toFixed(1) : 0
    return { gross, epf, socso, eis, pcb, takehome, totalExp, balance, savingsPct }
  }, [salary, expenses])

  const setExp = (id, val) => setExpenses(prev => ({...prev, [id]: val}))
  const pct = n => Math.min(100, Math.round((n / totals.takehome) * 100))

  // ── PDF Export ──────────────────────────────────────────────
  const exportPDF = () => {
    const profileLabel = PROFILES[profile]?.label || profile
    renderPDF(
      'Monthly Expense Tracker',
      `${profileLabel} · Salary: ${fmt(totals.gross)}`,
      [
        {
          type: 'summary',
          title: 'Monthly Overview',
          items: [
            { label: 'Gross Salary',  value: fmt(totals.gross),    sub: fmtI(totals.gross) },
            { label: 'Take-Home Pay', value: fmt(totals.takehome), sub: fmtI(totals.takehome) },
            { label: 'Total Expenses',value: fmt(totals.totalExp), sub: fmtI(totals.totalExp) },
            { label: totals.balance >= 0 ? '✅ Monthly Savings' : '⚠️ Overspending',
              value: fmt(Math.abs(totals.balance)),
              sub: fmtI(Math.abs(totals.balance)),
              highlight: true },
          ]
        },
        totals.balance < 0 ? {
          type: 'alert', color: 'red', icon: '⚠️',
          title: `Overspending by ${fmt(Math.abs(totals.balance))} per month`,
          text: 'Your total expenses exceed your take-home pay. Consider reducing discretionary spending or increasing income.'
        } : {
          type: 'alert', color: 'green', icon: '✅',
          title: `Saving ${fmt(totals.balance)}/month (${totals.savingsPct}% savings rate)`,
          text: `Annual savings projection: ${fmt(totals.balance * 12)} (${fmtI(totals.balance * 12)})`
        },
        {
          type: 'table',
          title: '📊 Expense Breakdown',
          headers: [
            { label: 'Category', align: 'left' },
            { label: 'Monthly (RM)', align: 'right', bold: true },
            { label: 'Annual (RM)', align: 'right' },
            { label: 'In INR (₹)', align: 'right' },
            { label: '% of Take-Home', align: 'right' },
          ],
          rows: CATS.map(c => {
            const val = parseFloat(expenses[c.id]) || 0
            const p = totals.takehome > 0 ? ((val / totals.takehome) * 100).toFixed(1) : '0'
            const over = val > c.budget && c.budget > 0
            return [
              `${c.icon} ${c.label}`,
              { value: val > 0 ? `RM ${fmtN(val)}` : '—', color: over ? '#ef4444' : '#0d0d0d' },
              val > 0 ? `RM ${fmtN(val * 12)}` : '—',
              val > 0 ? fmtI(val) : '—',
              val > 0 ? `${p}%` : '—',
            ]
          }).filter((_, i) => (parseFloat(expenses[CATS[i].id]) || 0) > 0)
        },
        {
          type: 'bars',
          title: '📈 Expense Distribution',
          items: CATS.map(c => ({
            icon: c.icon,
            label: c.label,
            value: parseFloat(expenses[c.id]) || 0,
            display: `RM ${fmtN(parseFloat(expenses[c.id]) || 0)}`,
            over: (parseFloat(expenses[c.id]) || 0) > c.budget && c.budget > 0,
          })).filter(i => i.value > 0)
        },
        {
          type: 'keyvalue',
          title: '💰 Salary Deductions',
          items: [
            { label: 'Gross Salary',             value: fmt(totals.gross) },
            { label: 'EPF (11%)',                 value: `− ${fmt(totals.epf)}`,   color: '#dc2626' },
            { label: 'PCB (income tax)',          value: `− ${fmt(totals.pcb)}`,   color: '#dc2626' },
            { label: 'SOCSO (0.5%)',              value: `− ${fmt(totals.socso)}`, color: '#dc2626' },
            { label: 'EIS (0.2%)',                value: `− ${fmt(totals.eis)}`,   color: '#dc2626' },
            { label: 'Net Take-Home',             value: fmt(totals.takehome),    color: '#16a34a', bold: true },
            { label: 'Total Expenses',            value: fmt(totals.totalExp),    color: '#d97706' },
            { label: totals.balance >= 0 ? 'Monthly Balance' : 'Monthly Shortfall',
              value: fmt(Math.abs(totals.balance)),
              color: totals.balance >= 0 ? '#16a34a' : '#dc2626',
              bold: true },
          ]
        },
      ],
      { alert: 'Estimates only. Actual deductions depend on your tax reliefs, EPF contributions, and employer scheme.' }
    )
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.emoji}>🧾</span>
        <div>
          <h1 className={styles.title}>Monthly Expense Tracker</h1>
          <p className={styles.sub}>Budget planner for Indians in Malaysia — 2026</p>
        </div>
        <button className={styles.pdfBtn} onClick={exportPDF}>
          📄 Export PDF
        </button>
      </div>
      <PrivacyNotice />

      {/* Profile quick load */}
      <div className={styles.profiles}>
        <div className={styles.profilesLabel}>Quick load profile:</div>
        {Object.entries(PROFILES).map(([k,p]) => (
          <button key={k} className={`${styles.profileBtn} ${profile===k?styles.profileActive:''}`} onClick={() => loadProfile(k)}>
            {p.label}
          </button>
        ))}
      </div>

      {/* Salary input */}
      <div className={styles.salaryCard}>
        <label>💰 Monthly Gross Salary</label>
        <div className={styles.inputWrap}>
          <span className={styles.prefix}>RM</span>
          <input type="number" value={salary} onChange={e=>setSalary(e.target.value)} placeholder="8000" />
        </div>
        <div className={styles.salaryMeta}>
          Take-home (after EPF+PCB+SOCSO): <strong>{fmt(totals.takehome)}</strong>
          <span>≈ {fmtI(totals.takehome)}</span>
        </div>
      </div>

      {/* Expense inputs */}
      <div className={styles.expGrid}>
        {CATS.map(c => {
          const val = parseFloat(expenses[c.id]) || 0
          const over = val > c.budget && c.budget > 0
          return (
            <div key={c.id} className={`${styles.expCard} ${over ? styles.expOver : ''}`} style={{'--accent': c.color}}>
              <div className={styles.expHeader}>
                <span className={styles.expIcon}>{c.icon}</span>
                <span className={styles.expLabel}>{c.label}</span>
                {c.budget > 0 && <span className={styles.expBudget}>budget: RM{c.budget}</span>}
              </div>
              <div className={styles.expInput}>
                <span className={styles.expPrefix}>RM</span>
                <input
                  type="number"
                  value={expenses[c.id]}
                  onChange={e => setExp(c.id, e.target.value)}
                  placeholder="0"
                />
              </div>
              {val > 0 && (
                <div className={styles.expBar}>
                  <div className={styles.expBarFill} style={{ width: pct(val)+'%', background: c.color }} />
                </div>
              )}
              {val > 0 && <div className={styles.expInr}>{fmtI(val)}/mo</div>}
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <div className={`${styles.summary} ${totals.balance < 0 ? styles.summaryRed : styles.summaryGreen}`}>
        <div className={styles.summaryGrid}>
          {[
            ['Take-Home',   fmt(totals.takehome), '#fff'],
            ['Total Spent', fmt(totals.totalExp), totals.totalExp > totals.takehome ? '#f87171' : '#fbbf24'],
            ['Balance',     fmt(Math.abs(totals.balance)), totals.balance >= 0 ? '#86efac' : '#f87171'],
          ].map(([k,v,col]) => (
            <div key={k} className={styles.summaryItem}>
              <div className={styles.summaryLabel}>{k}</div>
              <div className={styles.summaryVal} style={{color:col}}>{totals.balance < 0 && k==='Balance' ? '−' : ''}{v}</div>
            </div>
          ))}
        </div>
        <div className={styles.summaryBalance}>
          {totals.balance >= 0
            ? `✅ You save ${fmt(totals.balance)}/month (${totals.savingsPct}% savings rate) · Annual: ${fmt(totals.balance*12)}`
            : `⚠️ Overspending by ${fmt(Math.abs(totals.balance))} — reduce expenses`}
        </div>
        <div className={styles.deductRow}>
          {[['EPF',fmt(totals.epf)],['PCB',fmt(totals.pcb)],['SOCSO',fmt(totals.socso)],['EIS',fmt(totals.eis)]].map(([k,v]) => (
            <div key={k} className={styles.deductItem}><span>{k}</span><strong>{v}</strong></div>
          ))}
        </div>
        <button className={styles.pdfBtnSummary} onClick={exportPDF}>
          📄 Export Full Report as PDF
        </button>
      </div>
    </div>
  )
}
