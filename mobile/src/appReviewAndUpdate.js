// ── In-App Review & Update Manager ───────────────────────────
// Shows Google Play review dialog after user uses app 3+ times
// Checks for updates and prompts user to update

import { Platform, Alert, Linking } from 'react-native'
import { storage } from './storage'

const LAUNCH_COUNT_KEY = 'app_launch_count'
const LAST_REVIEW_KEY  = 'last_review_date'
const REVIEW_AFTER_LAUNCHES = 5   // ask after 5 launches
const REVIEW_COOLDOWN_DAYS  = 30  // ask max once per 30 days

// ── Track app launches & trigger review ──────────────────────
export async function trackLaunchAndReview() {
  if (Platform.OS !== 'android') return

  try {
    // Increment launch counter
    const countStr = await storage.getItem(LAUNCH_COUNT_KEY)
    const count = parseInt(countStr || '0') + 1
    await storage.setItem(LAUNCH_COUNT_KEY, String(count))
    console.log(`App launch #${count}`)

    // Check cooldown
    const lastReview = await storage.getItem(LAST_REVIEW_KEY)
    if (lastReview) {
      const daysSince = (Date.now() - parseInt(lastReview)) / (1000 * 60 * 60 * 24)
      if (daysSince < REVIEW_COOLDOWN_DAYS) {
        console.log(`Review cooldown: ${Math.round(daysSince)}/${REVIEW_COOLDOWN_DAYS} days`)
        return
      }
    }

    // Trigger review after N launches
    if (count >= REVIEW_AFTER_LAUNCHES && count % REVIEW_AFTER_LAUNCHES === 0) {
      await requestReview()
    }
  } catch (e) {
    console.warn('Review tracking failed:', e.message)
  }
}

// ── Request Google Play review ────────────────────────────────
export async function requestReview() {
  try {
    const InAppReview = require('react-native-in-app-review').default

    if (!InAppReview.isAvailable()) {
      console.log('In-app review not available on this device')
      return
    }

    console.log('Requesting in-app review...')
    const hasFlowFinishedSuccessfully = await InAppReview.RequestInAppReview()

    if (hasFlowFinishedSuccessfully) {
      await storage.setItem(LAST_REVIEW_KEY, String(Date.now()))
      console.log('✅ Review flow completed')
    }
  } catch (e) {
    console.warn('In-app review failed:', e.message)
  }
}

// ── Check for app updates ─────────────────────────────────────
export async function checkForUpdate() {
  if (Platform.OS !== 'android') return

  try {
    // Use Expo Updates to check for OTA updates first
    try {
      const Updates = require('expo-updates')
      const update = await Updates.checkForUpdateAsync()
      if (update.isAvailable) {
        console.log('OTA update available — fetching...')
        await Updates.fetchUpdateAsync()
        Alert.alert(
          '🎉 Update Ready!',
          'A new version of NikiBhavi is ready. Restart to apply the update.',
          [
            { text: 'Later', style: 'cancel' },
            {
              text: 'Restart Now',
              onPress: () => Updates.reloadAsync()
            }
          ]
        )
        return
      }
    } catch (e) {
      // OTA check failed or not configured — try Play Store update
    }

    // Check Play Store for native update
    await checkPlayStoreUpdate()

  } catch (e) {
    console.warn('Update check failed:', e.message)
  }
}

// ── Check Play Store for update ───────────────────────────────
async function checkPlayStoreUpdate() {
  try {
    // Use expo-application to get current version
    const Application = require('expo-application')
    const currentVersion = Application.nativeApplicationVersion
    const currentBuild   = Application.nativeBuildVersion
    console.log(`Current version: ${currentVersion} (${currentBuild})`)

    // Fetch latest version from Play Store
    const response = await fetch(
      `https://play.google.com/store/apps/details?id=com.nikibhavi.app&hl=en`,
      { headers: { 'User-Agent': 'Mozilla/5.0' } }
    )
    const html = await response.text()

    // Extract version from Play Store page
    const match = html.match(/\[\[\["(\d+\.\d+\.\d+)"\]\]/)
    if (!match) return

    const latestVersion = match[1]
    console.log(`Play Store version: ${latestVersion}`)

    if (latestVersion !== currentVersion) {
      Alert.alert(
        '🚀 Update Available!',
        `NikiBhavi ${latestVersion} is available on the Play Store with new features and improvements.`,
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
    console.warn('Play Store check failed:', e.message)
  }
}
