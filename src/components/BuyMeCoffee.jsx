import styles from './BuyMeCoffee.module.css'

export default function BuyMeCoffee() {
  return (
    <>
      {/* Floating button */}
      <a
        href="https://buymeacoffee.com/jssuthahar"
        target="_blank"
        rel="noreferrer"
        className={styles.fab}
        title="Buy me a coffee ☕"
      >
        <span className={styles.fabIcon}>☕</span>
        <span className={styles.fabLabel}>Support Us</span>
      </a>
    </>
  )
}

// Inline card version (used inside pages)
export function BuyMeCoffeeCard() {
  return (
    <a
      href="https://buymeacoffee.com/jssuthahar"
      target="_blank"
      rel="noreferrer"
      className={styles.card}
    >
      <div className={styles.cardLeft}>
        <span className={styles.cardCoffee}>☕</span>
        <div>
          <div className={styles.cardTitle}>Enjoying NikiBhavi?</div>
          <div className={styles.cardSub}>If our guides helped you — buy us a coffee! It keeps the channel going 🙏</div>
        </div>
      </div>
      <div className={styles.cardBtn}>Buy Me a Coffee</div>
    </a>
  )
}
