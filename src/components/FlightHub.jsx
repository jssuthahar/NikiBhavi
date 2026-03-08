import { useState, useMemo } from 'react'
import styles from './FlightHub.module.css'
import PrivacyNotice from './PrivacyNotice'

// ─── BAGGAGE DATA ─────────────────────────────────────────────
const AIRLINES = [
  {
    name:'AirAsia', code:'AK', type:'LCC', routes:['KUL→MAA','KUL→BLR','KUL→CCU','KUL→AMD'],
    checkin:{ economy:'20kg (paid add-on)', business:'N/A' },
    cabin:{ economy:'7kg max, 56×36×23cm', business:'N/A' },
    laptops:'2 laptops allowed in cabin bag',
    liquids:'100ml per container, 1L clear bag, cabin only',
    restricted:['Power banks > 100Wh checked bag NOT allowed','Lithium battery devices must be in cabin','No grinder in checked bag if sharp blades','Mixer allowed if declared'],
    tips:['Pre-book baggage online — 30% cheaper than airport','20kg is default checked bag — upgrade in 5kg increments','Carry-on 7kg is strict — weighed at gate sometimes'],
    color:'#ef4444'
  },
  {
    name:'Malaysia Airlines', code:'MH', type:'Full Service', routes:['KUL→MAA','KUL→BLR','KUL→DEL','KUL→BOM','KUL→HYD'],
    checkin:{ economy:'30kg', business:'40kg' },
    cabin:{ economy:'7kg, 56×36×23cm', business:'10kg' },
    laptops:'2 laptops allowed cabin, unlimited in checked',
    liquids:'100ml/container, 1L clear bag, cabin only. Checked: no restriction.',
    restricted:['Lithium batteries >160Wh banned','Power bank 100–160Wh: max 2, cabin only','Knives/sharp grinder blades: checked bag only'],
    tips:['30kg economy checked is generous','Overweight is RM 100 per 5kg at airport','Book direct — MH miles program worth it for frequent flyers'],
    color:'#1a56b0'
  },
  {
    name:'IndiGo', code:'6E', type:'LCC', routes:['KUL→MAA','KUL→DEL','KUL→BLR','KUL→CCU'],
    checkin:{ economy:'15kg (add-on for more)', business:'N/A' },
    cabin:{ economy:'7kg, 55×35×25cm', business:'N/A' },
    laptops:'2 laptops allowed in cabin',
    liquids:'100ml rule applies for cabin',
    restricted:['No power bank >100Wh in checked bag','Sharp appliances in checked bag only'],
    tips:['Buy 15kg checked allowance at booking — cheapest','Extra bag fee at airport is very high','Strict on cabin bag size — measure before packing'],
    color:'#1e40af'
  },
  {
    name:'Air India', code:'AI', type:'Full Service', routes:['KUL→DEL','KUL→BOM','KUL→MAA','KUL→BLR'],
    checkin:{ economy:'25kg', business:'40kg' },
    cabin:{ economy:'8kg, 55×35×25cm', business:'12kg' },
    laptops:'2 laptops allowed',
    liquids:'Standard 100ml rule for cabin',
    restricted:['Lithium batteries as per IATA standards','Checked bag sharp items must be wrapped'],
    tips:['25kg is standard economy — no need to add','Good for heavy items — generous allowance','Star Alliance miles accumulation'],
    color:'#dc2626'
  },
  {
    name:'Batik Air (Malindo)', code:'OD', type:'Hybrid', routes:['KUL→MAA','KUL→BLR','KUL→DEL','KUL→HYD','KUL→CCU'],
    checkin:{ economy:'20kg', business:'30kg' },
    cabin:{ economy:'7kg, 56×36×23cm', business:'10kg' },
    laptops:'2 laptops in cabin',
    liquids:'Standard 100ml cabin rule',
    restricted:['Power banks >160Wh not allowed','Sharp items checked only'],
    tips:['Often cheapest option for smaller cities','20kg included — no extra cost','Check-in counters close 45min before departure'],
    color:'#f59e0b'
  },
]

