import { useState } from 'react'
import styles from './DependentPass.module.css'
import PrivacyNotice from './PrivacyNotice'

const SECTIONS = [
  { id:'what', label:'📋 What is DP?', title:'Dependent Pass — What Is It?', content:[
    {t:'Definition',d:'Dependent Pass (DP) allows your spouse and children (under 18) to live in Malaysia while you hold an Employee Pass (EP), Resident Pass-Talent, or other long-term pass. DP is tied to your EP — if EP expires, DP expires.'},
    {t:'Who qualifies for DP?',d:'Spouse (husband or wife) of EP holder. Children under 18 (biological or legally adopted). Children between 18–23 in full-time education may qualify with additional documentation.'},
    {t:'DP vs Long-Term Visit Pass (LTVP)',d:'DP is for immediate family (spouse + children). LTVP is for parents, in-laws, or other dependents. Both allow long-term stay. Neither gives automatic work rights.'},
    {t:'Can spouse work on DP?',d:'Not automatically. Spouse on DP must apply separately for an Employment Pass or a DP with work endorsement. If salary > RM 15,000/mo (EP holder), spouse may get DP with Employment endorsement allowing work.'},
  ]},
  { id:'apply', label:'📝 How to Apply', title:'How to Apply for Dependent Pass', steps:[
    {s:'1',t:'EP holder applies on behalf of family',d:'DP application is made by the EP holder (not the spouse/child). Your employer\'s HR or immigration agent usually handles this.'},
    {s:'2',t:'Gather documents',d:'Full list below — start collecting before the EP is even approved. Some docs like apostille take 2–4 weeks.'},
    {s:'3',t:'Submit via ESD or agent',d:'Submit through Expatriate Services Division (ESD) online portal or via your company\'s immigration agent. Most companies provide this service free.'},
    {s:'4',t:'Biometric at Immigration',d:'Spouse and children above 12 must visit Malaysia Immigration for biometric (fingerprint + photo) after DP is approved.'},
    {s:'5',t:'Collect DP sticker',d:'DP is a visa sticker in the passport. Collect at Immigration department. Children below 12: DP is an entry stamp, not full sticker.'},
    {s:'6',t:'DP renewal',d:'DP must be renewed when EP is renewed. Usually done together. Same documents needed minus apostille if same marriage.'},
  ]},
  { id:'docs', label:'📄 Documents', title:'Documents Checklist for Dependent Pass', groups:[
    { cat:'For Spouse (Wife/Husband)', items:[
      'Passport (valid 18+ months) — original + 2 copies of all pages',
      'Marriage certificate (original) — must be apostilled from India',
      'Spouse\'s passport size photos (6 pieces, white background)',
      'EP holder\'s passport copy',
      'EP holder\'s employment letter (from current employer)',
      'EP holder\'s last 3 months payslips',
      'Completed DP application form (filled by EP holder)',
    ]},
    { cat:'For Children (under 18)', items:[
      'Child\'s passport (valid 18+ months)',
      'Birth certificate — apostilled from India',
      'School enrollment letter (if school-age)',
      "EP holder's marriage certificate (same apostilled copy)",
      'Child passport photos (6 pieces)',
    ]},
    { cat:'Apostille — Critical Step', items:[
      '⚠️ Marriage certificate MUST be apostilled in India before coming to Malaysia',
      'Apostille: get from Ministry of External Affairs (MEA), India',
      'Online: apostille.gov.in — apply for apostille service',
      'Takes 1–2 weeks normally, 3 days express service available',
      'Apostilled in Tamil? Get English translation certified by notary',
      'Cost: RM 150–500 for the process in India',
    ]},
  ]},
  { id:'costs', label:'💰 Costs & Timeline', title:'Dependent Pass Costs & Timeline', items:[
    {t:'Application fee',d:'RM 90 per dependent (government fee). Payable at Immigration.'},
    {t:'Immigration agent fee',d:'RM 300–800 per dependent if done via agent. Company usually covers this.'},
    {t:'Apostille cost (in India)',d:'₹ 500–2,000 per document. Plus MEA processing.'},
    {t:'Processing time',d:'2–8 weeks from submission. Faster if done via ESD online portal. Delays happen — submit early.'},
    {t:'Validity',d:'Same as EP validity. If EP is 2 years, DP is 2 years.'},
    {t:'Bring family when?',d:'Apply DP as soon as EP is confirmed. Approval usually comes in 4–8 weeks. Family can come on tourist visa while DP is being processed, then convert.'},
  ]},
  { id:'tips', label:'💡 Tips', title:'Tips for Bringing Family to Malaysia', tips:[
    '📋 Start apostille of marriage certificate BEFORE arriving in Malaysia — it takes 2–4 weeks',
    '👶 Children can come on tourist visa first, convert to DP after it\'s approved — saves waiting in India',
    '🏥 Once DP is approved, children can attend local school — enroll immediately',
    '💼 Spouse wanting to work: EP holder must earn RM 15,000+ AND sponsor spouse\'s work endorsement on DP',
    '🏠 Look for 3BR apartments in areas with Tamil schools — Cheras, Ampang, Sri Petaling ideal for families',
    '🎓 International school applications: apply 6 months in advance — waitlists are long',
    '🇮🇳 Spouse\'s NRI status: after 182+ days outside India, advise them to update bank accounts to NRO',
    '📱 Both EP holder and spouse should have Malaysian SIM and bank account for daily life',
    '🔄 If DP is rejected: reapply with additional documents. Common reason: missing apostille or unclear relationship proof.',
    '⚠️ DP holders cannot vote, own land, or access Bumiputera benefits — purely residential pass',
  ]},
]

export default function DependentPass() {
  const [active, setActive] = useState('what')
  const sec = SECTIONS.find(s=>s.id===active)

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.emoji}>🧳</span>
        <div>
          <h1 className={styles.title}>Bringing Family to Malaysia</h1>
          <p className={styles.sub}>Dependent Pass — spouse & children complete guide 2026</p>
        </div>
      </div>
      <PrivacyNotice />
      <div className={styles.tabs}>
        {SECTIONS.map(s => <button key={s.id} className={`${styles.tab} ${active===s.id?styles.tabActive:''}`} onClick={()=>setActive(s.id)}>{s.label}</button>)}
      </div>
      <div className={styles.content} key={active}>
        <h2 className={styles.contentTitle}>{sec.title}</h2>
        {sec.content && sec.content.map((item,i) => (
          <div key={i} className={styles.item}>
            <div className={styles.itemT}>{item.t}</div>
            <div className={styles.itemD}>{item.d}</div>
          </div>
        ))}
        {sec.steps && sec.steps.map((s,i) => (
          <div key={i} className={styles.step}>
            <div className={styles.stepN}>{s.s}</div>
            <div><strong>{s.t}</strong><p>{s.d}</p></div>
          </div>
        ))}
        {sec.groups && sec.groups.map((g,i) => (
          <div key={i} className={styles.group}>
            <div className={styles.groupTitle}>{g.cat}</div>
            {g.items.map((item,j) => <div key={j} className={styles.docItem}>📄 {item}</div>)}
          </div>
        ))}
        {sec.items && sec.items.map((item,i) => (
          <div key={i} className={styles.item}>
            <div className={styles.itemT}>💡 {item.t}</div>
            <div className={styles.itemD}>{item.d}</div>
          </div>
        ))}
        {sec.tips && <div className={styles.tipsList}>{sec.tips.map((t,i) => <div key={i} className={styles.tip}>{t}</div>)}</div>}
      </div>
    </div>
  )
}
