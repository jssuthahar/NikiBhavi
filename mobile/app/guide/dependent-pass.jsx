import { ScrollView, View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { C, s, SP, R, W } from '../../src/theme/index'

export default function DependentPassScreen() {
  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom:40 }}>
      <View style={ls.banner}>
        <Text style={ls.title}>🧳 Dependent Pass</Text>
        <Text style={ls.sub}>Bring your spouse & children to Malaysia</Text>
      </View>

      <Text style={s.sectionHdr}>Who Can Apply</Text>
      <View style={[s.card, { paddingVertical:0 }]}>
        {[
          { who:'Spouse',   note:'Legal spouse — marriage certificate required',  emoji:'💑' },
          { who:'Children', note:'Under 18 — birth certificate required',         emoji:'👶' },
          { who:'Parents',  note:'Not eligible for DP — apply Long Term Pass',    emoji:'👴' },
        ].map((w, i, arr) => (
          <View key={w.who} style={i < arr.length-1 ? s.row : s.rowLast}>
            <Text style={{ fontSize:22, width:34 }}>{w.emoji}</Text>
            <View style={{ flex:1, marginLeft:10 }}>
              <Text style={s.title}>{w.who}</Text>
              <Text style={s.small}>{w.note}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={s.sectionHdr}>Documents Required</Text>
      <View style={[s.card, { paddingVertical:0 }]}>
        {['Sponsor\'s EP (front & back)','Passport copies (sponsor + dependents)','Marriage certificate (apostilled)','Birth certificates for children','Recent passport photos (white background)','Completed DP application form','Supporting letter from employer'].map((d, i, arr) => (
          <View key={i} style={[s.row, i===arr.length-1 && {borderBottomWidth:0}]}>
            <Text style={{ color:C.primary, marginRight:10 }}>✓</Text>
            <Text style={[s.body, { flex:1 }]}>{d}</Text>
          </View>
        ))}
      </View>

      <Text style={s.sectionHdr}>Process</Text>
      <View style={[s.card, { paddingVertical:0 }]}>
        {[
          ['Employer applies via ESD portal','(same portal as your EP)'],
          ['Processing time','3–10 working days'],
          ['DP is tied to sponsor\'s EP','If EP cancelled, DP cancelled too'],
          ['DP holder cannot work','Unless they get a separate EP/work pass'],
          ['Apply before expiry','Renewal follows EP renewal'],
        ].map(([t,d], i, arr) => (
          <View key={i} style={[s.row, i===arr.length-1 && {borderBottomWidth:0}]}>
            <View style={[ls.step, { backgroundColor:C.primary }]}><Text style={ls.stepN}>{i+1}</Text></View>
            <View style={{ flex:1, marginLeft:12 }}>
              <Text style={s.title}>{t}</Text>
              <Text style={s.small}>{d}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={ls.note}>
        <Ionicons name="information-circle" size={16} color={C.info} />
        <Text style={[ls.noteTxt, { flex:1 }]}>  Dependent Pass holders can enrol children in Malaysian schools (govt or private). Spouse can apply for a separate EP or work if they get a job offer.</Text>
      </View>
    </ScrollView>
  )
}
const ls = StyleSheet.create({
  banner:  { backgroundColor:C.primary, paddingHorizontal:SP.lg, paddingVertical:SP.xl },
  title:   { fontSize:22, fontWeight:W.bold, color:'#fff', marginBottom:4 },
  sub:     { fontSize:14, color:'rgba(255,255,255,0.8)' },
  step:    { width:24, height:24, borderRadius:12, alignItems:'center', justifyContent:'center' },
  stepN:   { fontSize:11, fontWeight:W.bold, color:'#fff' },
  note:    { flexDirection:'row', marginHorizontal:SP.lg, backgroundColor:'#EBF5FF', borderRadius:R.xl, padding:SP.md, marginBottom:SP.md },
  noteTxt: { fontSize:13, color:'#1a6fa8', lineHeight:19 },
})
