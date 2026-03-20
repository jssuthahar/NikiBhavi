// ── Firebase Setup ────────────────────────────────────────────
// Central Firebase initialization for NikiBhavi app

import { Platform } from 'react-native'

let analytics    = null
let crashlytics  = null
let messaging    = null
let firebaseApp  = null

// Safe init — won't crash if Firebase not configured yet
export async function initFirebase() {
  try {
    const app = require('@react-native-firebase/app').default
    firebaseApp = app()

    // Analytics
    try {
      const fa = require('@react-native-firebase/analytics').default
      analytics = fa()
      await analytics.setAnalyticsCollectionEnabled(true)
      console.log('✅ Firebase Analytics ready')
    } catch (e) { console.warn('Analytics init failed:', e.message) }

    // Crashlytics
    try {
      const fc = require('@react-native-firebase/crashlytics').default
      crashlytics = fc()
      await crashlytics.setCrashlyticsCollectionEnabled(true)
      console.log('✅ Firebase Crashlytics ready')
    } catch (e) { console.warn('Crashlytics init failed:', e.message) }

    // Messaging (Push Notifications)
    try {
      const fm = require('@react-native-firebase/messaging').default
      messaging = fm()
      await setupPushNotifications(messaging)
      console.log('✅ Firebase Messaging ready')
    } catch (e) { console.warn('Messaging init failed:', e.message) }

  } catch (e) {
    console.warn('Firebase init failed — running without Firebase:', e.message)
  }
}

// ── Push Notifications Setup ──────────────────────────────────
async function setupPushNotifications(fcm) {
  // Request permission (iOS requires explicit permission)
  const authStatus = await fcm.requestPermission()
  const enabled =
    authStatus === fcm.AuthorizationStatus?.AUTHORIZED ||
    authStatus === fcm.AuthorizationStatus?.PROVISIONAL ||
    authStatus === 1 || authStatus === 2

  if (!enabled) {
    console.log('Push notification permission denied')
    return
  }

  // Subscribe to topic — all users get NikiBhavi announcements
  await fcm.subscribeToTopic('nikibhavi')
  console.log('✅ Subscribed to topic: nikibhavi')

  // Subscribe to platform-specific topic
  await fcm.subscribeToTopic('nikibhavi_android')
  console.log('✅ Subscribed to: nikibhavi_android')

  // Get FCM token for this device
  const token = await fcm.getToken()
  console.log('FCM Token:', token)

  // Handle foreground messages (app is open)
  fcm.onMessage(async remoteMessage => {
    console.log('📱 Foreground notification:', remoteMessage)
    handleNotification(remoteMessage)
  })

  // Handle background/quit state messages
  fcm.setBackgroundMessageHandler(async remoteMessage => {
    console.log('📱 Background notification:', remoteMessage)
  })

  // Handle notification tap (app opened from notification)
  fcm.onNotificationOpenedApp(remoteMessage => {
    console.log('📱 Notification opened app:', remoteMessage)
    handleNotificationTap(remoteMessage)
  })

  // Check if app was opened from a notification (quit state)
  const initialNotification = await fcm.getInitialNotification()
  if (initialNotification) {
    console.log('📱 App opened from quit state notification')
    handleNotificationTap(initialNotification)
  }
}

function handleNotification(msg) {
  const { notification, data } = msg
  // You can show an in-app banner here
  console.log('Notification:', notification?.title, notification?.body)
}

function handleNotificationTap(msg) {
  const { data } = msg
  // Navigate based on data.screen if provided
  if (data?.screen) {
    console.log('Navigate to:', data.screen)
  }
}

// ── Analytics Helpers ─────────────────────────────────────────
export function logEvent(name, params = {}) {
  try { analytics?.logEvent(name, params) } catch {}
}

export function logScreenView(screenName) {
  try {
    analytics?.logScreenView({ screen_name: screenName, screen_class: screenName })
  } catch {}
}

export function logCalculatorUsed(calculatorName) {
  logEvent('calculator_used', { calculator: calculatorName, platform: Platform.OS })
}

export function logGuideViewed(guideName) {
  logEvent('guide_viewed', { guide: guideName, platform: Platform.OS })
}

export function logChatMessage() {
  logEvent('nikibot_message_sent', { platform: Platform.OS })
}

// ── Crashlytics Helpers ───────────────────────────────────────
export function recordError(error, context = '') {
  try {
    crashlytics?.recordError(error)
    if (context) crashlytics?.log(context)
  } catch {}
}

export function setUserProperty(key, value) {
  try { analytics?.setUserProperty(key, String(value)) } catch {}
}

// ── Topic Management ──────────────────────────────────────────
export async function subscribeToTopic(topic) {
  try {
    const fcm = require('@react-native-firebase/messaging').default
    await fcm().subscribeToTopic(topic)
    console.log(`✅ Subscribed to: ${topic}`)
    return true
  } catch (e) {
    console.warn('Subscribe failed:', e.message)
    return false
  }
}

export async function unsubscribeFromTopic(topic) {
  try {
    const fcm = require('@react-native-firebase/messaging').default
    await fcm().unsubscribeFromTopic(topic)
    console.log(`✅ Unsubscribed from: ${topic}`)
    return true
  } catch (e) {
    console.warn('Unsubscribe failed:', e.message)
    return false
  }
}

export { analytics, crashlytics, messaging }
