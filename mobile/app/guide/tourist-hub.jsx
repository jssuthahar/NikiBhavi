import { useState } from 'react'
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Linking, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { C, s, SP, R, W, shadow, shadowMd } from '../../src/theme/index'

const MYR_INR = 19.5

// ── Tools list (mirrors web 16 tools) ────────────────────────
const TOOLS = [
  { id:'places',   icon:'📍', label:'Places to Visit' },
  { id:'food',     icon:'🍛', label:'Indian Food'      },
  { id:'budget',   icon:'💰', label:'Budget Planner'   },
  { id:'visa',     icon:'📄', label:'Visa Guide'       },
  { id:'sim',      icon:'📱', label:'SIM Comparison'   },
  { id:'buy',      icon:'🛒', label:'What to Buy'      },
  { id:'culture',  icon:'🤝', label:'Cultural Tips'    },
  { id:'traps',    icon:'⚠️', label:'Avoid Traps'      },
  { id:'money',    icon:'💵', label:'How Much Money?'  },
  { id:'shopping', icon:'🛍️', label:'Shopping'         },
]

// ── Data ─────────────────────────────────────────────────────
const PLACES = [
  { name:'Batu Caves',        city:'KL',      entry:'Free',      time:'2hrs',  rating:4.8, emoji:'⛩️',  tip:'Go before 9am to avoid crowds. Silver temple inside cave.' },
  { name:'Petronas Towers',   city:'KL',      entry:'RM 89.90',  time:'1.5hrs',rating:4.9, emoji:'🏙️',  tip:'Book skybridge tickets online — sells out fast!' },
  { name:'KLCC Park',         city:'KL',      entry:'Free',      time:'1hr',   rating:4.7, emoji:'🌳',  tip:'Fountain show every night at 8pm & 9pm — free!' },
  { name:'Central Market',    city:'KL',      entry:'Free',      time:'1hr',   rating:4.3, emoji:'🛍️',  tip:'Best place for authentic Malaysian souvenirs & batik.' },
  { name:'Merdeka Square',    city:'KL',      entry:'Free',      time:'45min', rating:4.5, emoji:'🏛️',  tip:'Historic heart of KL. Great for evening walks.' },
  { name:'Georgetown',        city:'Penang',  entry:'Free',      time:'Half day',rating:4.9,emoji:'🎨', tip:'Street art murals everywhere. Get the free map at tourist office.' },
  { name:'Penang Hill',       city:'Penang',  entry:'RM 30',     time:'3hrs',  rating:4.8, emoji:'⛰️',  tip:'Funicular railway. Sunrise is magical — take first train at 6am.' },
  { name:'Genting Highlands', city:'Selangor',entry:'RM 8–50',   time:'Full day',rating:4.5,emoji:'🎡', tip:'Cool weather at 1,800m. Casino + theme park + hotel.' },
  { name:'Malacca Old Town',  city:'Malacca', entry:'Free',      time:'Half day',rating:4.8,emoji:'🏛️', tip:'UNESCO heritage. Trishaw rides, best cendol in Malaysia.' },
  { name:'Langkawi',          city:'Langkawi',entry:'Varies',    time:'3+ days',rating:4.9,emoji:'🏖️', tip:'Duty-free island. Cheap chocolate, perfume & liquor. Sky bridge RM 30.' },
]

const FOOD = [
  { name:'Village Park Restaurant',  area:'Damansara Uptown', city:'KL',     price:'RM 10–20', rating:4.8, type:'Nasi Lemak', halal:true },
  { name:'Devi\'s Corner',           area:'Bangsar',          city:'KL',     price:'RM 8–15',  rating:4.7, type:'Banana Leaf', halal:false },
  { name:'Yut Kee',                  area:'Dang Wangi',       city:'KL',     price:'RM 10–20', rating:4.6, type:'Hainanese',  halal:false },
  { name:'Hameediyah',               area:'Georgetown',       city:'Penang', price:'RM 12–25', rating:4.8, type:'Nasi Kandar', halal:true },
  { name:'Sri Ananda Bahwan',        area:'Georgetown',       city:'Penang', price:'RM 8–15',  rating:4.9, type:'South Indian', halal:false },
  { name:'Brickfields Banana Leaf',  area:'Brickfields',      city:'KL',     price:'RM 10–18', rating:4.7, type:'Banana Leaf', halal:false },
  { name:'Pelita Nasi Kandar',       area:'Ampang',           city:'KL',     price:'RM 8–20',  rating:4.6, type:'Nasi Kandar',  halal:true },
  { name:'Old Town White Coffee',    area:'Everywhere',       city:'All',    price:'RM 8–15',  rating:4.3, type:'Kopitiam',     halal:true },
]

