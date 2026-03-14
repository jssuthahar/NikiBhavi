import { useState, useEffect, useCallback } from 'react'
import {
  ScrollView, View, Text, TextInput, TouchableOpacity,
  StyleSheet, Animated, RefreshControl
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons } from '@expo/vector-icons'
import { useLiveRate } from '../shared/useLiveRate'
import { getTodayTip, getMultipleTips } from '../shared/dailyTips'
import { C, s, SP, R, W, shadow, shadowMd } from '../src/theme/index'

const KEY = 'nikibhavi_profile'

function daysBetween(a, b) { return Math.max(0, Math.floor((b - a) / 86400000)) }
function daysElapsed(from) { return Math.max(0, Math.floor((Date.now() - new Date(from)) / 86400000)) }

function parseDate(str) {
  if (!str) return null
  const [y, m, d] = str.split('-').map(Number)
  if (!y || !m || !d) return null
  return new Date(y, m - 1, d)
}

export default function DashboardScreen() {
  const insets   = useSafeAreaInsets()
  const { rate, loading: rateLoading, error: rateError, refetch, updated } = useLiveRate()

  const [profile,   setProfile]   = useState(null)
  const [editing,   setEditing]   = useState(false)
  const [refreshing,setRefreshing]= useState(false)

  // Form state
  const [name,      setName]      = useState('')
  const [arrival,   setArrival]   = useState('')  // YYYY-MM-DD
  const [epExpiry,  setEpExpiry]  = useState('')
  const [salary,    setSalary]    = useState('')
  const [savings,   setSavings]   = useState('')

  const [convert,   setConvert]   = useState('')
  const [convertDir,setConvertDir]= useState('myr') // 'myr' or 'inr'

  const tip = getTodayTip()
  const tips = getMultipleTips(3)

  useEffect(() => { loadProfile() }, [])

  const loadProfile = async () => {
    try {
      const raw = await AsyncStorage.getItem(KEY)
      if (raw) {
        const p = JSON.parse(raw)
        setProfile(p)
        setName(p.name || ''); setArrival(p.arrival || '')
        setEpExpiry(p.epExpiry || ''); setSalary(p.salary || '')
        setSavings(p.savings || '')
      } else {
        setEditing(true) // First time — show setup
      }
    } catch { setEditing(true) }
  }

  const saveProfile = async () => {
    const p = { name, arrival, epExpiry, salary, savings }
    await AsyncStorage.setItem(KEY, JSON.stringify(p))
    setProfile(p)
    setEditing(false)
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }, [refetch])

  // Computed stats
  const arrivalDate = parseDate(profile?.arrival)
  const epDate      = parseDate(profile?.epExpiry)
  const daysInMY    = arrivalDate ? daysElapsed(arrivalDate) : null
  const taxResident = daysInMY !== null && daysInMY >= 182
  const daysTo182   = daysInMY !== null && !taxResident ? (182 - daysInMY) : null
  const epDaysLeft  = epDate ? daysBetween(Date.now(), epDate) : null
  const sal         = parseFloat(profile?.salary) || 0
  const sav         = parseFloat(profile?.savings) || 0
  const savInINR    = Math.round(sav * rate)

  const convertedVal = parseFloat(convert) || 0
  const convertResult = convertDir === 'myr'
    ? `₹ ${Math.round(convertedVal * rate).toLocaleString()}`
    : `RM ${(convertedVal / rate).toFixed(2)}`

  if (editing) return <SetupScreen
    name={name} setName={setName}
    arrival={arrival} setArrival={setArrival}
    epExpiry={epExpiry} setEpExpiry={setEpExpiry}
    salary={salary} setSalary={setSalary}
    savings={savings} setSavings={setSavings}
    onSave={saveProfile} isFirstTime={!profile}
  />

  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 32 + insets.bottom }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={C.primary} />}>

      {/* ── Header ── */}
      <View style={ls.header}>
        <View style={{ flex:1 }}>
          <Text style={ls.greeting}>Good {getGreeting()}! 🙏</Text>
          <Text style={ls.name}>{profile?.name || 'My Malaysia Dashboard'}</Text>
          <Text style={ls.subline}>🇮🇳 → 🇲🇾  Pull to refresh rates</Text>
        </View>
        <TouchableOpacity style={ls.editBtn} onPress={() => setEditing(true)}>
          <Ionicons name="settings-outline" size={20} color="rgba(255,255,255,0.8)" />
        </TouchableOpacity>
      </View>

      {/* ── Live Rate Card ── */}
      <View style={ls.rateCard}>
        <View style={ls.rateRow}>
          <View>
            <Text style={ls.rateLabel}>Live MYR → INR</Text>
            <View style={{ flexDirection:'row', alignItems:'flex-end', gap:6 }}>
              <Text style={ls.rateValue}>
                {rateLoading ? '...' : `₹${rate.toFixed(3)}`}
              </Text>
              <Text style={ls.rateSub}>per RM 1</Text>
            </View>
            {updated && <Text style={ls.rateTime}>Updated {updated.toLocaleTimeString('en-MY',{hour:'2-digit',minute:'2-digit'})}</Text>}
            {rateError && <Text style={[ls.rateTime,{color:C.warning}]}>⚠️ Using cached rate</Text>}
          </View>
          <View style={ls.rateRight}>
            <Text style={ls.rateEx}>RM 1,000 =</Text>
            <Text style={ls.rateExVal}>₹{Math.round(1000 * rate).toLocaleString()}</Text>
          </View>
        </View>

        {/* Quick converter */}
        <View style={ls.converter}>
          <TouchableOpacity style={[ls.convDir, convertDir==='myr' && ls.convDirOn]}
            onPress={() => setConvertDir('myr')} activeOpacity={0.7}>
            <Text style={[ls.convDirTxt, convertDir==='myr' && {color:C.primary}]}>RM→₹</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[ls.convDir, convertDir==='inr' && ls.convDirOn]}
            onPress={() => setConvertDir('inr')} activeOpacity={0.7}>
            <Text style={[ls.convDirTxt, convertDir==='inr' && {color:C.primary}]}>₹→RM</Text>
          </TouchableOpacity>
          <TextInput
            style={ls.convInput}
            value={convert}
            onChangeText={setConvert}
            keyboardType="numeric"
            placeholder={convertDir==='myr' ? 'Enter RM...' : 'Enter ₹...'}
            placeholderTextColor="rgba(255,255,255,0.4)"
            returnKeyType="done"
          />
          {convert ? (
            <View style={ls.convResult}>
              <Text style={ls.convResultTxt}>{convertResult}</Text>
            </View>
          ) : null}
        </View>
      </View>

      {/* ── My Stats ── */}
      {daysInMY !== null && (
        <>
          <Text style={s.sectionHdr}>My Malaysia Stats</Text>
          <View style={ls.statsGrid}>

            {/* Days in Malaysia */}
            <View style={[ls.statCard, {backgroundColor:'#0d0d0d'}]}>
              <Text style={ls.statEmoji}>📅</Text>
              <Text style={[ls.statBig,{color:'#C9F53B'}]}>{daysInMY}</Text>
              <Text style={ls.statLabel}>Days in Malaysia</Text>
            </View>

            {/* Tax residency */}
            <View style={[ls.statCard, {backgroundColor: taxResident ? C.primary : C.warning}]}>
              <Text style={ls.statEmoji}>{taxResident ? '✅' : '⏳'}</Text>
              <Text style={[ls.statBig,{color:'#fff'}]}>
                {taxResident ? 'Resident' : `${daysTo182}d`}
              </Text>
              <Text style={ls.statLabel}>
                {taxResident ? 'Tax Resident' : 'to Tax Residency'}
              </Text>
            </View>

            {/* EP expiry */}
            {epDaysLeft !== null && (
              <View style={[ls.statCard, {backgroundColor: epDaysLeft > 60 ? C.info : epDaysLeft > 30 ? C.warning : C.danger}]}>
                <Text style={ls.statEmoji}>🛂</Text>
                <Text style={[ls.statBig,{color:'#fff'}]}>{epDaysLeft}</Text>
                <Text style={ls.statLabel}>Days EP Valid</Text>
              </View>
            )}

            {/* Savings in INR */}
            {sav > 0 && (
              <View style={[ls.statCard, {backgroundColor:C.purple}]}>
                <Text style={ls.statEmoji}>💰</Text>
                <Text style={[ls.statBig,{color:'#fff',fontSize:15}]}>₹{Math.round(savInINR/1000)}K</Text>
                <Text style={ls.statLabel}>Savings in INR</Text>
              </View>
            )}
          </View>

          {/* Tax residency progress bar */}
          {!taxResident && daysInMY !== null && (
            <View style={ls.progressCard}>
              <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:SP.sm}}>
                <Text style={[s.small,{fontWeight:W.semibold}]}>Tax Residency Progress</Text>
                <Text style={[s.small,{color:C.primary}]}>{daysInMY}/182 days</Text>
              </View>
              <View style={ls.progressBg}>
                <View style={[ls.progressFill, {width:`${Math.round((daysInMY/182)*100)}%`}]} />
              </View>
              <Text style={[s.small,{color:C.muted,marginTop:4}]}>
                {daysTo182} more days for 0–30% progressive tax (vs 30% flat now)
              </Text>
            </View>
          )}
        </>
      )}

      {/* ── Daily Tip ── */}
      <Text style={s.sectionHdr}>💡 Today's Tip</Text>
      <View style={ls.tipCard}>
        <View style={{flexDirection:'row', alignItems:'flex-start', gap:SP.md}}>
          <Text style={{fontSize:28}}>{tip.emoji}</Text>
          <View style={{flex:1}}>
            <View style={[ls.catBadge]}>
              <Text style={ls.catBadgeTxt}>{tip.cat}</Text>
            </View>
            <Text style={[s.body,{marginTop:6,lineHeight:22}]}>{tip.tip}</Text>
          </View>
        </View>
      </View>

      {/* ── Upcoming tips preview ── */}
      <Text style={s.sectionHdr}>Coming Up</Text>
      {tips.slice(1).map((t, i) => (
        <View key={i} style={ls.miniTip}>
          <Text style={{fontSize:20, width:30}}>{t.emoji}</Text>
          <View style={{flex:1, marginLeft:SP.sm}}>
            <Text style={[s.small,{color:C.primary,fontWeight:W.semibold}]}>{t.cat}</Text>
            <Text style={[s.small,{color:C.sub,lineHeight:17}]} numberOfLines={2}>{t.tip}</Text>
          </View>
          <View style={ls.dayBadge}>
            <Text style={ls.dayBadgeTxt}>+{i+1}d</Text>
          </View>
        </View>
      ))}

      {/* ── Rate context ── */}
      <Text style={s.sectionHdr}>Rate Quick Reference</Text>
      <View style={[s.card,{paddingVertical:0}]}>
        {[500, 1000, 2000, 5000, 10000, 50000].map((rm, i, arr) => (
          <View key={rm} style={i < arr.length-1 ? s.row : s.rowLast}>
            <Text style={[s.body,{flex:1}]}>RM {rm.toLocaleString()}</Text>
            <Text style={[s.title,{color:C.primary}]}>₹{Math.round(rm * rate).toLocaleString()}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

// ── Setup / Edit Profile Screen ───────────────────────────────
function SetupScreen({ name, setName, arrival, setArrival, epExpiry, setEpExpiry,
  salary, setSalary, savings, setSavings, onSave, isFirstTime }) {
  return (
    <ScrollView style={s.screen} contentContainerStyle={{paddingBottom:60}}>
      <View style={ls.setupHeader}>
        <Text style={{fontSize:36}}>🇮🇳 🇲🇾</Text>
        <Text style={ls.setupTitle}>{isFirstTime ? 'Set Up Your Dashboard' : 'Edit Profile'}</Text>
        <Text style={ls.setupSub}>Personalize your Malaysia experience. All data stays on your phone.</Text>
      </View>

      <Text style={s.sectionHdr}>Your Info</Text>
      <View style={s.inputGroup}>
        <View style={s.inputRow}>
          <Text style={s.inputLabel}>Your Name</Text>
          <TextInput style={s.input} value={name} onChangeText={setName}
            placeholder="e.g. Suresh" placeholderTextColor={C.placeholder} returnKeyType="next" />
        </View>
        <View style={[s.inputRow,{borderBottomWidth:0}]}>
          <Text style={s.inputLabel}>Monthly Salary</Text>
          <Text style={[s.small,{marginRight:6,color:C.muted}]}>RM</Text>
          <TextInput style={s.input} value={salary} onChangeText={setSalary}
            keyboardType="numeric" placeholder="e.g. 8000" placeholderTextColor={C.placeholder} returnKeyType="next" />
        </View>
      </View>

      <Text style={s.sectionHdr}>Malaysia Dates</Text>
      <View style={s.inputGroup}>
        <View style={s.inputRow}>
          <Text style={s.inputLabel}>Arrival Date</Text>
          <TextInput style={s.input} value={arrival} onChangeText={setArrival}
            placeholder="YYYY-MM-DD" placeholderTextColor={C.placeholder} returnKeyType="next" />
        </View>
        <View style={[s.inputRow,{borderBottomWidth:0}]}>
          <Text style={s.inputLabel}>EP Expiry Date</Text>
          <TextInput style={s.input} value={epExpiry} onChangeText={setEpExpiry}
            placeholder="YYYY-MM-DD" placeholderTextColor={C.placeholder} returnKeyType="next" />
        </View>
      </View>

      <Text style={s.sectionHdr}>Savings Tracker (optional)</Text>
      <View style={s.inputGroup}>
        <View style={[s.inputRow,{borderBottomWidth:0}]}>
          <Text style={s.inputLabel}>Current Savings</Text>
          <Text style={[s.small,{marginRight:6,color:C.muted}]}>RM</Text>
          <TextInput style={s.input} value={savings} onChangeText={setSavings}
            keyboardType="numeric" placeholder="e.g. 15000" placeholderTextColor={C.placeholder} returnKeyType="done" />
        </View>
      </View>

      <View style={ls.setupNote}>
        <Ionicons name="lock-closed-outline" size={14} color={C.muted} />
        <Text style={[s.small,{flex:1,marginLeft:6,color:C.muted}]}>All data is stored only on your device. Nothing is sent to any server.</Text>
      </View>

      <TouchableOpacity style={[s.btnPrimary,{marginTop:SP.md}]} onPress={onSave} activeOpacity={0.8}>
        <Text style={s.btnText}>{isFirstTime ? '🚀 Set Up My Dashboard' : '✓ Save Changes'}</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}

const ls = StyleSheet.create({
  header:      { backgroundColor:C.primary, paddingHorizontal:SP.lg, paddingTop:SP.xl, paddingBottom:SP.xxl,
                 flexDirection:'row', alignItems:'flex-start' },
  greeting:    { fontSize:13, color:'rgba(255,255,255,0.75)', marginBottom:2 },
  name:        { fontSize:24, fontWeight:W.heavy, color:'#fff', letterSpacing:-0.5 },
  subline:     { fontSize:12, color:'rgba(255,255,255,0.6)', marginTop:2 },
  editBtn:     { width:40, height:40, borderRadius:20, backgroundColor:'rgba(255,255,255,0.15)',
                 alignItems:'center', justifyContent:'center' },

  rateCard:    { marginHorizontal:SP.lg, marginTop:-SP.xl, borderRadius:R.xxl,
                 backgroundColor:'#1a1a2e', padding:SP.lg, ...shadowMd },
  rateRow:     { flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start', marginBottom:SP.md },
  rateLabel:   { fontSize:11, color:'rgba(255,255,255,0.5)', fontWeight:W.semibold, textTransform:'uppercase', letterSpacing:0.5, marginBottom:4 },
  rateValue:   { fontSize:34, fontWeight:W.heavy, color:'#C9F53B', letterSpacing:-1 },
  rateSub:     { fontSize:12, color:'rgba(255,255,255,0.5)', marginBottom:4 },
  rateTime:    { fontSize:10, color:'rgba(255,255,255,0.4)' },
  rateRight:   { alignItems:'flex-end' },
  rateEx:      { fontSize:11, color:'rgba(255,255,255,0.4)' },
  rateExVal:   { fontSize:18, fontWeight:W.bold, color:'#fff' },

  converter:   { flexDirection:'row', alignItems:'center', gap:SP.sm,
                 backgroundColor:'rgba(255,255,255,0.08)', borderRadius:R.xl, padding:SP.sm },
  convDir:     { paddingHorizontal:SP.sm, paddingVertical:SP.xs, borderRadius:R.md },
  convDirOn:   { backgroundColor:'rgba(255,255,255,0.15)' },
  convDirTxt:  { fontSize:12, fontWeight:W.bold, color:'rgba(255,255,255,0.5)' },
  convInput:   { flex:1, fontSize:16, color:'#fff', paddingVertical:4 },
  convResult:  { backgroundColor:C.primary, borderRadius:R.lg, paddingHorizontal:SP.sm, paddingVertical:SP.xs },
  convResultTxt:{ fontSize:13, fontWeight:W.bold, color:'#fff' },

  statsGrid:   { flexDirection:'row', flexWrap:'wrap', paddingHorizontal:SP.lg, gap:SP.sm, marginBottom:4 },
  statCard:    { flex:1, minWidth:'45%', borderRadius:R.xl, padding:SP.md, alignItems:'center', ...shadow },
  statEmoji:   { fontSize:18, marginBottom:4 },
  statBig:     { fontSize:22, fontWeight:W.heavy, letterSpacing:-0.5 },
  statLabel:   { fontSize:10, color:'rgba(255,255,255,0.7)', marginTop:2, textAlign:'center' },

  progressCard:{ marginHorizontal:SP.lg, backgroundColor:'#fff', borderRadius:R.xl, padding:SP.lg, marginBottom:SP.sm, ...shadow },
  progressBg:  { height:8, backgroundColor:'#EEE', borderRadius:4, overflow:'hidden' },
  progressFill:{ height:8, backgroundColor:C.primary, borderRadius:4 },

  tipCard:     { marginHorizontal:SP.lg, backgroundColor:'#fff', borderRadius:R.xxl, padding:SP.lg, ...shadowMd,
                 borderLeftWidth:4, borderLeftColor:C.primary },
  catBadge:    { alignSelf:'flex-start', backgroundColor:C.primaryLt, borderRadius:R.full, paddingHorizontal:10, paddingVertical:3 },
  catBadgeTxt: { fontSize:11, fontWeight:W.bold, color:C.primaryDk },

  miniTip:     { marginHorizontal:SP.lg, marginBottom:SP.sm, backgroundColor:'#fff', borderRadius:R.xl,
                 padding:SP.md, flexDirection:'row', alignItems:'center', ...shadow },
  dayBadge:    { backgroundColor:'#F5F5F5', borderRadius:R.full, paddingHorizontal:8, paddingVertical:3 },
  dayBadgeTxt: { fontSize:11, fontWeight:W.bold, color:C.muted },

  setupHeader: { backgroundColor:C.primary, paddingHorizontal:SP.lg, paddingVertical:SP.xxl, alignItems:'center' },
  setupTitle:  { fontSize:22, fontWeight:W.bold, color:'#fff', marginTop:SP.sm },
  setupSub:    { fontSize:13, color:'rgba(255,255,255,0.75)', marginTop:4, textAlign:'center', lineHeight:19 },
  setupNote:   { flexDirection:'row', marginHorizontal:SP.lg, marginTop:SP.md, alignItems:'flex-start' },
})
