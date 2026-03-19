import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { C, s, SP, R, W, shadow, shadowMd } from '../../src/theme/index'

const DOCS = [
  { icon:'🪪', title:'Old Driving Licence',       note:'Original + 1 photocopy (both sides)',                        required:true  },
  { icon:'🛂', title:'Current Passport',           note:'Original + 1 photocopy (photo page + visa page)',             required:true  },
  { icon:'📋', title:'JPJL7 Form',                 note:'Fill with old passport details, new address & signature. Get form at JPJ counter.', required:true },
  { icon:'📘', title:'Old Passport (if changed)',  note:'Only needed if your passport number changed since last renewal. Original + photocopy.', required:false },
]

const FEES = [
  { item:'Renewal Fee (foreigner)',  amount:'RM 300',  note:'RM 60/year × 5 years. Foreigner rate.',            color:C.primary },
  { item:'Amaun Pelarasan Tempoh',   amount:'RM 15',   note:'Pro-rated adjustment — aligns expiry with EP/visa.', color:C.warning },
  { item:'Physical Card (non-citizen)',amount:'RM 100', note:"Printed card for foreigners. Malaysians don't pay this (they use MyJPJ app).", color:C.danger  },
]

const STEPS = [
  { num:'1', title:'Prepare Documents',      desc:'Photocopy your passport (photo page) and licence (both sides). Bring originals too.' },
  { num:'2', title:'Go to JPJ Wangsa Maju',  desc:'Take LRT to Wangsa Maju station. JPJ office is ~10 min walk or short taxi/Grab ride.' },
  { num:'3', title:'Get Queue Number',        desc:'Tell counter you are a foreigner renewing your driving licence.' },
  { num:'4', title:'Fill JPJL7 Form',         desc:'Counter staff will give you the JPJL7 form. Fill in old passport info, address and sign.' },
  { num:'5', title:'Choose Years',            desc:'Officer asks 1–5 years. Most choose 5 years (RM 300) for best value.' },
  { num:'6', title:'Pay at Counter',          desc:'RM 300 + RM 15 + RM 100 = RM 415 for 5 years. Cash or card accepted.' },
  { num:'7', title:'Collect Same Day! 🎉',    desc:'New licence printed and handed to you on the same day. No waiting, no postage!' },
]

const TIPS = [
  { emoji:'⏰', tip:'Go early — JPJ opens 7:30am. Queue fills up fast on Monday mornings.' },
  { emoji:'⚠️', tip:'Licence validity is capped at your EP/visa expiry date. Bring your EP card too.' },
  { emoji:'💡', tip:'5-year renewal (RM 415 total) is best value — only RM 83/year.' },
  { emoji:'✅', tip:'No appointment needed — just walk in with your documents.' },
  { emoji:'🚗', tip:"International Driving Permit (IDP) from India is NOT valid for long-term residents — you need a Malaysian licence." },
  { emoji:'📱', tip:'Malaysians use the MyJPJ app for digital licence — foreigners still need the physical card (hence the RM 100 fee).' },
]

