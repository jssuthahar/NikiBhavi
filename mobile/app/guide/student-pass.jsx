import { ScrollView, View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { C, s, SP, R, W } from '../../src/theme/index'

const UNIS = [
  { name:'Universiti Malaya (UM)',     type:'Public',  rank:'Top in MY', emoji:'🏛️' },
  { name:'UTM / UPM / UKM',           type:'Public',  rank:'Top public', emoji:'🎓' },
  { name:'Monash University MY',       type:'Private', rank:'Australian', emoji:'🌏' },
  { name:'Taylor\'s University',       type:'Private', rank:'Popular',    emoji:'📚' },
  { name:'Sunway University',          type:'Private', rank:'UK tie-ups',  emoji:'🏫' },
  { name:'APU / Asia Pacific Uni',     type:'Private', rank:'IT focused',  emoji:'💻' },
]

export default function StudentPassScreen() {
  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom:40 }}>
      <View style={ls.banner}>
        <Text style={ls.title}>🎓 Student Pass Guide</Text>
        <Text style={ls.sub}>Studying in Malaysia as an Indian</Text>
      </View>

      <Text style={s.sectionHdr}>Popular Universities</Text>
      <View style={[s.card, { paddingVertical:0 }]}>
        {UNIS.map((u, i) => (
          <View key={u.name} style={i < UNIS.length-1 ? s.row : s.rowLast}>
            <Text style={{ fontSize:20, width:30 }}>{u.emoji}</Text>
            <View style={{ flex:1, marginLeft:10 }}>
              <Text style={s.title}>{u.name}</Text>
              <Text style={s.small}>{u.rank}</Text>
            </View>
            <View style={[ls.tag, { backgroundColor: u.type==='Public' ? C.primaryLt : '#EBF5FF' }]}>
              <Text style={[ls.tagTxt, { color: u.type==='Public' ? C.primaryDk : C.info }]}>{u.type}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={s.sectionHdr}>EMGS Process</Text>
      <View style={[s.card, { paddingVertical:0 }]}>
        {[
          ['Get university offer letter','Apply to your chosen university first'],
          ['EMGS application','University submits to Education Malaysia Global Services'],
          ['EMGS approval','3–6 weeks processing time'],
          ['VAL (Visa Approval Letter)','Sent to your home country embassy'],
          ['Apply visa at embassy','Single-entry student visa'],
          ['Enter Malaysia','Register at immigration within 30 days'],
          ['Student Pass issued','Valid for duration of course'],
        ].map(([t,d], i, arr) => (
          <View key={i} style={[s.row, i===arr.length-1 && {borderBottomWidth:0}]}>
            <View style={[ls.step, { backgroundColor:C.info }]}><Text style={ls.stepN}>{i+1}</Text></View>
            <View style={{ flex:1, marginLeft:12 }}>
              <Text style={s.title}>{t}</Text>
              <Text style={s.small}>{d}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={s.sectionHdr}>Costs (approx)</Text>
      <View style={[s.card, { paddingVertical:0 }]}>
        {[
          ['Tuition (private uni)',   'RM 15,000–45,000/year'],
          ['Hostel / shared room',    'RM 400–800/month'],
          ['Food + transport',        'RM 600–1,000/month'],
          ['EMGS fee',                'RM 500–1,500 one-time'],
          ['Health insurance',        'RM 300–600/year'],
        ].map(([l,v], i, arr) => (
          <View key={l} style={i < arr.length-1 ? s.row : s.rowLast}>
            <Text style={[s.body, { flex:1 }]}>{l}</Text>
            <Text style={[s.small, { color:C.primary, fontWeight:W.bold }]}>{v}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}
const ls = StyleSheet.create({
  banner:  { backgroundColor:C.info, paddingHorizontal:SP.lg, paddingVertical:SP.xl },
  title:   { fontSize:22, fontWeight:W.bold, color:'#fff', marginBottom:4 },
  sub:     { fontSize:14, color:'rgba(255,255,255,0.8)' },
  step:    { width:24, height:24, borderRadius:12, alignItems:'center', justifyContent:'center' },
  stepN:   { fontSize:11, fontWeight:W.bold, color:'#fff' },
  tag:     { borderRadius:R.full, paddingHorizontal:8, paddingVertical:3 },
  tagTxt:  { fontSize:10, fontWeight:W.bold },
})
