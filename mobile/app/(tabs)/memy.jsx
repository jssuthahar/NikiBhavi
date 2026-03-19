import { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { C, SP, W, R } from '../../src/theme/index'

// Import the actual screen content components
import DashboardContent from '../_sections/DashboardContent'
import CalendarContent  from '../_sections/CalendarContent'
import TrackerContent   from '../_sections/TrackerContent'

const TABS = [
  { id:'dashboard', label:'Dashboard', icon:'👤' },
  { id:'calendar',  label:'Calendar',  icon:'🗓️' },
  { id:'tracker',   label:'Tracker',   icon:'📊' },
]

export default function MeMYScreen() {
  const [active, setActive] = useState('dashboard')
  const insets = useSafeAreaInsets()

  return (
    <View style={{ flex:1, backgroundColor:'#F5F5F5' }}>
      {/* Sub-tab bar */}
      <View style={[ls.subTabBar, { paddingTop: Platform.OS === 'ios' ? insets.top : 0 }]}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[ls.subTab, active === tab.id && ls.subTabActive]}
            onPress={() => setActive(tab.id)}
            activeOpacity={0.7}
          >
            <Text style={{ fontSize:16 }}>{tab.icon}</Text>
            <Text style={[ls.subTabLabel, active === tab.id && ls.subTabLabelActive]}>
              {tab.label}
            </Text>
            {active === tab.id && <View style={ls.subTabDot} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <View style={{ flex:1 }}>
        {active === 'dashboard' && <DashboardContent />}
        {active === 'calendar'  && <CalendarContent />}
        {active === 'tracker'   && <TrackerContent />}
      </View>
    </View>
  )
}

const ls = StyleSheet.create({
  subTabBar: {
    flexDirection:'row',
    backgroundColor: C.primary,
    paddingHorizontal: SP.lg,
    paddingBottom: SP.sm,
  },
  subTab: {
    flex:1, alignItems:'center', justifyContent:'center',
    paddingVertical: SP.sm, gap:3, position:'relative',
  },
  subTabActive: {},
  subTabLabel: {
    fontSize:11, fontWeight:'600', color:'rgba(255,255,255,0.6)',
  },
  subTabLabelActive: {
    color:'#fff', fontWeight:'800',
  },
  subTabDot: {
    position:'absolute', bottom:-SP.sm, width:32, height:3,
    backgroundColor:'#C9F53B', borderRadius:2,
  },
})
