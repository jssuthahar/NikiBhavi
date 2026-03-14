import { useState, useMemo } from 'react'
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { calcPCB, fmt } from '../../shared/calculators'
import { C, s, SP, R, W, shadowMd } from '../../src/theme/index'

const KL_AREAS = [
  { area:'Brickfields',   range:'RM 1,200–2,500', note:'Little India, great Tamil food'   },
  { area:'Cheras',        range:'RM 900–1,800',   note:'Affordable, big Indian community' },
  { area:'Petaling Jaya', range:'RM 1,500–3,500', note:'Family-friendly, good schools'    },
  { area:'Subang Jaya',   range:'RM 1,200–2,500', note:'Tech companies nearby'            },
  { area:'Bangsar',       range:'RM 2,500–5,000', note:'Upscale, expat-friendly'          },
  { area:'Mont Kiara',    range:'RM 3,000–8,000', note:'Premium, international schools'   },
]

export default function RentCalcScreen() {
  const [income, setIncome] = useState('')
  const [rent,   setRent]   = useState('')
  const [calculated, setCalculated] = useState(false)

  const gross     = parseFloat(income) || 0
  const rentAmt   = parseFloat(rent) || 0
  const pcb       = useMemo(() => calcPCB(gross), [gross])
  const affordMax = pcb.takehome * 0.30
  const rentRatio = pcb.takehome > 0 ? (rentAmt / pcb.takehome) * 100 : 0
  const statusColor = rentRatio <= 25 ? C.primary : rentRatio <= 33 ? C.warning : C.danger
  const canCalc   = gross > 0

  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom:40 }}>
      <Text style={s.sectionHdr}>Your Details</Text>
      <View style={s.inputGroup}>
        {[
          { label:'Monthly Salary', value:income, set:setIncome, prefix:'RM', ph:'e.g. 8000' },
          { label:'Monthly Rent',   value:rent,   set:setRent,   prefix:'RM', ph:'e.g. 1800', last:true },
        ].map(f => (
          <View key={f.label} style={[s.inputRow, f.last && { borderBottomWidth:0 }]}>
            <Text style={s.inputLabel}>{f.label}</Text>
            <Text style={[s.small, { marginRight:6, color:C.muted }]}>{f.prefix}</Text>
            <TextInput style={s.input} value={f.value} onChangeText={t => { f.set(t); setCalculated(false) }}
              keyboardType="numeric" placeholder={f.ph} placeholderTextColor={C.placeholder} returnKeyType="done" />
          </View>
        ))}
      </View>
      <TouchableOpacity style={[s.btnPrimary, !canCalc && { opacity:0.45 }]}
        onPress={() => canCalc && setCalculated(true)} activeOpacity={0.8}>
        <Text style={s.btnText}>Check Affordability</Text>
      </TouchableOpacity>
      {calculated && canCalc && (
        <>
          <View style={[ls.rc, { backgroundColor:'#D97706' }]}>
            <Text style={s.resultLabel}>Max Affordable Rent (30% rule)</Text>
            <Text style={s.resultValue}>{fmt(affordMax)}</Text>
            <Text style={s.resultSub}>Take-home: {fmt(pcb.takehome)}/mo</Text>
          </View>
          {rentAmt > 0 && (
            <>
              <Text style={s.sectionHdr}>Your Rent Analysis</Text>
              <View style={s.card}>
                {[
                  ['Rent amount',    fmt(rentAmt),         statusColor],
                  ['% of take-home', `${rentRatio.toFixed(1)}%`, statusColor],
                  ['Max 30% budget', fmt(affordMax),       C.primary  ],
                  ['Remaining',      fmt(pcb.takehome - rentAmt), C.label],
                ].map(([l,v,c],i,arr) => (
                  <View key={l} style={i < arr.length-1 ? s.row : s.rowLast}>
                    <Text style={[s.body,{flex:1}]}>{l}</Text>
                    <Text style={[s.title,{color:c}]}>{v}</Text>
                  </View>
                ))}
              </View>
            </>
          )}
          <Text style={s.sectionHdr}>KL Rental Guide</Text>
          <View style={[s.card, { paddingVertical:0 }]}>
            {KL_AREAS.map((a, i) => (
              <View key={a.area} style={i < KL_AREAS.length-1 ? s.row : s.rowLast}>
                <View style={{ flex:1 }}>
                  <Text style={s.title}>{a.area}</Text>
                  <Text style={s.small}>{a.note}</Text>
                </View>
                <Text style={[s.small, { color:C.primary, fontWeight:W.bold }]}>{a.range}</Text>
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  )
}
const ls = StyleSheet.create({ rc: { marginHorizontal:SP.lg, marginTop:SP.lg, borderRadius:R.xxl, padding:SP.xl, ...shadowMd } })
