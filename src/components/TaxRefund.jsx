import { useState, useMemo } from 'react'
import styles from './TaxRefund.module.css'
import PrivacyNotice from './PrivacyNotice'

// ── YA 2024/2025 Progressive Tax Brackets ────────────────────
const TAX_BRACKETS = [
  { min: 0,       max: 5000,    rate: 0,     base: 0      },
  { min: 5001,    max: 20000,   rate: 0.01,  base: 0      },
  { min: 20001,   max: 35000,   rate: 0.03,  base: 150    },
  { min: 35001,   max: 50000,   rate: 0.08,  base: 600    },
  { min: 50001,   max: 70000,   rate: 0.13,  base: 1800   },
  { min: 70001,   max: 100000,  rate: 0.21,  base: 4400   },
  { min: 100001,  max: 130000,  rate: 0.24,  base: 10700  },
  { min: 130001,  max: 250000,  rate: 0.245, base: 17900  },
  { min: 250001,  max: 400000,  rate: 0.25,  base: 47250  },
  { min: 400001,  max: 600000,  rate: 0.26,  base: 84750  },
  { min: 600001,  max: Infinity,rate: 0.28,  base: 136750 },
]

function calcTax(chargeable) {
  if (chargeable <= 0) return 0
  for (const b of TAX_BRACKETS) {
    if (chargeable <= b.max) {
      return b.base + (chargeable - b.min) * b.rate
    }
  }
  return 0
}

function getTaxBracketInfo(chargeable) {
  if (chargeable <= 0) return { rate: 0, label: '0%' }
  for (const b of TAX_BRACKETS) {
    if (chargeable <= b.max) {
      return { rate: b.rate, label: `${(b.rate * 100).toFixed(0)}%` }
    }
  }
  return { rate: 0.28, label: '28%' }
}

