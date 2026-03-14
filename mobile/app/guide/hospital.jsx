import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native'
import { C, s, SP, R, W, shadow } from '../../src/theme/index'

const HOSPITALS = [
  { name:'Pantai Hospital KL',      area:'Bangsar, KL',         type:'Private',  emoji:'🏥', phone:'03-2296 0888',  color:C.danger  },
  { name:'KPJ Damansara',           area:'Damansara, Selangor', type:'Private',  emoji:'🏨', phone:'03-7718 1000',  color:C.info    },
  { name:'Columbia Asia Setapak',   area:'Setapak, KL',         type:'Private',  emoji:'🏦', phone:'03-4149 9000',  color:C.teal    },
  { name:'Hospital KL (HKL)',       area:'Jalan Pahang, KL',    type:'Govt',     emoji:'🏛️', phone:'03-2615 5555',  color:C.primary },
  { name:'Hospital Selayang',       area:'Selayang, Selangor',  type:'Govt',     emoji:'🏢', phone:'03-6120 3333',  color:C.primary },
  { name:'Gleneagles KL',           area:'Ampang, KL',          type:'Premium',  emoji:'⭐', phone:'03-4141 3000',  color:C.warning },
]

const PANEL_TIPS = [
  'Ask HR for your company panel clinic list before you get sick',
  'Panel clinics = free consultation + subsidized medicine with company insurance',
  'Government hospitals charge only RM 1 per visit as a registered foreigner (EP holder)',
  'For specialist care, get referral from panel clinic — saves cost',
  'SOCSO covers work injuries and some illnesses — register at perkeso.gov.my',
  'Keep all receipts for insurance claims',
]

export default function HospitalScreen() {
  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom:40 }}>
      <View style={ls.banner}>
        <Text style={ls.title}>💊 Hospitals & Clinics</Text>
        <Text style={ls.sub}>Healthcare guide for Indians in Malaysia</Text>
      </View>

      <View style={ls.tip}>
        <Text style={ls.tipTxt}>💡 As an EP holder, government hospitals charge only RM 1 per outpatient visit. Private panel clinics are free with company insurance.</Text>
      </View>

      <Text style={s.sectionHdr}>Major Hospitals</Text>
      <View style={[s.card,{paddingVertical:0}]}>
        {HOSPITALS.map((h,i) => (
          <TouchableOpacity key={h.name} style={i < HOSPITALS.length-1 ? s.row : s.rowLast}
            onPress={() => Linking.openURL(`tel:${h.phone.replace(/-/g,'').replace(/\s/g,'')}`)} activeOpacity={0.7}>
            <View style={[ls.icon, {backgroundColor:h.color+'18'}]}>
              <Text style={{fontSize:20}}>{h.emoji}</Text>
            </View>
            <View style={{flex:1, marginLeft:10}}>
              <View style={{flexDirection:'row', gap:6, alignItems:'center'}}>
                <Text style={[s.title,{flex:1}]}>{h.name}</Text>
                <View style={[ls.typeBadge, {backgroundColor:h.color+'18'}]}>
                  <Text style={[ls.typeTxt,{color:h.color}]}>{h.type}</Text>
                </View>
              </View>
              <Text style={s.small}>📍 {h.area}</Text>
              <Text style={[s.small,{color:C.info}]}>📞 {h.phone}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={s.sectionHdr}>Panel Clinic Tips</Text>
      <View style={s.card}>
        {PANEL_TIPS.map((tip,i,arr) => (
          <View key={i} style={[s.row, i===arr.length-1 && {borderBottomWidth:0}]}>
            <Text style={{color:C.primary, marginRight:8, fontSize:14}}>✓</Text>
            <Text style={[s.body,{flex:1,lineHeight:20}]}>{tip}</Text>
          </View>
        ))}
      </View>

      <Text style={s.sectionHdr}>Emergency Numbers</Text>
      <View style={[s.card,{paddingVertical:0}]}>
        {[['999','Police/Ambulance/Fire (general)'],['112','Works without SIM card'],
          ['1800-88-2020','MERS 999 (operator-assisted)'],['03-2615 5555','Hospital KL (HKL) emergency']].map(([num,desc],i,arr) => (
          <TouchableOpacity key={num} style={i < arr.length-1 ? s.row : s.rowLast}
            onPress={() => Linking.openURL(`tel:${num}`)} activeOpacity={0.7}>
            <Text style={[ls.emerNum]}>{num}</Text>
            <Text style={[s.body,{flex:1, marginLeft:10}]}>{desc}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}
const ls = StyleSheet.create({
  banner:    { backgroundColor:C.danger, paddingHorizontal:SP.lg, paddingVertical:SP.xl },
  title:     { fontSize:22, fontWeight:W.bold, color:'#fff', marginBottom:4 },
  sub:       { fontSize:14, color:'rgba(255,255,255,0.8)' },
  tip:       { marginHorizontal:SP.lg, marginTop:SP.lg, backgroundColor:'#FFFBEB', borderRadius:R.xl, padding:SP.md },
  tipTxt:    { fontSize:13, color:'#92400E', lineHeight:19 },
  icon:      { width:42, height:42, borderRadius:R.lg, alignItems:'center', justifyContent:'center' },
  typeBadge: { borderRadius:R.full, paddingHorizontal:8, paddingVertical:2 },
  typeTxt:   { fontSize:10, fontWeight:W.bold },
  emerNum:   { fontSize:16, fontWeight:W.bold, color:C.danger, width:80 },
})
