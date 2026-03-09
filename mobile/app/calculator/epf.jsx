import { useState, useMemo } from 'react'
import { ScrollView, View, Text, TextInput, StyleSheet } from 'react-native'
import { calcEPF, fmt, fmtI } from '../../shared/calculators'
import { C, s, SP, R, W, shadowMd } from '../../src/theme/index'

export default function EPFScreen() {
  const [salary, setSalary]   = useState('')
  const [years,  setYears]    = useState('10')
  const [div,    setDiv]      = useState('5.5')

  const r = useMemo(() => calcEPF({
    monthlySalary: parseFloat(salary) || 0,
    years: parseInt(years) || 10,
    dividendRate: parseFloat(div) || 5.5,
  }), [salary, years, div])

  const hasResult = parseFloat(salary) > 0

  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

      <View style={[ls.heroCard, { backgroundColor: hasResult ? C.info : '#F0FFF4' }]}>
        <Text style={[s.resultLabel, !hasResult && { color: '#666' }]}>EPF Corpus after {years || 10} years</Text>
        <Text style={[s.resultValue, !hasResult && { color: '#1A1A1A' }]}>{hasResult ? fmt(r.corpus) : '—'}</Text>
        <Text style={[s.resultSub, !hasResult && { color: '#666' }]}>{hasResult ? `${fmtI(r.corpus)} · Interest earned: ${fmt(r.interest)}` : 'Enter salary below'}</Text>
      </View>

      <Text style={s.sectionHdr}>Your Details</Text>
      <View style={s.inputGroup}>
        {[
          { label:'Monthly Salary', value:salary, onChange:setSalary, prefix:'RM', placeholder:'e.g. 8000' },
          { label:'Years',          value:years,  onChange:setYears,  prefix:'',  placeholder:'10'         },
          { label:'Dividend Rate',  value:div,    onChange:setDiv,    prefix:'%', placeholder:'5.5', last:true },
        ].map((f, i) => (
          <View key={f.label} style={[s.inputRow, f.last && { borderBottomWidth:0 }]}>
            <Text style={s.inputLabel}>{f.label}</Text>
            {f.prefix ? <Text style={[s.small, { marginRight:6, color:C.muted }]}>{f.prefix}</Text> : null}
            <TextInput style={s.input} value={f.value} onChangeText={f.onChange}
              keyboardType="numeric" placeholder={f.placeholder}
              placeholderTextColor={C.placeholder} returnKeyType="done" />
          </View>
        ))}
      </View>

      {hasResult && (
        <>
          <Text style={s.sectionHdr}>Monthly Contributions</Text>
          <View style={s.card}>
            {[
              ['Your contribution (11%)',    fmt(r.empMth),   C.primary],
              ['Employer contribution (12%)', fmt(r.errMth),  C.info   ],
              ['Total monthly',              fmt(r.totalMth), C.label  ],
              ['Total annual',               fmt(r.yearly),   C.label  ],
            ].map(([l,v,c], i, arr) => (
              <View key={l} style={i < arr.length-1 ? s.row : s.rowLast}>
                <Text style={[s.body, { flex:1 }]}>{l}</Text>
                <Text style={[s.title, { color:c }]}>{v}</Text>
              </View>
            ))}
          </View>

          <Text style={s.sectionHdr}>Projection</Text>
          <View style={s.card}>
            {[
              ['Total contributed',    fmt(r.totalContrib), C.label  ],
              ['Interest earned',      fmt(r.interest),     C.primary],
              ['Final corpus (MYR)',   fmt(r.corpus),       C.primary],
              ['Final corpus (INR)',   fmtI(r.corpus),      C.orange ],
            ].map(([l,v,c], i, arr) => (
              <View key={l} style={i < arr.length-1 ? s.row : s.rowLast}>
                <Text style={[s.body, { flex:1 }]}>{l}</Text>
                <Text style={[s.title, { color:c, fontWeight: i >= 2 ? W.bold : W.regular }]}>{v}</Text>
              </View>
            ))}
          </View>

          <View style={[ls.tipCard]}>
            <Text style={ls.tipTitle}>💡 EPF Tip</Text>
            <Text style={s.body}>As a foreign national, you can withdraw your full EPF balance when permanently leaving Malaysia. Akaun Fleksibel (10%) can be withdrawn anytime.</Text>
          </View>
        </>
      )}
      <View style={{ height:40 }} />
    </ScrollView>
  )
}

const ls = StyleSheet.create({
  heroCard: { marginHorizontal:SP.lg, marginTop:SP.lg, borderRadius:R.xxl, padding:SP.xl, ...shadowMd },
  tipCard:  { marginHorizontal:SP.lg, backgroundColor:'#EBF5FF', borderRadius:R.xl, padding:SP.lg, marginBottom:SP.md },
  tipTitle: { fontSize:15, fontWeight:W.bold, color:C.info, marginBottom:6 },
})
