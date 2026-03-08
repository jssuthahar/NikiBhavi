import { useState, useMemo } from 'react'
import styles from './RentCalc.module.css'
import PrivacyNotice from './PrivacyNotice'

const AREAS = {
  kl: [
    { name:'KLCC / Bukit Bintang', studio:3500, room1:2800, room2:3800, room3:5000, tag:'Premium' },
    { name:'Mont Kiara / Sri Hartamas', studio:2800, room1:2400, room2:3200, room3:4200, tag:'Expat-Friendly' },
    { name:'Bangsar / Damansara',  studio:2400, room1:2000, room2:2800, room3:3800, tag:'Popular' },
    { name:'Cheras / Ampang',      studio:1500, room1:1300, room2:1800, room3:2500, tag:'Affordable' },
    { name:'Setapak / Wangsa Maju',studio:1200, room1:1000, room2:1500, room3:2000, tag:'Budget' },
    { name:'Subang Jaya / USJ',    studio:1600, room1:1400, room2:1900, room3:2600, tag:'Family' },
    { name:'Petaling Jaya (PJ)',   studio:1800, room1:1600, room2:2200, room3:3000, tag:'Popular' },
    { name:'Puchong',              studio:1300, room1:1100, room2:1600, room3:2200, tag:'Budget' },
  ],
  penang: [
    { name:'Georgetown',           studio:1200, room1:1000, room2:1400, room3:1900, tag:'Heritage' },
    { name:'Tanjung Tokong / Gurney', studio:1600, room1:1400, room2:2000, room3:2800, tag:'Upmarket' },
    { name:'Bayan Lepas / Batu Maung', studio:1100, room1:950, room2:1350, room3:1800, tag:'Near Factory' },
  ],
  jb: [
    { name:'JB City / Larkin',     studio:900, room1:800, room2:1100, room3:1500, tag:'Central' },
    { name:'Bukit Indah / Tebrau', studio:1100, room1:950, room2:1350, room3:1900, tag:'Family' },
    { name:'Iskandar Puteri',      studio:1200, room1:1050, room2:1500, room3:2100, tag:'New Dev' },
  ],
}

const RULE_PCT = 0.3 // 30% of take-home on rent

export default function RentCalc() {
  const [city,     setCity]     = useState('kl')
  const [salary,   setSalary]   = useState('')
  const [roomType, setRoomType] = useState('room2')

  const result = useMemo(() => {
    const sal       = parseFloat(salary) || 0
    const maxRent   = sal * RULE_PCT
    const areas     = AREAS[city]
    const affordable= areas.filter(a => a[roomType] <= maxRent)
    const stretch   = areas.filter(a => a[roomType] > maxRent && a[roomType] <= maxRent * 1.3)
    const pricey    = areas.filter(a => a[roomType] > maxRent * 1.3)
    return { maxRent, affordable, stretch, pricey, areas }
  }, [city, salary, roomType])

  const roomLabels = { studio:'Studio', room1:'1-Bed', room2:'2-Bed', room3:'3-Bed' }

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.headerEmoji}>🏠</span>
        <div>
          <h1 className={styles.headerTitle}>Rent Affordability Calculator</h1>
          <p className={styles.headerDesc}>Find your budget-friendly neighborhoods across KL, Penang & JB</p>
        </div>
      </div>
      <PrivacyNotice />

      <div className={styles.inputCard}>
        <div className={styles.fieldsRow}>
          <div className={styles.field}>
            <label>💰 Monthly Take-Home Salary (RM)</label>
            <div className={styles.inputWrap}>
              <span className={styles.prefix}>RM</span>
              <input type="number" min="0" value={salary} onChange={e=>setSalary(e.target.value)} placeholder="e.g. 5000" />
            </div>
          </div>
          <div className={styles.field}>
            <label>🏙️ City</label>
            <div className={styles.cityBtns}>
              {Object.entries({kl:'Kuala Lumpur',penang:'Penang',jb:'Johor Bahru'}).map(([k,v])=>(
                <button key={k} className={`${styles.cityBtn} ${city===k?styles.cityActive:''}`} onClick={()=>setCity(k)}>{v}</button>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.roomBtns}>
          {Object.entries(roomLabels).map(([k,v])=>(
            <button key={k} className={`${styles.roomBtn} ${roomType===k?styles.roomActive:''}`} onClick={()=>setRoomType(k)}>{v}</button>
          ))}
        </div>
        {salary && <div className={styles.budgetInfo}>💡 30% rule: your max rent budget = <strong>RM {Math.round(result.maxRent).toLocaleString()}/month</strong></div>}
      </div>

      {salary && (<>
        {[
          { label:'✅ Within Budget', items:result.affordable, cls:styles.catGreen },
          { label:'⚠️ Slightly Over (stretch)', items:result.stretch, cls:styles.catYellow },
          { label:'💸 Too Expensive', items:result.pricey, cls:styles.catRed },
        ].map(cat => cat.items.length > 0 && (
          <div key={cat.label} className={styles.areaSection}>
            <div className={`${styles.catLabel} ${cat.cls}`}>{cat.label}</div>
            <div className={styles.areaGrid}>
              {cat.items.map(a => (
                <div key={a.name} className={`${styles.areaCard} ${cat.cls===styles.catGreen?styles.cardGreen:cat.cls===styles.catYellow?styles.cardYellow:styles.cardRed}`}>
                  <div className={styles.areaName}>{a.name}</div>
                  <div className={styles.areaTag}>{a.tag}</div>
                  <div className={styles.areaPrice}>RM {a[roomType].toLocaleString()}<span>/mo</span></div>
                  <div className={styles.areaPct}>{Math.round((a[roomType]/parseFloat(salary))*100)}% of income</div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className={styles.tipsBox}>
          <div className={styles.tipsTitle}>💡 Renting Tips for Indians in Malaysia</div>
          {[
            '📋 Always sign a Tenancy Agreement (TA) — 2% stamp duty, keep your copy',
            '💰 Budget 3 months deposit upfront (2 months security + 1 month utilities)',
            '🚇 Check LRT/MRT access — saves RM 400–800/month vs car + parking',
            '🇮🇳 Indian communities are strong in Brickfields (KL), Batu Caves, Klang',
            '📱 Use PropertyGuru, iProperty or Facebook groups to find rentals',
          ].map((t,i)=><div key={i} className={styles.tip}>{t}</div>)}
        </div>
      </>)}
    </div>
  )
}
