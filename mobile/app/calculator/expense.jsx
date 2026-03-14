import { useState, useMemo } from 'react'
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Share } from 'react-native'
import * as Print from 'expo-print'
import { calcPCB, fmt, fmtI } from '../../shared/calculators'
import { C, s, SP, R, W, shadow, shadowMd } from '../../src/theme/index'

const CATS = [
  { id:'rent',       label:'Rent',        emoji:'🏠', color:C.info    },
  { id:'food',       label:'Food',        emoji:'🍛', color:C.orange  },
  { id:'transport',  label:'Transport',   emoji:'🚌', color:C.teal    },
  { id:'utilities',  label:'Utilities',   emoji:'💡', color:C.primary },
  { id:'insurance',  label:'Insurance',   emoji:'🏥', color:C.danger  },
  { id:'remittance', label:'Remittance',  emoji:'💸', color:C.purple  },
  { id:'education',  label:'Education',   emoji:'🎓', color:C.info    },
  { id:'leisure',    label:'Leisure',     emoji:'🎬', color:C.orange  },
  { id:'others',     label:'Others',      emoji:'📦', color:C.muted   },
]

const DEFAULT = { rent:1500, food:700, transport:300, utilities:200, insurance:150, remittance:500, education:0, leisure:300, others:200 }

export default function ExpenseScreen() {
  const [salary,   setSalary]   = useState('8000')
  const [expenses, setExpenses] = useState(DEFAULT)

  const setExp = (id, v) => setExpenses(p => ({ ...p, [id]: parseFloat(v) || 0 }))
  const r         = useMemo(() => calcPCB(parseFloat(salary) || 0), [salary])
  const totalExp  = Object.values(expenses).reduce((a, v) => a + v, 0)
  const savings   = r.takehome - totalExp
  const pct       = r.takehome > 0 ? Math.round((savings / r.takehome) * 100) : 0
  const ok        = pct >= 20

  const sorted = [...CATS].map(c => ({ ...c, val: expenses[c.id]||0 })).filter(c=>c.val>0).sort((a,b)=>b.val-a.val)

  const exportPDF = async () => {
    const html = `<html><body style="font-family:-apple-system,sans-serif;padding:24px;">
      <h2>Expense Report — NikiBhavi</h2>
      <p>Salary: RM ${r.gross.toLocaleString()} → Take-home: RM ${r.takehome.toLocaleString()}</p>
      <table style="width:100%;border-collapse:collapse;">
        ${CATS.map(c=>expenses[c.id]?`<tr><td style="padding:8px">${c.emoji} ${c.label}</td><td style="text-align:right;padding:8px">RM ${expenses[c.id].toLocaleString()}</td></tr>`:'').join('')}
        <tr style="font-weight:700;border-top:2px solid #eee"><td style="padding:8px">Savings</td><td style="text-align:right;color:#00B14F;padding:8px">RM ${Math.round(savings).toLocaleString()} (${pct}%)</td></tr>
      </table></body></html>`
    try {
      const { uri } = await Print.printToFileAsync({ html })
      await Share.share({ url:uri, title:'Expense Report' })
    } catch { await Print.printAsync({ html }) }
  }

  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

      <Text style={s.sectionHdr}>Monthly Salary</Text>
      <View style={s.inputGroup}>
        <View style={[s.inputRow, { borderBottomWidth:0 }]}>
          <Text style={s.inputLabel}>Gross Salary</Text>
          <Text style={[s.small, { marginRight:6, color:C.muted }]}>RM</Text>
          <TextInput style={s.input} value={salary} onChangeText={setSalary}
            keyboardType="numeric" placeholder="8000" placeholderTextColor={C.placeholder} returnKeyType="done" />
        </View>
      </View>

      <View style={[ls.heroCard, { backgroundColor: ok ? C.primary : C.warning }]}>
        <Text style={s.resultLabel}>{ok ? '✅ On Track' : '⚠️ Low Savings Rate'}</Text>
        <Text style={s.resultValue}>{fmt(savings)}/mo saved</Text>
        <Text style={s.resultSub}>{pct}% savings rate · {fmtI(savings * 12)}/year</Text>
      </View>

      <Text style={s.sectionHdr}>Monthly Expenses</Text>
      <View style={s.inputGroup}>
        {CATS.map(({ id, label, emoji }, i) => (
          <View key={id} style={[s.inputRow, i === CATS.length-1 && { borderBottomWidth:0 }]}>
            <Text style={[s.inputLabel, { width:110 }]}>{emoji} {label}</Text>
            <Text style={[s.small, { marginRight:6, color:C.muted }]}>RM</Text>
            <TextInput style={s.input}
              value={expenses[id] ? expenses[id].toString() : ''}
              onChangeText={v => setExp(id, v)}
              keyboardType="numeric" placeholder="0"
              placeholderTextColor={C.placeholder} returnKeyType="done" />
          </View>
        ))}
      </View>

      <Text style={s.sectionHdr}>Summary</Text>
      <View style={s.card}>
        {[
          ['Take-Home Pay',  fmt(r.takehome),  C.primary],
          ['Total Expenses', fmt(totalExp),     C.danger ],
          ['Monthly Savings',fmt(savings),      savings>=0 ? C.primary : C.danger],
          ['Annual Savings', fmt(savings*12),   C.info   ],
        ].map(([l,v,c], i, arr) => (
          <View key={l} style={i < arr.length-1 ? s.row : s.rowLast}>
            <Text style={[s.body, { flex:1 }]}>{l}</Text>
            <Text style={[s.title, { color:c, fontWeight: i===2 ? W.bold : W.regular }]}>{v}</Text>
          </View>
        ))}
      </View>

      {sorted.length > 0 && (
        <>
          <Text style={s.sectionHdr}>Breakdown</Text>
          <View style={s.card}>
            {sorted.map((cat, i) => {
              const pct2 = totalExp > 0 ? (cat.val/totalExp)*100 : 0
              return (
                <View key={cat.id} style={[ls.barRow, i < sorted.length-1 && { marginBottom:12 }]}>
                  <View style={[s.between, { marginBottom:5 }]}>
                    <Text style={s.body}>{cat.emoji} {cat.label}</Text>
                    <Text style={[s.small, { fontWeight:W.semibold }]}>{pct2.toFixed(0)}% · RM {cat.val.toLocaleString()}</Text>
                  </View>
                  <View style={ls.barBg}>
                    <View style={[ls.barFill, { width:`${pct2}%`, backgroundColor:cat.color }]} />
                  </View>
                </View>
              )
            })}
          </View>
        </>
      )}

      <TouchableOpacity style={[s.btnPrimary, { backgroundColor:C.primary, marginTop:SP.sm }]} onPress={exportPDF} activeOpacity={0.85}>
        <Text style={s.btnText}>Export PDF Report</Text>
      </TouchableOpacity>
      <View style={{ height:40 }} />
    </ScrollView>
  )
}

const ls = StyleSheet.create({
  heroCard: { marginHorizontal:SP.lg, marginTop:SP.lg, borderRadius:R.xxl, padding:SP.xl, ...shadowMd },
  barRow:  { paddingHorizontal:SP.lg, paddingVertical:SP.sm },
  barBg:   { height:6, backgroundColor:'#EEE', borderRadius:3, overflow:'hidden' },
  barFill: { height:6, borderRadius:3 },
})
