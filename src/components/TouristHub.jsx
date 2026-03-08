import { useState, useMemo, useRef } from 'react'
import styles from './TouristHub.module.css'
import { PLACES, INDIAN_FOOD, SHOPPING, BUDGET_ITEMS, VISA_INFO, TRIP_PRESETS, DAILY_COSTS, TOURIST_TRAPS, LOCAL_DEALS, SIM_COMPARISON } from '../data/touristData'

// ── helpers ──────────────────────────────────────────────────────
const fmtRM = n => `RM ${Math.round(n).toLocaleString()}`
const allPlaces = Object.values(PLACES).flatMap(city =>
  city.regions.flatMap(r => r.places.map(p => ({ ...p, city: city.name, cityId: Object.keys(PLACES).find(k => PLACES[k] === city) })))
)

const TOOLS = [
  { id:'planner',    icon:'🗺️',  label:'Trip Planner' },
  { id:'budget',     icon:'💰',  label:'Budget Simulator' },
  { id:'tracker',    icon:'📊',  label:'Cost Tracker' },
  { id:'sim',        icon:'📱',  label:'SIM Comparison' },
  { id:'buy',        icon:'🛒',  label:'What to Buy' },
  { id:'places',     icon:'📍',  label:'Places to Visit' },
  { id:'food',       icon:'🍛',  label:'Indian Food Finder' },
  { id:'visa',       icon:'📄',  label:'Visa Guide' },
  { id:'shopping',   icon:'🛍️',  label:'Shopping Guide' },
  { id:'culture',    icon:'🤝',  label:'Cultural Tips' },
  { id:'hidden',     icon:'🌴',  label:'Hidden Places' },
  { id:'local',      icon:'⭐',  label:'Local Experiences' },
  { id:'money',      icon:'💵',  label:'How Much Money?' },
  { id:'traps',      icon:'⚠️',  label:'Avoid Traps' },
  { id:'deals',      icon:'🎟️',  label:'Local Deals' },
  { id:'map',        icon:'🌍',  label:'Travel Map' },
]

