# NikiBhavi — Malaysia Guide for Indians
### React + Vite Project

A full-featured content guide website for Indians moving to or visiting Malaysia.
Built with **React 18** + **Vite 5** using CSS Modules.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

App runs at → **http://localhost:5173**

---

## 📁 Project Structure

```
nikibhavi/
├── index.html
├── vite.config.js
├── package.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx              # Entry point
    ├── App.jsx               # Root - page routing & sidebar state
    ├── App.module.css
    ├── index.css             # Global tokens & base styles
    │
    ├── data/
    │   └── content.js        # ALL page content, nav data, videos
    │
    └── components/
        ├── Topbar.jsx/.css   # Fixed top navigation bar
        ├── Sidebar.jsx/.css  # Left sidebar with nav + channel profile
        ├── Ticker.jsx/.css   # Scrolling news ticker
        ├── Hero.jsx/.css     # Page hero banner (lime / dark / grad)
        ├── UI.jsx/.css       # Shared: InfoCard, StepItem, VideoRow,
        │                     #         TipBox, AdBanner, StatCard, etc.
        └── Pages.jsx/.css    # All 14 page components
```

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--lime` | `#C9F53B` | Primary accent |
| `--ink` | `#0d0d0d` | Topbar, hero dark |
| `--bg` | `#f6f7f9` | Page background |
| `--card` | `#ffffff` | Card background |
| `--border` | `#e8eaf0` | Card borders |

**Font:** Plus Jakarta Sans (Google Fonts)

---

## 📄 Pages (14 total)

| Page ID | Route | Content |
|---------|-------|---------|
| `home` | Default | Hero, stats, topic grid, videos |
| `visa` | Visa & Entry | 4 visa type cards |
| `epass` | Employee Pass | 5-step process, documents |
| `tourist` | Tourist Visa | eVisa process |
| `student` | Student Pass | Universities, fees |
| `housing` | Housing & Rent | KL areas, rental tips |
| `bank` | Bank Account | Best banks, documents |
| `transport` | Transport | MRT, Grab, Bus, Car |
| `food` | Food & Groceries | Indian food in KL |
| `health` | Health & Insurance | Hospitals, insurance |
| `sim` | SIM & Internet | Best SIM plans |
| `money` | Money & Remittance | Best transfer methods |
| `videos` | All Videos | Full video list |
| `about` | About Us | Channel info |

---

## 💰 Ad Slots

Ad banners are placed in-page using the `<AdBanner>` component.
Currently on: **Home**, **Employee Pass**, **Housing**, **Health**.

To add a real ad, update the `ad` object in `src/data/content.js`:

```js
ad: {
  icon: '✈️',
  title: 'Your Ad Title',
  desc: 'Your ad description here.',
  cta: 'Click Here →',
}
```

Sidebar also has a dedicated `Sponsored` slot in `Sidebar.jsx`.

---

## ✏️ Updating Content

All content lives in **`src/data/content.js`** — no need to touch components.

```js
// Update channel stats
export const CHANNEL = {
  ytUrl: 'https://youtube.com/@YourRealChannel',
  igUrl: 'https://instagram.com/YourRealHandle',
  stats: [{ n: '25K+', l: 'Subs' }, ...]
}

// Update videos
export const ALL_VIDEOS = [
  { icon: '📄', tag: 'Employee Pass', title: 'Real Video Title', meta: '👁 50K views · 20 min' },
  ...
]
```

---

## 🔧 Tech Stack

- **React 18** — UI framework
- **Vite 5** — Build tool & dev server
- **CSS Modules** — Scoped styling, zero runtime overhead
- **Plus Jakarta Sans** — Google Fonts
