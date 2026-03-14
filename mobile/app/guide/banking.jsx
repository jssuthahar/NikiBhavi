import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { C, s, SP, R, W } from '../../src/theme/index'

const BANKS = [
  { name:'Maybank',     type:'Best overall',        docs:'EP + passport + offer letter', emoji:'🏦', color:C.warning  },
  { name:'CIMB',        type:'EP holder friendly',  docs:'EP + passport + 3mo payslip',  emoji:'🏧', color:C.danger   },
  { name:'RHB Bank',    type:'Easy opening',        docs:'EP + passport',                emoji:'💳', color:C.purple   },
  { name:'Public Bank', type:'Good for savings',    docs:'EP + passport + utility bill', emoji:'🏛️', color:C.info     },
  { name:'HSBC',        type:'International transfers', docs:'EP + passport + income proof', emoji:'🌐', color:C.teal },
]

const STEPS = [
  'Walk into any branch with EP + passport',
  'Tell them you are an EP holder opening a savings account',
  'Fill KYC form — takes 20–30 minutes',
  'Initial deposit: RM 500–1,000 (varies by bank)',
  'Debit card issued same day or mailed in 5–7 days',
  'Activate online banking within 24 hours',
]

export default function BankingScreen() {
  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom:40 }}>
      <View style={ls.banner}>
        <Text style={ls.title}>🏦 Banking Guide</Text>
        <Text style={ls.sub}>Open a Malaysian bank account as an Indian EP holder</Text>
      </View>

      <Text style={s.sectionHdr}>Recommended Banks</Text>
      <View style={[s.card, { paddingVertical:0 }]}>
        {BANKS.map((b, i) => (
          <View key={b.name} style={i < BANKS.length-1 ? s.row : s.rowLast}>
            <View style={[ls.icon, { backgroundColor:b.color+'18' }]}>
              <Text style={{ fontSize:20 }}>{b.emoji}</Text>
            </View>
            <View style={{ flex:1, marginLeft:12 }}>
              <View style={{ flexDirection:'row', gap:6, alignItems:'center' }}>
                <Text style={s.title}>{b.name}</Text>
                <View style={[ls.tag, { backgroundColor:b.color+'18' }]}>
                  <Text style={[ls.tagTxt, { color:b.color }]}>{b.type}</Text>
                </View>
              </View>
              <Text style={s.small}>Docs: {b.docs}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={s.sectionHdr}>How to Open (Step by Step)</Text>
      <View style={[s.card, { paddingVertical:0 }]}>
        {STEPS.map((step, i) => (
          <View key={i} style={[s.row, i===STEPS.length-1 && {borderBottomWidth:0}]}>
            <View style={ls.stepNum}><Text style={ls.stepTxt}>{i+1}</Text></View>
            <Text style={[s.body, { flex:1, marginLeft:12, lineHeight:20 }]}>{step}</Text>
          </View>
        ))}
      </View>

      <Text style={s.sectionHdr}>Important Notes</Text>
      <View style={s.card}>
        {[
          '⚠️ Open account within 1 month of EP approval — employer needs it for salary',
          '💡 Use Wise or InstaReM to send money to India — banks charge high TT fees',
          '📱 Enable Duitnow — Malaysia\'s instant transfer system (like UPI)',
          '🏦 EPF contributions need your bank account — set it up ASAP',
        ].map((n, i, arr) => (
          <View key={i} style={[s.row, i===arr.length-1 && {borderBottomWidth:0}]}>
            <Text style={[s.body, { flex:1, lineHeight:20 }]}>{n}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}
const ls = StyleSheet.create({
  banner:  { backgroundColor:C.primary, paddingHorizontal:SP.lg, paddingVertical:SP.xl },
  title:   { fontSize:22, fontWeight:W.bold, color:'#fff', marginBottom:4 },
  sub:     { fontSize:14, color:'rgba(255,255,255,0.8)' },
  icon:    { width:42, height:42, borderRadius:R.lg, alignItems:'center', justifyContent:'center' },
  tag:     { borderRadius:R.full, paddingHorizontal:8, paddingVertical:2 },
  tagTxt:  { fontSize:10, fontWeight:W.bold },
  stepNum: { width:26, height:26, borderRadius:13, backgroundColor:C.primary, alignItems:'center', justifyContent:'center' },
  stepTxt: { fontSize:13, fontWeight:W.bold, color:'#fff' },
})
