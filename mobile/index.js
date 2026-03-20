// Register background FCM handler BEFORE app loads
try {
  const { registerBackgroundHandler } = require('./src/firebase')
  registerBackgroundHandler()
} catch (e) {
  console.warn('Background handler:', e.message)
}

import('expo-router/entry')
