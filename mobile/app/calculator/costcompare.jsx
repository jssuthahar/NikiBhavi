import { useState } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { C, s, SP, R, W, shadow, shadowMd } from '../../src/theme/index'

const MYR_INR = 19.5
const CITIES = [
  {
    id:'kl', name:'Kuala Lumpur', flag:'🇲🇾', currency:'RM', rate:1,
    costs:{
      rent1br:1800, rent2br:2800, meal_cheap:10, meal_mid:35, groceries:600,
      transport_pass:100, internet:80, gym:80, beer:18, coffee:8,
      cinema:15, mobile:60, utilities:150,
    }
  },
  {
    id:'chennai', name:'Chennai', flag:'🇮🇳', currency:'₹', rate:1/MYR_INR,
    costs:{
      rent1br:20000, rent2br:35000, meal_cheap:150, meal_mid:600, groceries:8000,
      transport_pass:1500, internet:800, gym:1200, beer:250, coffee:80,
      cinema:250, mobile:400, utilities:2000,
    }
  },
  {
    id:'bangalore', name:'Bangalore', flag:'🇮🇳', currency:'₹', rate:1/MYR_INR,
    costs:{
      rent1br:28000, rent2br:50000, meal_cheap:200, meal_mid:700, groceries:10000,
      transport_pass:2500, internet:800, gym:1500, beer:300, coffee:100,
      cinema:300, mobile:400, utilities:2500,
    }
  },
  {
    id:'singapore', name:'Singapore', flag:'🇸🇬', currency:'SGD', rate:3.5,
    costs:{
      rent1br:3500, rent2br:5000, meal_cheap:60, meal_mid:120, groceries:900,
      transport_pass:120, internet:40, gym:80, beer:15, coffee:7,
      cinema:15, mobile:30, utilities:100,
    }
  },
]

const ITEMS = [
  { id:'rent1br',        label:'1BR Apartment/month',  emoji:'🏠' },
  { id:'rent2br',        label:'2BR Apartment/month',  emoji:'🏡' },
  { id:'meal_cheap',     label:'Budget meal',           emoji:'🍛' },
  { id:'meal_mid',       label:'Restaurant meal (2)',   emoji:'🍽️' },
  { id:'groceries',      label:'Monthly groceries',     emoji:'🛒' },
  { id:'transport_pass', label:'Monthly transport pass',emoji:'🚇' },
  { id:'internet',       label:'Internet/month',        emoji:'📡' },
  { id:'mobile',         label:'Mobile plan/month',     emoji:'📱' },
  { id:'utilities',      label:'Utilities/month',       emoji:'💡' },
  { id:'gym',            label:'Gym membership',        emoji:'💪' },
  { id:'cinema',         label:'Cinema ticket',         emoji:'🎬' },
  { id:'coffee',         label:'Coffee (cafe)',          emoji:'☕' },
]

