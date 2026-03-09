import { useState, useRef, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet,
         KeyboardAvoidingView, Platform, Animated, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { C, s, SP, R, W, shadow, shadowMd } from '../../src/theme/index'
import { getBotReply, SUGGESTIONS } from '../../shared/nikibot'

const WELCOME = {
  id: 'w', role: 'bot',
  text: '👋 Hi! I\'m **NikiBot** — your Malaysia guide for Indians.\n\nI can help with:\n• **Visa & MDAC** — Indians visa-free 2026!\n• **EP salary 2026** — new minimums\n• **Tax & EPF** — refunds, withdrawal\n• **Flight baggage** — grinder, TV, laptop\n• **Housing, banking, SIM** — all covered!',
}

function RichText({ text, style }) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return (
    <Text style={style}>
      {parts.map((p, i) =>
        i % 2 === 1 ? <Text key={i} style={{ fontWeight: W.bold }}>{p}</Text> : p
      )}
    </Text>
  )
}

function TypingDots() {
  const vals = [useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current]
  useEffect(() => {
    const loop = Animated.loop(Animated.stagger(180,
      vals.map(v => Animated.sequence([
        Animated.timing(v, { toValue:-5, duration:280, useNativeDriver:true }),
        Animated.timing(v, { toValue:0,  duration:280, useNativeDriver:true }),
      ]))
    ))
    loop.start()
    return () => loop.stop()
  }, [])
  return (
    <View style={[ls.bubble, ls.botBubble, { flexDirection:'row', alignItems:'center', gap:5, paddingVertical:16 }]}>
      {vals.map((v, i) => (
        <Animated.View key={i} style={[ls.dot, { transform:[{ translateY:v }] }]} />
      ))}
    </View>
  )
}

export default function ChatScreen() {
  const [messages, setMessages] = useState([WELCOME])
  const [input, setInput]       = useState('')
  const [typing, setTyping]     = useState(false)
  const listRef = useRef(null)

  const send = (text) => {
    const q = (text || input).trim()
    if (!q) return
    setInput('')
    setMessages(prev => [...prev, { id: Date.now() + 'u', role:'user', text: q }])
    setTyping(true)
    setTimeout(() => {
      const reply = getBotReply(q)
      setMessages(prev => [...prev, { id: Date.now() + 'b', role:'bot', text: reply.ans }])
      setTyping(false)
    }, 500 + Math.random() * 400)
  }

  useEffect(() => {
    setTimeout(() => listRef.current?.scrollToEnd({ animated:true }), 100)
  }, [messages, typing])

  return (
    <KeyboardAvoidingView style={{ flex:1, backgroundColor:C.bg }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>

      {/* Header */}
      <View style={ls.header}>
        <View style={ls.botAvatar}>
          <Text style={{ fontSize:22 }}>🤖</Text>
        </View>
        <View>
          <Text style={ls.headerTitle}>NikiBot</Text>
          <View style={[s.hstack, { gap:5 }]}>
            <View style={ls.onlineDot} />
            <Text style={ls.headerSub}>Always online • Offline AI</Text>
          </View>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={m => m.id}
        contentContainerStyle={ls.messageList}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[ls.msgRow, item.role === 'user' && ls.userRow]}>
            {item.role === 'bot' && (
              <View style={ls.avatar}><Text style={{ fontSize:15 }}>🤖</Text></View>
            )}
            <View style={[ls.bubble, item.role === 'user' ? ls.userBubble : ls.botBubble]}>
              {item.role === 'bot'
                ? <RichText text={item.text} style={ls.botText} />
                : <Text style={ls.userText}>{item.text}</Text>
              }
            </View>
          </View>
        )}
        ListFooterComponent={typing ? (
          <View style={ls.msgRow}>
            <View style={ls.avatar}><Text style={{ fontSize:15 }}>🤖</Text></View>
            <TypingDots />
          </View>
        ) : null}
      />

      {/* Suggestion chips */}
      <FlatList
        horizontal
        data={SUGGESTIONS}
        keyExtractor={(_, i) => i.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={ls.chips}
        renderItem={({ item }) => (
          <Pressable style={ls.chip} onPress={() => send(item)}>
            <Text style={ls.chipText}>{item}</Text>
          </Pressable>
        )}
      />

      {/* Input bar */}
      <View style={ls.inputBar}>
        <TextInput
          style={ls.textInput}
          value={input}
          onChangeText={setInput}
          placeholder="Ask anything about Malaysia..."
          placeholderTextColor={C.placeholder}
          returnKeyType="send"
          onSubmitEditing={() => send()}
          multiline={false}
        />
        <TouchableOpacity
          style={[ls.sendBtn, !input.trim() && { opacity:0.4 }]}
          onPress={() => send()}
          disabled={!input.trim()}
          activeOpacity={0.8}>
          <Ionicons name="arrow-up" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const ls = StyleSheet.create({
  // Header
  header:      { backgroundColor:C.primary, paddingHorizontal:SP.lg, paddingVertical:SP.md,
                 flexDirection:'row', alignItems:'center', gap:12 },
  botAvatar:   { width:42, height:42, borderRadius:21, backgroundColor:'rgba(255,255,255,0.2)',
                 alignItems:'center', justifyContent:'center' },
  headerTitle: { fontSize:16, fontWeight:W.bold, color:'#fff' },
  headerSub:   { fontSize:12, color:'rgba(255,255,255,0.8)' },
  onlineDot:   { width:7, height:7, borderRadius:4, backgroundColor:'#7FFFA0' },

  // Messages
  messageList: { padding:SP.lg, gap:12, paddingBottom:SP.md },
  msgRow:      { flexDirection:'row', alignItems:'flex-end', gap:8 },
  userRow:     { flexDirection:'row-reverse' },
  avatar:      { width:30, height:30, borderRadius:15, backgroundColor:C.primaryLt || '#E6F7EE',
                 alignItems:'center', justifyContent:'center' },
  bubble:      { maxWidth:'78%', borderRadius:18, paddingHorizontal:14, paddingVertical:10 },
  botBubble:   { backgroundColor:'#fff', borderBottomLeftRadius:4, ...shadow },
  userBubble:  { backgroundColor:C.primary, borderBottomRightRadius:4 },
  botText:     { fontSize:15, lineHeight:22, color:C.label },
  userText:    { fontSize:15, lineHeight:22, color:'#fff' },
  dot:         { width:7, height:7, borderRadius:3.5, backgroundColor:C.muted },

  // Chips
  chips:       { paddingHorizontal:SP.lg, paddingVertical:SP.sm, gap:8,
                 backgroundColor:'#fff', borderTopWidth:StyleSheet.hairlineWidth, borderTopColor:C.sep },
  chip:        { backgroundColor:C.primaryLt || '#E6F7EE', borderRadius:R.full,
                 paddingHorizontal:14, paddingVertical:7 },
  chipText:    { fontSize:13, color:C.primary, fontWeight:W.semibold },

  // Input
  inputBar:    { flexDirection:'row', alignItems:'center', gap:10, paddingHorizontal:SP.lg,
                 paddingVertical:SP.sm, paddingBottom: Platform.OS === 'ios' ? 28 : SP.md,
                 backgroundColor:'#fff' },
  textInput:   { flex:1, backgroundColor:C.bg, borderRadius:R.full, paddingHorizontal:16,
                 paddingVertical:10, fontSize:15, color:C.label,
                 borderWidth:1.5, borderColor:C.border },
  sendBtn:     { width:38, height:38, borderRadius:19, backgroundColor:C.primary,
                 alignItems:'center', justifyContent:'center' },
})
