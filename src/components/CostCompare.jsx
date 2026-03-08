import { useState } from 'react'
import styles from './CostCompare.module.css'
import PrivacyNotice from './PrivacyNotice'

const MYR_INR = 19.5 // approx 2026 rate

const CITIES = {
  'kl':        { name:'Kuala Lumpur', flag:'🇲🇾', cur:'RM',  mul:1 },
  'penang':    { name:'Penang',       flag:'🇲🇾', cur:'RM',  mul:0.85 },
  'jb':        { name:'Johor Bahru',  flag:'🇲🇾', cur:'RM',  mul:0.78 },
  'mumbai':    { name:'Mumbai',       flag:'🇮🇳', cur:'₹',   mul:MYR_INR*0.95 },
  'bangalore': { name:'Bangalore',    flag:'🇮🇳', cur:'₹',   mul:MYR_INR*0.88 },
  'delhi':     { name:'Delhi',        flag:'🇮🇳', cur:'₹',   mul:MYR_INR*0.85 },
  'hyderabad': { name:'Hyderabad',    flag:'🇮🇳', cur:'₹',   mul:MYR_INR*0.80 },
  'chennai':   { name:'Chennai',      flag:'🇮🇳', cur:'₹',   mul:MYR_INR*0.78 },
}

const ITEMS = [
  { cat:'🏠 Housing',    items:[
    { name:'1-Bed Apartment Rent', kl:1800, unit:'/mo' },
    { name:'2-Bed Apartment Rent', kl:2600, unit:'/mo' },
    { name:'3-Bed House/Condo',    kl:4000, unit:'/mo' },
  ]},
  { cat:'🛒 Groceries',  items:[
    { name:'Rice 5kg',             kl:22,   unit:'' },
    { name:'Chicken 1kg',          kl:10,   unit:'' },
    { name:'Eggs (30 pcs)',        kl:15,   unit:'' },
    { name:'Milk 1L',              kl:7,    unit:'' },
    { name:'Monthly groceries (family 2)', kl:800, unit:'/mo' },
  ]},
  { cat:'🚗 Transport',  items:[
    { name:'Petrol (Litre)',        kl:2.05, unit:'' },
    { name:'Monthly Grab/taxi budget', kl:300, unit:'/mo' },
    { name:'MRT/LRT monthly pass', kl:100,  unit:'/mo' },
    { name:'Car Insurance (1yr, sedan)', kl:2200, unit:'/yr' },
  ]},
  { cat:'🍽️ Food',       items:[
    { name:'Mamak meal (roti+teh)', kl:8,   unit:'' },
    { name:'Food court lunch',      kl:12,  unit:'' },
    { name:'Restaurant dinner (2)', kl:70,  unit:'' },
    { name:'McDonald\'s meal',      kl:18,  unit:'' },
  ]},
  { cat:'🏥 Health',     items:[
    { name:'GP clinic visit',       kl:50,  unit:'' },
    { name:'Private hospital consultation', kl:150, unit:'' },
    { name:'Health insurance (annual)', kl:3600, unit:'/yr' },
  ]},
  { cat:'🎓 Education',  items:[
    { name:'International school (annual)', kl:45000, unit:'/yr' },
    { name:'National school (annual)',      kl:2000,  unit:'/yr' },
    { name:'Tamil school (annual)',         kl:1500,  unit:'/yr' },
  ]},
]

export default function CostCompare() {
  const [cityA, setCityA] = useState('kl')
  const [cityB, setCityB] = useState('bangalore')

  const ca = CITIES[cityA]
  const cb = CITIES[cityB]
  const isMYR_A = ca.cur === 'RM'
  const isMYR_B = cb.cur === 'RM'

  const fmt = (base, city) => {
    const c = CITIES[city]
    const val = base * c.mul
    return `${c.cur} ${val < 100 ? val.toFixed(0) : Math.round(val).toLocaleString()}`
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.headerEmoji}>⚖️</span>
        <div>
          <h1 className={styles.headerTitle}>India vs Malaysia Cost Comparison</h1>
          <p className={styles.headerDesc}>Side-by-side cost of living — groceries, rent, food, transport</p>
        </div>
      </div>
      <PrivacyNotice />

      <div className={styles.cityPicker}>
        <div className={styles.cityCol}>
          <div className={styles.cityLabel}>City A</div>
          <select value={cityA} onChange={e=>setCityA(e.target.value)}>
            {Object.entries(CITIES).map(([k,v])=><option key={k} value={k}>{v.flag} {v.name}</option>)}
          </select>
        </div>
        <div className={styles.vsCircle}>VS</div>
        <div className={styles.cityCol}>
          <div className={styles.cityLabel}>City B</div>
          <select value={cityB} onChange={e=>setCityB(e.target.value)}>
            {Object.entries(CITIES).map(([k,v])=><option key={k} value={k}>{v.flag} {v.name}</option>)}
          </select>
        </div>
      </div>

      {ITEMS.map(cat=>(
        <div key={cat.cat} className={styles.catSection}>
          <div className={styles.catTitle}>{cat.cat}</div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead><tr><th>Item</th><th>{ca.flag} {ca.name}</th><th>{cb.flag} {cb.name}</th><th>Cheaper</th></tr></thead>
              <tbody>
                {cat.items.map(item=>{
                  const valA = item.kl * ca.mul
                  const valB = item.kl * cb.mul
                  const aCheaper = valA <= valB
                  return (
                    <tr key={item.name}>
                      <td className={styles.itemName}>{item.name}<span className={styles.unit}>{item.unit}</span></td>
                      <td className={aCheaper?styles.cheaper:''}>{fmt(item.kl,cityA)}</td>
                      <td className={!aCheaper?styles.cheaper:''}>{fmt(item.kl,cityB)}</td>
                      <td>{aCheaper?ca.flag:cb.flag}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <div className={styles.note}>⚠️ <strong>Note:</strong> Prices are approximate averages for 2026. Actual costs vary by neighborhood, lifestyle, and market conditions. Use as a guide for planning only.</div>
    </div>
  )
}
