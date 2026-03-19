import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { C, s, SP, R, W, shadow, shadowMd, shadowLg } from '../../src/theme/index'
import { useLiveRate } from '../../shared/useLiveRate'
import { useWeather } from '../../shared/useWeather'
import { getUpcomingEvents, getDaysUntil } from '../../shared/eventsData'
import { getTodayTip } from '../../shared/dailyTips'

const CALC_TILES = [
  { emoji:'📊', label:'PCB Tax',    color:C.primary,  bg:'#E6F7EE', route:'/calculator/pcb'      },
  { emoji:'🏦', label:'EPF',        color:C.info,     bg:'#EBF5FF', route:'/calculator/epf'      },
  { emoji:'💸', label:'Remit',      color:C.purple,   bg:'#F0EDFF', route:'/calculator/remit'    },
  { emoji:'🚗', label:'Car Loan',   color:C.orange,   bg:'#FFF4EE', route:'/calculator/carloan'  },
  { emoji:'🏠', label:'Home Loan',  color:C.teal,     bg:'#E6F9F8', route:'/calculator/homeloan' },
  { emoji:'🧾', label:'Expense',    color:C.danger,   bg:'#FFF0EF', route:'/calculator/expense'  },
  { emoji:'🎯', label:'Budget',     color:C.primary,  bg:'#E6F7EE', route:'/calculator/budget'   },
  { emoji:'💰', label:'Tax Refund', color:'#D97706',  bg:'#FFFBEB', route:'/calculator/taxrefund'},
  { emoji:'📈', label:'Living Cost',color:C.teal,     bg:'#E6F9F8', route:'/calculator/livingcost'},
  { emoji:'💼', label:'Salary',     color:C.info,     bg:'#EBF5FF', route:'/calculator/salary'   },
  { emoji:'🏢', label:'Rent',       color:'#D97706',  bg:'#FFFBEB', route:'/calculator/rentcalc' },
]

const ALERTS = [
  { color:C.success, bg:'#E6F7EE', icon:'checkmark-circle', title:'Indians VISA-FREE 2026', sub:'Until Dec 31 • MDAC required', route:'/guide/tourist' },
  { color:C.warning, bg:'#FFF4E5', icon:'warning',           title:'EP Salary Jun 2026',     sub:'New minimums June 1, 2026',    route:'/guide/ep'      },
  { color:C.info,    bg:'#EBF5FF', icon:'airplane',          title:'Baggage Guide',           sub:'Grinder, TV, power bank rules', route:'/guide/flights' },
]

const EP_TABLE = [
  { cat:'Cat I',   sal:'RM 20,000+', c:C.purple  },
  { cat:'Cat II',  sal:'RM 10,000+', c:C.info    },
  { cat:'Cat III', sal:'RM 5,000+',  c:C.primary },
  { cat:'Mfg III', sal:'RM 7,000+',  c:C.orange  },
]

