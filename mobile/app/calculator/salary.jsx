import { useState, useMemo } from 'react'
import { ScrollView, View, Text, TextInput, StyleSheet } from 'react-native'
import { calcPCB, MYR_INR } from '../../shared/calculators'
import { C, s, SP, R, W, shadowMd } from '../../src/theme/index'

const fmt  = n => 'RM ' + Math.round(n).toLocaleString()
const fmtI = n => '₹'  + Math.round(n).toLocaleString()

export default function SalaryScreen() {
  const [myr,    setMyr]    = useState('')
  const [inrCtc, setInrCtc] = useState('')

  const myrNum = parseFloat(myr) || 0
  const inrNum = parseFloat(inrCtc) || 0

  const myrPCB    = useMemo(() => calcPCB(myrNum), [myrNum])
  const inrMonthly = inrNum / 12
  const inrTakeHome = inrMonthly * 0.78  // rough ~22% tax+PF in India

  const myrInINR   = myrNum * MYR_INR
  const takehomeINR = myrPCB.takehome * MYR_INR

  const hasResult = myrNum > 0 || inrNum > 0

  const diff = takehomeINR - inrTakeHome
  const better = diff > 0 ? 'Malaysia' : 'India'

  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

      <View style={[ls.heroCard, { backgroundColor: hasResult ? C.teal : '#F0FFF4' }]}>
        <Text style={[s.resultLabel, !hasResult && { color: '#666' }]}>Malaysia take-home in INR</Text>
        <Text style={[s.resultValue, !hasResult && { color: '#1A1A1A' }]}>{hasResult ? fmtI(takehomeINR) : '—'}</Text>
        <Text style={[s.resultSub, !hasResult && { color: '#666' }]}>{hasResult ? `vs India take-home: ${fmtI(inrTakeHome)}` : 'Enter both salaries below'}</Text>
      </View>

      <Text style={s.sectionHdr}>Malaysia Offer</Text>
      <View style={s.inputGroup}>
        <View style={[s.inputRow, { borderBottomWidth:0 }]}>
          <Text style={s.inputLabel}>Monthly Gross</Text>
          <Text style={[s.small, { marginRight:6, color:C.muted }]}>RM</Text>
          <TextInput style={s.input} value={myr} onChangeText={setMyr}
            keyboardType="numeric" placeholder="e.g. 8000"
            placeholderTextColor={C.placeholder} returnKeyType="done" />
        </View>
      </View>

      <Text style={s.sectionHdr}>India CTC (for comparison)</Text>
      <View style={s.inputGroup}>
        <View style={[s.inputRow, { borderBottomWidth:0 }]}>
          <Text style={s.inputLabel}>Annual CTC</Text>
          <Text style={[s.small, { marginRight:6, color:C.muted }]}>₹</Text>
          <TextInput style={s.input} value={inrCtc} onChangeText={setInrCtc}
            keyboardType="numeric" placeholder="e.g. 1500000"
            placeholderTextColor={C.placeholder} returnKeyType="done" />
        </View>
      </View>

      {hasResult && myrNum > 0 && (
        <>
          <Text style={s.sectionHdr}>Malaysia Breakdown</Text>
          <View style={s.card}>
            {[
              ['Gross (MYR)',       fmt(myrPCB.gross),     C.label  ],
              ['Gross (INR equiv)', fmtI(myrInINR),        C.teal   ],
              ['EPF (11%)',         fmt(myrPCB.epf),        C.info   ],
              ['PCB Tax',           fmt(myrPCB.pcb),        C.danger ],
              ['Take-Home (MYR)',   fmt(myrPCB.takehome),   C.primary],
              ['Take-Home (INR)',   fmtI(takehomeINR),      C.orange ],
            ].map(([l,v,c], i, arr) => (
              <View key={l} style={i < arr.length-1 ? s.row : s.rowLast}>
                <Text style={[s.body, { flex:1 }]}>{l}</Text>
                <Text style={[s.title, { color:c }]}>{v}</Text>
              </View>
            ))}
          </View>
        </>
      )}

      {hasResult && inrNum > 0 && myrNum > 0 && (
        <>
          <Text style={s.sectionHdr}>Comparison</Text>
          <View style={[ls.compCard, { borderColor: diff > 0 ? C.primary : C.danger }]}>
            <Text style={[ls.compTitle, { color: diff > 0 ? C.primary : C.danger }]}>
              {better} offer is better by {fmtI(Math.abs(diff))}/mo
            </Text>
            <View style={s.row}>
              <Text style={[s.body, { flex:1 }]}>🇲🇾 Malaysia take-home</Text>
              <Text style={[s.title, { color:C.primary }]}>{fmtI(takehomeINR)}/mo</Text>
            </View>
            <View style={s.rowLast}>
              <Text style={[s.body, { flex:1 }]}>🇮🇳 India take-home (est)</Text>
              <Text style={[s.title, { color:C.info }]}>{fmtI(inrTakeHome)}/mo</Text>
            </View>
          </View>
          <Text style={[s.small, { paddingHorizontal:SP.lg, color:C.muted, marginBottom:SP.lg }]}>
            * India estimate: ~22% deductions (PF + tax). Actual may vary.
          </Text>
        </>
      )}
      <View style={{ height:40 }} />
    </ScrollView>
  )
}

const ls = StyleSheet.create({
  heroCard: { marginHorizontal:SP.lg, marginTop:SP.lg, borderRadius:R.xxl, padding:SP.xl, ...shadowMd },
  compCard: { marginHorizontal:SP.lg, borderRadius:R.xl, borderWidth:2, backgroundColor:'#fff', overflow:'hidden', marginBottom:SP.md },
  compTitle:{ fontSize:15, fontWeight:W.bold, paddingHorizontal:SP.lg, paddingTop:SP.md },
})
