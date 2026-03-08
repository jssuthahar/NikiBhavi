import { useState, useMemo } from 'react'
import styles from './ProbationCalc.module.css'
import PrivacyNotice from './PrivacyNotice'

function addMonths(d, m) {
  const r = new Date(d)
  r.setMonth(r.getMonth() + m)
  return r
}
function fmtD(d) {
  return d.toLocaleDateString('en-MY', { weekday:'long', day:'numeric', month:'long', year:'numeric' })
}
function daysBetween(a, b) {
  return Math.round((b - a) / 86400000)
}

export default function ProbationCalc() {
  const [joinDate,   setJoinDate]   = useState('')
  const [probMonths, setProbMonths] = useState('3')
  const [noticeDays, setNoticeDays] = useState('30')

  const result = useMemo(() => {
    if (!joinDate) return null
    const join     = new Date(joinDate)
    const months   = parseInt(probMonths) || 3
    const probEnd  = addMonths(join, months)
    const today    = new Date()
    const daysLeft = daysBetween(today, probEnd)
    const done     = today >= probEnd
    const pct      = Math.max(0, Math.min(100, (daysBetween(join, today) / (months * 30.4)) * 100))

    const notice  = parseInt(noticeDays) || 30
    // After probation, notice period kicks in
    const benefits = [
      { icon:'🏥', name:'Medical & Hospitalisation Leave', when:'From Day 1', detail:'MC from registered doctor. Hospital leave separate (14+ days/yr based on service).' },
      { icon:'🏖️', name:'Annual Leave', when:'After 12 months', detail:'8 days/year (0-2 yrs service). Prorated if less than 1 year.' },
      { icon:'🤒', name:'Sick Leave (full)', when:'After probation', detail:'14 days/year (0-2 yrs), 18 days (2-5 yrs), 22 days (5+ yrs).' },
      { icon:'👶', name:'Maternity Leave (60 days)', when:'As per EA 1955', detail:'60 consecutive days, only for first 5 surviving children.' },
      { icon:'🛡️', name:'EPF & SOCSO', when:'From Day 1', detail:'Employer must contribute from first payslip. Check your payslip every month.' },
      { icon:'📋', name:'Full Notice Period Protection', when:'After probation ends', detail:`During probation, either party can give ${notice} days or shorter notice as per your contract.` },
      { icon:'💰', name:'Salary Increment Eligibility', when:'Usually Year 1', detail:'Performance review typically at end of probation or 12-month mark.' },
    ]

    return { join, probEnd, daysLeft, done, pct, benefits, months }
  }, [joinDate, probMonths, noticeDays])

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.headerEmoji}>📋</span>
        <div>
          <h1 className={styles.headerTitle}>Probation End Date Calculator</h1>
          <p className={styles.headerDesc}>Know exactly when probation ends + what benefits kick in</p>
        </div>
      </div>
      <PrivacyNotice />

      <div className={styles.inputCard}>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>📅 Joining Date</label>
            <input type="date" value={joinDate} onChange={e=>setJoinDate(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label>⏱ Probation Period</label>
            <select value={probMonths} onChange={e=>setProbMonths(e.target.value)}>
              {[1,2,3,4,5,6].map(m=><option key={m} value={m}>{m} month{m>1?'s':''}</option>)}
            </select>
          </div>
          <div className={styles.field}>
            <label>📄 Notice Period (days)</label>
            <div className={styles.inputWrap}>
              <input type="number" min="0" value={noticeDays} onChange={e=>setNoticeDays(e.target.value)} style={{paddingLeft:'14px'}} />
              <span className={styles.suffix}>days</span>
            </div>
          </div>
        </div>
      </div>

      {result && (
        <>
          <div className={`${styles.resultCard} ${result.done?styles.rcDone:styles.rcActive}`}>
            <div className={styles.rcMain}>
              <div className={styles.rcEmoji}>{result.done?'🎉':'⏳'}</div>
              <div>
                <div className={styles.rcTitle}>{result.done?'Probation Complete!':'Probation in Progress'}</div>
                <div className={styles.rcDate}>{fmtD(result.probEnd)}</div>
                <div className={styles.rcSub}>{result.done?`Completed ${Math.abs(result.daysLeft)} days ago`:`${result.daysLeft} days remaining`}</div>
              </div>
            </div>
            <div className={styles.rcBar}>
              <div className={styles.rcBarFill} style={{width:`${result.pct}%`}} />
            </div>
            <div className={styles.rcMeta}>
              <span>{result.months}-month probation from {result.join.toLocaleDateString('en-MY',{day:'numeric',month:'short',year:'numeric'})}</span>
              <span>{Math.round(result.pct)}% complete</span>
            </div>
          </div>

          <div className={styles.benefitsCard}>
            <div className={styles.bTitle}>📦 Employee Benefits Timeline</div>
            {result.benefits.map((b,i)=>(
              <div key={i} className={styles.bRow}>
                <span className={styles.bIcon}>{b.icon}</span>
                <div className={styles.bInfo}>
                  <div className={styles.bName}>{b.name}</div>
                  <div className={styles.bDetail}>{b.detail}</div>
                </div>
                <span className={styles.bWhen}>{b.when}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
