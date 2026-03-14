import { Platform } from 'react-native'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { C } from '../../src/theme/index'

const TAB_ICON = (name) => ({ color, focused, size }) => (
  <Ionicons name={focused ? name : `${name}-outline`} size={size} color={color} />
)

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor:    C.primary,
      tabBarInactiveTintColor:  '#AAAAAA',
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
      tabBarLabelStyle: { fontSize:10, fontWeight:'700', marginTop:2, letterSpacing:0.2 },
      headerStyle:          { backgroundColor: C.primary },
      headerTitleStyle:     { fontWeight:'700', color:'#fff', fontSize:17, letterSpacing:-0.3 },
      headerTintColor:      '#fff',
      headerShadowVisible:  false,
    }}>
      <Tabs.Screen name="index"      options={{ title:'Home',      headerShown:false,          tabBarIcon: TAB_ICON('home') }} />
      <Tabs.Screen name="dashboard"  options={{ title:'My MY',     headerTitle:'My Malaysia',  tabBarIcon: TAB_ICON('person-circle') }} />
      <Tabs.Screen name="tools"      options={{ title:'Tools',                                  tabBarIcon: TAB_ICON('calculator') }} />
      <Tabs.Screen name="guides"     options={{ title:'Guides',                                 tabBarIcon: TAB_ICON('book') }} />
      <Tabs.Screen name="chat"       options={{ title:'NikiBot',                                tabBarIcon: TAB_ICON('chatbubble-ellipses') }} />
    </Tabs>
  )
}