const TRAPS = [
  { trap:'Taxi at KLIA without meter',    saving:'RM 50–150', fix:'Always use Grab or pre-paid taxi counter inside terminal', icon:'🚕' },
  { trap:'Money changers at airport',     saving:'RM 20–50',  fix:'Change only RM 100 at airport. Change rest in the city at licensed money changers in Suria KLCC, Mid Valley', icon:'💱' },
  { trap:'Overpriced tourist restaurants',saving:'RM 30–80',  fix:'Walk 1 street away from tourist spots. Real locals eat at mamak (RM 5–12/meal)', icon:'🍽️' },
  { trap:'Petaling Street fake goods',    saving:'RM 20–100', fix:'Know what you\'re buying. If it\'s labeled Gucci for RM 30, it\'s fake. Still fun to browse!', icon:'🛍️' },
  { trap:'Tourist photos at Batu Caves',  saving:'RM 20–50',  fix:'Avoid people in costume offering photos — they charge RM 20–50 afterwards', icon:'📸' },
  { trap:'\"Special price\" trishaws',    saving:'RM 30–60',  fix:'Agree on price BEFORE boarding trishaw in Malacca. Standard is RM 30–40 for 30min', icon:'🛺' },
]

const BUY_ITEMS = [
  { item:'Kopiko Coffee Candy',   price:'RM 5–8',    save:'Very cheap vs India',  emoji:'☕' },
  { item:'Ferrero Rocher',        price:'RM 25–40',  save:'30% cheaper than India',emoji:'🍫' },
  { item:'Padini / Cotton On',    price:'RM 30–80',  save:'Quality clothes cheap', emoji:'👕' },
  { item:'Batik fabric',          price:'RM 20–60',  save:'Unique souvenir',        emoji:'🎨' },
  { item:'Royal Selangor Pewter', price:'RM 80–500', save:'Made in Malaysia',       emoji:'🏆' },
  { item:'Bonia / Braun Buffel',  price:'RM 200+',   save:'MY brands, good quality',emoji:'👜' },
  { item:'Tropical fruits',       price:'RM 2–15/kg',save:'Fresh & cheap: mangosteen, rambutan',emoji:'🍈'},
  { item:'Duty-free in Langkawi', price:'Varies',    save:'Chocolate, perfume, liquor 30–50% off',emoji:'🏝️'},
]

const DAILY_COSTS = {
  budget:  { hotel:60,  food:30, transport:20, activities:20 },
  midrange:{ hotel:150, food:60, transport:40, activities:50 },
  comfort: { hotel:300, food:100,transport:60, activities:80 },
}

// ── Main component ────────────────────────────────────────────
export default function TouristHubScreen() {
  const [tool, setTool] = useState('places')

  return (
    <View style={{ flex:1, backgroundColor:C.bg }}>
      {/* Hero */}
      <View style={ls.hero}>
        <Text style={ls.heroFlag}>🇮🇳 ✈️ 🇲🇾</Text>
        <Text style={ls.heroTitle}>Tourist Hub</Text>
        <Text style={ls.heroSub}>10 free tools for Indian visitors</Text>
      </View>

      {/* Tool nav */}
      <View style={ls.toolNav}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={TOOLS}
          keyExtractor={t => t.id}
          contentContainerStyle={{ paddingHorizontal:SP.lg, paddingVertical:SP.sm, gap:SP.sm }}
          renderItem={({ item: t }) => (
            <TouchableOpacity style={[ls.toolBtn, tool===t.id && ls.toolBtnOn]}
              onPress={() => setTool(t.id)} activeOpacity={0.7}>
              <Text style={{ fontSize:16 }}>{t.icon}</Text>
              <Text style={[ls.toolBtnTxt, tool===t.id && { color:C.primary }]}>{t.label}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Content area */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom:32 }}>
        {tool === 'places'   && <PlacesToVisit />}
        {tool === 'food'     && <IndianFood />}
        {tool === 'budget'   && <BudgetPlanner />}
        {tool === 'visa'     && <VisaGuide />}
        {tool === 'sim'      && <SimGuide />}
        {tool === 'buy'      && <WhatToBuy />}
        {tool === 'culture'  && <CulturalTips />}
        {tool === 'traps'    && <AvoidTraps />}
        {tool === 'money'    && <HowMuchMoney />}
        {tool === 'shopping' && <ShoppingGuide />}
      </ScrollView>
    </View>
  )
}

