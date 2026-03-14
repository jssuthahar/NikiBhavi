import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native'
import { C, s, SP, R, W, shadow } from '../../src/theme/index'

const MODES = [
  { name:'Grab',          emoji:'🚗', color:C.primary, price:'RM 8–30/trip', best:'Safest & most used',
    tips:['Install before you land — works everywhere','Pay by card or cash', 'Grab Food for delivery too','Use GrabCar for AC car, GrabBike for motorbike'] },
  { name:'MRT / LRT',     emoji:'🚇', color:C.info,    price:'RM 1–5/trip',  best:'Best for city centre',
    tips:['Buy Touch\'n Go card at any station (RM 10 deposit)','Monthly pass RM 100 (unlimited Klang Valley)','Very clean, punctual, air-conditioned','Runs 6am–midnight daily'] },
  { name:'Rapid KL Bus',  emoji:'🚌', color:C.teal,    price:'RM 1 flat',    best:'Cheapest option',
    tips:['Pay with Touch\'n Go card','Routes cover most of KL & Selangor','Use MyRapid app for routes','Less frequent than MRT — check schedule'] },
  { name:'ERL (KLIA Express)',emoji:'🚄',color:C.purple,price:'RM 55/one way',best:'KLIA to KL Sentral',
    tips:['28 minutes KLIA to KL Sentral — fastest','Runs 5am–1am daily','Book online or buy at station','KLIA Transit (RM 35) stops at more stations'] },
  { name:'Taxi',          emoji:'🚕', color:C.warning,  price:'RM 15–80',     best:'Avoid street taxis',
    tips:['Use Grab instead — same price, safer','If you must take taxi, insist on meter','Airport taxis need pre-paid coupon from counter inside terminal','Never negotiate price upfront'] },
  { name:'MyBAS (KL free bus)',emoji:'🟦',color:C.orange,price:'FREE',         best:'Free in city centre',
    tips:['6 free bus routes in central KL','KL City hop-on hop-off style','Good for Chinatown, Brickfields, KLCC area','Runs 7am–11pm weekdays, 7am–midnight weekends'] },
]

export default function TransportScreen() {
  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom:40 }}>
      <View style={ls.banner}>
        <Text style={ls.title}>🚇 Transport Guide</Text>
        <Text style={ls.sub}>Getting around Malaysia as an Indian</Text>
      </View>

      <View style={ls.tip}>
        <Text style={ls.tipTxt}>💡 Get a Touch'n Go card on your first day — it works for ALL public transport (MRT, LRT, bus, highway tolls, and even some restaurants).</Text>
      </View>

      {MODES.map(mode => (
        <View key={mode.name} style={ls.modeCard}>
          <View style={[ls.modeHdr, {borderLeftColor:mode.color}]}>
            <Text style={{fontSize:24}}>{mode.emoji}</Text>
            <View style={{flex:1, marginLeft:SP.sm}}>
              <Text style={[s.title,{fontSize:16}]}>{mode.name}</Text>
              <Text style={[s.small,{color:mode.color,fontWeight:W.semibold}]}>{mode.best}</Text>
            </View>
            <Text style={[ls.price,{color:mode.color}]}>{mode.price}</Text>
          </View>
          <View style={ls.modeTips}>
            {mode.tips.map((tip,i) => (
              <View key={i} style={{flexDirection:'row', marginBottom:4}}>
                <Text style={{color:mode.color, marginRight:6, fontSize:12}}>›</Text>
                <Text style={[s.small,{flex:1,lineHeight:18}]}>{tip}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}

      <Text style={s.sectionHdr}>Touch'n Go Card</Text>
      <View style={[s.card,{paddingVertical:0}]}>
        {[['Where to buy','7-Eleven, petrol stations, MRT stations'],['Deposit','RM 10 (refundable)'],
          ['Minimum top-up','RM 10'],['Works for','MRT, LRT, bus, highway tolls, parking, some shops'],
          ['App','Touch\'n Go eWallet app (TNG)'],].map(([l,v],i,arr) => (
          <View key={l} style={i < arr.length-1 ? s.row : s.rowLast}>
            <Text style={[s.body,{width:110,color:C.sub}]}>{l}</Text>
            <Text style={[s.body,{flex:1,fontWeight:W.medium}]}>{v}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}
const ls = StyleSheet.create({
  banner:   { backgroundColor:C.info, paddingHorizontal:SP.lg, paddingVertical:SP.xl },
  title:    { fontSize:22, fontWeight:W.bold, color:'#fff', marginBottom:4 },
  sub:      { fontSize:14, color:'rgba(255,255,255,0.8)' },
  tip:      { marginHorizontal:SP.lg, marginTop:SP.lg, backgroundColor:'#EBF5FF', borderRadius:R.xl, padding:SP.md },
  tipTxt:   { fontSize:13, color:'#1a6fa8', lineHeight:19 },
  modeCard: { marginHorizontal:SP.lg, marginBottom:SP.sm, backgroundColor:'#fff', borderRadius:R.xl, overflow:'hidden', ...shadow },
  modeHdr:  { flexDirection:'row', alignItems:'center', padding:SP.md, borderLeftWidth:4 },
  modeTips: { paddingHorizontal:SP.md, paddingBottom:SP.md },
  price:    { fontSize:12, fontWeight:W.bold },
})