// ── ALL YA 2024/2025 Tax Reliefs (Source: LHDN hasil.gov.my) ──
const RELIEF_SECTIONS = [
  {
    id: 'personal',
    label: 'Personal & Family',
    icon: '👤',
    color: '#6366f1',
    reliefs: [
      { id: 'self',           label: 'Self & Dependents',          max: 9000,  fixed: true,  desc: 'Auto-applied — every resident taxpayer gets this', hint: 'Automatic for all residents' },
      { id: 'spouse',         label: 'Spouse (non-working)',        max: 4000,  fixed: false, desc: 'If spouse has no income or jointly assessed', hint: 'RM 4,000 max' },
      { id: 'spouse_disable', label: 'Disabled Spouse',            max: 5000,  fixed: false, desc: 'Additional relief if spouse is disabled', hint: 'RM 5,000 max' },
      { id: 'child_under18',  label: 'Child Under 18 (each)',      max: 2000,  fixed: false, desc: 'Per child below 18 years old', hint: 'RM 2,000 per child' },
      { id: 'child_over18',   label: 'Child 18+ (studying)',       max: 8000,  fixed: false, desc: 'Studying full-time locally or overseas', hint: 'RM 8,000 per child' },
      { id: 'child_disabled', label: 'Disabled Child',             max: 6000,  fixed: false, desc: 'RM 6,000 per disabled child (additional to child relief)', hint: 'RM 6,000 per child' },
      { id: 'parent_medical', label: 'Parents — Medical/Dental',   max: 8000,  fixed: false, desc: 'Medical treatment, dental, or care for parents', hint: 'RM 8,000 max' },
      { id: 'disabled_self',  label: 'Self — Disabled Person',     max: 6000,  fixed: false, desc: 'If you are registered as a disabled person', hint: 'RM 6,000 max' },
    ],
  },
  {
    id: 'epf',
    label: 'EPF, Insurance & Pension',
    icon: '🛡️',
    color: '#0ea5e9',
    reliefs: [
      { id: 'epf',            label: 'EPF Contributions',              max: 4000,  fixed: false, desc: 'Your own EPF contributions (11% employee share)', hint: 'RM 4,000 max (shared with life insurance up to RM 7,000)' },
      { id: 'life_ins',       label: 'Life Insurance Premium',         max: 3000,  fixed: false, desc: 'Life insurance for self, spouse, or child', hint: 'RM 3,000 max (shared with EPF cap RM 7,000 total)' },
      { id: 'edu_medical_ins',label: 'Education & Medical Insurance',  max: 4000,  fixed: false, desc: 'Premiums for education or medical insurance policies', hint: 'RM 4,000 max (YA 2025 increased from RM 3,000)' },
      { id: 'prs',            label: 'Private Retirement Scheme (PRS)',max: 3000,  fixed: false, desc: 'Contributions to approved PRS funds', hint: 'RM 3,000 max' },
      { id: 'socso',          label: 'SOCSO / EIS Contributions',      max: 350,   fixed: false, desc: 'Your employee contributions to SOCSO and EIS', hint: 'RM 350 max' },
    ],
  },
  {
    id: 'medical',
    label: 'Medical & Health',
    icon: '🏥',
    color: '#ef4444',
    reliefs: [
      { id: 'medical_self',   label: 'Medical Expenses (self/spouse/child)', max: 10000, fixed: false, desc: 'Serious diseases: cancer, dialysis, heart, HIV, etc.', hint: 'RM 10,000 max' },
      { id: 'dental',         label: 'Dental Treatment',                     max: 1000,  fixed: false, desc: 'Dental treatment expenses (within medical cap)', hint: 'RM 1,000 max (within RM 10,000 medical cap)' },
      { id: 'fertility',      label: 'Fertility Treatment',                  max: 10000, fixed: false, desc: 'IVF, IUI, and approved fertility treatments', hint: 'RM 10,000 max' },
      { id: 'medical_checkup',label: 'Full Medical Checkup',                 max: 1000,  fixed: false, desc: 'Complete medical checkup at registered clinic/hospital', hint: 'RM 1,000 max' },
      { id: 'vaccine',        label: 'COVID-19 / Vaccination',               max: 1000,  fixed: false, desc: 'Vaccination for self, spouse, or child', hint: 'RM 1,000 max' },
    ],
  },
  {
    id: 'education',
    label: 'Education & Skills',
    icon: '🎓',
    color: '#f59e0b',
    reliefs: [
      { id: 'edu_self',       label: 'Education Fees (self)',         max: 7000,  fixed: false, desc: 'Diploma, degree, masters or PhD at approved institution', hint: 'RM 7,000 max' },
      { id: 'upskill',        label: 'Upskilling / Skills Training',  max: 2000,  fixed: false, desc: 'Approved upskilling/technical courses (extended to YA 2026)', hint: 'RM 2,000 max' },
      { id: 'childcare',      label: 'Childcare Fees',                max: 3000,  fixed: false, desc: 'Fees at registered childcare centre for child under 6', hint: 'RM 3,000 max' },
    ],
  },
  {
    id: 'lifestyle',
    label: 'Lifestyle & Others',
    icon: '🛍️',
    color: '#10b981',
    reliefs: [
      { id: 'lifestyle',      label: 'Lifestyle Relief (books/gadgets/sports)', max: 2500, fixed: false, desc: 'Books, sports equipment, gym, internet, computer, phone', hint: 'RM 2,500 max (combined)' },
      { id: 'sports',         label: 'Sports Equipment / Facility',   max: 1000,  fixed: false, desc: 'Sports equipment, gym fees, sports facilities (within lifestyle)', hint: 'RM 1,000 max (within lifestyle)' },
      { id: 'breastfeeding',  label: 'Breastfeeding Equipment',       max: 1000,  fixed: false, desc: 'Breast pump, accessories for child under 2 years old', hint: 'RM 1,000 max (once every 2 years)' },
      { id: 'ev',             label: 'EV Charging Equipment',         max: 2500,  fixed: false, desc: 'Costs of EV charging facilities for personal vehicle', hint: 'RM 2,500 max' },
      { id: 'domestic_travel',label: 'Domestic Tourism & Hotel',      max: 1000,  fixed: false, desc: 'Hotel, resort, or domestic holiday packages in Malaysia', hint: 'RM 1,000 max' },
    ],
  },
]

// ── Tax bracket description ───────────────────────────────────
function getBracketLabel(income) {
  for (const b of TAX_BRACKETS) {
    if (income <= b.max) return `${(b.rate * 100).toFixed(0)}% bracket`
  }
  return '28% bracket'
}

// ── Number formatter ─────────────────────────────────────────
const fmtRM = (n, dec = 2) =>
  `RM ${Number(n || 0).toLocaleString('en-MY', { minimumFractionDigits: dec, maximumFractionDigits: dec })}`

