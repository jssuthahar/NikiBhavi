import styles from './Hero.module.css'
import { CHANNEL } from '../data/content'
export default function Hero({ hero, onNavigate }) {
  const { variant = 'lime', emoji, badge, title, desc, actions } = hero
  return (
    <div className={`${styles.hero} ${styles[variant] || styles.lime}`}>
      {emoji && <div className={styles.watermark}>{emoji}</div>}
      <div className={styles.inner}>
        {badge && <div className={styles.badge}>✦ {badge}</div>}
        <h1 className={styles.title}>
          {title.split('\n').map((line, i, arr) => (
            <span key={i}>{line}{i < arr.length-1 && <br/>}</span>
          ))}
        </h1>
        <p className={styles.desc}>{desc}</p>
        {actions && (
          <div className={styles.actions}>
            {actions.map((a, i) =>
              a.href
                ? <a key={i} href={a.href} target="_blank" rel="noreferrer"
                    className={`${styles.actionBtn} ${i===0 ? styles.actionPrimary : styles.actionSecondary}`}>{a.label}</a>
                : <button key={i} onClick={() => onNavigate?.(a.page)}
                    className={`${styles.actionBtn} ${i===0 ? styles.actionPrimary : styles.actionSecondary}`}>{a.label}</button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
