import { useState, useMemo } from 'react'
import styles from './PRRoadmap.module.css'
import PrivacyNotice from './PrivacyNotice'

const PATHS = [
  {
    id:'pr', label:'Permanent Resident (PR)', icon:'🏡',
    years: 5,
    steps:[
      { year:'Year 1–2', title:'Get stable EP', desc:'Secure Employee Pass with good salary. EP is the base for all long-term paths. Keep it renewed without gaps.' },
      { year:'Year 3–4', title:'Build residency record', desc:'Stay in Malaysia 182+ days/year for tax residency. Keep all payslips, EPF statements, tax receipts. Avoid long gaps outside Malaysia.' },
      { year:'Year 5', title:'Apply PR (MyPR)', desc:'Apply via Immigration Department. Need: 5 continuous years EP, stable income, clean criminal record, basic BM ability, 2 Malaysian reference letters.' },
      { year:'After PR', title:'PR Approval', desc:'PR gives indefinite stay, can work anywhere without EP, children can attend national school as locals, apply for MyKAD.' },
    ],
    docs:['Passport (all pages)', 'All EP passes (entire history)', 'Last 6 months payslips', 'EPF statement', 'Income tax receipts (e-Filing)', 'Bank statements 6 months', '2 letters from Malaysian citizens', 'Proof of address 5 years', 'No criminal record certificate'],
    tips:['📋 Success rate is around 20–40% — applications can be rejected without reason', 'Stay in Malaysia as much as possible — too many days outside weakens application', '🗣️ Learn basic Bahasa Malaysia — helps in interview', '🏠 Having children in Malaysian school strengthens application'],
    color:'#2563eb',
  },
  {
    id:'rpt', label:'Residence Pass-Talent (RP-T)', icon:'⭐',
    years: 3,
    steps:[
      { year:'Year 1–3', title:'Qualify for RP-T', desc:'Need EP with salary RM 15,000+/month, working 3+ years in Malaysia, in strategic sectors (tech, finance, oil & gas, healthcare).' },
      { year:'Year 3', title:'Apply RP-T via TalentCorp', desc:'Apply through TalentCorp Malaysia. RP-T gives 10-year renewable pass — free to work for any employer.' },
      { year:'After RP-T', title:'Freedom to work', desc:'No employer sponsorship needed. Can change jobs freely. Spouse gets Dependent Pass with work rights.' },
      { year:'Year 10+', title:'Consider PR', desc:'RP-T holders with long stay can apply for PR with stronger profile.' },
    ],
    docs:['EP history', 'Degree certificates', 'Last 12 months payslips', 'Employment letter', 'Tax returns EA Form', 'Professional certifications'],
    tips:['⭐ Best path for high-income professionals', '💼 IT, Finance, Engineering, Healthcare are top approved sectors', '👨‍👩‍👧 Spouse gets DP-E (can work) — biggest advantage over regular EP', '🔄 Can switch employers freely once RP-T approved'],
    color:'#f59e0b',
  },
  {
    id:'mm2h', label:'MM2H (My Second Home)', icon:'🏖️',
    years: 0,
    steps:[
      { year:'Anytime', title:'Meet financial criteria', desc:'Must be high net-worth. Tier 2: RM 40,000/month income AND RM 500,000 fixed deposit in Malaysia. Property purchase required.' },
      { year:'Apply', title:'Apply via MM2H Unit', desc:'Submit via approved MM2H agent or directly. Process takes 3–6 months. Medical check required.' },
      { year:'Approved', title:'10-year visa', desc:'10-year multiple-entry visa. Can stay without working. Family can be on MM2H too. Not a work visa.' },
      { year:'Note', title:'Not a path to PR', desc:'MM2H does not lead to PR directly. It is a long-term stay visa for retirees or wealthy non-workers.' },
    ],
    docs:['Proof of income RM 40K/month', 'Bank statements 6 months', 'RM 500,000 FD proof', 'Medical examination report', 'No criminal record', 'Passport'],
    tips:['💰 Very high financial requirement — for wealthy retirees/investors', '🏠 Must purchase property after approval', '🚫 Cannot work on MM2H — need separate work permit', '🔄 2024 revised: tier-based system — Tier 1 (Sarawak) is more affordable'],
    color:'#16a34a',
  },
]

const TIMELINE_ITEMS = [
  { month:'Month 1',   title:'Arrive + get EP',         desc:'EP activated, open bank account, get SIM', icon:'✈️' },
  { month:'Month 2',   title:'Settle in',               desc:'Find permanent house, register with India High Commission', icon:'🏠' },
  { month:'Month 6',   title:'Tax resident status',      desc:'If 182+ days stay — you become tax resident, lower PCB rates', icon:'📊' },
  { month:'Year 1',    title:'File first tax return',    desc:'File LHDN e-Filing by April. Keep all receipts for reliefs.', icon:'🧾' },
  { month:'Year 2',    title:'Apply credit card',        desc:'With 1 year income history, eligible for most cards', icon:'💳' },
  { month:'Year 3',    title:'RP-T eligible (RM 15K+)',  desc:'Apply Residence Pass-Talent if salary qualifies', icon:'⭐' },
  { month:'Year 5',    title:'PR application window',    desc:'5 continuous years EP — can submit PR application', icon:'🏡' },
  { month:'Year 10+',  title:'Long-term settlement',     desc:'Consider citizenship if married to Malaysian or special contribution', icon:'🇲🇾' },
]

