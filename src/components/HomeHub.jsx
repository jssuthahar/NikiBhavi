import { useState, useMemo, useEffect, useRef } from 'react'
import styles from './HomeHub.module.css'

// ── Master catalogue ─────────────────────────────────────────
const PAGES = [
  { id:'touristinfo', icon:'✈️', label:'Tourist Visa',        desc:'Visa-free for Indians until Dec 2026', cat:'Visa & Entry',   badge:'FREE 2026', tags:['tourist','visa','mdac','free','india','travel','30 days'] },
  { id:'epass',       icon:'💼', label:'Employee Pass',        desc:'EP guide, 2026 salary updates',        cat:'Visa & Entry',   badge:'⚠️ Jun 2026',tags:['ep','employee pass','work visa','salary','RM 5000','RM 10000','RM 20000'] },
  { id:'studentguide',icon:'🎓', label:'Student Pass',         desc:'Docs, EMGS process, tips & FAQ',       cat:'Visa & Entry',   tags:['student','study','emgs','university','college'] },
  { id:'dp',          icon:'🧳', label:'Dependent Pass',       desc:'Bring spouse & kids to Malaysia',      cat:'Visa & Entry',   badge:'NEW',        tags:['family','spouse','children','dependent pass','dp'] },
  { id:'prroad',      icon:'🛂', label:'PR Roadmap',           desc:'EP → Permanent Resident timeline',     cat:'Visa & Entry',   badge:'NEW',        tags:['pr','permanent resident','citizenship','rpt'] },
  { id:'visatrack',   icon:'📍', label:'Visa Tracker',         desc:'Check EP / visa application status',   cat:'Visa & Entry',   tags:['tracker','status','check','application'] },
  { id:'epelig',      icon:'🔍', label:'EP Eligibility',       desc:'Am I eligible for Employment Pass?',   cat:'Visa & Entry',   tags:['eligibility','ep check','qualify','salary check'] },

  { id:'housing',     icon:'🏠', label:'Housing Guide',        desc:'Best areas, apps, rental tips for KL', cat:'Life in Malaysia', tags:['house','rent','housing','area','kl','bangsar','cheras','petaling jaya'] },
  { id:'hospital',    icon:'💊', label:'Hospitals & Clinics',  desc:'Panel clinic, govt & specialist guide',cat:'Life in Malaysia', badge:'NEW', tags:['hospital','clinic','medical','doctor','health','pantai','columbia'] },
  { id:'bank',        icon:'🏦', label:'Banking Guide',        desc:'Open account — Maybank, CIMB, RHB',    cat:'Life in Malaysia', tags:['bank','account','maybank','cimb','rhb','open account'] },
  { id:'transport',   icon:'🚇', label:'Transport Guide',      desc:'MRT, LRT, Grab, bus, e-hailing',       cat:'Life in Malaysia', tags:['transport','mrt','lrt','grab','bus','train','rapido'] },
  { id:'food',        icon:'🍛', label:'Indian Food Guide',    desc:'Restaurants, groceries, Brickfields',  cat:'Life in Malaysia', tags:['food','indian','restaurant','grocery','brickfields','little india','banana leaf'] },
  { id:'sim',         icon:'📱', label:'SIM Card Guide',       desc:'Best postpaid plan — Maxis, Celcom',   cat:'Life in Malaysia', tags:['sim','phone','maxis','celcom','digi','yes','postpaid','plan'] },
  { id:'money',       icon:'💸', label:'Money Transfer',       desc:'Send RM to India — Wise, RemitBee',    cat:'Life in Malaysia', tags:['remittance','money','send','india','wise','remitbee','transfer'] },
  { id:'buycar',      icon:'🚗', label:'Buy a Car Guide',      desc:'New vs used, Perodua/Proton for EP',   cat:'Life in Malaysia', badge:'NEW', tags:['car','buy','perodua','proton','honda','myvi','bezza','car loan'] },
  { id:'moving',      icon:'📦', label:'Moving to Malaysia',   desc:'What to bring from India, checklist',  cat:'Life in Malaysia', badge:'NEW', tags:['moving','checklist','bring','india','packing','items'] },
  { id:'health',      icon:'🩺', label:'Health & Insurance',   desc:'Medical card, panel hospitals',        cat:'Life in Malaysia', tags:['health','insurance','medical card','aia','prudential','great eastern'] },

  { id:'pcb',         icon:'📊', label:'PCB Tax Calc',         desc:'Monthly tax deducted from your salary',cat:'Financial Tools',  badge:'NEW', tags:['pcb','tax','monthly','deduction','salary','lhdn'] },
  { id:'taxrefund',   icon:'💵', label:'Tax Refund Calc',      desc:'How much refund from LHDN?',           cat:'Financial Tools',  tags:['tax','refund','lhdn','ya','2025','2026','rebate'] },
  { id:'livingcost',  icon:'📈', label:'Living Cost Calc',     desc:'Monthly budget for KL life',           cat:'Financial Tools',  tags:['cost','budget','living','monthly','estimate'] },
  { id:'salary',      icon:'💰', label:'Salary Comparison',    desc:'India vs Malaysia — INR vs MYR',       cat:'Financial Tools',  tags:['salary','compare','india','myr','inr','take home'] },
  { id:'remittance',  icon:'🔄', label:'Remittance Calc',      desc:'Best MYR → INR rates today',          cat:'Financial Tools',  tags:['remittance','inr','myr','exchange rate','send money'] },
  { id:'carloan',     icon:'🚗', label:'Car Loan Calc',        desc:'Monthly payment & total interest',     cat:'Financial Tools',  badge:'NEW', tags:['car loan','monthly payment','interest','bank','hire purchase'] },
  { id:'epf',         icon:'🏦', label:'EPF Calculator',       desc:'Retirement savings & projection',      cat:'Financial Tools',  tags:['epf','kwsp','savings','retirement','dividend'] },
  { id:'epfout',      icon:'💰', label:'EPF Withdrawal',       desc:'Withdraw EPF when leaving Malaysia',   cat:'Financial Tools',  badge:'NEW', tags:['epf','withdraw','kwsp','india','akaun 1','akaun 2'] },
  { id:'expense',     icon:'🧾', label:'Expense Tracker',      desc:'Monthly budget planner in MYR + INR',  cat:'Financial Tools',  badge:'NEW', tags:['expense','budget','track','monthly','categories'] },
  { id:'homeloan',    icon:'🏡', label:'Home Loan Calc',       desc:'Loan amount & monthly EMI',            cat:'Financial Tools',  tags:['home loan','property','mortgage','emi','maybank','public bank'] },
  { id:'rent',        icon:'🏠', label:'Rent Affordability',   desc:'Can I afford this rent?',              cat:'Financial Tools',  tags:['rent','afford','budget','30 percent','salary'] },
  { id:'taxcalc',     icon:'🧾', label:'Tax Residency Calc',   desc:'Am I a tax resident in Malaysia?',     cat:'Financial Tools',  tags:['tax','residency','182 days','lhdn','resident'] },
  { id:'costcompare', icon:'⚖️', label:'Cost Compare',         desc:'KL vs Chennai vs Bangalore',           cat:'Financial Tools',  tags:['compare','cost','bangalore','chennai','mumbai','kl','city'] },

  { id:'jobsearch',   icon:'💼', label:'Job Search Tool',      desc:'Portals, EP 2026 salary, sectors, tips', cat:'Work & Career', badge:'🔥 HOT', tags:['job','search','linkedin','jobstreet','ep salary','portal','career'] },
  { id:'eplifeguide', icon:'🏡', label:'EP Life Guide',        desc:'17 topics — SIM to groceries to tax',  cat:'Work & Career',  badge:'🔥 HOT', tags:['ep','life','guide','housing','sim','bank','grocery','credit card'] },
  { id:'medcard',     icon:'🏥', label:'Medical Card Advisor', desc:'Best insurance plans by age & budget', cat:'Work & Career',  badge:'NEW', tags:['medical card','insurance','aia','prudential','great eastern','age'] },
  { id:'leave',       icon:'📅', label:'Leave Planner 2026',   desc:'Public holidays 2026 + long weekends',  cat:'Work & Career',  tags:['leave','holiday','2026','public holiday','long weekend','plan'] },
  { id:'probation',   icon:'📋', label:'Probation Calc',       desc:'Calculate your probation end date',    cat:'Work & Career',  tags:['probation','end date','3 months','6 months','confirmation'] },
  { id:'schoolfees',  icon:'🎓', label:'School Fees',          desc:'Tamil, national, international school', cat:'Work & Career', tags:['school','fees','children','tamil school','sjkt','international'] },

  { id:'flighthub',   icon:'✈️', label:'Flight Hub',           desc:'Baggage rules, cheap flights, lounge', cat:'Travel & Flights', badge:'NEW', tags:['flight','baggage','grinder','tv','laptop','cheap','lounge','airport','klia','airasia'] },
  { id:'tourist',     icon:'🗺️', label:'Tourist Hub',          desc:'Sightseeing, food, day trips from KL', cat:'Travel & Flights', tags:['tourist','visit','kl','places','budget','food','batu caves','genting','penang'] },

  { id:'videos',      icon:'▶️', label:'YouTube Videos',       desc:'Watch NikiBhavi guides on YouTube',   cat:'NikiBhavi',       tags:['youtube','video','watch','nikibhavi'] },
  { id:'about',       icon:'ℹ️', label:'About NikiBhavi',      desc:'Our story, contact, social links',    cat:'NikiBhavi',       tags:['about','contact','instagram','whatsapp','channel'] },
]

