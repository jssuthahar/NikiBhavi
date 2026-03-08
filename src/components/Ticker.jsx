import { TICKER_ITEMS } from '../data/content'
import styles from './Ticker.module.css'

export default function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <div className={styles.bar}>
      <div className={styles.inner}>
        {doubled.map((item, i) => (
          <span key={i} className={styles.item}>
            <span className={styles.dot} />
            <span className={styles.label}>{item.label}</span>
            {' '}{item.text}
          </span>
        ))}
      </div>
    </div>
  )
}
