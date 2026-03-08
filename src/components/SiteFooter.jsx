import styles from './SiteFooter.module.css'

const FOOTER_LINKS = [
  {
    title:'🛂 Visa & Entry',
    links:[
      { id:'touristinfo', label:'Tourist Visa 2026 🎉' },
      { id:'epass',       label:'Employee Pass' },
      { id:'studentguide',label:'Student Pass' },
      { id:'dp',          label:'Dependent Pass' },
      { id:'prroad',      label:'PR Roadmap' },
    ]
  },
  {
    title:'💰 Financial Tools',
    links:[
      { id:'pcb',         label:'PCB Tax Calculator' },
      { id:'taxrefund',   label:'Tax Refund Calc' },
      { id:'carloan',     label:'Car Loan Calc' },
      { id:'epf',         label:'EPF Calculator' },
      { id:'epfout',      label:'EPF Withdrawal' },
      { id:'livingcost',  label:'Living Cost Calc' },
    ]
  },
  {
    title:'🏙️ Life in KL',
    links:[
      { id:'housing',     label:'Housing Guide' },
      { id:'bank',        label:'Banking Guide' },
      { id:'hospital',    label:'Hospitals & Clinics' },
      { id:'transport',   label:'Transport Guide' },
      { id:'food',        label:'Indian Food Guide' },
      { id:'sim',         label:'SIM Card Guide' },
    ]
  },
  {
    title:'💼 Work & Travel',
    links:[
      { id:'jobsearch',   label:'Job Search Tool' },
      { id:'eplifeguide', label:'EP Life Guide' },
      { id:'flighthub',   label:'Flight Hub' },
      { id:'leave',       label:'Leave Planner 2026' },
      { id:'medcard',     label:'Medical Card' },
      { id:'moving',      label:'Moving Checklist' },
    ]
  },
]

export default function SiteFooter({ onNavigate }) {
  return (
    <footer className={styles.footer}>
      {/* Top: brand + social */}
      <div className={styles.top}>
        <div className={styles.brand}>
          <div className={styles.brandRow}>
            <span className={styles.brandFlag}>🇮🇳</span>
            <span className={styles.brandArrow}>✈️</span>
            <span className={styles.brandFlag}>🇲🇾</span>
          </div>
          <div className={styles.brandName}>NikiBhavi</div>
          <div className={styles.brandDesc}>
            Real guides for Indians living in &amp; moving to Malaysia. Visa, tax, jobs, housing, flights — all in one place.
          </div>
          <div className={styles.socials}>
            <a href="https://www.youtube.com/@NikiBhavi" target="_blank" rel="noreferrer" className={styles.social}>
              <span>▶</span> YouTube
            </a>
            <a href="https://www.instagram.com/nikibhavi/" target="_blank" rel="noreferrer" className={styles.social}>
              <span>📷</span> Instagram
            </a>
            <a href="https://whatsapp.com/channel/0029VaAyhBS6rsQuujk5G53h" target="_blank" rel="noreferrer" className={styles.social}>
              <span>💬</span> WhatsApp
            </a>
            <a href="https://buymeacoffee.com/jssuthahar" target="_blank" rel="noreferrer" className={`${styles.social} ${styles.coffee}`}>
              <span>☕</span> Support Us
            </a>
          </div>
        </div>

        {/* Link columns */}
        <div className={styles.cols}>
          {FOOTER_LINKS.map((col, i) => (
            <div key={i} className={styles.col}>
              <div className={styles.colTitle}>{col.title}</div>
              {col.links.map(link => (
                <button key={link.id} className={styles.link} onClick={() => onNavigate(link.id)}>
                  {link.label}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Breaking alert */}
      <div className={styles.alertBox} onClick={() => onNavigate('touristinfo')}>
        <span className={styles.alertTag}>🎉 LATEST</span>
        <span className={styles.alertText}>Indians VISA-FREE for Malaysia until Dec 31, 2026 — MDAC required. <u>Learn more →</u></span>
      </div>

      {/* EP 2026 */}
      <div className={styles.epRow}>
        <span className={styles.epLabel}>⚠️ EP Salary from June 2026:</span>
        {[['Cat I','RM 20K+'],['Cat II','RM 10K+'],['Cat III','RM 5K+'],['Mfg','RM 7K+']].map(([c,s]) => (
          <span key={c} className={styles.epChip}><strong>{c}</strong> {s}</span>
        ))}
        <button className={styles.epMore} onClick={() => onNavigate('jobsearch')}>Details →</button>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <div className={styles.copyright}>
          © {new Date().getFullYear()} NikiBhavi · For educational purposes only · Not legal advice
        </div>
        <div className={styles.bottomLinks}>
          <button onClick={() => onNavigate('about')}>About</button>
          <button onClick={() => onNavigate('terms')}>Terms</button>
          <button onClick={() => onNavigate('privacy')}>Privacy Policy</button>
          <button onClick={() => onNavigate('videos')}>Videos</button>
          <button onClick={() => onNavigate('home')}>Back to Top ↑</button>
        </div>
      </div>
    </footer>
  )
}
