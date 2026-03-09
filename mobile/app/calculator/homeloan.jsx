import { useState, useMemo } from 'react'
import { ScrollView, View, Text, TextInput, StyleSheet } from 'react-native'
import { calcHomeLoan, fmt } from '../../shared/calculators'
import { C, s, SP, R, W, shadowMd } from '../../src/theme/index'

export default function HomeLoanScreen() {
  const [price,  setPrice]  = useState('')
  const [income, setIncome] = useState('')
  const [years,  setYears]  = useState('30')
  const [rate,   setRate]   = useState('4.25')

  const r = useMemo(() => calcHomeLoan({
    price:  parseFloat(price)  || 0,
    income: parseFloat(income) || 0,
    years:  parseInt(years)    || 30,
    ratePA: parseFloat(rate)   || 4.25,
  }), [price, income, years, rate])

  const hasResult = parseFloat(price) > 0
  const dsrColor  = !hasResult ? C.muted : r.dsr < 40 ? C.primary : r.dsr < 65 ? C.warning : C.danger

  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

      <View style={[ls.heroCard, { backgroundColor: hasResult ? C.teal : '#F0FFF4' }]}>
        <Text style={[s.resultLabel, !hasResult && { color: '#666' }]}>Monthly Repayment</Text>
        <Text style={[s.resultValue, !hasResult && { color: '#1A1A1A' }]}>{hasResult ? fmt(r.monthly) : '—'}</Text>
        <Text style={[s.resultSub, !hasResult && { color: '#666' }]}>{hasResult ? `DSR: ${r.dsr}% · ${r.eligible ? '✅ Eligible' : '❌ DSR too high'}` : 'Enter property price below'}</Text>
      </View>

      <Text style={s.sectionHdr}>Property Details</Text>
      <View style={s.inputGroup}>
        {[
          { label:'Property Price',  value:price,  set:setPrice,  prefix:'RM',  placeholder:'e.g. 500000'  },
          { label:'Monthly Income',  value:income, set:setIncome, prefix:'RM',  placeholder:'e.g. 8000'    },
          { label:'Loan Period',     value:years,  set:setYears,  prefix:'yrs', placeholder:'30'           },
          { label:'Interest Rate',   value:rate,   set:setRate,   prefix:'%',   placeholder:'4.25', last:true },
        ].map((f) => (
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
          <Text style={s.sectionHdr}>Loan Summary</Text>
          <View style={s.card}>
            {[
              ['Property Price',   fmt(r.price),    C.label ],
              ['Down Payment (10%)',fmt(r.down),     C.teal  ],
              ['Loan Amount (90%)', fmt(r.loan),     C.danger],
              ['Monthly Payment',  fmt(r.monthly),  C.primary],
              ['Total Payment',    fmt(r.totalPay), C.label ],
              ['Total Interest',   fmt(r.interest), C.danger],
            ].map(([l,v,c], i, arr) => (
              <View key={l} style={i < arr.length-1 ? s.row : s.rowLast}>
                <Text style={[s.body, { flex:1 }]}>{l}</Text>
                <Text style={[s.title, { color:c }]}>{v}</Text>
              </View>
            ))}
          </View>

          {income && (
            <>
              <Text style={s.sectionHdr}>DSR Check (Debt Service Ratio)</Text>
              <View style={[s.card, { paddingHorizontal:SP.lg, paddingVertical:SP.lg }]}>
                <View style={[s.between, { marginBottom:SP.md }]}>
                  <Text style={s.title}>Your DSR</Text>
                  <Text style={[ls.dsrBig, { color:dsrColor }]}>{r.dsr}%</Text>
                </View>
                <View style={ls.dsrBar}>
                  <View style={[ls.dsrFill, { width:`${Math.min(100,r.dsr)}%`, backgroundColor:dsrColor }]} />
                  <View style={ls.dsrLimit} />
                </View>
                <Text style={[s.small, { marginTop:8, color:dsrColor }]}>
                  {r.eligible ? '✅ Within bank limits (max 65%)' : '❌ Too high — reduce price or increase income'}
                </Text>
              </View>
            </>
          )}
        </>
      )}
      <View style={{ height:40 }} />
    </ScrollView>
  )
}

const ls = StyleSheet.create({
  heroCard: { marginHorizontal:SP.lg, marginTop:SP.lg, borderRadius:R.xxl, padding:SP.xl, ...shadowMd },
  dsrBig:   { fontSize:28, fontWeight:W.bold },
  dsrBar:   { height:8, backgroundColor:'#EEE', borderRadius:4, overflow:'hidden', position:'relative' },
  dsrFill:  { height:8, borderRadius:4 },
  dsrLimit: { position:'absolute', right:'35%', top:0, width:2, height:8, backgroundColor:'#333' },
})
