import { useState, useMemo } from 'react'
import { ScrollView, View, Text, TextInput, StyleSheet } from 'react-native'
import { C, s, SP, R, W, shadowMd } from '../../src/theme/index'

const PH_2026 = [
  { date:'2026-01-01', name:"New Year's Day",                  day:'Thu' },
  { date:'2026-01-26', name:'Thaipusam',                       day:'Mon', indian:true },
  { date:'2026-02-17', name:'Chinese New Year Day 1',          day:'Tue' },
  { date:'2026-02-18', name:'Chinese New Year Day 2',          day:'Wed' },
  { date:'2026-03-20', name:'Hari Raya Aidilfitri Day 1',      day:'Fri' },
  { date:'2026-03-21', name:'Hari Raya Aidilfitri Day 2',      day:'Sat' },
  { date:'2026-04-13', name:"Birthday of Yang di-Pertuan Agong",day:'Mon'},
  { date:'2026-05-01', name:'Labour Day',                      day:'Fri' },
  { date:'2026-05-27', name:'Hari Raya Aidiladha',             day:'Wed' },
  { date:'2026-05-31', name:'Wesak Day',                       day:'Sun' },
  { date:'2026-06-17', name:'Awal Muharram',                   day:'Wed' },
  { date:'2026-08-31', name:'National Day (Merdeka)',           day:'Mon' },
  { date:'2026-09-16', name:'Malaysia Day',                    day:'Wed' },
  { date:'2026-09-26', name:"Prophet Muhammad's Birthday",     day:'Sat' },
  { date:'2026-11-08', name:'Deepavali',                       day:'Sun', indian:true },
  { date:'2026-12-25', name:'Christmas Day',                   day:'Fri' },
]

function getLongWeekends() {
  const opps = []
  for (const ph of PH_2026) {
    const d = new Date(ph.date)
    const day = d.getDay()
    let tip = null
    if (day === 1) tip = { leave:1, total:4, tip:`Take Fri before → 4-day weekend` }
    else if (day === 5) tip = { leave:1, total:4, tip:`Take Mon after → 4-day weekend` }
    else if (day === 2) tip = { leave:1, total:4, tip:`Take Mon before → 4-day break` }
    else if (day === 4) tip = { leave:1, total:4, tip:`Take Fri after → 4-day break` }
    else if (day === 3) tip = { leave:2, total:5, tip:`Take Mon+Fri → 5-day week off!` }
    if (tip) opps.push({ ...ph, ...tip })
  }
  return opps
}

export default function LeaveScreen() {
  const [totalLeave, setTotalLeave] = useState('14')
  const [usedLeave,  setUsedLeave]  = useState('0')

  const remaining = (parseInt(totalLeave)||14) - (parseInt(usedLeave)||0)
  const opps = useMemo(() => getLongWeekends(), [])

  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom:40 }}>

      <Text style={s.sectionHdr}>Your Leave Balance</Text>
      <View style={s.inputGroup}>
        {[{l:'Total Leave Days',v:totalLeave,s:setTotalLeave,ph:'14'},
          {l:'Leave Used',v:usedLeave,s:setUsedLeave,ph:'0',last:true}].map(f => (
          <View key={f.l} style={[s.inputRow, f.last && {borderBottomWidth:0}]}>
            <Text style={s.inputLabel}>{f.l}</Text>
            <Text style={[s.small,{marginRight:6,color:C.muted}]}>days</Text>
            <TextInput style={s.input} value={f.v} onChangeText={f.s}
              keyboardType="numeric" placeholder={f.ph} placeholderTextColor={C.placeholder} returnKeyType="done" />
          </View>
        ))}
      </View>

      {/* Leave balance card */}
      <View style={[ls.balCard, { backgroundColor: remaining >= 10 ? C.primary : remaining >= 5 ? C.warning : C.danger }]}>
        <Text style={s.resultLabel}>Remaining Leave Days</Text>
        <Text style={s.resultValue}>{remaining} days</Text>
        <Text style={s.resultSub}>{remaining >= 10 ? 'Great! Plan those long weekends 🎉' : remaining >= 5 ? 'Use wisely for long weekends' : 'Running low — save for emergencies'}</Text>
      </View>

      {/* Long weekend opportunities */}
      <Text style={s.sectionHdr}>🎯 Long Weekend Opportunities 2026</Text>
      <View style={[s.card,{paddingVertical:0}]}>
        {opps.map((op, i) => (
          <View key={op.date} style={[s.row, i===opps.length-1 && {borderBottomWidth:0}]}>
            <View style={[ls.leaveBadge, { backgroundColor: op.leave===1 ? C.primaryLt : '#FFF4E5' }]}>
              <Text style={[ls.leaveBadgeTxt, { color: op.leave===1 ? C.primaryDk : C.warning }]}>
                {op.leave}L
              </Text>
            </View>
            <View style={{flex:1, marginLeft:10}}>
              <Text style={s.title}>{op.name}</Text>
              <Text style={[s.small,{color:C.primary}]}>💡 {op.tip}</Text>
              {op.indian && <Text style={[s.small,{color:C.orange}]}>🇮🇳 Indian holiday!</Text>}
            </View>
            <View style={[ls.totalBadge]}>
              <Text style={ls.totalTxt}>{op.total} days off</Text>
            </View>
          </View>
        ))}
      </View>

      {/* All public holidays */}
      <Text style={s.sectionHdr}>All Malaysia Public Holidays 2026</Text>
      <View style={[s.card,{paddingVertical:0}]}>
        {PH_2026.map((ph, i) => (
          <View key={ph.date} style={[s.row, i===PH_2026.length-1 && {borderBottomWidth:0}]}>
            <View style={{flex:1}}>
              <View style={{flexDirection:'row', alignItems:'center', gap:6}}>
                <Text style={s.title}>{ph.name}</Text>
                {ph.indian && <Text style={{fontSize:14}}>🇮🇳</Text>}
              </View>
              <Text style={[s.small,{color:C.muted}]}>{ph.date} · {ph.day}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}
const ls = StyleSheet.create({
  balCard:      { marginHorizontal:SP.lg, marginTop:SP.lg, borderRadius:R.xxl, padding:SP.xl, ...shadowMd },
  leaveBadge:   { width:32, height:32, borderRadius:16, alignItems:'center', justifyContent:'center' },
  leaveBadgeTxt:{ fontSize:11, fontWeight:W.bold },
  totalBadge:   { backgroundColor:C.primaryLt, borderRadius:R.full, paddingHorizontal:8, paddingVertical:3 },
  totalTxt:     { fontSize:11, fontWeight:W.bold, color:C.primaryDk },
})
