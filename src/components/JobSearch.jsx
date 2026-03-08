import { useState, useMemo } from 'react'
import styles from './JobSearch.module.css'
import PrivacyNotice from './PrivacyNotice'

const PORTALS = [
  { name:'LinkedIn Malaysia', url:'https://linkedin.com/jobs', icon:'💼', best:'Tech, Finance, MNCs', indianFriendly:5, tips:'Best for EP-eligible roles. Filter: "Kuala Lumpur" + "Sponsorship". Message hiring managers directly after applying.' },
  { name:'JobStreet Malaysia', url:'https://www.jobstreet.com.my', icon:'🔍', best:'All industries, Local companies', indianFriendly:5, tips:'#1 job portal in Malaysia. Most local companies post here. Use salary filter RM 5,000+ for EP roles.' },
  { name:'Indeed Malaysia', url:'https://my.indeed.com', icon:'🌐', best:'Volume search, all sectors', indianFriendly:4, tips:'Good for bulk search. Many roles not on other portals. Set email alerts for your skills.' },
  { name:'Glassdoor Malaysia', url:'https://www.glassdoor.com', icon:'🏢', best:'Company research + salaries', indianFriendly:4, tips:'Research company culture, salary benchmarks, interview questions before applying. Critical for salary negotiation.' },
  { name:'TalentCorp Malaysia', url:'https://talentcorp.com.my', icon:'⭐', best:'RP-T eligible (RM 15K+)', indianFriendly:5, tips:'Official government talent portal. Registered with TalentCorp = faster EP processing. Must-register for RM15K+ earners.' },
  { name:'JobsDB Malaysia', url:'https://malaysia.jobsdb.com', icon:'📋', best:'Finance, Banking, IT', indianFriendly:4, tips:'Popular for BFSI sector. Good for Petronas-linked and government-linked companies (GLCs).' },
  { name:'Kalibrr Malaysia', url:'https://www.kalibrr.com/malaysia', icon:'🎯', best:'Tech startups, digital roles', indianFriendly:4, tips:'Skills-based matching. Good for junior to mid roles in tech.' },
  { name:'Hiredly (formerly Wobb)', url:'https://hiredly.com', icon:'🚀', best:'Startups, culture-first companies', indianFriendly:3, tips:'Best for company culture fit. Popular with Malaysian startups in tech/fintech.' },
]

const TOP_SECTORS = [
  { sector:'Information Technology', demand:'🔥 Very High', roles:'Software Engineer, Data Engineer, DevOps, Cloud Architect', avgSalary:'RM 7,000–20,000+', epFriendly:true, note:'Highest demand for Indian professionals. Python, Java, AWS roles get 100+ applications — stand out with portfolio.' },
  { sector:'Finance & Banking', demand:'🔥 High', roles:'Financial Analyst, Risk, Treasury, Investment Banking', avgSalary:'RM 8,000–25,000+', epFriendly:true, note:'CFA, ACCA holders in high demand. Maybank, CIMB, RHB, HSBC KL hire extensively.' },
  { sector:'Oil & Gas', demand:'⚡ Moderate-High', roles:'Engineers, Project Manager, Geologist, HSE', avgSalary:'RM 10,000–30,000+', epFriendly:true, note:'Petronas contractor companies always hiring. EP salary usually higher here.' },
  { sector:'Shared Services / BPO', demand:'🔥 Very High', roles:'Finance SSC, HR, IT Support, Analytics', avgSalary:'RM 4,000–12,000', epFriendly:true, note:'Most Indian EP holders work here. Accenture, Cognizant, Infosys, TCS all have KL operations.' },
  { sector:'Healthcare / Pharma', demand:'⚡ Moderate', roles:'Pharmacist, Medical, Research, QA', avgSalary:'RM 5,000–15,000', epFriendly:true, note:'Registration with Malaysian bodies required. Check MMC, BPharm registration before applying.' },
  { sector:'Engineering (Mfg)', demand:'⚡ Moderate', roles:'Mechanical, Electrical, Process, QA', avgSalary:'RM 5,000–12,000', epFriendly:true, note:'Min RM 7,000/month for EP III from June 2026 in manufacturing sector.' },
]