const APPLIANCES = [
  { item:'Mixer / Juicer', allowed:'✅', where:'Checked bag', note:'Blade must be removed, wrapped in cloth/bubble wrap, declared at check-in. 750W+ may need declaration.' },
  { item:'Grinder (wet/dry)', allowed:'✅', where:'Checked bag only', note:'Sharp stone/blade — MUST be in checked bag. Clean before packing. Declare if needed. 100% allowed if no sharp loose parts.' },
  { item:'Pressure Cooker', allowed:'✅', where:'Checked bag', note:'Completely empty, dry, clean. Remove gasket. Popular item — usually no issues.' },
  { item:'Laptop (each)', allowed:'✅', where:'Cabin bag', note:'2 laptops max in cabin (most airlines). Additional in checked bag is fine too. Keep charger accessible.' },
  { item:'Power Bank', allowed:'⚡', where:'Cabin ONLY', note:'<100Wh: unlimited. 100–160Wh: max 2, cabin only. >160Wh: NOT allowed on any flight. Check Wh rating (usually printed on bank).' },
  { item:'Electric Shaver/Trimmer', allowed:'✅', where:'Cabin or checked', note:'Battery-powered: cabin OK. Lithium battery trimmers: cabin only.' },
  { item:'Hair Dryer', allowed:'✅', where:'Checked bag', note:'No issues. Pack in checked bag to save cabin space. 2000W models fine.' },
  { item:'Iron Box', allowed:'✅', where:'Checked bag', note:'Completely cool, dry. No loose water. Standard clothes iron — no issues.' },
  { item:'TV (small, <32")', allowed:'✅', where:'Checked (fragile)', note:'Pack very well with bubble wrap. Declare as fragile. Airlines charge extra for oversized (>158cm combined dimensions). Usually RM 200–500 extra.' },
  { item:'TV (32" and above)', allowed:'⚡', where:'Cargo / Courier', note:'Too large for standard checked bag. Use cargo service — much cheaper than airline oversize. DHL, Skynet Malaysia, PGEON for large items.' },
  { item:'Scissors (<6cm)', allowed:'✅', where:'Cabin', note:'Under 6cm blade in cabin. Over 6cm: checked only.' },
  { item:'Kitchen Knife', allowed:'✅', where:'Checked only', note:'Must be wrapped and sheathed. NEVER in cabin bag — confiscated.' },
  { item:'Lithium Batteries', allowed:'⚡', where:'Cabin only', note:'<100Wh: unlimited. 100–160Wh: 2 max in cabin. >160Wh banned.' },
  { item:'Aerosol Spray', allowed:'⚡', where:'Checked + limits', note:'Non-flammable: 500ml each, 2L total in checked. Deodorant/hairspray: checked bag. No flammable aerosols (paint, etc.).' },
  { item:'Perfume/Alcohol', allowed:'✅', where:'Checked (100ml cabin)', note:'Cabin: 100ml bottles in 1L clear bag. Checked: up to 5 litres total. Declare if >2L.' },
  { item:'Medicines', allowed:'✅', where:'Cabin + checked', note:'Prescription meds: cabin with doctor\'s letter. Liquids over 100ml: need medical certificate. Keep in original packing.' },
]

