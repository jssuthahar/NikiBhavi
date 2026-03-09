import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { C, s, SP, R, W, shadow } from '../../src/theme/index'

const STEPS = [
  { step:'1', title:'Cancel your EP',           desc:'Your employer must cancel EP via ESD portal before you can proceed.', icon:'document-text-outline' },
  { step:'2', title:'Get EP Cancellation Letter',desc:'Collect the official EP cancellation stamp/letter from immigration.', icon:'mail-outline' },
  { step:'3', title:'Login to i-Akaun',          desc:'Visit kwsp.gov.my or use KWSP app. Login with your IC/passport + password.', icon:'phone-portrait-outline' },
  { step:'4', title:'Apply Withdrawal',          desc:'Choose "Withdrawal" → "Leaving Malaysia Permanently" → fill form.', icon:'card-outline' },
  { step:'5', title:'Submit Documents',          desc:'Upload: passport, EP cancellation, bank account details (overseas OK).', icon:'cloud-upload-outline' },
  { step:'6', title:'Receive Payment',           desc:'Processing: 2–4 weeks. Paid to your nominated bank account.', icon:'checkmark-circle-outline' },
]

const ACCOUNTS = [
  { name:'Akaun Persaraan', pct:'75%', color:C.primary, note:'Retirement account — withdraw when leaving permanently' },
  { name:'Akaun Sejahtera', pct:'15%', color:C.info,    note:'Can withdraw for housing, education, health' },
  { name:'Akaun Fleksibel', pct:'10%', color:C.orange,  note:'Withdraw ANYTIME — no reason needed!' },
]

export default function EPFWithdrawalScreen() {
  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false}>

      <View style={ls.banner}>
        <Text style={ls.bannerTitle}>🏦 EPF Withdrawal Guide</Text>
        <Text style={ls.bannerSub}>For Indians leaving Malaysia permanently</Text>
      </View>

      <Text style={s.sectionHdr}>EPF Account Structure</Text>
      {ACCOUNTS.map((a, i) => (
        <View key={a.name} style={[ls.accountCard, { borderLeftColor:a.color }]}>
          <View style={[s.between, { marginBottom:4 }]}>
            <Text style={[s.title, { color:a.color }]}>{a.name}</Text>
            <View style={[s.pill, { backgroundColor: a.color + '18' }]}>
              <Text style={[s.pillText, { color:a.color }]}>{a.pct}</Text>
            </View>
          </View>
          <Text style={s.body}>{a.note}</Text>
        </View>
      ))}

      <Text style={s.sectionHdr}>Withdrawal Steps</Text>
      {STEPS.map((step, i) => (
        <View key={step.step} style={ls.stepRow}>
          <View style={ls.stepLine}>
            <View style={ls.stepCircle}>
              <Text style={ls.stepNum}>{step.step}</Text>
            </View>
            {i < STEPS.length-1 && <View style={ls.stepConnector} />}
          </View>
          <View style={ls.stepContent}>
            <View style={[s.hstack, { gap:10, marginBottom:4 }]}>
              <Ionicons name={step.icon} size={18} color={C.primary} />
              <Text style={s.title}>{step.title}</Text>
            </View>
            <Text style={[s.body, { marginBottom:SP.lg }]}>{step.desc}</Text>
          </View>
        </View>
      ))}

      <TouchableOpacity style={[s.btnPrimary, { marginTop:SP.sm }]}
        onPress={() => Linking.openURL('https://www.kwsp.gov.my')} activeOpacity={0.85}>
        <Text style={s.btnText}>Visit KWSP Official Website →</Text>
      </TouchableOpacity>

      <View style={[ls.tip, { marginTop:SP.lg }]}>
        <Text style={ls.tipTitle}>💡 Key Tip</Text>
        <Text style={s.body}>Your Akaun Fleksibel (10%) can be withdrawn at any time via the KWSP app — no reason required. Great for emergency funds while still in Malaysia.</Text>
      </View>

      <View style={{ height:40 }} />
    </ScrollView>
  )
}

const ls = StyleSheet.create({
  banner:       { backgroundColor:C.primary, paddingHorizontal:SP.lg, paddingVertical:SP.xl },
  bannerTitle:  { fontSize:22, fontWeight:W.bold, color:'#fff', marginBottom:4 },
  bannerSub:    { fontSize:14, color:'rgba(255,255,255,0.8)' },
  accountCard:  { marginHorizontal:SP.lg, marginBottom:SP.sm, backgroundColor:'#fff', borderRadius:R.xl, padding:SP.lg, borderLeftWidth:4, ...shadow },
  stepRow:      { flexDirection:'row', paddingLeft:SP.lg },
  stepLine:     { alignItems:'center', marginRight:SP.md },
  stepCircle:   { width:32, height:32, borderRadius:16, backgroundColor:C.primary, alignItems:'center', justifyContent:'center' },
  stepNum:      { color:'#fff', fontWeight:W.bold, fontSize:14 },
  stepConnector:{ width:2, flex:1, backgroundColor:C.primaryLt || '#E6F7EE', marginVertical:2 },
  stepContent:  { flex:1, paddingTop:6 },
  tip:          { marginHorizontal:SP.lg, backgroundColor:'#EBF5FF', borderRadius:R.xl, padding:SP.lg, marginBottom:SP.md },
  tipTitle:     { fontSize:15, fontWeight:W.bold, color:C.info, marginBottom:6 },
})
