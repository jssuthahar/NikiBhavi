import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { C, s, SP, R, W, shadow } from '../../src/theme/index'

const DISHES = [
  { name:'Banana Leaf Rice',  where:'Brickfields, Cheras',   price:'RM 10–18', emoji:'🍃', note:'Full thali with rice, curries, papad, pickle. Best in KL.' },
  { name:'Roti Canai',        where:'Any mamak stall',        price:'RM 1.50',  emoji:'🫓', note:'Crispy flatbread with dhal or curry. Malaysian breakfast staple.' },
  { name:'Teh Tarik',         where:'Any mamak',              price:'RM 2',     emoji:'🍵', note:'Pulled milk tea — frothy, sweet, perfect with roti.' },
  { name:'Nasi Lemak',        where:'Everywhere',             price:'RM 3–15',  emoji:'🥥', note:'Coconut rice + sambal + anchovies + egg. Malaysia\'s national dish.' },
  { name:'Char Kway Teow',    where:'Penang & hawker stalls', price:'RM 7–12',  emoji:'🍜', note:'Stir-fried flat rice noodles. Penang version is the best.' },
  { name:'Nasi Kandar',       where:'Penang, KL',             price:'RM 10–20', emoji:'🍛', note:'Muslim Indian rice dish with rich curries. Open late night.' },
  { name:'Mee Goreng Mamak',  where:'Any mamak',              price:'RM 5–8',   emoji:'🍝', note:'Spicy stir-fried yellow noodles. Order "pedas" for extra spicy.' },
  { name:'Cendol',            where:'Penang, everywhere',     price:'RM 3–6',   emoji:'🍧', note:'Shaved ice dessert with coconut milk and pandan jelly. Refreshing!' },
  { name:'Satay',             where:'Kajang (famous), everywhere',price:'RM 8–20',emoji:'🍡',note:'Grilled meat skewers with peanut sauce. Kajang is satay capital.' },
  { name:'Laksa',             where:'Penang (Asam Laksa)',    price:'RM 7–12',  emoji:'🍲', note:'Penang Asam Laksa is world-famous — sour & spicy fish broth.' },
  { name:'Apam Balik',        where:'Night markets',          price:'RM 4–6',   emoji:'🥞', note:'Crispy peanut pancake — best street food snack in Malaysia.' },
  { name:'Durian',            where:'Jun–Aug season, everywhere',price:'RM 15–40/kg',emoji:'🌵',note:'King of fruits. Musang King variety is best. Strong smell, amazing taste.' },
]

const AREAS = [
  { name:'Brickfields (Little India)', desc:'Best banana leaf, Indian groceries, Tamil stores, temples', emoji:'🇮🇳', city:'KL' },
  { name:'Cheras',                    desc:'Affordable mamaks, Indian restaurants, South Indian food', emoji:'🍛', city:'KL' },
  { name:'Bangsar',                   desc:'Upscale cafes, fusion Indian, fine dining',                emoji:'☕', city:'KL' },
  { name:'Penang Georgetown',         desc:'Best street food in Malaysia — hawker heaven',            emoji:'🏆', city:'Penang' },
  { name:'Jalan Ipoh',                desc:'Old-school kopitiam, Chinese & Indian hawker food',        emoji:'🏮', city:'KL' },
]

export default function FoodGuideScreen() {
  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom:40 }}>
      <View style={ls.banner}>
        <Text style={ls.title}>🍛 Indian Food Guide</Text>
        <Text style={ls.sub}>Best food for Indians in Malaysia</Text>
      </View>

      <View style={ls.tip}>
        <Text style={ls.tipTxt}>💡 Malaysia has one of the world's best food scenes. Indians will feel at home — Tamil food, mamak culture, and fresh Indian groceries everywhere!</Text>
      </View>

      <Text style={s.sectionHdr}>Must-Try Dishes</Text>
      <View style={[s.card,{paddingVertical:0}]}>
        {DISHES.map((d,i) => (
          <View key={d.name} style={i < DISHES.length-1 ? s.row : s.rowLast}>
            <Text style={{fontSize:24,width:36}}>{d.emoji}</Text>
            <View style={{flex:1, marginLeft:10}}>
              <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <Text style={[s.title,{flex:1}]}>{d.name}</Text>
                <Text style={[s.small,{color:C.primary,fontWeight:W.bold}]}>{d.price}</Text>
              </View>
              <Text style={[s.small,{color:C.muted}]}>📍 {d.where}</Text>
              <Text style={[s.small,{marginTop:2}]}>{d.note}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={s.sectionHdr}>Best Food Areas</Text>
      <View style={[s.card,{paddingVertical:0}]}>
        {AREAS.map((a,i) => (
          <View key={a.name} style={i < AREAS.length-1 ? s.row : s.rowLast}>
            <Text style={{fontSize:22,width:34}}>{a.emoji}</Text>
            <View style={{flex:1, marginLeft:10}}>
              <View style={{flexDirection:'row', alignItems:'center', gap:6}}>
                <Text style={[s.title,{flex:1}]}>{a.name}</Text>
                <View style={ls.cityBadge}><Text style={ls.cityTxt}>{a.city}</Text></View>
              </View>
              <Text style={s.small}>{a.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={s.sectionHdr}>Mamak Culture 101</Text>
      <View style={s.card}>
        {['Mamak = Indian-Muslim restaurant. Open 24hrs everywhere','Roti canai + teh tarik = quintessential Malaysian breakfast',
          'Mamak is where Malaysians watch football — always on TV','Very cheap: full meal for RM 5–10',
          'Say "tapau" to take away your food',].map((t,i,arr) => (
          <View key={i} style={[s.row, i===arr.length-1 && {borderBottomWidth:0}]}>
            <Text style={{color:C.primary,marginRight:8}}>✓</Text>
            <Text style={[s.body,{flex:1,lineHeight:20}]}>{t}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}
const ls = StyleSheet.create({
  banner:    { backgroundColor:C.orange, paddingHorizontal:SP.lg, paddingVertical:SP.xl },
  title:     { fontSize:22, fontWeight:W.bold, color:'#fff', marginBottom:4 },
  sub:       { fontSize:14, color:'rgba(255,255,255,0.8)' },
  tip:       { marginHorizontal:SP.lg, marginTop:SP.lg, backgroundColor:'#FFF4E5', borderRadius:R.xl, padding:SP.md },
  tipTxt:    { fontSize:13, color:'#92400E', lineHeight:19 },
  cityBadge: { backgroundColor:C.primaryLt, borderRadius:R.full, paddingHorizontal:8, paddingVertical:2 },
  cityTxt:   { fontSize:10, fontWeight:W.bold, color:C.primaryDk },
})
