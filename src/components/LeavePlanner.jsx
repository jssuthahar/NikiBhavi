import { useState, useMemo } from 'react'
import styles from './LeavePlanner.module.css'
import PrivacyNotice from './PrivacyNotice'

// Malaysia Public Holidays 2026
const PH_2026 = [
  { date:'2026-01-01', name:"New Year's Day",                    state:'all' },
  { date:'2026-01-26', name:'Thaipusam',                         state:'fed+selangor' },
  { date:'2026-02-01', name:'Federal Territory Day',             state:'federal' },
  { date:'2026-02-17', name:'Chinese New Year Day 1',            state:'all' },
  { date:'2026-02-18', name:'Chinese New Year Day 2',            state:'all' },
  { date:'2026-03-20', name:'Hari Raya Aidilfitri Day 1',        state:'all' },
  { date:'2026-03-21', name:'Hari Raya Aidilfitri Day 2',        state:'all' },
  { date:'2026-03-22', name:'Nuzul Al-Quran',                    state:'fed+most' },
  { date:'2026-04-13', name:"Birthday of Yang di-Pertuan Agong", state:'all' },
  { date:'2026-05-01', name:'Labour Day',                        state:'all' },
  { date:'2026-05-27', name:'Hari Raya Aidiladha',               state:'all' },
  { date:'2026-05-31', name:'Wesak Day',                         state:'all' },
  { date:'2026-06-17', name:'Awal Muharram (Islamic New Year)',  state:'all' },
  { date:'2026-08-31', name:'National Day (Merdeka)',             state:'all' },
  { date:'2026-09-16', name:'Malaysia Day',                      state:'all' },
  { date:'2026-09-26', name:"Prophet Muhammad's Birthday",       state:'all' },
  { date:'2026-11-08', name:'Deepavali',                         state:'all' },
  { date:'2026-12-25', name:'Christmas Day',                     state:'all' },
]

function fmtDate(d) {
  return new Date(d).toLocaleDateString('en-MY', { weekday:'short', day:'numeric', month:'short' })
}
function dayName(d) {
  return new Date(d).toLocaleDateString('en-MY', { weekday:'long' })
}

export default function LeavePlanner() {
  const [totalLeave, setTotalLeave] = useState('14')
  const [leaveUsed,  setLeaveUsed]  = useState('0')

  const leaveDays = useMemo(() => {
    const remaining = (parseInt(totalLeave)||14) - (parseInt(leaveUsed)||0)

    const opportunities = []
    for (const ph of PH_2026) {
      const d   = new Date(ph.date)
      const day = d.getDay() // 0=Sun,1=Mon,2=Tue,3=Wed,4=Thu,5=Fri,6=Sat
      let opts  = []

      if (day === 1) { // Monday — bridge to Friday for 4-day weekend
        const fri = new Date(d); fri.setDate(d.getDate() - 3)
        opts.push({ leaveDays:1, offDays:4, desc:`Take Fri ${fmtDate(fri.toISOString().slice(0,10))} → 4-day weekend` })
      } else if (day === 5) { // Friday — bridge Monday for 4-day weekend
        const mon = new Date(d); mon.setDate(d.getDate() + 3)
        opts.push({ leaveDays:1, offDays:4, desc:`Take Mon ${fmtDate(mon.toISOString().slice(0,10))} → 4-day weekend` })
      } else if (day === 2) { // Tuesday — bridge Monday
        const mon = new Date(d); mon.setDate(d.getDate() - 1)
        opts.push({ leaveDays:1, offDays:4, desc:`Take Mon ${fmtDate(mon.toISOString().slice(0,10))} → 4-day break` })
      } else if (day === 4) { // Thursday — bridge Friday
        const fri = new Date(d); fri.setDate(d.getDate() + 1)
        opts.push({ leaveDays:1, offDays:4, desc:`Take Fri ${fmtDate(fri.toISOString().slice(0,10))} → 4-day break` })
      } else if (day === 3) { // Wednesday — take both sides
        const tue = new Date(d); tue.setDate(d.getDate() - 1)
        const thu = new Date(d); thu.setDate(d.getDate() + 1)
        opts.push({ leaveDays:2, offDays:5, desc:`Take Tue+Thu → 5-day week off (2 leave days)` })
      }

      if (opts.length) opportunities.push({ ph, day: dayName(ph.date), opts })
    }

    return { remaining, opportunities }
  }, [totalLeave, leaveUsed])

  const stateLabel = s => {
    if (s === 'all') return null
    if (s === 'federal') return 'KL/Putrajaya/Labuan'
    if (s === 'fed+most') return 'KL + most states'
    if (s === 'fed+selangor') return 'KL + Selangor'
    return s
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.headerEmoji}>📅</span>
        <div>
          <h1 className={styles.headerTitle}>Annual Leave Planner 2026</h1>
          <p className={styles.headerDesc}>Malaysia public holidays 2026 + smart long weekend optimizer</p>
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
        <div className={styles.phTitle}>🇲🇾 Malaysia Public Holidays 2026 ({PH_2026.length} days)</div>
        <div className={styles.phList}>
          {PH_2026.map((ph, i) => {
            const sl = stateLabel(ph.state)
            return (
              <div key={i} className={styles.phRow}>
                <span className={styles.phDate}>{fmtDate(ph.date)}</span>
                <span className={styles.phDay}>{dayName(ph.date)}</span>
                <span className={styles.phName}>{ph.name}</span>
                {sl && <span className={styles.phTag}>{sl}</span>}
              </div>
            )
          })}
        </div>
      </div>

      <div className={styles.oppsCard}>
        <div className={styles.oppsTitle}>⚡ Long Weekend Opportunities — use 1–2 leave days</div>
        {leaveDays.opportunities.length === 0
          ? <div className={styles.noOpps}>No bridge opportunities found this year (lucky holidays fall on weekends)</div>
          : leaveDays.opportunities.map((opp, i) => (
          <div key={i} className={styles.opp}>
            <div className={styles.oppPH}>
              <span className={styles.oppDay}>{opp.day}</span>
              {opp.ph.name} — {fmtDate(opp.ph.date)}
            </div>
            {opp.opts.map((o, j) => (
              <div key={j} className={`${styles.oppOpt} ${leaveDays.remaining >= o.leaveDays ? '' : styles.oppInsuff}`}>
                <span className={styles.oppDays}>
                  {o.leaveDays} leave → {o.offDays} days off
                </span>
                <span>{o.desc}</span>
                {leaveDays.remaining < o.leaveDays && <span className={styles.oppWarn}>not enough leave</span>}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.tipBox}>
        <div className={styles.tipTitle}>💡 2026 Smart Leave Tips for Indians in Malaysia</div>
        {[
          '🎉 Deepavali falls on 8 Nov (Sunday) — government likely declares Monday 9 Nov as replacement holiday',
          '🇨🇳 CNY 17–18 Feb (Tue–Wed) — take Mon+Thu for a 6-day mega break with just 2 leave days',
          '🕌 Hari Raya 20–21 Mar (Fri–Sat) — automatic 4-day weekend, no leave needed',
          '🏖️ Merdeka 31 Aug (Mon) — natural long weekend, save your leave',
          '📅 Plan your India trips around CNY + Hari Raya gaps for maximum days off',
        ].map((t, i) => <div key={i} className={styles.tip}>{t}</div>)}
      </div>
    </div>
  )
}