const COURIER_SERVICES = [
  { name:'DHL Express Malaysia', type:'International Courier', kgRate:'RM 80–120/kg to India', minWeight:'0.5kg', time:'2–4 business days', best:'Documents, electronics, valuables', note:'Most reliable. Good tracking. Insurance available.' },
  { name:'FedEx Malaysia', type:'International Courier', kgRate:'RM 70–110/kg to India', minWeight:'0.5kg', time:'2–4 business days', best:'Electronics, documents', note:'Competitive rates for heavier shipments (5kg+).' },
  { name:'Pos Malaysia EMS', type:'Postal + Courier', kgRate:'RM 30–60/kg to India', minWeight:'0.1kg', time:'7–14 business days', best:'Non-urgent items, books, clothes', note:'Much cheaper for non-urgent. Less reliable tracking.' },
  { name:'PGEON Malaysia', type:'Local + International', kgRate:'RM 25–50/kg to India', minWeight:'1kg', time:'5–10 business days', best:'Bulk clothes, household items', note:'Good value for bulk personal items. Book online.' },
  { name:'Skynet Malaysia', type:'Courier', kgRate:'RM 35–70/kg to India', minWeight:'1kg', time:'4–7 business days', best:'Electronics, medium items', note:'Competitive pricing, decent service.' },
  { name:'SeaFreight (container)', type:'Sea Cargo', kgRate:'~RM 3–8/kg (bulk)', minWeight:'50kg+', time:'15–30 days', best:'Furniture, large appliances, TV', note:'Best value for bulk. Use for final move back to India. Companies: Crown Relocations, Asian Tigers.' },
]

const AIRPORT_TIPS = [
  { q:'When should I reach the airport?', a:{
    domestic: '60–90 minutes before departure. Check-in closes 45 min before.',
    intl_economy: '2.5–3 hours before departure for KLIA/KLIA2.',
    intl_checkin_close: 'Check-in closes 60 minutes before departure (AirAsia); 45 min for MH.',
    tips: ['KLIA2 (AirAsia) takes longer to clear security — add 30 min vs KLIA','Online check-in: 48hrs to 2hrs before — skip queue, just go to bag drop','Express Bus KL Sentral to KLIA: 60 min. Leave KL Sentral 3.5 hrs before for safety.']
  }},
  { q:'KLIA vs KLIA2 — which terminal?', a:{
    klia:'Malaysia Airlines, Singapore Airlines, Emirates, Qatar, Thai, British Airways, Korean Air, Japan Airlines — ALL at KLIA (main terminal)',
    klia2:'AirAsia ALL flights + IndiGo + some Batik Air — at KLIA2 (budget terminal)',
    batik:'Batik Air (Malindo): check your ticket — some at KLIA, some KLIA2',
    howToTravel:'KL Sentral to KLIA: Express Train (ERL) RM 55, 28 min. To KLIA2: RM 55, 33 min. Grab car: RM 60–90 from KL city.',
  }},
]

const LOUNGE_INFO = [
  { name:'Plaza Premium Lounge (KLIA)', access:['Malaysia Airlines Business Class ticket','Eligible credit cards (Maybank World, Citi Prestige, HSBC Visa Infinite)','Paid entry: RM 180/3hrs','Priority Pass membership'], food:'Full buffet, hot food, Indian options sometimes available', showers:'Yes — 2 shower rooms', wifi:'Yes — fast', tips:'Best lounge at KLIA. MH Business class passengers enter free. Most premium credit cards include.' },
  { name:'Golden Lounge (Malaysia Airlines — KLIA)', access:['MH Business Class ticket','Enrich Gold/Platinum card'], food:'Full buffet, halal certified, hot meals', showers:'Yes', wifi:'Yes', tips:'MH own lounge — best service, not open to general public.' },
  { name:'Sama Sama Express KLIA2', access:['AirAsia Big Shot members','Paid: RM 99/entry','Some credit cards'], food:'Snacks, sandwiches, drinks (not full buffet)', showers:'Yes', wifi:'Yes', tips:'More basic than KLIA lounges. Worth it if 3+ hour wait. AirAsia Premium Flex ticket often includes.' },
]

