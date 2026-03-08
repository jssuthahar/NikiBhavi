import { useState, useMemo } from 'react'
import styles from './LeavePlanner.module.css'
import PrivacyNotice from './PrivacyNotice'

const PH_2025 = [
  { date:'2025-01-01', name:"New Year's Day", state:'all' },
  { date:'2025-01-29', name:'Chinese New Year Day 1', state:'all' },
  { date:'2025-01-30', name:'Chinese New Year Day 2', state:'all' },
  { date:'2025-02-01', name:'Federal Territory Day', state:'federal' },
  { date:'2025-03-31', name:'Nuzul Al-Quran', state:'fed+most' },
  { date:'2025-03-31', name:'Hari Raya Aidilfitri Day 1', state:'all' },
  { date:'2025-04-01', name:'Hari Raya Aidilfitri Day 2', state:'all' },
  { date:'2025-04-14', name:'Birthday of Yang di-Pertuan Agong', state:'all' },
  { date:'2025-05-01', name:'Labour Day', state:'all' },
  { date:'2025-05-12', name:'Wesak Day', state:'all' },
  { date:'2025-06-02', name:'Hari Raya Aidiladha', state:'all' },
  { date:'2025-06-07', name:'Awal Muharram', state:'all' },
  { date:'2025-08-31', name:'National Day (Merdeka)', state:'all' },
  { date:'2025-09-16', name:"Malaysia Day", state:'all' },
  { date:'2025-10-20', name:"Prophet Muhammad's Birthday", state:'all' },
  { date:'2025-10-20', name:'Deepavali', state:'all' },
  { date:'2025-12-25', name:'Christmas Day', state:'all' },
]

function addDays(d, n) { const r=new Date(d); r.setDate(r.getDate()+n); return r }
function isWeekend(d)  { const day=new Date(d).getDay(); return day===0||day===6 }
function fmtDate(d)    { return new Date(d).toLocaleDateString('en-MY',{weekday:'short',day:'numeric',month:'short'}) }

export default function LeavePlanner() {
  const [totalLeave, setTotalLeave] = useState('14')
  const [leaveUsed,  setLeaveUsed]  = useState('0')

  const leaveDays = useMemo(() => {
    const remaining = (parseInt(totalLeave)||14) - (parseInt(leaveUsed)||0)
    // Find all long weekends in 2025 (PH adjacent to weekend)
    const opportunities = []
    for (const ph of PH_2025) {
      const d = new Date(ph.date)
      const day = d.getDay() // 0=Sun, 1=Mon...5=Fri, 6=Sat
      let opts = []
      if (day === 1) { // Monday PH — take Friday, get 4-day weekend
        const fri = new Date(d); fri.setDate(d.getDate()-3)
        opts.push({ take:[fri.toISOString().slice(0,10)], off:4, desc:`Take Fri ${fmtDate(fri)} → 4-day weekend` })
      } else if (day === 5) { // Friday PH
        const mon = new Date(d); mon.setDate(d.getDate()+3)
        opts.push({ take:[mon.toISOString().slice(0,10)], off:4, desc:`Take Mon ${fmtDate(mon)} → 4-day weekend` })
      } else if (day === 2) { // Tuesday — take Monday
        const mon = new Date(d); mon.setDate(d.getDate()-1)
        opts.push({ take:[mon.toISOString().slice(0,10)], off:4, desc:`Take Mon ${fmtDate(mon)} → 4-day break` })
      } else if (day === 4) { // Thursday — take Friday
        const fri = new Date(d); fri.setDate(d.getDate()+1)
        opts.push({ take:[fri.toISOString().slice(0,10)], off:4, desc:`Take Fri ${fmtDate(fri)} → 4-day break` })
      } else if (day === 3) { // Wednesday — sandwich leave
        const tue = new Date(d); tue.setDate(d.getDate()-1)
        const thu = new Date(d); thu.setDate(d.getDate()+1)
        opts.push({ take:[tue.toISOString().slice(0,10),thu.toISOString().slice(0,10)], off:5, desc:`Take Tue+Thu → 5-day week off` })
      }
      if (opts.length) opportunities.push({ ph, opts })
    }
    return { remaining, opportunities }
  }, [totalLeave, leaveUsed])

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.headerEmoji}>📅</span>
        <div>
          <h1 className={styles.headerTitle}>Annual Leave Planner</h1>
          <p className={styles.headerDesc}>Malaysian public holidays 2025 + optimize your long weekends</p>
        </div>
      </div>
      <PrivacyNotice />

      <div className={styles.inputCard}>
        <div className={styles.fieldsRow}>
          <div className={styles.field}>
            <label>🏖️ Total Annual Leave (days)</label>
            <div className={styles.inputWrap}>
              <input type="number" min="0" max="30" value={totalLeave} onChange={e=>setTotalLeave(e.target.value)} />
              <span className={styles.suffix}>days</span>
            </div>
          </div>
          <div className={styles.field}>
            <label>✅ Leave Already Used</label>
            <div className={styles.inputWrap}>
              <input type="number" min="0" value={leaveUsed} onChange={e=>setLeaveUsed(e.target.value)} />
              <span className={styles.suffix}>days</span>
            </div>
          </div>
        </div>
        <div className={styles.leaveStatus}>
          🎯 <strong>{leaveDays.remaining}</strong> days remaining of {totalLeave} total
        </div>
      </div>

      <div className={styles.phCard}>
        <div className={styles.phTitle}>🇲🇾 Malaysia Public Holidays 2025</div>
        <div className={styles.phList}>
          {PH_2025.map((ph,i)=>(
            <div key={i} className={styles.phRow}>
              <span className={styles.phDate}>{fmtDate(ph.date)}</span>
              <span className={styles.phName}>{ph.name}</span>
              {ph.state==='federal'&&<span className={styles.phTag}>Federal Territory</span>}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.oppsCard}>
        <div className={styles.oppsTitle}>⚡ Long Weekend Opportunities (use 1–2 days leave)</div>
        {leaveDays.opportunities.map((opp,i)=>(
          <div key={i} className={styles.opp}>
            <div className={styles.oppPH}>{opp.ph.name} — {fmtDate(opp.ph.date)}</div>
            {opp.opts.map((o,j)=>(
              <div key={j} className={styles.oppOpt}>
                <span className={styles.oppDays}>+{o.off-1} leave = {o.off} days off</span>
                <span>{o.desc}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
