import { useEffect } from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as SplashScreen from 'expo-splash-screen'
import { C } from '../src/theme/index'
import { initFirebase } from '../src/firebase'
import { trackLaunchAndReview, checkForUpdate } from '../src/appReviewAndUpdate'

SplashScreen.preventAutoHideAsync()

const HDR = {
  headerStyle:         { backgroundColor: C.primary },
  headerTintColor:     '#fff',
  headerTitleStyle:    { fontWeight:'700', fontSize:17, color:'#fff', letterSpacing:-0.3 },
  headerBackTitle:     'Back',
  contentStyle:        { backgroundColor: C.bg },
  headerShadowVisible: false,
}

export default function RootLayout() {
  useEffect(() => {
    async function init() {
      try {
        await initFirebase()
        await trackLaunchAndReview()
        // Delay update check 5 seconds so app loads first
        setTimeout(() => {
          checkForUpdate().catch(e => console.warn('Update check:', e.message))
        }, 5000)
      } catch (e) {
        console.warn('Init error:', e.message)
      } finally {
        SplashScreen.hideAsync()
      }
    }
    init()
  }, [])

  return (
    <GestureHandlerRootView style={{ flex:1 }}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Stack screenOptions={HDR}>
          <Stack.Screen name="(tabs)" options={{ headerShown:false }} />
          <Stack.Screen name="more"   options={{ title:'About & Links' }} />

          {/* Calculators */}
          <Stack.Screen name="calculator/pcb"           options={{ title:'PCB Tax Calculator' }} />
          <Stack.Screen name="calculator/epf"           options={{ title:'EPF Calculator' }} />
          <Stack.Screen name="calculator/remit"         options={{ title:'Remittance' }} />
          <Stack.Screen name="calculator/carloan"       options={{ title:'Car Loan' }} />
          <Stack.Screen name="calculator/homeloan"      options={{ title:'Home Loan' }} />
          <Stack.Screen name="calculator/salary"        options={{ title:'Salary Comparison' }} />
          <Stack.Screen name="calculator/expense"       options={{ title:'Expense Tracker' }} />
          <Stack.Screen name="calculator/budget"        options={{ title:'Budget Simulator' }} />
          <Stack.Screen name="calculator/taxrefund"     options={{ title:'Tax Refund' }} />
          <Stack.Screen name="calculator/rentcalc"      options={{ title:'Rent Calculator' }} />
          <Stack.Screen name="calculator/livingcost"    options={{ title:'Living Cost Calculator' }} />
          <Stack.Screen name="calculator/taxresidency"  options={{ title:'Tax Residency (182 days)' }} />
          <Stack.Screen name="calculator/probation"     options={{ title:'Probation Calculator' }} />
          <Stack.Screen name="calculator/leave"         options={{ title:'Leave Planner 2026' }} />
          <Stack.Screen name="calculator/costcompare"   options={{ title:'Cost Compare' }} />

          {/* Guides */}
          <Stack.Screen name="guide/tourist"            options={{ title:'Tourist Visa 2026' }} />
          <Stack.Screen name="guide/tourist-hub"        options={{ title:'Tourist Hub' }} />
          <Stack.Screen name="guide/ep"                 options={{ title:'EP 2026 Guide' }} />
          <Stack.Screen name="guide/epf-withdrawal"     options={{ title:'EPF Withdrawal' }} />
          <Stack.Screen name="guide/living-cost"        options={{ title:'Living Cost Guide' }} />
          <Stack.Screen name="guide/pr-roadmap"         options={{ title:'PR Roadmap' }} />
          <Stack.Screen name="guide/moving-checklist"   options={{ title:'Moving Checklist' }} />
          <Stack.Screen name="guide/flights"            options={{ title:'Flight & Baggage' }} />
          <Stack.Screen name="guide/job-search"         options={{ title:'Job Search Guide' }} />
          <Stack.Screen name="guide/housing"            options={{ title:'Housing Guide' }} />
          <Stack.Screen name="guide/banking"            options={{ title:'Banking Guide' }} />
          <Stack.Screen name="guide/sim-card"           options={{ title:'SIM Card Guide' }} />
          <Stack.Screen name="guide/ep-life-guide"      options={{ title:'EP Life Guide' }} />
          <Stack.Screen name="guide/dependent-pass"     options={{ title:'Dependent Pass' }} />
          <Stack.Screen name="guide/student-pass"       options={{ title:'Student Pass' }} />
          <Stack.Screen name="guide/hospital"           options={{ title:'Hospitals & Clinics' }} />
          <Stack.Screen name="guide/food-guide"         options={{ title:'Indian Food Guide' }} />
          <Stack.Screen name="guide/transport"          options={{ title:'Transport Guide' }} />
          <Stack.Screen name="guide/money-transfer"     options={{ title:'Money Transfer' }} />
          <Stack.Screen name="guide/driving-licence"    options={{ title:'Driving Licence Renewal' }} />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
