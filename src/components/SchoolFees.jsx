import { useState, useMemo } from 'react'
import styles from './SchoolFees.module.css'
import PrivacyNotice from './PrivacyNotice'

const SCHOOL_TYPES = [
  {
    id:'intl', name:'International School', icon:'🌍', color:'#2563eb',
    annual:{ low:20000, mid:45000, high:80000 },
    extras:{ uniform:800, transport:3600, meals:2400, activity:2000 },
    notes:'Tuition in English. IGCSE, IB or American curriculum. Strong social network for expat kids.',
    pros:['English medium','Globally recognised qualifications','Strong expat community'],
    cons:['Very expensive','Waiting lists at good schools','Social bubble risk'],
  },
  {
    id:'national', name:'National School (SK)', icon:'🏫', color:'#16a34a',
    annual:{ low:500, mid:1500, high:3000 },
    extras:{ uniform:300, transport:2400, meals:1200, activity:500 },
    notes:'Government school, BM medium. Good for children who will stay long-term in Malaysia.',
    pros:['Very affordable','Learn Bahasa Malaysia','Friends with locals'],
    cons:['BM medium instruction','May be crowded','Adjustment needed for Indian kids'],
  },
  {
    id:'tamil', name:'Tamil School (SJKT)', icon:'🪔', color:'#dc2626',
    annual:{ low:300, mid:1000, high:2000 },
    extras:{ uniform:200, transport:2400, meals:1200, activity:300 },
    notes:'Tamil medium school. 59 Tamil schools in KL/Selangor area. Great for maintaining Tamil language.',
    pros:['Tamil language preserved','Indian culture','Very affordable','Strong community'],
    cons:['Tamil medium — limited in career','Transition to secondary school harder','Some schools underfunded'],
  },
  {
    id:'private', name:'Private National School', icon:'🎓', color:'#7C3AED',
    annual:{ low:5000, mid:12000, high:25000 },
    extras:{ uniform:600, transport:3000, meals:2000, activity:1500 },
    notes:'Private Malaysian curriculum schools. English + BM. Good middle ground between national and international.',
    pros:['English emphasis','Better facilities than national','More affordable than intl'],
    cons:['SPM curriculum (Malaysian)','Quality varies widely','Less expat community'],
  },
]

export default function SchoolFees() {
  const [type,      setType]      = useState('intl')
  const [tier,      setTier]      = useState('mid')
  const [children,  setChildren]  = useState('1')
  const [years,     setYears]     = useState('12')

  const school = SCHOOL_TYPES.find(s => s.id === type)
  const n = parseInt(children) || 1
  const yrs = parseInt(years) || 12

  const result = useMemo(() => {
    if (!school) return null
    const annual   = school.annual[tier]
    const extras   = Object.values(school.extras).reduce((s,v)=>s+v, 0)
    const total1yr = (annual + extras) * n
    const totalAll = total1yr * yrs
    const monthly  = total1yr / 12
    const inr      = totalAll * 19.2
    return { annual, extras, total1yr, totalAll, monthly, inr }
  }, [school, tier, n, yrs])

  const fmt = n => `RM ${Math.round(n||0).toLocaleString()}`

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.headerEmoji}>🎒</span>
        <div>
          <h1 className={styles.headerTitle}>School Fee Planner</h1>
          <p className={styles.headerDesc}>International, national, Tamil school cost comparison in Malaysia</p>
        </div>
      </div>
      <PrivacyNotice />

      <div className={styles.typeGrid}>
        {SCHOOL_TYPES.map(s=>(
          <button key={s.id} className={`${styles.typeBtn} ${type===s.id?styles.typeActive:''}`} style={type===s.id?{borderColor:s.color}:{}} onClick={()=>setType(s.id)}>
            <span>{s.icon}</span><span>{s.name}</span>
          </button>
        ))}
      </div>

      <div className={styles.inputCard}>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>💰 Fee Tier</label>
            <div className={styles.tierBtns}>
              {[['low','Budget'],['mid','Average'],['high','Premium']].map(([k,v])=>(
                <button key={k} className={`${styles.tierBtn} ${tier===k?styles.tierActive:''}`} onClick={()=>setTier(k)}>{v}</button>
              ))}
            </div>
          </div>
          <div className={styles.field}>
            <label>👧 Number of Children</label>
            <div className={styles.inputWrap}>
              <input type="number" min="1" max="5" value={children} onChange={e=>setChildren(e.target.value)} style={{paddingLeft:'14px'}} />
              <span className={styles.suffix}>child(ren)</span>
            </div>
          </div>
          <div className={styles.field}>
            <label>📅 Years of Schooling</label>
            <select value={years} onChange={e=>setYears(e.target.value)}>
              {[1,2,3,4,5,6,7,8,9,10,11,12,13].map(y=><option key={y} value={y}>{y} years</option>)}
            </select>
          </div>
        </div>
      </div>

      {result && school && (
        <>
          <div className={styles.summaryRow}>
            {[
              { l:'Tuition/year', v:fmt(result.annual) },
              { l:'Extras/year',  v:fmt(result.extras) },
              { l:'Total/month',  v:fmt(result.monthly), hi:true },
              { l:`${n} child × ${yrs} yrs`, v:fmt(result.totalAll), hi:true },
            ].map(s=>(
              <div key={s.l} className={`${styles.sumCard} ${s.hi?styles.sumHi:''}`}>
                <div className={styles.sumVal}>{s.v}</div>
                <div className={styles.sumLabel}>{s.l}</div>
              </div>
            ))}
          </div>
          <div className={styles.inrNote}>≈ ₹{Math.round(result.inr/100000)}L over {yrs} years (at today's rate)</div>

          <div className={styles.schoolInfo}>
            <p className={styles.schoolNotes}>{school.notes}</p>
            <div className={styles.prosConsGrid}>
              <div className={styles.prosCons}>
                <div className={styles.pcTitle}>✅ Pros</div>
                {school.pros.map((p,i)=><div key={i} className={styles.pcItem}>{p}</div>)}
              </div>
              <div className={styles.prosCons}>
                <div className={styles.pcTitle}>⚠️ Cons</div>
                {school.cons.map((c,i)=><div key={i} className={styles.pcItem}>{c}</div>)}
              </div>
            </div>
          </div>

          <div className={styles.compareAll}>
            <div className={styles.compareTitle}>💡 Quick Comparison</div>
            {SCHOOL_TYPES.map(s=>(
              <div key={s.id} className={`${styles.compareRow} ${type===s.id?styles.compareActive:''}`}>
                <span>{s.icon} {s.name}</span>
                <span style={{color:s.color, fontWeight:800}}>{fmt((s.annual.mid + Object.values(s.extras).reduce((a,b)=>a+b,0)) * n)}/yr</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