export default function TouristHub() {
  const [tool, setTool] = useState('planner')
  return (
    <div className={styles.hub}>
      <div className={styles.heroBar}>
        <div className={styles.heroInner}>
          <div className={styles.heroFlags}>🇮🇳 ✈️ 🇲🇾</div>
          <h1 className={styles.heroTitle}>India → Malaysia Tourist Guide</h1>
          <p className={styles.heroSub}>16 free tools built for Indian travellers visiting Malaysia</p>
        </div>
      </div>
      <div className={styles.toolNav}>
        {TOOLS.map(t => (
          <button key={t.id} onClick={() => setTool(t.id)}
            className={`${styles.toolBtn} ${tool === t.id ? styles.toolBtnActive : ''}`}>
            <span className={styles.toolBtnIcon}>{t.icon}</span>
            <span className={styles.toolBtnLabel}>{t.label}</span>
          </button>
        ))}
      </div>
      <div className={styles.toolArea}>
        {tool === 'planner'  && <TripPlanner />}
        {tool === 'budget'   && <BudgetSimulator />}
        {tool === 'tracker'  && <CostTracker />}
        {tool === 'sim'      && <SimComparison />}
        {tool === 'buy'      && <WhatToBuy />}
        {tool === 'places'   && <PlacesToVisit />}
        {tool === 'food'     && <IndianFoodFinder />}
        {tool === 'visa'     && <VisaGuide />}
        {tool === 'shopping' && <ShoppingGuide />}
        {tool === 'culture'  && <CulturalTips />}
        {tool === 'hidden'   && <HiddenPlaces />}
        {tool === 'local'    && <LocalExperiences />}
        {tool === 'money'    && <HowMuchMoney />}
        {tool === 'traps'    && <AvoidTraps />}
        {tool === 'deals'    && <LocalDeals />}
        {tool === 'map'      && <TravelMap />}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// 1. TRIP PLANNER
// ═══════════════════════════════════════════════════════════════
function TripPlanner() {
  const [days, setDays] = useState(7)
  const [budget, setBudget] = useState(8000)
  const [style, setStyle] = useState('3star')
  const [dests, setDests] = useState(['kl','penang'])

  const toggleDest = id => setDests(d => d.includes(id) ? d.filter(x=>x!==id) : [...d, id])

  const plan = useMemo(() => {
    const dc = DAILY_COSTS[style] || DAILY_COSTS['3star']
    const dailyTotal = Object.values(dc).reduce((a,b)=>a+b,0)
    const totalCost = dailyTotal * days
    const leftover = budget - totalCost

    const dayPlans = []
    let dayIdx = 0
    for (const destId of dests) {
      const dest = PLACES[destId]
      if (!dest) continue
      const daysHere = Math.max(1, Math.round(days * (1/dests.length)))
      for (let d = 0; d < daysHere && dayIdx < days; d++, dayIdx++) {
        const region = dest.regions[d % dest.regions.length]
        const morningPlace = region.places[0]
        const afternoonPlace = region.places[1] || region.places[0]
        const eveningPlace = region.places[region.places.length-1]
        dayPlans.push({
          day: dayIdx+1, city: dest.name, cityIcon: dest.icon,
          morning: morningPlace, afternoon: afternoonPlace, evening: eveningPlace,
          cost: dailyTotal
        })
      }
    }
    return { dailyTotal, totalCost, leftover, dayPlans }
  }, [days, budget, style, dests])

  return (
    <div className={styles.toolWrap}>
      <ToolHeader icon="🗺️" title="Smart Trip Planner" sub="Build your perfect Malaysia itinerary" />
      <div className={styles.planInputs}>
        <div className={styles.planRow}>
          <div className={styles.planField}>
            <label>📅 Days in Malaysia</label>
            <div className={styles.rangeWrap}>
              <input type="range" min="3" max="21" value={days} onChange={e=>setDays(+e.target.value)} className={styles.slider} />
              <span className={styles.rangeVal}>{days} days</span>
            </div>
          </div>
          <div className={styles.planField}>
            <label>💰 Total Budget (RM)</label>
            <input type="number" value={budget} onChange={e=>setBudget(+e.target.value)} className={styles.numInput} />
          </div>
          <div className={styles.planField}>
            <label>🏨 Travel Style</label>
            <select value={style} onChange={e=>setStyle(e.target.value)} className={styles.sel}>
              <option value="hostel">🎒 Backpacker</option>
              <option value="budget">💰 Budget</option>
              <option value="3star">⭐ Mid-range</option>
              <option value="4star">✨ Comfort</option>
              <option value="5star">👑 Luxury</option>
            </select>
          </div>
        </div>
        <div className={styles.destPicker}>
          <label>📍 Destinations</label>
          <div className={styles.destGrid}>
            {Object.entries(PLACES).map(([id, city]) => (
              <button key={id} onClick={()=>toggleDest(id)}
                className={`${styles.destBtn} ${dests.includes(id) ? styles.destBtnOn : ''}`}>
                {city.icon} {city.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.planBudgetBar}>
        <div className={styles.pbb}>
          <span>🏨 Hotel</span><strong>{fmtRM(DAILY_COSTS[style]?.accommodation * days)}</strong>
        </div>
        <div className={styles.pbb}>
          <span>🍽️ Food</span><strong>{fmtRM(DAILY_COSTS[style]?.food * days)}</strong>
        </div>
        <div className={styles.pbb}>
          <span>🚗 Transport</span><strong>{fmtRM(DAILY_COSTS[style]?.transport * days)}</strong>
        </div>
        <div className={styles.pbb}>
          <span>🎡 Activities</span><strong>{fmtRM(DAILY_COSTS[style]?.activities * days)}</strong>
        </div>
        <div className={`${styles.pbb} ${styles.pbbTotal}`}>
          <span>Total</span><strong>{fmtRM(plan.totalCost)}</strong>
        </div>
        <div className={`${styles.pbb} ${plan.leftover >= 0 ? styles.pbbGood : styles.pbbBad}`}>
          <span>{plan.leftover >= 0 ? '✅ Left over' : '⚠️ Overspend'}</span>
          <strong>{fmtRM(Math.abs(plan.leftover))}</strong>
        </div>
      </div>

      <div className={styles.itinerary}>
        {plan.dayPlans.map(dp => (
          <div key={dp.day} className={styles.itDay}>
            <div className={styles.itDayHead}>
              <span className={styles.itDayNum}>Day {dp.day}</span>
              <span className={styles.itDayCity}>{dp.cityIcon} {dp.city}</span>
              <span className={styles.itDayCost}>{fmtRM(dp.cost)}</span>
            </div>
            <div className={styles.itSlots}>
              {[{label:'☀️ Morning', p:dp.morning},{label:'🌤 Afternoon', p:dp.afternoon},{label:'🌙 Evening', p:dp.evening}].map(({label,p})=>(
                <div key={label} className={styles.itSlot}>
                  <span className={styles.itSlotTime}>{label}</span>
                  <div className={styles.itSlotInfo}>
                    <strong>{p.name}</strong>
                    <span className={styles.itSlotEntry}>{p.entry}</span>
                    <span className={styles.itSlotTip}>💡 {p.tip}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// 2. BUDGET SIMULATOR
// ═══════════════════════════════════════════════════════════════
function BudgetSimulator() {
  const [preset, setPreset] = useState(null)
  const [days, setDays] = useState(7)
  const [people, setPeople] = useState(2)
  const [hotel, setHotel] = useState('3star')
  const [inrRate] = useState(19.5)

  const dc = DAILY_COSTS[hotel] || DAILY_COSTS['3star']
  const perPersonPerDay = Object.values(dc).reduce((a,b)=>a+b,0)
  const total = perPersonPerDay * days * people
  const totalINR = total * inrRate

  const categories = [
    { label:'🏨 Accommodation', val: dc.accommodation * days * Math.ceil(people/2), pct: null },
    { label:'🍽️ Food & Drinks',  val: dc.food * days * people, pct: null },
    { label:'🚗 Transport',      val: dc.transport * days * people, pct: null },
    { label:'🎡 Activities',     val: dc.activities * days * people, pct: null },
    { label:'🛍️ Shopping',       val: 500 * people, pct: null },
    { label:'📋 Visa Fee',       val: 150 * people, pct: null },
    { label:'✈️ Flights (est)',  val: 1800 * people, pct: null },
  ]
  const grandTotal = categories.reduce((a,c)=>a+c.val,0)
  const catWithPct = categories.map(c=>({...c, pct: Math.round(c.val/grandTotal*100)}))

  return (
    <div className={styles.toolWrap}>
      <ToolHeader icon="💰" title="Budget Travel Simulator" sub="Plan your exact spend before you fly" />

      <div className={styles.presetRow}>
        {TRIP_PRESETS.map(p => (
          <button key={p.name} onClick={()=>{setPreset(p);setDays(p.days);setHotel(p.hotels);setPeople(p.name==='Solo Backpacker'?1:2)}}
            className={`${styles.presetBtn} ${preset?.name===p.name?styles.presetBtnOn:''}`}>
            <span>{p.icon}</span><span>{p.name}</span>
          </button>
        ))}
      </div>

      <div className={styles.simControls}>
        {[{label:'Days',val:days,set:setDays,min:1,max:30},{label:'People',val:people,set:setPeople,min:1,max:6}].map(f=>(
          <div key={f.label} className={styles.simField}>
            <label>{f.label}</label>
            <div className={styles.simCounter}>
              <button onClick={()=>f.set(Math.max(f.min,f.val-1))}>−</button>
              <span>{f.val}</span>
              <button onClick={()=>f.set(Math.min(f.max,f.val+1))}>+</button>
            </div>
          </div>
        ))}
        <div className={styles.simField}>
          <label>🏨 Hotel</label>
          <select value={hotel} onChange={e=>setHotel(e.target.value)} className={styles.sel}>
            <option value="hostel">Hostel/Dorm</option>
            <option value="budget">Budget Hotel</option>
            <option value="3star">3-Star</option>
            <option value="4star">4-Star</option>
            <option value="5star">5-Star</option>
          </select>
        </div>
      </div>

      <div className={styles.simTotal}>
        <div className={styles.simTotalMain}>{fmtRM(grandTotal)}</div>
        <div className={styles.simTotalInr}>≈ ₹{Math.round(grandTotal * inrRate).toLocaleString()}</div>
        <div className={styles.simTotalSub}>Total estimated for {people} person{people>1?'s':''}, {days} days</div>
      </div>

      <div className={styles.budgetBars}>
        {catWithPct.map(c => (
          <div key={c.label} className={styles.budBar}>
            <div className={styles.budBarLabel}>
              <span>{c.label}</span>
              <span>{fmtRM(c.val)} <em>≈ ₹{Math.round(c.val*inrRate).toLocaleString()}</em></span>
            </div>
            <div className={styles.budBarTrack}>
              <div className={styles.budBarFill} style={{width:`${c.pct}%`}} />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.simTips}>
        <div className={styles.simTip}>💡 <strong>Budget tip:</strong> Switch from 3-star to budget hotel → save {fmtRM((DAILY_COSTS['3star'].accommodation - DAILY_COSTS['budget'].accommodation)*days)} on this trip</div>
        <div className={styles.simTip}>✈️ <strong>Flights:</strong> Book 6–8 weeks ahead on IndiGo/AirAsia for lowest fares (typically RM 800–1,400 return Chennai/Bangalore–KL)</div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// 3. REAL-TIME COST TRACKER
// ═══════════════════════════════════════════════════════════════
function CostTracker() {
  const [entries, setEntries] = useState([
    { id:1, cat:'🍽️ Food', desc:'Lunch at mamak', amount:12, date:'Day 1' },
    { id:2, cat:'🚗 Transport', desc:'Grab to KLCC', amount:18, date:'Day 1' },
    { id:3, cat:'🎡 Activity', desc:'Petronas skybridge', amount:89.9, date:'Day 2' },
  ])
  const [cat, setCat] = useState('🍽️ Food')
  const [desc, setDesc] = useState('')
  const [amount, setAmount] = useState('')
  const [dayLabel, setDayLabel] = useState('Day 1')
  const [budget, setBudget] = useState(5000)

  const cats = ['🍽️ Food','🚗 Transport','🎡 Activity','🛍️ Shopping','🏨 Hotel','💊 Health','📞 SIM/Internet','🎭 Entertainment','🪙 Misc']
  const spent = entries.reduce((a,e)=>a+e.amount,0)
  const pct = Math.min(100, Math.round(spent/budget*100))
  const perCat = cats.map(c => ({ cat:c, total: entries.filter(e=>e.cat===c).reduce((a,e)=>a+e.amount,0) })).filter(c=>c.total>0)

  const add = () => {
    if (!amount || !desc) return
    setEntries([...entries, { id:Date.now(), cat, desc, amount:parseFloat(amount), date:dayLabel }])
    setDesc(''); setAmount('')
  }
  const remove = id => setEntries(entries.filter(e=>e.id!==id))

  return (
    <div className={styles.toolWrap}>
      <ToolHeader icon="📊" title="Real-Time Travel Cost Tracker" sub="Log every spend, see where your money goes" />

      <div className={styles.trackerBudget}>
        <div className={styles.tbLeft}>
          <div className={styles.tbSpent}>{fmtRM(spent)}</div>
          <div className={styles.tbSub}>spent of <input type="number" value={budget} onChange={e=>setBudget(+e.target.value)} className={styles.tbBudgetInput} /> RM budget</div>
        </div>
        <div className={styles.tbRight}>
          <div className={styles.tbRemain}>{fmtRM(Math.max(0, budget-spent))}</div>
          <div className={styles.tbSub}>{budget>spent ? 'remaining' : '⚠️ over budget!'}</div>
        </div>
      </div>
      <div className={styles.trackerBar}>
        <div className={styles.trackerFill} style={{width:`${pct}%`, background: pct>90?'#ef4444':pct>70?'#f59e0b':'#C9F53B'}} />
      </div>
      <div className={styles.trackerPct}>{pct}% used</div>

      <div className={styles.addEntry}>
        <select value={cat} onChange={e=>setCat(e.target.value)} className={styles.sel}>{cats.map(c=><option key={c}>{c}</option>)}</select>
        <input value={desc} onChange={e=>setDesc(e.target.value)} placeholder="What did you buy?" className={styles.txtInput} />
        <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="RM" className={styles.numInput} style={{width:'90px'}} />
        <input value={dayLabel} onChange={e=>setDayLabel(e.target.value)} placeholder="Day 1" className={styles.txtInput} style={{width:'70px'}} />
        <button onClick={add} className={styles.addBtn}>+ Add</button>
      </div>

      <div className={styles.entryList}>
        {[...entries].reverse().map(e => (
          <div key={e.id} className={styles.entryRow}>
            <span className={styles.entryDay}>{e.date}</span>
            <span className={styles.entryCat}>{e.cat}</span>
            <span className={styles.entryDesc}>{e.desc}</span>
            <span className={styles.entryAmt}>{fmtRM(e.amount)}</span>
            <button onClick={()=>remove(e.id)} className={styles.entryDel}>×</button>
          </div>
        ))}
      </div>

      {perCat.length > 0 && (
        <div className={styles.catBreakdown}>
          <div className={styles.cbTitle}>Breakdown by Category</div>
          {perCat.sort((a,b)=>b.total-a.total).map(c => (
            <div key={c.cat} className={styles.cbRow}>
              <span>{c.cat}</span>
              <span>{fmtRM(c.total)}</span>
              <div className={styles.cbBar}><div style={{width:`${Math.round(c.total/spent*100)}%`}} className={styles.cbFill}/></div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// 4. SIM COMPARISON
// ═══════════════════════════════════════════════════════════════
function SimComparison() {
  const [days, setDays] = useState(7)

  const inrRate = 19.5
  const indiaCostPerDay = 625 // avg Jio roaming
  const indiaTotalINR = indiaCostPerDay * days
  const myBestRM = 30 // Maxis 30GB
  const myBestINR = myBestRM * inrRate
  const saving = indiaTotalINR - myBestINR

  return (
    <div className={styles.toolWrap}>
      <ToolHeader icon="📱" title="Indian Roaming vs Malaysian SIM" sub="Which saves you more money?" />

      <div className={styles.simDaysRow}>
        <label>Your trip duration:</label>
        <div className={styles.simCounter}>
          <button onClick={()=>setDays(Math.max(1,days-1))}>−</button>
          <span>{days} days</span>
          <button onClick={()=>setDays(Math.min(30,days+1))}>+</button>
        </div>
      </div>

      <div className={styles.verdictBox}>
        <div className={styles.vbTitle}>💡 Our Verdict for {days}-day trip</div>
        <div className={styles.vbSaving}>You save ₹{Math.round(saving).toLocaleString()} with a Malaysian SIM</div>
        <div className={styles.vbSub}>{SIM_COMPARISON.verdict}</div>
      </div>

      <div className={styles.simCols}>
        <div className={styles.simCol}>
          <div className={styles.simColHead}>🇮🇳 Indian Roaming Plans</div>
          {SIM_COMPARISON.india.map(s => (
            <div key={s.name} className={`${styles.simCard} ${styles.simCardBad}`}>
              <div className={styles.simCardName}>{s.icon} {s.name}</div>
              <div className={styles.simCardStats}>
                <span>📶 {s.data}</span>
                <span>📅 {s.validity}</span>
              </div>
              <div className={styles.simCardCost}>
                <strong>₹{Math.round(indiaCostPerDay*days).toLocaleString()}</strong>
                <span>for {days} days</span>
              </div>
              <div className={styles.simCardPros}>✅ {s.pros[0]}</div>
              <div className={styles.simCardCons}>❌ {s.cons[0]}</div>
            </div>
          ))}
        </div>
        <div className={styles.simCol}>
          <div className={styles.simColHead}>🇲🇾 Malaysian Tourist SIMs</div>
          {SIM_COMPARISON.malaysia.map(s => (
            <div key={s.name} className={`${styles.simCard} ${styles.simCardGood}`}>
              <div className={styles.simCardName}>{s.icon} {s.name}</div>
              <div className={styles.simCardStats}>
                <span>📶 {s.data}</span>
                <span>📅 {s.validity}</span>
              </div>
              <div className={styles.simCardCost}>
                <strong>{s.cost}</strong>
                <span>for full trip</span>
              </div>
              <div className={styles.simCardPros}>✅ {s.pros[0]}</div>
              <div className={styles.simCardCons}>⚡ {s.cons[0]}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.simBuyTip}>
        <strong>📍 Where to buy in Malaysia:</strong> KLIA Arrivals hall (all terminals) · Any 7-Eleven · Guardian pharmacy · MyNews convenience store · Official telco stores in malls
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// 5. WHAT TO BUY
// ═══════════════════════════════════════════════════════════════
function WhatToBuy() {
  const [cat, setCat] = useState(null)
  return (
    <div className={styles.toolWrap}>
      <ToolHeader icon="🛒" title="What to Buy in Malaysia" sub="Best items to shop — cheapest vs India" />
      <div className={styles.buyGrid}>
        {BUDGET_ITEMS.map(section => (
          <div key={section.category} className={styles.buySection}>
            <div className={styles.buySectionHead} onClick={()=>setCat(cat===section.category?null:section.category)}>
              <span>{section.category}</span>
              <span className={styles.buyChevron}>{cat===section.category?'▲':'▼'}</span>
            </div>
            {(cat===section.category || cat===null) && (
              <div className={styles.buyItems}>
                {section.items.map(item => (
                  <div key={item.name} className={styles.buyItem}>
                    <div className={styles.buyItemName}>{item.name}</div>
                    <div className={styles.buyItemMeta}>
                      <span className={styles.buyPrice}>💰 {item.price}</span>
                      <span className={styles.buySaving}>📉 {item.saving}</span>
                    </div>
                    <div className={styles.buyItemTip}>💡 {item.tip}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// 6. PLACES TO VISIT
// ═══════════════════════════════════════════════════════════════
function PlacesToVisit() {
  const [city, setCity] = useState('kl')
  const [typeF, setTypeF] = useState('all')
  const types = ['all','landmark','temple','nature','cultural','shopping','food']
  const dest = PLACES[city]
  const filtered = dest.regions.flatMap(r => r.places).filter(p => typeF==='all'||p.type===typeF)

  return (
    <div className={styles.toolWrap}>
      <ToolHeader icon="📍" title="Places to Visit" sub="Top sights & experiences across Malaysia" />
      <div className={styles.cityTabs}>
        {Object.entries(PLACES).map(([id,c])=>(
          <button key={id} onClick={()=>setCity(id)} className={`${styles.cityTab} ${city===id?styles.cityTabOn:''}`}>
            {c.icon} {c.name}
          </button>
        ))}
      </div>
      <div className={styles.typeTabs}>
        {types.map(t=>(
          <button key={t} onClick={()=>setTypeF(t)} className={`${styles.typeTab} ${typeF===t?styles.typeTabOn:''}`}>
            {t.charAt(0).toUpperCase()+t.slice(1)}
          </button>
        ))}
      </div>
      <div className={styles.placeGrid}>
        {filtered.map(p => (
          <div key={p.name} className={styles.placeCard}>
            <div className={styles.placeCardTop}>
              <div className={styles.placeCardName}>{p.name}</div>
              <div className={styles.placeCardRating}>⭐ {p.rating}</div>
            </div>
            <div className={styles.placeCardMeta}>
              <span className={styles.placeTag}>{p.type}</span>
              <span className={styles.placeTime}>⏱ {p.time}</span>
              <span className={styles.placeBest}>🌅 Best: {p.best}</span>
            </div>
            <div className={styles.placeEntry}>🎫 {p.entry}</div>
            <div className={styles.placeTip}>💡 {p.tip}</div>
            {p.indian && <div className={styles.placeIndian}>🇮🇳 Indian favourite</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// 7. INDIAN FOOD FINDER
// ═══════════════════════════════════════════════════════════════
function IndianFoodFinder() {
  const [city, setCity] = useState('All')
  const [vegOnly, setVegOnly] = useState(false)
  const cities = ['All','KL','Penang','Malacca']
  const filtered = INDIAN_FOOD.filter(r => (city==='All'||r.city===city) && (!vegOnly||r.type.toLowerCase().includes('veg')))

  return (
    <div className={styles.toolWrap}>
      <ToolHeader icon="🍛" title="Indian Food Finder" sub="Best Indian restaurants & food across Malaysia" />
      <div className={styles.foodFilters}>
        <div className={styles.cityTabs}>
          {cities.map(c=>(
            <button key={c} onClick={()=>setCity(c)} className={`${styles.cityTab} ${city===c?styles.cityTabOn:''}`}>{c}</button>
          ))}
        </div>
        <button onClick={()=>setVegOnly(!vegOnly)} className={`${styles.vegBtn} ${vegOnly?styles.vegBtnOn:''}`}>
          🥗 Veg Only
        </button>
      </div>
      <div className={styles.foodGrid}>
        {filtered.map(r => (
          <div key={r.name} className={styles.foodCard}>
            <div className={styles.foodCardTop}>
              <div>
                <div className={styles.foodName}>{r.name}</div>
                <div className={styles.foodArea}>📍 {r.area}, {r.city}</div>
              </div>
              <div className={styles.foodRating}>⭐ {r.rating}</div>
            </div>
            <div className={styles.foodMeta}>
              <span className={styles.foodType}>{r.type}</span>
              <span className={styles.foodPrice}>💰 {r.price}</span>
              {r.halal && <span className={styles.halalBadge}>✅ Halal</span>}
              {!r.halal && <span className={styles.nonHalalBadge}>🔴 Non-Halal</span>}
            </div>
            <div className={styles.foodSpecial}>⭐ {r.speciality}</div>
          </div>
        ))}
      </div>
      <div className={styles.foodNote}>
        <strong>💡 Mamak culture:</strong> Open-air Indian-Muslim restaurants are everywhere in Malaysia — try roti canai (RM 1.50), teh tarik (RM 2), and mee goreng (RM 6). Open 24hrs at most spots!
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// 8. VISA GUIDE
// ═══════════════════════════════════════════════════════════════
function VisaGuide() {
  const [step, setStep] = useState(0)
  const steps = [
    { title:'Apply Online', icon:'💻', desc:'Go to evisa.imi.gov.my. Fill in personal details, travel dates, accommodation info. Upload documents.' },
    { title:'Pay Fee', icon:'💳', desc:`Pay RM 150 (~₹2,900) via credit/debit card. Keep payment receipt.` },
    { title:'Wait 3–5 Days', icon:'⏳', desc:'Processing takes 3–5 working days. You\'ll get email confirmation. Apply minimum 2 weeks before travel.' },
    { title:'Print & Travel', icon:'✈️', desc:'Print your eVisa approval. At Malaysia immigration, your visa gets stamped in passport. Keep printout safe.' },
    { title:'Arrive & Enjoy', icon:'🇲🇾', desc:'You get 30 days. Need more? Visit any Immigration office for 30-day extension (RM 100).' },
  ]

  return (
    <div className={styles.toolWrap}>
      <ToolHeader icon="📄" title="Visa & Entry Guide" sub="eVisa for Indians — step by step" />

      <div className={styles.visaAlert}>
        ⚠️ <strong>Important:</strong> Indians are NOT visa-free for Malaysia. You must apply for eVisa before travelling. Visa on Arrival is NOT available for Indian passport holders.
      </div>

      <div className={styles.visaSteps}>
        {steps.map((s, i) => (
          <div key={i} onClick={()=>setStep(i)} className={`${styles.visaStep} ${step===i?styles.visaStepOn:''}`}>
            <div className={styles.vsNum}>{i+1}</div>
            <div className={styles.vsIcon}>{s.icon}</div>
            <div className={styles.vsTitle}>{s.title}</div>
            {step===i && <div className={styles.vsDesc}>{s.desc}</div>}
          </div>
        ))}
      </div>

      <div className={styles.docsGrid}>
        <div className={styles.docsCard}>
          <div className={styles.docsTitle}>📋 Required Documents</div>
          {VISA_INFO.eVisa.docs.map(d => <div key={d} className={styles.docItem}>✅ {d}</div>)}
        </div>
        <div className={styles.docsCard}>
          <div className={styles.docsTitle}>💡 Pro Tips</div>
          {VISA_INFO.eVisa.tips.map(t => <div key={t} className={styles.docItem}>💡 {t}</div>)}
        </div>
      </div>

      <div className={styles.visaExtend}>
        <strong>🔄 Need more than 30 days?</strong> Visit Immigration Dept in Putrajaya or any state capital with passport + current visa + onward ticket + RM 100 fee. Extension approved same day usually.
      </div>

      <a href="https://evisa.imi.gov.my" target="_blank" rel="noreferrer" className={styles.visaApplyBtn}>
        🚀 Apply eVisa at evisa.imi.gov.my →
      </a>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// 9. SHOPPING GUIDE
// ═══════════════════════════════════════════════════════════════
function ShoppingGuide() {
  const [city, setCity] = useState('All')
  const cities = ['All','KL','Penang','Malacca','Langkawi']
  const filtered = SHOPPING.filter(s => city==='All'||s.city===city)

  return (
    <div className={styles.toolWrap}>
      <ToolHeader icon="🛍️" title="Best Shopping Places" sub="Where to shop smart in Malaysia" />
      <div className={styles.cityTabs}>
        {cities.map(c=>(
          <button key={c} onClick={()=>setCity(c)} className={`${styles.cityTab} ${city===c?styles.cityTabOn:''}`}>{c}</button>
        ))}
      </div>
      <div className={styles.shopGrid}>
        {filtered.map(s => (
          <div key={s.name} className={styles.shopCard}>
            <div className={styles.shopTop}>
              <div>
                <div className={styles.shopName}>{s.name}</div>
                <div className={styles.shopCity}>📍 {s.city} · {s.type}</div>
              </div>
            </div>
            <div className={styles.shopBest}>
              {s.best.map(b => <span key={b} className={styles.shopBestTag}>{b}</span>)}
            </div>
            <div className={styles.shopPrice}>💰 Price range: {s.priceRange}</div>
            <div className={styles.shopTip}>💡 {s.tip}</div>
            <div className={styles.shopHours}>🕐 {s.hours}</div>
          </div>
        ))}
      </div>
      <div className={styles.shopBargain}>
        <strong>🤝 Bargaining Guide:</strong> At Petaling St, start at 40% of asking price. At malls, no bargaining. At night markets, try 50–60% of asking price. Speak Tamil/Hindi — many vendors are Indian and will give better prices!
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// 10. CULTURAL TIPS
// ═══════════════════════════════════════════════════════════════
function CulturalTips() {
  const tips = [
    { cat:'🕌 Malay Culture', items:[
      'Remove shoes before entering homes and some shops — look for shoes outside',
      'Never point with your index finger — use thumb or whole hand instead',
      'Use right hand for eating, giving/receiving items. Left hand is considered unclean',
      'Greet Malays with "Selamat pagi/petang" (good morning/evening) — they love it',
      'Dress modestly at mosques — cover shoulders and knees. Scarves provided usually',
      'Ramadan month: avoid eating/drinking in public during daytime out of respect',
    ]},
    { cat:'🇨🇳 Chinese Culture', items:[
      '"Gong Xi Fa Cai" during CNY will make locals very happy',
      'Avoid giving clocks as gifts — in Chinese culture it symbolises death',
      'Number 4 is unlucky (sounds like "death"). 8 is very lucky',
      'At Chinese temples, incense is offered — observe quietly',
    ]},
    { cat:'🇮🇳 Indian Community', items:[
      'Huge Tamil community — especially in Selangor, Penang. You will feel at home',
      'Brickfields KL is "Little India" — Tamil shops, movies, flower garlands everywhere',
      'Deepavali is a national holiday — Indian celebrations are very grand',
      'Thaipusam at Batu Caves is spectacular — biggest Tamil festival in the world outside India',
      'Many Malaysian Indians speak Tamil — great ice-breaker!',
    ]},
    { cat:'🍽️ Food & Dining', items:[
      'Halal is everywhere — most Malaysian food is Muslim-friendly',
      'Mamak restaurants (Indian-Muslim) are the heart of Malaysian food culture — open 24/7',
      'Tipping is NOT expected. 10% service charge often auto-added at restaurants',
      'Say "pedas" (spicy) if you want it spicy, "tidak pedas" for mild',
      'Eating with hands is totally normal and accepted',
      'Hawker stalls are the BEST food — don\'t be afraid, very hygienic',
    ]},
    { cat:'🚗 Getting Around', items:[
      'Always use Grab (Uber equivalent) — never hail street taxis, they will overcharge',
      'Grab is very safe, reliable, cheaper than taxis. Pay by card or cash',
      'MRT/LRT is world-class — air-conditioned, punctual. Buy token at machine (RM 1–4)',
      'Queue properly at train stations — Malaysians are very disciplined about queuing',
      'Traffic jams (jam) in KL can be very bad 7–9am and 5–8pm — plan accordingly',
    ]},
    { cat:'🔐 Safety & General', items:[
      'Malaysia is very safe for tourists. Petty theft can happen — keep bag in front',
      'Be careful with snatch theft on motorcycles — keep phone/bag away from road side',
      'Tap water in KL is technically safe but most locals drink filtered or bottled',
      'Police are generally helpful — tourist police available at major sites',
      '999 is the emergency number. 112 works on mobile even without SIM',
    ]},
  ]
  const [open, setOpen] = useState(0)

  return (
    <div className={styles.toolWrap}>
      <ToolHeader icon="🤝" title="Cultural Tips for Indians" sub="Blend in, respect local culture, make friends" />
      {tips.map((section, i) => (
        <div key={i} className={styles.cultureSection}>
          <div className={styles.cultureSectionHead} onClick={()=>setOpen(open===i?-1:i)}>
            <span>{section.cat}</span>
            <span>{open===i?'▲':'▼'}</span>
          </div>
          {open===i && (
            <div className={styles.cultureTips}>
              {section.items.map((item,j) => (
                <div key={j} className={styles.cultureTip}>
                  <span className={styles.ctDot}>●</span>{item}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// 11. HIDDEN PLACES
// ═══════════════════════════════════════════════════════════════
function HiddenPlaces() {
  const hidden = allPlaces.filter(p => p.hidden)
  return (
    <div className={styles.toolWrap}>
      <ToolHeader icon="🌴" title="Hidden Places" sub="Secret spots most tourists never find" />
      <div className={styles.hiddenGrid}>
        {hidden.map(p => (
          <div key={p.name} className={styles.hiddenCard}>
            <div className={styles.hiddenBadge}>🌴 Hidden Gem</div>
            <div className={styles.hiddenName}>{p.name}</div>
            <div className={styles.hiddenCity}>📍 {p.city}</div>
            <div className={styles.hiddenEntry}>🎫 {p.entry}</div>
            <div className={styles.hiddenTime}>⏱ {p.time} · Best: {p.best}</div>
            <div className={styles.hiddenTip}>"{p.tip}"</div>
            <div className={styles.hiddenRating}>⭐ {p.rating}/5 · <em>{p.type}</em></div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// 12. LOCAL EXPERIENCES
// ═══════════════════════════════════════════════════════════════
function LocalExperiences() {
  const experiences = [
    { icon:'☕', name:'Mamak Breakfast', cost:'RM 5–10', where:'Any mamak stall', why:'Roti canai + teh tarik = quintessential Malaysian morning. Sit with locals, watch the news on TV', rating:5, mustdo:true },
    { icon:'🚣', name:'Mangrove Kayaking, Langkawi', cost:'RM 80–120', where:'Kilim Karst Geopark', why:'Paddle through mangrove rivers. See wild eagles, monkeys, monitor lizards. Magical experience', rating:4.9, mustdo:true },
    { icon:'🎎', name:'Cultural Show at Cultural Centre KL', cost:'RM 45', where:'Central KL', why:'See traditional Malay, Chinese and Indian dances together. 1hr show with dinner optional', rating:4.5, mustdo:false },
    { icon:'🌅', name:'Sunrise at Petronas Towers', cost:'Free', where:'KLCC Park', why:'6am, almost empty, magical light on the towers. Get that perfect photo without 1,000 tourists', rating:4.8, mustdo:true },
    { icon:'🍜', name:'Night Hawker Trail, Penang', cost:'RM 40–80', where:'Gurney Drive → Chulia St', why:'Eat your way through 15 hawker dishes in one evening. Char kway teow, laksa, cendol, satay', rating:5, mustdo:true },
    { icon:'🏍️', name:'Grab-Bike Tour of KL', cost:'RM 30–50', where:'Downtown KL', why:'Rent a Grab bike + local guide. See KL from a local\'s perspective in 3 hours', rating:4.6, mustdo:false },
    { icon:'🌿', name:'Tea Picking at BOH, Cameron', cost:'Free', where:'BOH Tea Estate, Cameron', why:'Walk through endless tea rows at 1,500m altitude. Fresh tea, cool air, stunning views', rating:4.9, mustdo:true },
    { icon:'🎪', name:'Pasar Malam (Night Market)', cost:'RM 0–30', where:'Every neighbourhood, rotating', why:'Local night markets every night in different areas. Freshest fruit, cheapest food, real local life', rating:4.7, mustdo:true },
    { icon:'🙏', name:'Thaipusam at Batu Caves (Jan)', cost:'Free', where:'Batu Caves, Selangor', why:'Biggest Hindu festival outside India. 1.5 million devotees. Kavadi carriers. Unforgettable', rating:5, mustdo:true },
    { icon:'🎨', name:'Street Art Walk, Georgetown Penang', cost:'Free', where:'Georgetown, Penang', why:'Murals painted by international artists on old shophouses. Grab the map and find them all', rating:4.8, mustdo:true },
    { icon:'🏊', name:'Rainforest Waterfall, Selangor', cost:'RM 10–20', where:'Hutan Lipur Kanching, Rawang', why:'7 tiers of waterfalls 45min from KL. Cool natural swimming pools. Almost no tourists', rating:4.6, mustdo:false },
    { icon:'🌃', name:'KL by Night (Skybar)', cost:'RM 30–60 (drinks)', where:'Traders Hotel, KLCC', why:'Best rooftop bar in KL. Petronas towers literally touching you. Dress smart. Worth every ringgit', rating:4.9, mustdo:false },
  ]
  return (
    <div className={styles.toolWrap}>
      <ToolHeader icon="⭐" title="Local Experience Finder" sub="Things only locals and smart travellers do" />
      <div className={styles.expGrid}>
        {experiences.map(e => (
          <div key={e.name} className={`${styles.expCard} ${e.mustdo?styles.expCardMust:''}`}>
            {e.mustdo && <div className={styles.expMustBadge}>🔥 Must Do</div>}
            <div className={styles.expIcon}>{e.icon}</div>
            <div className={styles.expName}>{e.name}</div>
            <div className={styles.expWhere}>📍 {e.where}</div>
            <div className={styles.expCost}>💰 {e.cost}</div>
            <div className={styles.expWhy}>{e.why}</div>
            <div className={styles.expRating}>⭐ {e.rating}/5</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// 13. HOW MUCH MONEY DO I NEED?
// ═══════════════════════════════════════════════════════════════
function HowMuchMoney() {
  const [days, setDays] = useState(7)
  const [people, setPeople] = useState(2)
  const [style, setStyle] = useState('3star')
  const [dests, setDests] = useState(['kl','penang'])
  const [shopping, setShopping] = useState(2000)
  const inrRate = 19.5

  const dc = DAILY_COSTS[style]||DAILY_COSTS['3star']
  const daily = Object.values(dc).reduce((a,b)=>a+b,0)
  const hotel = dc.accommodation * days * Math.ceil(people/2)
  const food = dc.food * days * people
  const transport = dc.transport * days * people
  const activities = dc.activities * days * people
  const visa = 150 * people
  const flights = 1800 * people
  const emergency = Math.round((hotel+food+transport+activities)*0.15)
  const total = hotel+food+transport+activities+shopping+visa+flights+emergency

  const breakdown = [
    { label:'✈️ Flights (estimated)', rm: flights, note:'Book early for best price' },
    { label:'📄 Visa (eVisa)', rm: visa, note:'RM 150 per person' },
    { label:'🏨 Hotel', rm: hotel, note:`${style} for ${days} nights` },
    { label:'🍽️ Food', rm: food, note:'All meals included' },
    { label:'🚗 Transport (Grab+MRT)', rm: transport, note:'Within Malaysia' },
    { label:'🎡 Activities & Entry', rm: activities, note:'Attractions, tours' },
    { label:'🛍️ Shopping budget', rm: shopping, note:'Souvenirs, clothes, gifts' },
    { label:'🆘 Emergency fund (15%)', rm: emergency, note:'Always carry extra' },
  ]

  return (
    <div className={styles.toolWrap}>
      <ToolHeader icon="💵" title='"How Much Money Do I Need?"' sub="Total trip cost calculator — not just daily spend" />

      <div className={styles.moneyControls}>
        {[{label:'👥 People',val:people,set:setPeople,min:1,max:10},{label:'📅 Days',val:days,set:setDays,min:1,max:30}].map(f=>(
          <div key={f.label} className={styles.moneyControl}>
            <label>{f.label}</label>
            <div className={styles.simCounter}>
              <button onClick={()=>f.set(Math.max(f.min,f.val-1))}>−</button>
              <span>{f.val}</span>
              <button onClick={()=>f.set(Math.min(f.max,f.val+1))}>+</button>
            </div>
          </div>
        ))}
        <div className={styles.moneyControl}>
          <label>🏨 Style</label>
          <select value={style} onChange={e=>setStyle(e.target.value)} className={styles.sel}>
            <option value="hostel">🎒 Backpacker</option>
            <option value="budget">💰 Budget</option>
            <option value="3star">⭐ Mid-range</option>
            <option value="4star">✨ Comfort</option>
            <option value="5star">👑 Luxury</option>
          </select>
        </div>
        <div className={styles.moneyControl}>
          <label>🛍️ Shopping (RM)</label>
          <input type="number" value={shopping} onChange={e=>setShopping(+e.target.value)} className={styles.numInput} />
        </div>
      </div>

      <div className={styles.moneyResult}>
        <div className={styles.mrLabel}>Total trip cost</div>
        <div className={styles.mrRM}>{fmtRM(total)}</div>
        <div className={styles.mrINR}>≈ ₹{Math.round(total*inrRate).toLocaleString()}</div>
        <div className={styles.mrPer}>({fmtRM(Math.round(total/people))} per person · {fmtRM(Math.round(total/days/people))}/day/person)</div>
      </div>

      <div className={styles.moneyBreakdown}>
        {breakdown.map(b => (
          <div key={b.label} className={styles.mbRow}>
            <div className={styles.mbLabel}>{b.label}</div>
            <div className={styles.mbNote}>{b.note}</div>
            <div className={styles.mbRM}>{fmtRM(b.rm)}</div>
            <div className={styles.mbINR}>₹{Math.round(b.rm*inrRate).toLocaleString()}</div>
          </div>
        ))}
        <div className={`${styles.mbRow} ${styles.mbTotal}`}>
          <div className={styles.mbLabel}>💰 Grand Total</div>
          <div className={styles.mbNote}></div>
          <div className={styles.mbRM}>{fmtRM(total)}</div>
          <div className={styles.mbINR}>₹{Math.round(total*inrRate).toLocaleString()}</div>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// 14. AVOID TRAPS
// ═══════════════════════════════════════════════════════════════
function AvoidTraps() {
  const [revealed, setRevealed] = useState([])
  const toggle = i => setRevealed(r => r.includes(i) ? r.filter(x=>x!==i) : [...r,i])

  return (
    <div className={styles.toolWrap}>
      <ToolHeader icon="⚠️" title='"Avoid Tourist Traps"' sub="Scams & overcharges that target Indian tourists" />
      <div className={styles.trapsGrid}>
        {TOURIST_TRAPS.map((trap, i) => (
          <div key={i} className={`${styles.trapCard} ${revealed.includes(i)?styles.trapCardOpen:''}`}
            onClick={()=>toggle(i)}>
            <div className={styles.trapTop}>
              <span className={styles.trapIcon}>{trap.icon}</span>
              <div>
                <div className={styles.trapName}>{trap.trap}</div>
                <div className={styles.trapSaving}>💸 Potential saving: <strong>{trap.saving}</strong></div>
              </div>
              <span className={styles.trapArrow}>{revealed.includes(i)?'▲':'▼'}</span>
            </div>
            {revealed.includes(i) && (
              <div className={styles.trapSolution}>
                <div className={styles.trapSolTitle}>✅ How to avoid it:</div>
                <div>{trap.howToAvoid}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={styles.trapsSummary}>
        <strong>💡 Golden rule:</strong> Install Grab before you land. Use it for ALL transport. This single action saves most tourists RM 100–300 on every trip.
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// 15. LOCAL DEALS
// ═══════════════════════════════════════════════════════════════
function LocalDeals() {
  const types = ['all','transport','food','attraction','entertainment','misc']
  const [type, setType] = useState('all')
  const filtered = LOCAL_DEALS.filter(d => type==='all'||d.type===type)

  return (
    <div className={styles.toolWrap}>
      <ToolHeader icon="🎟️" title="Local Deals & Discounts" sub="Codes, apps and tricks that locals use" />
      <div className={styles.typeTabs}>
        {types.map(t=>(
          <button key={t} onClick={()=>setType(t)} className={`${styles.typeTab} ${type===t?styles.typeTabOn:''}`}>
            {t.charAt(0).toUpperCase()+t.slice(1)}
          </button>
        ))}
      </div>
      <div className={styles.dealsGrid}>
        {filtered.map(d => (
          <div key={d.name} className={styles.dealCard}>
            <div className={styles.dealIcon}>{d.icon}</div>
            <div className={styles.dealInfo}>
              <div className={styles.dealName}>{d.name}</div>
              <div className={styles.dealDiscount}>{d.discount}</div>
              <div className={styles.dealValid}>📅 {d.valid}</div>
              {d.code !== 'No code — ask' && d.code !== 'Walk-in rate' && d.code !== 'Free app' && d.code !== 'Token machine' && d.code !== 'Check app' && d.code !== 'Check website' && d.code !== 'Show passport' &&
                <div className={styles.dealCode}>🏷️ Code: <strong>{d.code}</strong></div>
              }
            </div>
          </div>
        ))}
      </div>
      <div className={styles.dealsApps}>
        <div className={styles.daTitle}>📱 Must-Have Apps for Malaysia</div>
        {[
          { app:'Grab', icon:'🚗', use:'Transport + Food delivery. Most important app in Malaysia' },
          { app:'Foodpanda', icon:'🍔', use:'Food delivery. Cheaper than restaurants for hotel dining' },
          { app:'MyRapid', icon:'🚇', use:'KL MRT/LRT maps, journey planner, fare calculator' },
          { app:'Google Maps', icon:'🗺️', use:'Works perfectly in Malaysia. Download offline maps before' },
          { app:'XE Currency', icon:'💱', use:'Real-time MYR/INR rates. Know exact conversion always' },
          { app:'Wise', icon:'💸', use:'Best MYR to INR transfer rate. Much better than banks' },
        ].map(a => (
          <div key={a.app} className={styles.appRow}>
            <span className={styles.appIcon}>{a.icon}</span>
            <span className={styles.appName}>{a.app}</span>
            <span className={styles.appUse}>{a.use}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// 16. TRAVEL MAP
// ═══════════════════════════════════════════════════════════════
function TravelMap() {
  const [city, setCity] = useState('kl')
  const [filter, setFilter] = useState('all')
  const dest = PLACES[city]
  const places = dest.regions.flatMap(r => r.places).filter(p => filter==='all'||p.type===filter||( filter==='hidden'&&p.hidden)||(filter==='indian'&&p.indian))
  const typeColors = { landmark:'#C9F53B', temple:'#f59e0b', nature:'#16a34a', cultural:'#a78bfa', shopping:'#38bdf8', food:'#fb7185' }

  return (
    <div className={styles.toolWrap}>
      <ToolHeader icon="🌍" title="Community Travel Map" sub="All must-visit places plotted on map" />
      <div className={styles.cityTabs}>
        {Object.entries(PLACES).map(([id,c])=>(
          <button key={id} onClick={()=>setCity(id)} className={`${styles.cityTab} ${city===id?styles.cityTabOn:''}`}>
            {c.icon} {c.name}
          </button>
        ))}
      </div>
      <div className={styles.mapFilters}>
        {['all','landmark','temple','nature','cultural','shopping','food','hidden','indian'].map(f=>(
          <button key={f} onClick={()=>setFilter(f)} className={`${styles.typeTab} ${filter===f?styles.typeTabOn:''}`}>
            {f==='hidden'?'🌴 Hidden':f==='indian'?'🇮🇳 Indian':f.charAt(0).toUpperCase()+f.slice(1)}
          </button>
        ))}
      </div>

      {/* Interactive visual map using iframe Google Maps */}
      <div className={styles.mapEmbed}>
        <iframe
          title="Malaysia Map"
          width="100%"
          height="380"
          style={{border:0,borderRadius:'12px'}}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://maps.google.com/maps?q=${dest.regions[0].places[0].lat},${dest.regions[0].places[0].lng}&z=13&output=embed`}
        />
      </div>

      <div className={styles.mapList}>
        {places.map(p => (
          <div key={p.name} className={styles.mapPlace}>
            <div className={styles.mpDot} style={{background: typeColors[p.type]||'#C9F53B'}} />
            <div className={styles.mpInfo}>
              <div className={styles.mpName}>{p.name}</div>
              <div className={styles.mpMeta}>{p.entry} · {p.time} · Best: {p.best}</div>
            </div>
            {p.hidden && <span className={styles.mpHidden}>🌴</span>}
            {p.indian && <span className={styles.mpIndian}>🇮🇳</span>}
            <div className={styles.mpRating}>⭐{p.rating}</div>
            <a href={`https://maps.google.com/?q=${p.lat},${p.lng}`} target="_blank" rel="noreferrer" className={styles.mpMapBtn} onClick={e=>e.stopPropagation()}>
              Open Map →
            </a>
          </div>
        ))}
      </div>
      <div className={styles.mapLegend}>
        {Object.entries(typeColors).map(([type,color])=>(
          <div key={type} className={styles.legendItem}><div className={styles.legendDot} style={{background:color}}/><span>{type}</span></div>
        ))}
      </div>
    </div>
  )
}

// ── Shared Helper ─────────────────────────────────────────────
function ToolHeader({ icon, title, sub }) {
  return (
    <div className={styles.toolHeader}>
      <span className={styles.thIcon}>{icon}</span>
      <div><h2 className={styles.thTitle}>{title}</h2><p className={styles.thSub}>{sub}</p></div>
    </div>
  )
}
