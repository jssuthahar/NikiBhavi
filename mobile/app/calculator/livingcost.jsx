import { useState, useMemo } from 'react'
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { FAMILY_TYPES, EXPENSE_CATEGORIES, getDefaults } from '../../shared/livingCostData'
import { C, s, SP, R, W, shadow, shadowMd } from '../../src/theme/index'

const MYR_INR = 19.5
const fmt  = n => 'RM ' + Math.round(n).toLocaleString()
const fmtI = n => '₹'  + Math.round(n * MYR_INR).toLocaleString()

export default function LivingCostScreen() {
  const [familyType, setFamilyType] = useState('single')
  const [income, setIncome]         = useState('')
  const [expenses, setExpenses]     = useState(() => getDefaults('single'))
  const [openCats, setOpenCats]     = useState(['housing', 'food'])

  const setFamily = (id) => { setFamilyType(id); setExpenses(getDefaults(id)) }
  const setExp    = (id, val) => setExpenses(p => ({ ...p, [id]: parseFloat(val) || 0 }))
  const toggleCat = (id) => setOpenCats(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])

  const { total, savings, yearlySavings, categoryTotals } = useMemo(() => {
    const total = Object.values(expenses).reduce((s, v) => s + (v || 0), 0)
    const inc = parseFloat(income) || 0
    const savings = inc - total
    const categoryTotals = {}
    EXPENSE_CATEGORIES.forEach(cat => {
      categoryTotals[cat.id] = cat.items.reduce((s, item) => s + (expenses[item.id] || 0), 0)
    })
    return { total, savings, yearlySavings: savings * 12, categoryTotals }
  }, [expenses, income])

  const incomeNum  = parseFloat(income) || 0
  const savingsPct = incomeNum > 0 ? ((savings / incomeNum) * 100).toFixed(1) : null
  const isDeficit  = incomeNum > 0 && savings < 0

  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom:40 }}>

      {/* ── Family type selector ── */}
      <Text style={s.sectionHdr}>Family Type</Text>
      <View style={ls.familyRow}>
        {FAMILY_TYPES.map(f => (
          <TouchableOpacity key={f.id}
            style={[ls.familyBtn, familyType === f.id && ls.familyBtnOn]}
            onPress={() => setFamily(f.id)} activeOpacity={0.7}>
            <Text style={{ fontSize:20 }}>{f.icon}</Text>
            <Text style={[ls.familyLabel, familyType === f.id && { color:C.primary }]}>{f.label}</Text>
            <Text style={ls.familyDesc}>{f.desc}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── Income input ── */}
      <Text style={s.sectionHdr}>Monthly Take-Home Salary</Text>
      <View style={s.inputGroup}>
        <View style={[s.inputRow, { borderBottomWidth:0 }]}>
          <Text style={s.inputLabel}>After-tax income</Text>
          <Text style={[s.small, { marginRight:6, color:C.muted }]}>RM</Text>
          <TextInput style={s.input} value={income} onChangeText={setIncome}
            keyboardType="numeric" placeholder="e.g. 5000"
            placeholderTextColor={C.placeholder} returnKeyType="done" />
        </View>
      </View>

      {/* ── Summary cards ── */}
      <View style={ls.summaryRow}>
        <View style={[ls.sumCard, { backgroundColor:'#FFF0EF' }]}>
          <Text style={ls.sumEmoji}>💸</Text>
          <Text style={[ls.sumVal, { color:C.danger }]}>{fmt(total)}</Text>
          <Text style={ls.sumLabel}>Total Expenses</Text>
        </View>
        {incomeNum > 0 && (
          <>
            <View style={[ls.sumCard, { backgroundColor: isDeficit ? '#FFF0EF' : '#E6F7EE' }]}>
              <Text style={ls.sumEmoji}>{isDeficit ? '⚠️' : '🏦'}</Text>
              <Text style={[ls.sumVal, { color: isDeficit ? C.danger : C.primary }]}>
                {fmt(Math.abs(savings))}
              </Text>
              <Text style={ls.sumLabel}>{isDeficit ? 'Deficit/mo' : `Savings (${savingsPct}%)`}</Text>
            </View>
            <View style={[ls.sumCard, { backgroundColor: isDeficit ? '#FFF0EF' : '#E6F7EE' }]}>
              <Text style={ls.sumEmoji}>📅</Text>
              <Text style={[ls.sumVal, { color: isDeficit ? C.danger : C.primary }]}>
                {fmt(Math.abs(yearlySavings))}
              </Text>
              <Text style={ls.sumLabel}>{isDeficit ? 'Deficit/yr' : 'Yearly Savings'}</Text>
            </View>
          </>
        )}
      </View>

      {/* ── Deficit warning ── */}
      {isDeficit && (
        <View style={ls.warnCard}>
          <Ionicons name="warning" size={16} color={C.danger} />
          <Text style={[ls.warnTxt, { flex:1 }]}>  Expenses exceed income by {fmt(Math.abs(savings))}/mo. Review rent, remittance & eating out.</Text>
        </View>
      )}

      {/* ── Category breakdown ── */}
      <Text style={s.sectionHdr}>Edit Expenses</Text>
      {EXPENSE_CATEGORIES.map(cat => (
        <View key={cat.id} style={ls.catWrap}>
          {/* Category header — tappable to expand */}
          <TouchableOpacity style={[ls.catHdr, { borderLeftColor: cat.color }]}
            onPress={() => toggleCat(cat.id)} activeOpacity={0.7}>
            <Text style={{ fontSize:18, width:28 }}>{cat.icon}</Text>
            <Text style={[ls.catLabel, { flex:1, marginLeft:8 }]}>{cat.label}</Text>
            <Text style={[ls.catTotal, { color: cat.color }]}>{fmt(categoryTotals[cat.id] || 0)}</Text>
            <Ionicons name={openCats.includes(cat.id) ? 'chevron-up' : 'chevron-down'} size={16} color={C.muted} style={{ marginLeft:8 }} />
          </TouchableOpacity>

          {/* Category items */}
          {openCats.includes(cat.id) && (
            <View style={ls.catBody}>
              {cat.items.map((item, i) => (
                <View key={item.id} style={[ls.itemRow, i === cat.items.length-1 && { borderBottomWidth:0 }]}>
                  <Text style={{ fontSize:16, width:26 }}>{item.icon}</Text>
                  <Text style={[s.small, { flex:1, marginLeft:8, color:C.label }]}>{item.label}</Text>
                  <Text style={[s.small, { marginRight:4, color:C.muted }]}>RM</Text>
                  <TextInput
                    style={ls.itemInput}
                    value={expenses[item.id]?.toString() || '0'}
                    onChangeText={v => setExp(item.id, v)}
                    keyboardType="numeric"
                    returnKeyType="done"
                  />
                </View>
              ))}
            </View>
          )}
        </View>
      ))}

      {/* ── Category bar breakdown ── */}
      <Text style={s.sectionHdr}>Breakdown</Text>
      <View style={s.card}>
        {EXPENSE_CATEGORIES.filter(cat => (categoryTotals[cat.id] || 0) > 0).map((cat, i, arr) => {
          const pct = total > 0 ? (categoryTotals[cat.id] / total) * 100 : 0
          return (
            <View key={cat.id} style={[ls.barRow, i === arr.length-1 && { borderBottomWidth:0 }]}>
              <Text style={{ fontSize:16, width:26 }}>{cat.icon}</Text>
              <View style={{ flex:1, marginLeft:8 }}>
                <View style={{ flexDirection:'row', justifyContent:'space-between', marginBottom:4 }}>
                  <Text style={[s.small, { color:C.label, fontWeight:W.medium }]}>{cat.label}</Text>
                  <Text style={[s.small, { color:cat.color, fontWeight:W.bold }]}>
                    {fmt(categoryTotals[cat.id])} ({Math.round(pct)}%)
                  </Text>
                </View>
                <View style={ls.barBg}>
                  <View style={[ls.barFill, { width:`${Math.round(pct)}%`, backgroundColor:cat.color }]} />
                </View>
              </View>
            </View>
          )
        })}
      </View>

      {/* ── INR equivalent ── */}
      <View style={ls.inrCard}>
        <Text style={ls.inrTitle}>💱 In Indian Rupees</Text>
        <View style={{ flexDirection:'row', justifyContent:'space-between', marginTop:SP.sm }}>
          <View style={{ alignItems:'center' }}>
            <Text style={ls.inrVal}>{fmtI(total)}</Text>
            <Text style={ls.inrLbl}>Total Expenses</Text>
          </View>
          {incomeNum > 0 && savings > 0 && (
            <View style={{ alignItems:'center' }}>
              <Text style={[ls.inrVal, { color:C.primary }]}>{fmtI(savings)}</Text>
              <Text style={ls.inrLbl}>Monthly Savings</Text>
            </View>
          )}
          {incomeNum > 0 && savings > 0 && (
            <View style={{ alignItems:'center' }}>
              <Text style={[ls.inrVal, { color:C.primary }]}>{fmtI(yearlySavings)}</Text>
              <Text style={ls.inrLbl}>Yearly Savings</Text>
            </View>
          )}
        </View>
      </View>

      {/* ── Tips ── */}
      <View style={ls.tip}>
        <Text style={ls.tipTitle}>💡 Money-Saving Tips</Text>
        {['Cook at home — saves RM 300–500/month',
          'Use Touch\'n Go for MRT — cheaper than Grab',
          'Shop at Mydin/Giant for Indian groceries',
          'Use InstaReM/Wise for remittance — best rates',
          'Brickfields for cheapest Indian food in KL'].map((t, i) => (
          <Text key={i} style={[s.small, { marginBottom:4, lineHeight:18 }]}>✅ {t}</Text>
        ))}
      </View>
    </ScrollView>
  )
}

