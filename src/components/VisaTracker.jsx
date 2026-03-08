import { useState, useMemo } from 'react'
import styles from './VisaTracker.module.css'
import PrivacyNotice from './PrivacyNotice'

const VISA_TYPES = [
  { id:'ep',      label:'Employment Pass',    icon:'💼', daysValid:365, renewBefore:30, desc:'Work visa for professionals earning RM 5,000+' },
  { id:'dp',      label:'Dependent Pass',     icon:'👨‍👩‍👧', daysValid:365, renewBefore:30, desc:'For spouse/children of EP holders' },
  { id:'tourist', label:'Tourist Visa',       icon:'✈️', daysValid:90,  renewBefore:14, desc:'Social Visit Pass — max 90 days' },
  { id:'student', label:'Student Pass',       icon:'🎓', daysValid:365, renewBefore:30, desc:'For full-time students at approved institutions' },
  { id:'mm2h',    label:'MM2H',               icon:'🏡', daysValid:3650,renewBefore:60, desc:'Malaysia My Second Home — 10-year visa' },
  { id:'pvip',    label:'Premium Visa (PVIP)',icon:'⭐', daysValid:3650,renewBefore:60, desc:'Premium Visa Programme — 20-year visa' },
]

function daysBetween(a, b) {
  return Math.round((b - a) / 86400000)
}

export default function VisaTracker() {
  const [visaType,    setVisaType]    = useState('ep')
  const [startDate,   setStartDate]   = useState('')
  const [entries,     setEntries]     = useState([]) // {date, type: 'out'|'in'}
  const [newDate,     setNewDate]     = useState('')
  const [newType,     setNewType]     = useState('out')

  const visa = VISA_TYPES.find(v => v.id === visaType)

  const result = useMemo(() => {
    if (!startDate) return null
    const start   = new Date(startDate)
    const expiry  = new Date(start.getTime() + visa.daysValid * 86400000)
    const today   = new Date()
    const daysLeft= daysBetween(today, expiry)
    const pct     = Math.max(0, Math.min(100, (daysLeft / visa.daysValid) * 100))

    // 182-day residency tracker
    let daysInMY = 0
    let lastIn   = start
    const sorted = [...entries].sort((a,b)=>new Date(a.date)-new Date(b.date))
    for (const e of sorted) {
      const d = new Date(e.date)
      if (e.type === 'out') { daysInMY += daysBetween(lastIn, d); lastIn = null }
      else { lastIn = d }
    }
    if (lastIn) daysInMY += daysBetween(lastIn, today)
    const isResident = daysInMY >= 182

    return { start, expiry, daysLeft, pct, daysInMY, isResident }
  }, [startDate, visa, entries])

  const addEntry = () => {
    if (!newDate) return
    setEntries(prev => [...prev, { date:newDate, type:newType }].sort((a,b)=>new Date(a.date)-new Date(b.date)))
    setNewDate('')
  }

  const status = result ? (
    result.daysLeft < 0 ? 'expired' :
    result.daysLeft < visa.renewBefore ? 'urgent' :
    result.daysLeft < visa.renewBefore * 3 ? 'warning' : 'ok'
  ) : null

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.headerEmoji}>🛂</span>
        <div>
          <h1 className={styles.headerTitle}>Visa Expiry Tracker</h1>
          <p className={styles.headerDesc}>Track your visa expiry + 182-day tax residency countdown</p>
        </div>
      </div>
      <PrivacyNotice />

      <div className={styles.visaGrid}>
        {VISA_TYPES.map(v => (
          <button key={v.id} className={`${styles.visaBtn} ${visaType===v.id?styles.visaActive:''}`} onClick={()=>setVisaType(v.id)}>
            <span>{v.icon}</span><span>{v.label}</span>
          </button>
        ))}
      </div>
      <div className={styles.visaDesc}>{visa.desc}</div>

      <div className={styles.inputCard}>
        <div className={styles.field}>
          <label>📅 Visa Start Date (when you entered / visa issued)</label>
          <input type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} />
        </div>
      </div>

      {result && (
        <>
          <div className={`${styles.statusCard} ${styles['status_'+status]}`}>
            <div className={styles.statusTop}>
              <div>
                <div className={styles.statusLabel}>{status==='expired'?'❌ VISA EXPIRED':status==='urgent'?'🚨 URGENT — Renew Now':status==='warning'?'⚠️ Renewal Soon':'✅ Visa Valid'}</div>
                <div className={styles.statusDays}>{result.daysLeft < 0 ? `Expired ${Math.abs(result.daysLeft)} days ago` : `${result.daysLeft} days remaining`}</div>
              </div>
              <div className={styles.expDate}>
                <div className={styles.expLabel}>Expires</div>
                <div className={styles.expVal}>{result.expiry.toLocaleDateString('en-MY', {day:'numeric',month:'short',year:'numeric'})}</div>
              </div>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{width:`${result.pct}%`, background: status==='ok'?'#C9F53B':status==='warning'?'#f59e0b':'#ef4444'}} />
            </div>
            {status==='urgent'&&<div className={styles.urgentNote}>⚡ Apply for renewal at least {visa.renewBefore} days before expiry. Visit <a href="https://www.imi.gov.my" target="_blank" rel="noreferrer">imi.gov.my</a></div>}
          </div>

          <div className={styles.residencyCard}>
            <div className={styles.resHeader}>
              <span>🏠 Tax Residency Status (182-Day Rule)</span>
              <span className={result.isResident?styles.resBadgeGreen:styles.resBadgeOrange}>
                {result.isResident?'✅ TAX RESIDENT':'⏳ NOT YET RESIDENT'}
              </span>
            </div>
            <div className={styles.resBar}>
              <div className={styles.resBarFill} style={{width:`${Math.min(100,(result.daysInMY/182)*100)}%`}} />
            </div>
            <div className={styles.resMeta}>
              <span><strong>{result.daysInMY}</strong> days in Malaysia</span>
              <span>{result.isResident?'You qualify for progressive tax rates':'Need ' + Math.max(0,182-result.daysInMY) + ' more days'}</span>
            </div>
          </div>

          <div className={styles.travelCard}>
            <div className={styles.travelTitle}>✈️ Travel Log (track days in/out)</div>
            <div className={styles.addRow}>
              <input type="date" value={newDate} onChange={e=>setNewDate(e.target.value)} />
              <select value={newType} onChange={e=>setNewType(e.target.value)}>
                <option value="out">Left Malaysia</option>
                <option value="in">Returned to Malaysia</option>
              </select>
              <button className={styles.addBtn} onClick={addEntry}>+ Add</button>
            </div>
            {entries.length > 0 && (
              <div className={styles.entryList}>
                {entries.map((e,i) => (
                  <div key={i} className={styles.entry}>
                    <span className={e.type==='out'?styles.outTag:styles.inTag}>{e.type==='out'?'✈️ Left':'🛬 Returned'}</span>
                    <span>{new Date(e.date).toLocaleDateString('en-MY',{day:'numeric',month:'short',year:'numeric'})}</span>
                    <button className={styles.delBtn} onClick={()=>setEntries(prev=>prev.filter((_,j)=>j!==i))}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
