import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native'
import { C, s, SP, R, W } from '../../src/theme/index'

const PLANS = [
  { provider:'Maxis',  plan:'Maxis Postpaid 80', price:'RM 80/mo', data:'40GB', calls:'Unlimited', emoji:'📱', color:C.danger, best:'Best network' },
  { provider:'Celcom', plan:'Celcom Basic 60',   price:'RM 60/mo', data:'25GB', calls:'Unlimited', emoji:'📲', color:C.info,   best:'Budget pick' },
  { provider:'Digi',   plan:'Digi Postpaid 65',  price:'RM 65/mo', data:'30GB', calls:'Unlimited', emoji:'📳', color:C.warning,best:'Good value'  },
  { provider:'U Mobile',plan:'U Postpaid 45',    price:'RM 45/mo', data:'20GB', calls:'300 min',   emoji:'📶', color:C.purple, best:'Cheapest'   },
]

export default function SimCardScreen() {
  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom:40 }}>
      <View style={ls.banner}>
        <Text style={ls.title}>📱 SIM Card Guide</Text>
        <Text style={ls.sub}>Best postpaid plans for Indians in Malaysia</Text>
      </View>

      <View style={ls.tip}>
        <Text style={ls.tipTxt}>💡 For EP holders, postpaid is better than prepaid — easier for bank & government registrations</Text>
      </View>

      <Text style={s.sectionHdr}>Postpaid Plans Comparison</Text>
      {PLANS.map(p => (
        <View key={p.provider} style={[ls.planCard, { borderLeftColor:p.color }]}>
          <View style={{ flexDirection:'row', justifyContent:'space-between', marginBottom:8 }}>
            <View>
              <View style={{ flexDirection:'row', gap:8, alignItems:'center' }}>
                <Text style={[s.title, { fontSize:16 }]}>{p.provider}</Text>
                <View style={[ls.tag, { backgroundColor:p.color+'18' }]}>
                  <Text style={[ls.tagTxt, { color:p.color }]}>{p.best}</Text>
                </View>
              </View>
              <Text style={s.small}>{p.plan}</Text>
            </View>
            <Text style={[ls.price, { color:p.color }]}>{p.price}</Text>
          </View>
          <View style={{ flexDirection:'row', gap:SP.sm }}>
            {[['📶',p.data,'Data'],['📞',p.calls,'Calls']].map(([e,v,l]) => (
              <View key={l} style={[ls.stat, { backgroundColor:p.color+'10' }]}>
                <Text style={{ fontSize:14 }}>{e}</Text>
                <Text style={[ls.statVal, { color:p.color }]}>{v}</Text>
                <Text style={ls.statLbl}>{l}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}

      <Text style={s.sectionHdr}>Where to Buy</Text>
      <View style={[s.card, { paddingVertical:0 }]}>
        {[
          { place:'KLIA / Airport',     note:'Available on arrival — slightly pricier', emoji:'✈️' },
          { place:'Maxis/Digi stores',  note:'Best deals & plans, ID required',         emoji:'🏪' },
          { place:'7-Eleven / Guardian',note:'Prepaid SIMs only',                        emoji:'🏬' },
          { place:'Lazada / Shopee',    note:'Buy online, pickup in store',              emoji:'📦' },
        ].map((w, i, arr) => (
          <View key={w.place} style={i < arr.length-1 ? s.row : s.rowLast}>
            <Text style={{ fontSize:20, width:30 }}>{w.emoji}</Text>
            <View style={{ flex:1, marginLeft:10 }}>
              <Text style={s.title}>{w.place}</Text>
              <Text style={s.small}>{w.note}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={s.sectionHdr}>What to Bring</Text>
      <View style={s.card}>
        {['Passport','EP / work permit','Proof of address (optional for most)','RM 100–200 for first month + deposit'].map((d,i,arr) => (
          <View key={i} style={[s.row, i===arr.length-1 && {borderBottomWidth:0}]}>
            <Text style={{ color:C.primary, marginRight:8, fontSize:16 }}>✓</Text>
            <Text style={[s.body, { flex:1 }]}>{d}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}
const ls = StyleSheet.create({
  banner:  { backgroundColor:C.primary, paddingHorizontal:SP.lg, paddingVertical:SP.xl },
  title:   { fontSize:22, fontWeight:W.bold, color:'#fff', marginBottom:4 },
  sub:     { fontSize:14, color:'rgba(255,255,255,0.8)' },
  tip:     { marginHorizontal:SP.lg, marginTop:SP.lg, backgroundColor:'#FFFBEB', borderRadius:R.xl, padding:SP.md },
  tipTxt:  { fontSize:13, color:'#92400E', lineHeight:19 },
  planCard:{ marginHorizontal:SP.lg, marginBottom:SP.sm, backgroundColor:'#fff', borderRadius:R.xl,
             padding:SP.lg, borderLeftWidth:4, elevation:2, shadowColor:'#000', shadowOpacity:0.06, shadowRadius:4 },
  price:   { fontSize:18, fontWeight:W.bold },
  tag:     { borderRadius:R.full, paddingHorizontal:8, paddingVertical:2 },
  tagTxt:  { fontSize:10, fontWeight:W.bold },
  stat:    { flex:1, borderRadius:R.lg, padding:SP.sm, alignItems:'center', gap:2 },
  statVal: { fontSize:13, fontWeight:W.bold },
  statLbl: { fontSize:10, color:C.muted },
})
