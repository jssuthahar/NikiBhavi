import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { C, s, SP, R, W, shadow } from '../../src/theme/index'

const CATEGORIES = [
  { cat:'Category I',         min:'RM 20,000', tenure:'10 years', note:'Top tier executives, specialists', color:C.purple },
  { cat:'Category II',        min:'RM 10,000', tenure:'10 years', note:'Senior professionals',             color:C.info   },
  { cat:'Category III',       min:'RM 5,000',  tenure:'5 years',  note:'General professionals',           color:C.primary},
  { cat:'Manufacturing III',  min:'RM 7,000',  tenure:'5 years',  note:'Manufacturing sector only',       color:C.orange },
]

const DOCS = ['Valid passport (18+ months)', 'Degree certificate (apostilled)', 'Experience letters from all previous employers', 'Company offer letter with salary', 'Passport photos (6 copies)', 'Updated resume/CV', 'Professional certificates (if any)']

const STEPS = [
  { step:'1', title:'Receive Job Offer',     desc:'Get written offer letter from Malaysian company with official salary stated.' },
  { step:'2', title:'Company Submits AIP',   desc:'Employer applies for Approval In Principle via ESD portal (esd.imi.gov.my).' },
  { step:'3', title:'Wait for AIP',          desc:'AIP approval typically takes 2–4 weeks. Company receives email notification.' },
  { step:'4', title:'Fly to Malaysia',       desc:'Travel to Malaysia with all original documents and passport photos.' },
  { step:'5', title:'Collect i-Kad',         desc:'Visit immigration with AIP letter. Get i-Kad (identity card) issued.' },
  { step:'6', title:'Register Tax & EPF',    desc:'Register with LHDN for income tax and activate EPF i-Akaun.' },
]

export default function EPGuideScreen() {
  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false}>
      <View style={ls.banner}>
        <View style={[ls.alertPill]}>
          <Text style={ls.alertPillTxt}>⚠️ Effective June 1, 2026</Text>
        </View>
        <Text style={ls.bannerTitle}>Employment Pass Guide</Text>
        <Text style={ls.bannerSub}>Complete 2026 EP guide for Indians</Text>
      </View>

      <Text style={s.sectionHdr}>Salary Categories</Text>
      {CATEGORIES.map((cat) => (
        <View key={cat.cat} style={[ls.catCard, { borderLeftColor:cat.color }]}>
          <View style={[s.between, { marginBottom:4 }]}>
            <Text style={[s.title, { color:cat.color }]}>{cat.cat}</Text>
            <View style={[s.pill, { backgroundColor: cat.color+'18' }]}>
              <Text style={[s.pillText, { color:cat.color }]}>{cat.tenure}</Text>
            </View>
          </View>
          <Text style={[ls.minSalary, { color:cat.color }]}>Minimum: {cat.min}/month</Text>
          <Text style={s.small}>{cat.note}</Text>
        </View>
      ))}

      <Text style={s.sectionHdr}>Application Steps</Text>
      {STEPS.map((step, i) => (
        <View key={step.step} style={ls.stepRow}>
          <View style={ls.stepLeft}>
            <View style={ls.stepCircle}>
              <Text style={ls.stepNum}>{step.step}</Text>
            </View>
            {i < STEPS.length-1 && <View style={ls.connector} />}
          </View>
          <View style={ls.stepBody}>
            <Text style={[s.title, { marginBottom:4 }]}>{step.title}</Text>
            <Text style={[s.body, { marginBottom:SP.xl }]}>{step.desc}</Text>
          </View>
        </View>
      ))}

      <Text style={s.sectionHdr}>Required Documents</Text>
      <View style={s.card}>
        {DOCS.map((doc, i) => (
          <View key={i} style={i < DOCS.length-1 ? s.row : s.rowLast}>
            <Ionicons name="document-text-outline" size={16} color={C.primary} />
            <Text style={[s.body, { flex:1, marginLeft:10 }]}>{doc}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={[s.btnPrimary, { marginTop:SP.sm }]}
        onPress={() => Linking.openURL('https://esd.imi.gov.my')} activeOpacity={0.85}>
        <Text style={s.btnText}>ESD Portal — Apply Here →</Text>
      </TouchableOpacity>

      <View style={{ height:40 }} />
    </ScrollView>
  )
}

const ls = StyleSheet.create({
  banner:      { backgroundColor:C.primary, paddingHorizontal:SP.lg, paddingVertical:SP.xl },
  alertPill:   { backgroundColor:'rgba(255,255,255,0.2)', alignSelf:'flex-start', borderRadius:R.full, paddingHorizontal:12, paddingVertical:4, marginBottom:8 },
  alertPillTxt:{ fontSize:12, fontWeight:W.bold, color:'#fff' },
  bannerTitle: { fontSize:22, fontWeight:W.bold, color:'#fff', marginBottom:4 },
  bannerSub:   { fontSize:14, color:'rgba(255,255,255,0.8)' },
  catCard:     { marginHorizontal:SP.lg, marginBottom:SP.sm, backgroundColor:'#fff', borderRadius:R.xl, padding:SP.lg, borderLeftWidth:4, ...shadow },
  minSalary:   { fontSize:16, fontWeight:W.bold, marginBottom:4 },
  stepRow:     { flexDirection:'row', paddingLeft:SP.lg },
  stepLeft:    { alignItems:'center', marginRight:SP.md },
  stepCircle:  { width:32, height:32, borderRadius:16, backgroundColor:C.primary, alignItems:'center', justifyContent:'center' },
  stepNum:     { color:'#fff', fontWeight:W.bold, fontSize:14 },
  connector:   { width:2, flex:1, backgroundColor:C.primaryLt||'#E6F7EE', marginVertical:2 },
  stepBody:    { flex:1, paddingTop:6 },
})
