import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { C, s, SP, R, W } from '../../src/theme/index'

const TOPICS = [
  { num:'01', title:'First Week Checklist',  emoji:'📋', tips:['Register MDAC before landing','Open bank account within 2 weeks','Get postpaid SIM (Maxis/Digi)','Register MyEG for EP tracking'] },
  { num:'02', title:'Tax Registration',      emoji:'💰', tips:['Register at LHDN (mytax.hasil.gov.my)','You\'re non-resident first 182 days — 30% flat tax','After 182 days → resident rates (0–30%)','File Form BE by April 30 annually'] },
  { num:'03', title:'EPF Setup',             emoji:'🏦', tips:['Employer registers you automatically','11% deducted from your salary','Employer adds 12–13%','Check balance at i-Akaun (kwsp.gov.my)'] },
  { num:'04', title:'Healthcare',            emoji:'🏥', tips:['Panel clinics free with company insurance','Govt hospital: RM 1 per visit as EP holder','Get medical card from AIA/Prudential','Pantai, Columbia for specialist care'] },
  { num:'05', title:'Grocery Shopping',      emoji:'🛒', tips:['Indian groceries: Brickfields, Cheras wet markets','Mydin, Econsave for budget shopping','Jaya Grocer, Village Grocer for premium','Giant, Tesco, Aeon — everywhere'] },
  { num:'06', title:'Food Guide',            emoji:'🍛', tips:['Mamak restaurants: 24hr, cheap, halal','Banana leaf rice: Brickfields RM 8–12','Nasi kandar: KL many options, RM 6–10','Indian groceries: Mustafa (SG) equivalent = Brickfields'] },
  { num:'07', title:'Transport',             emoji:'🚇', tips:['Get Touch \'n Go card — works for MRT/LRT/bus','Grab app mandatory — Grab Car & Grab Food','Monthly pass: Rapid KL RM 100 unlimited','Parking: RM 1–3/hr in most areas'] },
  { num:'08', title:'Sending Money to India',emoji:'💸', tips:['InstaReM: fastest (1 min), use code kQodAW','Wise: great rates, 1–2 business days','BigPay: good rates, code OUGVGERVDT','Avoid bank TT — higher fees, slower'] },
]

export default function EPLifeGuideScreen() {
  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom:40 }}>
      <View style={ls.banner}>
        <Text style={ls.title}>🏡 EP Life Guide</Text>
        <Text style={ls.sub}>Everything you need to settle in Malaysia</Text>
        <View style={ls.countBadge}><Text style={ls.countTxt}>{TOPICS.length} Essential Topics</Text></View>
      </View>

      {TOPICS.map((topic, ti) => (
        <View key={topic.num} style={ls.card}>
          <View style={ls.cardHdr}>
            <View style={ls.numBadge}><Text style={ls.numTxt}>{topic.num}</Text></View>
            <Text style={{ fontSize:22, marginLeft:8 }}>{topic.emoji}</Text>
            <Text style={[s.title, { flex:1, marginLeft:8, fontSize:16 }]}>{topic.title}</Text>
          </View>
          {topic.tips.map((tip, i) => (
            <View key={i} style={ls.tipRow}>
              <View style={ls.bullet} />
              <Text style={[s.body, { flex:1, marginLeft:10, lineHeight:20, fontSize:14 }]}>{tip}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  )
}
const ls = StyleSheet.create({
  banner:     { backgroundColor:C.primary, paddingHorizontal:SP.lg, paddingVertical:SP.xl },
  title:      { fontSize:22, fontWeight:W.bold, color:'#fff', marginBottom:4 },
  sub:        { fontSize:14, color:'rgba(255,255,255,0.8)', marginBottom:SP.md },
  countBadge: { alignSelf:'flex-start', backgroundColor:'rgba(255,255,255,0.2)', borderRadius:R.full, paddingHorizontal:12, paddingVertical:4 },
  countTxt:   { fontSize:12, color:'#fff', fontWeight:W.semibold },
  card:       { marginHorizontal:SP.lg, marginTop:SP.md, backgroundColor:'#fff', borderRadius:R.xl, padding:SP.lg, elevation:2, shadowColor:'#000', shadowOpacity:0.06, shadowRadius:4 },
  cardHdr:    { flexDirection:'row', alignItems:'center', marginBottom:SP.md, paddingBottom:SP.sm, borderBottomWidth:1, borderBottomColor:'#EEE' },
  numBadge:   { width:28, height:28, borderRadius:14, backgroundColor:C.primary, alignItems:'center', justifyContent:'center' },
  numTxt:     { fontSize:12, fontWeight:W.bold, color:'#fff' },
  tipRow:     { flexDirection:'row', alignItems:'flex-start', marginBottom:8 },
  bullet:     { width:6, height:6, borderRadius:3, backgroundColor:C.primary, marginTop:7 },
})
