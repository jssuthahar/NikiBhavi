import { useState } from 'react'
import styles from './EPFWithdrawal.module.css'
import PrivacyNotice from './PrivacyNotice'

const TABS = [
  { id:'overview', label:'📋 Overview' },
  { id:'accounts', label:'🏦 EPF Accounts' },
  { id:'withdraw', label:'💰 How to Withdraw' },
  { id:'calc',     label:'🧮 Estimate My EPF' },
  { id:'tips',     label:'💡 Tips' },
]

const MYR_INR = 19.5

export default function EPFWithdrawal() {
  const [tab, setTab] = useState('overview')
  const [salary, setSalary] = useState('8000')
  const [years, setYears] = useState('5')
  const [existing, setExisting] = useState('0')

  const epfEst = (() => {
    const sal = parseFloat(salary)||0
    const yrs = parseFloat(years)||0
    const exist = parseFloat(existing)||0
    const monthly = sal * (0.11 + 0.12) // emp + employer rough
    const annual = monthly * 12
    const corpus = exist + annual * yrs * 1.055 // ~5.5% dividend compounded simply
    return { monthly: Math.round(monthly), annual: Math.round(annual), corpus: Math.round(corpus) }
  })()

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.emoji}>🏦</span>
        <div>
          <h1 className={styles.title}>EPF / KWSP Withdrawal Guide</h1>
          <p className={styles.sub}>When & how Indians can withdraw EPF when leaving Malaysia</p>
        </div>
      </div>
      <PrivacyNotice />
      <div className={styles.tabs}>
        {TABS.map(t => <button key={t.id} className={`${styles.tab} ${tab===t.id?styles.tabActive:''}`} onClick={()=>setTab(t.id)}>{t.label}</button>)}
      </div>
      <div className={styles.content} key={tab}>

        {tab === 'overview' && (
          <>
            <h2 className={styles.contentTitle}>EPF (KWSP) for Indian EP Holders</h2>
            {[
              {t:'What is EPF?', d:'EPF (Employees Provident Fund) = KWSP in Malay. Mandatory retirement savings deducted from every salary. Employee 11%, employer 12–13%. Grows with annual dividends (5.50% in 2024).'},
              {t:'Indians MUST contribute?', d:'Yes. Any person working in Malaysia with a formal employment contract MUST contribute to EPF — including EP holders. No choice. But you CAN withdraw everything when you leave Malaysia permanently.'},
              {t:'The key benefit for Indians', d:'Unlike local Malaysians who cannot touch EPF until 55, foreign nationals (non-PRs) can withdraw their ENTIRE EPF balance when they leave Malaysia permanently. This is a massive financial benefit.'},
              {t:'How much will I have?', d:'On RM 8,000/month salary for 5 years: approximately RM 130,000–150,000 in EPF. Equivalent to ₹25–30 lakhs returned to you tax-free when you leave.'},
              {t:'Is EPF taxable in India?', d:'Under DTAA (Double Tax Avoidance Agreement) between India and Malaysia, EPF withdrawal is NOT taxable in India if it was contributed from Malaysian income. Consult a CA to confirm your specific case.'},
            ].map((item,i) => (
              <div key={i} className={styles.item}>
                <div className={styles.itemT}>{item.t}</div>
                <div className={styles.itemD}>{item.d}</div>
              </div>
            ))}
          </>
        )}

        {tab === 'accounts' && (
          <>
            <h2 className={styles.contentTitle}>EPF Account Structure (2024 restructure)</h2>
            <div className={styles.accountGrid}>
              {[
                {name:'Akaun Persaraan (Account 1)', pct:'75%', color:'#2563eb', for:'Retirement savings. Cannot withdraw until age 55 OR leaving Malaysia permanently. Grows with full dividends.', withdraw:'Full withdrawal when leaving Malaysia permanently'},
                {name:'Akaun Sejahtera (Account 2)', pct:'15%', color:'#16a34a', for:'Semi-flexible. Can withdraw for house purchase, education, medical. Available for partial withdrawal anytime.', withdraw:'Partial withdrawal for approved purposes'},
                {name:'Akaun Fleksibel (Account 3)', pct:'10%', color:'#f59e0b', for:'NEW account (2024). Fully flexible — can withdraw any time for any reason, no restrictions.', withdraw:'Withdraw any time, any reason'},
              ].map((acc,i) => (
                <div key={i} className={styles.accountCard} style={{'--accent':acc.color}}>
                  <div className={styles.accName}>{acc.name}</div>
                  <div className={styles.accPct}>{acc.pct} of contributions</div>
                  <div className={styles.accFor}>{acc.for}</div>
                  <div className={styles.accWithdraw}>💰 {acc.withdraw}</div>
                </div>
              ))}
            </div>
            <div className={styles.note}>
              ✅ When you leave Malaysia permanently as a non-PR foreign national, you can withdraw ALL three accounts — including Akaun Persaraan (75%) which Malaysians can only access at 55.
            </div>
          </>
        )}

        {tab === 'withdraw' && (
          <>
            <h2 className={styles.contentTitle}>How to Withdraw EPF When Leaving Malaysia</h2>
            {[
              {s:'1',t:'Confirm you are leaving permanently',d:'EPF full withdrawal requires declaration of permanent departure. If you plan to return to Malaysia or still have EP — wait until final departure. You cannot re-contribute after full withdrawal.'},
              {s:'2',t:'Prepare documents',d:'Passport (original), Employment Pass (all), latest EPF statement (i-Akaun), flight ticket out of Malaysia (or letter confirming departure), bank account details (Malaysia or India).'},
              {s:'3',t:'Cancel EPF contributions',d:'Inform your employer you are leaving. They stop EPF deductions on last payroll. Get final EPF contribution from employer.'},
              {s:'4',t:'Submit withdrawal application',d:'Apply via EPF i-Akaun online at kwsp.gov.my OR visit nearest EPF branch. Application form: KWSP 9C (AHL). Processing takes 5–10 working days.'},
              {s:'5',t:'Money credited',d:'EPF credited to your Malaysian bank account. Transfer to India via Wise/Remitly for best rates. On RM 100,000 → approx ₹19.5 lakhs at current rates.'},
              {s:'6',t:'Close Malaysian bank account',d:'After EPF and all remaining money transferred — close bank account. Keep account open 3 months after leaving for any delayed payments.'},
            ].map((s,i) => (
              <div key={i} className={styles.step}>
                <div className={styles.stepN}>{s.s}</div>
                <div><strong>{s.t}</strong><p>{s.d}</p></div>
              </div>
            ))}
            <div className={styles.note} style={{marginTop:'14px'}}>
              ⚠️ Akaun Fleksibel (10%) can be withdrawn BEFORE leaving — useful for taking some money home during annual India trips.
            </div>
          </>
        )}

        {tab === 'calc' && (
          <>
            <h2 className={styles.contentTitle}>Estimate Your EPF Balance</h2>
            <div className={styles.calcCard}>
              <div className={styles.calcGrid}>
                <div className={styles.field}>
                  <label>💰 Monthly Gross Salary (RM)</label>
                  <div className={styles.inputWrap}><span className={styles.prefix}>RM</span><input type="number" value={salary} onChange={e=>setSalary(e.target.value)} /></div>
                </div>
                <div className={styles.field}>
                  <label>📅 Years Working in Malaysia</label>
                  <div className={styles.inputWrap}><input type="number" value={years} onChange={e=>setYears(e.target.value)} /><span className={styles.suffix}>years</span></div>
                </div>
                <div className={styles.field}>
                  <label>🏦 Existing EPF Balance (RM)</label>
                  <div className={styles.inputWrap}><span className={styles.prefix}>RM</span><input type="number" value={existing} onChange={e=>setExisting(e.target.value)} /></div>
                </div>
              </div>
              <div className={styles.epfResult}>
                {[
                  ['Monthly EPF deposit',  `RM ${epfEst.monthly.toLocaleString()}`],
                  ['Annual contribution',  `RM ${epfEst.annual.toLocaleString()}`],
                  ['Est. corpus at departure', `RM ${epfEst.corpus.toLocaleString()}`],
                  ['Approx in INR',        `₹ ${Math.round(epfEst.corpus * MYR_INR).toLocaleString()}`],
                ].map(([k,v]) => (
                  <div key={k} className={`${styles.epfRow} ${k.includes('corpus')||k.includes('INR') ? styles.epfBold : ''}`}>
                    <span>{k}</span><strong>{v}</strong>
                  </div>
                ))}
              </div>
              <p className={styles.calcNote}>Estimate based on Emp 11% + Employer 12% + ~5.50% annual dividend. Actual may vary.</p>
            </div>
          </>
        )}

        {tab === 'tips' && (
          <>
            <h2 className={styles.contentTitle}>EPF Tips for Indian EP Holders</h2>
            <div className={styles.tipsList}>
              {[
                '💳 Register for i-Akaun (EPF online portal) on Day 1 — track balance, check contributions monthly',
                '📱 EPF app available on iOS and Android — check balance anytime',
                '✅ Verify each month that employer is depositing correct EPF — employer must deposit by 15th of next month',
                '🏠 Can use Account 2 (15%) for house purchase down payment — useful if buying property in Malaysia',
                '🎓 Can use Account 2 for your own education or children\'s education fees (registered institutions)',
                '💊 Can use Account 2 for critical illness medical expenses',
                '💰 Akaun Fleksibel (10%) — withdraw anytime, great for India trips or emergency cash',
                '🇮🇳 EPF withdrawal on leaving: NOT subject to Malaysia tax. Check India tax position with CA.',
                '🔄 Transfer to India: Wise gives best MYR→INR rates. On RM 100,000 you save RM 500–2,000 vs bank transfer',
                '📋 Keep your EPF member number (12 digit) safe — needed for all transactions and withdrawal',
              ].map((t,i) => <div key={i} className={styles.tip}>{t}</div>)}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
