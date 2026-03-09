<div align="center">

# 🇲🇾 NikiBhavi
### Malaysia Life Guide for Indians

**Free tools & guides for Indians living in or moving to Malaysia**

### 🌐 Web &nbsp;|&nbsp; 📱 Mobile &nbsp;|&nbsp; 🎥 YouTube &nbsp;|&nbsp; 📸 Instagram

[![Live Website](https://img.shields.io/badge/🌐_Website-nikibhavi.msdevbuild.com-00B14F?style=for-the-badge)](https://nikibhavi.msdevbuild.com)
[![GitHub Repo](https://img.shields.io/badge/GitHub-jssuthahar/NikiBhavi-181717?style=for-the-badge&logo=github)](https://github.com/jssuthahar/NikiBhavi)

[![YouTube](https://img.shields.io/badge/YouTube-@NikiBhavi-FF0000?style=for-the-badge&logo=youtube)](https://www.youtube.com/@NikiBhavi)
[![Instagram](https://img.shields.io/badge/Instagram-@nikibhavi-E4405F?style=for-the-badge&logo=instagram)](https://www.instagram.com/nikibhavi/)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Channel-25D366?style=for-the-badge&logo=whatsapp)](https://whatsapp.com/channel/0029VaAyhBS6rsQuujk5G53h)

[![Google Play](https://img.shields.io/badge/Google_Play-Coming_Soon-3DDC84?style=for-the-badge&logo=google-play)](https://github.com/jssuthahar/NikiBhavi)
[![App Store](https://img.shields.io/badge/App_Store-Coming_Soon-0D96F6?style=for-the-badge&logo=app-store)](https://github.com/jssuthahar/NikiBhavi)

![GitHub stars](https://img.shields.io/github/stars/jssuthahar/NikiBhavi?style=social)
![GitHub forks](https://img.shields.io/github/forks/jssuthahar/NikiBhavi?style=social)
![GitHub issues](https://img.shields.io/github/issues/jssuthahar/NikiBhavi)
![License](https://img.shields.io/badge/license-MIT-green)

</div>

---

> **NikiBhavi** is a free, open-source project by Indians living in Malaysia — built to give honest, accurate, up-to-date guidance on Employee Pass, Tourist Visa, Tax, EPF, Salary, Remittance, Housing, and everyday life in Malaysia. No paid promotions. No misinformation. Just real experience. 🙏

---

## 📱 Platforms

| Platform | Link | Stack | Status |
|---|---|---|---|
| 🌐 **Web** | [nikibhavi.msdevbuild.com](https://nikibhavi.msdevbuild.com) | React 18 + Vite 5 | ✅ Live |
| 📱 **Android** | [Google Play](https://github.com/jssuthahar/NikiBhavi) *(coming soon)* | React Native + Expo 52 | 🚧 In Development |
| 🍎 **iOS** | [App Store](https://github.com/jssuthahar/NikiBhavi) *(coming soon)* | React Native + Expo 52 | 🚧 In Development |
| 💻 **Source Code** | [github.com/jssuthahar/NikiBhavi](https://github.com/jssuthahar/NikiBhavi) | Open Source — MIT | ✅ Public |

---

## ✨ Features

### 🌐 Web App
- **25+ Guide Pages** — Employee Pass, Tourist Visa (Visa-Free 2026!), Housing, Banking, Transport, Food, Health, SIM Cards, Remittance, and more
- **14 Financial Tools** — PCB Tax, EPF, Tax Refund, Remittance, Salary Comparison, Car Loan, Home Loan, Rent Calculator, Budget Simulator, Leave Planner, and more
- **Live MYR/INR Exchange Rates** — Real-time rates from exchange API
- **EP 2026 Policy Updates** — Latest salary thresholds effective June 1, 2026
- **NikiBot** — Offline AI chatbot with Malaysia-specific knowledge base
- **SEO Optimised** — Structured data, Open Graph, Twitter Cards, multilingual hreflang

### 📱 Mobile App
- **25 Screens** — All guides and calculators from web, optimised for mobile
- **Grab-inspired Green Theme** — Clean, native UI using `#00B14F`
- **Offline Support** — All calculators work without internet
- **NikiBot Chat** — Fully offline chatbot built into the app
- **Tab Navigation** — Home, Tools, Guides, Visa/EP, NikiBot
- **iOS & Android** — Universal app via Expo

---

## 🗂️ Project Structure

```
NikiBhavi/
├── src/                        ← Web (React + Vite)
│   ├── components/             ← 48 React components
│   ├── data/                   ← Content, constants
│   └── main.jsx
├── mobile/                     ← React Native (Expo)
│   ├── app/                    ← Expo Router screens
│   │   ├── (tabs)/             ← 5 tab screens
│   │   ├── calculator/         ← 10 calculator screens
│   │   └── guide/              ← 7 guide screens
│   ├── shared/                 ← Shared calculator logic
│   └── src/theme/              ← Grab-style design tokens
├── .github/workflows/          ← CI/CD (Firebase + EAS)
└── firebase.json
```

---

## 🚀 Getting Started

### Web

```bash
# Clone the repo
git clone https://github.com/jssuthahar/NikiBhavi.git
cd NikiBhavi

# Install and run
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Mobile

```bash
# Navigate to mobile folder (important — must be mobile/, not root)
cd NikiBhavi/mobile

# Install dependencies
npm install

# Start Expo dev server
npx expo start --clear
```

> ⚠️ Always run mobile commands from `NikiBhavi/mobile/` — NOT from the project root.

---

## 🛠️ Tech Stack

### Web
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite 5 | Build tool |
| CSS Modules | Scoped styling |
| Plus Jakarta Sans | Typography |
| Firebase Hosting | Deployment |

### Mobile
| Technology | Purpose |
|---|---|
| React Native 0.76 | Mobile framework |
| Expo 52 | Build & tooling |
| Expo Router 3.5 | File-based navigation |
| @expo/vector-icons | Iconography |
| expo-haptics | Touch feedback |

---

## 🤝 Contributing

**This is an open-source community project — contributions are very welcome!**

If you find incorrect information, outdated policies, bugs, or want to add new features:

### 🐛 Found a bug or misleading info?

**Please [open an issue](https://github.com/jssuthahar/NikiBhavi/issues/new) and tell us:**
- What is wrong or misleading
- What the correct information should be
- A source/reference if possible (official government site, etc.)

> Accurate information matters — especially for visa and tax guidance. We take corrections seriously.

### 💡 Want to contribute?

1. **Fork** the repository
2. **Create** a branch: `git checkout -b fix/ep-salary-update`
3. **Make** your changes
4. **Test** locally (`npm run dev` for web, `npx expo start --clear` for mobile)
5. **Submit** a Pull Request with a clear description

### 📋 What we need help with

- [ ] Keeping EP/visa policy info up to date
- [ ] Adding more calculator tools
- [ ] Tamil language support
- [ ] Android testing & bug reports
- [ ] Improving NikiBot knowledge base
- [ ] Adding more city guides (Penang, JB, Cyberjaya)

### 📌 Issue Templates

When opening an issue, please use one of these labels:
- `bug` — Something is broken
- `misleading-info` — Information is incorrect or outdated
- `enhancement` — New feature or improvement
- `mobile` — Mobile app specific issue
- `web` — Web app specific issue

---

## 📜 License

MIT License — free to use, modify, and distribute with attribution.

---

## 🙏 Support the Project

If NikiBhavi helped you, consider supporting:

[![Buy Me a Coffee](https://img.shields.io/badge/Buy_Me_a_Coffee-jssuthahar-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/jssuthahar)

Or simply ⭐ star the repo — it helps others find this resource!

---

<div align="center">
  Made with ❤️ by Indians in Malaysia &nbsp;|&nbsp; For Indians in Malaysia
  <br/><br/>
  <a href="https://nikibhavi.msdevbuild.com">Website</a> · 
  <a href="https://github.com/jssuthahar/NikiBhavi">GitHub</a> · 
  <a href="https://www.youtube.com/@NikiBhavi">YouTube</a> · 
  <a href="https://www.instagram.com/nikibhavi/">Instagram</a> · 
  <a href="https://whatsapp.com/channel/0029VaAyhBS6rsQuujk5G53h">WhatsApp</a> · 
  <a href="https://github.com/jssuthahar/NikiBhavi/issues/new/choose">Report Issue / Contribute</a>
</div>
