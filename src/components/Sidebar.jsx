import { CHANNEL, NAV_GROUPS } from '../data/content'
import styles from './Sidebar.module.css'
export default function Sidebar({ activePage, onNavigate, isOpen }) {
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.profile}>
        <div className={styles.profileTop}>
          <div className={styles.avatar}>🇲🇾</div>
          <div>
            <div className={styles.chName}>{CHANNEL.name}</div>
            <div className={styles.chHandle}>Malaysia Guide for Indians</div>
          </div>
        </div>
        <div className={styles.stats}>
          {CHANNEL.stats.map(s => (
            <div key={s.l} className={styles.stat}>
              <div className={styles.statN}>{s.n}</div>
              <div className={styles.statL}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <nav className={styles.nav}>
        {NAV_GROUPS.map(group => (
          <div key={group.label} className={styles.group}>
            <div className={styles.groupLabel}>{group.label}</div>
            {group.items.map(item => (
              <button
                key={item.id}
                className={`${styles.navBtn} ${activePage===item.id ? styles.active : ''}`}
                onClick={() => onNavigate(item.id)}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span className={styles.navLabel}>{item.label}</span>
                {item.badge && <span className={styles.badge}>{item.badge}</span>}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className={styles.socials}>
        <div className={styles.socialsLabel}>Follow for updates</div>
        <a href={CHANNEL.ytUrl} target="_blank" rel="noreferrer" className={styles.socialBtn}>▶ YouTube</a>
        <a href={CHANNEL.igUrl} target="_blank" rel="noreferrer" className={styles.socialBtn}>📸 Instagram</a>
        <a href={CHANNEL.waUrl} target="_blank" rel="noreferrer" className={styles.socialBtn}>💬 WhatsApp</a>
      </div>
      <div className={styles.footer}>🇮🇳 ❤️ 🇲🇾 &nbsp;NikiBhavi — Honest info for Indians in Malaysia. Always free.</div>
    </aside>
  )
}
