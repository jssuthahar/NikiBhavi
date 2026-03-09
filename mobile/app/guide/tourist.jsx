import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { C, s, SP, R, W, shadow } from '../../src/theme/index'

const MDAC_STEPS = [
  'Go to imigresen-online.imi.gov.my/mdac/main',
  'Create account with your email',
  'Fill in passport details & travel dates',
  'Enter hotel/host address in Malaysia',
  'Submit at least 3 days before arrival',
  'Save confirmation email (show if asked)',
]

const REQUIREMENTS = [
  { icon:'card-outline',    text:'Valid passport (6+ months validity)' },
  { icon:'airplane-outline',text:'Return/onward flight ticket booked' },
  { icon:'home-outline',    text:'Hotel or host address in Malaysia' },
  { icon:'cash-outline',    text:'Proof of sufficient funds (optional)' },
  { icon:'phone-portrait-outline', text:'MDAC confirmation (recommended)' },
]

export default function TouristGuideScreen() {
  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false}>

      {/* Big green banner */}
      <View style={ls.banner}>
        <Text style={{ fontSize:48, marginBottom:8 }}>🎉</Text>
        <Text style={ls.bannerTitle}>Indians VISA-FREE!</Text>
        <Text style={ls.bannerSub}>Malaysia waived visa requirement for Indian passport holders</Text>
        <View style={ls.validPill}>
          <Ionicons name="calendar-outline" size={14} color={C.primary} />
          <Text style={ls.validTxt}>Valid until December 31, 2026</Text>
        </View>
      </View>

      {/* MDAC button */}
      <TouchableOpacity style={ls.mdacBtn}
        onPress={() => Linking.openURL('https://imigresen-online.imi.gov.my/mdac/main')} activeOpacity={0.85}>
        <View>
          <Text style={ls.mdacTitle}>Submit MDAC Online →</Text>
          <Text style={ls.mdacSub}>Mandatory • Free • Min 3 days before arrival</Text>
        </View>
        <Ionicons name="open-outline" size={20} color={C.primary} />
      </TouchableOpacity>

      <Text style={s.sectionHdr}>What You Need</Text>
      <View style={s.card}>
        {REQUIREMENTS.map((r, i) => (
          <View key={i} style={i < REQUIREMENTS.length-1 ? s.row : s.rowLast}>
            <Ionicons name={r.icon} size={18} color={C.primary} />
            <Text style={[s.body, { flex:1, marginLeft:12 }]}>{r.text}</Text>
          </View>
        ))}
      </View>

      <Text style={s.sectionHdr}>How to Submit MDAC</Text>
      <View style={s.card}>
        {MDAC_STEPS.map((step, i) => (
          <View key={i} style={i < MDAC_STEPS.length-1 ? s.row : s.rowLast}>
            <View style={ls.numBadge}>
              <Text style={ls.numTxt}>{i+1}</Text>
            </View>
            <Text style={[s.body, { flex:1, marginLeft:12 }]}>{step}</Text>
          </View>
        ))}
      </View>

      <Text style={s.sectionHdr}>Key Rules</Text>
      <View style={s.card}>
        {[
          ['Stay limit',       'Up to 30 days per visit',                  C.primary],
          ['Purpose',          'Tourism, social visits, business meetings', C.label  ],
          ['Work allowed?',    '❌ No — need EP for working',              C.danger ],
          ['Multiple entries', '✅ Yes — each visit resets',               C.primary],
          ['Entry point',      'KLIA, KLIA2, Penang, JB, and all airports',C.label  ],
        ].map(([l,v,c], i, arr) => (
          <View key={l} style={i < arr.length-1 ? s.row : s.rowLast}>
            <Text style={[s.body, { width:120, color:C.muted }]}>{l}</Text>
            <Text style={[s.body, { flex:1, color:c, fontWeight:W.medium }]}>{v}</Text>
          </View>
        ))}
      </View>

      <View style={{ height:40 }} />
    </ScrollView>
  )
}

const ls = StyleSheet.create({
  banner:      { backgroundColor:C.primary, paddingHorizontal:SP.lg, paddingVertical:SP.xxl, alignItems:'center' },
  bannerTitle: { fontSize:28, fontWeight:W.heavy, color:'#fff', textAlign:'center' },
  bannerSub:   { fontSize:15, color:'rgba(255,255,255,0.85)', textAlign:'center', marginTop:6, paddingHorizontal:SP.lg },
  validPill:   { flexDirection:'row', alignItems:'center', gap:6, backgroundColor:'#fff', borderRadius:R.full, paddingHorizontal:16, paddingVertical:8, marginTop:SP.lg },
  validTxt:    { fontSize:14, fontWeight:W.bold, color:C.primary },
  mdacBtn:     { marginHorizontal:SP.lg, marginTop:SP.lg, marginBottom:SP.sm, backgroundColor:'#E6F7EE', borderRadius:R.xl, padding:SP.lg, flexDirection:'row', alignItems:'center', justifyContent:'space-between', borderWidth:1.5, borderColor:C.primary },
  mdacTitle:   { fontSize:16, fontWeight:W.bold, color:C.primary, marginBottom:2 },
  mdacSub:     { fontSize:12, color:C.sub },
  numBadge:    { width:26, height:26, borderRadius:13, backgroundColor:C.primary, alignItems:'center', justifyContent:'center' },
  numTxt:      { color:'#fff', fontWeight:W.bold, fontSize:12 },
})