// ── Relief Input Row ─────────────────────────────────────────
function ReliefRow({ relief, value, onChange }) {
  const pct = Math.min(100, ((value || 0) / relief.max) * 100)
  return (
    <div className={styles.reliefRow}>
      <div className={styles.reliefInfo}>
        <div className={styles.reliefLabel}>{relief.label}</div>
        <div className={styles.reliefDesc}>{relief.desc}</div>
      </div>
      <div className={styles.reliefRight}>
        {relief.fixed ? (
          <div className={styles.fixedBadge}>✅ RM {relief.max.toLocaleString()} (Auto)</div>
        ) : (
          <>
            <div className={styles.reliefInputWrap}>
              <span className={styles.reliefPrefix}>RM</span>
              <input
                type="number"
                min="0"
                max={relief.max}
                value={value || ''}
                placeholder="0"
                onChange={e => onChange(relief.id, Math.min(relief.max, parseFloat(e.target.value) || 0))}
              />
              <span className={styles.reliefMax}>/ {relief.max.toLocaleString()}</span>
            </div>
            <div className={styles.miniBar}>
              <div className={styles.miniBarFill} style={{ width: `${pct}%` }} />
            </div>
          </>
        )}
        <div className={styles.reliefHint}>{relief.hint}</div>
      </div>
    </div>
  )
}

