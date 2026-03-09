import { useEffect } from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import * as SplashScreen from 'expo-splash-screen'
import { C } from '../src/theme/index'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  useEffect(() => { SplashScreen.hideAsync() }, [])
  return (
    <GestureHandlerRootView style={{ flex:1 }}>
      <StatusBar style="light" />
      <Stack screenOptions={{
        headerStyle:         { backgroundColor: C.primary },
        headerTintColor:     '#fff',
        headerTitleStyle:    { fontWeight:'700', fontSize:17, color:'#fff' },
        headerBackTitle:     'Back',
        contentStyle:        { backgroundColor: C.bg },
        headerShadowVisible: false,
      }}>
        <Stack.Screen name="(tabs)"                  options={{ headerShown:false }} />
        <Stack.Screen name="more"                    options={{ title:'About & Links' }} />
        <Stack.Screen name="calculator/pcb"          options={{ title:'PCB Tax Calculator' }} />
        <Stack.Screen name="calculator/epf"          options={{ title:'EPF Calculator' }} />
        <Stack.Screen name="calculator/remit"        options={{ title:'Remittance' }} />
        <Stack.Screen name="calculator/carloan"      options={{ title:'Car Loan' }} />
        <Stack.Screen name="calculator/homeloan"     options={{ title:'Home Loan' }} />
        <Stack.Screen name="calculator/salary"       options={{ title:'Salary Comparison' }} />
        <Stack.Screen name="calculator/expense"      options={{ title:'Expense Tracker' }} />
        <Stack.Screen name="calculator/budget"       options={{ title:'Budget Simulator' }} />
        <Stack.Screen name="calculator/taxrefund"    options={{ title:'Tax Refund' }} />
        <Stack.Screen name="calculator/rentcalc"     options={{ title:'Rent Calculator' }} />
        <Stack.Screen name="guide/flights"           options={{ title:'Flight & Baggage' }} />
        <Stack.Screen name="guide/ep"                options={{ title:'EP 2026 Guide' }} />
        <Stack.Screen name="guide/tourist"           options={{ title:'Tourist Visa' }} />
        <Stack.Screen name="guide/epf-withdrawal"    options={{ title:'EPF Withdrawal' }} />
        <Stack.Screen name="guide/living-cost"       options={{ title:'Living Cost Guide' }} />
        <Stack.Screen name="guide/pr-roadmap"        options={{ title:'PR Roadmap' }} />
        <Stack.Screen name="guide/moving-checklist"  options={{ title:'Moving Checklist' }} />
      </Stack>
    </GestureHandlerRootView>
  )
}
