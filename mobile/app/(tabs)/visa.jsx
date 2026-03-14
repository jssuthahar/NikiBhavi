import { ScrollView, View, Text, TouchableOpacity, TextInput, StyleSheet, Linking } from 'react-native'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { C, s, SP, R, W, shadow, shadowMd } from '../../src/theme/index'
import { checkEP } from '../../shared/calculators'

export default function VisaScreen() {
  const router = useRouter()
  const [sal, setSal] = useState('')
  const ep = sal ? checkEP(parseFloat(sal)) : null

  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false}>

      {/* Visa-free banner — Grab style */}
      <View style={ls.visBanner}>
        <View style={ls.visBannerInner}>
          <Text style={{ fontSize:40 }}>🎉</Text>
          <View style={{ flex:1 }}>
            <View style={[s.pill, { backgroundColor:'rgba(255,255,255,0.25)', alignSelf:'flex-start', marginBottom:6 }]}>
              <Text style={[s.pillText, { color:'#fff' }]}>ACTIVE 2026</Text>
            </View>
            <Text style={ls.visTitle}>Indians VISA-FREE!</Text>
            <Text style={ls.visSub}>Valid until December 31, 2026</Text>
          </View>
        </View>
        <View style={ls.visActions}>
          <TouchableOpacity style={ls.visBtnPrimary}
            onPress={() => Linking.openURL('https://imigresen-online.imi.gov.my/mdac/main')}>
            <Ionicons name="phone-portrait-outline" size={16} color={C.primary} />
            <Text style={ls.visBtnPrimaryTxt}>Submit MDAC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ls.visBtnSec} onPress={() => router.push('/guide/tourist')}>
            <Text style={ls.visBtnSecTxt}>Full Guide →</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* EP Eligibility Checker */}
      <Text style={s.sectionHdr}>EP Eligibility Checker</Text>
      <View style={[s.inputGroup, { marginBottom:SP.sm }]}>
        <View style={[s.inputRow, { borderBottomWidth:0 }]}>
          <Text style={s.inputLabel}>Monthly Salary</Text>
          <Text style={[s.small, { marginRight:6, color:C.muted }]}>RM</Text>
          <TextInput style={s.input} value={sal} onChangeText={setSal}
            keyboardType="numeric" placeholder="e.g. 8000"
            placeholderTextColor={C.placeholder} returnKeyType="done" />
        </View>
      </View>

      {ep && (
        <View style={[s.card, { flexDirection:'row', alignItems:'center', gap:12, paddingHorizontal:SP.lg, paddingVertical:SP.lg, marginBottom:SP.sm }]}>
          <View style={[ls.epResultIcon, { backgroundColor: ep.eligible ? C.primary + '18' : C.danger + '15' }]}>
            <Text style={{ fontSize:24 }}>{ep.eligible ? '✅' : '❌'}</Text>
          </View>
          <View style={{ flex:1 }}>
            <Text style={[s.title, { color: ep.eligible ? C.primary : C.danger }]}>
              {ep.eligible ? ep.cat : 'Not Eligible'}
            </Text>
            <Text style={s.small}>{ep.note}</Text>
            {ep.eligible && <Text style={[s.small, { color:C.muted }]}>Max tenure: {ep.tenure} years</Text>}
          </View>
        </View>
      )}

      {/* EP 2026 categories */}
      <Text style={s.sectionHdr}>EP Salary Categories — June 2026</Text>
      <View style={s.card}>
        <View style={[ls.epWarnBanner, { backgroundColor:'#FFF4E5' }]}>
          <Ionicons name="warning" size={14} color={C.warning} />
          <Text style={{ fontSize:12, color:'#92400E', fontWeight:W.medium, marginLeft:6 }}>
            New minimums effective June 1, 2026
          </Text>
        </View>
        {[
          { cat:'Category I',         sal:'RM 20,000+', tenure:'10 years', c:C.purple  },
          { cat:'Category II',        sal:'RM 10,000+', tenure:'10 years', c:C.info    },
          { cat:'Category III',       sal:'RM 5,000+',  tenure:'5 years',  c:C.primary },
          { cat:'Manufacturing III',  sal:'RM 7,000+',  tenure:'5 years',  c:C.orange  },
        ].map((ep, i, arr) => (
          <View key={ep.cat} style={i < arr.length-1 ? s.row : s.rowLast}>
            <View style={[ls.catBadge, { backgroundColor: ep.c + '18' }]}>
              <Text style={{ fontSize:10, fontWeight:W.bold, color:ep.c }}>
                {ep.cat.replace('Category ', 'Cat. ')}
              </Text>
            </View>
            <View style={{ flex:1, marginLeft:10 }}>
              <Text style={[s.title, { color:ep.c }]}>{ep.sal}</Text>
              <Text style={s.small}>Max {ep.tenure}</Text>
            </View>
          </View>
        ))}
        <TouchableOpacity style={ls.guideLink} onPress={() => router.push('/guide/ep')}>
          <Text style={ls.guideLinkTxt}>View Full EP Guide →</Text>
          <Ionicons name="arrow-forward-circle" size={18} color={C.primary} />
        </TouchableOpacity>
      </View>

      {/* Other guides */}
      <Text style={s.sectionHdr}>Other Visa Types</Text>
      <View style={s.card}>
        {[
          { emoji:'✈️', label:'Flight Hub & Baggage',  sub:'Airport, baggage rules, carriers', route:'/guide/flights'  },
          { emoji:'🎓', label:'Student Pass',           sub:'EMGS process & documents',         route:'/guide/tourist'  },
          { emoji:'👨‍👩‍👧', label:'Dependent Pass',     sub:'Bring family to Malaysia',         route:'/guide/tourist'  },
          { emoji:'🗺️', label:'PR Roadmap',             sub:'Permanent residency pathway',      route:'/guide/pr-roadmap'},
        ].map((g, i, arr) => (
          <TouchableOpacity key={i} style={i < arr.length-1 ? s.row : s.rowLast}
            onPress={() => router.push(g.route)} activeOpacity={0.6}>
            <Text style={{ fontSize:20, width:30 }}>{g.emoji}</Text>
            <View style={{ flex:1, marginLeft:10 }}>
              <Text style={s.title}>{g.label}</Text>
              <Text style={s.small}>{g.sub}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={C.muted} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ height:40 }} />
    </ScrollView>
  )
}

