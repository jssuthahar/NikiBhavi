import styles from './BottomNav.module.css'

const TABS = [
  { id:'home',      icon:'🏠', label:'Home' },
  { id:'touristinfo', icon:'✈️', label:'Visa' },
  { id:'jobsearch', icon:'💼', label:'Jobs' },
  { id:'flighthub', icon:'🛫', label:'Flights' },
  { id:'taxrefund', icon:'💵', label:'Tax' },
]

export default function BottomNav({ activePage, onNavigate }) {
  return (
    <nav className={styles.nav}>
      {TABS.map(tab => (
        <button
          key={tab.id}
          className={`${styles.tab} ${activePage === tab.id ? styles.active : ''}`}
          onClick={() => onNavigate(tab.id)}
        >
          <span className={styles.tabIcon}>{tab.icon}</span>
          <span className={styles.tabLabel}>{tab.label}</span>
          {activePage === tab.id && <span className={styles.dot} />}
        </button>
      ))}
    </nav>
  )
}