export default function PRRoadmap() {
  const [activePath, setActivePath] = useState('pr')
  const [yearsInMY,  setYearsInMY]  = useState('1')
  const [salary,     setSalary]     = useState('8000')
  const path = PATHS.find(p => p.id === activePath)

  const eligibility = useMemo(() => {
    const yrs = parseFloat(yearsInMY) || 0
    const sal = parseFloat(salary) || 0
    return {
      pr:  { eligible: yrs >= 5,          msg: yrs >= 5 ? '✅ Eligible to apply PR now' : `⏳ ${Math.max(0,5-yrs).toFixed(1)} more years needed for PR` },
      rpt: { eligible: yrs >= 3 && sal >= 15000, msg: yrs >= 3 && sal >= 15000 ? '✅ Eligible for RP-T' : sal < 15000 ? '❌ Need RM 15,000+ salary for RP-T' : `⏳ ${Math.max(0,3-yrs).toFixed(1)} more years for RP-T` },
      mm2h:{ eligible: sal >= 40000,      msg: sal >= 40000 ? '✅ Income eligible for MM2H' : '❌ MM2H needs RM 40,000/month income' },
    }
  }, [yearsInMY, salary])

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.emoji}>🛂</span>
        <div>
          <h1 className={styles.title}>PR & Long-Term Stay Roadmap</h1>
          <p className={styles.sub}>Your path from EP to Permanent Resident in Malaysia — 2026</p>
        </div>
      </div>
      <PrivacyNotice />

      {/* Quick check */}
      <div className={styles.checkCard}>
        <div className={styles.checkTitle}>🎯 Check Your Eligibility</div>
        <div className={styles.checkRow}>
          <div className={styles.field}>
            <label>Years in Malaysia (with EP)</label>
            <div className={styles.inputWrap}><input type="number" step="0.5" min="0" max="20" value={yearsInMY} onChange={e=>setYearsInMY(e.target.value)} /><span className={styles.suffix}>years</span></div>
          </div>
          <div className={styles.field}>
            <label>Monthly Salary (RM)</label>
            <div className={styles.inputWrap}><span className={styles.prefix}>RM</span><input type="number" value={salary} onChange={e=>setSalary(e.target.value)} /></div>
          </div>
        </div>
        <div className={styles.eligGrid}>
          {PATHS.map(p => (
            <div key={p.id} className={`${styles.eligItem} ${eligibility[p.id].eligible ? styles.eligOk : styles.eligNot}`}>
              <span>{p.icon} {p.label}</span>
              <span>{eligibility[p.id].msg}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className={styles.timelineCard}>
        <div className={styles.timelineTitle}>📅 EP Holder Journey Timeline</div>
        <div className={styles.timeline}>
          {TIMELINE_ITEMS.map((t,i) => (
            <div key={i} className={styles.timelineItem}>
              <div className={styles.timelineLeft}>
                <div className={styles.timelineDot}>{t.icon}</div>
                {i < TIMELINE_ITEMS.length-1 && <div className={styles.timelineLine} />}
              </div>
              <div className={styles.timelineBody}>
                <div className={styles.timelineMonth}>{t.month}</div>
                <div className={styles.timelineHead}>{t.title}</div>
                <div className={styles.timelineDesc}>{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Path selector */}
      <div className={styles.pathTabs}>
        {PATHS.map(p => (
          <button key={p.id} className={`${styles.pathTab} ${activePath===p.id?styles.pathTabActive:''}`} style={activePath===p.id?{'--c':p.color}:{}} onClick={()=>setActivePath(p.id)}>
            {p.icon} {p.label}
          </button>
        ))}
      </div>

      <div className={styles.pathCard} style={{'--accent':path.color}}>
        <div className={styles.pathSteps}>
          {path.steps.map((s,i) => (
            <div key={i} className={styles.pathStep}>
              <div className={styles.pathYear}>{s.year}</div>
              <div><strong className={styles.pathStepTitle}>{s.title}</strong><p className={styles.pathStepDesc}>{s.desc}</p></div>
            </div>
          ))}
        </div>
        <div className={styles.docsSection}>
          <div className={styles.docsTitle}>📋 Required Documents</div>
          <div className={styles.docsList}>
            {path.docs.map((d,i) => <div key={i} className={styles.docItem}>✅ {d}</div>)}
          </div>
        </div>
        <div className={styles.pathTips}>
          {path.tips.map((t,i) => <div key={i} className={styles.tip}>{t}</div>)}
        </div>
      </div>
    </div>
  )
}
