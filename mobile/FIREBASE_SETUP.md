# Firebase Setup Guide for NikiBhavi

## Step 1 — Create Firebase Project

1. Go to https://console.firebase.google.com
2. Click "Add project" → name it **NikiBhavi**
3. Enable Google Analytics → select your account
4. Click "Create project"

---

## Step 2 — Add Android App

1. In Firebase console → click Android icon
2. Package name: `com.nikibhavi.app`
3. App nickname: `NikiBhavi Android`
4. Download `google-services.json`
5. Place it at: `mobile/google-services.json`

---

## Step 3 — Enable Firebase Services

### Analytics
- Firebase Console → Analytics → Enable

### Crashlytics  
- Firebase Console → Crashlytics → Enable
- Click "Enable Crashlytics"

### Cloud Messaging (Push Notifications)
- Firebase Console → Cloud Messaging → Already enabled by default

### App Distribution
- Firebase Console → App Distribution → Get started
- Add testers by email

---

## Step 4 — Send Push Notification to Topic

### From Firebase Console (easy way):
1. Firebase Console → Cloud Messaging
2. Click "Send your first message"
3. Title: e.g. `🎉 New Feature in NikiBhavi!`
4. Body: e.g. `Live gold rates now available. Check it out!`
5. Click "Next" → Target → **Topic**
6. Topic name: `nikibhavi`
7. Schedule → Now → Review → Publish

### From API (programmatic way):
```bash
curl -X POST https://fcm.googleapis.com/fcm/send \
  -H "Authorization: key=YOUR_SERVER_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "/topics/nikibhavi",
    "notification": {
      "title": "🎉 NikiBhavi Update!",
      "body": "New tools added — Driving Licence guide is live!"
    },
    "data": {
      "screen": "guide/driving-licence",
      "type": "announcement"
    }
  }'
```

Get SERVER_KEY from:
Firebase Console → Project Settings → Cloud Messaging → Server key

---

## Step 5 — App Distribution (instead of Play Store for testing)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Build APK first
npx eas-cli build --platform android --profile preview

# Download the APK from EAS, then distribute via Firebase
firebase appdistribution:distribute app-release.apk \
  --app YOUR_FIREBASE_APP_ID \
  --groups "testers" \
  --release-notes "Version 1.0.2 - New features"
```

OR use EAS + Firebase together:
```bash
# In eas.json, add distribution channel
# Then build and Firebase auto-distributes
npx eas-cli build --platform android --profile preview --auto-submit
```

---

## Step 6 — Build with Firebase

```bash
cd ~/Documents/GitHub/NikiBhavi/mobile

# Make sure google-services.json is in mobile/ folder
ls google-services.json  # should exist

# Install deps
npm install

# Build production
npx eas-cli build --platform android --profile production
```

---

## Topics Available

| Topic | Who gets it | Use for |
|-------|-------------|---------|
| `nikibhavi` | ALL users | General announcements |
| `nikibhavi_android` | Android users only | Android-specific updates |
| `nikibhavi_ios` | iOS users only | iOS-specific updates |

---

## Notification Data Payload

Send extra data to deep-link into specific screens:

```json
{
  "data": {
    "screen": "guide/driving-licence",
    "type": "announcement"
  }
}
```

Supported screen values:
- `guide/ep` — EP Guide
- `guide/driving-licence` — Driving Licence
- `calculator/pcb` — PCB Calculator  
- `(tabs)/memy` — My Malaysia tab
- `(tabs)/tools` — Tools tab

