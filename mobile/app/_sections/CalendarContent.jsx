import { useState, useRef } from 'react'
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { EVENTS_2026, EVENTS_2027, TYPE_COLORS, getUpcomingEvents, getDaysUntil } from '../../shared/eventsData'
import { C, s, SP, R, W, shadow, shadowMd } from '../../src/theme/index'

const ALL_EVENTS = [...EVENTS_2026, ...EVENTS_2027]
  .map(e => ({ ...e, dateObj: new Date(e.date) }))
  .sort((a, b) => a.dateObj - b.dateObj)

const MONTHS_2026 = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export default function CalendarContent() {
  const insets  = useSafeAreaInsets()
  const [tab,   setTab]   = useState('upcoming')
  const [year,  setYear]  = useState('2026')
  const [filter,setFilter]= useState('all')

  const upcoming = getUpcomingEvents(90)
  const nextDeadline = upcoming.find(e => e.type === 'deadline')
  const nextHoliday  = upcoming.find(e => e.type === 'holiday')
  const nextIndian   = upcoming.find(e => e.type === 'indian')

  const yearEvents = (year === '2026' ? EVENTS_2026 : EVENTS_2027)
    .map(e => ({ ...e, dateObj: new Date(e.date) }))
    .filter(e => filter === 'all' || e.type === filter)

  return (
    <View style={{ flex:1, backgroundColor:C.bg }}>
      {/* Header */}
      <View style={ls.header}>
        <Text style={ls.headerTitle}>🗓️ Malaysia Calendar</Text>
        <Text style={ls.headerSub}>2026 & 2027 — Holidays, festivals & deadlines</Text>
      </View>

      {/* Quick stats */}
      <View style={ls.quickRow}>
        {[
          { label:'Next Holiday',  val: nextHoliday  ? (getDaysUntil(nextHoliday.date) + 'd')  : '—', name: nextHoliday?.emoji,  color:C.primary },
          { label:'Next Festival', val: nextIndian   ? (getDaysUntil(nextIndian.date) + 'd')    : '—', name: nextIndian?.emoji,   color:C.danger  },
          { label:'Next Deadline', val: nextDeadline ? (getDaysUntil(nextDeadline.date) + 'd')  : '—', name: nextDeadline?.emoji, color:C.warning },
        ].map(q => (
          <View key={q.label} style={[ls.quickCard, { borderTopColor:q.color }]}>
            <Text style={{ fontSize:20 }}>{q.name}</Text>
            <Text style={[ls.quickVal, { color:q.color }]}>{q.val ?? '—'}</Text>
            <Text style={ls.quickLabel}>{q.label}</Text>
          </View>
        ))}
      </View>

      {/* Tab bar */}
      <View style={ls.tabBar}>
        {[['upcoming','⚡ Upcoming'],['2026','📅 2026'],['2027','📅 2027']].map(([id,lbl]) => (
          <TouchableOpacity key={id}
            style={[ls.tabBtn, (tab===id || (tab===id)) && ls.tabBtnOn]}
            onPress={() => { setTab(id); if (id==='2026'||id==='2027') setYear(id) }}
            activeOpacity={0.7}>
            <Text style={[ls.tabBtnTxt, tab===id && { color:C.primary }]}>{lbl}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Filter chips — for year views */}
      {(tab==='2026'||tab==='2027') && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal:SP.lg, paddingVertical:SP.sm, gap:SP.sm }}>
          {[['all','All'],['holiday','🏖️ Holidays'],['indian','🇮🇳 Indian'],['deadline','⚠️ Deadlines'],['fun','🎉 Fun']].map(([id,lbl]) => (
            <TouchableOpacity key={id} style={[ls.chip, filter===id && ls.chipOn]}
              onPress={() => setFilter(id)} activeOpacity={0.7}>
              <Text style={[ls.chipTxt, filter===id && { color:C.primary }]}>{lbl}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 + insets.bottom }}>

        {tab === 'upcoming' && (
          <View style={{ paddingTop:SP.sm }}>
            <Text style={[s.sectionHdr,{marginTop:0}]}>Next 90 Days</Text>
            {upcoming.length === 0
              ? <Text style={[s.small,{textAlign:'center',padding:SP.xl,color:C.muted}]}>No events in next 90 days</Text>
              : upcoming.map((ev, i) => <EventCard key={i} event={ev} showCountdown />)
            }
          </View>
        )}

        {(tab==='2026'||tab==='2027') && (
          <View style={{ paddingTop:SP.sm }}>
            {yearEvents.map((ev, i) => <EventCard key={i} event={ev} />)}
          </View>
        )}
      </ScrollView>
    </View>
  )
}

function EventCard({ event: ev, showCountdown }) {
  const tc      = TYPE_COLORS[ev.type] || TYPE_COLORS.fun
  const daysLeft = getDaysUntil(ev.date)
  const isToday  = daysLeft === 0
  const isPast   = daysLeft < 0

  return (
    <View style={[ls.eventCard, isPast && { opacity:0.5 }]}>
      <View style={[ls.eventLeft, { backgroundColor: tc.bg }]}>
        <Text style={{ fontSize:26 }}>{ev.emoji}</Text>
        {showCountdown && !isPast && (
          <Text style={[ls.countdown, { color: tc.text }]}>
            {isToday ? 'Today!' : `${daysLeft}d`}
          </Text>
        )}
      </View>
      <View style={{ flex:1, marginLeft:SP.md }}>
        <View style={{ flexDirection:'row', alignItems:'center', gap:SP.xs, marginBottom:2 }}>
          <Text style={[s.title,{flex:1,fontSize:14}]}>{ev.name}</Text>
          <View style={[ls.typePill, { backgroundColor: tc.bg }]}>
            <Text style={[ls.typeTxt, { color:tc.text }]}>{tc.label}</Text>
          </View>
        </View>
        <Text style={[s.small,{color:C.muted,marginBottom:3}]}>
          {ev.dateObj.toLocaleDateString('en-MY',{weekday:'short',day:'numeric',month:'short',year:'numeric'})}
        </Text>
        {ev.note && <Text style={[s.small,{color:C.sub,lineHeight:17}]}>{ev.note}</Text>}
      </View>
    </View>
  )
}

const ls = StyleSheet.create({
  header:      { backgroundColor:C.primary, paddingHorizontal:SP.lg, paddingVertical:SP.lg },
  headerTitle: { fontSize:20, fontWeight:W.bold, color:'#fff' },
  headerSub:   { fontSize:12, color:'rgba(255,255,255,0.75)', marginTop:2 },

  quickRow:    { flexDirection:'row', paddingHorizontal:SP.lg, paddingVertical:SP.md, gap:SP.sm },
  quickCard:   { flex:1, backgroundColor:'#fff', borderRadius:R.lg, padding:SP.sm,
                 alignItems:'center', borderTopWidth:3, ...shadow },
  quickVal:    { fontSize:18, fontWeight:W.heavy, marginTop:2 },
  quickLabel:  { fontSize:9, color:C.muted, fontWeight:W.semibold, textAlign:'center', marginTop:1 },

  tabBar:      { flexDirection:'row', backgroundColor:'#fff', borderBottomWidth:1, borderBottomColor:'#EEE' },
  tabBtn:      { flex:1, paddingVertical:SP.md, alignItems:'center' },
  tabBtnOn:    { borderBottomWidth:2, borderBottomColor:C.primary },
  tabBtnTxt:   { fontSize:12, fontWeight:W.bold, color:C.muted },

  chip:        { paddingHorizontal:SP.md, paddingVertical:6, borderRadius:R.full, backgroundColor:'#F5F5F5' },
  chipOn:      { backgroundColor:C.primaryLt },
  chipTxt:     { fontSize:12, fontWeight:W.semibold, color:C.sub },

  eventCard:   { marginHorizontal:SP.lg, marginBottom:SP.sm, backgroundColor:'#fff',
                 borderRadius:R.xl, flexDirection:'row', overflow:'hidden', ...shadow },
  eventLeft:   { width:72, alignItems:'center', justifyContent:'center', paddingVertical:SP.md },
  countdown:   { fontSize:11, fontWeight:W.heavy, marginTop:2 },
  typePill:    { borderRadius:R.full, paddingHorizontal:6, paddingVertical:2 },
  typeTxt:     { fontSize:9, fontWeight:W.bold },
})
