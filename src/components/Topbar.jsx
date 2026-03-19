import { useState, useRef, useEffect } from 'react'
import styles from './Topbar.module.css'

const ALL_PAGES = [
  { id:'touristinfo', icon:'✈️', label:'Tourist Visa 2026',        cat:'Visa & Entry',    badge:'FREE' },
  { id:'epass',       icon:'💼', label:'Employee Pass Guide',       cat:'Visa & Entry',    badge:'2026' },
  { id:'studentguide',icon:'🎓', label:'Student Pass Guide',        cat:'Visa & Entry' },
  { id:'dp',          icon:'🧳', label:'Dependent Pass',            cat:'Visa & Entry' },
  { id:'prroad',      icon:'🛂', label:'PR Roadmap',                cat:'Visa & Entry' },
  { id:'visatrack',   icon:'📍', label:'Visa Status Tracker',       cat:'Visa & Entry' },
  { id:'epelig',      icon:'🔍', label:'EP Eligibility Check',      cat:'Visa & Entry' },
  { id:'housing',     icon:'🏠', label:'Housing & Rent',            cat:'Life in Malaysia' },
  { id:'hospital',    icon:'💊', label:'Hospitals & Clinics',       cat:'Life in Malaysia' },
  { id:'bank',        icon:'🏦', label:'Banking Guide',             cat:'Life in Malaysia' },
  { id:'transport',   icon:'🚇', label:'Transport Guide',           cat:'Life in Malaysia' },
  { id:'food',        icon:'🍛', label:'Indian Food Guide',         cat:'Life in Malaysia' },
  { id:'sim',         icon:'📱', label:'SIM Card Guide',            cat:'Life in Malaysia' },
  { id:'money',       icon:'💸', label:'Money Transfer',            cat:'Life in Malaysia' },
  { id:'buycar',        icon:'🚗', label:'Buy a Car',                  cat:'Life in Malaysia' },
  { id:'drivinglicence',icon:'🪪', label:'Driving Licence Renewal',   cat:'Life in Malaysia', badge:'NEW' },
  { id:'moving',        icon:'📦', label:'Moving to Malaysia',         cat:'Life in Malaysia' },
  { id:'pcb',         icon:'📊', label:'PCB Tax Calculator',        cat:'Financial Tools',  badge:'NEW' },
  { id:'taxrefund',   icon:'💵', label:'Tax Refund Calculator',     cat:'Financial Tools' },
  { id:'livingcost',  icon:'📈', label:'Living Cost Calculator',    cat:'Financial Tools' },
  { id:'salary',      icon:'💰', label:'Salary Comparison',         cat:'Financial Tools' },
  { id:'remittance',  icon:'🔄', label:'Remittance Calculator',     cat:'Financial Tools' },
  { id:'carloan',     icon:'🚗', label:'Car Loan Calculator',       cat:'Financial Tools',  badge:'NEW' },
  { id:'epf',         icon:'🏦', label:'EPF Calculator',            cat:'Financial Tools' },
  { id:'epfout',      icon:'💰', label:'EPF Withdrawal Guide',      cat:'Financial Tools',  badge:'NEW' },
  { id:'expense',     icon:'🧾', label:'Expense Tracker',           cat:'Financial Tools',  badge:'NEW' },
  { id:'budget',      icon:'🎯', label:'Budget Simulator',          cat:'Financial Tools',  badge:'NEW' },
  { id:'homeloan',    icon:'🏡', label:'Home Loan Calculator',      cat:'Financial Tools' },
  { id:'jobsearch',   icon:'💼', label:'Job Search Tool',           cat:'Work & Career',    badge:'🔥' },
  { id:'eplifeguide', icon:'🏡', label:'EP Life Guide',             cat:'Work & Career',    badge:'🔥' },
  { id:'medcard',     icon:'🏥', label:'Medical Card Advisor',      cat:'Work & Career' },
  { id:'leave',       icon:'📅', label:'Leave Planner 2026',        cat:'Work & Career' },
  { id:'probation',   icon:'📋', label:'Probation Calculator',      cat:'Work & Career' },
  { id:'schoolfees',  icon:'🎓', label:'School Fees',               cat:'Work & Career' },
  { id:'flighthub',   icon:'✈️', label:'Flight Travel Hub',         cat:'Travel & Flights', badge:'NEW' },
  { id:'tourist',     icon:'🗺️', label:'Tourist Hub',               cat:'Travel & Flights' },
  { id:'videos',      icon:'▶️', label:'YouTube Videos',            cat:'NikiBhavi' },
  { id:'about',       icon:'ℹ️', label:'About NikiBhavi',           cat:'NikiBhavi' },
]

const NAV_MENUS = [
  { label:'Visa & Entry',      emoji:'🛂', items: ALL_PAGES.filter(p => p.cat==='Visa & Entry') },
  { label:'Life in Malaysia',  emoji:'🏙️', items: ALL_PAGES.filter(p => p.cat==='Life in Malaysia') },
  { label:'Financial Tools',   emoji:'💰', items: ALL_PAGES.filter(p => p.cat==='Financial Tools') },
  { label:'Work & Career',     emoji:'💼', items: ALL_PAGES.filter(p => p.cat==='Work & Career') },
  { label:'Travel & Flights',  emoji:'✈️', items: ALL_PAGES.filter(p => p.cat==='Travel & Flights') },
]