export default function DrivingLicenceScreen() {
  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom:40 }}>

      {/* Hero */}
      <View style={ls.hero}>
        <Text style={{ fontSize:36 }}>🪪</Text>
        <View style={{ flex:1, marginLeft:SP.md }}>
          <Text style={ls.heroTitle}>Driving Licence Renewal</Text>
          <Text style={ls.heroSub}>For Indians in Malaysia — same day collection!</Text>
        </View>
      </View>

      {/* Location card */}
      <View style={ls.locationCard}>
        <Text style={ls.locationTitle}>📍 Where to Go — JPJ Wangsa Maju, KL</Text>
        <View style={ls.lrtRow}>
          {['🚇 LRT from NU Sentral', '→', 'Wangsa Maju', '→', '🚶 10 min walk', '→', '🏛️ JPJ Office'].map((t, i) => (
            <Text key={i} style={t === '→' ? ls.lrtArrow : (t.includes('Wangsa') ? ls.lrtStation : ls.lrtStep)}>
              {t}
            </Text>
          ))}
        </View>
        <View style={ls.sameDayBadge}>
          <Ionicons name="checkmark-circle" size={14} color={C.primary} />
          <Text style={ls.sameDayTxt}>Same Day Collection</Text>
        </View>
      </View>

      {/* Documents */}
      <Text style={s.sectionHdr}>📋 Documents Required</Text>
      <View style={[s.card, { paddingVertical:0 }]}>
        {DOCS.map((d, i) => (
          <View key={d.title} style={[s.row, i === DOCS.length-1 && { borderBottomWidth:0 }]}>
            <Text style={{ fontSize:22, width:34 }}>{d.icon}</Text>
            <View style={{ flex:1, marginLeft:SP.sm }}>
              <View style={{ flexDirection:'row', alignItems:'center', gap:6, flexWrap:'wrap' }}>
                <Text style={s.title}>{d.title}</Text>
                {!d.required && (
                  <View style={ls.optBadge}><Text style={ls.optTxt}>If passport changed</Text></View>
                )}
              </View>
              <Text style={s.small}>{d.note}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Steps */}
      <Text style={s.sectionHdr}>🪜 Step-by-Step</Text>
      <View style={[s.card, { paddingVertical:SP.sm }]}>
        {STEPS.map((st, i) => (
          <View key={st.num} style={[ls.stepRow, i < STEPS.length-1 && { marginBottom:SP.md }]}>
            <View style={ls.stepNum}><Text style={ls.stepNumTxt}>{st.num}</Text></View>
            {i < STEPS.length-1 && <View style={ls.stepLine} />}
            <View style={{ flex:1, marginLeft:SP.md }}>
              <Text style={[s.title, { fontSize:14 }]}>{st.title}</Text>
              <Text style={[s.small, { marginTop:2, lineHeight:18 }]}>{st.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Fees */}
      <Text style={s.sectionHdr}>💳 Fee Breakdown</Text>
      <View style={[s.card, { paddingVertical:0 }]}>
        {FEES.map((f, i) => (
          <View key={f.item} style={[s.row, i === FEES.length-1 && { borderBottomWidth:0 }]}>
            <View style={[ls.feeDot, { backgroundColor:f.color }]} />
            <View style={{ flex:1, marginLeft:SP.sm }}>
              <Text style={s.title}>{f.item}</Text>
              <Text style={s.small}>{f.note}</Text>
            </View>
            <Text style={[ls.feeAmt, { color:f.color }]}>{f.amount}</Text>
          </View>
        ))}
        {/* Total */}
        <View style={ls.totalRow}>
          <Text style={ls.totalLabel}>Total (5 years)</Text>
          <Text style={ls.totalAmt}>RM 415</Text>
        </View>
      </View>

      {/* Year calculator */}
      <Text style={s.sectionHdr}>📊 Cost by Years</Text>
      <View style={[s.card, { paddingVertical:0 }]}>
        {[1,2,3,4,5].map((y, i, arr) => (
          <View key={y} style={[s.row, i === arr.length-1 && { borderBottomWidth:0 },
            y === 5 && { backgroundColor:C.primaryLt }]}>
            <Text style={[s.body, { flex:1 }]}>{y} year{y>1?'s':''}</Text>
            <Text style={[s.title, { color:C.label }]}>RM {(60*y + 15 + 100).toLocaleString()}</Text>
            <View style={[ls.perYearBadge, { backgroundColor: y===5 ? C.primary : '#F5F5F5' }]}>
              <Text style={[ls.perYearTxt, { color: y===5 ? '#fff' : C.muted }]}>
                RM {Math.round((60*y + 115)/y)}/yr
              </Text>
            </View>
            {y === 5 && <View style={ls.bestBadge}><Text style={ls.bestTxt}>Best</Text></View>}
          </View>
        ))}
      </View>

      {/* Tips */}
      <Text style={s.sectionHdr}>💡 Tips & Notes</Text>
      <View style={s.card}>
        {TIPS.map((t, i, arr) => (
          <View key={i} style={[{ flexDirection:'row', gap:SP.sm, marginBottom: i < arr.length-1 ? SP.md : 0 }]}>
            <Text style={{ fontSize:18, width:26 }}>{t.emoji}</Text>
            <Text style={[s.body, { flex:1, fontSize:13, lineHeight:19 }]}>{t.tip}</Text>
          </View>
        ))}
      </View>

      {/* Google maps link */}
      <TouchableOpacity style={ls.mapsBtn}
        onPress={() => Linking.openURL('https://maps.google.com/?q=JPJ+Wangsa+Maju+Kuala+Lumpur')}
        activeOpacity={0.8}>
        <Ionicons name="map" size={18} color="#fff" />
        <Text style={ls.mapsBtnTxt}>Open JPJ Wangsa Maju in Maps</Text>
        <Ionicons name="open-outline" size={14} color="rgba(255,255,255,0.7)" />
      </TouchableOpacity>
    </ScrollView>
  )
}

const ls = StyleSheet.create({
  hero:       { backgroundColor:C.primary, paddingHorizontal:SP.lg, paddingVertical:SP.xl,
                flexDirection:'row', alignItems:'center' },
  heroTitle:  { fontSize:20, fontWeight:W.bold, color:'#fff' },
  heroSub:    { fontSize:12, color:'rgba(255,255,255,0.8)', marginTop:2 },

  locationCard: { marginHorizontal:SP.lg, marginTop:SP.lg, backgroundColor:C.primaryLt,
                  borderRadius:R.xl, padding:SP.md, borderWidth:1.5, borderColor:C.primary, ...shadow },
  locationTitle:{ fontSize:13, fontWeight:W.bold, color:C.primaryDk, marginBottom:SP.sm },
  lrtRow:       { flexDirection:'row', flexWrap:'wrap', alignItems:'center', gap:6 },
  lrtStep:      { backgroundColor:'#fff', borderRadius:R.full, paddingHorizontal:8, paddingVertical:3,
                  fontSize:11, fontWeight:W.semibold, color:C.label },
  lrtArrow:     { color:C.primary, fontWeight:W.bold, fontSize:14 },
  lrtStation:   { backgroundColor:C.primary, borderRadius:R.full, paddingHorizontal:8, paddingVertical:3,
                  fontSize:11, fontWeight:W.bold, color:'#fff' },
  sameDayBadge: { flexDirection:'row', alignItems:'center', gap:4, marginTop:SP.sm },
  sameDayTxt:   { fontSize:12, fontWeight:W.bold, color:C.primary },

  optBadge:   { backgroundColor:'#FFFBEB', borderRadius:R.full, paddingHorizontal:6, paddingVertical:2,
                borderWidth:1, borderColor:'#F59E0B' },
  optTxt:     { fontSize:9, fontWeight:W.bold, color:'#D97706' },

  stepRow:    { flexDirection:'row', alignItems:'flex-start', paddingHorizontal:SP.md, position:'relative' },
  stepNum:    { width:28, height:28, borderRadius:14, backgroundColor:C.primary,
                alignItems:'center', justifyContent:'center', flexShrink:0, zIndex:1 },
  stepNumTxt: { fontSize:12, fontWeight:W.bold, color:'#fff' },
  stepLine:   { position:'absolute', left:SP.md + 14, top:28, width:2, height:36, backgroundColor:'#EEE', zIndex:0 },

  feeDot:     { width:10, height:10, borderRadius:5, marginTop:5, flexShrink:0 },
  feeAmt:     { fontSize:15, fontWeight:W.bold },
  totalRow:   { flexDirection:'row', justifyContent:'space-between', alignItems:'center',
                backgroundColor:C.primary, paddingHorizontal:SP.lg, paddingVertical:SP.md,
                borderBottomLeftRadius:R.xl, borderBottomRightRadius:R.xl },
  totalLabel: { fontSize:14, fontWeight:W.bold, color:'#fff' },
  totalAmt:   { fontSize:20, fontWeight:W.heavy, color:'#C9F53B' },

  perYearBadge: { borderRadius:R.full, paddingHorizontal:8, paddingVertical:3, marginLeft:SP.sm },
  perYearTxt:   { fontSize:10, fontWeight:W.bold },
  bestBadge:    { backgroundColor:C.primary, borderRadius:R.full, paddingHorizontal:8, paddingVertical:3, marginLeft:4 },
  bestTxt:      { fontSize:10, fontWeight:W.bold, color:'#fff' },

  mapsBtn:    { marginHorizontal:SP.lg, marginTop:SP.sm, backgroundColor:C.info,
                borderRadius:R.full, paddingVertical:SP.md, flexDirection:'row',
                alignItems:'center', justifyContent:'center', gap:SP.sm },
  mapsBtnTxt: { fontSize:14, fontWeight:W.bold, color:'#fff' },
})
