import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Linking, Share } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { C, s, SP, R, W, shadow } from '../src/theme/index'

export default function MoreScreen() {
  const shareApp = () => Share.share({
    message: '🇲🇾 NikiBhavi — Free Malaysia guide for Indians!\nVisa, Tax, EPF, NikiBot AI — https://nikibhavi.msdevbuild.com',
    title: 'NikiBhavi',
  })

  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false}>

      {/* Brand card */}
      <View style={ls.brandCard}>
        <Text style={{ fontSize:48 }}>🇲🇾</Text>
        <View style={{ flex:1 }}>
          <Text style={ls.brandName}>NikiBhavi</Text>
          <Text style={ls.brandSub}>Malaysia Guide for Indians 🇮🇳</Text>
        </View>
        <TouchableOpacity style={ls.shareBtn} onPress={shareApp} activeOpacity={0.7}>
          <Ionicons name="share-social-outline" size={20} color={C.primary} />
        </TouchableOpacity>
      </View>

      <Text style={s.sectionHdr}>Community</Text>
      <View style={s.card}>
        {[
          { emoji:'▶️', l:'YouTube',          sub:'Videos & guides',      url:'https://youtube.com/@NikiBhavi',   color:'#FF0000' },
          { emoji:'📷', l:'Instagram',        sub:'Daily tips',           url:'https://instagram.com/nikibhavi', color:'#E1306C' },
          { emoji:'💬', l:'WhatsApp Channel', sub:'10,000+ Indians',      url:'https://whatsapp.com/channel/0029VaAyhBS6rsQuujk5G53h', color:'#25D366' },
          { emoji:'☕', l:'Buy Me a Coffee',  sub:'Support NikiBhavi',    url:'https://buymeacoffee.com/jssuthahar', color:'#FF813F' },
        ].map((l, i, arr) => (
          <TouchableOpacity key={i} style={i < arr.length-1 ? s.row : s.rowLast}
            onPress={() => Linking.openURL(l.url)} activeOpacity={0.6}>
            <View style={[ls.socialIcon, { backgroundColor: l.color + '18' }]}>
              <Text style={{ fontSize:18 }}>{l.emoji}</Text>
            </View>
            <View style={{ flex:1, marginLeft:12 }}>
              <Text style={s.title}>{l.l}</Text>
              <Text style={s.small}>{l.sub}</Text>
            </View>
            <Ionicons name="open-outline" size={14} color={C.muted} />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={s.sectionHdr}>Links</Text>
      <View style={s.card}>
        {[
          { l:'Web App',             url:'https://nikibhavi.msdevbuild.com'             },
          { l:'Privacy Policy',      url:'https://nikibhavi.msdevbuild.com/#/privacy'   },
          { l:'Terms & Conditions',  url:'https://nikibhavi.msdevbuild.com/#/terms'     },
        ].map((l, i, arr) => (
          <TouchableOpacity key={i} style={i < arr.length-1 ? s.row : s.rowLast}
            onPress={() => Linking.openURL(l.url)} activeOpacity={0.6}>
            <Text style={[s.body, { flex:1 }]}>{l.l}</Text>
            <Ionicons name="open-outline" size={14} color={C.muted} />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={s.sectionHdr}>About</Text>
      <View style={s.card}>
        {[
          ['Version',      '1.0.0'                ],
          ['NikiBot',      'Offline AI, no API'   ],
          ['Platform',     'iOS & Android'        ],
          ['Data source',  'LHDN, ESD, KWSP 2026' ],
        ].map(([k, v], i, arr) => (
          <View key={k} style={i < arr.length-1 ? s.row : s.rowLast}>
            <Text style={[s.body, { flex:1 }]}>{k}</Text>
            <Text style={[s.small, { fontWeight:W.medium, color:C.primary }]}>{v}</Text>
          </View>
        ))}
      </View>

      <Text style={[s.tiny, { textAlign:'center', marginTop:SP.md, marginBottom:SP.xxxl, paddingHorizontal:SP.xl }]}>
        © 2026 NikiBhavi · For educational purposes only{'\n'}Not legal, tax or financial advice
      </Text>
    </ScrollView>
  )
}

const ls = StyleSheet.create({
  brandCard:  { backgroundColor:C.primary, marginHorizontal:SP.lg, marginTop:SP.lg, borderRadius:R.xxl,
                padding:SP.xl, flexDirection:'row', alignItems:'center', gap:14 },
  brandName:  { fontSize:22, fontWeight:W.heavy, color:'#fff' },
  brandSub:   { fontSize:13, color:'rgba(255,255,255,0.8)', marginTop:2 },
  shareBtn:   { width:40, height:40, borderRadius:20, backgroundColor:'rgba(255,255,255,0.2)',
                alignItems:'center', justifyContent:'center' },
  socialIcon: { width:40, height:40, borderRadius:R.lg, alignItems:'center', justifyContent:'center' },
})
