import { useState, useMemo } from 'react'
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { calcCarLoan, fmt } from '../../shared/calculators'
import { C, s, SP, R, W, shadowMd } from '../../src/theme/index'

export default function CarLoanScreen() {
  const [price, setPrice] = useState('')
  const [down,  setDown]  = useState('10')
  const [rate,  setRate]  = useState('3.0')
  const [years, setYears] = useState('7')
  const [calculated, setCalculated] = useState(false)

  const r = useMemo(() => calcCarLoan({
    price: parseFloat(price) || 0, downPct: parseFloat(down) || 10,
    ratePA: parseFloat(rate) || 3.0, years: parseInt(years) || 7,
  }), [price, down, rate, years])

  const canCalc = parseFloat(price) > 0

  const fields = [
    { label:'Car Price',     value:price, set:setPrice, prefix:'RM',  ph:'e.g. 80000' },
    { label:'Down Payment',  value:down,  set:setDown,  prefix:'%',   ph:'10'         },
    { label:'Interest Rate', value:rate,  set:setRate,  prefix:'%',   ph:'3.0'        },
    { label:'Loan Period',   value:years, set:setYears, prefix:'yrs', ph:'7', last:true },
  ]

  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom:40 }}>
      <Text style={s.sectionHdr}>Car Details</Text>
      <View style={s.inputGroup}>
        {fields.map(f => (
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
        <Text style={s.btnText}>Calculate Car Loan</Text>
      </TouchableOpacity>
      {calculated && canCalc && (
        <>
          <View style={[ls.rc, { backgroundColor:C.orange }]}>
            <Text style={s.resultLabel}>Monthly Instalment (EMI)</Text>
            <Text style={s.resultValue}>{fmt(r.monthly)}</Text>
            <Text style={s.resultSub}>Total: {fmt(r.totalPay)} · Interest: {fmt(r.totalInterest)}</Text>
          </View>
          <Text style={s.sectionHdr}>Loan Breakdown</Text>
          <View style={s.card}>
            {[
              ['Loan Amount',     fmt(r.loanAmt),      C.label  ],
              ['Monthly EMI',     fmt(r.monthly),      C.orange ],
              ['Total Payment',   fmt(r.totalPay),     C.label  ],
              ['Total Interest',  fmt(r.totalInterest),C.danger ],
              ['Down Payment',    fmt(r.downAmt),      C.primary],
            ].map(([l,v,c],i,arr) => (
              <View key={l} style={i < arr.length-1 ? s.row : s.rowLast}>
                <Text style={[s.body,{flex:1}]}>{l}</Text>
                <Text style={[s.title,{color:c}]}>{v}</Text>
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  )
}
const ls = StyleSheet.create({ rc: { marginHorizontal:SP.lg, marginTop:SP.lg, borderRadius:R.xxl, padding:SP.xl, ...shadowMd } })
