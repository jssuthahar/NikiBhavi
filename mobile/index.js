// Register background FCM handler BEFORE app loads — required by Firebase
try {
  const { registerBackgroundHandler } = require('./src/firebase')
  registerBackgroundHandler()
} catch (e) {
  console.warn('Background handler setup:', e.message)
}

import('expo-router/entry')
