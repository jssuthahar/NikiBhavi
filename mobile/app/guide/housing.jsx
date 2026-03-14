import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { C, s, SP, R, W, shadow } from '../../src/theme/index'

const AREAS = [
  { name:'Brickfields',    rent:'RM 1,200–2,500', desc:'Little India — Tamil food, temples, community', star:true },
  { name:'Cheras',         rent:'RM 900–1,800',   desc:'Affordable, large Indian community'             },
  { name:'Petaling Jaya',  rent:'RM 1,500–3,500', desc:'Family-friendly, Tamil schools nearby'          },
  { name:'Subang Jaya',    rent:'RM 1,200–2,500', desc:'Tech hub — many IT companies'                   },
  { name:'Puchong',        rent:'RM 900–1,600',   desc:'Budget-friendly, Indian restaurants'             },
  { name:'Bangsar',        rent:'RM 2,500–5,000', desc:'Upscale, expat-friendly'                        },
  { name:'Mont Kiara',     rent:'RM 3,000–8,000', desc:'Premium, international schools nearby'           },
  { name:'Cyberjaya',      rent:'RM 800–1,500',   desc:'Tech companies, MNC offices'                    },
]

const APPS = [
  { name:'PropertyGuru', url:'https://propertyguru.com.my', emoji:'🏠' },
  { name:'iProperty',    url:'https://iproperty.com.my',    emoji:'🔍' },
  { name:'Mudah.my',     url:'https://mudah.my',            emoji:'📱' },
  { name:'Facebook Groups', url:'https://facebook.com',     emoji:'👥' },
]

export default function HousingScreen() {
  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom:40 }}>
      <View style={ls.banner}>
        <Text style={ls.title}>🏠 Housing Guide</Text>
        <Text style={ls.sub}>Where Indians live in KL & Selangor</Text>
      </View>

      <Text style={s.sectionHdr}>Popular Areas</Text>
      <View style={[s.card, { paddingVertical:0 }]}>
        {AREAS.map((a, i) => (
          <View key={a.name} style={i < AREAS.length-1 ? s.row : s.rowLast}>
            <View style={{ flex:1 }}>
              <View style={{ flexDirection:'row', alignItems:'center', gap:6 }}>
                <Text style={s.title}>{a.name}</Text>
                {a.star && <View style={ls.badge}><Text style={ls.badgeTxt}>Popular</Text></View>}
              </View>
              <Text style={s.small}>{a.desc}</Text>
            </View>
            <Text style={[s.small, { color:C.primary, fontWeight:W.bold, textAlign:'right' }]}>{a.rent}</Text>
          </View>
        ))}
      </View>

      <Text style={s.sectionHdr}>Where to Search</Text>
      <View style={[s.card, { paddingVertical:0 }]}>
        {APPS.map((a, i) => (
          <TouchableOpacity key={a.name} style={i < APPS.length-1 ? s.row : s.rowLast}
            onPress={() => Linking.openURL(a.url)} activeOpacity={0.7}>
            <Text style={{ fontSize:22, width:34 }}>{a.emoji}</Text>
            <Text style={[s.title, { flex:1, marginLeft:10 }]}>{a.name}</Text>
            <Ionicons name="open-outline" size={14} color={C.muted} />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={s.sectionHdr}>Rental Tips</Text>
      <View style={s.card}>
        {[
          '📝 Typical tenancy: 1–2 year contract, 2 months deposit',
          '💡 Utilities (TNB + Syabas) paid separately — budget RM 150–250',
          '📱 Ask for furnished — saves RM 5,000–10,000 setup cost',
          '🤝 Negotiate — landlords often drop 5–10% for good tenants',
          '⚠️ Avoid rooms without proper tenancy agreement',
          '🏦 Need 2 months deposit + 0.5 month utilities deposit',
        ].map((tip, i, arr) => (
          <View key={i} style={[s.row, i===arr.length-1 && {borderBottomWidth:0}]}>
            <Text style={[s.body, { flex:1, lineHeight:20 }]}>{tip}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}
const ls = StyleSheet.create({
  banner:   { backgroundColor:C.primary, paddingHorizontal:SP.lg, paddingVertical:SP.xl },
  title:    { fontSize:22, fontWeight:W.bold, color:'#fff', marginBottom:4 },
  sub:      { fontSize:14, color:'rgba(255,255,255,0.8)' },
  badge:    { backgroundColor:C.primaryLt, borderRadius:R.full, paddingHorizontal:8, paddingVertical:2 },
  badgeTxt: { fontSize:10, fontWeight:W.bold, color:C.primaryDk },
})
