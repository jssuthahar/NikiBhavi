import { useState, useMemo } from 'react'
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Linking } from 'react-native'
import { calcRemittance } from '../../shared/calculators'
import { C, s, SP, R, W, shadow, shadowMd } from '../../src/theme/index'
import { Ionicons } from '@expo/vector-icons'

const PROVIDER_LINKS = {
  'InstaReM':      'https://referral-link.onelink.me/gbf1/a43c48ca?deep_link_sub1=referral&deep_link_value=kQodAW',
  'BigPay':        'https://bigpay.link/referrals',
  'Wise':          'https://wise.com',
  'RemitBee':      'https://remitbee.com',
  'Western Union': 'https://westernunion.com',
  'Bank TT':       null,
  'Maybank':       null,
}
const BIGPAY_CODE   = 'OUGVGERVDT'
const BIGPAY_URL    = 'https://bigpay.link/referrals'
const INSTAREM_CODE = 'kQodAW'
const INSTAREM_URL  = 'https://referral-link.onelink.me/gbf1/a43c48ca?deep_link_sub1=referral&deep_link_value=kQodAW'

export default function RemitScreen() {
  const [amount, setAmount] = useState('')
  const results = useMemo(() => calcRemittance(parseFloat(amount) || 0), [amount])
  const best = results[0]
  const hasResult = parseFloat(amount) > 0

  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

      <View style={[ls.heroCard, { backgroundColor: hasResult ? C.purple : '#F0FFF4' }]}>
        <Text style={[s.resultLabel, !hasResult && { color: '#666' }]}>Best rate — {best?.name}</Text>
        <Text style={[s.resultValue, !hasResult && { color: '#1A1A1A' }]}>{hasResult ? `₹${best?.received?.toLocaleString()}` : '—'}</Text>
        <Text style={[s.resultSub, !hasResult && { color: '#666' }]}>{hasResult ? `For RM ${parseFloat(amount).toLocaleString()} · Rate ₹${best?.baseRate}/RM` : 'Enter amount below'}</Text>
      </View>

      <Text style={s.sectionHdr}>Amount to Send</Text>
      <View style={s.inputGroup}>
        <View style={[s.inputRow, { borderBottomWidth:0 }]}>
          <Text style={s.inputLabel}>Amount (MYR)</Text>
          <Text style={[s.small, { marginRight:6, color:C.muted }]}>RM</Text>
          <TextInput style={s.input} value={amount} onChangeText={setAmount}
            keyboardType="numeric" placeholder="e.g. 3000"
            placeholderTextColor={C.placeholder} returnKeyType="done" />
        </View>
      </View>

      {hasResult && (
        <>
          <Text style={s.sectionHdr}>Provider Comparison</Text>
          {results.map((p, i) => (
            <TouchableOpacity key={p.name}
              style={[ls.providerCard, i === 0 && ls.bestCard]}
              onPress={() => p.name !== 'Bank TT' && p.name !== 'Maybank' && Linking.openURL(PROVIDER_LINKS[p.name] || '#')}
              activeOpacity={0.75}>
              {i === 0 && (
                <View style={ls.bestBadge}>
                  <Text style={ls.bestBadgeTxt}>⭐ BEST RATE</Text>
                </View>
              )}
              <View style={[s.between, { marginBottom:8 }]}>
                <Text style={[s.title, i === 0 && { color:C.primary }]}>{p.name}</Text>
                <Text style={[ls.received, { color: i === 0 ? C.primary : C.label }]}>
                  ₹{p.received.toLocaleString()}
                </Text>
              </View>
              <View style={s.hstack}>
                <View style={ls.metaPill}>
                  <Text style={ls.metaTxt}>Rate: ₹{p.baseRate}/RM</Text>
                </View>
                <View style={[ls.metaPill, { marginLeft:8 }]}>
                  <Text style={ls.metaTxt}>Fee: RM {p.fee}</Text>
                </View>
                {PROVIDER_LINKS[p.name] && (
                  <View style={{ flex:1, alignItems:'flex-end' }}>
                    <Ionicons name="open-outline" size={15} color={C.muted} />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}

          <View style={[ls.tipCard]}>
            <Text style={ls.tipTitle}>💡 Transfer Tips</Text>
            <Text style={s.body}>• InstaReM credits to India in ~1 minute ⚡{'\n'}• First transfer FREE with InstaReM{'\n'}• Transfers &gt;RM 3,000 may need source of funds proof{'\n'}• No monthly limit for EP holders</Text>
          </View>

          {/* InstaReM referral card */}
          <TouchableOpacity style={ls.instaremCard} onPress={() => Linking.openURL(INSTAREM_URL)} activeOpacity={0.85}>
            <View style={s.between}>
              <View style={{ flex:1 }}>
                <Text style={ls.instaremTitle}>⚡ InstaReM — Money in 1 Minute!</Text>
                <Text style={ls.instaremDesc}>Using it for 3+ years. Super fast, easy & amazing rates. Money credited to India within 1 minute!</Text>
                <View style={[ls.codePill, { backgroundColor:'#7B61FF' }]}>
                  <Text style={ls.codeLabel}>Referral code: </Text>
                  <Text style={ls.codeValue}>{INSTAREM_CODE}</Text>
                </View>
                <Text style={[ls.bigpayBonus, { color:'#5B3FCC' }]}>🎁 Your FIRST transfer is FREE!</Text>
              </View>
              <Ionicons name="open-outline" size={20} color="#7B61FF" style={{ marginLeft:12 }} />
            </View>
          </TouchableOpacity>

          {/* BigPay referral card */}
          <TouchableOpacity style={ls.bigpayCard} onPress={() => Linking.openURL(BIGPAY_URL)} activeOpacity={0.85}>
            <View style={s.between}>
              <View style={{ flex:1 }}>
                <Text style={ls.bigpayTitle}>💳 BigPay — Best Prepaid Card</Text>
                <Text style={ls.bigpayDesc}>Great MYR→INR rates, low fees, instant transfers. Trusted by Indians in Malaysia.</Text>
                <View style={ls.codePill}>
                  <Text style={ls.codeLabel}>Referral code: </Text>
                  <Text style={ls.codeValue}>{BIGPAY_CODE}</Text>
                </View>
                <Text style={ls.bigpayBonus}>🎁 Get RM5 FREE when you activate your card!</Text>
              </View>
              <Ionicons name="open-outline" size={20} color="#00B14F" style={{ marginLeft:12 }} />
            </View>
          </TouchableOpacity>
        </>
      )}
      <View style={{ height:40 }} />
    </ScrollView>
  )
}

const ls = StyleSheet.create({
  heroCard:     { marginHorizontal:SP.lg, marginTop:SP.lg, borderRadius:R.xxl, padding:SP.xl, ...shadowMd },
  providerCard: { marginHorizontal:SP.lg, marginBottom:SP.sm, backgroundColor:'#fff', borderRadius:R.xl, padding:SP.lg, ...shadow },
  bestCard:     { borderWidth:2, borderColor:C.primary, backgroundColor:'#E6F7EE' },
  bestBadge:    { backgroundColor:C.primary, alignSelf:'flex-start', borderRadius:R.full,
                  paddingHorizontal:10, paddingVertical:3, marginBottom:8 },
  bestBadgeTxt: { fontSize:11, fontWeight:W.bold, color:'#fff' },
  received:     { fontSize:20, fontWeight:W.bold },
  metaPill:     { backgroundColor:'#F5F5F5', borderRadius:R.full, paddingHorizontal:10, paddingVertical:4 },
  metaTxt:      { fontSize:12, color:C.sub, fontWeight:W.medium },
  tipCard:      { marginHorizontal:SP.lg, backgroundColor:'#F0EDFF', borderRadius:R.xl, padding:SP.lg, marginBottom:SP.md },
  tipTitle:     { fontSize:15, fontWeight:W.bold, color:C.purple, marginBottom:6 },
  instaremCard: { marginHorizontal:SP.lg, marginBottom:SP.md, backgroundColor:'#F0EDFF', borderRadius:R.xl, padding:SP.lg, borderWidth:2, borderColor:'#7B61FF' },
  instaremTitle:{ fontSize:15, fontWeight:W.bold, color:'#5B3FCC', marginBottom:4 },
  instaremDesc: { fontSize:13, color:C.sub, marginBottom:8, lineHeight:19 },
  bigpayCard:   { marginHorizontal:SP.lg, marginBottom:SP.md, backgroundColor:'#E6F7EE', borderRadius:R.xl, padding:SP.lg, borderWidth:2, borderColor:'#00B14F' },
  bigpayTitle:  { fontSize:15, fontWeight:W.bold, color:'#007A37', marginBottom:4 },
  bigpayDesc:   { fontSize:13, color:C.sub, marginBottom:8, lineHeight:19 },
  codePill:     { flexDirection:'row', alignItems:'center', backgroundColor:'#00B14F', alignSelf:'flex-start', borderRadius:R.full, paddingHorizontal:12, paddingVertical:5, marginBottom:6 },
  codeLabel:    { fontSize:12, color:'rgba(255,255,255,0.85)', fontWeight:W.medium },
  codeValue:    { fontSize:13, color:'#fff', fontWeight:W.bold, letterSpacing:1 },
  bigpayBonus:  { fontSize:13, color:'#007A37', fontWeight:W.semibold },
})
