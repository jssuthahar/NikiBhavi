import { useState } from 'react'
import styles from './StudentGuide.module.css'
import PrivacyNotice from './PrivacyNotice'

const DOCS = [
  { cat:'📋 Student Pass Application — Documents', items:[
    '✅ Valid passport (18+ months remaining)',
    '✅ Offer letter from Malaysian university (original)',
    '✅ Academic transcripts — all previous qualifications',
    '✅ Original degree / SPM / A-Level certificates',
    '✅ Medical examination report (approved clinic in Malaysia)',
    '✅ Health insurance certificate (many universities include this)',
    '✅ Passport-size photos — 6 pieces, white background',
    '✅ Financial proof: bank statement showing sufficient funds',
    '✅ Parents / sponsor letter if under 21',
    '✅ i-Student registration via EMGS (Education Malaysia Global Services)',
  ]},
  { cat:'🌐 EMGS — Online Registration Required', items:[
    '📱 Register at educationmalaysia.gov.my before arrival',
    '📋 Your university will guide EMGS application process',
    '💰 EMGS fee: RM 2,290 (approx ₹44,000) for 2-year degree',
    '📧 EMGS approval letter must be printed and carried on arrival',
    '⏳ Processing time: 2–4 weeks after university submits',
    '🔄 Student Pass renewal through EMGS every year',
  ]},
]

const TIPS = [
  { icon:'⏰', title:'Apply 3 months early', desc:'EMGS and Student Pass processing takes 4–8 weeks. Apply as soon as you get offer letter. Late applications cause missed semester starts.' },
  { icon:'💰', title:'Financial proof minimum', desc:'Show RM 40,000+ (₹7.8 lakhs) in bank account or parents\' account. For medicine: RM 80,000+. Scholarship letter counts as proof.' },
  { icon:'🏥', title:'Medical check in India first', desc:'Get full medical check before coming — HIV, TB, hepatitis tests required. Failing medical = visa rejection. Check EMGS-approved doctors list.' },
  { icon:'📱', title:'Download MyEG & EMGS apps', desc:'Track your Student Pass status, renew online, check appointment dates. Save your EMGS reference number from Day 1.' },
  { icon:'🏠', title:'Student housing options', desc:'University hostel (cheapest, RM 200–500/mo), private hostel, or rent apartment with 3–4 friends (RM 200–350 per person). Book early — hostels fill up.' },
  { icon:'✈️', title:'Can you work part-time?', desc:'Yes — Student Pass holders can work up to 20 hours/week during semester breaks and public holidays only. Not during semester. Check your pass conditions.' },
  { icon:'🎓', title:'Transcript apostille from India', desc:'Get all degree/school certificates apostilled in India (MEA). Costs ₹500–2,000. Takes 1–2 weeks. Unapostilled docs may be rejected.' },
  { icon:'💳', title:'Student bank account', desc:'Maybank or CIMB — bring EMGS approval, passport, offer letter. Get account Day 1 for tuition fee payment and daily expenses.' },
]

const FAQS = [
  { q:'Can I convert Student Pass to Employment Pass after graduation?', a:'Yes! After graduating from a Malaysian university, you can apply for a Graduate Employment Pass (GET) valid for 1 year to job hunt. Then convert to full EP when you get a job. This is the most common path for Indian students staying in Malaysia.' },
  { q:'What happens if I fail or take a semester break?', a:'Inform EMGS and your university immediately. Student Pass is tied to enrollment status. Gap of study without notification can cause pass cancellation. Medical reasons are accepted with documentation.' },
  { q:'Can my parents visit me in Malaysia?', a:'Yes — they come on tourist visa (now visa-free until Dec 31 2026). They can stay 30 days per visit. No special student family visa exists.' },
  { q:'Is the Student Pass different from Student Visa?', a:'In Malaysia it\'s called Student Pass, not visa. It\'s a pass sticker in your passport. It allows you to stay in Malaysia for the duration of your course.' },
  { q:'Can I drive in Malaysia with Indian license?', a:'Indian license is valid for 3 months from entry date. After that you need Malaysian driving license. Enroll in driving school (RM 800–1,200 total cost).' },
  { q:'What about health insurance?', a:'Most Malaysian universities include health insurance in their fees. Check your offer letter. If not included, EMGS requires you to purchase one (RM 500–800/year).' },
  { q:'After 5 years of study — any path to PR?', a:'Student Pass years do NOT count toward PR residency. Only EP years count. You need to get EP after graduation and work 5 years for PR eligibility.' },
]

export default function StudentGuide() {
  const [tab, setTab] = useState('docs')
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.emoji}>🎓</span>
        <div>
          <h1 className={styles.title}>Student Pass Guide</h1>
          <p className={styles.sub}>Documents, tips, EMGS process — complete guide for Indian students 2026</p>
        </div>
      </div>
      <PrivacyNotice />

      <div className={styles.tabs}>
        {[['docs','📋 Documents'],['tips','💡 Tips'],['faq','❓ FAQ']].map(([id,label]) => (
          <button key={id} className={`${styles.tab} ${tab===id?styles.tabActive:''}`} onClick={()=>setTab(id)}>{label}</button>
        ))}
      </div>

      {tab === 'docs' && (
        <div className={styles.docsWrap}>
          {DOCS.map((group,i) => (
            <div key={i} className={styles.docGroup}>
              <div className={styles.groupTitle}>{group.cat}</div>
              {group.items.map((item,j) => <div key={j} className={styles.docItem}>{item}</div>)}
            </div>
          ))}
          <div className={styles.emgsBox}>
            <div className={styles.emgsTitle}>🌐 EMGS Process Timeline</div>
            {[
              ['Week 1',  'Get university offer letter → register on educationmalaysia.gov.my'],
              ['Week 2',  'Medical exam in India (EMGS approved clinic) → upload results'],
              ['Week 3–4','University submits your EMGS application on your behalf'],
              ['Week 4–6','EMGS approval letter issued → book flight'],
              ['Arrival', 'Land in Malaysia → go to EMGS for Student Pass sticker (same week)'],
              ['Day 7',   'Student Pass sticker in passport → attend university registration'],
            ].map(([wk,desc],i) => (
              <div key={i} className={styles.timelineRow}>
                <span className={styles.timelineWk}>{wk}</span>
                <span>{desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'tips' && (
        <div className={styles.tipsGrid}>
          {TIPS.map((tip,i) => (
            <div key={i} className={styles.tipCard}>
              <div className={styles.tipIcon}>{tip.icon}</div>
              <div className={styles.tipTitle}>{tip.title}</div>
              <div className={styles.tipDesc}>{tip.desc}</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'faq' && (
        <div className={styles.faqList}>
          {FAQS.map((item,i) => (
            <div key={i} className={`${styles.faqItem} ${openFaq===i?styles.faqOpen:''}`} onClick={()=>setOpenFaq(openFaq===i?null:i)}>
              <div className={styles.faqQ}>{openFaq===i?'▼':'▶'} {item.q}</div>
              {openFaq===i && <div className={styles.faqA}>{item.a}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