const ls = StyleSheet.create({
  familyRow: { flexDirection:'row', flexWrap:'wrap', paddingHorizontal:SP.lg, gap:SP.sm, marginBottom:4 },
  familyBtn: { flex:1, minWidth:'45%', backgroundColor:'#fff', borderRadius:R.xl, padding:SP.md,
               alignItems:'center', borderWidth:1.5, borderColor:'#EEE', ...shadow },
  familyBtnOn: { borderColor:C.primary, backgroundColor:C.primaryLt },
  familyLabel: { fontSize:12, fontWeight:W.bold, color:C.sub, marginTop:4, textAlign:'center' },
  familyDesc:  { fontSize:10, color:C.muted, textAlign:'center' },

  summaryRow: { flexDirection:'row', paddingHorizontal:SP.lg, gap:SP.sm, marginBottom:4 },
  sumCard:    { flex:1, borderRadius:R.xl, padding:SP.md, alignItems:'center', ...shadow },
  sumEmoji:   { fontSize:18, marginBottom:4 },
  sumVal:     { fontSize:14, fontWeight:W.bold, textAlign:'center' },
  sumLabel:   { fontSize:10, color:C.muted, textAlign:'center', marginTop:2 },

  warnCard: { flexDirection:'row', marginHorizontal:SP.lg, backgroundColor:'#FFF0EF',
              borderRadius:R.xl, padding:SP.md, marginBottom:SP.md, alignItems:'flex-start' },
  warnTxt:  { fontSize:13, color:C.danger, lineHeight:18 },

  catWrap:  { marginHorizontal:SP.lg, marginBottom:SP.sm, borderRadius:R.xl, overflow:'hidden',
              backgroundColor:'#fff', ...shadow },
  catHdr:   { flexDirection:'row', alignItems:'center', padding:SP.md, borderLeftWidth:4 },
  catLabel: { fontSize:14, fontWeight:W.semibold, color:C.label },
  catTotal: { fontSize:13, fontWeight:W.bold },
  catBody:  { borderTopWidth:1, borderTopColor:'#EEE' },
  itemRow:  { flexDirection:'row', alignItems:'center', paddingHorizontal:SP.md, paddingVertical:10,
              borderBottomWidth:StyleSheet.hairlineWidth, borderBottomColor:'#EEE' },
  itemInput:{ width:80, textAlign:'right', fontSize:15, color:C.label,
              backgroundColor:'#F5F5F5', borderRadius:R.md, paddingHorizontal:8, paddingVertical:4 },

  barRow:   { flexDirection:'row', alignItems:'center', paddingHorizontal:SP.lg,
              paddingVertical:SP.md, borderBottomWidth:StyleSheet.hairlineWidth, borderBottomColor:'#EEE' },
  barBg:    { height:6, backgroundColor:'#EEE', borderRadius:3, overflow:'hidden' },
  barFill:  { height:6, borderRadius:3 },

  inrCard:  { marginHorizontal:SP.lg, marginBottom:SP.md, backgroundColor:C.ink || '#0d0d0d',
              borderRadius:R.xl, padding:SP.lg },
  inrTitle: { fontSize:13, fontWeight:W.bold, color:'rgba(255,255,255,0.7)' },
  inrVal:   { fontSize:16, fontWeight:W.bold, color:'#C9F53B' },
  inrLbl:   { fontSize:10, color:'rgba(255,255,255,0.5)', marginTop:2 },

  tip:      { marginHorizontal:SP.lg, backgroundColor:'#FFFBEB', borderRadius:R.xl, padding:SP.lg, marginBottom:SP.md },
  tipTitle: { fontSize:14, fontWeight:W.bold, color:'#92400E', marginBottom:SP.sm },
})
