import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { C, s, SP, R, W, shadow } from '../../src/theme/index'

const TABS = ['Baggage Rules', 'Airlines', 'Airport Tips']

const BAGGAGE_RULES = [
  { item:'Grinder / Wet Grinder', status:'✅ Allowed', detail:'CHECKED bag only. Remove blade, wrap well. Declare at check-in.', ok:true },
  { item:'Mixer / Juicer',        status:'✅ Allowed', detail:'CHECKED bag only. Remove blade separately before packing.', ok:true },
  { item:'Laptop',                status:'✅ 2 allowed', detail:'Both in CABIN bag. Keep in carry-on for security screening.', ok:true },
  { item:'Power Bank (<100Wh)',    status:'✅ Cabin only', detail:'Must be in CABIN. Not allowed in checked luggage.', ok:true },
  { item:'Power Bank (100–160Wh)',  status:'⚠️ Max 2',  detail:'Declare to airline. Max 2 per person. CABIN only.', ok:true },
  { item:'Power Bank (>160Wh)',    status:'❌ Not allowed', detail:'Not permitted on any commercial flight.', ok:false },
  { item:'TV (small, <32")',       status:'⚠️ Checked', detail:'Wrap very well. Better to use sea freight for large TVs.', ok:true },
  { item:'Rice Cooker',           status:'✅ Allowed', detail:'CHECKED bag. Remove water, drain completely.', ok:true },
  { item:'Pressure Cooker',       status:'⚠️ Checked', detail:'No pressure. Remove gasket/rubber ring before packing.', ok:true },
]

const AIRLINES = [
  { name:'AirAsia',           cabin:'7 kg',  checked:'20 kg (add-on)', terminal:'KLIA2', note:'Most affordable, book baggage early' },
  { name:'Malaysia Airlines', cabin:'7 kg',  checked:'30 kg',          terminal:'KLIA',  note:'Better service, direct Chennai/Blr' },
  { name:'IndiGo',            cabin:'7 kg',  checked:'15 kg',          terminal:'KLIA2', note:'Budget, strict baggage weight' },
  { name:'Air India',         cabin:'8 kg',  checked:'25 kg',          terminal:'KLIA',  note:'Higher baggage allowance' },
  { name:'Singapore Airlines',cabin:'7 kg',  checked:'30 kg',          terminal:'KLIA',  note:'Via Singapore, premium service' },
]

const AIRPORT_TIPS = [
  { title:'Which terminal?',    desc:'KLIA (main) = Malaysia Airlines, Emirates, Qatar. KLIA2 = ALL AirAsia, IndiGo, Batik Air.' },
  { title:'When to arrive',     desc:'International: arrive 2.5–3 hours early. AirAsia: check-in closes 60 min before.' },
  { title:'ERL Express Train',  desc:'From KL Sentral to KLIA: 28 min (RM 55). To KLIA2: 33 min (RM 55). Best option.' },
  { title:'Grab to airport',    desc:'Book Grab to KLIA: RM 60–90 from city centre. Book 30 min before departure.' },
  { title:'KLIA Arrival',       desc:'Immigration can take 30–90 min. Have MDAC ready. Proceed to Grab pickup at Level 1.' },
]

