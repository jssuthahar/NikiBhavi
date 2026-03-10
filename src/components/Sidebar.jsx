import styles from './Sidebar.module.css'

const NAV = [
  { id:'home', icon:'🏠', label:'Home' },

  { type:'group', label:'Travel & Flights' },
  { id:'flighthub',   icon:'✈️', label:'Flight Hub',         badge:'NEW' },
  { id:'tourist',     icon:'🗺️', label:'Tourist Hub' },

  { type:'group', label:'Financial Tools' },
  { id:'pcb',         icon:'📊', label:'PCB Tax Calc',       badge:'NEW' },
  { id:'taxrefund',   icon:'💵', label:'Tax Refund' },
  { id:'livingcost',  icon:'📈', label:'Living Cost' },
  { id:'salary',      icon:'💰', label:'Salary Compare' },
  { id:'remittance',  icon:'🔄', label:'Remittance Calc' },
  { id:'carloan',     icon:'🚗', label:'Car Loan Calc',      badge:'NEW' },
  { id:'epf',         icon:'🏦', label:'EPF Calculator' },
  { id:'epfout',      icon:'💰', label:'EPF Withdrawal',     badge:'NEW' },
  { id:'expense',     icon:'🧾', label:'Expense Tracker',    badge:'NEW' },
  { id:'homeloan',    icon:'🏡', label:'Home Loan' },
  { id:'rent',        icon:'🏠', label:'Rent Affordability' },
  { id:'costcompare', icon:'⚖️', label:'Cost Compare' },
  { id:'budget',      icon:'🎯', label:'Budget Simulator',   badge:'NEW' },

  { type:'group', label:'Work & Career' },
  { id:'jobsearch',   icon:'💼', label:'Job Search',         badge:'🔥' },
  { id:'eplifeguide', icon:'🏡', label:'EP Life Guide',      badge:'🔥' },
  { id:'medcard',     icon:'🏥', label:'Medical Card' },
  { id:'leave',       icon:'📅', label:'Leave Planner 2026' },
  { id:'probation',   icon:'📋', label:'Probation Calc' },
  { id:'schoolfees',  icon:'🎓', label:'School Fees' },

  { type:'group', label:'Life in Malaysia' },
  { id:'housing',     icon:'🏠', label:'Housing' },
  { id:'hospital',    icon:'💊', label:'Hospitals' },
  { id:'bank',        icon:'🏦', label:'Banking' },
  { id:'transport',   icon:'🚇', label:'Transport' },
  { id:'food',        icon:'🍛', label:'Indian Food' },
  { id:'sim',         icon:'📱', label:'SIM Card' },
  { id:'money',       icon:'💸', label:'Money Transfer' },
  { id:'buycar',      icon:'🚗', label:'Buy a Car' },
  { id:'moving',      icon:'📦', label:'Moving Here' },

  { type:'group', label:'Visa & Entry' },
  { id:'touristinfo', icon:'✈️', label:'Tourist Visa',      badge:'FREE 2026' },
  { id:'epass',       icon:'💼', label:'Employee Pass',      badge:'⚠️ 2026' },
  { id:'studentguide',icon:'🎓', label:'Student Pass' },
  { id:'dp',          icon:'🧳', label:'Dependent Pass' },
  { id:'prroad',      icon:'🛂', label:'PR Roadmap' },
  { id:'visatrack',   icon:'📍', label:'Visa Tracker' },
  { id:'epelig',      icon:'🔍', label:'EP Eligibility' },

  { type:'group', label:'NikiBhavi' },
  { id:'videos',      icon:'▶️', label:'Videos' },
  { id:'about',       icon:'ℹ️', label:'About' },
]

export default function Sidebar({ activePage, onNavigate, isOpen }) {
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.topStrip} />
      <div className={styles.logoRow} onClick={() => onNavigate('home')}>
        <span className={styles.logoEmoji}>🇲🇾</span>
        <div>
          <div className={styles.logoName}>NikiBhavi</div>
          <div className={styles.logoSub}>Indians in Malaysia</div>
        </div>
      </div>
      <nav className={styles.nav}>
        {NAV.map((n, i) => {
          if (n.type === 'group') return (
            <div key={i} className={styles.group}>{n.label}</div>
          )
          return (
            <button
              key={n.id}
              className={`${styles.item} ${activePage === n.id ? styles.active : ''}`}
              onClick={() => onNavigate(n.id)}
            >
              <span className={styles.itemIcon}>{n.icon}</span>
              <span className={styles.itemLabel}>{n.label}</span>
              {n.badge && (
                <span className={`${styles.badge} ${activePage === n.id ? styles.badgeActive : ''}`}>
                  {n.badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
