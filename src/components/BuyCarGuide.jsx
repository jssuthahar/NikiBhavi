import { useState } from 'react'
import styles from './BuyCarGuide.module.css'
import PrivacyNotice from './PrivacyNotice'

const SECTIONS = [
  { id:'new', label:'🚗 New Car', content: {
    title: 'Buying a New Car in Malaysia',
    steps:[
      {t:'Choose brand & model',d:'Perodua & Proton — Malaysia national brands, cheapest, best service centres, parts available everywhere. Japanese (Honda, Toyota) — reliable, higher cost, better resale value. Europeans — expensive maintenance, harder to service.'},
      {t:'Visit showroom & book',d:'No hard sell culture. Visit 2–3 showrooms to compare deals. Pay booking fee RM 500–2,000 (refundable if loan rejected). Get written quotation with OTR price (On The Road — includes road tax, insurance, registration).'},
      {t:'Apply for car loan',d:'Bank will contact you or apply at showroom\'s finance partner. Need: passport, EP, 3 months payslip, employment letter, bank statements. Approval takes 1–3 working days.'},
      {t:'Wait for car delivery',d:'Perodua/Proton: 1–6 months waiting (popular models). Japanese: 1–3 months. During wait, insurance is arranged. Pay down payment when delivery confirmed.'},
      {t:'Delivery day',d:'Check car thoroughly before signing — every scratch, dent, missing accessory. Test all electronics. Get all documents: grant (ownership card), insurance policy, warranty card, spare key.'},
    ],
    tips:['💡 OTR (On The Road) price includes road tax 1yr, insurance, registration — always compare OTR not just car price','🎁 Negotiate free accessories: tinted windows, floor mat, dash cam, first service free','📋 EP holders: bank may require 3 months in Malaysia before approving loan','🔄 Perodua Myvi has best resale — easiest to sell when leaving Malaysia','⚠️ Never pay "under table" for faster delivery — not worth it']
  }},
  { id:'used', label:'🔧 Used Car', content: {
    title: 'Buying a Used Car',
    steps:[
      {t:'Where to find used cars',d:'Mudah.my, Carsome, myTukar — verified used car platforms. Carsome & myTukar inspect and certify cars. Facebook groups "Used cars Malaysia". Second-hand dealers in Cheras, Klang, USJ areas.'},
      {t:'Check the car properly',d:'Run the plate number at JPJ (Road Transport Dept) online — check owner history, accident records, outstanding summons. Hire a mechanic to inspect before buying (RM 150–300 well spent). Check for flood damage: look under seats, smell carpet.'},
      {t:'Transfer ownership (Puspakom)',d:'Both buyer and seller go to Puspakom for road worthiness inspection (RM 70–100). Then transfer at JPJ. Bring IC/passport, grant, insurance. Transfer takes 1 day.'},
      {t:'Insurance & road tax',d:'Get new insurance in your name before road tax renewal. As EP holder, use your passport as ID. Etiqa, AIA, Berjaya Sompo — compare online at Loanstreet or CoverageOne.'},
    ],
    tips:['🔍 Carsome & myTukar are safer for first-time buyers — certified inspected','📋 Check: Puspakom B2 inspection certificate is must for private sale','⚠️ Avoid cars older than 10 years for EP holders — spare parts get hard to find','💰 Proton Saga used RM 15,000–30,000 — most affordable reliable option','🔑 Always transfer ownership within 3 months of purchase — fine otherwise']
  }},
  { id:'compare', label:'⚖️ Brand Guide', content: {
    title: 'Perodua vs Proton vs Japanese — Which to Choose?',
    brands:[
      {name:'Perodua',flag:'🇲🇾',pros:['Cheapest to buy (RM 40K–80K)','Cheapest to maintain','Service centres everywhere','Best resale value for national cars','Myvi — most popular car in Malaysia'],cons:['Smaller engine, less powerful','Basic features in lower variants','Less prestigious'],best:'Best for: Budget buyers, new to Malaysia, plan to sell in 2–3 years',color:'#2563eb'},
      {name:'Proton',flag:'🇲🇾',pros:['More features at lower price','X50 / X70 good SUV value','Geely technology (Proton is now Geely-owned)','Good for families'],cons:['Historically lower reliability','Fewer service centres than Perodua','Weaker resale value'],best:'Best for: Family SUV on budget, style-conscious buyers',color:'#16a34a'},
      {name:'Honda / Toyota',flag:'🇯🇵',pros:['Excellent reliability','Strong resale value','Better driving experience','Trusted by most Indians in Malaysia'],cons:['Higher purchase price','Higher insurance','More expensive service'],best:'Best for: Long-term stay, higher income, prefer quality',color:'#ef4444'},
      {name:'Mazda / Mitsubishi',flag:'🇯🇵',pros:['Premium feel at mid-range price','Good safety ratings','Mazda CX series very popular'],cons:['Fewer service centres','Higher parts cost'],best:'Best for: Premium feel without European price tag',color:'#f59e0b'},
    ]
  }},
  { id:'ep', label:'📋 EP Holder Tips', content: {
    title: 'Car Buying Guide Specifically for EP Holders',
    items:[
      {t:'Can EP holders buy cars?',d:'Yes, 100%. EP holders have full rights to purchase any vehicle in Malaysia. No restrictions. Car grant (ownership) will show your passport number as owner.'},
      {t:'Loan eligibility',d:'EP must be valid for at least 1 year remaining. Most banks require 3+ months Malaysian employment. Documents: passport, EP, 3 payslips, employment letter, bank statements. Interest rate 2.85–3.05% p.a.'},
      {t:'What happens when EP expires?',d:'You must sell or transfer the car before leaving Malaysia permanently. If EP is renewed, car ownership continues normally. You can sell to any Malaysian buyer.'},
      {t:'Insurance as foreigner',d:'Car insurance is mandatory. Use passport as ID. Any Malaysian insurer will cover you. Comprehensive insurance recommended — covers theft, accidents, third party.'},
      {t:'Road tax (cukai jalan)',d:'Road tax renewed annually. Based on engine CC. Small cars (below 1000cc): ~RM 20/year. 1000–1600cc: RM 90–140/year. Renew at post office or MyEG online with insurance first.'},
      {t:'Best areas to service car',d:'Perodua/Proton: official service centres everywhere. Cheras, Ampang, Puchong have many Indian-run workshops trusted by the community for mid-service maintenance.'},
    ]
  }},
]