export default function FlightsScreen() {
  const [tab, setTab] = useState(0)

  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false}>
      <View style={ls.banner}>
        <Text style={ls.bannerTitle}>✈️ Flight Hub & Baggage</Text>
        <Text style={ls.bannerSub}>KL ↔ India — everything you need to know</Text>
      </View>

      {/* Tabs */}
      <View style={ls.tabs}>
        {TABS.map((t, i) => (
          <TouchableOpacity key={t} style={[ls.tab, tab===i && ls.tabActive]} onPress={() => setTab(i)}>
            <Text style={[ls.tabText, tab===i && ls.tabTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Baggage Rules */}
      {tab === 0 && (
        <>
          <Text style={s.sectionHdr}>What Can You Carry?</Text>
          {BAGGAGE_RULES.map((r, i) => (
            <View key={r.item} style={[ls.ruleCard, !r.ok && { backgroundColor:'#FFF5F5' }]}>
              <View style={[s.between, { marginBottom:6 }]}>
                <Text style={s.title}>{r.item}</Text>
                <Text style={[ls.statusBadge, { color: r.ok ? C.primary : C.danger }]}>{r.status}</Text>
              </View>
              <Text style={s.body}>{r.detail}</Text>
            </View>
          ))}
        </>
      )}

      {/* Airlines */}
      {tab === 1 && (
        <>
          <Text style={s.sectionHdr}>Baggage Allowances</Text>
          {AIRLINES.map((a) => (
            <View key={a.name} style={ls.airlineCard}>
              <Text style={[s.title, { color:C.primary, marginBottom:SP.sm }]}>{a.name}</Text>
              <View style={ls.airlineGrid}>
                {[['Cabin Bag', a.cabin], ['Checked', a.checked], ['Terminal', a.terminal]].map(([l,v]) => (
                  <View key={l} style={ls.airlineItem}>
                    <Text style={s.tiny}>{l}</Text>
                    <Text style={[s.body, { fontWeight:W.semibold }]}>{v}</Text>
                  </View>
                ))}
              </View>
              <Text style={[s.small, { marginTop:6, color:C.muted }]}>💡 {a.note}</Text>
            </View>
          ))}
        </>
      )}

      {/* Airport Tips */}
      {tab === 2 && (
        <>
          <Text style={s.sectionHdr}>KLIA Guide</Text>
          <View style={s.card}>
            {AIRPORT_TIPS.map((tip, i) => (
              <View key={tip.title} style={i < AIRPORT_TIPS.length-1 ? [s.row, { alignItems:'flex-start', paddingVertical:SP.md }] : [s.rowLast, { alignItems:'flex-start', paddingVertical:SP.md }]}>
                <Ionicons name="information-circle" size={18} color={C.primary} style={{ marginTop:2 }} />
                <View style={{ flex:1, marginLeft:12 }}>
                  <Text style={[s.title, { marginBottom:4 }]}>{tip.title}</Text>
                  <Text style={s.body}>{tip.desc}</Text>
                </View>
              </View>
            ))}
          </View>

          <TouchableOpacity style={[s.btnSecondary, { marginTop:SP.sm }]}
            onPress={() => Linking.openURL('https://www.klia.com.my')} activeOpacity={0.8}>
            <Text style={s.btnTextSec}>KLIA Official Website →</Text>
          </TouchableOpacity>
        </>
      )}

      <View style={{ height:40 }} />
    </ScrollView>
  )
}

const ls = StyleSheet.create({
  banner:       { backgroundColor:C.primary, paddingHorizontal:SP.lg, paddingVertical:SP.xl },
  bannerTitle:  { fontSize:22, fontWeight:W.bold, color:'#fff', marginBottom:4 },
  bannerSub:    { fontSize:14, color:'rgba(255,255,255,0.8)' },
  tabs:         { flexDirection:'row', marginHorizontal:SP.lg, marginTop:SP.lg, marginBottom:SP.sm,
                  backgroundColor:'#fff', borderRadius:R.xl, padding:4, ...shadow },
  tab:          { flex:1, paddingVertical:8, alignItems:'center', borderRadius:R.lg },
  tabActive:    { backgroundColor:C.primary },
  tabText:      { fontSize:12, fontWeight:W.semibold, color:C.muted },
  tabTextActive:{ color:'#fff' },
  ruleCard:     { marginHorizontal:SP.lg, marginBottom:SP.sm, backgroundColor:'#fff', borderRadius:R.xl, padding:SP.lg, ...shadow },
  statusBadge:  { fontSize:13, fontWeight:W.bold },
  airlineCard:  { marginHorizontal:SP.lg, marginBottom:SP.sm, backgroundColor:'#fff', borderRadius:R.xl, padding:SP.lg, ...shadow },
  airlineGrid:  { flexDirection:'row', gap:SP.md },
  airlineItem:  { flex:1 },
})