export default function CostCompareScreen() {
  const [base, setBase] = useState('kl')
  const baseCity = CITIES.find(c => c.id === base)

  // Convert all to MYR for comparison
  const toMYR = (city, item) => city.costs[item] * city.rate

  const MONTHLY_TOTAL_ITEMS = ['rent1br','meal_cheap','groceries','transport_pass','internet','mobile','utilities']
  const monthlyTotals = CITIES.map(city => ({
    ...city,
    total: MONTHLY_TOTAL_ITEMS.reduce((sum, item) => sum + toMYR(city, item), 0)
  }))

  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom:40 }}>

      {/* City total comparison */}
      <Text style={s.sectionHdr}>Monthly Cost of Living</Text>
      <View style={ls.cityCards}>
        {monthlyTotals.map(city => {
          const isCheapest = city.total === Math.min(...monthlyTotals.map(c => c.total))
          return (
            <View key={city.id} style={[ls.cityCard, isCheapest && ls.cityCardBest]}>
              <Text style={{fontSize:22}}>{city.flag}</Text>
              <Text style={[ls.cityName]}>{city.name}</Text>
              <Text style={[ls.cityMYR, {color: isCheapest ? C.primary : C.label}]}>
                RM {Math.round(city.total).toLocaleString()}
              </Text>
              <Text style={ls.cityINR}>₹{Math.round(city.total * MYR_INR).toLocaleString()}</Text>
              {isCheapest && <View style={ls.bestBadge}><Text style={ls.bestTxt}>Cheapest</Text></View>}
            </View>
          )
        })}
      </View>

      {/* Item-by-item comparison */}
      <Text style={s.sectionHdr}>Item-by-Item Comparison (in MYR)</Text>
      <View style={[s.card,{paddingVertical:0}]}>
        {/* Header */}
        <View style={[ls.tableRow, ls.tableHdr]}>
          <Text style={[ls.tableCell, {flex:2}]}>Item</Text>
          {CITIES.map(c => (
            <Text key={c.id} style={[ls.tableCell, ls.tableHdrTxt]}>{c.flag}</Text>
          ))}
        </View>
        {ITEMS.map((item, i) => {
          const vals = CITIES.map(c => toMYR(c, item.id))
          const minVal = Math.min(...vals)
          return (
            <View key={item.id} style={[ls.tableRow, i === ITEMS.length-1 && {borderBottomWidth:0}]}>
              <Text style={[ls.tableCell, {flex:2, fontSize:12}]}>{item.emoji} {item.label}</Text>
              {CITIES.map((city, ci) => {
                const val = vals[ci]
                const isBest = val === minVal
                return (
                  <Text key={city.id} style={[ls.tableCell, ls.tableVal, isBest && ls.tableValBest]}>
                    {Math.round(val)}
                  </Text>
                )
              })}
            </View>
          )
        })}
      </View>

      <View style={ls.note}>
        <Text style={ls.noteTxt}>💡 All values converted to MYR for comparison. Green = cheapest for that item. Figures are approximate 2025–2026 averages.</Text>
      </View>
    </ScrollView>
  )
}
const ls = StyleSheet.create({
  cityCards:    { flexDirection:'row', flexWrap:'wrap', paddingHorizontal:SP.lg, gap:SP.sm, marginBottom:4 },
  cityCard:     { flex:1, minWidth:'45%', backgroundColor:'#fff', borderRadius:R.xl, padding:SP.md,
                  alignItems:'center', borderWidth:1.5, borderColor:'#EEE', ...shadow },
  cityCardBest: { borderColor:C.primary, backgroundColor:C.primaryLt },
  cityName:     { fontSize:11, fontWeight:W.semibold, color:C.sub, marginTop:4, textAlign:'center' },
  cityMYR:      { fontSize:16, fontWeight:W.bold, marginTop:2 },
  cityINR:      { fontSize:11, color:C.muted },
  bestBadge:    { marginTop:4, backgroundColor:C.primary, borderRadius:R.full, paddingHorizontal:8, paddingVertical:2 },
  bestTxt:      { fontSize:10, fontWeight:W.bold, color:'#fff' },
  tableRow:     { flexDirection:'row', alignItems:'center', paddingVertical:10, paddingHorizontal:SP.md,
                  borderBottomWidth:StyleSheet.hairlineWidth, borderBottomColor:'#EEE' },
  tableHdr:     { backgroundColor:'#F8F8F8' },
  tableHdrTxt:  { fontSize:16, textAlign:'center' },
  tableCell:    { flex:1, fontSize:11, color:C.label },
  tableVal:     { textAlign:'center', fontWeight:W.medium, color:C.sub },
  tableValBest: { color:C.primary, fontWeight:W.bold },
  note:         { marginHorizontal:SP.lg, backgroundColor:'#FFFBEB', borderRadius:R.xl, padding:SP.md },
  noteTxt:      { fontSize:12, color:'#92400E', lineHeight:18 },
})