// ── Section accordion ─────────────────────────────────────────
function ReliefSection({ section, values, onChange }) {
  const [open, setOpen] = useState(true)
  const total = section.reliefs.reduce((s, r) => s + (r.fixed ? r.max : (values[r.id] || 0)), 0)
  const maxTotal = section.reliefs.reduce((s, r) => s + r.max, 0)
  const pct = Math.min(100, (total / maxTotal) * 100)

  return (
    <div className={styles.section}>
      <button className={styles.sectionHeader} onClick={() => setOpen(o => !o)}>
        <span className={styles.sectionDot} style={{ background: section.color }} />
        <span className={styles.sectionIcon}>{section.icon}</span>
        <span className={styles.sectionLabel}>{section.label}</span>
        <div className={styles.sectionProgress}>
          <div className={styles.sectionBar}>
            <div className={styles.sectionBarFill} style={{ width: `${pct}%`, background: section.color }} />
          </div>
          <span className={styles.sectionTotal} style={{ color: section.color }}>
            RM {total.toLocaleString()}
          </span>
        </div>
        <span className={styles.sectionChevron}>{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className={styles.sectionBody}>
          {section.reliefs.map(r => (
            <ReliefRow key={r.id} relief={r} value={values[r.id] || (r.fixed ? r.max : 0)} onChange={onChange} />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────
export default function TaxRefund() {
  const [annualIncome,  setAnnualIncome]  = useState('')
  const [taxPaid,       setTaxPaid]       = useState('')
  const [taxYear,       setTaxYear]       = useState(2024)
  const [values,        setValues]        = useState({ self: 9000 })

  const setVal = (id, val) => setValues(prev => ({ ...prev, [id]: val }))

  // Pre-set self relief automatically
  const allValues = { ...values, self: 9000 }

  // ── Compute totals ──────────────────────────────────────────
  const result = useMemo(() => {
    const income = parseFloat(annualIncome) || 0
    if (income <= 0) return null

    // Sum all reliefs (capped)
    let totalRelief = 0
    const reliefBreakdown = []
    RELIEF_SECTIONS.forEach(sec => {
      sec.reliefs.forEach(r => {
        const val = r.fixed ? r.max : Math.min(r.max, allValues[r.id] || 0)
        if (val > 0) {
          totalRelief += val
          reliefBreakdown.push({ label: r.label, amount: val, color: sec.color, section: sec.label })
        }
      })
    })

    const chargeableIncome = Math.max(0, income - totalRelief)
    const taxPayable       = calcTax(chargeableIncome)
    const taxAlreadyPaid   = parseFloat(taxPaid) || 0
    const refund           = taxAlreadyPaid - taxPayable
    const taxWithoutRelief = calcTax(income)
    const taxSaved         = taxWithoutRelief - taxPayable
    const effectiveRate    = income > 0 ? (taxPayable / income) * 100 : 0
    const bracketInfo      = getTaxBracketInfo(chargeableIncome)

    return {
      income, totalRelief, chargeableIncome,
      taxPayable, taxAlreadyPaid, refund,
      taxWithoutRelief, taxSaved, effectiveRate,
      bracketInfo, reliefBreakdown,
    }
  }, [annualIncome, taxPaid, allValues])

  const maxPossibleRelief = RELIEF_SECTIONS.reduce((s, sec) =>
    s + sec.reliefs.reduce((ss, r) => ss + r.max, 0), 0)

  return (
    <div className={styles.wrap}>

      {/* ── Header ── */}
      <div className={styles.header}>
        <span className={styles.headerEmoji}>💰</span>
        <div>
          <h1 className={styles.headerTitle}>Malaysia Tax Relief & Refund Calculator</h1>
          <p className={styles.headerDesc}>Enter your income + reliefs to find out your tax refund or amount due</p>
        </div>
        <div className={styles.headerYear}>YA {taxYear}</div>
      </div>

      {/* ── Privacy notice ── */}
      <PrivacyNotice />

      {/* ── Disclaimer ── */}
      <div className={styles.disclaimer}>
        <span>⚠️</span>
        <span>
          <strong>Disclaimer:</strong> For estimation purposes only. Not tax advice. Consult{' '}
          <a href="https://www.hasil.gov.my" target="_blank" rel="noreferrer">LHDN (hasil.gov.my)</a>{' '}
          or a licensed tax agent for official filing. Applies to <strong>tax residents only</strong> (182+ days in Malaysia).
        </span>
      </div>

      {/* ── Data currency notice ── */}
      <div className={styles.dataNotice}>
        <span>📅</span>
        <span>
          Relief limits shown are based on <strong>YA 2024 / YA 2025</strong> as published by LHDN (last reviewed: <strong>7 March 2026</strong>).
          Tax laws and relief amounts <strong>change every year</strong> with the national budget.
          Always verify the latest figures on the official government website:{' '}
          <a href="https://www.hasil.gov.my" target="_blank" rel="noreferrer">www.hasil.gov.my</a>
        </span>
      </div>

      {/* ── Income inputs ── */}
      <div className={styles.incomeCard}>
        <div className={styles.incomeGrid}>

          <div className={styles.field}>
            <label>📅 Year of Assessment</label>
            <select value={taxYear} onChange={e => setTaxYear(Number(e.target.value))}>
              <option value={2024}>YA 2024</option>
              <option value={2025}>YA 2025</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>💰 Annual Income (Before Tax)</label>
            <div className={styles.inputRow}>
              <span>RM</span>
              <input
                type="number" min="0" placeholder="e.g. 60000"
                value={annualIncome}
                onChange={e => setAnnualIncome(e.target.value)}
              />
            </div>
            {annualIncome && <p className={styles.hint}>Monthly: RM {(parseFloat(annualIncome)/12||0).toLocaleString('en-MY',{maximumFractionDigits:0})}</p>}
          </div>

          <div className={styles.field}>
            <label>🏛️ Total Tax Already Paid (PCB/MTD)</label>
            <div className={styles.inputRow}>
              <span>RM</span>
              <input
                type="number" min="0" placeholder="Check your payslip total"
                value={taxPaid}
                onChange={e => setTaxPaid(e.target.value)}
              />
            </div>
            <p className={styles.hint}>PCB deducted from salary whole year — check your EA form or payslips</p>
          </div>

        </div>
      </div>

      {/* ── Live result banner (if income entered) ── */}
      {result && (
        <div className={`${styles.resultBanner} ${result.refund > 0 ? styles.bannerRefund : result.refund < 0 ? styles.bannerOwed : styles.bannerBreakeven}`}>
          <div className={styles.bannerMain}>
            {result.refund > 0 ? (
              <>
                <div className={styles.bannerEmoji}>🎉</div>
                <div>
                  <div className={styles.bannerLabel}>Estimated Tax Refund</div>
                  <div className={styles.bannerAmt}>{fmtRM(result.refund)}</div>
                </div>
              </>
            ) : result.refund < 0 ? (
              <>
                <div className={styles.bannerEmoji}>📋</div>
                <div>
                  <div className={styles.bannerLabel}>Tax Balance Due</div>
                  <div className={styles.bannerAmt}>{fmtRM(Math.abs(result.refund))}</div>
                </div>
              </>
            ) : (
              <>
                <div className={styles.bannerEmoji}>✅</div>
                <div>
                  <div className={styles.bannerLabel}>Perfectly Balanced</div>
                  <div className={styles.bannerAmt}>No refund, no balance</div>
                </div>
              </>
            )}
          </div>
          <div className={styles.bannerMeta}>
            <div className={styles.bannerMetaItem}>
              <span>Chargeable Income</span>
              <strong>{fmtRM(result.chargeableIncome, 0)}</strong>
            </div>
            <div className={styles.bannerMetaItem}>
              <span>Tax Payable</span>
              <strong>{fmtRM(result.taxPayable)}</strong>
            </div>
            <div className={styles.bannerMetaItem}>
              <span>Tax Bracket</span>
              <strong>{result.bracketInfo.label}</strong>
            </div>
            <div className={styles.bannerMetaItem}>
              <span>Effective Rate</span>
              <strong>{result.effectiveRate.toFixed(2)}%</strong>
            </div>
            <div className={styles.bannerMetaItem}>
              <span>Tax Saved by Reliefs</span>
              <strong className={styles.saved}>{fmtRM(result.taxSaved)}</strong>
            </div>
          </div>
        </div>
      )}

      {/* ── Two-column layout ── */}
      <div className={styles.mainGrid}>

        {/* Left: relief inputs */}
        <div className={styles.leftCol}>
          <div className={styles.colHeader}>
            <h2>📝 Enter Your Tax Reliefs</h2>
            <p>Fill in only what applies to you. All amounts in RM for YA {taxYear}.</p>
          </div>
          {RELIEF_SECTIONS.map(sec => (
            <ReliefSection key={sec.id} section={sec} values={allValues} onChange={setVal} />
          ))}
        </div>

        {/* Right: summary sidebar */}
        <div className={styles.rightCol}>

          {/* Relief summary card */}
          <div className={styles.summaryCard}>
            <div className={styles.summaryTitle}>📊 Relief Summary</div>

            {result ? (
              <>
                <div className={styles.summaryRow}>
                  <span>Annual Income</span>
                  <strong>{fmtRM(result.income, 0)}</strong>
                </div>
                <div className={styles.summaryDivider} />

                {result.reliefBreakdown.map((r, i) => (
                  <div key={i} className={styles.summaryRow}>
                    <span className={styles.reliefItem}>
                      <span className={styles.rDot} style={{ background: r.color }} />
                      {r.label}
                    </span>
                    <span className={styles.rAmt}>− {fmtRM(r.amount, 0)}</span>
                  </div>
                ))}

                <div className={styles.summaryDivider} />
                <div className={`${styles.summaryRow} ${styles.summaryHighlight}`}>
                  <span>Total Reliefs</span>
                  <strong className={styles.green}>− {fmtRM(result.totalRelief, 0)}</strong>
                </div>
                <div className={`${styles.summaryRow} ${styles.summaryHighlight}`}>
                  <span>Chargeable Income</span>
                  <strong>{fmtRM(result.chargeableIncome, 0)}</strong>
                </div>
                <div className={styles.summaryDivider} />
                <div className={styles.summaryRow}>
                  <span>Tax Without Relief</span>
                  <span className={styles.strikethrough}>{fmtRM(result.taxWithoutRelief)}</span>
                </div>
                <div className={`${styles.summaryRow} ${styles.summaryHighlight}`}>
                  <span>Tax Payable</span>
                  <strong className={styles.red}>{fmtRM(result.taxPayable)}</strong>
                </div>
                {taxPaid && (
                  <>
                    <div className={styles.summaryRow}>
                      <span>Tax Paid (PCB)</span>
                      <span>{fmtRM(result.taxAlreadyPaid)}</span>
                    </div>
                    <div className={`${styles.summaryRow} ${styles.summaryHighlight}`}>
                      <span>{result.refund >= 0 ? '🎉 Refund' : '📋 Balance Due'}</span>
                      <strong className={result.refund >= 0 ? styles.green : styles.red}>
                        {result.refund >= 0 ? '+' : ''}{fmtRM(result.refund)}
                      </strong>
                    </div>
                  </>
                )}

                <div className={styles.savedBox}>
                  <span>💡 Reliefs saved you</span>
                  <strong>{fmtRM(result.taxSaved)}</strong>
                </div>
              </>
            ) : (
              <div className={styles.emptyState}>
                👆 Enter your annual income above to see your tax summary
              </div>
            )}
          </div>

          {/* Max relief potential */}
          <div className={styles.tipCard}>
            <div className={styles.tipTitle}>💡 Max Possible Relief: RM {maxPossibleRelief.toLocaleString()}</div>
            <p>Most Indians in Malaysia can claim reliefs worth <strong>RM 25,000–40,000+</strong> per year by using EPF, insurance, medical, lifestyle, and education reliefs.</p>
          </div>

          {/* Quick tips */}
          <div className={styles.tipsCard}>
            <div className={styles.tipsTitle}>🇮🇳 Tips for Indians in Malaysia</div>
            <div className={styles.tipsList}>
              <div className={styles.tipItem}><span>✅</span><span><strong>EPF</strong> — 11% of salary auto-deducted. Claim up to RM 4,000</span></div>
              <div className={styles.tipItem}><span>✅</span><span><strong>Insurance</strong> — Buy life/medical insurance before year-end</span></div>
              <div className={styles.tipItem}><span>✅</span><span><strong>Laptop/Phone</strong> — Claim under Lifestyle Relief (RM 2,500)</span></div>
              <div className={styles.tipItem}><span>✅</span><span><strong>Books</strong> — Purchase books and keep receipts</span></div>
              <div className={styles.tipItem}><span>✅</span><span><strong>Medical checkup</strong> — RM 1,000 for annual health screening</span></div>
              <div className={styles.tipItem}><span>✅</span><span><strong>PRS</strong> — Private Retirement Scheme gives extra RM 3,000</span></div>
              <div className={styles.tipItem}><span>✅</span><span><strong>SOCSO</strong> — Auto-deducted. Claim the RM 350 relief</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* ── References ── */}
      <div className={styles.refs}>
        <div className={styles.refsTitle}>📚 Official References</div>
        <div className={styles.refsGrid}>
          <a href="https://www.hasil.gov.my/en/individual/individual-life-cycle/income-declaration/tax-reliefs/" target="_blank" rel="noreferrer" className={styles.refLink}>
            <span>🏛️</span><div><strong>LHDN — Tax Reliefs List</strong><span>hasil.gov.my — official reliefs by YA</span></div>
          </a>
          <a href="https://mytax.hasil.gov.my" target="_blank" rel="noreferrer" className={styles.refLink}>
            <span>🖥️</span><div><strong>MyTax e-Filing Portal</strong><span>File your return online at mytax.hasil.gov.my</span></div>
          </a>
          <a href="https://taxsummaries.pwc.com/malaysia/individual/deductions" target="_blank" rel="noreferrer" className={styles.refLink}>
            <span>📊</span><div><strong>PwC Malaysia Tax Summaries</strong><span>Detailed deduction breakdown by experts</span></div>
          </a>
          <a href="https://www.hasil.gov.my/en/individual/individual-life-cycle/income-declaration/" target="_blank" rel="noreferrer" className={styles.refLink}>
            <span>📋</span><div><strong>LHDN e-Filing Guide</strong><span>How to file Form BE — step by step</span></div>
          </a>
        </div>
      </div>

      {/* ── Full disclaimer ── */}
      <div className={styles.fullDisclaimer}>
        <strong>⚠️ Full Disclaimer</strong>
        <p>This calculator is provided by <strong>NikiBhavi</strong> for <strong>educational and informational purposes only</strong>. It does not constitute professional tax, legal, or financial advice.</p>
        <ul>
          <li>Only applicable to <strong>tax residents</strong> of Malaysia (individuals who have stayed ≥182 days in the calendar year).</li>
          <li>Tax relief limits shown are based on YA 2024/2025 as announced in Malaysia's national budget and published by LHDN. Limits may change in future years.</li>
          <li>EPF and life insurance reliefs share a combined cap of RM 7,000. The separate caps shown (RM 4,000 EPF + RM 3,000 life insurance) cannot exceed RM 7,000 total.</li>
          <li>Certain reliefs require receipts and documentation. LHDN may audit claims — keep all receipts for 7 years.</li>
          <li>This tool does not account for tax rebates (zakat, tax paid in error), business income, rental income, or non-salary income.</li>
          <li>PCB (Potongan Cukai Berjadual) deducted by your employer may differ from the actual tax payable due to additional income sources.</li>
          <li>Always use the official <a href="https://mytax.hasil.gov.my" target="_blank" rel="noreferrer">MyTax portal</a> for actual filing, or consult a registered tax agent.</li>
        </ul>
        <p>Filing deadline: <strong>30 April</strong> each year for individuals without business income (Form BE).</p>
      </div>

    </div>
  )
}
