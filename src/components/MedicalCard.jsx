import { useState, useMemo } from 'react'
import styles from './MedicalCard.module.css'
import PrivacyNotice from './PrivacyNotice'

const PLANS = [
  { name:'AIA A-Life Protect', type:'Medical+Life', annualLimit:'RM 100K', lifeLimit:'RM 500K', price:{25:180,30:220,35:290,40:380,45:510}, panel:'AIA panel clinics & hospitals', best:'Best overall + life coverage', color:'#dc2626', rating:5 },
  { name:'Great Eastern GREAT MediShield', type:'Medical Card', annualLimit:'RM 150K', lifeLimit:'—', price:{25:120,30:155,35:200,40:270,45:360}, panel:'Great Eastern panel', best:'Highest annual limit value', color:'#2563eb', rating:5 },
  { name:'Prudential PRUMedical', type:'Medical Card', annualLimit:'RM 100K', lifeLimit:'—', price:{25:130,30:165,35:215,40:285,45:375}, panel:'Wide Prudential panel', best:'Easy claims, fast processing', color:'#7c3aed', rating:4 },
  { name:'Allianz SmartHealth', type:'Medical Card', annualLimit:'RM 200K', lifeLimit:'—', price:{25:145,30:185,35:240,40:320,45:430}, panel:'Allianz panel + cashless', best:'Highest annual limit', color:'#f59e0b', rating:4 },
  { name:'Takaful Malaysia', type:'Takaful (Shariah)', annualLimit:'RM 100K', lifeLimit:'RM 300K', price:{25:100,30:130,35:170,40:230,45:310}, panel:'Takaful panel hospitals', best:'Shariah-compliant option', color:'#16a34a', rating:3 },
]

const GOVT_HOSPITALS = [
  { name:'Hospital Kuala Lumpur (HKL)', area:'KL Centre', specialist:'All specialties, trauma center, 24hr A&E', cost:'RM 1–5 per visit (heavily subsidised)', note:'Long wait 2–6 hours typical' },
  { name:'Hospital Universiti Kebangsaan Malaysia (HUKM)', area:'Cheras', specialist:'Full specialist, research hospital', cost:'RM 1–5 per visit', note:'Good for complex cases' },
  { name:'Hospital Ampang', area:'Ampang', specialist:'General & some specialist', cost:'RM 1–5', note:'Near Indian community area' },
  { name:'Hospital Putrajaya', area:'Putrajaya', specialist:'Full specialist, modern facilities', cost:'RM 1–5', note:'Less crowded than HKL' },
]

const PANEL_HOSPITALS = [
  { name:'Pantai Hospital KL', area:'Bangsar', type:'Private Panel', cost:'RM 0 with company card / copay RM 50–200', note:'Top private hospital' },
  { name:'KPJ Tawakkal', area:'Jalan Pahang', type:'Private Panel', cost:'RM 0 with company card', note:'Good for Indian staff' },
  { name:'Columbia Asia', area:'Multiple locations', type:'Private Panel', cost:'Copay RM 30–100', note:'Many locations, convenient' },
  { name:'Sunway Medical', area:'Subang', type:'Private', cost:'RM 200–2,000+ per visit', note:'Premium private hospital' },
  { name:'Gleneagles KL', area:'Jalan Ampang', type:'Private', cost:'RM 300–5,000+ per visit', note:'Top-tier specialists' },
]

const CLINIC_TYPES = [
  { type:'Panel Clinic (from company)', cost:'FREE or RM 1–5 copay', coverage:'GP visits, MC certificate, basic medications', tip:'Get list of panel clinics from your company HR on day 1' },
  { type:'Government Clinic (Klinik Kesihatan)', cost:'RM 1–5 per visit', coverage:'GP, basic medication, referral letter to specialist', tip:'Bring passport + EP. Near every neighbourhood.' },
  { type:'Private GP Clinic', cost:'RM 30–80 per visit', coverage:'Faster, no queue, prescription medications', tip:'Use for non-urgent cases when panel clinic is far' },
  { type:'24hr Clinic', cost:'RM 50–120', coverage:'After hours emergencies, same as private GP', tip:'Poliklinik Klinik 1Malaysia near major areas' },
  { type:'Specialist (private)', cost:'RM 150–500 per consultation', coverage:'Specialist care, needs referral letter from GP', tip:'Always get referral from GP first — saves RM 50–100 on fees' },
  { type:'A&E (Accident & Emergency)', cost:'FREE at govt hospital / RM 200–1000 private', coverage:'Life-threatening emergencies only', tip:'Go to govt hospital A&E for serious emergencies — same quality' },
]

const AGES = [25,30,35,40,45]

