import { Platform } from 'react-native'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { C } from '../../src/theme/index'

const ICON = (name) => ({ color, focused, size }) => (
  <Ionicons name={focused ? name : `${name}-outline`} size={size} color={color} />
)

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor:   C.primary,
      tabBarInactiveTintColor: '#BBBBBB',
      tabBarStyle: {
        backgroundColor: '#FFFFFF',
        borderTopColor:  '#EEEEEE',
        borderTopWidth:  1,
        height:          Platform.OS === 'ios' ? 85 : 62,
        paddingBottom:   Platform.OS === 'ios' ? 26 : 8,
        paddingTop:      6,
        elevation:       12,
        shadowColor:     '#000',
        shadowOffset:    { width:0, height:-3 },
        shadowOpacity:   0.08,
        shadowRadius:    10,
      },
      tabBarLabelStyle: { fontSize:11, fontWeight:'700', marginTop:1 },
      headerStyle:         { backgroundColor: C.primary },
      headerTitleStyle:    { fontWeight:'700', color:'#fff', fontSize:17 },
      headerTintColor:     '#fff',
      headerShadowVisible: false,
    }}>
      {/* 1. Home — landing, rates, weather, tips */}
      <Tabs.Screen name="index"
        options={{ title:'Home', headerShown:false, tabBarIcon: ICON('home') }} />

      {/* 2. My MY — dashboard + calendar + tracker merged */}
      <Tabs.Screen name="memy"
        options={{ title:'My MY', headerTitle:'My Malaysia', tabBarIcon: ICON('person-circle') }} />

      {/* 3. Tools — all calculators */}
      <Tabs.Screen name="tools"
        options={{ title:'Tools', tabBarIcon: ICON('calculator') }} />

      {/* 4. Guides — all guides */}
      <Tabs.Screen name="guides"
        options={{ title:'Guides', tabBarIcon: ICON('book') }} />

      {/* 5. NikiBot — AI chat */}
      <Tabs.Screen name="chat"
        options={{ title:'NikiBot', tabBarIcon: ICON('chatbubble-ellipses') }} />

      {/* Hidden tabs — accessible via navigation but not in bottom bar */}
      <Tabs.Screen name="dashboard" options={{ href: null }} />
      <Tabs.Screen name="calendar"  options={{ href: null }} />
      <Tabs.Screen name="tracker"   options={{ href: null }} />
    </Tabs>
  )
}
