import { Platform } from 'react-native'

export async function initFirebase() {
  try {
    const { default: app } = require('@react-native-firebase/app')
    app()
    console.log('✅ Firebase App initialized')

    // Analytics
    try {
      const { default: analytics } = require('@react-native-firebase/analytics')
      await analytics().setAnalyticsCollectionEnabled(true)
    } catch (e) { console.warn('Analytics:', e.message) }

    // Crashlytics
    try {
      const { default: crashlytics } = require('@react-native-firebase/crashlytics')
      await crashlytics().setCrashlyticsCollectionEnabled(true)
    } catch (e) { console.warn('Crashlytics:', e.message) }

    // Push Notifications — must run after Firebase app init
    await setupPushNotifications()

  } catch (e) {
    console.warn('Firebase init failed:', e.message)
  }
}

async function setupPushNotifications() {
  try {
    const { default: messaging } = require('@react-native-firebase/messaging')
    const fcm = messaging()

    // ── Step 1: Check current permission status ────────────────
    const currentStatus = await fcm.hasPermission()
    console.log('Current permission status:', currentStatus)

    let authStatus = currentStatus

    // ── Step 2: Request permission if not granted ──────────────
    // Status: 0=DENIED, 1=AUTHORIZED, 2=PROVISIONAL, -1=NOT_DETERMINED
    if (currentStatus !== 1 && currentStatus !== 2) {
      console.log('Requesting notification permission...')
      authStatus = await fcm.requestPermission({
        alert: true,
        badge: true,
        sound: true,
        provisional: false,
        announcement: false,
        carPlay: false,
        criticalAlert: false,
      })
      console.log('Permission result:', authStatus)
    }

    const enabled = authStatus === 1 || authStatus === 2
    console.log('Notifications enabled:', enabled)

    if (!enabled) {
      console.warn('Push notifications DENIED — user needs to enable in Settings')
      return
    }

    // ── Step 3: Get FCM token ──────────────────────────────────
    try {
      const token = await fcm.getToken()
      console.log('✅ FCM Token:', token)
    } catch (e) {
      console.warn('Token error:', e.message)
    }

    // ── Step 4: Subscribe to topics ───────────────────────────
    try {
      await fcm.subscribeToTopic('nikibhavi')
      console.log('✅ Subscribed to: nikibhavi')
    } catch (e) {
      console.warn('Topic subscription failed:', e.message)
    }

    // ── Step 5: Foreground message handler ────────────────────
    const unsubscribe = fcm.onMessage(async remoteMessage => {
      console.log('📨 Foreground notification:', remoteMessage.notification?.title)
      // On Android, foreground notifications need to be displayed manually
      // The messaging plugin handles this via the notification channel
    })

    // ── Step 6: Background/quit tap handler ───────────────────
    fcm.onNotificationOpenedApp(remoteMessage => {
      console.log('📱 App opened from notification:', remoteMessage.data)
    })

    // Check if app was opened from quit state via notification
    const initialNotification = await fcm.getInitialNotification()
    if (initialNotification) {
      console.log('📱 App launched from notification:', initialNotification.data)
    }

    console.log('✅ Push notifications fully configured')
    return unsubscribe

  } catch (e) {
    console.warn('Push notification setup failed:', e.message)
  }
}

// ── Background handler — registered in index.js ───────────────
export function registerBackgroundHandler() {
  try {
    const { default: messaging } = require('@react-native-firebase/messaging')
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('📨 Background message:', remoteMessage.notification?.title)
    })
    console.log('✅ Background handler registered')
  } catch (e) {
    console.warn('Background handler failed:', e.message)
  }
}

// ── Analytics helpers ─────────────────────────────────────────
export function logEvent(name, params = {}) {
  try {
    const { default: analytics } = require('@react-native-firebase/analytics')
    analytics().logEvent(name, { ...params, platform: Platform.OS })
  } catch {}
}

export function logScreenView(screenName) {
  try {
    const { default: analytics } = require('@react-native-firebase/analytics')
    analytics().logScreenView({ screen_name: screenName, screen_class: screenName })
  } catch {}
}

export function logCalculatorUsed(name) { logEvent('calculator_used', { calculator: name }) }
export function logGuideViewed(name) { logEvent('guide_viewed', { guide: name }) }

export async function subscribeToTopic(topic) {
  try {
    const { default: messaging } = require('@react-native-firebase/messaging')
    await messaging().subscribeToTopic(topic)
    console.log('✅ Subscribed to topic:', topic)
  } catch (e) { console.warn('Subscribe failed:', e.message) }
}
