import { Platform } from 'react-native'

let _messaging = null

// ── Main init — call once in _layout.jsx ─────────────────────
export async function initFirebase() {
  try {
    // Must import app first
    const { default: app } = require('@react-native-firebase/app')
    app() // initialize

    // Analytics
    try {
      const { default: analytics } = require('@react-native-firebase/analytics')
      await analytics().setAnalyticsCollectionEnabled(true)
      console.log('✅ Analytics ready')
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

// ── Push Notifications ────────────────────────────────────────
async function setupPushNotifications() {
  try {
    const { default: messaging } = require('@react-native-firebase/messaging')
    _messaging = messaging()

    // ── Step 1: Create Android notification channel ────────────
    // Without this, notifications are SILENTLY DROPPED on Android 8+
    if (Platform.OS === 'android') {
      try {
        const { default: notifee, AndroidImportance } = require('@notifee/react-native')
        await notifee.createChannel({
          id:          'nikibhavi_default',
          name:        'NikiBhavi Notifications',
          importance:  AndroidImportance.HIGH,
          sound:       'default',
          vibration:   true,
        })
        await notifee.createChannel({
          id:          'nikibhavi_updates',
          name:        'App Updates',
          importance:  AndroidImportance.HIGH,
          sound:       'default',
        })
        console.log('✅ Notification channels created')
      } catch (e) {
        console.warn('Notifee channel creation failed:', e.message)
      }
    }

    // ── Step 2: Request permission ─────────────────────────────
    const authStatus = await _messaging.requestPermission({
      alert:         true,
      announcement:  false,
      badge:         true,
      carPlay:       false,
      criticalAlert: false,
      provisional:   false,
      sound:         true,
    })

    const enabled = authStatus === 1 || authStatus === 2
    console.log('📱 Notification permission:', authStatus, enabled ? '✅' : '❌')

    if (!enabled) {
      console.warn('❌ Push notifications permission DENIED by user')
      return
    }

    // ── Step 3: Subscribe to topic ─────────────────────────────
    await _messaging.subscribeToTopic('nikibhavi')
    console.log('✅ Subscribed to topic: nikibhavi')

    // ── Step 4: Get FCM Token ──────────────────────────────────
    const token = await _messaging.getToken()
    console.log('📱 FCM Token:', token)

    // ── Step 5: Handle foreground messages ────────────────────
    // When app is OPEN — FCM does NOT show notification automatically
    // You must show it manually using notifee
    _messaging.onMessage(async remoteMessage => {
      console.log('📨 Foreground message:', JSON.stringify(remoteMessage))
      try {
        const { default: notifee, AndroidImportance } = require('@notifee/react-native')
        await notifee.displayNotification({
          title: remoteMessage.notification?.title || 'NikiBhavi',
          body:  remoteMessage.notification?.body  || 'New update!',
          android: {
            channelId:  'nikibhavi_default',
            importance:  AndroidImportance.HIGH,
            pressAction: { id: 'default' },
            smallIcon:   'ic_notification',
          },
        })
      } catch (e) {
        console.warn('Foreground display failed:', e.message)
      }
    })

    // ── Step 6: Handle background tap ─────────────────────────
    _messaging.onNotificationOpenedApp(remoteMessage => {
      console.log('📱 Notification tapped (background):', remoteMessage)
    })

    // ── Step 7: Handle quit state tap ─────────────────────────
    const initial = await _messaging.getInitialNotification()
    if (initial) {
      console.log('📱 App opened from notification:', initial)
    }

    // ── Step 8: Background handler ────────────────────────────
    _messaging.setBackgroundMessageHandler(async remoteMessage => {
      console.log('📨 Background message:', remoteMessage)
      // Background messages from FCM are shown automatically by the system
      // No need to call notifee here
    })

    console.log('✅ Push notifications fully set up')

  } catch (e) {
    console.warn('Push notification setup failed:', e.message)
  }
}

// ── Analytics helpers ─────────────────────────────────────────
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

// ── Topic subscription helpers ────────────────────────────────
export async function subscribeToTopic(topic) {
  try {
    const { default: messaging } = require('@react-native-firebase/messaging')
    await messaging().subscribeToTopic(topic)
    console.log('✅ Subscribed:', topic)
  } catch (e) { console.warn('Subscribe failed:', e.message) }
}

export async function unsubscribeFromTopic(topic) {
  try {
    const { default: messaging } = require('@react-native-firebase/messaging')
    await messaging().unsubscribeFromTopic(topic)
    console.log('✅ Unsubscribed:', topic)
  } catch (e) { console.warn('Unsubscribe failed:', e.message) }
}
