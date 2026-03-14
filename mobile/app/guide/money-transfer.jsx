import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { C, s, SP, R, W, shadow } from '../../src/theme/index'

const PROVIDERS = [
  { name:'InstaReM',      speed:'~1 minute ⚡',  rate:'Best rate',  fee:'Low',   emoji:'⚡',  color:C.purple,
    code:'kQodAW', bonus:'First transfer FREE', url:'https://referral-link.onelink.me/gbf1/a43c48ca?deep_link_sub1=referral&deep_link_value=kQodAW',
    desc:'Personal pick — using for 3+ years. Credits to India within 1 minute!' },
  { name:'Wise',          speed:'1–2 business days',rate:'Mid-market',fee:'Low',  emoji:'💸',  color:'#163300',
    code:null, bonus:null, url:'https://wise.com',
    desc:'Transparent fees, mid-market rate. Best for large amounts.' },
  { name:'BigPay',        speed:'Same day',      rate:'Great rate', fee:'Low',   emoji:'💳',  color:C.primary,
    code:'OUGVGERVDT', bonus:'RM 5 FREE on activation', url:'https://bigpay.link/referrals',
    desc:'Best prepaid card + remittance combo. Great for regular transfers.' },
  { name:'Remitbee',      speed:'1–2 days',      rate:'Good rate',  fee:'Zero',  emoji:'🐝',  color:C.warning,
    code:null, bonus:'Zero fees on first transfer', url:'https://remitbee.com',
    desc:'Zero fee transfers with competitive rates.' },
  { name:'Western Union', speed:'Minutes',       rate:'Average',    fee:'High',  emoji:'🌐',  color:C.orange,
    code:null, bonus:null, url:'https://westernunion.com',
    desc:'Cash pickup option available in India. Higher fees than others.' },
  { name:'Bank TT',       speed:'2–5 days',      rate:'Poor',       fee:'Very High',emoji:'🏦',color:C.muted,
    code:null, bonus:null, url:null,
    desc:'Avoid for remittance — high fees (RM 15–50) + poor exchange rate.' },
]

const TIPS = [
  '💡 Transfer on weekdays (Mon–Fri) — better rates than weekends',
  '💡 Amounts above RM 3,000 may need source of funds documentation',
  '💡 No monthly transfer limit for EP holders',
  '💡 Keep transfer receipts for LHDN tax purposes',
  '⚠️ Current rate: 1 MYR ≈ ₹19–20 INR (check before sending)',
  '⚠️ Rates vary by time of day — morning KL time usually better',
]

export default function MoneyTransferScreen() {
  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom:40 }}>
      <View style={ls.banner}>
        <Text style={ls.title}>💸 Money Transfer Guide</Text>
        <Text style={ls.sub}>Best ways to send MYR to India</Text>
      </View>

      <Text style={s.sectionHdr}>Provider Comparison</Text>
      {PROVIDERS.map(p => (
        <TouchableOpacity key={p.name}
          style={[ls.card, p.code && {borderWidth:2, borderColor:p.color}]}
          onPress={() => p.url && Linking.openURL(p.url)}
          activeOpacity={p.url ? 0.8 : 1}>
          <View style={{flexDirection:'row', alignItems:'flex-start', gap:SP.sm}}>
            <Text style={{fontSize:24}}>{p.emoji}</Text>
            <View style={{flex:1}}>
              <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:2}}>
                <Text style={[s.title,{color:p.color}]}>{p.name}</Text>
                {p.url && <Ionicons name="open-outline" size={14} color={C.muted} />}
              </View>
              <Text style={s.small}>{p.desc}</Text>
              <View style={{flexDirection:'row', gap:SP.sm, marginTop:SP.sm, flexWrap:'wrap'}}>
                <View style={ls.metaPill}><Text style={ls.metaTxt}>⚡ {p.speed}</Text></View>
                <View style={ls.metaPill}><Text style={ls.metaTxt}>💱 {p.rate}</Text></View>
                <View style={ls.metaPill}><Text style={ls.metaTxt}>💰 {p.fee} fee</Text></View>
              </View>
              {p.code && (
                <View style={[ls.codePill, {backgroundColor:p.color, marginTop:SP.sm}]}>
                  <Text style={ls.codeLabel}>Referral code: </Text>
                  <Text style={ls.codeVal}>{p.code}</Text>
                  {p.bonus && <Text style={ls.bonus}>  🎁 {p.bonus}</Text>}
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      ))}

      <Text style={s.sectionHdr}>Transfer Tips</Text>
      <View style={s.card}>
        {TIPS.map((tip,i,arr) => (
          <View key={i} style={[s.row, i===arr.length-1 && {borderBottomWidth:0}]}>
            <Text style={[s.body,{flex:1,lineHeight:20}]}>{tip}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}
const ls = StyleSheet.create({
  banner:   { backgroundColor:C.purple, paddingHorizontal:SP.lg, paddingVertical:SP.xl },
  title:    { fontSize:22, fontWeight:W.bold, color:'#fff', marginBottom:4 },
  sub:      { fontSize:14, color:'rgba(255,255,255,0.8)' },
  card:     { marginHorizontal:SP.lg, marginBottom:SP.sm, backgroundColor:'#fff', borderRadius:R.xl, padding:SP.lg, ...shadow },
  metaPill: { backgroundColor:'#F5F5F5', borderRadius:R.full, paddingHorizontal:8, paddingVertical:3 },
  metaTxt:  { fontSize:11, color:C.sub, fontWeight:W.medium },
  codePill: { flexDirection:'row', alignItems:'center', flexWrap:'wrap', borderRadius:R.full,
              paddingHorizontal:SP.md, paddingVertical:6, alignSelf:'flex-start' },
  codeLabel:{ fontSize:12, color:'rgba(255,255,255,0.8)' },
  codeVal:  { fontSize:13, fontWeight:W.bold, color:'#fff', letterSpacing:1 },
  bonus:    { fontSize:11, color:'rgba(255,255,255,0.9)' },
})
