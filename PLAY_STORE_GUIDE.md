# NikiBhavi Mobile App — Full Deployment Guide
## Google Play Store Submission (Step by Step)

---

## Architecture Overview

```
Your Code (GitHub repo)
    │
    ├── push to main
    │
    ▼
GitHub Actions (.github/workflows/mobile-build.yml)
    │
    ├── installs EAS CLI
    ├── runs: eas build --platform android
    │
    ▼
Expo EAS Build (cloud — no Mac needed!)
    │
    ├── compiles Android .aab file
    ├── signs with your keystore
    │
    ▼
Google Play Console
    │
    ├── Internal Track → Alpha → Beta → Production
    │
    ▼
Google Play Store  ← users download here
```

**Firebase = Web app only.**
**EAS Build = Mobile app (Android + iOS).**

---

## PHASE 1 — Create Accounts (one time)

### 1A. Expo Account (FREE)
1. Go to **expo.dev**
2. Click **Sign Up** — use your email
3. Verify email

### 1B. Google Play Developer Account ($25 one-time)
1. Go to **play.google.com/console**
2. Pay **$25 USD** registration fee (one time, forever)
3. Fill in developer profile (name, address)
4. Wait **24–48 hours** for activation email

> ⚠️ You cannot skip the $25 fee. It's Google's one-time charge to prevent spam apps.

---

## PHASE 2 — Set Up EAS Build (run once on your laptop)

### Install tools
```bash
npm install -g eas-cli
```

### Login to Expo
```bash
eas login
# Enter your expo.dev email + password
```

### Link project to Expo
```bash
cd nikibhavi/mobile
eas init
```
This outputs something like:
```
✅ Project created: https://expo.dev/@yourname/nikibhavi
   projectId: abc123-def456-...
```

**Copy that projectId** and paste it into `mobile/app.json`:
```json
"extra": {
  "eas": {
    "projectId": "abc123-def456-..."  ← paste here
  }
},
"owner": "yourexponame"              ← your expo username here
```

### Test build locally (optional)
```bash
eas build --platform android --profile preview
# This builds a .apk you can install directly on your phone to test
```

---

## PHASE 3 — Add GitHub Secrets

Go to your GitHub repo → **Settings → Secrets and variables → Actions → New repository secret**

Add these 2 secrets:

### Secret 1: EXPO_TOKEN
```bash
# Get your token from terminal:
eas whoami --token
# OR go to: expo.dev/accounts/[your-name]/settings/access-tokens
# Create new token → copy it
```
Name: `EXPO_TOKEN`
Value: `your-expo-token-here`

### Secret 2: FIREBASE_SERVICE_ACCOUNT (for web deploy)
Already set up from Firebase step. Skip if done.

---

## PHASE 4 — Play Store First Upload (manual, one time only)

Google Play requires the **first APK/AAB to be uploaded manually**. After that, GitHub Actions can auto-submit.

### 4A. Build the .aab file
```bash
cd mobile
eas build --platform android --profile production
```
EAS builds in the cloud (~10-15 min). When done:
```bash
eas build:list
# Shows your builds with download links
```
Download the `.aab` file from the Expo dashboard or the link shown.

### 4B. Create app in Play Console
1. Go to **play.google.com/console**
2. Click **Create app**
3. Fill in:
   - App name: `NikiBhavi`
   - Default language: `English (India)` or `English (US)`
   - App or game: `App`
   - Free or paid: `Free`
4. Click **Create app**

### 4C. Complete the store listing
Go to **Dashboard → Setup → App content** — fill in all required sections:

| Section | What to fill |
|---------|-------------|
| App access | All functionality available without login |
| Ads | Does not contain ads → (or "Contains ads" if AdSense) |
| Content rating | Complete questionnaire → gets you a rating |
| Target audience | 18+ recommended |
| News app | No |
| Store listing | Title, description, screenshots (see below) |