const SEARCH_FAQ = [
  { q:'How many laptops can I carry?', a:'Most airlines allow 2 laptops in cabin bag. Additional laptops in checked bag are also fine. There\'s no official country limit — this is airline policy, not immigration.' },
  { q:'Is grinder / wet grinder allowed?', a:'YES — wet/dry grinder is allowed in CHECKED bag only. The stone/blade must be clean, dry, and ideally wrapped. Remove any sharp detachable blade. Declare it at check-in if asked. Indian airlines (Air India, IndiGo) are used to seeing this — no issues typically.' },
  { q:'Is mixer/juicer allowed?', a:'YES — in checked bag. Remove the blade, wrap it separately with cloth/bubble wrap. Keep the motor unit and blade together in the same bag. No issues on India-Malaysia routes.' },
  { q:'Can I carry Indian pickles?', a:'In checked bag: YES, sealed jars are fine. In cabin: if it\'s a liquid/paste over 100ml, it must go to checked. Mango pickle jars 500g+ must be checked. Small 100ml jars can go in cabin 1L bag.' },
  { q:'How much is excess baggage?', a:'At airport: RM 80–150 per 5kg (very expensive). Pre-book online: RM 30–60 per 5kg. Always pre-book extra baggage online at least 24 hours before — can save 50–60%.' },
  { q:'Can I carry Indian sweets / food?', a:'Fresh fruits/vegetables: NOT allowed to India from Malaysia (import restrictions). Packaged sweets, dry snacks, packaged food: allowed. Cooked food in airtight containers: generally fine.' },
  { q:'How do I find cheap flights KL to India?', a:'Best search: Google Flights (flexible dates), Skyscanner (month view), Kayak. Best prices: Tuesday/Wednesday departures, 6-8 weeks in advance. Avoid school holidays (Chinese New Year, Deepavali) — prices 2x higher. AirAsia has sales every 2-3 months — set alerts.' },
  { q:'TV carry rules — how much does it cost?', a:'Small TV under 32": checked bag, wrapped well. Declare as fragile. Oversize fee (if >158cm length+width+height): RM 200–500. Easier to buy in India — Malaysian TV prices similar to India. For large TVs: use sea freight courier (RM 500–1,500 total).' },
  { q:'India to Malaysia — what to bring?', a:'Bring: pressure cooker, Indian spices (harder to find/expensive here), idli/dosa maker, traditional clothes, ayurvedic medicines. Don\'t bring: electronics (same price), heavy furniture, too many clothes (hot weather).' },
  { q:'Can I send bulk items Malaysia to India?', a:'Yes — use DHL, FedEx for 1–20kg. For 50kg+: use sea freight (Crown Relocations, Asian Tigers). Sea freight takes 15–30 days but RM 3–8/kg vs RM 70–120/kg by air courier.' },
]