export default function BuyCarGuide() {
  const [active, setActive] = useState('new')
  const sec = SECTIONS.find(s=>s.id===active)

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.emoji}>🚗</span>
        <div>
          <h1 className={styles.title}>Buying a Car in Malaysia</h1>
          <p className={styles.sub}>New, used, which brand — complete guide for EP holders 2026</p>
        </div>
      </div>
      <PrivacyNotice />

      <div className={styles.tabs}>
        {SECTIONS.map(s => <button key={s.id} className={`${styles.tab} ${active===s.id?styles.tabActive:''}`} onClick={()=>setActive(s.id)}>{s.label}</button>)}
      </div>

      <div className={styles.content} key={active}>
        <h2 className={styles.contentTitle}>{sec.content.title}</h2>

        {sec.content.steps && (
          <>
            <div className={styles.steps}>
              {sec.content.steps.map((s,i) => (
                <div key={i} className={styles.step}>
                  <div className={styles.stepNum}>{i+1}</div>
                  <div><strong className={styles.stepT}>{s.t}</strong><p className={styles.stepD}>{s.d}</p></div>
                </div>
              ))}
            </div>
            <div className={styles.tips}>
              {sec.content.tips.map((t,i) => <div key={i} className={styles.tip}>{t}</div>)}
            </div>
          </>
        )}

        {sec.content.brands && (
          <div className={styles.brandsGrid}>
            {sec.content.brands.map((b,i) => (
              <div key={i} className={styles.brandCard} style={{'--accent':b.color}}>
                <div className={styles.brandName}>{b.flag} {b.name}</div>
                <div className={styles.pros}>{b.pros.map((p,j)=><div key={j}>✅ {p}</div>)}</div>
                <div className={styles.cons}>{b.cons.map((c,j)=><div key={j}>⚠️ {c}</div>)}</div>
                <div className={styles.bestFor}>{b.best}</div>
              </div>
            ))}
          </div>
        )}

        {sec.content.items && (
          <div className={styles.itemsList}>
            {sec.content.items.map((item,i) => (
              <div key={i} className={styles.item}>
                <div className={styles.itemT}>❓ {item.t}</div>
                <div className={styles.itemD}>{item.d}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
