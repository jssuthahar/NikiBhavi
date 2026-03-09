import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Linking, Image } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { C, s, SP, R, W, shadow, shadowMd, SCREEN_W } from '../../src/theme/index'

// ── Quick calculator tiles ────────────────────────────────
const CALC_TILES = [
  { emoji:'📊', label:'PCB Tax',      color:C.primary, bg:'#E6F7EE', route:'/calculator/pcb'     },
  { emoji:'🏦', label:'EPF',          color:C.info,    bg:'#EBF5FF', route:'/calculator/epf'     },
  { emoji:'💸', label:'Remittance',   color:C.purple,  bg:'#F0EDFF', route:'/calculator/remit'   },
  { emoji:'🚗', label:'Car Loan',     color:C.orange,  bg:'#FFF4EE', route:'/calculator/carloan' },
  { emoji:'🏠', label:'Home Loan',    color:C.teal,    bg:'#E6F9F8', route:'/calculator/homeloan'},
  { emoji:'🧾', label:'Expenses',     color:C.danger,  bg:'#FFF0EF', route:'/calculator/expense' },
  { emoji:'🎯', label:'Budget',       color:C.primary, bg:'#E6F7EE', route:'/calculator/budget'  },
  { emoji:'💰', label:'Tax Refund',   color:'#D97706', bg:'#FFFBEB', route:'/calculator/taxrefund'},
]

// ── News / alerts ─────────────────────────────────────────
const ALERTS = [
  { color:C.success, bg:'#E6F7EE', icon:'checkmark-circle', title:'Indians VISA-FREE 2026', sub:'Until Dec 31, 2026 • MDAC required', route:'/guide/tourist' },
  { color:C.warning, bg:'#FFF4E5', icon:'warning',          title:'EP Salary Change Jun 2026', sub:'New minimums effective June 1', route:'/guide/ep' },
  { color:C.info,    bg:'#EBF5FF', icon:'airplane',         title:'Flight Baggage Guide', sub:'Grinder, TV, power bank rules', route:'/guide/flights' },
]

// ── EP quick table ────────────────────────────────────────
const EP_TABLE = [
  { cat:'Category I',    sal:'RM 20,000+', c:C.purple  },
  { cat:'Category II',   sal:'RM 10,000+', c:C.info    },
  { cat:'Category III',  sal:'RM 5,000+',  c:C.primary },
  { cat:'Manufacturing', sal:'RM 7,000+',  c:C.orange  },
]