export default function HomeScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { rate, loading: rateLoading } = useLiveRate()
  const { weather } = useWeather()
  const nextEvent = getUpcomingEvents(14)[0]
  const tip = getTodayTip()

  return (
    <ScrollView
      style={s.screen}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 32 + insets.bottom }}
    >
      {/* ── Green header ── */}
      <View style={[ls.header, { paddingTop: SP.lg }]}>
        <View style={ls.headerTop}>
          <View style={{ flex: 1 }}>
            <Text style={ls.greeting}>Good day! 👋</Text>
            <Text style={ls.brandName}>NikiBhavi</Text>
            <Text style={ls.tagline}>Malaysia Guide for Indians 🇮🇳🇲🇾</Text>
          </View>
          <View style={{ flexDirection:'row', gap:8 }}>
            <TouchableOpacity style={ls.iconBtn} onPress={() => router.push('/(tabs)/chat')}>
              <Text style={{ fontSize:20 }}>🤖</Text>
            </TouchableOpacity>
            <TouchableOpacity style={ls.iconBtn} onPress={() => router.push('/more')}>
              <Ionicons name="menu-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        {/* Search bar */}
        <TouchableOpacity style={ls.searchBar} onPress={() => router.push('/(tabs)/chat')} activeOpacity={0.85}>
          <Ionicons name="search" size={16} color={C.muted} />
          <Text style={ls.searchText}>Ask NikiBot about Malaysia...</Text>
        </TouchableOpacity>
      </View>

      {/* ── Live Rate Strip ── */}
      <TouchableOpacity style={ls.rateStrip} onPress={() => router.push('/(tabs)/dashboard')} activeOpacity={0.85}>
        <View style={{ flex:1 }}>
          <Text style={ls.rateStripLabel}>Live MYR → INR</Text>
          <Text style={ls.rateStripVal}>{rateLoading ? 'Loading...' : `₹${rate.toFixed(2)} per RM 1`}</Text>
        </View>
        <View style={ls.rateStripRight}>
          <Text style={ls.rateStripRM}>RM 1,000 = ₹{Math.round(1000 * rate).toLocaleString()}</Text>
          <Text style={[ls.rateStripLabel,{opacity:0.7}]}>Tap for full dashboard →</Text>
        </View>
      </TouchableOpacity>

      {/* ── Weather + Next Event ── */}
      <View style={ls.weatherRow}>
        {/* Weather card */}
        {weather && (
          <View style={[ls.weatherCard, { flex:1 }]}>
            <View style={{ flexDirection:'row', alignItems:'center', gap:SP.xs }}>
              <Text style={{ fontSize:28 }}>{weather.emoji}</Text>
              <View>
                <Text style={ls.weatherTemp}>{weather.temp}°C</Text>
                <Text style={ls.weatherCond}>{weather.condition}</Text>
              </View>
            </View>
            <View style={[ls.umbrellaBadge, { backgroundColor: weather.umbrella ? '#FFF0EF' : '#E6F7EE' }]}>
              <Text style={[ls.umbrellaTxt, { color: weather.umbrella ? C.danger : C.primary }]}>
                {weather.umbrella ? '☔ Bring umbrella!' : '☀️ No umbrella needed'}
              </Text>
            </View>
            <Text style={ls.weatherFeel}>{weather.feel} · 💧{weather.humidity}%</Text>
            {weather.maxRainProb > 0 && (
              <Text style={ls.weatherRain}>🌧 Rain chance: {weather.maxRainProb}%</Text>
            )}
          </View>
        )}

        {/* Next event card */}
        {nextEvent && (
          <TouchableOpacity style={[ls.nextEventCard, { flex:1 }]}
            onPress={() => router.push('/(tabs)/calendar')} activeOpacity={0.8}>
            <Text style={ls.nextEventLabel}>Next Event</Text>
            <Text style={{ fontSize:28, marginVertical:2 }}>{nextEvent.emoji}</Text>
            <Text style={ls.nextEventName} numberOfLines={2}>{nextEvent.name}</Text>
            <View style={ls.nextEventDays}>
              <Text style={ls.nextEventDaysTxt}>{getDaysUntil(nextEvent.date)}d away</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      {/* ── Today's Tip ── */}
      <TouchableOpacity style={ls.tipStrip} onPress={() => router.push('/(tabs)/dashboard')} activeOpacity={0.85}>
        <Text style={{fontSize:20}}>{tip.emoji}</Text>
        <View style={{flex:1, marginLeft:SP.sm}}>
          <Text style={ls.tipStripCat}>💡 {tip.cat} Tip</Text>
          <Text style={ls.tipStripTxt} numberOfLines={2}>{tip.tip}</Text>
        </View>
        <Ionicons name="chevron-forward" size={14} color={C.muted} />
      </TouchableOpacity>

      {/* ── Alerts ── */}
      <Text style={s.sectionHdr}>Latest Updates</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal:SP.lg, paddingBottom:4, gap:SP.md }}>
        {ALERTS.map((a, i) => (
          <TouchableOpacity key={i} style={[ls.alertCard, { backgroundColor:a.bg }]}
            onPress={() => router.push(a.route)} activeOpacity={0.8}>
            <View style={[ls.alertIconWrap, { backgroundColor:a.color + '22' }]}>
              <Ionicons name={a.icon} size={18} color={a.color} />
            </View>
            <Text style={[ls.alertTitle, { color:a.color }]} numberOfLines={2}>{a.title}</Text>
            <Text style={ls.alertSub} numberOfLines={2}>{a.sub}</Text>
            <View style={[ls.alertArrow, { backgroundColor:a.color }]}>
              <Ionicons name="arrow-forward" size={11} color="#fff" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ── Quick Calc Grid ── */}
      <Text style={s.sectionHdr}>Quick Calculators</Text>
      <View style={ls.grid}>
        {CALC_TILES.map(t => (
          <TouchableOpacity key={t.route} style={[ls.tile, { backgroundColor:t.bg }]}
            onPress={() => router.push(t.route)} activeOpacity={0.75}>
            <View style={[ls.tileIconWrap, { backgroundColor:t.color + '22' }]}>
              <Text style={{ fontSize:24 }}>{t.emoji}</Text>
            </View>
            <Text style={[ls.tileLabel, { color:t.color }]} numberOfLines={2}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── EP 2026 ── */}
      <Text style={s.sectionHdr}>EP Salary 2026</Text>
      <View style={[s.card, { marginBottom:SP.md }]}>
        <View style={ls.epBanner}>
          <Ionicons name="warning" size={14} color={C.primaryDk} />
          <Text style={ls.epBannerTxt}>  Effective June 1, 2026 — New Minimums</Text>
        </View>
        <View style={ls.epGrid}>
          {EP_TABLE.map(ep => (
            <View key={ep.cat} style={[ls.epCell, { borderLeftColor:ep.c }]}>
              <Text style={[ls.epCat, { color:C.sub }]}>{ep.cat}</Text>
              <Text style={[ls.epSal, { color:ep.c }]}>{ep.sal}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity style={ls.epLink} onPress={() => router.push('/guide/ep')} activeOpacity={0.7}>
          <Text style={ls.epLinkTxt}>Full EP 2026 Guide</Text>
          <Ionicons name="arrow-forward" size={14} color={C.primary} />
        </TouchableOpacity>
      </View>

      {/* ── Community ── */}
      <Text style={s.sectionHdr}>Follow NikiBhavi</Text>
      <View style={s.card}>
        {[
          { emoji:'▶️', l:'YouTube',          sub:'@NikiBhavi — video guides',   url:'https://youtube.com/@NikiBhavi',                           color:'#FF0000' },
          { emoji:'📷', l:'Instagram',        sub:'@nikibhavi — tips & updates',  url:'https://instagram.com/nikibhavi',                          color:'#E1306C' },
          { emoji:'💬', l:'WhatsApp Channel', sub:'10,000+ Indians in Malaysia', url:'https://whatsapp.com/channel/0029VaAyhBS6rsQuujk5G53h',    color:'#25D366' },
          { emoji:'☕', l:'Buy Me a Coffee',  sub:'Support this free guide',     url:'https://buymeacoffee.com/jssuthahar',                       color:'#FF813F' },
        ].map((sc, i, arr) => (
          <TouchableOpacity key={i}
            style={i < arr.length - 1 ? s.row : s.rowLast}
            onPress={() => Linking.openURL(sc.url)} activeOpacity={0.6}>
            <View style={[ls.socialBubble, { backgroundColor:sc.color + '18' }]}>
              <Text style={{ fontSize:18 }}>{sc.emoji}</Text>
            </View>
            <View style={{ flex:1, marginLeft:12 }}>
              <Text style={s.title}>{sc.l}</Text>
              <Text style={s.small}>{sc.sub}</Text>
            </View>
            <Ionicons name="open-outline" size={14} color={C.muted} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

const ls = StyleSheet.create({
  header:      { backgroundColor:C.primary, paddingHorizontal:SP.lg, paddingBottom:SP.xxl },
  headerTop:   { flexDirection:'row', alignItems:'flex-start', justifyContent:'space-between', marginBottom:SP.lg },
  greeting:    { fontSize:12, color:'rgba(255,255,255,0.75)', marginBottom:2 },
  brandName:   { fontSize:28, fontWeight:W.heavy, color:'#fff', letterSpacing:-0.5 },
  tagline:     { fontSize:12, color:'rgba(255,255,255,0.75)', marginTop:2 },
  iconBtn:     { width:42, height:42, borderRadius:21, backgroundColor:'rgba(255,255,255,0.2)',
                 alignItems:'center', justifyContent:'center' },

  searchBar:   { backgroundColor:'#fff', borderRadius:R.full, flexDirection:'row', alignItems:'center',
                 paddingHorizontal:SP.md, paddingVertical:11, gap:8, ...shadowMd },
  searchText:  { fontSize:14, color:C.muted, flex:1 },

  alertCard:   { width:155, borderRadius:R.xl, padding:SP.md, ...shadow, position:'relative', minHeight:110 },
  alertIconWrap:{ width:34, height:34, borderRadius:R.lg, alignItems:'center', justifyContent:'center', marginBottom:6 },
  alertTitle:  { fontSize:12, fontWeight:W.bold, marginBottom:3, lineHeight:17 },
  alertSub:    { fontSize:11, color:C.sub, lineHeight:15 },
  alertArrow:  { position:'absolute', bottom:10, right:10, width:22, height:22, borderRadius:11,
                 alignItems:'center', justifyContent:'center' },

  // Grid — 2 cols with good spacing
  grid:        { flexDirection:'row', flexWrap:'wrap', paddingHorizontal:SP.lg, gap:SP.sm, marginBottom:4 },
  tile:        { width:'30%', flex:0, borderRadius:R.xl, padding:SP.md, alignItems:'center', ...shadow },
  tileIconWrap:{ width:48, height:48, borderRadius:R.lg, alignItems:'center', justifyContent:'center', marginBottom:8 },
  tileLabel:   { fontSize:12, fontWeight:W.semibold, textAlign:'center', lineHeight:16 },

  // EP
  epBanner:    { flexDirection:'row', alignItems:'center', backgroundColor:C.primaryLt,
                 paddingHorizontal:SP.lg, paddingVertical:SP.sm,
                 borderTopLeftRadius:R.xl, borderTopRightRadius:R.xl },
  epBannerTxt: { fontSize:12, fontWeight:W.semibold, color:C.primaryDk, flex:1 },
  epGrid:      { flexDirection:'row', flexWrap:'wrap', paddingHorizontal:SP.md, paddingVertical:SP.sm, gap:SP.sm },
  epCell:      { width:'47%', borderLeftWidth:3, paddingLeft:SP.sm, paddingVertical:SP.xs },
  epCat:       { fontSize:11, fontWeight:W.medium, marginBottom:2 },
  epSal:       { fontSize:14, fontWeight:W.bold },
  epLink:      { flexDirection:'row', alignItems:'center', justifyContent:'center',
                 paddingVertical:SP.md, gap:6, borderTopWidth:1, borderTopColor:C.sep },
  epLinkTxt:   { fontSize:14, color:C.primary, fontWeight:W.semibold },

  socialBubble:{ width:42, height:42, borderRadius:R.lg, alignItems:'center', justifyContent:'center' },

  // Live rate strip
  rateStrip:      { marginHorizontal:SP.lg, marginTop:SP.lg, marginBottom:4, backgroundColor:'#1a1a2e',
                    borderRadius:R.xl, padding:SP.md, flexDirection:'row', alignItems:'center', ...shadowMd },
  rateStripLabel: { fontSize:10, color:'rgba(255,255,255,0.5)', fontWeight:W.semibold, textTransform:'uppercase', letterSpacing:0.5 },
  rateStripVal:   { fontSize:18, fontWeight:W.bold, color:'#C9F53B', marginTop:2 },
  rateStripRight: { alignItems:'flex-end' },
  rateStripRM:    { fontSize:13, fontWeight:W.bold, color:'#fff' },

  // Weather + event row
  weatherRow:       { flexDirection:'row', paddingHorizontal:SP.lg, gap:SP.sm, marginBottom:4 },
  weatherCard:      { backgroundColor:'#fff', borderRadius:R.xl, padding:SP.md, ...shadow },
  weatherTemp:      { fontSize:22, fontWeight:W.heavy, color:C.label },
  weatherCond:      { fontSize:11, color:C.muted, fontWeight:W.medium },
  umbrellaBadge:    { borderRadius:R.full, paddingHorizontal:8, paddingVertical:4, marginTop:SP.sm, alignSelf:'flex-start' },
  umbrellaTxt:      { fontSize:11, fontWeight:W.bold },
  weatherFeel:      { fontSize:10, color:C.muted, marginTop:4 },
  weatherRain:      { fontSize:10, color:C.info, marginTop:2 },
  nextEventCard:    { backgroundColor:'#fff', borderRadius:R.xl, padding:SP.md, alignItems:'center', ...shadow },
  nextEventLabel:   { fontSize:10, color:C.muted, fontWeight:W.bold, textTransform:'uppercase', letterSpacing:0.5 },
  nextEventName:    { fontSize:12, fontWeight:W.bold, color:C.label, textAlign:'center', marginTop:2 },
  nextEventDays:    { backgroundColor:C.primaryLt, borderRadius:R.full, paddingHorizontal:10, paddingVertical:3, marginTop:SP.xs },
  nextEventDaysTxt: { fontSize:11, fontWeight:W.bold, color:C.primaryDk },

  // Tip strip
  tipStrip:       { marginHorizontal:SP.lg, marginBottom:4, backgroundColor:'#fff', borderRadius:R.xl,
                    padding:SP.md, flexDirection:'row', alignItems:'center', gap:SP.sm,
                    borderLeftWidth:3, borderLeftColor:C.primary, ...shadow },
  tipStripCat:    { fontSize:11, fontWeight:W.bold, color:C.primary, marginBottom:2 },
  tipStripTxt:    { fontSize:13, color:C.sub, lineHeight:18 },
})