export default function Topbar({ onMenuClick, onNavigate, activePage, onChatOpen }) {
  const [openMenu,    setOpenMenu]    = useState(null)
  const [searchOpen,  setSearchOpen]  = useState(false)
  const [q,           setQ]           = useState('')
  const inputRef = useRef(null)

  const results = q.trim()
    ? ALL_PAGES.filter(p =>
        p.label.toLowerCase().includes(q.toLowerCase()) ||
        p.cat.toLowerCase().includes(q.toLowerCase())
      ).slice(0, 9)
    : ALL_PAGES.slice(0, 9)

  useEffect(() => {
    const fn = e => {
      if (e.key === '/' && !searchOpen && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault(); setSearchOpen(true)
      }
      if (e.key === 'Escape') { setSearchOpen(false); setQ(''); setOpenMenu(null) }
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [searchOpen])

  useEffect(() => {
    if (searchOpen) setTimeout(() => inputRef.current?.focus(), 80)
  }, [searchOpen])

  const go = (id) => { onNavigate(id); setSearchOpen(false); setQ(''); setOpenMenu(null) }

  return (
    <>
      <header className={styles.bar}>
        {/* Hamburger — mobile */}
        <button className={styles.burger} onClick={onMenuClick} aria-label="Menu">
          <span/><span/><span/>
        </button>

        {/* Brand — visible on ALL screen sizes */}
        <button className={styles.brand} onClick={() => go('home')}>
          <span className={styles.brandFlag}>🇲🇾</span>
          <div>
            <div className={styles.brandName}>NikiBhavi</div>
            <div className={styles.brandSub}>Malaysia Guide</div>
          </div>
        </button>

        {/* Desktop nav with dropdowns */}
        <nav className={styles.desktopNav}>
          <button
            className={`${styles.navItem} ${activePage==='home' ? styles.navActive : ''}`}
            onClick={() => go('home')}
          >Home</button>

          {NAV_MENUS.map((menu, i) => (
            <div
              key={i}
              className={styles.navDropWrap}
              onMouseEnter={() => setOpenMenu(i)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button className={`${styles.navItem} ${openMenu===i ? styles.navHover : ''}`}>
                {menu.label} <span className={styles.chevron}>{openMenu===i ? '▲' : '▼'}</span>
              </button>
              {openMenu === i && (
                <div className={styles.dropdown}>
                  <div className={styles.dropHeader}>{menu.emoji} {menu.label}</div>
                  {menu.items.map(p => (
                    <button key={p.id} className={styles.dropItem} onClick={() => go(p.id)}>
                      <span className={styles.dIcon}>{p.icon}</span>
                      <span className={styles.dLabel}>{p.label}</span>
                      {p.badge && <span className={styles.dBadge}>{p.badge}</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right side buttons */}
        <div className={styles.rightSide}>
          {/* Search — desktop pill, mobile icon */}
          <button className={styles.searchBtn} onClick={() => setSearchOpen(true)}>
            <span>🔍</span>
            <span className={styles.searchBtnText}>Search...</span>
            <kbd className={styles.kbd}>/</kbd>
          </button>
          <button className={styles.searchBtnMobile} onClick={() => setSearchOpen(true)}>🔍</button>

          {/* Chat button */}
          <button className={styles.chatBtn} onClick={onChatOpen}>
            <span>🤖</span><span>Ask NikiBot</span>
          </button>
          <button className={styles.chatBtnMobile} onClick={onChatOpen}>🤖</button>
        </div>
      </header>

      {/* Search modal */}
      {searchOpen && (
        <div className={styles.overlay} onClick={() => { setSearchOpen(false); setQ('') }}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalTop}>
              <span>🔍</span>
              <input
                ref={inputRef}
                className={styles.modalInput}
                placeholder="Search: visa, EP salary, grinder flight, tax refund..."
                value={q}
                onChange={e => setQ(e.target.value)}
              />
              <button className={styles.modalClose} onClick={() => { setSearchOpen(false); setQ('') }}>✕</button>
            </div>
            {!q.trim() && <div className={styles.modalHint}>Popular pages</div>}
            <div className={styles.modalList}>
              {results.length === 0
                ? <div className={styles.empty}>No results for "{q}"</div>
                : results.map(p => (
                  <button key={p.id} className={styles.modalItem} onClick={() => go(p.id)}>
                    <span className={styles.mIcon}>{p.icon}</span>
                    <div className={styles.mBody}>
                      <span className={styles.mLabel}>{p.label}</span>
                      <span className={styles.mCat}>{p.cat}</span>
                    </div>
                    {p.badge && <span className={styles.mBadge}>{p.badge}</span>}
                    <span className={styles.mArrow}>›</span>
                  </button>
                ))
              }
            </div>
          </div>
        </div>
      )}
    </>
  )
}
