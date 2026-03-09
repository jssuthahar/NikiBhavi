import { useState, useMemo } from 'react'
import { ScrollView, View, Text, TextInput, StyleSheet } from 'react-native'
import { calcCarLoan, fmt } from '../../shared/calculators'
import { C, s, SP, R, W, shadowMd } from '../../src/theme/index'

export default function CarLoanScreen() {
  const [price, setPrice] = useState('')
  const [down,  setDown]  = useState('10')
  const [rate,  setRate]  = useState('3.0')
  const [years, setYears] = useState('7')

  const r = useMemo(() => calcCarLoan({
    price: parseFloat(price) || 0,
    downPct: parseFloat(down) || 10,
    ratePA:  parseFloat(rate) || 3.0,
    years:   parseInt(years) || 7,
  }), [price, down, rate, years])

  const hasResult = parseFloat(price) > 0

  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

      <View style={[ls.heroCard, { backgroundColor: hasResult ? C.orange : '#F0FFF4' }]}>
        <Text style={[s.resultLabel, !hasResult && { color: '#666' }]}>Monthly Instalment (EMI)</Text>
        <Text style={[s.resultValue, !hasResult && { color: '#1A1A1A' }]}>{hasResult ? fmt(r.monthly) : '—'}</Text>
        <Text style={[s.resultSub, !hasResult && { color: '#666' }]}>{hasResult ? `Total: ${fmt(r.totalPay)} · Interest: ${fmt(r.totalInterest)}` : 'Enter car price below'}</Text>
      </View>

      <Text style={s.sectionHdr}>Car Details</Text>
      <View style={s.inputGroup}>
        {[
          { label:'Car Price',      value:price, set:setPrice, prefix:'RM', placeholder:'e.g. 80000'  },
          { label:'Down Payment',   value:down,  set:setDown,  prefix:'%',  placeholder:'10'           },
          { label:'Interest Rate',  value:rate,  set:setRate,  prefix:'%',  placeholder:'3.0'          },
          { label:'Loan Period',    value:years, set:setYears, prefix:'yrs',placeholder:'7', last:true },
        ].map((f, i) => (
          <View key={f.label} style={[s.inputRow, f.last && { borderBottomWidth:0 }]}>
            <Text style={s.inputLabel}>{f.label}</Text>
            <Text style={[s.small, { marginRight:6, color:C.muted }]}>{f.prefix}</Text>
            <TextInput style={s.input} value={f.value} onChangeText={f.set}
              keyboardType="numeric" placeholder={f.placeholder}
              placeholderTextColor={C.placeholder} returnKeyType="done" />
          </View>
        ))}
      </View>

      {hasResult && (
        <>
          <Text style={s.sectionHdr}>Loan Breakdown</Text>
          <View style={s.card}>
            {[
              ['Car Price',       fmt(r.price),         C.label  ],
              ['Down Payment',    fmt(r.downAmt),        C.orange ],
              ['Loan Amount',     fmt(r.loan),           C.danger ],
              ['Monthly EMI',     fmt(r.monthly),        C.primary],
              ['Total Payment',   fmt(r.totalPay),       C.label  ],
              ['Total Interest',  fmt(r.totalInterest),  C.danger ],
            ].map(([l,v,c], i, arr) => (
              <View key={l} style={i < arr.length-1 ? s.row : s.rowLast}>
                <Text style={[s.body, { flex:1 }]}>{l}</Text>
                <Text style={[s.title, { color:c }]}>{v}</Text>
              </View>
            ))}
          </View>

          <Text style={s.sectionHdr}>Annual Costs</Text>
          <View style={s.card}>
            {[
              ['Road Tax (est.)',  fmt(r.roadTax),   C.orange],
              ['Insurance (est.)', fmt(r.insurance), C.danger],
              ['Total annual cost',fmt(r.roadTax + r.insurance), C.label],
            ].map(([l,v,c], i, arr) => (
              <View key={l} style={i < arr.length-1 ? s.row : s.rowLast}>
                <Text style={[s.body, { flex:1 }]}>{l}</Text>
                <Text style={[s.title, { color:c }]}>{v}</Text>
              </View>
            ))}
          </View>
        </>
      )}
      <View style={{ height:40 }} />
    </ScrollView>
  )
}

const ls = StyleSheet.create({
  heroCard: { marginHorizontal:SP.lg, marginTop:SP.lg, borderRadius:R.xxl, padding:SP.xl, ...shadowMd },
})
