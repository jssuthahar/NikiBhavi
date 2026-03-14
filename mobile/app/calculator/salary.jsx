import { useState, useMemo } from 'react'
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { calcPCB, MYR_INR } from '../../shared/calculators'
import { C, s, SP, R, W, shadowMd } from '../../src/theme/index'

const fmt  = n => 'RM ' + Math.round(n).toLocaleString()
const fmtI = n => '₹'  + Math.round(n * MYR_INR).toLocaleString()

export default function SalaryScreen() {
  const [myr,    setMyr]    = useState('')
  const [inrCtc, setInrCtc] = useState('')
  const [calculated, setCalculated] = useState(false)

  const myrNum = parseFloat(myr) || 0
  const inrNum = parseFloat(inrCtc) || 0
  const myrPCB = useMemo(() => calcPCB(myrNum), [myrNum])
  const inrTakeHome  = (inrNum / 12) * 0.78
  const takehomeINR  = myrPCB.takehome * MYR_INR
  const diff         = takehomeINR - inrTakeHome
  const canCalc      = myrNum > 0

  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom:40 }}>
      <Text style={s.sectionHdr}>Malaysia Offer</Text>
      <View style={s.inputGroup}>
        <View style={[s.inputRow, { borderBottomWidth:0 }]}>
          <Text style={s.inputLabel}>Monthly Gross</Text>
          <Text style={[s.small, { marginRight:6, color:C.muted }]}>RM</Text>
          <TextInput style={s.input} value={myr} onChangeText={t => { setMyr(t); setCalculated(false) }}
            keyboardType="numeric" placeholder="e.g. 8000" placeholderTextColor={C.placeholder} returnKeyType="done" />
        </View>
      </View>
      <Text style={s.sectionHdr}>India CTC (for comparison)</Text>
      <View style={s.inputGroup}>
        <View style={[s.inputRow, { borderBottomWidth:0 }]}>
          <Text style={s.inputLabel}>Annual CTC</Text>
          <Text style={[s.small, { marginRight:6, color:C.muted }]}>₹</Text>
          <TextInput style={s.input} value={inrCtc} onChangeText={t => { setInrCtc(t); setCalculated(false) }}
            keyboardType="numeric" placeholder="e.g. 1200000" placeholderTextColor={C.placeholder} returnKeyType="done" />
        </View>
      </View>
      <TouchableOpacity style={[s.btnPrimary, !canCalc && { opacity:0.45 }]}
        onPress={() => canCalc && setCalculated(true)} activeOpacity={0.8}>
        <Text style={s.btnText}>Compare Salaries</Text>
      </TouchableOpacity>
      {calculated && canCalc && (
        <>
          <View style={[ls.rc, { backgroundColor: diff >= 0 ? C.primary : C.orange }]}>
            <Text style={s.resultLabel}>Malaysia take-home (INR equiv.)</Text>
            <Text style={s.resultValue}>₹{Math.round(takehomeINR).toLocaleString()}/mo</Text>
            <Text style={s.resultSub}>{diff >= 0 ? `🇲🇾 Malaysia better by ₹${Math.round(diff).toLocaleString()}/mo` : `🇮🇳 India better by ₹${Math.round(-diff).toLocaleString()}/mo`}</Text>
          </View>
          <Text style={s.sectionHdr}>Malaysia Breakdown</Text>
          <View style={s.card}>
            {[
              ['Gross (MYR)',      fmt(myrPCB.gross),    C.label  ],
              ['EPF + PCB + SOCSO',`− ${fmt(myrPCB.totalDeductions)}`, C.danger],
              ['Take-home (MYR)',  fmt(myrPCB.takehome), C.primary],
              ['Take-home (INR)',  `₹${Math.round(takehomeINR).toLocaleString()}`, C.orange],
            ].map(([l,v,c],i,arr) => (
              <View key={l} style={i < arr.length-1 ? s.row : s.rowLast}>
                <Text style={[s.body,{flex:1}]}>{l}</Text>
                <Text style={[s.title,{color:c}]}>{v}</Text>
              </View>
            ))}
          </View>
          {inrNum > 0 && (
            <>
              <Text style={s.sectionHdr}>India Comparison</Text>
              <View style={s.card}>
                {[
                  ['Annual CTC',      `₹${Math.round(inrNum).toLocaleString()}`,         C.label ],
                  ['Monthly gross',   `₹${Math.round(inrNum/12).toLocaleString()}`,       C.label ],
                  ['Take-home (~78%)',`₹${Math.round(inrTakeHome).toLocaleString()}/mo`,  C.info  ],
                ].map(([l,v,c],i,arr) => (
                  <View key={l} style={i < arr.length-1 ? s.row : s.rowLast}>
                    <Text style={[s.body,{flex:1}]}>{l}</Text>
                    <Text style={[s.title,{color:c}]}>{v}</Text>
                  </View>
                ))}
              </View>
            </>
          )}
        </>
      )}
    </ScrollView>
  )
}
const ls = StyleSheet.create({ rc: { marginHorizontal:SP.lg, marginTop:SP.lg, borderRadius:R.xxl, padding:SP.xl, ...shadowMd } })
