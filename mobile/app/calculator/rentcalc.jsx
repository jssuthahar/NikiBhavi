import { useState, useMemo } from 'react'
import { ScrollView, View, Text, TextInput, StyleSheet } from 'react-native'
import { calcPCB, fmt } from '../../shared/calculators'
import { C, s, SP, R, W, shadowMd } from '../../src/theme/index'

export default function RentCalcScreen() {
  const [income, setIncome] = useState('')
  const [rent,   setRent]   = useState('')

  const gross    = parseFloat(income) || 0
  const rentAmt  = parseFloat(rent)   || 0
  const pcb      = useMemo(() => calcPCB(gross), [gross])
  const rentRatio = pcb.takehome > 0 ? (rentAmt / pcb.takehome) * 100 : 0
  const affordMax = pcb.takehome * 0.30
  const status    = rentRatio <= 25 ? 'great' : rentRatio <= 33 ? 'ok' : 'high'
  const statusColor = status === 'great' ? C.primary : status === 'ok' ? C.warning : C.danger

  const hasResult = gross > 0

  const KL_AREAS = [
    { area:'Brickfields',    range:'RM 1,200–2,500', note:'Little India, great Tamil food'     },
    { area:'Cheras',         range:'RM 900–1,800',   note:'Affordable, big Indian community'   },
    { area:'Petaling Jaya',  range:'RM 1,500–3,500', note:'Family-friendly, good schools'      },
    { area:'Subang Jaya',    range:'RM 1,200–2,500', note:'Tech companies nearby'              },
    { area:'Bangsar',        range:'RM 2,500–5,000', note:'Upscale, expat-friendly'            },
    { area:'Mont Kiara',     range:'RM 3,000–8,000', note:'Premium, international schools'     },
  ]

  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

      <View style={[ls.heroCard, { backgroundColor: hasResult ? '#D97706' : '#FFFBEB' }]}>
        <Text style={[s.resultLabel, !hasResult && { color: '#666' }]}>Max Affordable Rent (30% rule)</Text>
        <Text style={[s.resultValue, !hasResult && { color: '#1A1A1A' }]}>{hasResult ? fmt(affordMax) : '—'}</Text>
        <Text style={[s.resultSub, !hasResult && { color: '#666' }]}>{hasResult ? `Take-home: ${fmt(pcb.takehome)}/mo` : 'Enter your salary below'}</Text>
      </View>

      <Text style={s.sectionHdr}>Your Details</Text>
      <View style={s.inputGroup}>
        {[
          { label:'Monthly Gross',  value:income, set:setIncome, placeholder:'e.g. 8000' },
          { label:'Current Rent',   value:rent,   set:setRent,   placeholder:'e.g. 1500', last:true },
        ].map((f) => (
          <View key={f.label} style={[s.inputRow, f.last && { borderBottomWidth:0 }]}>
            <Text style={s.inputLabel}>{f.label}</Text>
            <Text style={[s.small, { marginRight:6, color:C.muted }]}>RM</Text>
            <TextInput style={s.input} value={f.value} onChangeText={f.set}
              keyboardType="numeric" placeholder={f.placeholder}
              placeholderTextColor={C.placeholder} returnKeyType="done" />
          </View>
        ))}
      </View>

      {hasResult && rentAmt > 0 && (
        <>
          <Text style={s.sectionHdr}>Rent Analysis</Text>
          <View style={[s.card, { paddingHorizontal:SP.lg, paddingVertical:SP.lg }]}>
            <View style={[s.between, { marginBottom:SP.md }]}>
              <Text style={s.title}>Rent-to-income ratio</Text>
              <Text style={[ls.ratioBig, { color:statusColor }]}>{rentRatio.toFixed(0)}%</Text>
            </View>
            <View style={ls.ratioBar}>
              <View style={[ls.ratioFill, { width:`${Math.min(100,rentRatio)}%`, backgroundColor:statusColor }]} />
            </View>
            <Text style={[s.small, { marginTop:8, color:statusColor }]}>
              {status === 'great' ? '✅ Great! Well within budget' : status === 'ok' ? '⚠️ Acceptable but watch expenses' : '❌ Too high — consider cheaper area or raise'}
            </Text>
          </View>
        </>
      )}

      <Text style={s.sectionHdr}>KL Areas for Indians</Text>
      <View style={s.card}>
        {KL_AREAS.map((a, i) => (
          <View key={a.area} style={i < KL_AREAS.length-1 ? s.row : s.rowLast}>
            <View style={{ flex:1 }}>
              <Text style={s.title}>{a.area}</Text>
              <Text style={s.small}>{a.note}</Text>
            </View>
            <View style={[s.pill]}>
              <Text style={s.pillText}>{a.range}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={{ height:40 }} />
    </ScrollView>
  )
}

const ls = StyleSheet.create({
  heroCard:  { marginHorizontal:SP.lg, marginTop:SP.lg, borderRadius:R.xxl, padding:SP.xl, ...shadowMd },
  ratioBig:  { fontSize:28, fontWeight:W.bold },
  ratioBar:  { height:8, backgroundColor:'#EEE', borderRadius:4, overflow:'hidden' },
  ratioFill: { height:8, borderRadius:4 },
})
