import { useState, useRef, useEffect } from 'react'
import {
  View, Text, TextInput, TouchableOpacity, FlatList,
  StyleSheet, KeyboardAvoidingView, Platform, Animated
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { C, s, SP, R, W, shadow } from '../../src/theme/index'
import { getBotReply, SUGGESTIONS } from '../../shared/nikibot'

const WELCOME = {
  id: 'w', role: 'bot',
  text: '👋 Hi! I\'m **NikiBot** — your Malaysia guide.\n\nAsk me about:\n• **Visa & MDAC** — Indians visa-free 2026!\n• **EP salary 2026** — new minimums from June\n• **Tax & EPF** — refunds, withdrawal\n• **Flights** — grinder, TV, baggage rules\n• **Housing, banking, SIM** — all covered!',
}

function RichText({ text, style }) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return (
    <Text style={style}>
      {parts.map((p, i) =>
        i % 2 === 1 ? <Text key={i} style={{ fontWeight: '700' }}>{p}</Text> : p
      )}
    </Text>
  )
}

function TypingDots() {
  const dots = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ]
  useEffect(() => {
    const anim = Animated.loop(
      Animated.stagger(160, dots.map(v =>
        Animated.sequence([
          Animated.timing(v, { toValue: -5, duration: 250, useNativeDriver: true }),
          Animated.timing(v, { toValue:  0, duration: 250, useNativeDriver: true }),
        ])
      ))
    )
    anim.start()
    return () => anim.stop()
  }, [])

  return (
    <View style={ls.msgRow}>
      <View style={ls.avatar}><Text style={{ fontSize: 14 }}>🤖</Text></View>
      <View style={[ls.botBubble, { flexDirection:'row', alignItems:'center', gap:6, paddingVertical:14 }]}>
        {dots.map((v, i) => (
          <Animated.View key={i} style={[ls.dot, { transform: [{ translateY: v }] }]} />
        ))}
      </View>
    </View>
  )
}

export default function ChatScreen() {
  const [messages, setMessages] = useState([WELCOME])
  const [input,    setInput]    = useState('')
  const [typing,   setTyping]   = useState(false)
  const listRef = useRef(null)
  const insets  = useSafeAreaInsets()

  const send = (text) => {
    const q = (text || input).trim()
    if (!q) return
    setInput('')
    setMessages(prev => [...prev, { id: Date.now() + 'u', role:'user', text:q }])
    setTyping(true)
    setTimeout(() => {
      const reply = getBotReply(q)
      setMessages(prev => [...prev, { id: Date.now() + 'b', role:'bot', text:reply.ans }])
      setTyping(false)
    }, 400 + Math.random() * 300)
  }

  useEffect(() => {
    const t = setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 120)
    return () => clearTimeout(t)
  }, [messages, typing])

  return (
    <KeyboardAvoidingView
      style={ls.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Messages */}
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={m => String(m.id)}
        contentContainerStyle={ls.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[ls.msgRow, item.role === 'user' && ls.userRow]}>
            {item.role === 'bot' && (
              <View style={ls.avatar}><Text style={{ fontSize:14 }}>🤖</Text></View>
            )}
            <View style={item.role === 'user' ? ls.userBubble : ls.botBubble}>
              {item.role === 'bot'
                ? <RichText text={item.text} style={ls.botText} />
                : <Text style={ls.userText}>{item.text}</Text>
              }
            </View>
          </View>
        )}
        ListFooterComponent={typing ? <TypingDots /> : null}
      />

      {/* Suggestion chips */}
      <View style={ls.chipsBar}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={SUGGESTIONS}
          keyExtractor={(_, i) => String(i)}
          contentContainerStyle={{ paddingHorizontal:SP.lg, paddingVertical:SP.sm, gap:8 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={ls.chip} onPress={() => send(item)} activeOpacity={0.7}>
              <Text style={ls.chipTxt} numberOfLines={1}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Input bar */}
      <View style={[ls.inputBar, { paddingBottom: Math.max(insets.bottom, SP.md) }]}>
        <TextInput
          style={ls.input}
          value={input}
          onChangeText={setInput}
          placeholder="Ask anything about Malaysia..."
          placeholderTextColor="#AAAAAA"
          returnKeyType="send"
          onSubmitEditing={() => send()}
          multiline={false}
        />
        <TouchableOpacity
          style={[ls.sendBtn, !input.trim() && ls.sendBtnOff]}
          onPress={() => send()}
          disabled={!input.trim()}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-up" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const ls = StyleSheet.create({
  root: { flex:1, backgroundColor:'#F2F2F7' },

  list: {
    paddingHorizontal: SP.lg,
    paddingTop: SP.lg,
    paddingBottom: SP.sm,
    gap: 10,
  },

  msgRow:  { flexDirection:'row', alignItems:'flex-end', gap:8, marginBottom:2 },
  userRow: { flexDirection:'row-reverse' },

  avatar: {
    width:30, height:30, borderRadius:15,
    backgroundColor:'#E6F7EE',
    alignItems:'center', justifyContent:'center', flexShrink:0,
  },

  botBubble: {
    maxWidth:'80%', backgroundColor:'#FFFFFF',
    borderRadius:18, borderBottomLeftRadius:4,
    paddingHorizontal:14, paddingVertical:10, ...shadow,
  },
  userBubble: {
    maxWidth:'80%', backgroundColor:C.primary,
    borderRadius:18, borderBottomRightRadius:4,
    paddingHorizontal:14, paddingVertical:10,
  },
  botText:  { fontSize:15, lineHeight:22, color:'#1A1A1A' },
  userText: { fontSize:15, lineHeight:22, color:'#FFFFFF'  },

  dot: { width:7, height:7, borderRadius:3.5, backgroundColor:'#BBBBBB' },

  chipsBar: {
    backgroundColor:'#FFFFFF',
    borderTopWidth:1, borderTopColor:'#EEEEEE',
  },
  chip: {
    backgroundColor:'#E6F7EE', borderRadius:20,
    paddingHorizontal:14, paddingVertical:8,
    borderWidth:1, borderColor:'#B8EECF',
  },
  chipTxt: { fontSize:13, color:C.primary, fontWeight:'600' },

  inputBar: {
    flexDirection:'row', alignItems:'center', gap:10,
    paddingHorizontal:SP.lg, paddingTop:SP.sm,
    backgroundColor:'#FFFFFF',
    borderTopWidth:1, borderTopColor:'#EEEEEE',
  },
  input: {
    flex:1, backgroundColor:'#F2F2F7',
    borderRadius:24, paddingHorizontal:16, paddingVertical:10,
    fontSize:15, color:'#1A1A1A',
    borderWidth:1.5, borderColor:'#E0E0E0',
  },
  sendBtn:    { width:40, height:40, borderRadius:20, backgroundColor:C.primary, alignItems:'center', justifyContent:'center' },
  sendBtnOff: { backgroundColor:'#CCCCCC' },
})
