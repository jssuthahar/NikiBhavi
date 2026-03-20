import { Platform } from 'react-native'

export async function initFirebase() {
  try {
    const { default: app } = require('@react-native-firebase/app')
    app()

    // Analytics
    try {
      const { default: analytics } = require('@react-native-firebase/analytics')
      await analytics().setAnalyticsCollectionEnabled(true)
      console.log('✅ Firebase Analytics ready')
    } catch (e) { console.warn('Analytics:', e.message) }

    // Crashlytics
    try {
      const { default: crashlytics } = require('@react-native-firebase/crashlytics')
      await crashlytics().setCrashlyticsCollectionEnabled(true)
      console.log('✅ Crashlytics ready')
    } catch (e) { console.warn('Crashlytics:', e.message) }

    // Push Notifications
    await setupPushNotifications()

  } catch (e) {
    console.warn('Firebase init failed:', e.message)
  }
}

async function setupPushNotifications() {
  try {
    const { default: messaging } = require('@react-native-firebase/messaging')
    const fcm = messaging()

    // Request permission
    const authStatus = await fcm.requestPermission()
    const enabled = authStatus === 1 || authStatus === 2
    console.log('📱 Notification permission:', enabled ? '✅ granted' : '❌ denied')

    if (!enabled) return

    // Subscribe to nikibhavi topic
    await fcm.subscribeToTopic('nikibhavi')
    console.log('✅ Subscribed to: nikibhavi')

    // Get token
    const token = await fcm.getToken()
    console.log('📱 FCM Token:', token)

    // Foreground messages — Firebase on Android shows these automatically
    // if AndroidManifest has the right config (added by @react-native-firebase/app plugin)
    fcm.onMessage(async remoteMessage => {
      console.log('📨 Foreground message received:', remoteMessage.notification?.title)
      // Android shows notification automatically via the default channel
      // iOS needs manual display here — handled by APNs config
    })

    // Background tap handler
    fcm.onNotificationOpenedApp(remoteMessage => {
      console.log('📱 Notification tapped:', remoteMessage.data)
    })

    // Quit state tap
    const initial = await fcm.getInitialNotification()
    if (initial) {
      console.log('📱 Opened from notification:', initial.data)
    }

    console.log('✅ Push notifications ready')
  } catch (e) {
    console.warn('Push setup failed:', e.message)
  }
}

// Background handler — registered in index.js
export function registerBackgroundHandler() {
  try {
    const { default: messaging } = require('@react-native-firebase/messaging')
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('📨 Background message:', remoteMessage.notification?.title)
    })
  } catch (e) {
    console.warn('Background handler failed:', e.message)
  }
}

// Analytics helpers
export function logEvent(name, params = {}) {
  try {
    const { default: analytics } = require('@react-native-firebase/analytics')
    analytics().logEvent(name, params)
  } catch {}
}

export function logScreenView(screenName) {
  try {
    const { default: analytics } = require('@react-native-firebase/analytics')
    analytics().logScreenView({ screen_name: screenName, screen_class: screenName })
  } catch {}
}

export function logCalculatorUsed(name) {
  logEvent('calculator_used', { calculator: name, platform: Platform.OS })
}

export function logGuideViewed(name) {
  logEvent('guide_viewed', { guide: name, platform: Platform.OS })
}

export async function subscribeToTopic(topic) {
  try {
    const { default: messaging } = require('@react-native-firebase/messaging')
    await messaging().subscribeToTopic(topic)
    console.log('✅ Subscribed:', topic)
  } catch (e) { console.warn('Subscribe failed:', e.message) }
}
