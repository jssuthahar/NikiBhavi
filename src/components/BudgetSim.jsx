import { useState, useMemo } from 'react'
import styles from './BudgetSim.module.css'
import { renderPDF } from './pdfExport'

// ── Constants ──────────────────────────────────────────────────
const MYR_INR = 19.5
const fmt  = n => 'RM ' + Math.abs(Math.round(n)).toLocaleString()
const fmtI = n => '₹'  + Math.round(Math.abs(n) * MYR_INR).toLocaleString()
const fmtN = n => Math.round(Math.abs(n)).toLocaleString()

const SCENARIOS = {
  fresh:   { label:'🛫 Fresh Arrival',     salary:5000,  rent:1500, food:700, transport:300, savings:0,    remit:500,  others:500,  years:3,  growth:5,  desc:'Just starting out in Malaysia' },
  settled: { label:'💼 Settled EP Holder', salary:9000,  rent:2200, food:900, transport:400, savings:1500, remit:1500, others:800,  years:5,  growth:7,  desc:'2–3 years experience, stable life' },
  senior:  { label:'🏆 Senior / Manager',  salary:18000, rent:3500, food:1200,transport:600, savings:5000, remit:3000, others:1500, years:10, growth:8,  desc:'Senior role, building wealth' },
  family:  { label:'👨‍👩‍👧 Family in KL', salary:12000, rent:3200, food:2000, transport:800, savings:2000, remit:1000, others:1200, years:5,  growth:6,  desc:'Family with kids, school expenses' },
}

const GOALS = [
  { id:'emergency', label:'Emergency Fund',     target: s => s * 6,         icon:'🛡️', desc:'6 months expenses' },
  { id:'india_trip',label:'India Trip (family)', target: () => 8000,         icon:'✈️', desc:'Round-trip flights + expenses' },
  { id:'car',       label:'Car Down Payment',   target: () => 5000,         icon:'🚗', desc:'10% of RM 50k car' },
  { id:'house',     label:'House Down Payment', target: () => 50000,        icon:'🏠', desc:'10% of RM 500k condo' },
  { id:'pr_corpus', label:'PR Corpus (5 yrs)',  target: s => s * 12 * 0.2 * 5, icon:'🛂', desc:'20% savings × 5 years' },
]

function calcPCB(gross) {
  const epf   = Math.min(gross * 0.11, 726)
  const socso = Math.min(gross * 0.005, 30)
  const eis   = Math.min(gross * 0.002, 12)
  const annual = gross * 12
  const chargeable = Math.max(0, annual - 9000 - 4000 - 2500)
  let tax = 0
  if (chargeable > 5000)   tax += Math.min(chargeable-5000,  15000) * 0.01
  if (chargeable > 20000)  tax += Math.min(chargeable-20000, 15000) * 0.03
  if (chargeable > 35000)  tax += Math.min(chargeable-35000, 15000) * 0.08
  if (chargeable > 50000)  tax += Math.min(chargeable-50000, 20000) * 0.13
  if (chargeable > 70000)  tax += Math.min(chargeable-70000, 30000) * 0.21
  if (chargeable > 100000) tax += (chargeable-100000) * 0.24
  const pcb = tax / 12
  return { epf, socso, eis, pcb, takehome: gross - epf - socso - eis - pcb }
}

const TABS = ['💰 Income', '🏠 Expenses', '📈 Growth', '🎯 Goals', '📊 Report']

