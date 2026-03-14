# NikiBhavi Mobile — Setup Guide

## ✅ Prerequisites
- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (Xcode) OR Android Emulator (Android Studio)
- OR: **Expo Go** app on your physical phone (easiest!)

## 🚀 Run the App

```bash
# 1. Go to mobile folder (CRITICAL — not the project root)
cd ~/Documents/GitHub/NikiBhavi/mobile

# 2. Clean install (do this once, or when you get errors)
rm -rf node_modules package-lock.json .expo
npm install

# 3. Start
npx expo start --clear
```

Then press:
- `i` → iOS Simulator
- `a` → Android Emulator  
- Scan QR code → Expo Go on your phone

## 🔧 Common Fixes

| Error | Fix |
|---|---|
| `uv_cwd` terminal error | Open new terminal tab (Cmd+T), `cd mobile` again |
| Metro stuck / blank screen | `npx expo start --clear` (always use `--clear`) |
| `Cannot find module expo-router` | `npm install` from inside `mobile/` folder |
| Android emulator blank | Press `r` to reload in Metro |

## ✅ Crash Fixes Applied
- `newArchEnabled: false` — new arch + expo-router 3.x = crash
- `jsEngine: hermes` — better performance & stability
- `react-dom` removed — not needed in RN
- `@urql/core` removed — unused, causes build warnings
- `SafeAreaProvider` added to root layout
- `useSafeAreaInsets` added to all screens

