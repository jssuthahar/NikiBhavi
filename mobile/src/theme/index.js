// ── NikiBhavi Theme — Grab-inspired design system ────────────
import { StyleSheet, Platform, Dimensions } from 'react-native'

export const IS_IOS = Platform.OS === 'ios'
export const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window')

// ── Grab-inspired color palette ──────────────────────────────
export const C = {
  // Primary — Grab green
  primary:    '#00B14F',
  primaryDk:  '#007A37',
  primaryLt:  '#E6F7EE',
  primaryMid: '#00B14F22',

  // Accent
  accent:     '#00D166',
  brand:      '#C9F53B',   // NikiBhavi lime (for special moments)

  // Semantic
  success:    '#00B14F',
  warning:    '#FF9500',
  danger:     '#FF3B30',
  info:       '#007AFF',
  purple:     '#7B61FF',
  teal:       '#00C7BE',
  orange:     '#FF6B35',

  // Backgrounds
  bg:         '#F5F5F5',
  bg2:        '#FAFAFA',
  card:       '#FFFFFF',
  header:     '#00B14F',   // Grab green header

  // Text
  label:      '#1A1A1A',
  text:       '#333333',
  sub:        '#666666',
  muted:      '#999999',
  placeholder:'#BBBBBB',
  onPrimary:  '#FFFFFF',

  // Lines
  sep:        '#EEEEEE',
  border:     '#E0E0E0',

  // Overlays
  overlay:    'rgba(0,0,0,0.5)',
}

// ── Typography ────────────────────────────────────────────────
export const W = {
  regular:  '400',
  medium:   '500',
  semibold: '600',
  bold:     '700',
  heavy:    '800',
}

// ── Spacing ───────────────────────────────────────────────────
export const SP = { xs:4, sm:8, md:12, lg:16, xl:20, xxl:28, xxxl:40 }

// ── Border radius ─────────────────────────────────────────────
export const R = { xs:4, sm:8, md:10, lg:12, xl:16, xxl:20, xxxl:28, full:999 }

// ── Shadows ───────────────────────────────────────────────────
export const shadow = IS_IOS
  ? { shadowColor:'#000', shadowOffset:{width:0,height:1}, shadowOpacity:0.08, shadowRadius:4 }
  : { elevation:2 }

export const shadowMd = IS_IOS
  ? { shadowColor:'#000', shadowOffset:{width:0,height:3}, shadowOpacity:0.12, shadowRadius:8 }
  : { elevation:4 }

export const shadowLg = IS_IOS
  ? { shadowColor:'#00B14F', shadowOffset:{width:0,height:4}, shadowOpacity:0.2, shadowRadius:16 }
  : { elevation:8 }

// ── Base StyleSheet ───────────────────────────────────────────
export const s = StyleSheet.create({
  // Screens
  screen:     { flex:1, backgroundColor:'#F5F5F5' },
  screenWhite:{ flex:1, backgroundColor:'#FFFFFF' },

  // Cards
  card:       { backgroundColor:'#fff', borderRadius:R.xl, marginHorizontal:SP.lg, marginBottom:SP.md, ...shadow },
  cardFlat:   { backgroundColor:'#fff', borderRadius:R.xl, overflow:'hidden' },

  // Grab-style green header banner
  heroBanner: {
    backgroundColor: C.primary,
    paddingHorizontal: SP.lg,
    paddingTop: IS_IOS ? 0 : SP.md,
    paddingBottom: SP.xxl,
  },

  // List rows
  row:      { flexDirection:'row', alignItems:'center', paddingHorizontal:SP.lg, paddingVertical:14,
               borderBottomWidth:StyleSheet.hairlineWidth, borderBottomColor:'#EEEEEE' },
  rowLast:  { flexDirection:'row', alignItems:'center', paddingHorizontal:SP.lg, paddingVertical:14 },

  // Flex helpers
  hstack:   { flexDirection:'row', alignItems:'center' },
  vstack:   { flexDirection:'column' },
  between:  { flexDirection:'row', alignItems:'center', justifyContent:'space-between' },
  center:   { alignItems:'center', justifyContent:'center' },
  flex1:    { flex:1 },

  // Typography
  h1:       { fontSize:28, fontWeight:W.bold,    color:'#1A1A1A', letterSpacing:-0.5 },
  h2:       { fontSize:22, fontWeight:W.bold,    color:'#1A1A1A' },
  h3:       { fontSize:18, fontWeight:W.semibold,color:'#1A1A1A' },
  title:    { fontSize:17, fontWeight:W.semibold,color:'#1A1A1A' },
  body:     { fontSize:15, fontWeight:W.regular, color:'#333333', lineHeight:22 },
  small:    { fontSize:13, fontWeight:W.regular, color:'#666666' },
  tiny:     { fontSize:11, fontWeight:W.regular, color:'#999999' },
  label:    { fontSize:13, fontWeight:W.medium,  color:'#999999', textTransform:'uppercase', letterSpacing:0.5 },

  // Section header
  sectionHdr: { fontSize:12, fontWeight:W.bold, color:C.muted, textTransform:'uppercase',
                letterSpacing:0.8, paddingHorizontal:SP.lg, paddingTop:SP.xl, paddingBottom:SP.sm },

  // Input group (Grab style — white card with rows)
  inputGroup: { backgroundColor:'#fff', borderRadius:R.xl, marginHorizontal:SP.lg, marginBottom:SP.md, ...shadow },
  inputRow:   { flexDirection:'row', alignItems:'center', paddingHorizontal:SP.lg, paddingVertical:13,
                borderBottomWidth:StyleSheet.hairlineWidth, borderBottomColor:'#EEEEEE' },
  inputLabel: { fontSize:14, fontWeight:W.medium, color:'#1A1A1A', width:130 },
  input:      { flex:1, fontSize:16, color:'#1A1A1A', textAlign:'right', paddingVertical:0 },

  // Grab-style primary button (green pill)
  btnPrimary: {
    marginHorizontal:SP.lg, borderRadius:R.full, paddingVertical:15,
    alignItems:'center', backgroundColor:C.primary, ...shadowLg,
  },
  btnSecondary: {
    marginHorizontal:SP.lg, borderRadius:R.full, paddingVertical:14,
    alignItems:'center', backgroundColor:'#fff', borderWidth:1.5, borderColor:C.primary,
  },
  btnText:     { fontSize:16, fontWeight:W.bold,    color:'#fff' },
  btnTextSec:  { fontSize:16, fontWeight:W.bold,    color:C.primary },

  // Result cards
  resultCard:  { marginHorizontal:SP.lg, borderRadius:R.xxl, padding:SP.xl, marginBottom:SP.md, ...shadowMd },
  resultLabel: { fontSize:13, fontWeight:W.medium, color:'rgba(255,255,255,0.8)', marginBottom:6 },
  resultValue: { fontSize:36, fontWeight:W.heavy,  color:'#fff', letterSpacing:-1 },
  resultSub:   { fontSize:13, marginTop:6,          color:'rgba(255,255,255,0.7)' },

  // Tags / pills
  tag:     { paddingHorizontal:10, paddingVertical:4, borderRadius:R.full },
  tagText: { fontSize:12, fontWeight:W.semibold },

  // Grab-style info pill
  pill:      { paddingHorizontal:12, paddingVertical:5, borderRadius:R.full, backgroundColor:C.primaryLt },
  pillText:  { fontSize:13, fontWeight:W.semibold, color:C.primary },
})