const INTERVIEW_TIPS = [
  { t:'Salary negotiation', d:'Research Glassdoor + JobStreet salary range before interview. Always say "I\'m looking for RM X–Y based on my research and experience." Never say "my India salary was X." Negotiate in RM.' },
  { t:'EP sponsorship question', d:'Most MNCs sponsor EP automatically. For smaller companies, ask politely: "I\'ll need EP sponsorship — is your company registered with ESD?" Don\'t mention it in first interview; bring it up when they show interest.' },
  { t:'Malaysian interview culture', d:'Punctuality matters. Dress formal even for tech roles (first interview). Address interviewer as "Mr/Ms [Last Name]" unless told otherwise. Expect 2–3 rounds: HR screen → technical → final with manager.' },
  { t:'Skills that stand out', d:'Bilingual (English + Tamil/Hindi = bonus for some roles). Full stack or cloud skills for tech. FP&A + Power BI for finance. Jira/Confluence for project management. Build Malaysia-relevant portfolio.' },
  { t:'Follow-up after interview', d:'Email thank you within 24 hours. WhatsApp follow-up after 1 week is acceptable in Malaysia. LinkedIn message to interviewer is common and not considered pushy.' },
]

// EP 2026 salary thresholds
const EP_THRESHOLDS = [
  { cat:'EP Category I',   old:'RM 10,000+', new:'RM 20,000+',   years:'Up to 10 years', succession:'Not required', color:'#2563eb', change:'2×' },
  { cat:'EP Category II',  old:'RM 5,000–9,999',new:'RM 10,000–19,999',years:'Up to 10 years',succession:'Required', color:'#7c3aed', change:'2×' },
  { cat:'EP Category III', old:'RM 3,000–4,999',new:'RM 5,000–9,999', years:'Up to 5 years', succession:'Required', color:'#f59e0b', change:'~2×' },
  { cat:'EP III (Manufacturing)',old:'RM 3,000+',new:'RM 7,000+', years:'Up to 5 years', succession:'Required', color:'#ef4444', change:'Sector min' },
]

const JOB_TIPS = [
  '🇮🇳 Indian diaspora network is huge in KL — join "Indians in Malaysia" Facebook groups and connect with seniors in your field',
  '💼 LinkedIn is king — update profile to "Open to Work" (visible to recruiters only). Add "Kuala Lumpur" as preferred location.',
  '🏢 TCS, Infosys, Cognizant, Wipro, HCL all have KL offices — internal transfer from India office is the easiest EP path',
  '📧 Cold email works in Malaysia — research target company → find hiring manager on LinkedIn → personalised email, not template',
  '⭐ Register on TalentCorp at talentcorp.com.my — government talent registry, faster EP processing, exclusive job boards',
  '💰 EP Category III minimum is RM 5,000 from June 2026. If your offer is below RM 5,000, EP will be rejected — negotiate up',
  '🔄 Graduate from Malaysian university? Apply for 1-year Graduate Employment Pass (GET) to job hunt without employer sponsor',
  '📱 WhatsApp job groups are active in Malaysia — ask Indian colleagues to add you to industry-specific groups',
  '🎯 Niche skills = faster EP: Cloud (AWS/Azure/GCP), Data Science, Cybersecurity, SAP, Salesforce — always in demand',
  '📋 Keep CV to 2 pages max — Malaysian employers skip long CVs. Lead with skills summary, not objective statement',
]

