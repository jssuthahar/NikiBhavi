import { CHANNEL } from '../data/content'
import styles from './Topbar.module.css'
export default function Topbar({ onMenuClick }) {
  return (
    <header className={styles.topbar}>
      <button className={styles.hamburger} onClick={onMenuClick} aria-label="Menu">
        <span/><span/><span/>
      </button>
      <div className={styles.brand}>
        <div className={styles.brandLogo}>🇲🇾</div>
        <div>
          <div className={styles.brandName}>{CHANNEL.name}</div>
          <div className={styles.brandTag}>Malaysia Life Guide for Indians</div>
        </div>
      </div>
      <div className={styles.actions}>
        <a href={CHANNEL.ytUrl} target="_blank" rel="noreferrer" className={`${styles.btn} ${styles.yt}`}>▶ YouTube</a>
        <a href={CHANNEL.igUrl} target="_blank" rel="noreferrer" className={`${styles.btn} ${styles.ig}`}>📸 Instagram</a>
        <a href={CHANNEL.waUrl} target="_blank" rel="noreferrer" className={`${styles.btn} ${styles.wa}`}>💬 WhatsApp</a>
      </div>
    </header>
  )
}