// ── Home sections (Grab-style) ────────────────────────────────
const SECTIONS = [
  {
    id: 'travel', label: '✈️ Travel & Flights',
    color: '#e53e3e', dark: false,
    items: ['flighthub','tourist'],
  },
  {
    id: 'finance', label: '💰 Financial Tools',
    color: '#d97706', dark: false,
    items: ['pcb','taxrefund','livingcost','salary','remittance','carloan','epf','epfout','expense','homeloan','rent'],
  },
  {
    id: 'work', label: '💼 Work & Career',
    color: '#7c3aed', dark: false,
    items: ['jobsearch','eplifeguide','medcard','leave','probation','schoolfees'],
  },
  {
    id: 'life', label: '🏙️ Life in Malaysia',
    color: '#10b981', dark: false,
    items: ['housing','hospital','bank','transport','food','sim','money','buycar','moving'],
  },
  {
    id: 'visa', label: '🛂 Visa & Entry',
    color: '#3b82f6', dark: false,
    items: ['touristinfo','epass','studentguide','dp','prroad','visatrack','epelig'],
  },
]

const PAGE_MAP = Object.fromEntries(PAGES.map(p => [p.id, p]))

export default function HomeHub({ onNavigate }) {
  const [q, setQ]           = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef            = useRef(null)

  const results = useMemo(() => {
    const raw = q.trim().toLowerCase()
    if (!raw) return []
    return PAGES.filter(p =>
      p.label.toLowerCase().includes(raw) ||
      p.desc.toLowerCase().includes(raw) ||
      p.cat.toLowerCase().includes(raw) ||
      p.tags.some(t => t.includes(raw))
    ).slice(0, 10)
  }, [q])

  const showDrop = focused && q.trim().length > 0

  // '/' to focus
  useEffect(() => {
    const fn = e => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault(); inputRef.current?.focus()
      }
      if (e.key === 'Escape') { setQ(''); inputRef.current?.blur() }
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  const go = (id) => { onNavigate(id); setQ(''); inputRef.current?.blur() }

  return (
    <div className={styles.hub}>

      {/* ── Breaking alert ── */}
      <button className={styles.alert} onClick={() => onNavigate('touristinfo')}>
        <span className={styles.alertBadge}>🎉 BREAKING</span>
        <span className={styles.alertText}>Indians VISA-FREE for Malaysia until Dec 31, 2026 — MDAC required</span>
        <span className={styles.alertArrow}>›</span>
      </button>

      {/* ── Hero + Search ── */}
      <div className={styles.hero}>
        <div className={styles.heroEmoji}>🇮🇳 ✈️ 🇲🇾</div>
        <h1 className={styles.heroTitle}>Your Malaysia Guide</h1>
        <p className={styles.heroSub}>Everything Indians need — visa, tax, housing, jobs, flights</p>

        <div className={styles.searchWrap}>
          <div className={`${styles.searchBox} ${focused ? styles.focused : ''}`}>
            <span className={styles.sIcon}>🔍</span>
            <input
              ref={inputRef}
              className={styles.sInput}
              placeholder='Search: "grinder flight", "EP salary", "tax refund"...'
              value={q}
              onChange={e => setQ(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 180)}
            />
            {q
              ? <button className={styles.sClear} onClick={() => setQ('')}>✕</button>
              : <kbd className={styles.sKbd}>/</kbd>
            }
          </div>

          {showDrop && (
            <div className={styles.drop}>
              {results.length === 0
                ? <div className={styles.dropEmpty}>No results for "{q}"</div>
                : results.map(p => (
                  <button key={p.id} className={styles.dropItem} onMouseDown={() => go(p.id)}>
                    <span className={styles.dIcon}>{p.icon}</span>
                    <div className={styles.dBody}>
                      <span className={styles.dLabel}>{p.label}</span>
                      <span className={styles.dDesc}>{p.desc}</span>
                    </div>
                    <span className={styles.dCat}>{p.cat}</span>
                  </button>
                ))
              }
            </div>
          )}
        </div>
      </div>

      {/* ── Quick chips ── */}
      <div className={styles.chips}>
        {[
          ['touristinfo','Tourist Visa 🎉'],
          ['epass','EP 2026 ⚠️'],
          ['flighthub','Flight Tips ✈️'],
          ['jobsearch','Job Search 💼'],
          ['taxrefund','Tax Refund 💵'],
          ['epfout','EPF Withdrawal 💰'],
        ].map(([id, label]) => (
          <button key={id} className={styles.chip} onClick={() => onNavigate(id)}>{label}</button>
        ))}
      </div>

      {/* ── Sections ── */}
      {SECTIONS.map(sec => (
        <section key={sec.id} className={styles.section}>
          <h2 className={styles.secTitle}>{sec.label}</h2>
          <div className={styles.grid}>
            {sec.items.map(id => {
              const p = PAGE_MAP[id]
              if (!p) return null
              return (
                <button
                  key={id}
                  className={styles.card}
                  style={{ '--accent': sec.color }}
                  onClick={() => onNavigate(id)}
                >
                  <div className={styles.cardTop}>
                    <span className={styles.cardIcon}>{p.icon}</span>
                    {p.badge && <span className={styles.cardBadge}>{p.badge}</span>}
                  </div>
                  <div className={styles.cardLabel}>{p.label}</div>
                  <div className={styles.cardDesc}>{p.desc}</div>
                </button>
              )
            })}
          </div>
        </section>
      ))}

      {/* ── EP 2026 alert box ── */}
      <div className={styles.epBox}>
        <div className={styles.epBoxTitle}>⚠️ EP Salary Update — 1 June 2026</div>
        <div className={styles.epBoxGrid}>
          {[['Category I','RM 20,000+'],['Category II','RM 10,000+'],['Category III','RM 5,000+'],['Mfg Sector','RM 7,000+']].map(([cat,sal]) => (
            <div key={cat} className={styles.epBoxItem}>
              <div className={styles.epBoxCat}>{cat}</div>
              <div className={styles.epBoxSal}>{sal}</div>
            </div>
          ))}
        </div>
        <button className={styles.epBoxBtn} onClick={() => onNavigate('jobsearch')}>See full EP 2026 details →</button>
      </div>

      {/* ── Footer ── */}
      <footer className={styles.footer}>
        <div className={styles.footerEmoji}>🇮🇳 ✈️ 🇲🇾</div>
        <div className={styles.footerName}>NikiBhavi</div>
        <p className={styles.footerSub}>Real experiences from Indians living in Malaysia</p>
        <div className={styles.footerLinks}>
          <a href="https://www.youtube.com/@NikiBhavi" target="_blank" rel="noreferrer">▶ YouTube</a>
          <a href="https://www.instagram.com/nikibhavi/" target="_blank" rel="noreferrer">📷 Instagram</a>
          <a href="https://whatsapp.com/channel/0029VaAyhBS6rsQuujk5G53h" target="_blank" rel="noreferrer">💬 WhatsApp</a>
          <a href="https://buymeacoffee.com/jssuthahar" target="_blank" rel="noreferrer">☕ Support</a>
        </div>
      </footer>
    </div>
  )
}