export default function BudgetSim() {
  const [tab,       setTab]       = useState(0)
  const [scenario,  setScenario]  = useState('settled')

  // Income
  const [salary,    setSalary]    = useState('9000')
  const [bonus,     setBonus]     = useState('1')      // months bonus
  const [epfopt,    setEpfopt]    = useState('11')     // EPF %

  // Expenses
  const [rent,      setRent]      = useState('2200')
  const [food,      setFood]      = useState('900')
  const [transport, setTransport] = useState('400')
  const [utilities, setUtilities] = useState('250')
  const [insurance, setInsurance] = useState('200')
  const [education, setEducation] = useState('0')
  const [remit,     setRemit]     = useState('1500')
  const [leisure,   setLeisure]   = useState('500')
  const [others,    setOthers]    = useState('800')

  // Growth
  const [years,     setYears]     = useState('5')
  const [growth,    setGrowth]    = useState('7')    // annual salary growth %
  const [epfDiv,    setEpfDiv]    = useState('5.5')  // EPF dividend %

  const loadScenario = (key) => {
    const s = SCENARIOS[key]
    setScenario(key)
    setSalary(String(s.salary));   setBonus('1');         setEpfopt('11')
    setRent(String(s.rent));       setFood(String(s.food));  setTransport(String(s.transport))
    setUtilities('250');           setInsurance('200');   setEducation('0')
    setRemit(String(s.remit));     setLeisure('500');     setOthers(String(s.others))
    setYears(String(s.years));     setGrowth(String(s.growth)); setEpfDiv('5.5')
  }

  const result = useMemo(() => {
    const gross = parseFloat(salary) || 0
    const { epf, socso, eis, pcb, takehome } = calcPCB(gross)
    const bonusAmt = gross * (parseFloat(bonus) || 0)

    const expenses = {
      rent:      parseFloat(rent)      || 0,
      food:      parseFloat(food)      || 0,
      transport: parseFloat(transport) || 0,
      utilities: parseFloat(utilities) || 0,
      insurance: parseFloat(insurance) || 0,
      education: parseFloat(education) || 0,
      remit:     parseFloat(remit)     || 0,
      leisure:   parseFloat(leisure)   || 0,
      others:    parseFloat(others)    || 0,
    }
    const totalExp = Object.values(expenses).reduce((a, b) => a + b, 0)
    const monthlySavings = takehome - totalExp
    const annualSavings  = monthlySavings * 12 + bonusAmt
    const savingsPct     = gross > 0 ? ((monthlySavings / takehome) * 100).toFixed(1) : 0

    const yr  = parseFloat(years)  || 5
    const gr  = parseFloat(growth) / 100 || 0
    const div = parseFloat(epfDiv) / 100 || 0.055

    // Year-by-year projection
    let cumSavings = 0, epfCorpus = 0, totalEpfContrib = 0
    const projection = Array.from({ length: yr }, (_, i) => {
      const y     = i + 1
      const ySal  = gross * Math.pow(1 + gr, i)
      const yDeduct = calcPCB(ySal)
      const yTH   = yDeduct.takehome
      const yExp  = totalExp * Math.pow(1.04, i) // 4% annual inflation
      const yMSav = yTH - yExp
      const yASav = yMSav * 12 + (ySal * (parseFloat(bonus) || 0))
      cumSavings += yASav
      // EPF grows with interest
      const epfMonthly = yDeduct.epf + Math.min(ySal * 0.13, ySal * 0.13)
      totalEpfContrib += epfMonthly * 12
      epfCorpus = epfCorpus * (1 + div) + epfMonthly * 12
      return { year: y, salary: Math.round(ySal), takehome: Math.round(yTH), expenses: Math.round(yExp), savings: Math.round(yMSav), cumSavings: Math.round(cumSavings) }
    })

    // Goal timelines
    const goalResults = GOALS.map(g => {
      const target = g.target(totalExp)
      const mths = monthlySavings > 0 ? Math.ceil(target / monthlySavings) : 999
      return { ...g, target, months: mths, achievable: mths < 999 }
    })

    return {
      gross, epf, socso, eis, pcb, takehome, bonusAmt,
      expenses, totalExp, monthlySavings, annualSavings, savingsPct,
      projection, epfCorpus, totalEpfContrib, yr,
      goalResults,
    }
  }, [salary, bonus, epfopt, rent, food, transport, utilities, insurance, education, remit, leisure, others, years, growth, epfDiv])

  // ── PDF Export ──────────────────────────────────────────────
  const exportPDF = () => {
    const r = result
    const scenLabel = SCENARIOS[scenario]?.label || scenario
    renderPDF(
      'Budget Simulator Report',
      `${scenLabel} · ${r.yr}-Year Plan · Generated ${new Date().toLocaleDateString('en-MY')}`,
      [
        {
          type: 'summary', title: 'Monthly Snapshot',
          items: [
            { label: 'Gross Salary',     value: fmt(r.gross),           sub: fmtI(r.gross) },
            { label: 'Take-Home Pay',    value: fmt(r.takehome),        sub: fmtI(r.takehome) },
            { label: 'Total Expenses',   value: fmt(r.totalExp),        sub: fmtI(r.totalExp) },
            { label: r.monthlySavings >= 0 ? '✅ Monthly Savings' : '⚠️ Shortfall',
              value: fmt(r.monthlySavings), sub: `${r.savingsPct}% savings rate`, highlight: true },
          ]
        },
        r.monthlySavings < 0 ? {
          type:'alert', color:'red', icon:'⚠️',
          title:`Spending RM ${fmtN(-r.monthlySavings)} more than take-home each month`,
          text:'Reduce rent, remittance, or discretionary spending to achieve a positive savings balance.'
        } : {
          type:'alert', color:'green', icon:'✅',
          title:`Saving RM ${fmtN(r.monthlySavings)}/month — Annual savings: RM ${fmtN(r.annualSavings)}`,
          text:`Including annual bonus. Over ${r.yr} years you could accumulate RM ${fmtN(r.projection[r.yr-1]?.cumSavings||0)} in savings alone.`
        },
        {
          type: 'keyvalue', title: '💰 Income & Deductions',
          items: [
            { label:'Gross Monthly Salary',  value: fmt(r.gross) },
            { label:'EPF Deduction (11%)',   value:`− ${fmt(r.epf)}`,   color:'#dc2626' },
            { label:'PCB Income Tax',        value:`− ${fmt(r.pcb)}`,   color:'#dc2626' },
            { label:'SOCSO + EIS',           value:`− ${fmt(r.socso+r.eis)}`, color:'#dc2626' },
            { label:'Net Take-Home',         value: fmt(r.takehome),    color:'#16a34a', bold:true },
            { label:'Annual Bonus',          value: fmt(r.bonusAmt),    color:'#2563eb' },
          ]
        },
        {
          type: 'bars', title: '🏠 Monthly Expense Breakdown',
          items: [
            { icon:'🏠', label:'Rent',          value: r.expenses.rent,      display: fmt(r.expenses.rent) },
            { icon:'🍛', label:'Food',           value: r.expenses.food,      display: fmt(r.expenses.food) },
            { icon:'🚗', label:'Transport',      value: r.expenses.transport, display: fmt(r.expenses.transport) },
            { icon:'💡', label:'Utilities',      value: r.expenses.utilities, display: fmt(r.expenses.utilities) },
            { icon:'🏥', label:'Insurance',      value: r.expenses.insurance, display: fmt(r.expenses.insurance) },
            { icon:'🎓', label:'Education',      value: r.expenses.education, display: fmt(r.expenses.education) },
            { icon:'💸', label:'Remittance',     value: r.expenses.remit,     display: fmt(r.expenses.remit) },
            { icon:'🎉', label:'Leisure',        value: r.expenses.leisure,   display: fmt(r.expenses.leisure) },
            { icon:'📦', label:'Others',         value: r.expenses.others,    display: fmt(r.expenses.others) },
          ].filter(i => i.value > 0)
        },
        {
          type: 'table', title: `📈 ${r.yr}-Year Wealth Projection`,
          headers: [
            { label:'Year',          align:'center' },
            { label:'Salary (RM)',   align:'right' },
            { label:'Take-Home',     align:'right' },
            { label:'Expenses',      align:'right' },
            { label:'Monthly Save',  align:'right' },
            { label:'Cum. Savings',  align:'right', bold:true },
          ],
          rows: r.projection.map(p => [
            `Year ${p.year}`,
            `RM ${p.salary.toLocaleString()}`,
            `RM ${p.takehome.toLocaleString()}`,
            `RM ${p.expenses.toLocaleString()}`,
            { value:`RM ${p.savings.toLocaleString()}`, color: p.savings >= 0 ? '#16a34a' : '#dc2626' },
            { value:`RM ${p.cumSavings.toLocaleString()}`, color:'#2563eb' },
          ])
        },
        {
          type: 'table', title: '🎯 Financial Goals Timeline',
          headers: [
            { label:'Goal',         align:'left' },
            { label:'Target (RM)',  align:'right' },
            { label:'Months Needed',align:'right' },
            { label:'Years',        align:'right', bold:true },
            { label:'Status',       align:'center' },
          ],
          rows: r.goalResults.map(g => [
            `${g.icon} ${g.label}`,
            `RM ${Math.round(g.target).toLocaleString()}`,
            g.achievable ? g.months : 'N/A',
            g.achievable ? (g.months/12).toFixed(1) : '—',
            { value: g.achievable ? (g.months <= 12 ? '✅ < 1 year' : g.months <= 36 ? '⏳ 1–3 yrs' : '📅 3+ yrs') : '❌ Review budget', color: g.achievable ? '#16a34a' : '#dc2626' }
          ])
        },
        {
          type: 'keyvalue', title: '🏦 EPF Corpus Projection',
          items: [
            { label:'Monthly EPF Contribution',  value: fmt(r.epf) },
            { label:`Total Contributions (${r.yr} yrs)`, value: fmt(r.totalEpfContrib) },
            { label:`EPF Corpus (${epfDiv}% dividend)`, value: fmt(r.epfCorpus), color:'#16a34a', bold:true },
            { label:'Corpus in INR',             value: fmtI(r.epfCorpus) },
          ]
        },
      ],
      { alert:`Projections use ${growth}% annual salary growth and 4% expense inflation. EPF dividend assumed at ${epfDiv}%. These are estimates only.` }
    )
  }

  // ── Number input helper ────────────────────────────────────
  const Num = ({ label, icon, value, onChange, prefix='RM', hint }) => (
    <div className={styles.field}>
      <label className={styles.fieldLabel}>{icon} {label}</label>
      <div className={styles.fieldInput}>
        <span className={styles.pre}>{prefix}</span>
        <input type="number" value={value} onChange={e => onChange(e.target.value)} placeholder="0" />
      </div>
      {hint && <div className={styles.fieldHint}>{hint}</div>}
    </div>
  )

  const r = result

  return (
    <div className={styles.wrap}>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.emoji}>🎯</span>
          <div>
            <h1 className={styles.title}>Budget Simulator</h1>
            <p className={styles.sub}>Multi-year financial planning for Indians in Malaysia</p>
          </div>
        </div>
        <button className={styles.pdfBtn} onClick={exportPDF}>
          📄 Export Full Report
        </button>
      </div>

      {/* Scenario selector */}
      <div className={styles.scenarios}>
        <div className={styles.scenLabel}>Load scenario:</div>
        <div className={styles.scenBtns}>
          {Object.entries(SCENARIOS).map(([k, s]) => (
            <button key={k}
              className={`${styles.scenBtn} ${scenario===k ? styles.scenActive : ''}`}
              onClick={() => loadScenario(k)}>
              <span>{s.label}</span>
              <span className={styles.scenDesc}>{s.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Live summary bar */}
      <div className={`${styles.liveBar} ${r.monthlySavings < 0 ? styles.liveRed : ''}`}>
        <div className={styles.liveStat}>
          <span className={styles.liveLabel}>Take-Home</span>
          <span className={styles.liveVal}>{fmt(r.takehome)}</span>
        </div>
        <span className={styles.liveSep}>−</span>
        <div className={styles.liveStat}>
          <span className={styles.liveLabel}>Expenses</span>
          <span className={styles.liveVal}>{fmt(r.totalExp)}</span>
        </div>
        <span className={styles.liveSep}>=</span>
        <div className={`${styles.liveStat} ${styles.liveResult}`}>
          <span className={styles.liveLabel}>{r.monthlySavings >= 0 ? '✅ Savings' : '⚠️ Shortfall'}</span>
          <span className={styles.liveValBig}>{fmt(r.monthlySavings)}<span className={styles.livePct}>{r.savingsPct}%</span></span>
        </div>
        <div className={styles.liveStat}>
          <span className={styles.liveLabel}>Annual</span>
          <span className={styles.liveVal}>{fmt(r.annualSavings)}</span>
        </div>
        <div className={styles.liveStat}>
          <span className={styles.liveLabel}>{r.yr}yr Corpus</span>
          <span className={styles.liveVal}>{fmt(r.projection[r.yr-1]?.cumSavings || 0)}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        {TABS.map((t, i) => (
          <button key={i} className={`${styles.tab} ${tab===i ? styles.tabActive : ''}`} onClick={() => setTab(i)}>
            {t}
          </button>
        ))}
      </div>

      {/* ── Tab 0: Income ── */}
      {tab === 0 && (
        <div className={styles.panel}>
          <div className={styles.panelTitle}>💰 Income Details</div>
          <div className={styles.grid}>
            <Num label="Monthly Gross Salary" icon="💰" value={salary} onChange={setSalary} hint="Before EPF, PCB, SOCSO deductions" />
            <Num label="Annual Bonus" icon="🎁" value={bonus} onChange={setBonus} prefix="months" hint="e.g. 1 = 1 month salary bonus" />
            <Num label="EPF Contribution" icon="🏦" value={epfopt} onChange={setEpfopt} prefix="%" hint="Minimum 11%. Can opt for higher" />
          </div>
          <div className={styles.deductBox}>
            <div className={styles.deductTitle}>Monthly Deductions</div>
            <div className={styles.deductGrid}>
              {[
                ['EPF (11%)',   fmt(r.epf),   '#2563eb'],
                ['PCB Tax',     fmt(r.pcb),   '#dc2626'],
                ['SOCSO',       fmt(r.socso), '#7c3aed'],
                ['EIS',         fmt(r.eis),   '#0891b2'],
              ].map(([k,v,c]) => (
                <div key={k} className={styles.deductItem}>
                  <span>{k}</span>
                  <span style={{color:c, fontWeight:700}}>{v}</span>
                </div>
              ))}
            </div>
            <div className={styles.takehomeRow}>
              <span>Net Take-Home Pay</span>
              <strong>{fmt(r.takehome)} <span className={styles.inr}>≈ {fmtI(r.takehome)}</span></strong>
            </div>
          </div>
        </div>
      )}

      {/* ── Tab 1: Expenses ── */}
      {tab === 1 && (
        <div className={styles.panel}>
          <div className={styles.panelTitle}>🏠 Monthly Expenses</div>
          <div className={styles.grid}>
            <Num label="Rent" icon="🏠" value={rent} onChange={setRent} hint="Typical: RM 1,200–3,500 depending on area" />
            <Num label="Food (eating out)" icon="🍛" value={food} onChange={setFood} hint="Mamak + groceries + restaurants" />
            <Num label="Groceries" icon="🛒" value={transport} onChange={setTransport} hint="Combined groceries + transport" />
            <Num label="Utilities + Internet" icon="💡" value={utilities} onChange={setUtilities} hint="TNB electricity + Unifi/Time internet" />
            <Num label="Insurance / Medical" icon="🏥" value={insurance} onChange={setInsurance} hint="Medical card premium" />
            <Num label="Education / School" icon="🎓" value={education} onChange={setEducation} hint="School fees, tuition" />
            <Num label="Remittance to India" icon="💸" value={remit} onChange={setRemit} hint="Money sent home monthly" />
            <Num label="Leisure / Shopping" icon="🎉" value={leisure} onChange={setLeisure} hint="Entertainment, dining, travel" />
            <Num label="Others / Misc" icon="📦" value={others} onChange={setOthers} />
          </div>
          {/* Expense bar chart */}
          <div className={styles.expChart}>
            {[
              ['🏠 Rent',       r.expenses.rent],
              ['🍛 Food',       r.expenses.food],
              ['🚗 Transport',  r.expenses.transport],
              ['💡 Utilities',  r.expenses.utilities],
              ['🏥 Insurance',  r.expenses.insurance],
              ['🎓 Education',  r.expenses.education],
              ['💸 Remittance', r.expenses.remit],
              ['🎉 Leisure',    r.expenses.leisure],
              ['📦 Others',     r.expenses.others],
            ].filter(([,v]) => v > 0).map(([label, val]) => {
              const p = Math.max(2, Math.round((val / r.totalExp) * 100))
              return (
                <div key={label} className={styles.barRow}>
                  <div className={styles.barLabel}>{label}</div>
                  <div className={styles.barTrack}>
                    <div className={styles.barFill} style={{width: p+'%'}} />
                  </div>
                  <div className={styles.barVal}>{fmt(val)}</div>
                  <div className={styles.barPct}>{p}%</div>
                </div>
              )
            })}
            <div className={styles.totalRow}>
              <span>Total Expenses</span>
              <strong>{fmt(r.totalExp)}</strong>
            </div>
          </div>
        </div>
      )}

      {/* ── Tab 2: Growth ── */}
      {tab === 2 && (
        <div className={styles.panel}>
          <div className={styles.panelTitle}>📈 Growth Settings</div>
          <div className={styles.grid}>
            <Num label="Planning Horizon" icon="📅" value={years} onChange={setYears} prefix="years" hint="How many years to project" />
            <Num label="Annual Salary Growth" icon="📊" value={growth} onChange={setGrowth} prefix="%" hint="Expected yearly raise. Typical: 5–10%" />
            <Num label="EPF Dividend Rate" icon="🏦" value={epfDiv} onChange={setEpfDiv} prefix="%" hint="2024 actual: 5.50%. Historical avg: 5.5–6.5%" />
          </div>

          {/* Projection table */}
          <div className={styles.projTable}>
            <div className={styles.projHeader}>
              <span>Year</span><span>Salary</span><span>Take-Home</span>
              <span>Expenses</span><span>Save/mo</span><span>Cumulative</span>
            </div>
            {r.projection.map(p => (
              <div key={p.year} className={`${styles.projRow} ${p.savings < 0 ? styles.projRed : ''}`}>
                <span>Year {p.year}</span>
                <span>{fmt(p.salary)}</span>
                <span>{fmt(p.takehome)}</span>
                <span>{fmt(p.expenses)}</span>
                <span style={{color: p.savings >= 0 ? 'var(--green)' : 'var(--red)'}}>
                  {p.savings >= 0 ? '' : '−'}{fmt(p.savings)}
                </span>
                <span style={{fontWeight:700}}>{fmt(p.cumSavings)}</span>
              </div>
            ))}
          </div>

          <div className={styles.epfBox}>
            <span className={styles.epfIcon}>🏦</span>
            <div>
              <div className={styles.epfTitle}>EPF Corpus after {r.yr} years</div>
              <div className={styles.epfVal}>{fmt(r.epfCorpus)}</div>
              <div className={styles.epfInr}>{fmtI(r.epfCorpus)}</div>
            </div>
          </div>
        </div>
      )}

      {/* ── Tab 3: Goals ── */}
      {tab === 3 && (
        <div className={styles.panel}>
          <div className={styles.panelTitle}>🎯 Financial Goals</div>
          <div className={styles.goalGrid}>
            {r.goalResults.map(g => {
              const pct = g.achievable ? Math.min(100, Math.round((r.monthlySavings * 1 / g.target) * 100)) : 0
              return (
                <div key={g.id} className={`${styles.goalCard} ${!g.achievable ? styles.goalRed : ''}`}>
                  <div className={styles.goalTop}>
                    <span className={styles.goalIcon}>{g.icon}</span>
                    <div>
                      <div className={styles.goalName}>{g.label}</div>
                      <div className={styles.goalDesc}>{g.desc}</div>
                    </div>
                  </div>
                  <div className={styles.goalTarget}>Target: <strong>{fmt(g.target)}</strong></div>
                  <div className={styles.goalBar}>
                    <div className={styles.goalFill} style={{width: pct+'%'}} />
                  </div>
                  <div className={styles.goalTime}>
                    {g.achievable
                      ? <>⏱️ <strong>{g.months} months</strong> ({(g.months/12).toFixed(1)} yrs)</>
                      : <>⚠️ Increase savings to reach this goal</>}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Tips */}
          <div className={styles.tips}>
            <div className={styles.tipsTitle}>💡 Tips to Reach Goals Faster</div>
            {[
              r.expenses.remit > r.gross * 0.15 ? `Your remittance (${fmt(r.expenses.remit)}/mo) is ${Math.round((r.expenses.remit/r.gross)*100)}% of salary. Try to keep it under 15%.` : null,
              r.expenses.rent > r.takehome * 0.35 ? `Rent is ${Math.round((r.expenses.rent/r.takehome)*100)}% of take-home. Ideal is under 30%. Consider cheaper areas like Cheras or Puchong.` : null,
              r.savingsPct < 20 ? `Your savings rate is ${r.savingsPct}%. Aim for 20–30% for long-term financial stability.` : null,
              r.monthlySavings > 0 ? `You have RM ${fmtN(r.monthlySavings)}/mo surplus. Consider putting it in SSPN-i (tax relief) or ASB (if eligible).` : null,
            ].filter(Boolean).map((tip, i) => (
              <div key={i} className={styles.tip}>💡 {tip}</div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab 4: Report ── */}
      {tab === 4 && (
        <div className={styles.panel}>
          <div className={styles.panelTitle}>📊 Full Financial Report</div>

          {/* Summary cards */}
          <div className={styles.reportGrid}>
            {[
              { label:'Gross Salary',       val: fmt(r.gross),                    sub: fmtI(r.gross),          col:'#2563eb' },
              { label:'Take-Home Pay',      val: fmt(r.takehome),                 sub: fmtI(r.takehome),       col:'#16a34a' },
              { label:'Total Expenses',     val: fmt(r.totalExp),                 sub: fmtI(r.totalExp),       col:'#d97706' },
              { label:'Monthly Savings',    val: fmt(r.monthlySavings),           sub: `${r.savingsPct}% rate`, col: r.monthlySavings >= 0 ? '#16a34a' : '#dc2626' },
              { label:'Annual Savings',     val: fmt(r.annualSavings),            sub: fmtI(r.annualSavings),  col:'#16a34a' },
              { label:`${r.yr}-yr Corpus`,  val: fmt(r.projection[r.yr-1]?.cumSavings||0), sub:'savings only', col:'#7c3aed' },
              { label:'EPF Corpus',         val: fmt(r.epfCorpus),                sub: fmtI(r.epfCorpus),      col:'#0891b2' },
              { label:'Total Wealth',       val: fmt((r.projection[r.yr-1]?.cumSavings||0) + r.epfCorpus), sub:'savings + EPF', col:'#0d0d0d' },
            ].map(c => (
              <div key={c.label} className={styles.reportCard} style={{'--rc': c.col}}>
                <div className={styles.rcLabel}>{c.label}</div>
                <div className={styles.rcVal}>{c.val}</div>
                <div className={styles.rcSub}>{c.sub}</div>
              </div>
            ))}
          </div>

          <button className={styles.pdfBtnLarge} onClick={exportPDF}>
            📄 Download Full PDF Report
          </button>
          <p className={styles.pdfNote}>Opens in new tab → Print → Save as PDF</p>
        </div>
      )}

    </div>
  )
}
