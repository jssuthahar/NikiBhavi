import { useState, useMemo } from 'react'
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { calcHomeLoan, fmt } from '../../shared/calculators'
import { C, s, SP, R, W, shadowMd } from '../../src/theme/index'

export default function HomeLoanScreen() {
  const [price,  setPrice]  = useState('')
  const [income, setIncome] = useState('')
  const [years,  setYears]  = useState('30')
  const [rate,   setRate]   = useState('4.25')
  const [calculated, setCalculated] = useState(false)

  const r = useMemo(() => calcHomeLoan({
    price: parseFloat(price)||0, income: parseFloat(income)||0,
    years: parseInt(years)||30, ratePA: parseFloat(rate)||4.25,
  }), [price, income, years, rate])

  const canCalc = parseFloat(price) > 0

  const fields = [
    { label:'Property Price', value:price,  set:setPrice,  prefix:'RM',  ph:'e.g. 500000' },
    { label:'Monthly Income', value:income, set:setIncome, prefix:'RM',  ph:'e.g. 8000'   },
    { label:'Loan Period',    value:years,  set:setYears,  prefix:'yrs', ph:'30'           },
    { label:'Interest Rate',  value:rate,   set:setRate,   prefix:'%',   ph:'4.25', last:true },
  ]

  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom:40 }}>
      <Text style={s.sectionHdr}>Property Details</Text>
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
        <Text style={s.btnText}>Calculate Home Loan</Text>
      </TouchableOpacity>
      {calculated && canCalc && (
        <>
          <View style={[ls.rc, { backgroundColor: r.eligible ? C.teal : C.danger }]}>
            <Text style={s.resultLabel}>Monthly Repayment</Text>
            <Text style={s.resultValue}>{fmt(r.monthly)}</Text>
            <Text style={s.resultSub}>DSR: {r.dsr}% · {r.eligible ? '✅ Eligible' : '❌ DSR too high'}</Text>
          </View>
          <Text style={s.sectionHdr}>Loan Summary</Text>
          <View style={s.card}>
            {[
              ['Loan Amount (90%)',  fmt(r.loanAmt),      C.label  ],
              ['Monthly Repayment', fmt(r.monthly),       C.teal   ],
              ['Total Payment',     fmt(r.totalPay),      C.label  ],
              ['Total Interest',    fmt(r.totalInterest), C.danger ],
              ['DSR Ratio',         `${r.dsr}%`,          r.dsr < 40 ? C.primary : C.danger],
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