export default function JobSearch() {
  const [tab, setTab]         = useState('portals')
  const [salary, setSalary]   = useState('8000')
  const [sector, setSector]   = useState('')

  const epCat = useMemo(() => {
    const s = parseFloat(salary) || 0
    if (s >= 20000) return { cat:'Category I', color:'#2563eb', ok:true,  msg:'✅ EP Category I eligible (effective June 2026)' }
    if (s >= 10000) return { cat:'Category II', color:'#7c3aed', ok:true, msg:'✅ EP Category II eligible' }
    if (s >= 7000)  return { cat:'Category III (Mfg)', color:'#f59e0b', ok:true,  msg:'⚡ EP III eligible (manufacturing sector only)' }
    if (s >= 5000)  return { cat:'Category III', color:'#f59e0b', ok:true, msg:'⚡ EP Category III eligible (non-manufacturing)' }
    return { cat:'Below minimum', color:'#ef4444', ok:false, msg:'❌ Below EP minimum (RM 5,000) — increase offer or check sector rules' }
  }, [salary])

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.emoji}>💼</span>
        <div>
          <h1 className={styles.title}>Job Search Tool</h1>
          <p className={styles.sub}>Find jobs in Malaysia + EP 2026 salary thresholds + tips for Indians</p>
        </div>
      </div>
      <PrivacyNotice />

      {/* EP 2026 breaking alert */}
      <div className={styles.epAlert}>
        <div className={styles.epAlertIcon}>⚠️</div>
        <div>
          <div className={styles.epAlertTitle}>EP Salary Policy Changes — Effective 1 June 2026</div>
          <div className={styles.epAlertSub}>All EP categories get significantly higher minimum salaries. Category I doubles to RM 20,000. Category II: RM 10,000+. Category III: RM 5,000+ (manufacturing RM 7,000+).</div>
        </div>
      </div>

      <div className={styles.tabs}>
        {[['portals','🔍 Job Portals'],['sectors','🏢 Top Sectors'],['ep2026','💰 EP 2026'],['tips','💡 Tips'],['interview','🎯 Interview']].map(([id,label]) => (
          <button key={id} className={`${styles.tab} ${tab===id?styles.tabActive:''}`} onClick={()=>setTab(id)}>{label}</button>
        ))}
      </div>

      {tab === 'portals' && (
        <div className={styles.portalsGrid}>
          {PORTALS.map((p,i) => (
            <div key={i} className={styles.portalCard}>
              <div className={styles.portalTop}>
                <span className={styles.portalIcon}>{p.icon}</span>
                <div>
                  <div className={styles.portalName}>{p.name}</div>
                  <div className={styles.portalBest}>Best for: {p.best}</div>
                </div>
                <div className={styles.portalRating}>{'⭐'.repeat(p.indianFriendly)}</div>
              </div>
              <div className={styles.portalTip}>{p.tips}</div>
              <a href={p.url} target="_blank" rel="noreferrer" className={styles.portalLink}>Open →</a>
            </div>
          ))}
        </div>
      )}

      {tab === 'sectors' && (
        <div className={styles.sectorsList}>
          {TOP_SECTORS.map((s,i) => (
            <div key={i} className={styles.sectorCard}>
              <div className={styles.sectorTop}>
                <div><div className={styles.sectorName}>{s.sector}</div><div className={styles.sectorRoles}>{s.roles}</div></div>
                <div><div className={styles.sectorDemand}>{s.demand}</div><div className={styles.sectorSalary}>{s.avgSalary}</div></div>
              </div>
              <div className={styles.sectorNote}>{s.note}</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'ep2026' && (
        <>
          {/* Salary checker */}
          <div className={styles.salaryCheck}>
            <div className={styles.salaryCheckTitle}>🧮 Check Your EP Category</div>
            <div className={styles.salaryRow}>
              <label>Expected monthly offer (RM)</label>
              <div className={styles.inputWrap}><span className={styles.prefix}>RM</span><input type="number" value={salary} onChange={e=>setSalary(e.target.value)} /></div>
            </div>
            <div className={styles.epResult} style={{borderColor: epCat.color, background: epCat.ok ? 'rgba(22,163,74,.06)' : 'rgba(239,68,68,.06)'}}>
              <div style={{fontSize:'16px',fontWeight:900,color:epCat.color}}>{epCat.msg}</div>
              {epCat.cat !== 'Below minimum' && <div style={{fontSize:'12px',color:'var(--sub)',marginTop:'4px'}}>Category: {epCat.cat}</div>}
            </div>
          </div>

          <div className={styles.epTableWrap}>
            <div className={styles.epTableTitle}>📊 EP Salary Thresholds — Before vs After June 2026</div>
            {EP_THRESHOLDS.map((r,i) => (
              <div key={i} className={styles.epRow} style={{'--accent':r.color}}>
                <div className={styles.epCat}>{r.cat}</div>
                <div className={styles.epChange}><span className={styles.epOld}>{r.old}</span><span className={styles.epArrow}>→</span><span className={styles.epNew}>{r.new}</span><span className={styles.epBadge}>{r.change}</span></div>
                <div className={styles.epMeta}>{r.years} · Succession plan: {r.succession}</div>
              </div>
            ))}
          </div>

          <div className={styles.ep2026Notes}>
            {['🗓️ Effective date: 1 June 2026 — applies to ALL new and renewal applications',
              '🔄 Renewals before June 2026 follow old rules — renew early if close to expiry',
              '🏭 Manufacturing sector EP III minimum is RM 7,000 (not RM 5,000)',
              '📋 Category II & III now require succession plan — employer must show local replacement plan',
              '⏳ Category III capped at 5 years total — plan career progression to Category I/II',
              '✅ Category I & II: up to 10 years validity available',
              '🇮🇳 Dependent Pass now available for ALL EP categories including EP III — big change!',
            ].map((n,i) => <div key={i} className={styles.ep2026Note}>{n}</div>)}
          </div>
        </>
      )}

      {tab === 'tips' && (
        <div className={styles.tipsList}>
          {JOB_TIPS.map((t,i) => <div key={i} className={styles.tip}>{t}</div>)}
        </div>
      )}

      {tab === 'interview' && (
        <div className={styles.interviewList}>
          {INTERVIEW_TIPS.map((item,i) => (
            <div key={i} className={styles.interviewCard}>
              <div className={styles.intT}>{item.t}</div>
              <div className={styles.intD}>{item.d}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
