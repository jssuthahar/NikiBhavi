import { useState, useMemo } from 'react'
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Linking } from 'react-native'
import { calcRemittance } from '../../shared/calculators'
import { C, s, SP, R, W, shadow, shadowMd } from '../../src/theme/index'
import { Ionicons } from '@expo/vector-icons'

const PROVIDER_LINKS = {
  'Wise':          'https://wise.com',
  'RemitBee':      'https://remitbee.com',
  'InstaReM':      'https://instarem.com',
  'Western Union': 'https://westernunion.com',
  'Bank TT':       null,
  'Maybank':       null,
}

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
            <Text style={s.body}>• Always compare rates before sending{'\n'}• Wise usually gives best rates{'\n'}• Transfers &gt;RM 3,000 may need source of funds proof{'\n'}• No monthly limit for EP holders</Text>
          </View>
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
})