export default function MedicalCard() {
  const [age,      setAge]      = useState('30')
  const [hasComp,  setHasComp]  = useState('yes')
  const [tab,      setTab]      = useState('advisor')

  const ageKey = AGES.reduce((prev, curr) => Math.abs(curr - parseInt(age)) < Math.abs(prev - parseInt(age)) ? curr : prev)

  const recommended = useMemo(() => {
    return PLANS.filter(p => parseInt(age) <= 45).sort((a,b) => a.price[ageKey] - b.price[ageKey])
  }, [age, ageKey])

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.emoji}>🏥</span>
        <div>
          <h1 className={styles.title}>Medical Card Advisor</h1>
          <p className={styles.sub}>Insurance, hospitals, clinics — complete guide for Indians in Malaysia</p>
        </div>
      </div>
      <PrivacyNotice />

      <div className={styles.tabs}>
        {[['advisor','💊 Medical Card'], ['clinic','🏥 Clinics & Hospitals'], ['govt','🏛️ Govt Hospital']].map(([id,label]) => (
          <button key={id} className={`${styles.tab} ${tab===id?styles.tabActive:''}`} onClick={()=>setTab(id)}>{label}</button>
        ))}
      </div>

      {tab === 'advisor' && (
        <>
          <div className={styles.inputCard}>
            <div className={styles.inputRow}>
              <div className={styles.field}>
                <label>🎂 Your Age</label>
                <div className={styles.inputWrap}><input type="number" min="18" max="65" value={age} onChange={e=>setAge(e.target.value)} /><span className={styles.suffix}>years</span></div>
              </div>
              <div className={styles.field}>
                <label>🏢 Company Medical Card?</label>
                <select value={hasComp} onChange={e=>setHasComp(e.target.value)}>
                  <option value="yes">Yes — company provides</option>
                  <option value="no">No — need personal card</option>
                </select>
              </div>
            </div>
            {hasComp === 'yes' && (
              <div className={styles.companyNote}>
                ✅ Great! Your company card covers hospitalisation. Still consider a <strong>personal top-up card</strong> for higher limits, specialist coverage, and coverage after leaving the company.
              </div>
            )}
          </div>

          <div className={styles.plansGrid}>
            {recommended.map((p,i) => (
              <div key={i} className={styles.planCard} style={{'--accent':p.color}}>
                <div className={styles.planTop}>
                  <div>
                    <div className={styles.planName}>{p.name}</div>
                    <div className={styles.planType}>{p.type}</div>
                  </div>
                  <div className={styles.planPrice}>
                    <span>RM {p.price[ageKey]}</span>/mo
                    {i===0 && <div className={styles.bestTag}>Best Value</div>}
                  </div>
                </div>
                <div className={styles.planRows}>
                  {[['Annual Limit', p.annualLimit],['Life Coverage', p.lifeLimit],['Panel', p.panel],['Best For', p.best]].map(([k,v]) => (
                    <div key={k} className={styles.planRow}><span>{k}</span><strong>{v}</strong></div>
                  ))}
                </div>
                <div className={styles.planRating}>{'⭐'.repeat(p.rating)}</div>
              </div>
            ))}
          </div>

          <div className={styles.tipsBox}>
            <div className={styles.tipsTitle}>💡 Medical Card Tips for EP Holders</div>
            {['🏢 Ask HR on day 1: "What is my medical card limit and panel hospital list?"',
              '📋 EP holders can buy personal medical insurance — bring passport + EP to agent',
              '⏱️ Pre-existing conditions may be excluded for 1–2 years — buy early when healthy',
              '🇮🇳 Indian-specific: get one that covers India hospitalization — useful during home visits',
              '💰 RM 120–300/month for good coverage is worthwhile — one hospital stay = RM 5,000–50,000',
              '📱 Keep digital copy of insurance card on phone — emergency admission needs it'
            ].map((t,i) => <div key={i} className={styles.tip}>{t}</div>)}
          </div>
        </>
      )}

      {tab === 'clinic' && (
        <>
          <div className={styles.clinicGrid}>
            {CLINIC_TYPES.map((c,i) => (
              <div key={i} className={styles.clinicCard}>
                <div className={styles.clinicType}>{c.type}</div>
                <div className={styles.clinicCost}>{c.cost}</div>
                <div className={styles.clinicCoverage}>{c.coverage}</div>
                <div className={styles.clinicTip}>💡 {c.tip}</div>
              </div>
            ))}
          </div>
          <div className={styles.sectionHead}>🏥 Major Private Panel Hospitals</div>
          {PANEL_HOSPITALS.map((h,i) => (
            <div key={i} className={styles.hospRow}>
              <div><strong>{h.name}</strong> <span className={styles.hospArea}>— {h.area}</span></div>
              <div className={styles.hospType}>{h.type}</div>
              <div className={styles.hospCost}>{h.cost}</div>
              <div className={styles.hospNote}>{h.note}</div>
            </div>
          ))}
        </>
      )}

      {tab === 'govt' && (
        <>
          <div className={styles.govtNote}>
            🏛️ Government hospitals charge RM 1–5 per visit for foreigners (heavily subsidised). EP holders are eligible. Quality is good but waiting time is long. Bring passport + EP always.
          </div>
          {GOVT_HOSPITALS.map((h,i) => (
            <div key={i} className={styles.govtCard}>
              <div className={styles.govtName}>{h.name}</div>
              <div className={styles.govtArea}>📍 {h.area}</div>
              <div className={styles.govtSpec}>🏥 {h.specialist}</div>
              <div className={styles.govtCost}>💰 {h.cost}</div>
              <div className={styles.govtNote}>⏱️ {h.note}</div>
            </div>
          ))}
          <div className={styles.tipsBox} style={{marginTop:'14px'}}>
            {['🚨 For life-threatening emergency — Hospital KL A&E is world-class, free for EP holders',
              '🧾 Get referral letter from Klinik Kesihatan before going to specialist — saves RM 100+ and queue time',
              '💊 Government pharmacy (farmasi): medication at 10–20% of private pharmacy price',
              '📋 Keep all hospital receipts — claimable under medical relief in annual tax filing'
            ].map((t,i) => <div key={i} className={styles.tip}>{t}</div>)}
          </div>
        </>
      )}
    </div>
  )
}
