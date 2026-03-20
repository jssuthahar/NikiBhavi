import { AppRegistry } from 'react-native'
import { name as appName } from './app.json'

// ── Register background FCM handler BEFORE everything else ───
// This MUST be at the top level — not inside a component
try {
  const { default: messaging } = require('@react-native-firebase/messaging')
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Background FCM message:', remoteMessage)
    // System shows the notification automatically in background/quit state
  })
} catch (e) {
  console.warn('Background handler setup failed:', e.message)
}

// ── Register the main app ─────────────────────────────────────
import('expo-router/entry')
