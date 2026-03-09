import { useState, useMemo } from 'react'
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { calcBudget, fmt, fmtI } from '../../shared/calculators'
import { C, s, SP, R, W, shadowMd, shadow } from '../../src/theme/index'

const EXP_CATS = [
  { id:'rent',      label:'Rent',       emoji:'🏠' },
  { id:'food',      label:'Food',       emoji:'🍛' },
  { id:'transport', label:'Transport',  emoji:'🚌' },
  { id:'utilities', label:'Utilities',  emoji:'💡' },
  { id:'insurance', label:'Insurance',  emoji:'🏥' },
  { id:'remittance',label:'Remittance', emoji:'💸' },
  { id:'others',    label:'Others',     emoji:'📦' },
]

const TABS = ['Overview', 'Projection', 'Goals']

export default function BudgetScreen() {
  const [tab,      setTab]      = useState(0)
  const [salary,   setSalary]   = useState('8000')
  const [expenses, setExpenses] = useState({ rent:1500, food:700, transport:300, utilities:200, insurance:150, remittance:500, others:300 })
  const [years,    setYears]    = useState('5')
  const [growth,   setGrowth]   = useState('7')

  const setExp = (id, v) => setExpenses(p => ({ ...p, [id]: parseFloat(v)||0 }))

  const r = useMemo(() => calcBudget({
    salary, expenses,
    years:     parseInt(years)   || 5,
    growthPct: parseFloat(growth)||7,
  }), [salary, expenses, years, growth])

  const ok = r.savingsPct >= 20

  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

      {/* Hero */}
      <View style={[ls.heroCard, { backgroundColor: ok ? C.primary : C.warning }]}>
        <Text style={s.resultLabel}>Monthly Savings</Text>
        <Text style={s.resultValue}>{fmt(r.monthlySavings)}</Text>
        <Text style={s.resultSub}>{r.savingsPct}% savings rate · EPF corpus: {fmt(r.epfCorpus)}</Text>
      </View>

      {/* Tabs */}
      <View style={ls.tabs}>
        {TABS.map((t, i) => (
          <TouchableOpacity key={t} style={[ls.tab, tab===i && ls.tabActive]} onPress={() => setTab(i)}>
            <Text style={[ls.tabText, tab===i && ls.tabTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── Overview tab ── */}
      {tab === 0 && (
        <>
          <Text style={s.sectionHdr}>Salary & Settings</Text>
          <View style={s.inputGroup}>
            {[
              { label:'Monthly Salary', value:salary, set:setSalary, placeholder:'8000'  },
              { label:'Years',          value:years,  set:setYears,  placeholder:'5'     },
              { label:'Salary Growth',  value:growth, set:setGrowth, placeholder:'7', suffix:'%/yr', last:true },
            ].map((f) => (
              <View key={f.label} style={[s.inputRow, f.last && { borderBottomWidth:0 }]}>
                <Text style={s.inputLabel}>{f.label}</Text>
                {!f.suffix && <Text style={[s.small, { marginRight:6, color:C.muted }]}>RM</Text>}
                <TextInput style={s.input} value={f.value} onChangeText={f.set}
                  keyboardType="numeric" placeholder={f.placeholder}
                  placeholderTextColor={C.placeholder} returnKeyType="done" />
                {f.suffix && <Text style={[s.small, { marginLeft:4, color:C.muted }]}>{f.suffix}</Text>}
              </View>
            ))}
          </View>

          <Text style={s.sectionHdr}>Monthly Expenses</Text>
          <View style={s.inputGroup}>
            {EXP_CATS.map(({ id, label, emoji }, i) => (
              <View key={id} style={[s.inputRow, i === EXP_CATS.length-1 && { borderBottomWidth:0 }]}>
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

          <Text style={s.sectionHdr}>Current Month</Text>
          <View style={s.card}>
            {[
              ['Take-Home Pay',   fmt(r.takehome),       C.primary],
              ['Total Expenses',  fmt(r.totalExp),        C.danger ],
              ['Monthly Savings', fmt(r.monthlySavings),  ok ? C.primary : C.warning],
              ['Savings Rate',    `${r.savingsPct}%`,     ok ? C.primary : C.warning],
              ['EPF this month',  fmt(r.epf),             C.info   ],
            ].map(([l,v,c], i, arr) => (
              <View key={l} style={i < arr.length-1 ? s.row : s.rowLast}>
                <Text style={[s.body, { flex:1 }]}>{l}</Text>
                <Text style={[s.title, { color:c }]}>{v}</Text>
              </View>
            ))}
          </View>
        </>
      )}

      {/* ── Projection tab ── */}
      {tab === 1 && (
        <>
          <Text style={s.sectionHdr}>{years}-Year Projection (at {growth}% salary growth)</Text>
          <View style={[s.card, { paddingVertical:0 }]}>
            <View style={[ls.tHead, s.row]}>
              {['Year','Salary','Savings','Cumulative'].map(h => (
                <Text key={h} style={[ls.tHdr, h === 'Year' && { flex:0, width:40 }]}>{h}</Text>
              ))}
            </View>
            {r.projection?.map((p, i) => (
              <View key={i} style={i < r.projection.length-1 ? [s.row, { paddingVertical:10 }] : [s.rowLast, { paddingVertical:10 }]}>
                <Text style={[ls.tCell, { flex:0, width:40, color:C.primary, fontWeight:W.bold }]}>{p.year}</Text>
                <Text style={[ls.tCell]}>RM {Math.round(p.salary/1000)}k</Text>
                <Text style={[ls.tCell, { color: p.savings >= 0 ? C.primary : C.danger }]}>RM {Math.round(p.savings/1000)}k</Text>
                <Text style={[ls.tCell, { color:C.info }]}>RM {Math.round(p.cumSavings/1000)}k</Text>
              </View>
            ))}
          </View>

          <View style={[ls.epfCard]}>
            <Text style={ls.epfLabel}>EPF Corpus after {years} years</Text>
            <Text style={ls.epfValue}>{fmt(r.epfCorpus)}</Text>
            <Text style={ls.epfSub}>{fmtI(r.epfCorpus)} equivalent</Text>
          </View>
        </>
      )}

      {/* ── Goals tab ── */}
      {tab === 2 && (
        <>
          <Text style={s.sectionHdr}>Financial Goals</Text>
          {[
            { emoji:'🆘', label:'Emergency Fund (6mo)',  target: r.totalExp * 6,         color:C.danger  },
            { emoji:'✈️', label:'India Trip Fund',       target: 15000,                  color:C.info    },
            { emoji:'🚗', label:'Car Down Payment',      target: 8000,                   color:C.orange  },
            { emoji:'🏠', label:'Home Down Payment',     target: 50000,                  color:C.teal    },
            { emoji:'🏦', label:'EPF Corpus (target)',   target: r.epfCorpus, achieved:true, color:C.primary },
          ].map((goal, i, arr) => {
            const months = r.monthlySavings > 0 ? Math.ceil(goal.target / r.monthlySavings) : null
            const pct    = months ? Math.min(100, (r.monthlySavings / goal.target) * 100 * 12) : 0
            return (
              <View key={goal.label} style={[ls.goalCard]}>
                <View style={[s.between, { marginBottom:8 }]}>
                  <View style={s.hstack}>
                    <Text style={{ fontSize:20, marginRight:8 }}>{goal.emoji}</Text>
                    <Text style={s.title}>{goal.label}</Text>
                  </View>
                  <Text style={[s.title, { color:goal.color }]}>{fmt(goal.target)}</Text>
                </View>
                <View style={ls.goalBar}>
                  <View style={[ls.goalFill, { width: goal.achieved ? '100%' : `${Math.min(100,pct)}%`, backgroundColor:goal.color }]} />
                </View>
                <Text style={[s.small, { marginTop:6, color: goal.achieved ? goal.color : C.muted }]}>
                  {goal.achieved ? '✅ On track via EPF' : months ? `~${months} months to reach` : 'Increase savings first'}
                </Text>
              </View>
            )
          })}
        </>
      )}

      <View style={{ height:40 }} />
    </ScrollView>
  )
}

const ls = StyleSheet.create({
  heroCard:   { marginHorizontal:SP.lg, marginTop:SP.lg, borderRadius:R.xxl, padding:SP.xl, ...shadowMd },
  tabs:       { flexDirection:'row', marginHorizontal:SP.lg, marginTop:SP.lg, marginBottom:SP.sm,
                backgroundColor:'#fff', borderRadius:R.xl, padding:4, ...shadow },
  tab:        { flex:1, paddingVertical:8, alignItems:'center', borderRadius:R.lg },
  tabActive:  { backgroundColor:C.primary },
  tabText:    { fontSize:13, fontWeight:W.semibold, color:C.muted },
  tabTextActive:{ color:'#fff' },
  tHead:      { backgroundColor:'#F5F5F5', paddingVertical:10 },
  tHdr:       { flex:1, fontSize:11, fontWeight:W.bold, color:C.muted, textTransform:'uppercase' },
  tCell:      { flex:1, fontSize:13, color:C.label },
  epfCard:    { marginHorizontal:SP.lg, backgroundColor:C.primary, borderRadius:R.xxl, padding:SP.xl, marginBottom:SP.md },
  epfLabel:   { fontSize:13, color:'rgba(255,255,255,0.8)', marginBottom:4 },
  epfValue:   { fontSize:28, fontWeight:W.bold, color:'#fff' },
  epfSub:     { fontSize:13, color:'rgba(255,255,255,0.7)', marginTop:4 },
  goalCard:   { marginHorizontal:SP.lg, backgroundColor:'#fff', borderRadius:R.xl, padding:SP.lg, marginBottom:SP.sm, ...shadow },
  goalBar:    { height:6, backgroundColor:'#EEE', borderRadius:3, overflow:'hidden' },
  goalFill:   { height:6, borderRadius:3 },
})
