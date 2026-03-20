import { Platform, Alert, Linking } from 'react-native'
import { storage } from './storage'

const LAUNCH_COUNT_KEY      = 'app_launch_count'
const LAST_REVIEW_KEY       = 'last_review_date'
const REVIEW_AFTER_LAUNCHES = 5
const REVIEW_COOLDOWN_DAYS  = 30

// ── Track launches & trigger review ──────────────────────────
export async function trackLaunchAndReview() {
  if (Platform.OS !== 'android') return
  try {
    const countStr = await storage.getItem(LAUNCH_COUNT_KEY)
    const count = parseInt(countStr || '0') + 1
    await storage.setItem(LAUNCH_COUNT_KEY, String(count))
    console.log(`App launch #${count}`)

    // Check cooldown
    const lastReview = await storage.getItem(LAST_REVIEW_KEY)
    if (lastReview) {
      const daysSince = (Date.now() - parseInt(lastReview)) / 86400000
      if (daysSince < REVIEW_COOLDOWN_DAYS) return
    }

    // Trigger after N launches
    if (count >= REVIEW_AFTER_LAUNCHES && count % REVIEW_AFTER_LAUNCHES === 0) {
      await requestReview()
    }
  } catch (e) {
    console.warn('Launch tracking failed:', e.message)
  }
}

// ── Request Google Play review ────────────────────────────────
export async function requestReview() {
  try {
    const StoreReview = require('expo-store-review')

    const isAvailable = await StoreReview.isAvailableAsync()
    if (!isAvailable) {
      console.log('Store review not available')
      return
    }

    const hasAction = await StoreReview.hasAction()
    if (hasAction) {
      await StoreReview.requestReview()
      await storage.setItem(LAST_REVIEW_KEY, String(Date.now()))
      console.log('✅ Review requested')
    }
  } catch (e) {
    console.warn('Review request failed:', e.message)
  }
}

// ── Check for app update ──────────────────────────────────────
export async function checkForUpdate() {
  if (Platform.OS !== 'android') return
  try {
    // Get current version
    const Application = require('expo-application')
    const currentVersion = Application.nativeApplicationVersion
    console.log('Current version:', currentVersion)

    // Fetch Play Store page to check latest version
    const res = await fetch(
      `https://play.google.com/store/apps/details?id=com.nikibhavi.app&hl=en`,
      { headers: { 'User-Agent': 'Mozilla/5.0' } }
    )
    const html = await res.text()
    const match = html.match(/\[\[\["(\d+\.\d+\.\d+)"\]\]/)
    if (!match) return

    const latestVersion = match[1]
    console.log('Play Store version:', latestVersion)

    if (latestVersion !== currentVersion) {
      Alert.alert(
        '🚀 Update Available!',
        `NikiBhavi ${latestVersion} is available with new features and improvements.`,
        [
          { text: 'Later', style: 'cancel' },
          {
            text: 'Update Now',
            onPress: () => Linking.openURL(
              'https://play.google.com/store/apps/details?id=com.nikibhavi.app'
            )
          }
        ]
      )
    }
  } catch (e) {
    console.warn('Update check failed:', e.message)
  }
}
