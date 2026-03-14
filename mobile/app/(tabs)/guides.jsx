import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { C, s, SP, R, W } from '../../src/theme/index'

const SECTIONS = [
  {
    title: '✈️ Travel & Flights', color: C.danger,
    items: [
      { emoji:'🗺️', label:'Tourist Hub',       sub:'10 tools — places, food, visa, budget', color:C.danger,  route:'/guide/tourist-hub',    badge:'10 tools' },
      { emoji:'✈️', label:'Flight & Baggage',  sub:'Grinder, TV, power bank rules',         color:C.info,    route:'/guide/flights'                         },
      { emoji:'🎉', label:'Tourist Visa 2026', sub:'Indians visa-free • MDAC guide',         color:C.primary, route:'/guide/tourist',        badge:'FREE'     },
    ],
  },
  {
    title: '💰 Financial Guides', color:'#D97706',
    items: [
      { emoji:'🏦', label:'EPF Withdrawal',    sub:'Withdraw EPF when leaving Malaysia',     color:C.primary, route:'/guide/epf-withdrawal'                  },
      { emoji:'💸', label:'Money Transfer',    sub:'InstaReM, BigPay, Wise comparison',      color:C.purple,  route:'/guide/money-transfer', badge:'Referrals'},
      { emoji:'🛂', label:'PR Roadmap',        sub:'EP → Permanent Residency path',          color:C.purple,  route:'/guide/pr-roadmap'                      },
    ],
  },
  {
    title: '💼 Work & Career', color: C.purple,
    items: [
      { emoji:'💼', label:'Job Search Guide',  sub:'Portals, EP salary 2026, tips',          color:C.purple,  route:'/guide/job-search',     badge:'🔥'       },
      { emoji:'🏡', label:'EP Life Guide',     sub:'8 topics — SIM, tax, EPF, food',         color:C.primary, route:'/guide/ep-life-guide',  badge:'🔥'       },
      { emoji:'💼', label:'Employment Pass',   sub:'EP guide • 2026 categories • docs',      color:C.info,    route:'/guide/ep'                              },
    ],
  },
  {
    title: '🏙️ Life in Malaysia', color: C.teal,
    items: [
      { emoji:'🏠', label:'Housing Guide',     sub:'Best areas, rent tips for KL',           color:C.teal,    route:'/guide/housing'                         },
      { emoji:'🏦', label:'Banking Guide',     sub:'Open account — Maybank, CIMB, RHB',      color:C.info,    route:'/guide/banking'                         },
      { emoji:'📱', label:'SIM Card Guide',    sub:'Maxis, Celcom, Digi comparison',         color:C.primary, route:'/guide/sim-card'                        },
      { emoji:'🍛', label:'Indian Food Guide', sub:'Must-try dishes & best food areas',      color:C.orange,  route:'/guide/food-guide'                      },
      { emoji:'🚇', label:'Transport Guide',   sub:'Grab, MRT, bus, Touch\'n Go',            color:C.info,    route:'/guide/transport'                       },
      { emoji:'💊', label:'Hospitals & Clinics',sub:'Panel clinics, govt hospitals, ER',     color:C.danger,  route:'/guide/hospital'                        },
      { emoji:'📦', label:'Moving Checklist',  sub:'Step-by-step relocation guide',          color:C.orange,  route:'/guide/moving-checklist'                },
    ],
  },
  {
    title: '🛂 Visa & Immigration', color: C.info,
    items: [
      { emoji:'🎉', label:'Tourist Visa 2026', sub:'Indians visa-free • MDAC guide',         color:C.primary, route:'/guide/tourist',        badge:'FREE'     },
      { emoji:'🧳', label:'Dependent Pass',    sub:'Bring spouse & children to Malaysia',    color:C.teal,    route:'/guide/dependent-pass'                  },
      { emoji:'🎓', label:'Student Pass',      sub:'EMGS process & university guide',        color:C.orange,  route:'/guide/student-pass'                    },
    ],
  },
]

const BADGE_STYLE = {
  'FREE':     { bg:'#E6F7EE', text:C.primary   },
  '🔥':       { bg:'#FFF4E5', text:C.warning   },
  'Referrals':{ bg:'#F0EDFF', text:C.purple    },
  '10 tools': { bg:'#EBF5FF', text:C.info      },
}

export default function GuidesScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 24 + insets.bottom }}>
      <View style={ls.banner}>
        <Text style={ls.bannerTitle}>📚 Guides</Text>
        <Text style={ls.bannerSub}>Everything about life in Malaysia</Text>
      </View>
      {SECTIONS.map(sec => (
        <View key={sec.title}>
          <View style={ls.secHdr}>
            <View style={[ls.secDot, { backgroundColor:sec.color }]} />
            <Text style={ls.secTitle}>{sec.title}</Text>
          </View>
          <View style={[s.card, { paddingVertical:0 }]}>
            {sec.items.map((item, ii) => (
              <TouchableOpacity key={ii}
                style={ii < sec.items.length-1 ? s.row : s.rowLast}
                onPress={() => router.push(item.route)} activeOpacity={0.6}>
                <View style={[ls.icon, { backgroundColor:item.color+'15' }]}>
                  <Text style={{ fontSize:20 }}>{item.emoji}</Text>
                </View>
                <View style={{ flex:1, marginLeft:12 }}>
                  <View style={{ flexDirection:'row', alignItems:'center', gap:6 }}>
                    <Text style={s.title}>{item.label}</Text>
                    {item.badge && BADGE_STYLE[item.badge] && (
                      <View style={[ls.badge, { backgroundColor:BADGE_STYLE[item.badge].bg }]}>
                        <Text style={[ls.badgeTxt, { color:BADGE_STYLE[item.badge].text }]}>{item.badge}</Text>
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
    </ScrollView>
  )
}

const ls = StyleSheet.create({
  banner:     { backgroundColor:C.primary, paddingHorizontal:SP.lg, paddingVertical:SP.xl },
  bannerTitle:{ fontSize:22, fontWeight:W.bold, color:'#fff', marginBottom:4 },
  bannerSub:  { fontSize:14, color:'rgba(255,255,255,0.8)' },
  secHdr:     { flexDirection:'row', alignItems:'center', gap:8, paddingHorizontal:SP.lg, paddingTop:SP.xl, paddingBottom:SP.sm },
  secDot:     { width:4, height:16, borderRadius:2 },
  secTitle:   { fontSize:12, fontWeight:W.bold, color:C.muted, textTransform:'uppercase', letterSpacing:0.8 },
  icon:       { width:44, height:44, borderRadius:R.lg, alignItems:'center', justifyContent:'center' },
  badge:      { borderRadius:R.full, paddingHorizontal:8, paddingVertical:2 },
  badgeTxt:   { fontSize:10, fontWeight:W.bold },
})
