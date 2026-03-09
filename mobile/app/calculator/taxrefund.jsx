import { useState, useMemo } from 'react'
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { calcTaxRefund } from '../../shared/calculators'
import { C, s, SP, R, W, shadowMd, shadow } from '../../src/theme/index'

const RELIEFS = [
  { id:'self',       label:'Self & Dependents',     max:9000,  auto:true  },
  { id:'epf',        label:'EPF Contributions',     max:4000              },
  { id:'life_ins',   label:'Life Insurance',         max:3000              },
  { id:'medical_ins',label:'Medical Insurance',      max:4000              },
  { id:'medical',    label:'Medical Expenses',       max:10000             },
  { id:'checkup',    label:'Medical Checkup',        max:1000              },
  { id:'lifestyle',  label:'Lifestyle (phone/books)',max:2500              },
  { id:'edu',        label:'Education Fees',         max:7000              },
  { id:'upskill',    label:'Upskilling',             max:2000              },
  { id:'prs',        label:'PRS Retirement',         max:3000              },
  { id:'socso',      label:'SOCSO / EIS',            max:350               },
  { id:'sspn',       label:'SSPN Education Savings', max:8000              },
  { id:'domestic',   label:'Domestic Tourism',       max:1000              },
]

export default function TaxRefundScreen() {
  const [income,  setIncome]  = useState('')
  const [taxPaid, setTaxPaid] = useState('')
  const [values,  setValues]  = useState({ self:9000 })

  const setVal = (id, v) => {
    const relief = RELIEFS.find(r => r.id === id)
    setValues(p => ({ ...p, [id]: Math.min(relief?.max || 0, parseFloat(v) || 0) }))
  }

  const allValues   = { ...values, self:9000 }
  const totalRelief = RELIEFS.reduce((sum, r) => sum + (allValues[r.id] || 0), 0)

  const result = useMemo(() => {
    const ann = parseFloat(income) || 0
    if (!ann) return null
    return calcTaxRefund({ annualIncome:ann, totalRelief, taxPaidPCB: parseFloat(taxPaid)||0 })
  }, [income, taxPaid, totalRelief])

  const hasResult = !!result
  const isRefund  = hasResult && result.refund >= 0
  const heroColor = !hasResult ? '#F0FFF4' : isRefund ? C.primary : C.danger

  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

      {/* Hero result card */}
      <View style={[ls.heroCard, { backgroundColor: heroColor }]}>
        <Text style={[s.resultLabel, !hasResult && { color: '#666' }]}>
          {isRefund ? '🎉 Estimated Tax Refund' : hasResult ? '📋 Tax Balance Due' : 'Tax Refund Calculator'}
        </Text>
        <Text style={[s.resultValue, !hasResult && { color: '#1A1A1A' }]}>
          {hasResult ? `RM ${Math.abs(result.refund).toLocaleString()}` : '—'}
        </Text>
        <Text style={[s.resultSub, !hasResult && { color: '#666' }]}>
          {hasResult
            ? `Effective rate: ${result.effectiveRate}% · Chargeable: RM ${result.chargeableIncome.toLocaleString()}`
            : 'Enter your annual income below'}
        </Text>
      </View>

      {/* Income inputs */}
      <Text style={s.sectionHdr}>Income & Tax Paid</Text>
      <View style={s.inputGroup}>
        <View style={s.inputRow}>
          <Text style={s.inputLabel}>Annual Income</Text>
          <Text style={[s.small, { marginRight:6, color:C.muted }]}>RM</Text>
          <TextInput style={s.input} value={income} onChangeText={setIncome}
            keyboardType="numeric" placeholder="e.g. 96000"
            placeholderTextColor={C.placeholder} returnKeyType="done" />
        </View>
        <View style={[s.inputRow, { borderBottomWidth:0 }]}>
          <Text style={s.inputLabel}>PCB Paid (YTD)</Text>
          <Text style={[s.small, { marginRight:6, color:C.muted }]}>RM</Text>
          <TextInput style={s.input} value={taxPaid} onChangeText={setTaxPaid}
            keyboardType="numeric" placeholder="Check EA form"
            placeholderTextColor={C.placeholder} returnKeyType="done" />
        </View>
      </View>

      {/* Relief summary pill */}
      <View style={ls.reliefSummary}>
        <Text style={ls.reliefSummaryLabel}>Total Reliefs Entered</Text>
        <Text style={ls.reliefSummaryValue}>RM {totalRelief.toLocaleString()}</Text>
      </View>

      {/* Tax reliefs */}
      <Text style={s.sectionHdr}>Tax Reliefs (YA 2025)</Text>
      <View style={s.card}>
        {RELIEFS.map((r, i) => (
          <View key={r.id} style={[ls.reliefRow, i === RELIEFS.length-1 && { borderBottomWidth:0 }]}>
            <View style={{ flex:1, marginRight:SP.sm }}>
              <Text style={[s.body, { fontWeight:W.medium }]}>{r.label}</Text>
              <Text style={s.tiny}>Max RM {r.max.toLocaleString()}</Text>
            </View>
            {r.auto ? (
              <View style={[s.pill, { backgroundColor:C.primary+'18' }]}>
                <Text style={[s.pillText, { color:C.primary }]}>RM {r.max.toLocaleString()} ✅</Text>
              </View>
            ) : (
              <View style={ls.reliefInputWrap}>
                <Text style={ls.reliefPrefix}>RM</Text>
                <TextInput
                  style={ls.reliefInput}
                  value={values[r.id] ? values[r.id].toString() : ''}
                  onChangeText={v => setVal(r.id, v)}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor={C.placeholder}
                  returnKeyType="done" />
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Computation result */}
      {hasResult && (
        <>
          <Text style={s.sectionHdr}>Computation</Text>
          <View style={s.card}>
            {[
              ['Annual Income',      `RM ${result.grossIncome.toLocaleString()}`,      C.label  ],
              ['Total Reliefs',      `− RM ${result.totalRelief.toLocaleString()}`,    C.primary],
              ['Chargeable Income',  `RM ${result.chargeableIncome.toLocaleString()}`, C.label  ],
              ['Tax Payable',        `RM ${result.taxPayable.toLocaleString()}`,        C.danger ],
              ['PCB Paid',           `RM ${result.taxPaidPCB.toLocaleString()}`,        C.muted  ],
              [isRefund ? '🎉 Refund' : '📋 Balance Due',
                `RM ${Math.abs(result.refund).toLocaleString()}`,
                isRefund ? C.primary : C.danger],
            ].map(([l, v, c], i, arr) => (
              <View key={l} style={i < arr.length-1 ? s.row : s.rowLast}>
                <Text style={[s.body, { flex:1 }]}>{l}</Text>
                <Text style={[s.title, { color:c, fontWeight: i === arr.length-1 ? W.bold : W.regular }]}>{v}</Text>
              </View>
            ))}
          </View>
        </>
      )}

      {/* Filing tip */}
      <View style={ls.tip}>
        <Text style={ls.tipTitle}>💡 File by April 30 at mytax.hasil.gov.my</Text>
        <Text style={s.small}>
          Tax residents (182+ days in Malaysia) must file Form BE annually.
          Refund arrives in 30–90 days after submission.
        </Text>
      </View>

      <View style={{ height:40 }} />
    </ScrollView>
  )
}

const ls = StyleSheet.create({
  heroCard:         { marginHorizontal:SP.lg, marginTop:SP.lg, borderRadius:R.xxl, padding:SP.xl, ...shadowMd },
  reliefSummary:    { marginHorizontal:SP.lg, backgroundColor:C.primary, borderRadius:R.xl,
                      paddingHorizontal:SP.lg, paddingVertical:SP.md, flexDirection:'row',
                      alignItems:'center', justifyContent:'space-between', marginBottom:SP.sm },
  reliefSummaryLabel:{ fontSize:14, fontWeight:W.medium, color:'rgba(255,255,255,0.85)' },
  reliefSummaryValue:{ fontSize:18, fontWeight:W.bold, color:'#fff' },
  reliefRow:        { flexDirection:'row', alignItems:'center', paddingHorizontal:SP.lg,
                      paddingVertical:12, borderBottomWidth:StyleSheet.hairlineWidth, borderBottomColor:'#EEEEEE' },
  reliefInputWrap:  { flexDirection:'row', alignItems:'center', backgroundColor:'#F5F5F5',
                      borderRadius:R.lg, paddingHorizontal:10, paddingVertical:6, minWidth:90 },
  reliefPrefix:     { fontSize:12, color:C.muted, marginRight:4, fontWeight:W.medium },
  reliefInput:      { fontSize:15, color:C.label, minWidth:60, textAlign:'right', paddingVertical:0 },
  tip:              { marginHorizontal:SP.lg, backgroundColor:'#FFFBEB', borderRadius:R.xl, padding:SP.lg, marginBottom:SP.md },
  tipTitle:         { fontSize:14, fontWeight:W.bold, color:'#92400E', marginBottom:4 },
})
