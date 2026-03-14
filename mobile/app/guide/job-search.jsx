import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { C, s, SP, R, W, shadow } from '../../src/theme/index'

const PORTALS = [
  { name:'LinkedIn',      url:'https://linkedin.com/jobs', emoji:'💼', tip:'Best for EP-eligible roles (RM 5k+)' },
  { name:'JobStreet',     url:'https://jobstreet.com.my',  emoji:'🔍', tip:'Largest Malaysia job board' },
  { name:'Indeed MY',     url:'https://my.indeed.com',     emoji:'📋', tip:'Good for walk-in & contract roles' },
  { name:'Glassdoor MY',  url:'https://glassdoor.com',     emoji:'⭐', tip:'Check salary ranges before applying' },
  { name:'MyFutureJobs',  url:'https://myfuturejobs.gov.my',emoji:'🏛️',tip:'Government portal — also lists private' },
]

const EP_MINS = [
  { cat:'Category I',    sal:'RM 20,000/mo', note:'10yr max stay', color:C.purple },
  { cat:'Category II',   sal:'RM 10,000/mo', note:'10yr max stay', color:C.info   },
  { cat:'Category III',  sal:'RM 5,000/mo',  note:'5yr max stay',  color:C.primary},
  { cat:'Mfg Category III', sal:'RM 7,000/mo', note:'5yr max stay',color:C.orange },
]

const SECTORS = ['Tech / IT','Finance & Banking','Engineering','Shared Services','Oil & Gas','Healthcare','Education']

export default function JobSearchScreen() {
  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom:40 }}>
      <View style={ls.banner}>
        <Text style={ls.title}>💼 Job Search Guide</Text>
        <Text style={ls.sub}>Finding work in Malaysia as an Indian</Text>
      </View>

      <Text style={s.sectionHdr}>EP Salary 2026 (from June 1)</Text>
      <View style={[s.card, { paddingVertical:0 }]}>
        {EP_MINS.map((ep, i) => (
          <View key={ep.cat} style={i < EP_MINS.length-1 ? s.row : s.rowLast}>
            <View style={[ls.dot, { backgroundColor:ep.color }]} />
            <View style={{ flex:1, marginLeft:10 }}>
              <Text style={s.title}>{ep.cat}</Text>
              <Text style={s.small}>{ep.note}</Text>
            </View>
            <View style={[s.pill, { backgroundColor:ep.color+'18' }]}>
              <Text style={[s.pillText, { color:ep.color }]}>{ep.sal}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={s.sectionHdr}>Job Portals</Text>
      <View style={[s.card, { paddingVertical:0 }]}>
        {PORTALS.map((p, i) => (
          <TouchableOpacity key={p.name} style={i < PORTALS.length-1 ? s.row : s.rowLast}
            onPress={() => Linking.openURL(p.url)} activeOpacity={0.7}>
            <Text style={{ fontSize:22, width:34 }}>{p.emoji}</Text>
            <View style={{ flex:1, marginLeft:10 }}>
              <Text style={s.title}>{p.name}</Text>
              <Text style={s.small}>{p.tip}</Text>
            </View>
            <Ionicons name="open-outline" size={14} color={C.muted} />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={s.sectionHdr}>Top Sectors Hiring Indians</Text>
      <View style={ls.chips}>
        {SECTORS.map(sec => (
          <View key={sec} style={ls.chip}>
            <Text style={ls.chipTxt}>{sec}</Text>
          </View>
        ))}
      </View>

      <Text style={s.sectionHdr}>Tips for Indians</Text>
      <View style={s.card}>
        {[
          '✅ Ensure offer letter states RM salary clearly for EP application',
          '✅ Employer must apply EP — you cannot apply yourself',
          '✅ Processing takes 3–10 working days via ESD portal',
          '✅ Use LinkedIn "Open to Work" for Malaysia location',
          '⚠️ Avoid agencies that charge fees — legitimate employers pay',
          '⚠️ Verify company is registered with SSM before accepting',
        ].map((tip, i) => (
          <View key={i} style={[s.row, i === 5 && { borderBottomWidth:0 }]}>
            <Text style={[s.body, { flex:1, lineHeight:20 }]}>{tip}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}
const ls = StyleSheet.create({
  banner: { backgroundColor:C.primary, paddingHorizontal:SP.lg, paddingVertical:SP.xl },
  title:  { fontSize:22, fontWeight:W.bold, color:'#fff', marginBottom:4 },
  sub:    { fontSize:14, color:'rgba(255,255,255,0.8)' },
  dot:    { width:10, height:10, borderRadius:5 },
  chips:  { flexDirection:'row', flexWrap:'wrap', paddingHorizontal:SP.lg, gap:8, marginBottom:SP.md },
  chip:   { backgroundColor:C.primaryLt, borderRadius:R.full, paddingHorizontal:12, paddingVertical:6 },
  chipTxt:{ fontSize:13, color:C.primaryDk, fontWeight:W.semibold },
})
