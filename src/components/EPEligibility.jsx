import { useState, useMemo } from 'react'
import styles from './EPEligibility.module.css'
import PrivacyNotice from './PrivacyNotice'

const PASS_TYPES = [
  {
    id:'ep', name:'Employment Pass (EP)', icon:'💼', minSal:5000,
    desc:'For knowledge workers, managers, executives. NEW: Salary thresholds significantly increased effective 1 June 2026.',
    ep2026: true,
    requirements:['⚠️ JUNE 2026 UPDATE: EP III min RM 5,000 (was RM 3,000) | EP II min RM 10,000 (was RM 5,000) | EP I min RM 20,000 (was RM 10,000)','Relevant degree or diploma','Employer must be registered with ESD/SSM','Job must be in approved category','Employer applies — not employee'],
    duration:'EP I & II: up to 10 years | EP III: up to 5 years (new caps)',
    color:'#2563eb',
  },
  {
    id:'sp', name:"Residence Pass – Talent (RP-T)", icon:'⭐', minSal:15000,
    desc:'For highly skilled talent who have worked in Malaysia for 3+ years. Pathway to PR.',
    requirements:['RM 15,000+ salary OR critical sector','5 years work experience','3+ years in Malaysia on EP','Employer support letter','Approval from TalentCorp Malaysia'],
    duration:'10 years, renewable',
    color:'#C9F53B',
  },
  {
    id:'dp', name:'Dependent Pass (DP)', icon:'👨‍👩‍👧', minSal:0,
    desc:'For spouse and children of EP holder. DP holder cannot work unless they get a Letter of Approval.',
    requirements:['EP holder earns RM 5,000+','Marriage certificate (apostilled)','Birth certificates for children','Applied together with or after EP','Processing: 2–4 weeks'],
    duration:'Same as EP holder',
    color:'#10b981',
  },
  {
    id:'mm2h', name:'MM2H Visa (2024 revised)', icon:'🏡', minSal:0,
    desc:'Malaysia My Second Home — 10-year visa. Requirements revised in 2024. Tier-based system now.',
    requirements:['Tier 1 (Sarawak): RM 10,000/mo income, RM 150,000 FD','Tier 2: RM 40,000/mo income, RM 500,000 FD','Tier 3 (Premium): RM 75,000/mo income, RM 1M FD','Must purchase property RM 600K–1.5M+ (tier dependent)','No criminal record, medical insurance required'],
    duration:'10 years, renewable',
    color:'#f59e0b',
  },
]

export default function EPEligibility() {
  const [salary,  setSalary]  = useState('')
  const [years,   setYears]   = useState('')
  const [degree,  setDegree]  = useState(true)
  const [yrsInMY, setYrsInMY] = useState('')
  const [sector,  setSector]  = useState('it')

  const sal = parseFloat(salary) || 0
  const yrs = parseFloat(years) || 0
  const inMY= parseFloat(yrsInMY) || 0

  const eligible = {
    ep:   sal >= 5000 && degree,
    sp:   sal >= 15000 && yrs >= 5 && inMY >= 3,
    dp:   sal >= 5000,
    mm2h: false, // manual review always
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.headerEmoji}>🛂</span>
        <div>
          <h1 className={styles.headerTitle}>EP Eligibility Checker</h1>
          <p className={styles.headerDesc}>Find the right Malaysian work visa for your profile</p>
        </div>
      </div>
      <PrivacyNotice />

      <div className={styles.inputCard}>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>💰 Monthly Salary Offered (RM)</label>
            <div className={styles.inputWrap}>
              <span className={styles.prefix}>RM</span>
              <input type="number" min="0" value={salary} onChange={e=>setSalary(e.target.value)} placeholder="e.g. 8000" />
            </div>
          </div>
          <div className={styles.field}>
            <label>🎓 Years of Work Experience</label>
            <div className={styles.inputWrap}>
              <input type="number" min="0" value={years} onChange={e=>setYears(e.target.value)} placeholder="e.g. 5" style={{paddingLeft:'14px'}} />
              <span className={styles.suffix}>yrs</span>
            </div>
          </div>
          <div className={styles.field}>
            <label>🇲🇾 Years Already in Malaysia</label>
            <div className={styles.inputWrap}>
              <input type="number" min="0" value={yrsInMY} onChange={e=>setYrsInMY(e.target.value)} placeholder="e.g. 2" style={{paddingLeft:'14px'}} />
              <span className={styles.suffix}>yrs</span>
            </div>
          </div>
          <div className={styles.field}>
            <label>📋 Industry Sector</label>
            <select value={sector} onChange={e=>setSector(e.target.value)}>
              {[['it','IT / Tech'],['finance','Finance / Banking'],['engineering','Engineering'],['healthcare','Healthcare'],['education','Education'],['other','Other']].map(([k,v])=><option key={k} value={k}>{v}</option>)}
            </select>
          </div>
        </div>
        <label className={styles.toggle}>
          <input type="checkbox" checked={degree} onChange={e=>setDegree(e.target.checked)} />
          <span>I have a relevant degree / diploma</span>
        </label>
      </div>

      <div className={styles.passGrid}>
        {PASS_TYPES.map(p => (
          <div key={p.id} className={`${styles.passCard} ${eligible[p.id]?styles.passEligible:styles.passCheck}`}>
            <div className={styles.passTop}>
              <span className={styles.passIcon}>{p.icon}</span>
              <div className={styles.passInfo}>
                <div className={styles.passName}>{p.name}</div>
                <div className={styles.passDuration}>⏱ {p.duration}</div>
              </div>
              <span className={`${styles.passBadge} ${eligible[p.id]?styles.badgeGreen:styles.badgeGray}`}>
                {eligible[p.id]?'✅ Likely Eligible':'📋 Check Criteria'}
              </span>
            </div>
            <p className={styles.passDesc}>{p.desc}</p>
            <div className={styles.reqList}>
              {p.requirements.map((r,i)=><div key={i} className={styles.req}><span>→</span>{r}</div>)}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.note}>
        ℹ️ <strong>Important:</strong> EP eligibility is ultimately decided by the Immigration Department of Malaysia (Jabatan Imigresen). Your employer's ESD/Expat Centre registration, industry sector, and individual profile all affect approval. Consult an immigration lawyer for complex cases.
        <a href="https://www.esd.com.my" target="_blank" rel="noreferrer" className={styles.link}> → esd.com.my</a>
      </div>
    </div>
  )
}
