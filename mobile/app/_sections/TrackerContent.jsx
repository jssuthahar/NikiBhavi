import { useState, useEffect, useMemo } from 'react'
import {
  ScrollView, View, Text, TextInput, TouchableOpacity,
  StyleSheet, Dimensions
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { storage } from '../../shared/storage'
import { Ionicons } from '@expo/vector-icons'
import { useLiveRate } from '../../shared/useLiveRate'
import { useGoldRate } from '../../shared/useGoldRate'
import { C, s, SP, R, W, shadow, shadowMd } from '../../src/theme/index'

const KEY_SAL  = 'salary_history'
const { width: SW } = Dimensions.get('window')

const EPF_EMP  = 0.11
const EPF_ER   = 0.13
const EPF_DIV  = 0.055

export default function TrackerContent() {
  const insets = useSafeAreaInsets()
  const { rate }  = useLiveRate()
  const { gold }  = useGoldRate()
  const [tab,     setTab]     = useState('salary')
  const [history, setHistory] = useState([])
  const [form,    setForm]    = useState({ date:'', salary:'', note:'' })
  const [showAdd, setShowAdd] = useState(false)
  const [goldAmt, setGoldAmt] = useState('10')
  const [goldUnit,setGoldUnit]= useState('gram')

  useEffect(() => { loadHistory() }, [])

  const loadHistory = async () => {
    try {
      const raw = await storage.getItem(KEY_SAL)
      if (raw) setHistory(JSON.parse(raw))
    } catch {}
  }

  const saveHistory = async (h) => {
    await storage.setItem(KEY_SAL, JSON.stringify(h))
    setHistory(h)
  }

  const addEntry = async () => {
    if (!form.salary || !form.date) return
    const newH = [...history, { ...form, id: Date.now(), salary: parseFloat(form.salary) }]
      .sort((a, b) => a.date.localeCompare(b.date))
    await saveHistory(newH)
    setForm({ date:'', salary:'', note:'' })
    setShowAdd(false)
  }

  const removeEntry = async (id) => {
    await saveHistory(history.filter(h => h.id !== id))
  }

  // Computed
  const latest  = history[history.length - 1]
  const first   = history[0]
  const growth  = latest && first && first.salary > 0
    ? (((latest.salary - first.salary) / first.salary) * 100).toFixed(1)
    : null

  const epfProjection = useMemo(() => {
    if (!latest) return null
    const sal   = latest.salary
    const monthly = sal * (EPF_EMP + EPF_ER)
    const annual  = monthly * 12
    const proj5   = annual * ((Math.pow(1 + EPF_DIV, 5) - 1) / EPF_DIV) * (1 + EPF_DIV)
    const proj10  = annual * ((Math.pow(1 + EPF_DIV, 10) - 1) / EPF_DIV) * (1 + EPF_DIV)
    return { monthly, annual, proj5: Math.round(proj5), proj10: Math.round(proj10) }
  }, [latest])

  // Gold calculator
  const goldCalcResult = useMemo(() => {
    if (!gold) return null
    const amt = parseFloat(goldAmt) || 0
    const ratePerUnit = goldUnit === 'gram' ? gold.myrGram
      : goldUnit === 'sovereign' ? gold.myrSovereign
      : gold.myrGram * 8  // 1 emas = 8g
    return {
      myr: Math.round(amt * ratePerUnit),
      inr: Math.round(amt * ratePerUnit * rate),
    }
  }, [gold, goldAmt, goldUnit, rate])

  return (
    <View style={{ flex:1, backgroundColor:C.bg }}>
      {/* Header */}
      <View style={ls.header}>
        <Text style={ls.headerTitle}>📊 Trackers & Live Rates</Text>
        <Text style={ls.headerSub}>Salary growth, gold, and market rates</Text>
      </View>

      {/* Tab bar */}
      <View style={ls.tabBar}>
        {[['salary','💼 Salary'],['gold','🥇 Gold'],['rates','💱 Rates']].map(([id,lbl]) => (
          <TouchableOpacity key={id} style={[ls.tabBtn, tab===id && ls.tabBtnOn]}
            onPress={() => setTab(id)} activeOpacity={0.7}>
            <Text style={[ls.tabTxt, tab===id && { color:C.primary }]}>{lbl}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 + insets.bottom }}>

        {/* ══ SALARY TAB ══ */}
        {tab === 'salary' && (
          <View>
            {/* Summary cards */}
            {history.length > 0 && (
              <View style={ls.summaryRow}>
                <View style={[ls.sumCard, { backgroundColor:C.primary }]}>
                  <Text style={ls.sumLabel}>Current Salary</Text>
                  <Text style={ls.sumVal}>RM {latest.salary.toLocaleString()}</Text>
                  <Text style={ls.sumSub}>₹{Math.round(latest.salary * rate).toLocaleString()}/mo</Text>
                </View>
                {growth !== null && (
                  <View style={[ls.sumCard, { backgroundColor: parseFloat(growth) >= 0 ? C.teal : C.danger }]}>
                    <Text style={ls.sumLabel}>Total Growth</Text>
                    <Text style={ls.sumVal}>{parseFloat(growth) >= 0 ? '+' : ''}{growth}%</Text>
                    <Text style={ls.sumSub}>since {first.date?.slice(0,7)}</Text>
                  </View>
                )}
              </View>
            )}

            {/* Salary history */}
            <Text style={s.sectionHdr}>Salary History</Text>
            {history.length === 0 ? (
              <View style={ls.emptyBox}>
                <Text style={{ fontSize:40, marginBottom:SP.sm }}>💼</Text>
                <Text style={[s.title,{textAlign:'center'}]}>No salary entries yet</Text>
                <Text style={[s.small,{textAlign:'center',color:C.muted,marginTop:4}]}>Track your salary growth over time</Text>
              </View>
            ) : (
              <>
                {/* Bar chart */}
                <View style={ls.chartWrap}>
                  {history.map((h, i) => {
                    const max = Math.max(...history.map(x => x.salary))
                    const pct = max > 0 ? (h.salary / max) : 0
                    const isLast = i === history.length - 1
                    return (
                      <View key={h.id} style={ls.barCol}>
                        <Text style={[ls.barTop, { color: isLast ? C.primary : C.muted }]}>
                          {Math.round(h.salary/1000)}K
                        </Text>
                        <View style={ls.barBg}>
                          <View style={[ls.barFill, {
                            height:`${Math.round(pct*100)}%`,
                            backgroundColor: isLast ? C.primary : C.primaryLt,
                          }]} />
                        </View>
                        <Text style={ls.barLabel} numberOfLines={1}>
                          {h.date?.slice(0,7)?.replace('-','/')}
                        </Text>
                      </View>
                    )
                  })}
                </View>

                {/* List */}
                <View style={[s.card,{paddingVertical:0}]}>
                  {history.map((h, i) => {
                    const prev = history[i-1]
                    const hike = prev ? ((h.salary - prev.salary)/prev.salary*100).toFixed(1) : null
                    return (
                      <View key={h.id} style={i < history.length-1 ? s.row : s.rowLast}>
                        <View style={{ flex:1 }}>
                          <View style={{ flexDirection:'row', alignItems:'center', gap:SP.sm }}>
                            <Text style={s.title}>RM {h.salary.toLocaleString()}</Text>
                            {hike !== null && (
                              <View style={[ls.hikePill, { backgroundColor: parseFloat(hike)>0 ? '#E6F7EE' : '#FFF0EF' }]}>
                                <Text style={[ls.hikeTxt, { color: parseFloat(hike)>0 ? C.primary : C.danger }]}>
                                  {parseFloat(hike)>0?'+':''}{hike}%
                                </Text>
                              </View>
                            )}
                          </View>
                          <Text style={s.small}>{h.date} {h.note ? `· ${h.note}` : ''}</Text>
                        </View>
                        <TouchableOpacity onPress={() => removeEntry(h.id)} style={{ padding:SP.xs }}>
                          <Ionicons name="trash-outline" size={16} color={C.muted} />
                        </TouchableOpacity>
                      </View>
                    )
                  })}
                </View>
              </>
            )}

            {/* Add entry form */}
            {showAdd ? (
              <View style={ls.addForm}>
                <Text style={[s.title,{marginBottom:SP.sm}]}>Add Salary Entry</Text>
                {[
                  { label:'Date (YYYY-MM)', key:'date', ph:'2026-01', kb:'default' },
                  { label:'Monthly Salary (RM)', key:'salary', ph:'e.g. 9000', kb:'numeric' },
                  { label:'Note (optional)', key:'note', ph:'e.g. Annual hike', kb:'default' },
                ].map(f => (
                  <View key={f.key} style={ls.formRow}>
                    <Text style={ls.formLabel}>{f.label}</Text>
                    <TextInput style={ls.formInput} value={form[f.key]}
                      onChangeText={v => setForm(p => ({...p, [f.key]:v}))}
                      placeholder={f.ph} placeholderTextColor={C.placeholder}
                      keyboardType={f.kb} returnKeyType="next" />
                  </View>
                ))}
                <View style={{ flexDirection:'row', gap:SP.sm, marginTop:SP.sm }}>
                  <TouchableOpacity style={[s.btnSecondary,{flex:1,marginHorizontal:0}]} onPress={() => setShowAdd(false)}>
                    <Text style={s.btnTextSec}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[s.btnPrimary,{flex:1,marginHorizontal:0}]} onPress={addEntry}>
                    <Text style={s.btnText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity style={[s.btnPrimary,{marginTop:SP.sm}]} onPress={() => setShowAdd(true)}>
                <Text style={s.btnText}>+ Add Salary Entry</Text>
              </TouchableOpacity>
            )}

            {/* EPF projection */}
            {epfProjection && (
              <>
                <Text style={s.sectionHdr}>EPF Projection</Text>
                <View style={[s.card,{paddingVertical:0}]}>
                  {[
                    ['Monthly EPF total',  `RM ${Math.round(epfProjection.monthly).toLocaleString()}`],
                    ['Annual EPF total',   `RM ${Math.round(epfProjection.annual).toLocaleString()}`],
                    ['Corpus in 5 years',  `RM ${epfProjection.proj5.toLocaleString()}`],
                    ['Corpus in 10 years', `RM ${epfProjection.proj10.toLocaleString()}`],
                  ].map(([l,v],i,arr) => (
                    <View key={l} style={i < arr.length-1 ? s.row : s.rowLast}>
                      <Text style={[s.body,{flex:1}]}>{l}</Text>
                      <Text style={[s.title,{color:i>=2?C.primary:C.label}]}>{v}</Text>
                    </View>
                  ))}
                </View>
                <View style={ls.epfNote}>
                  <Text style={ls.epfNoteTxt}>Based on 5.5% EPF dividend, 11% employee + 13% employer contribution at current salary</Text>
                </View>
              </>
            )}
          </View>
        )}

        {/* ══ GOLD TAB ══ */}
        {tab === 'gold' && (
          <View>
            {gold ? (
              <>
                {/* Live gold price */}
                <View style={[ls.goldHero, { backgroundColor:'#1a1400' }]}>
                  <Text style={ls.goldLabel}>🥇 Live Gold Price</Text>
                  <Text style={ls.goldMYR}>RM {gold.myrGram.toLocaleString()}</Text>
                  <Text style={ls.goldSub}>per gram · ₹{gold.inrGram.toLocaleString()}/gram</Text>
                  {gold.isFallback && <Text style={[ls.goldSub,{color:C.warning}]}>⚠️ Approximate rate</Text>}
                  {gold.updated && <Text style={ls.goldTime}>Updated {gold.updated.toLocaleTimeString('en-MY',{hour:'2-digit',minute:'2-digit'})}</Text>}
                </View>

                {/* Standard weights */}
                <Text style={s.sectionHdr}>Common Weights</Text>
                <View style={[s.card,{paddingVertical:0}]}>
                  {[
                    ['1 gram',    '24K', gold.myrGram],
                    ['1 gram',    '22K (916)', gold.myr916],
                    ['8 grams',   '1 Emas', gold.myr8g],
                    ['10 grams',  '10g bar', gold.myr10g],
                    ['1 Sovereign','7.98g (UK)', gold.myrSovereign],
                  ].map(([qty,label,myr],i,arr) => (
                    <View key={label} style={i < arr.length-1 ? s.row : s.rowLast}>
                      <View style={{flex:1}}>
                        <Text style={s.title}>{label}</Text>
                        <Text style={s.small}>{qty}</Text>
                      </View>
                      <View style={{alignItems:'flex-end'}}>
                        <Text style={[s.title,{color:'#B8860B'}]}>RM {myr.toLocaleString()}</Text>
                        <Text style={[s.small,{color:C.muted}]}>₹{Math.round(myr * rate).toLocaleString()}</Text>
                      </View>
                    </View>
                  ))}
                </View>

                {/* Gold calculator */}
                <Text style={s.sectionHdr}>Gold Calculator</Text>
                <View style={[s.card]}>
                  <View style={{ flexDirection:'row', gap:SP.sm, marginBottom:SP.md }}>
                    {[['gram','Per Gram'],['emas','Per Emas (8g)'],['sovereign','Per Sovereign']].map(([id,lbl]) => (
                      <TouchableOpacity key={id} style={[ls.unitBtn, goldUnit===id && ls.unitBtnOn]}
                        onPress={() => setGoldUnit(id)} activeOpacity={0.7}>
                        <Text style={[ls.unitTxt, goldUnit===id && {color:C.primary}]}>{lbl}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <View style={s.inputRow}>
                    <Text style={s.inputLabel}>Quantity</Text>
                    <TextInput style={s.input} value={goldAmt} onChangeText={setGoldAmt}
                      keyboardType="numeric" placeholder="e.g. 10" placeholderTextColor={C.placeholder} />
                  </View>
                  {goldCalcResult && (
                    <View style={[ls.goldResult]}>
                      <View style={{flex:1, alignItems:'center'}}>
                        <Text style={[s.small,{color:'rgba(255,255,255,0.7)'}]}>MYR Value</Text>
                        <Text style={ls.goldResultVal}>RM {goldCalcResult.myr.toLocaleString()}</Text>
                      </View>
                      <View style={ls.divider} />
                      <View style={{flex:1, alignItems:'center'}}>
                        <Text style={[s.small,{color:'rgba(255,255,255,0.7)'}]}>INR Value</Text>
                        <Text style={ls.goldResultVal}>₹{goldCalcResult.inr.toLocaleString()}</Text>
                      </View>
                    </View>
                  )}
                </View>

                {/* Buy tips */}
                <Text style={s.sectionHdr}>Best to Buy in Malaysia</Text>
                <View style={[s.card,{paddingVertical:0}]}>
                  {[
                    { item:'916 Gold Jewellery',  where:'Jewellers in Brickfields, Cheras', why:'22K (91.6% pure) — same purity as India but often 10–15% cheaper with better craftsmanship', emoji:'💛' },
                    { item:'Gold Bars/Coins',      where:'Maybank, CIMB, Public Bank, precious metals shops', why:'Investment-grade 999.9 gold. Buy 1g, 5g, 10g, 50g bars. No GST on investment gold!', emoji:'🥇' },
                    { item:'Public Gold (PG)',     where:'publicgold.com.my', why:'Malaysia\'s largest gold dealer. 999 gold dinar coins and bars. Buyback guaranteed.', emoji:'🏆' },
                    { item:'Tomei / Habib Jewels', where:'All major malls', why:'Trusted Malaysian gold brands. CNY & Deepavali sales offer 20–30% off making charges.', emoji:'✨' },
                  ].map((b,i,arr) => (
                    <View key={b.item} style={[s.row, i===arr.length-1 && {borderBottomWidth:0}]}>
                      <Text style={{fontSize:22,width:34}}>{b.emoji}</Text>
                      <View style={{flex:1, marginLeft:SP.sm}}>
                        <Text style={s.title}>{b.item}</Text>
                        <Text style={[s.small,{color:C.primary}]}>📍 {b.where}</Text>
                        <Text style={[s.small,{lineHeight:17,marginTop:2}]}>{b.why}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </>
            ) : (
              <View style={ls.emptyBox}>
                <Text style={{fontSize:40}}>🥇</Text>
                <Text style={[s.small,{color:C.muted,marginTop:SP.sm}]}>Loading gold rates...</Text>
              </View>
            )}
          </View>
        )}

        {/* ══ RATES TAB ══ */}
        {tab === 'rates' && <LiveRatesTab rate={rate} gold={gold} />}

      </ScrollView>
    </View>
  )
}

// ── Live Rates Tab ────────────────────────────────────────────
function LiveRatesTab({ rate, gold }) {
  const BEST_BUY = [
    { item:'Cadbury Chocolate',  saving:'30–40% cheaper than India',         where:'Any supermarket',      emoji:'🍫', price:'RM 3–8' },
    { item:'Ferrero Rocher',     saving:'25% cheaper, duty-free even more',  where:'Langkawi for best deal',emoji:'🎁', price:'RM 25–45' },
    { item:'Milo (Nestle)',      saving:'Original Malaysian Milo — different formula', where:'Any supermarket', emoji:'☕', price:'RM 12–18' },
    { item:'Electronics',        saving:'No import duty on most items',       where:'Lowyat Plaza KL',      emoji:'💻', price:'Market rate' },
    { item:'Perfume & cosmetics',saving:'15–20% cheaper at Langkawi',        where:'Langkawi duty-free',    emoji:'🌹', price:'Varies' },
    { item:'916 Gold jewellery', saving:'10–15% cheaper making charges vs India', where:'Brickfields, Cheras', emoji:'💍', price:'Per gram' },
    { item:'Padini / F.O.S',    saving:'Quality Malaysian fashion very cheap', where:'All malls',           emoji:'👕', price:'RM 20–80' },
    { item:'Seafood',            saving:'Fresh & cheapest in Asia here',      where:'Port Klang, Rawang',   emoji:'🦐', price:'RM 15–40/kg' },
    { item:'Laptop (no GST)',    saving:'Digital goods 0% GST = cheaper',    where:'Lowyat / online',      emoji:'💻', price:'Market -10%' },
    { item:'Durian (in season)', saving:'World\'s best durian at farm prices',where:'Bentong, Raub (Jul–Aug)',emoji:'🌵',price:'RM 20–80/kg'},
  ]

  return (
    <View>
      {/* Currency quick cards */}
      <Text style={s.sectionHdr}>Live Exchange Rates</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal:SP.lg, gap:SP.sm, paddingBottom:SP.sm }}>
        {[
          { from:'RM 1',    to:`₹${rate.toFixed(2)}`,   label:'MYR → INR', color:C.primary },
          { from:'₹ 1,000', to:`RM ${(1000/rate).toFixed(1)}`, label:'INR → MYR', color:C.info   },
          { from:'RM 1,000',to:`₹${Math.round(1000*rate).toLocaleString()}`, label:'RM 1K in INR', color:C.purple },
          { from:'RM 5,000',to:`₹${Math.round(5000*rate).toLocaleString()}`, label:'RM 5K in INR', color:C.teal  },
        ].map(c => (
          <View key={c.label} style={[ls.rateCard, { borderTopColor:c.color }]}>
            <Text style={ls.rateFrom}>{c.from}</Text>
            <Ionicons name="arrow-down" size={14} color={c.color} />
            <Text style={[ls.rateTo,{color:c.color}]}>{c.to}</Text>
            <Text style={ls.rateLabel}>{c.label}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Gold quick */}
      {gold && (
        <>
          <Text style={s.sectionHdr}>Gold Today</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal:SP.lg, gap:SP.sm, paddingBottom:SP.sm }}>
            {[
              { label:'Per gram (24K)',  myr:gold.myrGram },
              { label:'Per gram (916)', myr:gold.myr916 },
              { label:'1 Emas (8g)',    myr:gold.myr8g },
              { label:'1 Sovereign',    myr:gold.myrSovereign },
            ].map(g => (
              <View key={g.label} style={[ls.rateCard, { borderTopColor:'#B8860B' }]}>
                <Text style={ls.rateFrom}>🥇 {g.label}</Text>
                <Text style={[ls.rateTo,{color:'#B8860B'}]}>RM {g.myr.toLocaleString()}</Text>
                <Text style={ls.rateLabel}>₹{Math.round(g.myr * rate).toLocaleString()}</Text>
              </View>
            ))}
          </ScrollView>
        </>
      )}

      {/* Best things to buy */}
      <Text style={s.sectionHdr}>🛒 Best to Buy in Malaysia</Text>
      <Text style={[s.small,{paddingHorizontal:SP.lg,color:C.muted,marginBottom:SP.sm}]}>
        Items that are genuinely cheaper here than India or Singapore
      </Text>
      <View style={[s.card,{paddingVertical:0}]}>
        {BEST_BUY.map((b,i) => (
          <View key={b.item} style={i < BEST_BUY.length-1 ? s.row : s.rowLast}>
            <Text style={{fontSize:22,width:34}}>{b.emoji}</Text>
            <View style={{flex:1, marginLeft:SP.sm}}>
              <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <Text style={[s.title,{flex:1}]}>{b.item}</Text>
                <Text style={[s.small,{color:C.primary,fontWeight:W.bold}]}>{b.price}</Text>
              </View>
              <Text style={[s.small,{color:C.muted}]}>📍 {b.where}</Text>
              <Text style={[s.small,{color:C.sub,lineHeight:17,marginTop:2}]}>💡 {b.saving}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

const ls = StyleSheet.create({
  header:      { backgroundColor:C.primary, paddingHorizontal:SP.lg, paddingVertical:SP.lg },
  headerTitle: { fontSize:20, fontWeight:W.bold, color:'#fff' },
  headerSub:   { fontSize:12, color:'rgba(255,255,255,0.75)', marginTop:2 },

  tabBar:      { flexDirection:'row', backgroundColor:'#fff', borderBottomWidth:1, borderBottomColor:'#EEE' },
  tabBtn:      { flex:1, paddingVertical:SP.md, alignItems:'center' },
  tabBtnOn:    { borderBottomWidth:2, borderBottomColor:C.primary },
  tabTxt:      { fontSize:12, fontWeight:W.bold, color:C.muted },

  summaryRow:  { flexDirection:'row', paddingHorizontal:SP.lg, paddingTop:SP.md, gap:SP.sm },
  sumCard:     { flex:1, borderRadius:R.xl, padding:SP.md, ...shadowMd },
  sumLabel:    { fontSize:10, color:'rgba(255,255,255,0.75)', fontWeight:W.semibold, textTransform:'uppercase' },
  sumVal:      { fontSize:22, fontWeight:W.heavy, color:'#fff', marginTop:2 },
  sumSub:      { fontSize:11, color:'rgba(255,255,255,0.7)', marginTop:2 },

  emptyBox:    { margin:SP.xl, alignItems:'center', padding:SP.xl,
                 backgroundColor:'#fff', borderRadius:R.xxl, ...shadow },

  chartWrap:   { flexDirection:'row', height:120, marginHorizontal:SP.lg, marginBottom:SP.md,
                 backgroundColor:'#fff', borderRadius:R.xl, padding:SP.md, gap:SP.xs, alignItems:'flex-end', ...shadow },
  barCol:      { flex:1, alignItems:'center' },
  barTop:      { fontSize:9, fontWeight:W.bold, marginBottom:2 },
  barBg:       { flex:1, width:'80%', backgroundColor:'#EEE', borderRadius:3, overflow:'hidden', justifyContent:'flex-end' },
  barFill:     { width:'100%', borderRadius:3 },
  barLabel:    { fontSize:8, color:C.muted, marginTop:2, textAlign:'center' },

  hikePill:    { borderRadius:R.full, paddingHorizontal:6, paddingVertical:2 },
  hikeTxt:     { fontSize:10, fontWeight:W.bold },

  addForm:     { marginHorizontal:SP.lg, backgroundColor:'#fff', borderRadius:R.xxl, padding:SP.lg, ...shadowMd },
  formRow:     { marginBottom:SP.sm },
  formLabel:   { fontSize:12, fontWeight:W.medium, color:C.sub, marginBottom:4 },
  formInput:   { backgroundColor:'#F5F5F5', borderRadius:R.lg, paddingHorizontal:SP.md,
                 paddingVertical:10, fontSize:15, color:C.label },

  epfNote:     { marginHorizontal:SP.lg, marginBottom:SP.md },

  goldHero:    { marginHorizontal:SP.lg, marginTop:SP.lg, borderRadius:R.xxl, padding:SP.xl, ...shadowMd },
  goldLabel:   { fontSize:11, color:'rgba(255,255,255,0.5)', textTransform:'uppercase', letterSpacing:0.5, marginBottom:SP.xs },
  goldMYR:     { fontSize:36, fontWeight:W.heavy, color:'#FFD700', letterSpacing:-1 },
  goldSub:     { fontSize:13, color:'rgba(255,255,255,0.6)', marginTop:4 },
  goldTime:    { fontSize:10, color:'rgba(255,255,255,0.35)', marginTop:SP.xs },
  goldResult:  { flexDirection:'row', backgroundColor:'#1a1400', borderRadius:R.xl, padding:SP.md, marginTop:SP.md },
  goldResultVal:{ fontSize:18, fontWeight:W.bold, color:'#FFD700', marginTop:2 },
  divider:     { width:1, backgroundColor:'rgba(255,255,255,0.15)' },
  unitBtn:     { flex:1, paddingVertical:SP.xs, borderRadius:R.md, alignItems:'center', backgroundColor:'#F5F5F5' },
  unitBtnOn:   { backgroundColor:C.primaryLt },
  unitTxt:     { fontSize:10, fontWeight:W.bold, color:C.muted },

  rateCard:    { backgroundColor:'#fff', borderRadius:R.xl, padding:SP.md, width:140,
                 borderTopWidth:3, alignItems:'center', ...shadow },
  rateFrom:    { fontSize:11, color:C.muted, marginBottom:4 },
  rateTo:      { fontSize:18, fontWeight:W.heavy },
  rateLabel:   { fontSize:10, color:C.muted, marginTop:2 },
})
