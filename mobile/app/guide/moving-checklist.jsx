import { useState } from 'react'
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { C, s, SP, R, W, shadow } from '../../src/theme/index'

const SECTIONS = [
  { title:'Before You Leave India', items: [
    'Apostille all degree certificates',
    'Get experience letters from all employers',
    'Collect 6 passport-size photos',
    'Check passport validity (18+ months)',
    'Inform bank of foreign address',
    'Download tax documents (Form 16)',
    'Pack kitchen essentials (spices, etc.)',
    'Submit MDAC online (3 days before)',
  ]},
  { title:'First Week in Malaysia', items: [
    'Collect i-Kad from immigration',
    'Open bank account (Maybank/CIMB)',
    'Get SIM card (Maxis/Celcom)',
    'Register with LHDN (tax authority)',
    'Find accommodation (use Facebook groups)',
    'Download MyGov & KWSP apps',
    'Get medical card / insurance',
  ]},
  { title:'First Month', items: [
    'Register vehicle / apply for driving license',
    'Find Indian grocery store nearby',
    'Join local Indian expat WhatsApp groups',
    'Set up remittance to India (Wise)',
    'Activate EPF i-Akaun (kwsp.gov.my)',
    'Check nearest Tamil / Hindu temple',
    'Explore Brickfields (Little India, KL)',
  ]},
]

export default function MovingChecklistScreen() {
  const [checked, setChecked] = useState({})
  const toggle = (key) => setChecked(p => ({ ...p, [key]: !p[key] }))

  const totalItems = SECTIONS.reduce((s, sec) => s + sec.items.length, 0)
  const doneItems  = Object.values(checked).filter(Boolean).length
  const pct = totalItems > 0 ? Math.round((doneItems/totalItems)*100) : 0

  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false}>
      <View style={ls.banner}>
        <Text style={ls.bannerTitle}>📋 Moving to Malaysia</Text>
        <Text style={ls.bannerSub}>Complete relocation checklist</Text>
      </View>

      {/* Progress */}
      <View style={ls.progressCard}>
        <View style={[s.between, { marginBottom:SP.sm }]}>
          <Text style={s.title}>Progress</Text>
          <Text style={[s.title, { color:C.primary }]}>{doneItems}/{totalItems} done ({pct}%)</Text>
        </View>
        <View style={ls.progBar}>
          <View style={[ls.progFill, { width:`${pct}%` }]} />
        </View>
      </View>

      {SECTIONS.map((sec) => (
        <View key={sec.title}>
          <Text style={s.sectionHdr}>{sec.title}</Text>
          <View style={s.card}>
            {sec.items.map((item, i) => {
              const key = `${sec.title}-${i}`
              const done = checked[key]
              return (
                <TouchableOpacity key={i}
                  style={[i < sec.items.length-1 ? s.row : s.rowLast, done && { opacity:0.5 }]}
                  onPress={() => toggle(key)} activeOpacity={0.7}>
                  <View style={[ls.checkbox, done && { backgroundColor:C.primary, borderColor:C.primary }]}>
                    {done && <Ionicons name="checkmark" size={14} color="#fff" />}
                  </View>
                  <Text style={[s.body, { flex:1, marginLeft:12, textDecorationLine: done ? 'line-through' : 'none' }]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
      ))}
      <View style={{ height:40 }} />
    </ScrollView>
  )
}

const ls = StyleSheet.create({
  banner:      { backgroundColor:C.primary, paddingHorizontal:SP.lg, paddingVertical:SP.xl },
  bannerTitle: { fontSize:22, fontWeight:W.bold, color:'#fff', marginBottom:4 },
  bannerSub:   { fontSize:14, color:'rgba(255,255,255,0.8)' },
  progressCard:{ marginHorizontal:SP.lg, marginTop:SP.lg, backgroundColor:'#fff', borderRadius:R.xl, padding:SP.lg, ...shadow },
  progBar:     { height:8, backgroundColor:'#EEE', borderRadius:4, overflow:'hidden' },
  progFill:    { height:8, backgroundColor:C.primary, borderRadius:4 },
  checkbox:    { width:22, height:22, borderRadius:R.sm, borderWidth:2, borderColor:C.border,
                 alignItems:'center', justifyContent:'center' },
})
