import { useState, useMemo } from 'react'
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { C, s, SP, R, W, shadowMd } from '../../src/theme/index'

function addMonths(d, m) { const r = new Date(d); r.setMonth(r.getMonth() + m); return r }
function daysBetween(a, b) { return Math.round((b - a) / 86400000) }
const fmtDate = d => d.toLocaleDateString('en-MY', { weekday:'short', day:'numeric', month:'short', year:'numeric' })

export default function ProbationScreen() {
  const [joinDay,   setJoinDay]   = useState('')
  const [joinMonth, setJoinMonth] = useState('')
  const [joinYear,  setJoinYear]  = useState('2026')
  const [months,    setMonths]    = useState('3')
  const [calculated, setCalculated] = useState(false)

  const r = useMemo(() => {
    const d = parseInt(joinDay), m = parseInt(joinMonth), y = parseInt(joinYear)
    if (!d || !m || !y) return null
    const join    = new Date(y, m-1, d)
    const mths    = parseInt(months) || 3
    const probEnd = addMonths(join, mths)
    const today   = new Date()
    const daysLeft= daysBetween(today, probEnd)
    const done    = today >= probEnd
    const pct     = Math.max(0, Math.min(100, (daysBetween(join, today) / (mths * 30.4)) * 100))
    return { join, probEnd, daysLeft, done, pct, mths }
  }, [joinDay, joinMonth, joinYear, months])

  const BENEFITS = [
    { icon:'🏥', name:'Medical Leave',        when:'Day 1',        detail:'MC from registered doctor counts from first day.' },
    { icon:'🏖️', name:'Annual Leave',         when:'After 12 months', detail:'8 days/yr (0–2 yrs), prorated if less than 1 year.' },
    { icon:'🤒', name:'Sick Leave (full)',     when:'After probation', detail:'14 days/yr (0–2 yrs), 18 days (2–5 yrs), 22 days (5+ yrs).' },
    { icon:'🛡️', name:'EPF & SOCSO',          when:'Day 1',         detail:'Employer must contribute from first payslip.' },
    { icon:'👶', name:'Maternity Leave',       when:'As per EA 1955', detail:'60 consecutive days for first 5 surviving children.' },
    { icon:'💰', name:'Salary Review',         when:'End of probation', detail:'Performance review typically at confirmation.' },
  ]

  const canCalc = joinDay && joinMonth && joinYear

  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom:40 }}>

      <Text style={s.sectionHdr}>Joining Date</Text>
      <View style={s.inputGroup}>
        {[{l:'Day',v:joinDay,s:setJoinDay,ph:'e.g. 15'},
          {l:'Month',v:joinMonth,s:setJoinMonth,ph:'1–12'},
          {l:'Year',v:joinYear,s:setJoinYear,ph:'2026',last:true}].map(f => (
          <View key={f.l} style={[s.inputRow, f.last && {borderBottomWidth:0}]}>
            <Text style={s.inputLabel}>{f.l}</Text>
            <TextInput style={s.input} value={f.v} onChangeText={t=>{f.s(t);setCalculated(false)}}
              keyboardType="numeric" placeholder={f.ph} placeholderTextColor={C.placeholder} returnKeyType="next" />
          </View>
        ))}
      </View>

      <Text style={s.sectionHdr}>Probation Period</Text>
      <View style={s.inputGroup}>
        <View style={[s.inputRow, {borderBottomWidth:0}]}>
          <Text style={s.inputLabel}>Duration</Text>
          <Text style={[s.small,{marginRight:6,color:C.muted}]}>months</Text>
          <TextInput style={s.input} value={months} onChangeText={t=>{setMonths(t);setCalculated(false)}}
            keyboardType="numeric" placeholder="3 or 6" placeholderTextColor={C.placeholder} returnKeyType="done" />
        </View>
      </View>

      <TouchableOpacity style={[s.btnPrimary, !canCalc && {opacity:0.45}]}
        onPress={() => canCalc && setCalculated(true)} activeOpacity={0.8}>
        <Text style={s.btnText}>Calculate Probation End</Text>
      </TouchableOpacity>

      {calculated && r && (
        <>
          <View style={[ls.card, { backgroundColor: r.done ? C.primary : C.info }]}>
            <Text style={s.resultLabel}>{r.done ? '✅ Probation Complete!' : '⏳ Probation in Progress'}</Text>
            <Text style={s.resultValue}>{r.done ? 'Confirmed Employee' : `${Math.max(0,r.daysLeft)} days left`}</Text>
            <Text style={s.resultSub}>
              {r.done
                ? `Ended ${fmtDate(r.probEnd)}`
                : `Ends ${fmtDate(r.probEnd)} · ${Math.round(r.pct)}% complete`}
            </Text>
          </View>

          {/* Progress bar */}
          {!r.done && (
            <View style={ls.progressWrap}>
              <View style={[ls.progressBar, { width:`${Math.round(r.pct)}%` }]} />
            </View>
          )}

          <Text style={s.sectionHdr}>Key Dates</Text>
          <View style={[s.card,{paddingVertical:0}]}>
            {[['📅 Joining Date', fmtDate(r.join)],
              [`⏱ ${r.mths}-month mark`, fmtDate(r.probEnd)],
              ['📆 Today', fmtDate(new Date())],
            ].map(([l,v],i,arr) => (
              <View key={l} style={i < arr.length-1 ? s.row : s.rowLast}>
                <Text style={[s.body,{flex:1}]}>{l}</Text>
                <Text style={[s.small,{color:C.primary,fontWeight:W.semibold}]}>{v}</Text>
              </View>
            ))}
          </View>
        </>
      )}

      <Text style={s.sectionHdr}>Benefits Timeline</Text>
      <View style={[s.card,{paddingVertical:0}]}>
        {BENEFITS.map((b,i,arr) => (
          <View key={b.name} style={[s.row, i===arr.length-1 && {borderBottomWidth:0}]}>
            <Text style={{fontSize:20,width:30}}>{b.icon}</Text>
            <View style={{flex:1,marginLeft:10}}>
              <Text style={s.title}>{b.name}</Text>
              <Text style={[s.small,{color:C.primary}]}>⏰ {b.when}</Text>
              <Text style={s.small}>{b.detail}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}
const ls = StyleSheet.create({
  card:        { marginHorizontal:SP.lg, marginTop:SP.lg, borderRadius:R.xxl, padding:SP.xl, ...shadowMd },
  progressWrap:{ marginHorizontal:SP.lg, marginTop:SP.sm, height:8, backgroundColor:'#EEE', borderRadius:4, overflow:'hidden' },
  progressBar: { height:8, backgroundColor:C.primary, borderRadius:4 },
})
