import { Platform } from 'react-native'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { C } from '../../src/theme/index'

const icon = (name) => ({ color, focused, size }) => (
  <Ionicons
    name={focused ? name : `${name}-outline`}
    size={size}
    color={color}
  />
)

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor:   C.primary,
      tabBarInactiveTintColor: '#AAAAAA',
      tabBarStyle: {
        backgroundColor: '#fff',
        borderTopColor:  '#EEEEEE',
        borderTopWidth:  1,
        height:          Platform.OS === 'ios' ? 85 : 62,
        paddingBottom:   Platform.OS === 'ios' ? 28 : 8,
        paddingTop:      4,
      },
      tabBarLabelStyle:    { fontSize:10, fontWeight:'600', marginTop:1 },
      headerStyle:         { backgroundColor: C.primary },
      headerTitleStyle:    { fontWeight:'700', color:'#fff', fontSize:17 },
      headerTintColor:     '#fff',
      headerShadowVisible: false,
    }}>
      <Tabs.Screen name="index"   options={{ title:'Home',    tabBarIcon: icon('home') }} />
      <Tabs.Screen name="tools"   options={{ title:'Tools',   tabBarIcon: icon('calculator') }} />
      <Tabs.Screen name="guides"  options={{ title:'Guides',  tabBarIcon: icon('book') }} />
      <Tabs.Screen name="visa"    options={{ title:'Visa/EP', tabBarIcon: icon('airplane') }} />
      <Tabs.Screen name="chat"    options={{ title:'NikiBot', tabBarIcon: icon('chatbubble-ellipses') }} />
    </Tabs>
  )
}