// ── Tool: Places ──────────────────────────────────────────────
function PlacesToVisit() {
  const [city, setCity] = useState('All')
  const cities = ['All','KL','Penang','Selangor','Malacca','Langkawi']
  const filtered = PLACES.filter(p => city==='All' || p.city===city)
  return (
    <View style={ls.toolWrap}>
      <CityTabs cities={cities} selected={city} onSelect={setCity} />
      {filtered.map((p, i) => (
        <View key={p.name} style={ls.placeCard}>
          <View style={{ flexDirection:'row', alignItems:'flex-start', gap:SP.md }}>
            <Text style={{ fontSize:28 }}>{p.emoji}</Text>
            <View style={{ flex:1 }}>
              <View style={{ flexDirection:'row', justifyContent:'space-between' }}>
                <Text style={[s.title, { flex:1 }]}>{p.name}</Text>
                <Text style={ls.rating}>⭐ {p.rating}</Text>
              </View>
              <Text style={[s.small, { color:C.primary, marginVertical:2 }]}>📍 {p.city}</Text>
              <View style={{ flexDirection:'row', gap:SP.sm, flexWrap:'wrap', marginBottom:SP.xs }}>
                <View style={ls.pill}><Text style={ls.pillTxt}>🎫 {p.entry}</Text></View>
                <View style={ls.pill}><Text style={ls.pillTxt}>⏱ {p.time}</Text></View>
              </View>
              <Text style={[s.small, { color:C.sub }]}>💡 {p.tip}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  )
}

// ── Tool: Indian Food ─────────────────────────────────────────
function IndianFood() {
  const [city, setCity] = useState('All')
  const [vegOnly, setVegOnly] = useState(false)
  const cities = ['All','KL','Penang']
  const filtered = FOOD.filter(r => (city==='All'||r.city===city) && (!vegOnly||!r.halal))
  return (
    <View style={ls.toolWrap}>
      <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:SP.sm }}>
        <CityTabs cities={cities} selected={city} onSelect={setCity} />
        <TouchableOpacity style={[ls.vegBtn, vegOnly && ls.vegBtnOn]} onPress={() => setVegOnly(!vegOnly)}>
          <Text style={[ls.vegBtnTxt, vegOnly && { color:C.primary }]}>🥗 Veg</Text>
        </TouchableOpacity>
      </View>
      {filtered.map(r => (
        <View key={r.name} style={ls.foodCard}>
          <View style={{ flexDirection:'row', justifyContent:'space-between' }}>
            <Text style={[s.title, { flex:1 }]}>{r.name}</Text>
            <Text style={ls.rating}>⭐ {r.rating}</Text>
          </View>
          <Text style={s.small}>📍 {r.area}, {r.city}</Text>
          <View style={{ flexDirection:'row', gap:SP.sm, marginTop:SP.xs, flexWrap:'wrap' }}>
            <View style={ls.pill}><Text style={ls.pillTxt}>{r.type}</Text></View>
            <View style={ls.pill}><Text style={ls.pillTxt}>💰 {r.price}</Text></View>
            <View style={[ls.pill, { backgroundColor: r.halal ? '#E6F7EE' : '#FFF0EF' }]}>
              <Text style={[ls.pillTxt, { color: r.halal ? C.primary : C.danger }]}>
                {r.halal ? '✅ Halal' : '🔴 Non-Halal'}
              </Text>
            </View>
          </View>
        </View>
      ))}
      <View style={ls.tipBox}>
        <Text style={ls.tipBoxTxt}>💡 <Text style={{ fontWeight:W.bold }}>Mamak culture:</Text> Indian-Muslim restaurants open 24hrs everywhere. Roti canai RM 1.50, teh tarik RM 2, mee goreng RM 6.</Text>
      </View>
    </View>
  )
}

// ── Tool: Budget Planner ──────────────────────────────────────
function BudgetPlanner() {
  const [days, setDays] = useState(7)
  const [people, setPeople] = useState(2)
  const [style, setStyle] = useState('midrange')
  const dc = DAILY_COSTS[style]
  const hotel = dc.hotel * days * Math.ceil(people/2)
  const food  = dc.food * days * people
  const trans = dc.transport * days * people
  const acts  = dc.activities * days * people
  const flights = 1800 * people
  const total = hotel + food + trans + acts + flights

  return (
    <View style={ls.toolWrap}>
      {/* Controls */}
      <View style={ls.budgetControls}>
        {[{l:'👥 People',v:people,s:setPeople,mn:1,mx:10},{l:'📅 Days',v:days,s:setDays,mn:1,mx:30}].map(f => (
          <View key={f.l} style={ls.counterWrap}>
            <Text style={ls.counterLabel}>{f.l}</Text>
            <View style={ls.counter}>
              <TouchableOpacity style={ls.cBtn} onPress={() => f.s(Math.max(f.mn, f.v-1))}><Text style={ls.cBtnTxt}>−</Text></TouchableOpacity>
              <Text style={ls.cVal}>{f.v}</Text>
              <TouchableOpacity style={ls.cBtn} onPress={() => f.s(Math.min(f.mx, f.v+1))}><Text style={ls.cBtnTxt}>+</Text></TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      <View style={ls.stylePicker}>
        {[['budget','🎒 Budget'],['midrange','⭐ Mid-range'],['comfort','✨ Comfort']].map(([id,lbl]) => (
          <TouchableOpacity key={id} style={[ls.styleBtn, style===id && ls.styleBtnOn]}
            onPress={() => setStyle(id)} activeOpacity={0.7}>
            <Text style={[ls.styleBtnTxt, style===id && { color:C.primary }]}>{lbl}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Total */}
      <View style={[ls.budgetTotal, { backgroundColor:C.primary }]}>
        <Text style={s.resultLabel}>Estimated Total</Text>
        <Text style={s.resultValue}>RM {Math.round(total).toLocaleString()}</Text>
        <Text style={s.resultSub}>≈ ₹{Math.round(total * MYR_INR).toLocaleString()} for {people} person{people>1?'s':''}, {days} days</Text>
      </View>

      {/* Breakdown */}
      <View style={[s.card, { paddingVertical:0 }]}>
        {[['✈️ Flights (est)',flights],['🏨 Hotel',hotel],['🍽️ Food',food],['🚗 Transport',trans],['🎡 Activities',acts]].map(([l,v],i,arr) => (
          <View key={l} style={i < arr.length-1 ? s.row : s.rowLast}>
            <Text style={[s.body, { flex:1 }]}>{l}</Text>
            <View>
              <Text style={[s.title, { color:C.primary, textAlign:'right' }]}>RM {Math.round(v).toLocaleString()}</Text>
              <Text style={[s.small, { color:C.muted, textAlign:'right' }]}>₹{Math.round(v*MYR_INR).toLocaleString()}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

// ── Tool: Visa Guide ──────────────────────────────────────────
function VisaGuide() {
  return (
    <View style={ls.toolWrap}>
      <View style={[ls.visaBanner]}>
        <Text style={{ fontSize:32 }}>🎉</Text>
        <View style={{ flex:1, marginLeft:SP.md }}>
          <Text style={ls.visaTitle}>Indians are VISA-FREE!</Text>
          <Text style={ls.visaSub}>Valid until December 31, 2026 • Free • No eVisa needed</Text>
        </View>
      </View>

      <View style={[s.card, { paddingVertical:0 }]}>
        {[
          ['⏱️ Duration',   'Up to 30 days per visit'],
          ['💰 Cost',       'FREE — no visa fee'],
          ['📱 MDAC',       'Mandatory — submit 3 days before'],
          ['🎯 Purpose',    'Tourism, social, business meetings'],
          ['🚫 Not for',    'Employment or long-term study'],
        ].map(([l,v],i,arr) => (
          <View key={l} style={i < arr.length-1 ? s.row : s.rowLast}>
            <Text style={[s.body, { width:100 }]}>{l}</Text>
            <Text style={[s.body, { flex:1, color:C.sub }]}>{v}</Text>
          </View>
        ))}
      </View>

      <View style={ls.mdacCard}>
        <Text style={ls.mdacTitle}>🔴 MDAC is MANDATORY</Text>
        <Text style={ls.mdacSub}>Submit at imigresen-online.imi.gov.my/mdac/main at least 3 days before arrival. It's FREE. Airlines may deny boarding without it.</Text>
        <TouchableOpacity style={ls.mdacBtn} onPress={() => Linking.openURL('https://imigresen-online.imi.gov.my/mdac/main')} activeOpacity={0.8}>
          <Text style={ls.mdacBtnTxt}>📱 Submit MDAC Now — Free</Text>
          <Ionicons name="open-outline" size={14} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={s.sectionHdr}>What to Bring at Immigration</Text>
      <View style={[s.card, { paddingVertical:0 }]}>
        {['Valid passport (6+ months validity)','MDAC confirmation screenshot','Return/onward flight ticket','Hotel booking confirmation','Sufficient funds (RM 500+ or equivalent)','MDAC reference number'].map((d,i,arr) => (
          <View key={i} style={[s.row, i===arr.length-1 && {borderBottomWidth:0}]}>
            <Text style={{ color:C.primary, marginRight:8 }}>✓</Text>
            <Text style={[s.body, { flex:1 }]}>{d}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

// ── Tool: SIM Guide ───────────────────────────────────────────
function SimGuide() {
  const [days, setDays] = useState(7)
  const inrRate = 19.5
  const indiaRoaming = 625 * days
  const myBest = 30
  const saving = indiaRoaming - (myBest * inrRate)

  return (
    <View style={ls.toolWrap}>
      <View style={ls.counterWrap}>
        <Text style={ls.counterLabel}>📅 Trip days</Text>
        <View style={ls.counter}>
          <TouchableOpacity style={ls.cBtn} onPress={() => setDays(Math.max(1,days-1))}><Text style={ls.cBtnTxt}>−</Text></TouchableOpacity>
          <Text style={ls.cVal}>{days}</Text>
          <TouchableOpacity style={ls.cBtn} onPress={() => setDays(Math.min(30,days+1))}><Text style={ls.cBtnTxt}>+</Text></TouchableOpacity>
        </View>
      </View>
      <View style={[ls.verdictCard]}>
        <Text style={ls.verdictTitle}>💡 You save ₹{Math.round(saving).toLocaleString()} with a Malaysian SIM</Text>
        <Text style={ls.verdictSub}>Indian roaming ≈ ₹{Math.round(indiaRoaming).toLocaleString()} vs Malaysian SIM ≈ ₹{Math.round(myBest*inrRate).toLocaleString()}</Text>
      </View>
      <View style={[s.card, { paddingVertical:0 }]}>
        {[
          { name:'Maxis Tourist SIM',  data:'30GB', price:'RM 30', days:'30 days', emoji:'📱', best:true  },
          { name:'Celcom Tourist SIM', data:'20GB', price:'RM 25', days:'30 days', emoji:'📲', best:false },
          { name:'Digi Tourist SIM',   data:'15GB', price:'RM 20', days:'30 days', emoji:'📳', best:false },
          { name:'U Mobile Tourist',   data:'10GB', price:'RM 15', days:'14 days', emoji:'📶', best:false },
        ].map((sim, i, arr) => (
          <View key={sim.name} style={[s.row, i===arr.length-1 && {borderBottomWidth:0}]}>
            <Text style={{ fontSize:20, width:30 }}>{sim.emoji}</Text>
            <View style={{ flex:1, marginLeft:8 }}>
              <View style={{ flexDirection:'row', gap:6, alignItems:'center' }}>
                <Text style={s.title}>{sim.name}</Text>
                {sim.best && <View style={ls.bestBadge}><Text style={ls.bestTxt}>Best</Text></View>}
              </View>
              <Text style={s.small}>{sim.data} · {sim.days}</Text>
            </View>
            <Text style={[s.title, { color:C.primary }]}>{sim.price}</Text>
          </View>
        ))}
      </View>
      <View style={ls.tipBox}>
        <Text style={ls.tipBoxTxt}>📍 Buy at KLIA Arrivals, 7-Eleven, Guardian pharmacy, or official telco stores in malls.</Text>
      </View>
    </View>
  )
}

// ── Tool: What to Buy ─────────────────────────────────────────
function WhatToBuy() {
  return (
    <View style={ls.toolWrap}>
      <View style={[s.card, { paddingVertical:0 }]}>
        {BUY_ITEMS.map((item, i) => (
          <View key={item.item} style={i < BUY_ITEMS.length-1 ? s.row : s.rowLast}>
            <Text style={{ fontSize:22, width:34 }}>{item.emoji}</Text>
            <View style={{ flex:1, marginLeft:10 }}>
              <Text style={s.title}>{item.item}</Text>
              <Text style={s.small}>{item.save}</Text>
            </View>
            <Text style={[s.small, { color:C.primary, fontWeight:W.bold }]}>{item.price}</Text>
          </View>
        ))}
      </View>
      <View style={ls.tipBox}>
        <Text style={ls.tipBoxTxt}>🤝 Bargaining tip: At Petaling St, start at 40% of asking price. At malls, no bargaining. Speak Tamil/Hindi — Indian vendors often give better prices!</Text>
      </View>
    </View>
  )
}

// ── Tool: Cultural Tips ───────────────────────────────────────
function CulturalTips() {
  const [open, setOpen] = useState(0)
  const sections = [
    { cat:'🕌 Malay Culture', tips:['Remove shoes before entering homes','Never point with index finger — use thumb','Use right hand for eating & giving items','Dress modestly at mosques','During Ramadan, avoid eating in public daytime out of respect'] },
    { cat:'🇮🇳 Indian Community', tips:['Huge Tamil community in Selangor & Penang — you will feel at home!','Brickfields KL is "Little India" — Tamil shops, movies, flowers','Thaipusam at Batu Caves = biggest Tamil festival outside India','Deepavali is a national holiday in Malaysia'] },
    { cat:'🍽️ Food & Dining', tips:['Mamak restaurants: 24hr, cheap, halal, heart of Malaysia','Tipping NOT expected — 10% service charge often auto-added','Say "pedas" for spicy, "tidak pedas" for mild','Eating with hands is totally normal','Hawker stalls are the BEST food — very hygienic'] },
    { cat:'🚗 Getting Around', tips:['Always use Grab — never hail street taxis (overcharge)','Touch \'n Go card for MRT/LRT/bus — buy at any station','KL traffic jams 7–9am and 5–8pm — plan accordingly','999 = emergency number, 112 works without SIM'] },
    { cat:'🔐 Safety', tips:['Malaysia is very safe for tourists','Watch for snatch theft from motorcycles — keep bag on inside','Tap water is technically safe but most drink filtered or bottled','Police are helpful — tourist police at major attractions'] },
  ]
  return (
    <View style={ls.toolWrap}>
      {sections.map((sec, i) => (
        <TouchableOpacity key={i} style={ls.cultureSection} onPress={() => setOpen(open===i ? -1 : i)} activeOpacity={0.8}>
          <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding:SP.md }}>
            <Text style={[s.title, { flex:1 }]}>{sec.cat}</Text>
            <Ionicons name={open===i ? 'chevron-up' : 'chevron-down'} size={16} color={C.muted} />
          </View>
          {open===i && (
            <View style={{ paddingHorizontal:SP.md, paddingBottom:SP.md }}>
              {sec.tips.map((tip,j) => (
                <View key={j} style={{ flexDirection:'row', marginBottom:6 }}>
                  <View style={[ls.dot, { backgroundColor:C.primary, marginTop:6 }]} />
                  <Text style={[s.body, { flex:1, marginLeft:8, lineHeight:20, fontSize:14 }]}>{tip}</Text>
                </View>
              ))}
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  )
}

// ── Tool: Avoid Traps ─────────────────────────────────────────
function AvoidTraps() {
  const [open, setOpen] = useState(null)
  return (
    <View style={ls.toolWrap}>
      {TRAPS.map((trap, i) => (
        <TouchableOpacity key={i} style={ls.trapCard} onPress={() => setOpen(open===i ? null : i)} activeOpacity={0.8}>
          <View style={{ flexDirection:'row', alignItems:'center', gap:SP.sm }}>
            <Text style={{ fontSize:22 }}>{trap.icon}</Text>
            <View style={{ flex:1 }}>
              <Text style={s.title}>{trap.trap}</Text>
              <Text style={[s.small, { color:C.danger }]}>💸 Save: {trap.saving}</Text>
            </View>
            <Ionicons name={open===i ? 'chevron-up' : 'chevron-down'} size={16} color={C.muted} />
          </View>
          {open===i && (
            <View style={ls.trapSolution}>
              <Text style={ls.trapSolTxt}>✅ {trap.fix}</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
      <View style={ls.tipBox}>
        <Text style={ls.tipBoxTxt}>💡 Golden rule: Install Grab before you land. This single action saves most tourists RM 100–300 per trip.</Text>
      </View>
    </View>
  )
}

// ── Tool: How Much Money ──────────────────────────────────────
function HowMuchMoney() {
  const [days,    setDays]    = useState(7)
  const [people,  setPeople]  = useState(2)
  const [style,   setStyle]   = useState('midrange')
  const [shopping,setShopping]= useState(1000)

  const dc = DAILY_COSTS[style]
  const hotel    = dc.hotel * days * Math.ceil(people/2)
  const food     = dc.food * days * people
  const trans    = dc.transport * days * people
  const acts     = dc.activities * days * people
  const flights  = 1800 * people
  const visa     = 150 * people
  const emergency= Math.round((hotel+food+trans+acts)*0.15)
  const total    = hotel+food+trans+acts+flights+visa+shopping+emergency

  const rows = [
    ['✈️ Flights',    flights   ],
    ['📄 MDAC/Visa',  visa      ],
    ['🏨 Hotel',      hotel     ],
    ['🍽️ Food',       food      ],
    ['🚗 Transport',  trans     ],
    ['🎡 Activities', acts      ],
    ['🛍️ Shopping',   shopping  ],
    ['🆘 Emergency',  emergency ],
  ]

  return (
    <View style={ls.toolWrap}>
      <View style={ls.budgetControls}>
        {[{l:'👥 People',v:people,s:setPeople,mn:1,mx:10},{l:'📅 Days',v:days,s:setDays,mn:1,mx:30}].map(f => (
          <View key={f.l} style={ls.counterWrap}>
            <Text style={ls.counterLabel}>{f.l}</Text>
            <View style={ls.counter}>
              <TouchableOpacity style={ls.cBtn} onPress={() => f.s(Math.max(f.mn,f.v-1))}><Text style={ls.cBtnTxt}>−</Text></TouchableOpacity>
              <Text style={ls.cVal}>{f.v}</Text>
              <TouchableOpacity style={ls.cBtn} onPress={() => f.s(Math.min(f.mx,f.v+1))}><Text style={ls.cBtnTxt}>+</Text></TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      <View style={ls.stylePicker}>
        {[['budget','🎒 Budget'],['midrange','⭐ Mid'],['comfort','✨ Comfort']].map(([id,lbl]) => (
          <TouchableOpacity key={id} style={[ls.styleBtn, style===id && ls.styleBtnOn]} onPress={() => setStyle(id)} activeOpacity={0.7}>
            <Text style={[ls.styleBtnTxt, style===id && { color:C.primary }]}>{lbl}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[ls.budgetTotal, { backgroundColor:'#0d0d0d' }]}>
        <Text style={[s.resultLabel, { color:'rgba(255,255,255,0.7)' }]}>Grand Total</Text>
        <Text style={[s.resultValue, { color:'#C9F53B' }]}>RM {Math.round(total).toLocaleString()}</Text>
        <Text style={[s.resultSub, { color:'rgba(255,255,255,0.6)' }]}>
          ≈ ₹{Math.round(total*MYR_INR).toLocaleString()} · RM {Math.round(total/people).toLocaleString()}/person
        </Text>
      </View>

      <View style={[s.card, { paddingVertical:0 }]}>
        {rows.map(([l,v],i,arr) => (
          <View key={l} style={i < arr.length-1 ? s.row : s.rowLast}>
            <Text style={[s.body, { flex:1 }]}>{l}</Text>
            <View>
              <Text style={[s.title, { color:C.primary, textAlign:'right' }]}>RM {Math.round(v).toLocaleString()}</Text>
              <Text style={[s.small, { color:C.muted, textAlign:'right' }]}>₹{Math.round(v*MYR_INR).toLocaleString()}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

// ── Tool: Shopping ────────────────────────────────────────────
function ShoppingGuide() {
  const malls = [
    { name:'Suria KLCC',        city:'KL',       type:'Premium',    emoji:'🏬', tip:'Below Petronas Towers. High-end brands, great food court' },
    { name:'Pavilion KL',       city:'KL',       type:'Premium',    emoji:'🛍️', tip:'Fashion capital of KL. All major brands + Japanese street' },
    { name:'Mid Valley Megamall',city:'KL',      type:'Mid-range',  emoji:'🏪', tip:'Largest mall in KL. Everything in one place' },
    { name:'Sunway Pyramid',    city:'Subang',   type:'Mid-range',  emoji:'🌟', tip:'Egyptian theme mall. Great cinema & food court' },
    { name:'Gurney Plaza',      city:'Penang',   type:'Mid-range',  emoji:'🌊', tip:'Best mall in Penang. Seafront views' },
    { name:'Petaling Street',   city:'KL',       type:'Night market',emoji:'🏮',tip:'Bargain central. Fake goods & street food. Go after 7pm' },
    { name:'Langkawi Duty Free',city:'Langkawi', type:'Duty-free',  emoji:'🏝️', tip:'Chocolate, alcohol, perfume 30–50% cheaper. No GST on island' },
    { name:'Central Market',    city:'KL',       type:'Souvenir',   emoji:'🎨', tip:'Best authentic Malaysian crafts, batik, pewter' },
  ]
  return (
    <View style={ls.toolWrap}>
      <View style={[s.card, { paddingVertical:0 }]}>
        {malls.map((m, i) => (
          <View key={m.name} style={i < malls.length-1 ? s.row : s.rowLast}>
            <Text style={{ fontSize:22, width:34 }}>{m.emoji}</Text>
            <View style={{ flex:1, marginLeft:10 }}>
              <View style={{ flexDirection:'row', gap:6, alignItems:'center' }}>
                <Text style={[s.title, { flex:1 }]}>{m.name}</Text>
                <View style={ls.pill}><Text style={ls.pillTxt}>{m.type}</Text></View>
              </View>
              <Text style={s.small}>📍 {m.city}</Text>
              <Text style={[s.small, { color:C.sub, marginTop:2 }]}>💡 {m.tip}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

// ── Shared helpers ────────────────────────────────────────────
function CityTabs({ cities, selected, onSelect }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap:SP.sm, paddingBottom:SP.sm }}>
      {cities.map(c => (
        <TouchableOpacity key={c} style={[ls.cityTab, selected===c && ls.cityTabOn]} onPress={() => onSelect(c)} activeOpacity={0.7}>
          <Text style={[ls.cityTabTxt, selected===c && { color:C.primary }]}>{c}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

const ls = StyleSheet.create({
  hero:        { backgroundColor:C.primary, paddingHorizontal:SP.lg, paddingVertical:SP.lg, alignItems:'center' },
  heroFlag:    { fontSize:22, marginBottom:4 },
  heroTitle:   { fontSize:22, fontWeight:W.bold, color:'#fff' },
  heroSub:     { fontSize:13, color:'rgba(255,255,255,0.8)', marginTop:2 },

  toolNav:     { backgroundColor:'#fff', borderBottomWidth:1, borderBottomColor:'#EEE' },
  toolBtn:     { paddingHorizontal:SP.md, paddingVertical:SP.sm, borderRadius:R.lg,
                 backgroundColor:'#F5F5F5', alignItems:'center', minWidth:80 },
  toolBtnOn:   { backgroundColor:C.primaryLt },
  toolBtnTxt:  { fontSize:11, fontWeight:W.semibold, color:C.sub, marginTop:3, textAlign:'center' },

  toolWrap:    { padding:SP.lg },

  placeCard:   { backgroundColor:'#fff', borderRadius:R.xl, padding:SP.md, marginBottom:SP.sm, ...shadow },
  foodCard:    { backgroundColor:'#fff', borderRadius:R.xl, padding:SP.md, marginBottom:SP.sm, ...shadow },
  rating:      { fontSize:12, fontWeight:W.bold, color:C.warning },
  pill:        { backgroundColor:'#F5F5F5', borderRadius:R.full, paddingHorizontal:8, paddingVertical:3 },
  pillTxt:     { fontSize:11, color:C.sub, fontWeight:W.medium },

  tipBox:      { backgroundColor:'#FFFBEB', borderRadius:R.xl, padding:SP.md, marginTop:SP.sm },
  tipBoxTxt:   { fontSize:13, color:'#92400E', lineHeight:19 },

  cityTab:     { paddingHorizontal:SP.md, paddingVertical:6, borderRadius:R.full, backgroundColor:'#F5F5F5' },
  cityTabOn:   { backgroundColor:C.primaryLt },
  cityTabTxt:  { fontSize:13, fontWeight:W.medium, color:C.sub },
  vegBtn:      { paddingHorizontal:SP.sm, paddingVertical:6, borderRadius:R.full, backgroundColor:'#F5F5F5' },
  vegBtnOn:    { backgroundColor:C.primaryLt },
  vegBtnTxt:   { fontSize:12, fontWeight:W.medium, color:C.sub },

  budgetControls:{ flexDirection:'row', gap:SP.md, marginBottom:SP.md },
  counterWrap: { flex:1, alignItems:'center' },
  counterLabel:{ fontSize:12, fontWeight:W.medium, color:C.sub, marginBottom:SP.xs },
  counter:     { flexDirection:'row', alignItems:'center', gap:SP.sm },
  cBtn:        { width:32, height:32, borderRadius:16, backgroundColor:C.primaryLt, alignItems:'center', justifyContent:'center' },
  cBtnTxt:     { fontSize:18, color:C.primary, fontWeight:W.bold },
  cVal:        { fontSize:18, fontWeight:W.bold, color:C.label, minWidth:30, textAlign:'center' },

  stylePicker: { flexDirection:'row', gap:SP.sm, marginBottom:SP.md },
  styleBtn:    { flex:1, paddingVertical:SP.sm, borderRadius:R.lg, backgroundColor:'#F5F5F5', alignItems:'center' },
  styleBtnOn:  { backgroundColor:C.primaryLt },
  styleBtnTxt: { fontSize:12, fontWeight:W.semibold, color:C.sub },

  budgetTotal: { borderRadius:R.xxl, padding:SP.xl, marginBottom:SP.md, ...shadowMd },

  visaBanner:  { flexDirection:'row', backgroundColor:C.primaryLt, borderRadius:R.xl, padding:SP.lg, marginBottom:SP.md, alignItems:'center', borderWidth:2, borderColor:C.primary },
  visaTitle:   { fontSize:17, fontWeight:W.bold, color:C.primaryDk },
  visaSub:     { fontSize:12, color:C.primary, marginTop:2 },
  mdacCard:    { backgroundColor:'#FFF0EF', borderRadius:R.xl, padding:SP.lg, marginBottom:SP.md, borderWidth:1.5, borderColor:C.danger },
  mdacTitle:   { fontSize:15, fontWeight:W.bold, color:C.danger, marginBottom:4 },
  mdacSub:     { fontSize:13, color:C.sub, lineHeight:19, marginBottom:SP.md },
  mdacBtn:     { flexDirection:'row', alignItems:'center', justifyContent:'center', gap:6, backgroundColor:C.danger, borderRadius:R.full, paddingVertical:10 },
  mdacBtnTxt:  { fontSize:14, fontWeight:W.bold, color:'#fff' },

  verdictCard: { backgroundColor:C.primaryLt, borderRadius:R.xl, padding:SP.lg, marginBottom:SP.md, borderWidth:1.5, borderColor:C.primary },
  verdictTitle:{ fontSize:15, fontWeight:W.bold, color:C.primaryDk, marginBottom:4 },
  verdictSub:  { fontSize:13, color:C.sub },
  bestBadge:   { backgroundColor:C.primary, borderRadius:R.full, paddingHorizontal:8, paddingVertical:2 },
  bestTxt:     { fontSize:10, fontWeight:W.bold, color:'#fff' },

  cultureSection:{ backgroundColor:'#fff', borderRadius:R.xl, marginBottom:SP.sm, overflow:'hidden', ...shadow },
  dot:           { width:6, height:6, borderRadius:3 },

  trapCard:     { backgroundColor:'#fff', borderRadius:R.xl, padding:SP.md, marginBottom:SP.sm, ...shadow },
  trapSolution: { marginTop:SP.sm, paddingTop:SP.sm, borderTopWidth:1, borderTopColor:'#EEE' },
  trapSolTxt:   { fontSize:13, color:C.primary, lineHeight:19 },
})
