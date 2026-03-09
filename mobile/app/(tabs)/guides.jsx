import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { C, s, SP, R, W } from '../../src/theme/index'

const GUIDE_SECTIONS = [
  {
    title: 'Visa & Immigration',
    items: [
      { emoji:'🎉', label:'Tourist Visa 2026',      sub:'Indians visa-free • MDAC guide',         color:C.primary, route:'/guide/tourist',           badge:'2026' },
      { emoji:'💼', label:'Employment Pass (EP)',   sub:'Full guide • Categories • Documents',    color:C.info,    route:'/guide/ep'                         },
      { emoji:'🛂', label:'Visa Tracker',           sub:'Track your visa expiry & EP status',     color:C.purple,  route:'/guide/tourist'                    },
      { emoji:'🎓', label:'Student Pass',           sub:'EMGS process & university guide',        color:C.orange,  route:'/guide/tourist'                    },
      { emoji:'👨‍👩‍👧', label:'Dependent Pass',     sub:'Bring family to Malaysia',               color:C.teal,    route:'/guide/tourist'                    },
    ],
  },
  {
    title: 'Financial Guides',
    items: [
      { emoji:'🏦', label:'EPF Withdrawal',         sub:'How to withdraw when leaving Malaysia', color:C.primary, route:'/guide/epf-withdrawal'             },
      { emoji:'🗺️', label:'PR Roadmap',             sub:'Permanent Residency eligibility path',  color:C.purple,  route:'/guide/pr-roadmap'                 },
    ],
  },
  {
    title: 'Life in Malaysia',
    items: [
      { emoji:'✈️', label:'Flight & Baggage',       sub:'Grinder, TV, power bank rules',         color:C.info,    route:'/guide/flights'                    },
      { emoji:'💰', label:'Living Cost Guide',      sub:'KL vs Chennai vs Bangalore costs',      color:C.orange,  route:'/guide/living-cost'                },
      { emoji:'📋', label:'Moving Checklist',       sub:'Step-by-step relocation guide',         color:C.teal,    route:'/guide/moving-checklist'           },
    ],
  },
]

export default function GuidesScreen() {
  const router = useRouter()
  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false}>
      <View style={ls.banner}>
        <Text style={ls.bannerTitle}>📚 Guides</Text>
        <Text style={ls.bannerSub}>Everything you need to know about Malaysia</Text>
      </View>

      {GUIDE_SECTIONS.map((sec) => (
        <View key={sec.title}>
          <Text style={s.sectionHdr}>{sec.title}</Text>
          <View style={[s.card, { paddingVertical:0 }]}>
            {sec.items.map((item, ii) => (
              <TouchableOpacity key={ii}
                style={ii < sec.items.length - 1 ? s.row : s.rowLast}
                onPress={() => router.push(item.route)} activeOpacity={0.6}>
                <View style={[ls.icon, { backgroundColor: item.color + '15' }]}>
                  <Text style={{ fontSize:20 }}>{item.emoji}</Text>
                </View>
                <View style={{ flex:1, marginLeft:12 }}>
                  <View style={[s.hstack, { gap:8 }]}>
                    <Text style={s.title}>{item.label}</Text>
                    {item.badge && (
                      <View style={[s.pill]}>
                        <Text style={s.pillText}>{item.badge}</Text>
                      </View>
                    )}
                  </View>
                  <Text style={s.small}>{item.sub}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={C.muted} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
      <View style={{ height:40 }} />
    </ScrollView>
  )
}

const ls = StyleSheet.create({
  banner:      { backgroundColor:C.primary, paddingHorizontal:SP.lg, paddingVertical:SP.xl },
  bannerTitle: { fontSize:22, fontWeight:W.bold, color:'#fff', marginBottom:4 },
  bannerSub:   { fontSize:14, color:'rgba(255,255,255,0.8)' },
  icon:        { width:42, height:42, borderRadius:R.lg, alignItems:'center', justifyContent:'center' },
})
