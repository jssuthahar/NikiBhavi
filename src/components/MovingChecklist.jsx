import { useState } from 'react'
import styles from './MovingChecklist.module.css'
import PrivacyNotice from './PrivacyNotice'

const PHASES = [
  { id:'before', label:'📦 Before Leaving India', items:[
    { cat:'Documents (MUST have originals + 5 copies each)', items:[
      '✅ Passport (valid 18+ months)',
      '✅ Original degree certificates + transcripts',
      '✅ Experience letters from all previous employers',
      '✅ Birth certificate (apostilled)',
      '✅ Marriage certificate if applicable (apostilled)',
      '✅ Kids birth certificates (apostilled)',
      '✅ Medical records + vaccination records',
      '✅ Police clearance certificate',
      '✅ PAN card + Aadhaar card (will need for India account)',
      '✅ Bank statements 6 months',
      '✅ Photos (20+ passport size, different backgrounds)',
    ]},
    { cat:'Banking & Finance', items:[
      '💰 Keep India savings account ACTIVE — do not close',
      '💰 Inform your India bank of Malaysia travel',
      '💰 Carry USD 500–1,000 cash + forex card for first week',
      '💰 Set up UPI on phone before leaving',
      '💰 Check if your India credit card works internationally',
      '💰 Carry RM 500–1,000 ringgit if possible (buy at money changers)',
    ]},
    { cat:'What to bring from India', items:[
      '🇮🇳 Pressure cooker (Indian style — hard to find in Malaysia)',
      '🇮🇳 Idli/dosa maker, kadai, tawa',
      '🇮🇳 Indian spice collection (basics — available in MY but expensive)',
      '🇮🇳 Pooja items, calendar, family photos',
      '🇮🇳 Medicines: Zandu Balm, Moov, Amrutanjan, basic Ayurvedic items',
      '🇮🇳 Indian pickles (aachar) — 2–3 bottles',
      '🇮🇳 Sarees/traditional clothes (same price, fewer styles in MY)',
      '🇮🇳 Children toys, school books if continuing curriculum',
      '🇮🇳 Personal laptop + chargers + adapters',
    ]},
    { cat:'What NOT to bring (available cheaper here)', items:[
      '❌ Electronics (phones, laptops — same or cheaper in Malaysia)',
      '❌ Heavy furniture — buy here',
      '❌ Too many clothes — weather is hot all year, summer clothes only',
      '❌ Car accessories — won\'t fit Malaysian roads/cars',
      '❌ Heavy cooking oil containers — buy here',
    ]},
  ]},
  { id:'arrival', label:'✈️ First Week in Malaysia', items:[
    { cat:'Day 1 Priorities', items:[
      '📱 Buy SIM card at airport (Maxis/Celcom counters at KLIA/KLIA2)',
      '🏨 Check in to temporary accommodation (AirBnB or hotel booked in advance)',
      '💱 Exchange some cash at hotel — rates ok for emergency',
      '📞 Call family to confirm safe arrival',
      '📋 Check EP is stamped correctly in passport',
    ]},
    { cat:'Week 1 Checklist', items:[
      '🏦 Open bank account (Maybank or CIMB — bring passport + EP + employer letter)',
      '📱 Port to postpaid SIM after bank account (need bank for auto-debit)',
      '🏠 Start house hunting — use PropertyGuru, Facebook Indian groups',
      '🏢 Report to office, get company medical card from HR',
      '📋 Register with High Commission of India, Kuala Lumpur',
      '🗺️ Download Grab app, Google Maps, MyKad Wallet',
      '🛒 Find nearest Indian grocery store (ask Indian colleagues)',
    ]},
    { cat:'Register with India High Commission', items:[
      '🌐 Online at passportindia.gov.in or visit at Jalan Tun Razak, KL',
      '📋 Register as overseas Indian resident — important for emergencies',
      '📞 Save High Commission number: +603 2148 8833',
      '📄 Useful for emergency passport, consular services, attestation',
    ]},
  ]},
  { id:'month1', label:'🏠 Month 1 Setup', items:[
    { cat:'Home Setup Priority List', items:[
      '🏠 Sign tenancy agreement (read fully — check notice period, deposit terms)',
      '💧 Order water purifier (Coway rental RM 60–80/mo — call same day)',
      '🌐 Apply home internet (TM Unifi or TIME — 3–7 days installation)',
      '🛒 First big grocery run: Mydin, Tesco, or Indian grocery store',
      '🏠 Buy basics: floor mop, broom, bucket, hangers, kitchen utensils',
      '🔌 Check power sockets — Malaysia uses UK 3-pin (G type)',
      '❄️ Check all AC units work before landlord leaves',
      '📷 Take full video of apartment BEFORE moving in — WhatsApp to landlord',
    ]},
    { cat:'Government Registration', items:[
      '📋 Register children at nearby school (bring birth cert + EP + passport)',
      '🏥 Register at nearest Klinik Kesihatan for future govt hospital use',
      '🚗 If buying car: check loan eligibility at bank after 3 months payslips',
    ]},
    { cat:'India Matters', items:[
      '🇮🇳 File IT return in India if applicable (check with CA)',
      '🇮🇳 Inform India employer about DTAA (no double taxation between India–Malaysia)',
      '🇮🇳 Keep India bank account active — useful for returning money, investments',
      '🇮🇳 NRI status: after 182+ days outside India — inform bank to convert to NRO/NRE',
      '🇮🇳 Mutual funds in India: can continue — change to NRI status with AMC',
    ]},
  ]},
]

export default function MovingChecklist() {
  const [active, setActive] = useState('before')
  const phase = PHASES.find(p=>p.id===active)

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.emoji}>📦</span>
        <div>
          <h1 className={styles.title}>Moving to Malaysia Checklist</h1>
          <p className={styles.sub}>What to bring from India, first week setup, month 1 guide</p>
        </div>
      </div>
      <PrivacyNotice />
      <div className={styles.tabs}>
        {PHASES.map(p => <button key={p.id} className={`${styles.tab} ${active===p.id?styles.tabActive:''}`} onClick={()=>setActive(p.id)}>{p.label}</button>)}
      </div>
      <div className={styles.content} key={active}>
        {phase.items.map((group,i) => (
          <div key={i} className={styles.group}>
            <div className={styles.groupTitle}>{group.cat}</div>
            <div className={styles.itemsList}>
              {group.items.map((item,j) => (
                <div key={j} className={styles.item}>{item}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
