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
      tabBarInactiveTintColor: '#AAAAAA',
      tabBarStyle: {
        backgroundColor: '#FFFFFF',
        borderTopColor:  '#EEEEEE',
        borderTopWidth:  1,
        height:          Platform.OS === 'ios' ? 88 : 64,
        paddingBottom:   Platform.OS === 'ios' ? 28 : 10,
        paddingTop:      6,
        elevation:       8,
        shadowColor:     '#000',
        shadowOffset:    { width:0, height:-2 },
        shadowOpacity:   0.06,
        shadowRadius:    8,
      },
      tabBarLabelStyle:    { fontSize:10, fontWeight:'700', marginTop:2, letterSpacing:0.2 },
      headerStyle:         { backgroundColor: C.primary },
      headerTitleStyle:    { fontWeight:'700', color:'#fff', fontSize:17 },
      headerTintColor:     '#fff',
      headerShadowVisible: false,
    }}>
      <Tabs.Screen name="index"     options={{ title:'Home',     headerShown:false,        tabBarIcon: ICON('home') }} />
      <Tabs.Screen name="dashboard" options={{ title:'My MY',    headerTitle:'My Malaysia', tabBarIcon: ICON('person-circle') }} />
      <Tabs.Screen name="calendar"  options={{ title:'Calendar', tabBarIcon: ICON('calendar') }} />
      <Tabs.Screen name="tracker"   options={{ title:'Tracker',  tabBarIcon: ICON('trending-up') }} />
      <Tabs.Screen name="tools"     options={{ title:'Tools',    tabBarIcon: ICON('calculator') }} />
      <Tabs.Screen name="guides"    options={{ title:'Guides',   tabBarIcon: ICON('book') }} />
      <Tabs.Screen name="chat"      options={{ title:'NikiBot',  tabBarIcon: ICON('chatbubble-ellipses') }} />
    </Tabs>
  )
}
