import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { C, s, SP, R, W } from '../../src/theme/index'

const SECTIONS = [
  {
    title: 'Tax & Salary', color: C.primary,
    items: [
      { emoji:'📊', label:'PCB Tax Calculator',    sub:'Monthly deductions & take-home pay',    color:C.primary,  route:'/calculator/pcb',          badge:'Popular' },
      { emoji:'💰', label:'Tax Refund (LHDN)',     sub:'YA 2024/2025/2026 refund estimate',     color:'#D97706',  route:'/calculator/taxrefund',     badge:'New'     },
      { emoji:'🧮', label:'Salary Comparison',     sub:'India CTC vs Malaysia offer in RM',     color:C.info,     route:'/calculator/salary'                         },
      { emoji:'📅', label:'Tax Residency (182d)',  sub:'Am I a tax resident this year?',        color:C.teal,     route:'/calculator/taxresidency',  badge:'New'     },
    ],
  },
  {
    title: 'Living & Expenses', color: C.teal,
    items: [
      { emoji:'📈', label:'Living Cost Calc',      sub:'Family budget planner by family type',  color:C.teal,     route:'/calculator/livingcost',    badge:'New'     },
      { emoji:'⚖️', label:'Cost Compare',          sub:'KL vs Chennai vs Bangalore vs SG',      color:C.info,     route:'/calculator/costcompare',   badge:'New'     },
      { emoji:'🧾', label:'Expense Tracker',       sub:'Monthly budget with savings rate',      color:C.danger,   route:'/calculator/expense'                        },
      { emoji:'🎯', label:'Budget Simulator',      sub:'5-year wealth & EPF projection',        color:C.purple,   route:'/calculator/budget',        badge:'New'     },
      { emoji:'🏠', label:'Rent Calculator',       sub:'Affordability & KL area guide',         color:'#D97706',  route:'/calculator/rentcalc'                       },
    ],
  },
  {
    title: 'Savings & EPF', color: C.info,
    items: [
      { emoji:'🏦', label:'EPF Calculator',        sub:'Project EPF corpus with dividends',     color:C.info,     route:'/calculator/epf'                            },
    ],
  },
  {
    title: 'Loans', color: C.orange,
    items: [
      { emoji:'🚗', label:'Car Loan Calculator',   sub:'Monthly EMI + total interest',          color:C.orange,   route:'/calculator/carloan'                        },
      { emoji:'🏠', label:'Home Loan Calculator',  sub:'DSR ratio & loan eligibility',          color:C.teal,     route:'/calculator/homeloan'                       },
    ],
  },
  {
    title: 'Work & HR', color: C.purple,
    items: [
      { emoji:'📋', label:'Probation Calculator',  sub:'End date + benefits timeline',          color:C.purple,   route:'/calculator/probation',     badge:'New'     },
      { emoji:'📅', label:'Leave Planner 2026',    sub:'Public holidays + long weekends',       color:C.primary,  route:'/calculator/leave',         badge:'New'     },
    ],
  },
  {
    title: 'Money Transfer', color: C.purple,
    items: [
      { emoji:'💸', label:'Remittance Comparison', sub:'Best MYR→INR rates • InstaReM, Wise',  color:C.purple,   route:'/calculator/remit',         badge:'Live'    },
    ],
  },
]

const BADGE_STYLE = {
  Popular:{ bg:'#E6F7EE', text:C.primary },
  New:    { bg:'#EBF5FF', text:C.info    },
  Live:   { bg:'#F0EDFF', text:C.purple  },
}

export default function ToolsScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 24 + insets.bottom }}>
      <View style={ls.banner}>
        <Text style={ls.bannerTitle}>🛠️ Financial Tools</Text>
        <Text style={ls.bannerSub}>Calculators built for Indians in Malaysia</Text>
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
                  <Text style={{ fontSize:22 }}>{item.emoji}</Text>
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
