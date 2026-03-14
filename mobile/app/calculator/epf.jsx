import { useState, useMemo } from 'react'
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { calcEPF, fmt, fmtI } from '../../shared/calculators'
import { C, s, SP, R, W, shadow, shadowMd } from '../../src/theme/index'

export default function EPFScreen() {
  const [salary, setSalary] = useState('')
  const [years,  setYears]  = useState('10')
  const [div,    setDiv]    = useState('5.5')
  const [calculated, setCalculated] = useState(false)

  const r = useMemo(() => calcEPF({
    monthlySalary: parseFloat(salary) || 0,
    years: parseInt(years) || 10,
    dividendRate: parseFloat(div) || 5.5,
  }), [salary, years, div])

  const canCalc = parseFloat(salary) > 0

  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom: 40 }}>

      {/* ── Inputs first ── */}
      <Text style={s.sectionHdr}>Your Details</Text>
      <View style={s.inputGroup}>
        {[
          { label:'Monthly Salary', value:salary, set:setSalary, prefix:'RM', ph:'e.g. 8000' },
          { label:'Years',          value:years,  set:setYears,  prefix:'',   ph:'10'        },
          { label:'Dividend Rate',  value:div,    set:setDiv,    prefix:'%',  ph:'5.5', last:true },
        ].map(f => (
          <View key={f.label} style={[s.inputRow, f.last && { borderBottomWidth:0 }]}>
            <Text style={s.inputLabel}>{f.label}</Text>
            {f.prefix ? <Text style={[s.small, { marginRight:6, color:C.muted }]}>{f.prefix}</Text> : null}
            <TextInput style={s.input} value={f.value} onChangeText={t => { f.set(t); setCalculated(false) }}
              keyboardType="numeric" placeholder={f.ph} placeholderTextColor={C.placeholder} returnKeyType="done" />
          </View>
        ))}
      </View>

      {/* ── Calculate button ── */}
      <TouchableOpacity style={[s.btnPrimary, !canCalc && { opacity:0.45 }]}
        onPress={() => canCalc && setCalculated(true)} activeOpacity={0.8}>
        <Text style={s.btnText}>Calculate EPF</Text>
      </TouchableOpacity>

      {/* ── Results (only after Calculate pressed) ── */}
      {calculated && canCalc && (
        <>
          {/* Result hero */}
          <View style={[ls.resultCard, { backgroundColor: C.info }]}>
            <Text style={s.resultLabel}>EPF Corpus after {years || 10} years</Text>
            <Text style={s.resultValue}>{fmt(r.corpus)}</Text>
            <Text style={s.resultSub}>{fmtI(r.corpus)} · Interest: {fmt(r.interest)}</Text>
          </View>

          <Text style={s.sectionHdr}>Monthly Contributions</Text>
          <View style={s.card}>
            {[
              ['Your contribution (11%)',     fmt(r.empMth),   C.primary],
              ['Employer contribution (12%)', fmt(r.errMth),   C.info   ],
              ['Total monthly',               fmt(r.totalMth), C.label  ],
              ['Total annual',                fmt(r.yearly),   C.label  ],
            ].map(([l,v,c], i, arr) => (
              <View key={l} style={i < arr.length-1 ? s.row : s.rowLast}>
                <Text style={[s.body, { flex:1 }]}>{l}</Text>
                <Text style={[s.title, { color:c }]}>{v}</Text>
              </View>
            ))}
          </View>

          <Text style={s.sectionHdr}>Projection Summary</Text>
          <View style={s.card}>
            {[
              ['Total contributed',  fmt(r.totalContrib), C.label  ],
              ['Interest earned',    fmt(r.interest),     C.primary],
              ['Final corpus (MYR)', fmt(r.corpus),       C.info   ],
              ['Final corpus (INR)', fmtI(r.corpus),      C.orange ],
            ].map(([l,v,c], i, arr) => (
              <View key={l} style={i < arr.length-1 ? s.row : s.rowLast}>
                <Text style={[s.body, { flex:1 }]}>{l}</Text>
                <Text style={[s.title, { color:c, fontWeight: i >= 2 ? W.bold : W.regular }]}>{v}</Text>
              </View>
            ))}
          </View>

          <View style={ls.tip}>
            <Ionicons name="bulb-outline" size={16} color={C.info} />
            <Text style={[ls.tipTxt, { flex:1 }]}>As a foreign national, you can withdraw your full EPF balance when permanently leaving Malaysia.</Text>
          </View>
        </>
      )}
    </ScrollView>
  )
}

const ls = StyleSheet.create({
  resultCard: { marginHorizontal:SP.lg, marginTop:SP.lg, borderRadius:R.xxl, padding:SP.xl, ...shadowMd },
  tip:        { flexDirection:'row', gap:8, marginHorizontal:SP.lg, backgroundColor:'#EBF5FF',
                borderRadius:R.xl, padding:SP.md, marginBottom:SP.md, alignItems:'flex-start' },
  tipTxt:     { fontSize:13, color:'#1a6fa8', lineHeight:19 },
})