export default function HomeScreen() {
  const router = useRouter()

  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false}>

      {/* ── Grab-style green header ── */}
      <View style={ls.header}>
        <View style={ls.headerTop}>
          <View>
            <Text style={ls.greeting}>Good day! 👋</Text>
            <Text style={ls.brandName}>NikiBhavi</Text>
            <Text style={ls.tagline}>Malaysia Guide for Indians 🇮🇳🇲🇾</Text>
          </View>
          <View style={{ flexDirection:'row', gap:8 }}>
            <TouchableOpacity style={ls.avatarBtn} onPress={() => router.push('/(tabs)/chat')}>
              <Text style={{ fontSize:22 }}>🤖</Text>
            </TouchableOpacity>
            <TouchableOpacity style={ls.avatarBtn} onPress={() => router.push('/more')}>
              <Ionicons name="menu-outline" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search bar — navigates to NikiBot */}
        <TouchableOpacity style={ls.searchBar} onPress={() => router.push('/(tabs)/chat')} activeOpacity={0.85}>
          <Ionicons name="search" size={18} color={C.muted} />
          <Text style={ls.searchText}>Ask NikiBot anything about Malaysia...</Text>
        </TouchableOpacity>
      </View>

      {/* ── Alerts strip ── */}
      <Text style={s.sectionHdr}>Latest Updates</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}
        contentContainerStyle={ls.alertsRow}>
        {ALERTS.map((a, i) => (
          <TouchableOpacity key={i} style={[ls.alertCard, { backgroundColor: a.bg }]}
            onPress={() => router.push(a.route)} activeOpacity={0.8}>
            <View style={[ls.alertIcon, { backgroundColor: a.color + '22' }]}>
              <Ionicons name={a.icon} size={20} color={a.color} />
            </View>
            <Text style={[ls.alertTitle, { color: a.color }]} numberOfLines={2}>{a.title}</Text>
            <Text style={ls.alertSub} numberOfLines={2}>{a.sub}</Text>
            <View style={[ls.alertArrow, { backgroundColor: a.color }]}>
              <Ionicons name="arrow-forward" size={12} color="#fff" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ── Quick calculators grid ── */}
      <Text style={s.sectionHdr}>Quick Calculators</Text>
      <View style={ls.grid}>
        {CALC_TILES.map(t => (
          <TouchableOpacity key={t.route} style={[ls.tile, { backgroundColor:t.bg }]}
            onPress={() => router.push(t.route)} activeOpacity={0.75}>
            <View style={[ls.tileIcon, { backgroundColor: t.color + '22' }]}>
              <Text style={{ fontSize:22 }}>{t.emoji}</Text>
            </View>
            <Text style={[ls.tileLabel, { color: t.color }]}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── EP 2026 table ── */}
      <Text style={s.sectionHdr}>EP Salary 2026</Text>
      <View style={[s.card, { marginBottom:SP.md }]}>
        <View style={[ls.epHeader, { backgroundColor: C.primaryLt || '#E6F7EE' }]}>
          <Text style={{ fontSize:13, fontWeight:W.semibold, color:C.primaryDk }}>
            ⚠️ Effective June 1, 2026 — New Minimums
          </Text>
        </View>
        {EP_TABLE.map((ep, i) => (
          <View key={ep.cat} style={i < EP_TABLE.length-1 ? s.row : s.rowLast}>
            <View style={[ls.dot, { backgroundColor:ep.c }]} />
            <Text style={[s.body, { flex:1, marginLeft:10, fontWeight:W.medium }]}>{ep.cat}</Text>
            <View style={[s.pill, { backgroundColor: ep.c + '18' }]}>
              <Text style={[s.pillText, { color:ep.c }]}>{ep.sal}</Text>
            </View>
          </View>
        ))}
        <TouchableOpacity style={ls.epLink} onPress={() => router.push('/guide/ep')}>
          <Text style={ls.epLinkTxt}>Full EP Guide →</Text>
        </TouchableOpacity>
      </View>

      {/* ── Community ── */}
      <Text style={s.sectionHdr}>Follow NikiBhavi</Text>
      <View style={s.card}>
        {[
          { emoji:'▶️', l:'YouTube',        sub:'@NikiBhavi',          url:'https://youtube.com/@NikiBhavi',  color:'#FF0000' },
          { emoji:'📷', l:'Instagram',      sub:'@nikibhavi',           url:'https://instagram.com/nikibhavi', color:'#E1306C' },
          { emoji:'💬', l:'WhatsApp Channel',sub:'10,000+ Indians',    url:'https://whatsapp.com/channel/0029VaAyhBS6rsQuujk5G53h', color:'#25D366' },
          { emoji:'☕', l:'Buy Me a Coffee', sub:'Support NikiBhavi',  url:'https://buymeacoffee.com/jssuthahar', color:'#FF813F' },
        ].map((sc, i, arr) => (
          <TouchableOpacity key={i} style={i < arr.length-1 ? s.row : s.rowLast}
            onPress={() => Linking.openURL(sc.url)} activeOpacity={0.6}>
            <View style={[ls.socialIcon, { backgroundColor: sc.color + '18' }]}>
              <Text style={{ fontSize:18 }}>{sc.emoji}</Text>
            </View>
            <View style={{ flex:1, marginLeft:12 }}>
              <Text style={s.title}>{sc.l}</Text>
              <Text style={s.small}>{sc.sub}</Text>
            </View>
            <Ionicons name="open-outline" size={15} color={C.muted} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ height:40 }} />
    </ScrollView>
  )
}

const ls = StyleSheet.create({
  // Header
  header:      { backgroundColor:C.primary, paddingHorizontal:SP.lg, paddingTop:SP.xl, paddingBottom:SP.xxl },
  headerTop:   { flexDirection:'row', alignItems:'flex-start', justifyContent:'space-between', marginBottom:SP.lg },
  greeting:    { fontSize:13, color:'rgba(255,255,255,0.8)', marginBottom:2 },
  brandName:   { fontSize:26, fontWeight:W.heavy, color:'#fff', letterSpacing:-0.5 },
  tagline:     { fontSize:13, color:'rgba(255,255,255,0.8)', marginTop:2 },
  avatarBtn:   { width:44, height:44, borderRadius:22, backgroundColor:'rgba(255,255,255,0.2)',
                 alignItems:'center', justifyContent:'center' },

  // Search
  searchBar:   { backgroundColor:'#fff', borderRadius:R.full, flexDirection:'row', alignItems:'center',
                 paddingHorizontal:SP.lg, paddingVertical:12, gap:10, ...shadowMd },
  searchText:  { fontSize:14, color:C.muted, flex:1 },

  // Alerts
  alertsRow:   { paddingHorizontal:SP.lg, paddingBottom:SP.sm, gap:SP.md },
  alertCard:   { width:160, borderRadius:R.xl, padding:SP.md, position:'relative' },
  alertIcon:   { width:36, height:36, borderRadius:R.lg, alignItems:'center', justifyContent:'center', marginBottom:8 },
  alertTitle:  { fontSize:13, fontWeight:W.bold, marginBottom:4, lineHeight:18 },
  alertSub:    { fontSize:11, color:C.sub, lineHeight:16 },
  alertArrow:  { position:'absolute', bottom:10, right:10, width:22, height:22, borderRadius:11,
                 alignItems:'center', justifyContent:'center' },

  // Grid
  grid:        { flexDirection:'row', flexWrap:'wrap', paddingHorizontal:SP.md, gap:SP.sm, marginBottom:SP.sm },
  tile:        { width:'22.5%', borderRadius:R.xl, padding:SP.sm, alignItems:'center', ...shadow },
  tileIcon:    { width:44, height:44, borderRadius:R.lg, alignItems:'center', justifyContent:'center', marginBottom:6 },
  tileLabel:   { fontSize:11, fontWeight:W.semibold, textAlign:'center', lineHeight:14 },

  // EP table
  epHeader:    { paddingHorizontal:SP.lg, paddingVertical:SP.sm, borderTopLeftRadius:R.xl, borderTopRightRadius:R.xl },
  dot:         { width:9, height:9, borderRadius:5 },
  epLink:      { paddingHorizontal:SP.lg, paddingVertical:SP.md },
  epLinkTxt:   { fontSize:14, color:C.primary, fontWeight:W.semibold },

  // Social
  socialIcon:  { width:40, height:40, borderRadius:R.lg, alignItems:'center', justifyContent:'center' },
})
