import { useState } from 'react'
import { CHANNEL } from '../data/content'
import styles from './FollowBanner.module.css'

const PLATFORMS = [
  {
    id: 'youtube',
    icon: '▶',
    label: 'Subscribe on YouTube',
    sub: '@NikiBhavi',
    url: CHANNEL.ytUrl,
    color: '#FF0000',
    bg: '#fff5f5',
    border: '#fca5a5',
    action: 'Subscribe',
  },
  {
    id: 'instagram',
    icon: '📸',
    label: 'Follow on Instagram',
    sub: '@nikibhavi',
    url: CHANNEL.igUrl,
    color: '#E1306C',
    bg: '#fff0f6',
    border: '#f9a8d4',
    action: 'Follow',
  },
  {
    id: 'whatsapp',
    icon: '💬',
    label: 'Join WhatsApp Channel',
    sub: 'NikiBhavi Updates',
    url: CHANNEL.waUrl,
    color: '#25D366',
    bg: '#f0fdf4',
    border: '#86efac',
    action: 'Join',
  },
]

// ── Inline full banner (used at bottom of pages) ──────────────
export function FollowBanner() {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerTop}>
        <div className={styles.heart}>❤️</div>
        <div>
          <h3 className={styles.bannerTitle}>If this helped you — show some love!</h3>
          <p className={styles.bannerSub}>Follow NikiBhavi for free guides on Malaysia life, visa, jobs & savings. 100% free, no spam.</p>
        </div>
      </div>
      <div className={styles.platforms}>
        {PLATFORMS.map(p => (
          <a
            key={p.id}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            className={styles.platform}
            style={{ '--bg': p.bg, '--border': p.border, '--color': p.color }}
          >
            <span className={styles.platformIcon} style={{ color: p.color }}>{p.icon}</span>
            <div className={styles.platformText}>
              <span className={styles.platformLabel}>{p.label}</span>
              <span className={styles.platformSub}>{p.sub}</span>
            </div>
            <span className={styles.platformAction} style={{ background: p.color }}>{p.action}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

// ── Compact pill row (used in sidebar) ───────────────────────
export function FollowPills() {
  return (
    <div className={styles.pillsWrap}>
      <div className={styles.pillsLabel}>🙏 Help us grow</div>
      <div className={styles.pills}>
        <a href={CHANNEL.ytUrl}  target="_blank" rel="noreferrer" className={styles.pill} style={{'--c':'#FF0000'}}>▶ YouTube</a>
        <a href={CHANNEL.igUrl}  target="_blank" rel="noreferrer" className={styles.pill} style={{'--c':'#E1306C'}}>📸 Instagram</a>
        <a href={CHANNEL.waUrl}  target="_blank" rel="noreferrer" className={styles.pill} style={{'--c':'#25D366'}}>💬 WhatsApp</a>
      </div>
    </div>
  )
}

// ── Floating toast (shown once after 30s on any page) ─────────
export function FollowToast() {
  const [visible, setVisible] = useState(true)
  if (!visible) return null
  return (
    <div className={styles.toast}>
      <button className={styles.toastClose} onClick={() => setVisible(false)}>✕</button>
      <div className={styles.toastEmoji}>🙏</div>
      <div className={styles.toastText}>
        <strong>Enjoying NikiBhavi?</strong>
        <span>Follow us to stay updated with free Malaysia guides!</span>
      </div>
      <div className={styles.toastBtns}>
        <a href={CHANNEL.ytUrl} target="_blank" rel="noreferrer" className={styles.toastBtn} style={{'--c':'#FF0000'}}>▶ YouTube</a>
        <a href={CHANNEL.igUrl} target="_blank" rel="noreferrer" className={styles.toastBtn} style={{'--c':'#E1306C'}}>📸 IG</a>
        <a href={CHANNEL.waUrl} target="_blank" rel="noreferrer" className={styles.toastBtn} style={{'--c':'#25D366'}}>💬 WA</a>
      </div>
    </div>
  )
}

export default FollowBanner