export default function FlightHub() {
  const [tab, setTab]       = useState('search')
  const [query, setQuery]   = useState('')
  const [airline, setAirline] = useState(0)

  const filteredItems = useMemo(() => {
    if (!query.trim()) return APPLIANCES
    const q = query.toLowerCase()
    return APPLIANCES.filter(a => a.item.toLowerCase().includes(q) || a.note.toLowerCase().includes(q))
  }, [query])

  const filteredFaqs = useMemo(() => {
    if (!query.trim()) return SEARCH_FAQ
    const q = query.toLowerCase()
    return SEARCH_FAQ.filter(f => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q))
  }, [query])

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.emoji}>✈️</span>
        <div>
          <h1 className={styles.title}>Flight Travel Hub</h1>
          <p className={styles.sub}>Baggage rules, cheap flights, airport guide, courier — India ↔ Malaysia</p>
        </div>
      </div>
      <PrivacyNotice />

      <div className={styles.tabs}>
        {[['search','🔍 Search Anything'],['baggage','🧳 Baggage Rules'],['airlines','✈️ Airlines'],['courier','📦 Send Items'],['airport','🏢 Airport Guide'],['lounge','🛋️ Lounges'],['cheap','💰 Cheap Flights']].map(([id,label]) => (
          <button key={id} className={`${styles.tab} ${tab===id?styles.tabActive:''}`} onClick={()=>setTab(id)}>{label}</button>
        ))}
      </div>

      {/* Universal search bar — works on baggage and FAQ */}
      {(tab === 'search' || tab === 'baggage') && (
        <div className={styles.searchBar}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            className={styles.searchInput}
            placeholder="Search anything: grinder, laptop, TV, power bank, mixer, pickle..."
            value={query}
            onChange={e=>setQuery(e.target.value)}
          />
          {query && <button className={styles.clearBtn} onClick={()=>setQuery('')}>✕</button>}
        </div>
      )}

      {tab === 'search' && (
        <>
          {filteredFaqs.length > 0 && (
            <div className={styles.faqSection}>
              <div className={styles.sectionHead}>❓ Quick Answers</div>
              {filteredFaqs.map((f,i) => (
                <div key={i} className={styles.faqCard}>
                  <div className={styles.faqQ}>{f.q}</div>
                  <div className={styles.faqA}>{typeof f.a === 'string' ? f.a : JSON.stringify(f.a)}</div>
                </div>
              ))}
            </div>
          )}
          {filteredItems.length > 0 && (
            <div>
              <div className={styles.sectionHead}>🧳 Baggage Allowance</div>
              {filteredItems.map((item,i) => (
                <div key={i} className={`${styles.itemRow} ${item.allowed==='✅'?styles.itemOk:styles.itemWarn}`}>
                  <div className={styles.itemName}>{item.allowed} {item.item}</div>
                  <div className={styles.itemWhere}>{item.where}</div>
                  <div className={styles.itemNote}>{item.note}</div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {tab === 'baggage' && (
        <div>
          {filteredItems.length === 0 ? (
            <div className={styles.noResult}>No results for "{query}" — try: grinder, TV, laptop, power bank</div>
          ) : (
            filteredItems.map((item,i) => (
              <div key={i} className={`${styles.itemCard} ${item.allowed==='✅'?styles.itemCardOk:styles.itemCardWarn}`}>
                <div className={styles.itemCardTop}>
                  <span className={styles.itemCardAllowed}>{item.allowed}</span>
                  <strong className={styles.itemCardName}>{item.item}</strong>
                  <span className={styles.itemCardWhere}>{item.where}</span>
                </div>
                <div className={styles.itemCardNote}>{item.note}</div>
              </div>
            ))
          )}
        </div>
      )}

      {tab === 'airlines' && (
        <>
          <div className={styles.airlineTabs}>
            {AIRLINES.map((a,i) => <button key={i} className={`${styles.airlineTab} ${airline===i?styles.airlineTabActive:''}`} style={airline===i?{background:a.color,borderColor:a.color}:{}} onClick={()=>setAirline(i)}>{a.name}</button>)}
          </div>
          {(() => {
            const a = AIRLINES[airline]
            return (
              <div className={styles.airlineCard} style={{'--accent':a.color}}>
                <div className={styles.airlineHeader}>
                  <div><div className={styles.airlineName}>{a.name}</div><div className={styles.airlineType}>{a.type} · {a.code}</div></div>
                  <div className={styles.airlineRoutes}>{a.routes.map((r,i) => <span key={i} className={styles.routeTag}>{r}</span>)}</div>
                </div>
                <div className={styles.airlineGrid}>
                  {[
                    ['Checked Bag (Economy)', a.checkin.economy],
                    ['Cabin Bag', a.cabin.economy],
                    ['Laptops', a.laptops],
                    ['Liquids', a.liquids],
                  ].map(([k,v]) => <div key={k} className={styles.airlineRow}><span>{k}</span><strong>{v}</strong></div>)}
                </div>
                <div className={styles.airlineRestricted}>
                  <div className={styles.restrictedTitle}>⚠️ Restrictions / Notes</div>
                  {a.restricted.map((r,i) => <div key={i} className={styles.restrictedItem}>{r}</div>)}
                </div>
                <div className={styles.airlineTips}>
                  {a.tips.map((t,i) => <div key={i} className={styles.airlineTip}>💡 {t}</div>)}
                </div>
              </div>
            )
          })()}
        </>
      )}

      {tab === 'courier' && (
        <>
          <div className={styles.courierIntro}>📦 Best courier services for sending items Malaysia ↔ India. Prices per kg approximate — get exact quote on their website.</div>
          {COURIER_SERVICES.map((c,i) => (
            <div key={i} className={styles.courierCard}>
              <div className={styles.courierTop}>
                <div><div className={styles.courierName}>{c.name}</div><div className={styles.courierType}>{c.type}</div></div>
                <div className={styles.courierRate}>{c.kgRate}</div>
              </div>
              <div className={styles.courierMeta}>📅 {c.time} · Min: {c.minWeight} · Best for: {c.best}</div>
              <div className={styles.courierNote}>{c.note}</div>
            </div>
          ))}
          <div className={styles.courierTips}>
            {['🇮🇳→🇲🇾 Bringing from India: Pressure cooker, spices, traditional clothes best by checked bag','🇲🇾→🇮🇳 Sending back: Electronics (DHL/FedEx), clothes/books (Pos Malaysia EMS), furniture (sea freight)','📦 For large loads (moving back to India): Sea freight is 10–20x cheaper than air courier','💰 DHL promotional rates often available — check website vs calling. Online booking cheaper.','⚖️ Dimensional weight: couriers charge by volume if item is light but bulky — measure before booking'].map((t,i) => <div key={i} className={styles.courierTip}>{t}</div>)}
          </div>
        </>
      )}

      {tab === 'airport' && (
        <div>
          {AIRPORT_TIPS.map((item,i) => (
            <div key={i} className={styles.airportCard}>
              <div className={styles.airportQ}>{item.q}</div>
              {typeof item.a === 'object' && !Array.isArray(item.a) ? (
                <div className={styles.airportGrid}>
                  {Object.entries(item.a).filter(([k]) => k !== 'tips').map(([k,v]) => (
                    <div key={k} className={styles.airportRow}>
                      <span>{k.replace(/_/g,' ')}</span><strong>{v}</strong>
                    </div>
                  ))}
                  {item.a.tips && item.a.tips.map((t,j) => <div key={j} className={styles.airportTip}>💡 {t}</div>)}
                </div>
              ) : <div className={styles.airportA}>{item.a}</div>}
            </div>
          ))}
          <div className={styles.airportExtra}>
            <div className={styles.sectionHead}>⏰ Airport Timeline — What to Do & When</div>
            {[
              ['T-3 hrs', 'Leave home/hotel for KLIA/KLIA2'],
              ['T-2.5 hrs', 'Arrive at airport, check-in counter opens'],
              ['T-2 hrs', 'Complete check-in, drop baggage'],
              ['T-1.5 hrs', 'Pass through immigration (can take 20–40 min)'],
              ['T-1 hr', 'Security screening done, go to gate'],
              ['T-45 min', 'At boarding gate — relax / lounge if access'],
              ['T-30 min', 'Boarding begins (economy class first call)'],
              ['T-0', 'Departure'],
            ].map(([time,action],i) => (
              <div key={i} className={styles.timeRow}><span className={styles.timeTag}>{time}</span><span>{action}</span></div>
            ))}
          </div>
        </div>
      )}

      {tab === 'lounge' && (
        <div>
          <div className={styles.loungeIntro}>🛋️ Airport lounges — free with right credit card or airline ticket. Worth it for long layovers.</div>
          {LOUNGE_INFO.map((l,i) => (
            <div key={i} className={styles.loungeCard}>
              <div className={styles.loungeName}>{l.name}</div>
              <div className={styles.loungeSection}>
                <div className={styles.loungeSectionTitle}>🎫 Access Methods</div>
                {l.access.map((a,j) => <div key={j} className={styles.loungeItem}>✅ {a}</div>)}
              </div>
              <div className={styles.loungeGrid}>
                {[['🍽️ Food', l.food],['🚿 Showers', l.showers],['📶 WiFi', l.wifi]].map(([k,v]) => (
                  <div key={k} className={styles.loungeDetail}><span>{k}</span><strong>{v}</strong></div>
                ))}
              </div>
              <div className={styles.loungeTip}>💡 {l.tips}</div>
            </div>
          ))}
          <div className={styles.creditCards}>
            <div className={styles.sectionHead}>💳 Credit Cards with Free Lounge Access in Malaysia</div>
            {['Maybank World Mastercard — Plaza Premium + Priority Pass (2 visits/year)','Citi Prestige — Unlimited Priority Pass lounge access worldwide','HSBC Visa Infinite — Priority Pass + Plaza Premium unlimited','CIMB Visa Infinite — Plaza Premium 2x per year','AmBank Platinum Visa — Plaza Premium 2x per year'].map((c,i) => <div key={i} className={styles.cardItem}>💳 {c}</div>)}
          </div>
        </div>
      )}

      {tab === 'cheap' && (
        <div>
          <div className={styles.cheapIntro}>💰 How to find the cheapest flights between Malaysia and India</div>
          <div className={styles.cheapGrid}>
            {[
              { tool:'Google Flights', icon:'🔍', tip:'Use "Flexible dates" calendar view — see cheapest day to fly. Enable price alerts for your route.', url:'https://flights.google.com' },
              { tool:'Skyscanner', icon:'🗓️', tip:'"Month view" shows cheapest day. Set alerts. Compare AirAsia direct vs connecting via Bangkok/Singapore.', url:'https://skyscanner.com' },
              { tool:'Kayak', icon:'📊', tip:'Best for comparing connecting vs direct. "Explore" feature shows cheapest destinations.', url:'https://kayak.com' },
              { tool:'AirAsia website direct', icon:'✈️', tip:'Book direct at airasia.com for best AirAsia prices. Sales every 6-8 weeks — "Free Seats" promotions.', url:'https://airasia.com' },
            ].map((t,i) => (
              <div key={i} className={styles.cheapCard}>
                <div className={styles.cheapIcon}>{t.icon}</div>
                <div className={styles.cheapTool}>{t.tool}</div>
                <div className={styles.cheapTip}>{t.tip}</div>
                <a href={t.url} target="_blank" rel="noreferrer" className={styles.cheapLink}>Open →</a>
              </div>
            ))}
          </div>
          <div className={styles.priceTable}>
            <div className={styles.sectionHead}>📅 Best vs Worst Times to Book</div>
            {[
              ['Cheapest months', 'Feb, Mar, Sep, Oct — shoulder seasons, low demand'],
              ['Expensive months', 'Dec–Jan (Christmas/New Year), Apr–May (Raya), Oct (Deepavali)'],
              ['Best day to fly', 'Tuesday, Wednesday, Thursday — up to 30% cheaper'],
              ['Best time to book', '6–8 weeks before for best price'],
              ['Last minute', '1–2 weeks before — usually more expensive unless airline selling remaining seats'],
              ['AirAsia sales', 'Every 6–10 weeks — subscribe to alerts at airasia.com'],
              ['MH promo fares', '3–4 months advance — check malaysia-airlines.com/promotions'],
            ].map(([k,v],i) => <div key={i} className={styles.priceRow}><span>{k}</span><strong>{v}</strong></div>)}
          </div>
          <div className={styles.routePrices}>
            <div className={styles.sectionHead}>💰 Typical Price Ranges (Economy, 2026)</div>
            {[
              ['KUL → Chennai (MAA)', 'RM 350–900 (₹6,800–17,500)', 'AirAsia, Batik Air direct'],
              ['KUL → Bangalore (BLR)', 'RM 380–950', 'AirAsia, MH, IndiGo'],
              ['KUL → Delhi (DEL)', 'RM 500–1,200', 'MH, Air India, IndiGo'],
              ['KUL → Mumbai (BOM)', 'RM 450–1,100', 'MH, Air India'],
              ['KUL → Hyderabad (HYD)', 'RM 400–950', 'Batik Air, MH'],
              ['KUL → Kolkata (CCU)', 'RM 400–850', 'AirAsia, IndiGo'],
            ].map(([route,price,airlines],i) => (
              <div key={i} className={styles.routeRow}>
                <span className={styles.routeName}>{route}</span>
                <span className={styles.routePrice}>{price}</span>
                <span className={styles.routeAirlines}>{airlines}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