### Store listing content:
```
App name: NikiBhavi — Malaysia Guide for Indians

Short description (80 chars):
Visa, tax, salary & EPF guide for Indians living in Malaysia 🇲🇾

Full description (4000 chars):
NikiBhavi is the complete guide for Indians living in or moving to Malaysia.

🇲🇾 VISA & IMMIGRATION
• Tourist visa guide — Indians VISA-FREE until Dec 2026 (MDAC required)
• Employee Pass (EP) 2026 — new salary categories from June 1
• Dependent Pass, Student Pass guides
• EP eligibility checker

💰 FINANCIAL CALCULATORS
• PCB Tax Calculator — monthly take-home after all deductions
• EPF Calculator — project your retirement corpus
• Remittance Calculator — best rates to send money to India
• Car Loan EMI calculator
• Salary Comparison — India CTC vs Malaysia offer
• Expense Tracker — monthly budget with savings rate
• Budget Simulator — multi-year wealth projection

✈️ FLIGHT & BAGGAGE GUIDE
• Can I carry a wet grinder? Power bank? TV?
• Rules for all airlines (AirAsia, MAS, IndiGo, Emirates)
• KLIA vs KLIA2 terminal guide
• India customs duty-free limits

🤖 NIKIBOT — AI ASSISTANT (OFFLINE)
• Ask anything about Malaysia life
• Works without internet — answers stored locally
• EP salary, visa rules, EPF, housing, banking

📊 ALL TOOLS WORK OFFLINE
No account needed. No data collected. 100% free.

---
NikiBhavi YouTube: youtube.com/@NikiBhavi
Website: nikibhavi.msdevbuild.com
```

### Screenshots needed (minimum 2, max 8):
- Use your phone or emulator to take screenshots
- Or use a tool like **Figma** + device mockups
- Sizes: 1080×1920px or 1080×2340px (16:9 ratio)

### Feature Graphic (required):
- Size: 1024 × 500px
- Shows at top of Play Store listing
- Design tip: dark background (#0d0d0d) + "NikiBhavi" in lime + 🇲🇾 flag

### 4D. Upload your .aab file
1. Play Console → **Testing → Internal testing**
2. Click **Create new release**
3. Upload the `.aab` file you downloaded
4. Add release notes: `Initial release`
5. Click **Save → Review release → Start rollout**

Internal testing is instant — you can install it on your phone right away using the tester link.

---

## PHASE 5 — Enable Auto-Submit (for future updates)

### 5A. Create Google Play Service Account

This lets GitHub Actions submit to Play Store automatically.

1. Go to **play.google.com/console → Setup → API access**
2. Click **Link to a Google Cloud project** → Create new project
3. Click **Create new service account**
4. In Google Cloud Console that opens:
   - Click **+ CREATE SERVICE ACCOUNT**
   - Name: `github-actions-deploy`
   - Click **Create and continue**
   - Role: **Service Account User**
   - Click **Done**
5. Click the service account → **Keys tab → Add Key → Create new key → JSON**
6. Download the JSON file

Back in Play Console:
7. Click **Grant access** next to your service account
8. Permissions: **Release manager** (or Admin)
9. Click **Apply → Save**

### 5B. Add to GitHub Secrets
Take the downloaded JSON file content → paste as GitHub secret:

Name: `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON`
Value: (paste entire JSON content)

### 5C. Update eas.json submit section
```json
"submit": {
  "production": {
    "android": {
      "serviceAccountKeyPath": "./google-play-service-account.json",
      "track": "internal"
    }
  }
}
```

### 5D. Update mobile-build.yml to use the secret
In `.github/workflows/mobile-build.yml`, add before the submit step:
```yaml
- name: Write Play Store service account
  run: echo '${{ secrets.GOOGLE_PLAY_SERVICE_ACCOUNT_JSON }}' > mobile/google-play-service-account.json
```

---

## PHASE 6 — Production Release

After internal testing works:

1. **Play Console → Testing → Internal testing → Promote to → Production**
2. Set rollout percentage (start with 20%, increase gradually)
3. Google reviews the app (**1–3 days** first time, faster after)
4. App goes live on Play Store 🎉

---

## Full Flow After Setup

```
You edit code on laptop
    ↓
git push origin main
    ↓
GitHub Actions triggers automatically
    ↓  (web)                    (mobile)
Firebase Hosting              EAS Build (cloud)
  ↓                             ↓
Web live in 60 sec           .aab built in ~15 min
                                ↓
                           Auto-submitted to Play Store
                                ↓
                           Internal track → test
                                ↓
                           Promote to Production
```

---

## Checklist Summary

- [ ] Create expo.dev account (free)
- [ ] Create Google Play Developer account ($25)
- [ ] Run `eas init` in `mobile/` folder
- [ ] Update `projectId` and `owner` in `app.json`
- [ ] Add `EXPO_TOKEN` to GitHub secrets
- [ ] Create app assets (icon 1024×1024, splash, screenshots)
- [ ] First manual upload via Play Console (required once)
- [ ] Create Google Play service account JSON
- [ ] Add `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON` to GitHub secrets
- [ ] All future updates: just push to main ✅

---

## Useful Commands

```bash
# Check build status
eas build:list

# Download latest build
eas build:download

# Run on your phone (Expo Go app)
cd mobile && npx expo start

# Build APK for direct install (testing)
eas build --platform android --profile preview

# Build production AAB
eas build --platform android --profile production

# Submit manually
eas submit --platform android --latest
```
