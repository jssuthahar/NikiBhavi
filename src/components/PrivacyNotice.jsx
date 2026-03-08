import styles from './PrivacyNotice.module.css'

export default function PrivacyNotice() {
  return (
    <div className={styles.notice}>
      <span className={styles.icon}>🔒</span>
      <div className={styles.content}>
        <strong>Your Privacy is 100% Protected</strong>
        <p>
          We do <strong>not store, collect, or transmit</strong> any data you enter here —
          your salary, tax details, family information, or any other inputs <strong>never leave your device</strong>.
          Everything is calculated <strong>locally in your browser only</strong>.
          The moment you close or refresh this window, <strong>all data is automatically cleared</strong> — nothing is saved anywhere.
        </p>
      </div>
    </div>
  )
}
