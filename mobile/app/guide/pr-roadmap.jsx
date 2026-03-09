import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { C, s, SP, R, W, shadow } from '../../src/theme/index'

const MILESTONES = [
  { year:'Year 1–2', title:'Arrive on EP',           desc:'Get Employment Pass. Register with LHDN (tax). Open bank account. Start EPF.', color:C.info },
  { year:'Year 3–4', title:'Build History',          desc:'File taxes every year. Renew EP. Build clean immigration record. No criminal record.', color:C.primary },
  { year:'Year 5',   title:'EP Renewal / Cat I',     desc:'Consider upgrading to Cat I (RM 20k+). Higher salary = better PR chances.', color:C.orange },
  { year:'Year 7–10',title:'Apply for PR (MyPR)',    desc:'Submit PR application. Required: 10 years tax records, EP renewal history, community involvement.', color:C.teal },
  { year:'Year 10+', title:'Permanent Residency',    desc:'If approved, get PR (Permanent Resident) status. Can stay indefinitely, buy property.', color:C.purple },
]

export default function PRRoadmapScreen() {
  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false}>
      <View style={ls.banner}>
        <Text style={ls.bannerTitle}>🗺️ PR Roadmap</Text>
        <Text style={ls.bannerSub}>Permanent Residency pathway for Indians</Text>
      </View>

      <View style={[ls.disclaimer]}>
        <Text style={ls.disclaimerTxt}>⚠️ PR in Malaysia is discretionary — not guaranteed even after 10 years. Guidelines change. Consult an immigration lawyer.</Text>
      </View>

      <Text style={s.sectionHdr}>The Journey</Text>
      {MILESTONES.map((m, i) => (
        <View key={m.year} style={ls.stepRow}>
          <View style={ls.stepLine}>
            <View style={[ls.stepCircle, { backgroundColor:m.color }]}>
              <Text style={ls.stepYear}>{m.year.replace('Year ', 'Y')}</Text>
            </View>
            {i < MILESTONES.length-1 && <View style={ls.connector} />}
          </View>
          <View style={ls.stepBody}>
            <Text style={[s.title, { color:m.color, marginBottom:4 }]}>{m.title}</Text>
            <Text style={[s.body, { marginBottom:SP.xl }]}>{m.desc}</Text>
          </View>
        </View>
      ))}

      <Text style={s.sectionHdr}>Key Requirements (General)</Text>
      <View style={s.card}>
        {[
          '10+ years of continuous legal stay',
          'Valid EP throughout the period',
          'Clean tax record (file every year)',
          'No criminal record',
          'Proof of financial stability',
          'Community ties or social contributions',
        ].map((item, i, arr) => (
          <View key={i} style={i < arr.length-1 ? s.row : s.rowLast}>
            <Text style={{ color:C.primary, marginRight:10, fontSize:16 }}>✓</Text>
            <Text style={[s.body, { flex:1 }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={{ height:40 }} />
    </ScrollView>
  )
}

const ls = StyleSheet.create({
  banner:      { backgroundColor:C.primary, paddingHorizontal:SP.lg, paddingVertical:SP.xl },
  bannerTitle: { fontSize:22, fontWeight:W.bold, color:'#fff', marginBottom:4 },
  bannerSub:   { fontSize:14, color:'rgba(255,255,255,0.8)' },
  disclaimer:  { marginHorizontal:SP.lg, marginTop:SP.lg, backgroundColor:'#FFF4E5', borderRadius:R.xl, padding:SP.md },
  disclaimerTxt:{ fontSize:13, color:'#92400E' },
  stepRow:     { flexDirection:'row', paddingLeft:SP.lg },
  stepLine:    { alignItems:'center', marginRight:SP.md },
  stepCircle:  { width:44, height:44, borderRadius:22, alignItems:'center', justifyContent:'center' },
  stepYear:    { color:'#fff', fontWeight:W.bold, fontSize:11, textAlign:'center' },
  connector:   { width:2, flex:1, backgroundColor:'#EEE', marginVertical:2 },
  stepBody:    { flex:1, paddingTop:8 },
})
