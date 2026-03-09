# Required Assets for Play Store

Replace these placeholder files with your actual images:

## icon.png
- Size: 1024 × 1024 px
- Format: PNG with transparent background
- No rounded corners (Android/iOS apply corners automatically)
- Your NikiBhavi logo on white/dark background

## adaptive-icon.png  
- Size: 1024 × 1024 px
- Android adaptive icon foreground
- Keep important content in center 60% (safe zone)

## splash.png
- Size: 1284 × 2778 px (iPhone 14 Pro Max size works for all)
- Your logo centered, solid background
- backgroundColor in app.json should match

## For Play Store listing you also need:
- Feature graphic: 1024 × 500 px (shown at top of store listing)
- Screenshots: minimum 2, recommended 8
  - Phone: 16:9 or 9:16, min 320px on short side
- App icon: 512 × 512 px (same as icon.png, used in listing)

## Quick way to create assets:
Use Figma, Canva, or: npx expo-splash-screen
