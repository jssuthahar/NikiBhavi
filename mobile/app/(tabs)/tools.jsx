import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { C, s, SP, R, W, shadow } from '../../src/theme/index'

const SECTIONS = [
  {
    title: 'Tax & Salary',
    items: [
      { emoji:'📊', label:'PCB Tax Calculator',      sub:'Monthly deductions & take-home pay',   color:C.primary, route:'/calculator/pcb',       badge:'Popular' },
      { emoji:'💰', label:'Tax Refund (LHDN)',       sub:'YA 2024/2025/2026 tax refund estimate', color:'#D97706', route:'/calculator/taxrefund',  badge:'New'     },
      { emoji:'🧮', label:'Salary Comparison',       sub:'India CTC vs Malaysia offer',           color:C.info,    route:'/calculator/salary'               },
    ],
  },
  {
    title: 'Savings & EPF',
    items: [
      { emoji:'🏦', label:'EPF Calculator',          sub:'Project EPF corpus with dividends',     color:C.info,    route:'/calculator/epf'                  },
      { emoji:'🎯', label:'Budget Simulator',        sub:'5-year wealth & EPF projection',        color:C.purple,  route:'/calculator/budget',    badge:'New'     },
      { emoji:'🧾', label:'Expense Tracker',         sub:'Monthly budget with savings rate',      color:C.teal,    route:'/calculator/expense'              },
    ],
  },
  {
    title: 'Loans',
    items: [
      { emoji:'🚗', label:'Car Loan Calculator',     sub:'Monthly EMI + total interest + costs',  color:C.orange,  route:'/calculator/carloan'              },
      { emoji:'🏠', label:'Home Loan Calculator',    sub:'DSR ratio & loan eligibility check',    color:C.teal,    route:'/calculator/homeloan'             },
      { emoji:'🏢', label:'Rent Calculator',         sub:'Affordability & rent-vs-buy analysis',  color:'#D97706', route:'/calculator/rentcalc'             },
    ],
  },
  {
    title: 'Money Transfer',
    items: [
      { emoji:'💸', label:'Remittance Comparison',  sub:'Best MYR → INR exchange rates',         color:C.purple,  route:'/calculator/remit',     badge:'Live'    },
    ],
  },
]

const BADGE_COLORS = {
  Popular: { bg:'#E6F7EE', text:C.primary },
  New:     { bg:'#EBF5FF', text:C.info    },
  Live:    { bg:'#F0EDFF', text:C.purple  },
}

export default function ToolsScreen() {
  const router = useRouter()
  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false}>

      {/* Header banner */}
      <View style={ls.banner}>
        <Text style={ls.bannerTitle}>🛠️ Financial Tools</Text>
        <Text style={ls.bannerSub}>Calculators built for Indians in Malaysia</Text>
      </View>

      {SECTIONS.map((sec) => (
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
                  <View style={[s.hstack, { gap:8, flexWrap:'wrap' }]}>
                    <Text style={s.title}>{item.label}</Text>
                    {item.badge && (
                      <View style={[s.tag, { backgroundColor: BADGE_COLORS[item.badge].bg }]}>
                        <Text style={[s.tagText, { color: BADGE_COLORS[item.badge].text }]}>
                          {item.badge}
                        </Text>
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
