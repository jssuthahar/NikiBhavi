import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { C, s, SP, R, W } from '../../src/theme/index'

const COMPARE = [
  { item:'1BR Apartment (city)', kl:'RM 1,200–2,500', chennai:'₹15,000–30,000', bangalore:'₹20,000–45,000' },
  { item:'Lunch (rice+curry)',   kl:'RM 5–12',        chennai:'₹60–120',        bangalore:'₹80–150'        },
  { item:'Dinner (restaurant)',  kl:'RM 20–60',       chennai:'₹200–600',       bangalore:'₹300–800'       },
  { item:'Grab/Ola (5km)',       kl:'RM 8–15',        chennai:'₹60–100',        bangalore:'₹80–150'        },
  { item:'Monthly groceries',    kl:'RM 400–700',     chennai:'₹5,000–10,000',  bangalore:'₹6,000–12,000'  },
  { item:'Internet (100Mbps)',   kl:'RM 99–139',      chennai:'₹700–1,000',     bangalore:'₹700–1,000'     },
  { item:'Postpaid SIM (30GB)',  kl:'RM 30–58',       chennai:'₹300–500',       bangalore:'₹300–500'       },
  { item:'Gym membership',       kl:'RM 100–200',     chennai:'₹1,500–3,000',   bangalore:'₹1,500–4,000'   },
]

const MONTHLY_BUDGET = [
  { category:'Rent (1BR, Cheras)', amount:'RM 1,200–1,800', pct:35 },
  { category:'Food & groceries',   amount:'RM 600–900',      pct:18 },
  { category:'Transport',          amount:'RM 200–400',      pct:8  },
  { category:'Utilities + internet',amount:'RM 200–350',     pct:7  },
  { category:'Insurance (medical)', amount:'RM 150–300',     pct:5  },
  { category:'Remittance to India', amount:'RM 500–1,500',   pct:15 },
  { category:'Leisure & misc',      amount:'RM 300–500',     pct:9  },
]

export default function LivingCostScreen() {
  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false}>

      <View style={ls.banner}>
        <Text style={ls.bannerTitle}>💰 Living Cost Guide</Text>
        <Text style={ls.bannerSub}>KL vs Chennai vs Bangalore comparison</Text>
      </View>

      <Text style={s.sectionHdr}>Cost Comparison Table</Text>
      <View style={[s.card, { paddingVertical:0 }]}>
        <View style={[ls.tableHead, s.row]}>
          <Text style={[ls.th, { flex:1.5 }]}>Item</Text>
          <Text style={ls.th}>KL 🇲🇾</Text>
          <Text style={ls.th}>Chennai</Text>
          <Text style={ls.th}>Bengaluru</Text>
        </View>
        {COMPARE.map((row, i) => (
          <View key={row.item} style={i < COMPARE.length-1 ? [s.row, { alignItems:'flex-start', paddingVertical:10 }] : [s.rowLast, { alignItems:'flex-start', paddingVertical:10 }]}>
            <Text style={[s.small, { flex:1.5, fontWeight:W.medium }]}>{row.item}</Text>
            <Text style={[s.small, { flex:1, color:C.primary, fontWeight:W.semibold }]}>{row.kl}</Text>
            <Text style={[s.tiny, { flex:1 }]}>{row.chennai}</Text>
            <Text style={[s.tiny, { flex:1 }]}>{row.bangalore}</Text>
          </View>
        ))}
      </View>

      <Text style={s.sectionHdr}>Typical Monthly Budget (KL)</Text>
      <View style={s.card}>
        {MONTHLY_BUDGET.map((b, i) => (
          <View key={b.category} style={i < MONTHLY_BUDGET.length-1 ? s.row : s.rowLast}>
            <View style={{ flex:1 }}>
              <Text style={s.title}>{b.category}</Text>
              <View style={ls.barBg}>
                <View style={[ls.barFill, { width:`${b.pct}%` }]} />
              </View>
            </View>
            <Text style={[s.small, { marginLeft:SP.md, fontWeight:W.semibold, color:C.primary }]}>{b.amount}</Text>
          </View>
        ))}
      </View>

      <View style={ls.tipCard}>
        <Text style={ls.tipTitle}>💡 Budget Estimate for EP Holder</Text>
        <Text style={s.body}>For a RM 6,000–8,000 salary, total monthly expenses typically come to RM 3,500–5,000. Savings rate of 20–35% is very achievable with disciplined spending.</Text>
      </View>

      <View style={{ height:40 }} />
    </ScrollView>
  )
}

const ls = StyleSheet.create({
  banner:     { backgroundColor:C.primary, paddingHorizontal:SP.lg, paddingVertical:SP.xl },
  bannerTitle:{ fontSize:22, fontWeight:W.bold, color:'#fff', marginBottom:4 },
  bannerSub:  { fontSize:14, color:'rgba(255,255,255,0.8)' },
  tableHead:  { backgroundColor:'#F5F5F5' },
  th:         { flex:1, fontSize:11, fontWeight:W.bold, color:C.muted, textTransform:'uppercase' },
  barBg:      { height:4, backgroundColor:'#EEE', borderRadius:2, marginTop:4, overflow:'hidden' },
  barFill:    { height:4, borderRadius:2, backgroundColor:C.primary },
  tipCard:    { marginHorizontal:SP.lg, backgroundColor:'#E6F7EE', borderRadius:R.xl, padding:SP.lg, marginBottom:SP.md },
  tipTitle:   { fontSize:15, fontWeight:W.bold, color:C.primary, marginBottom:6 },
})