const ls = StyleSheet.create({
  visBanner:      { backgroundColor:C.primary, paddingHorizontal:SP.lg, paddingTop:SP.xl, paddingBottom:SP.lg },
  visBannerInner: { flexDirection:'row', alignItems:'center', gap:14, marginBottom:SP.lg },
  visTitle:       { fontSize:20, fontWeight:W.bold, color:'#fff' },
  visSub:         { fontSize:13, color:'rgba(255,255,255,0.8)', marginTop:2 },
  visActions:     { flexDirection:'row', gap:SP.md },
  visBtnPrimary:  { flex:1, backgroundColor:'#fff', borderRadius:R.full, paddingVertical:11,
                    flexDirection:'row', alignItems:'center', justifyContent:'center', gap:6 },
  visBtnPrimaryTxt:{ fontSize:14, fontWeight:W.bold, color:C.primary },
  visBtnSec:      { flex:1, borderWidth:1.5, borderColor:'rgba(255,255,255,0.6)', borderRadius:R.full,
                    paddingVertical:11, alignItems:'center', justifyContent:'center' },
  visBtnSecTxt:   { fontSize:14, fontWeight:W.semibold, color:'#fff' },
  epResultIcon:   { width:52, height:52, borderRadius:R.xl, alignItems:'center', justifyContent:'center' },
  epWarnBanner:   { flexDirection:'row', alignItems:'center', paddingHorizontal:SP.lg, paddingVertical:SP.sm,
                    borderTopLeftRadius:R.xl, borderTopRightRadius:R.xl },
  catBadge:       { paddingHorizontal:8, paddingVertical:5, borderRadius:R.sm, minWidth:70, alignItems:'center' },
  guideLink:      { flexDirection:'row', alignItems:'center', justifyContent:'space-between',
                    paddingHorizontal:SP.lg, paddingVertical:SP.md },
  guideLinkTxt:   { fontSize:14, color:C.primary, fontWeight:W.semibold },
})
