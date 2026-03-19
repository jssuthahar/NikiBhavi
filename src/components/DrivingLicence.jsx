import styles from './DrivingLicence.module.css'

const DOCUMENTS = [
  { icon:'🪪', title:'Old Driving Licence',        note:'Original + 1 photocopy (both sides)',           required:true  },
  { icon:'🛂', title:'Current Passport',            note:'Original + 1 photocopy (photo page)',           required:true  },
  { icon:'📋', title:'JPJL7 Form',                  note:'Fill with old passport details, new address & signature. Get form at JPJ counter.',required:true },
  { icon:'📘', title:'Old Passport (if changed)',   note:'Original + photocopy required ONLY if your passport number changed since last renewal',required:false },
]

const FEES = [
  { item:'Renewal Fee (foreigner rate)', amount:'RM 60 × years', note:'e.g. RM 300 for 5 years. Malaysians pay less.', color:'#00B14F' },
  { item:'Amaun Pelarasan Tempoh',       amount:'RM 15',         note:'Pro-rated adjustment fee — aligns expiry date with your visa/EP expiry or system date.', color:'#F59E0B' },
  { item:'Physical Card Fee',            amount:'RM 100',        note:"Charged for non-citizen CDL card printing. Malaysians don't pay this (they use MyJPJ digital app).", color:'#EF4444' },
]

const STEPS = [
  { num:'1', title:'Prepare Documents',       desc:'Photocopy your passport (photo page) and driving licence (both sides). Get the JPJL7 form ready to fill.' },
  { num:'2', title:'Go to JPJ Wangsa Maju',   desc:'From KL Sentral / NU Sentral: Take LRT to Wangsa Maju station (Ampang/Kelana Jaya line). JPJ office is ~10 min walk or short taxi ride from station.' },
  { num:'3', title:'Take Queue Number',        desc:'Tell the counter you are a foreigner renewing your driving licence. They will direct you to the correct counter.' },
  { num:'4', title:'Submit Documents',         desc:'Hand over all documents. Officer checks your old licence, passport, photocopies and signed JPJL7 form.' },
  { num:'5', title:'Choose Renewal Period',    desc:'Officer asks: 1 year, 2 years, 3 years, 4 years, or 5 years. Most Indians choose 5 years (RM 300) for best value.' },
  { num:'6', title:'Make Payment',             desc:'Pay at the counter: RM 300 (renewal) + RM 15 (adjustment) + RM 100 (physical card) = RM 415 for 5 years.' },
  { num:'7', title:'Collect Same Day!',        desc:'New licence printed and handed to you on the same day. No waiting, no postage. Done!' },
]

const TIPS = [
  '⏰ Go early — JPJ opens at 7:30am. Queue fills up fast, especially on Monday mornings.',
  '📍 JPJ Wangsa Maju is the most convenient for KL. Other branches: Putrajaya, Subang, Rawang.',
  '📱 Check your licence expiry date on the physical card — renew before it expires to avoid fines.',
  '💡 5-year renewal is best value — RM 415 total vs RM 115 every year.',
  '⚠️ Licence validity is capped at your EP/visa expiry date — if your EP expires in 2 years, they may only give 2 years even if you pay for 5. Bring your EP.',
  '🚗 International Driving Permit (IDP) from India is NOT valid for long-term residents — you need a Malaysian licence.',
  '✅ No appointment needed — just walk in.',
]

export default function DrivingLicence() {
  return (
    <div className={styles.wrap}>
      <div className={styles.hero}>
        <span className={styles.heroIcon}>🚗</span>
        <div>
          <h1 className={styles.heroTitle}>Malaysia Driving Licence Renewal</h1>
          <p className={styles.heroDesc}>Complete guide for Indians — documents, fees, location & same-day collection</p>
        </div>
      </div>

      {/* Location highlight */}
      <div className={styles.locationCard}>
        <div className={styles.locationLeft}>
          <div className={styles.locationTitle}>📍 Where to Go — JPJ Wangsa Maju (KL)</div>
          <div className={styles.locationSteps}>
            <span className={styles.lrtStep}>🚇 LRT from NU Sentral / KL Sentral</span>
            <span className={styles.lrtArrow}>→</span>
            <span className={styles.lrtStation}>Wangsa Maju Station</span>
            <span className={styles.lrtArrow}>→</span>
            <span className={styles.lrtWalk}>🚶 10 min walk or short taxi</span>
            <span className={styles.lrtArrow}>→</span>
            <span className={styles.lrtEnd}>🏛️ JPJ Office</span>
          </div>
        </div>
        <div className={styles.locationBadge}>✅ Same Day Collection</div>
      </div>

      {/* Documents */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>📋 Documents Required</h2>
        <div className={styles.docGrid}>
          {DOCUMENTS.map((d, i) => (
            <div key={i} className={`${styles.docCard} ${!d.required ? styles.docCardOptional : ''}`}>
              <span className={styles.docIcon}>{d.icon}</span>
              <div>
                <div className={styles.docTitle}>
                  {d.title}
                  {!d.required && <span className={styles.optBadge}>If passport changed</span>}
                </div>
                <div className={styles.docNote}>{d.note}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Step by step */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>🪜 Step-by-Step Process</h2>
        <div className={styles.steps}>
          {STEPS.map((st, i) => (
            <div key={i} className={styles.step}>
              <div className={styles.stepNum}>{st.num}</div>
              <div className={styles.stepBody}>
                <div className={styles.stepTitle}>{st.title}</div>
                <div className={styles.stepDesc}>{st.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fees */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>💳 Fee Breakdown (5-Year Renewal)</h2>
        <div className={styles.feesTable}>
          {FEES.map((f, i) => (
            <div key={i} className={styles.feeRow}>
              <div className={styles.feeLeft}>
                <div className={styles.feeDot} style={{ background: f.color }} />
                <div>
                  <div className={styles.feeItem}>{f.item}</div>
                  <div className={styles.feeNote}>{f.note}</div>
                </div>
              </div>
              <div className={styles.feeAmount} style={{ color: f.color }}>{f.amount}</div>
            </div>
          ))}
          <div className={styles.feeTotal}>
            <span>Total (5 years)</span>
            <span>RM 415</span>
          </div>
        </div>
        <div className={styles.feeCalc}>
          <div className={styles.feeCalcTitle}>Cost per year</div>
          {[1,2,3,4,5].map(y => (
            <div key={y} className={styles.feeCalcRow}>
              <span>{y} year{y>1?'s':''}</span>
              <span>RM {(60*y + 15 + 100).toLocaleString()}</span>
              <span className={styles.perYear}>RM {(( 60*y + 15 + 100)/y).toFixed(0)}/year</span>
            </div>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>💡 Tips & Important Notes</h2>
        <div className={styles.tips}>
          {TIPS.map((t, i) => (
            <div key={i} className={styles.tip}>{t}</div>
          ))}
        </div>
      </section>
    </div>
  )
}
