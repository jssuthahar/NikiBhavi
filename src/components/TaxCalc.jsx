import { useState, useMemo } from 'react'
import styles from './TaxCalc.module.css'
import PrivacyNotice from './PrivacyNotice'

// ── Malaysia 2024–2026 progressive tax brackets (unchanged per Budget 2025) ──
// Source: LHDN hasil.gov.my & PWC Tax Summaries
const TAX_BRACKETS = [
  { min: 0,       max: 5000,    rate: 0,    base: 0      },
  { min: 5001,    max: 20000,   rate: 0.01, base: 0      },
  { min: 20001,   max: 35000,   rate: 0.03, base: 150    },
  { min: 35001,   max: 50000,   rate: 0.08, base: 600    },
  { min: 50001,   max: 70000,   rate: 0.13, base: 1800   },
  { min: 70001,   max: 100000,  rate: 0.21, base: 4400   },
  { min: 100001,  max: 130000,  rate: 0.24, base: 10700  },
  { min: 130001,  max: 250000,  rate: 0.245,base: 17900  },
  { min: 250001,  max: 400000,  rate: 0.25, base: 47250  },
  { min: 400001,  max: 600000,  rate: 0.26, base: 84750  },
  { min: 600001,  max: 1000000, rate: 0.28, base: 136750 },
  { min: 1000001, max: 2000000, rate: 0.30, base: 248750 },
  { min: 2000001, max: Infinity, rate: 0.30, base: 548750 },
]

function calcResidentTax(annualIncome) {
  // Standard personal relief RM 9,000 for resident
  const chargeable = Math.max(0, annualIncome - 9000)
  for (const b of TAX_BRACKETS) {
    if (chargeable <= b.max) {
      return b.base + (chargeable - b.min) * b.rate
    }
  }
  return 0
}

function calcNonResidentTax(annualIncome) {
  return annualIncome * 0.30
}

// ── Compute tax residency date ────────────────────────────────
function getTaxResidencyInfo(arrivalDateStr, taxYear) {
  if (!arrivalDateStr) return null
  const arrival = new Date(arrivalDateStr)
  const yearStart = new Date(`${taxYear}-01-01`)
  const yearEnd   = new Date(`${taxYear}-12-31`)

  if (arrival > yearEnd) return { status: 'not_arrived', daysInYear: 0 }

  const effectiveStart = arrival < yearStart ? yearStart : arrival
  const msPerDay = 86400000
  const daysInYear = Math.floor((yearEnd - effectiveStart) / msPerDay) + 1

  // Residency: 182 days in the calendar year
  const residentDate = new Date(effectiveStart.getTime() + (182 - 1) * msPerDay)
  const becomesResident = residentDate <= yearEnd

  return {
    arrival,
    effectiveStart,
    daysInYear,
    becomesResident,
    residentDate: becomesResident ? residentDate : null,
    nonResidentDays: becomesResident
      ? Math.floor((residentDate - effectiveStart) / msPerDay)
      : daysInYear,
    residentDays: becomesResident
      ? Math.floor((yearEnd - residentDate) / msPerDay) + 1
      : 0,
  }
}

// ── Monthly breakdown ─────────────────────────────────────────
function getMonthlyBreakdown(monthlySalary, arrivalDateStr, taxYear) {
  const info = getTaxResidencyInfo(arrivalDateStr, taxYear)
  if (!info || info.status === 'not_arrived') return []

  const months = []
  const annualSalary = monthlySalary * 12
  const annualResidentTax = calcResidentTax(annualSalary)
  const monthlyResidentTax = annualResidentTax / 12

  for (let m = 0; m < 12; m++) {
    const monthStart = new Date(taxYear, m, 1)
    const monthEnd   = new Date(taxYear, m + 1, 0)
    const monthName  = monthStart.toLocaleString('en-MY', { month:'short', year:'numeric' })

    const arrival = new Date(arrivalDateStr)
    if (arrival > monthEnd) {
      months.push({ month: monthName, salary: 0, tax: 0, rate: '—', status: 'before' })
      continue
    }

    let status, tax, rateLabel
    if (info.residentDate && monthStart >= new Date(info.residentDate.getFullYear(), info.residentDate.getMonth(), 1)) {
      status = 'resident'
      tax = monthlyResidentTax
      rateLabel = 'Progressive (Resident)'
    } else {
      status = 'nonresident'
      tax = monthlySalary * 0.30
      rateLabel = '30% (Non-resident)'
    }

    months.push({ month: monthName, salary: monthlySalary, tax, rateLabel, status })
  }
  return months
}

// ── Format date ───────────────────────────────────────────────
const fmtDate = d => d ? d.toLocaleDateString('en-MY', { day:'numeric', month:'long', year:'numeric' }) : '—'
const fmtRM   = n => `RM ${Number(n).toLocaleString('en-MY', { minimumFractionDigits:2, maximumFractionDigits:2 })}`

// ══════════════════════════════════════════════════════════════
export default function TaxCalc() {
  const [salary,      setSalary]      = useState('')
  const [taxYear,     setTaxYear]     = useState(2026)
  const [arrivalDate, setArrivalDate] = useState('')
  const [calculated,  setCalculated]  = useState(false)

  const months  = useMemo(() => {
    if (!calculated || !salary || !arrivalDate) return []
    return getMonthlyBreakdown(parseFloat(salary), arrivalDate, taxYear)
  }, [calculated, salary, arrivalDate, taxYear])

  const info = useMemo(() => {
    if (!arrivalDate) return null
    return getTaxResidencyInfo(arrivalDate, taxYear)
  }, [arrivalDate, taxYear])

  const summary = useMemo(() => {
    if (!months.length) return null
    const totalSalary = months.reduce((s, m) => s + m.salary, 0)
    const totalTax    = months.reduce((s, m) => s + m.tax,    0)
    return { totalSalary, totalTax, netIncome: totalSalary - totalTax }
  }, [months])

  const handleCalc = () => {
    if (!salary || !arrivalDate) return
    setCalculated(true)
  }

  const years = [2024, 2025, 2026, 2027]

  return (
    <div className={styles.wrap}>

      {/* ── Page header ── */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.headerEmoji}>🧾</span>
          <div>
            <h1 className={styles.headerTitle}>Malaysia Tax Residency Calculator</h1>
            <p className={styles.headerDesc}>Know exactly when you become a tax resident & how much tax you'll pay</p>
          </div>
        </div>
      </div>

      {/* ── Privacy notice ── */}
      <PrivacyNotice />

      {/* ── Disclaimer ── */}
      <div className={styles.disclaimer}>
        <span className={styles.discIcon}>⚠️</span>
        <div>
          <strong>Disclaimer</strong> — This calculator is for <em>estimation and educational purposes only</em>. It does not constitute tax advice.
          Tax laws change annually. Always consult a licensed tax professional or the official{' '}
          <a href="https://www.hasil.gov.my" target="_blank" rel="noreferrer">LHDN (hasil.gov.my)</a> for accurate filing.
          The 182-day rule shown here is the primary test; other residency tests may apply.
        </div>
      </div>

      {/* ── Data currency notice ── */}
      <div className={styles.disclaimer} style={{background:'#eff6ff',borderColor:'#93c5fd',color:'#1e40af'}}>
        <span className={styles.discIcon}>📅</span>
        <div>
          Tax brackets shown are based on <strong>YA 2024 onwards</strong> as published by LHDN (last reviewed: <strong>8 March 2026</strong>).
          Rates and brackets <strong>change with each national budget</strong> — always verify at the official government website:{' '}
          <a href="https://www.hasil.gov.my" target="_blank" rel="noreferrer" style={{color:'#1d4ed8',fontWeight:700}}>www.hasil.gov.my</a>
        </div>
      </div>

      {/* ── Inputs ── */}
      <div className={styles.inputCard}>
        <div className={styles.inputGrid}>

          {/* Monthly salary */}
          <div className={styles.field}>
            <label className={styles.label}>
              <span>1</span> Monthly Salary (Before Tax)
            </label>
            <div className={styles.inputRow}>
              <span className={styles.prefix}>RM</span>
              <input
                type="number"
                placeholder="e.g. 5000"
                value={salary}
                min="0"
                onChange={e => { setSalary(e.target.value); setCalculated(false) }}
              />
            </div>
          </div>

          {/* Tax year */}
          <div className={styles.field}>
            <label className={styles.label}>
              <span>2</span> Tax Year (Year of Assessment)
            </label>
            <select
              className={styles.select}
              value={taxYear}
              onChange={e => { setTaxYear(Number(e.target.value)); setCalculated(false) }}
            >
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          {/* Arrival date */}
          <div className={styles.field}>
            <label className={styles.label}>
              <span>3</span> Arrival Date in Malaysia
            </label>
            <input
              type="date"
              className={styles.dateInput}
              value={arrivalDate}
              min={`${taxYear}-01-01`}
              max={`${taxYear}-12-31`}
              onChange={e => { setArrivalDate(e.target.value); setCalculated(false) }}
            />
          </div>

        </div>

        {/* Residency preview (live, before calculate) */}
        {info && !info.status && (
          <div className={`${styles.residencyBadge} ${info.becomesResident ? styles.badgeGreen : styles.badgeOrange}`}>
            {info.becomesResident ? (
              <>
                ✅ You will become a <strong>Tax Resident</strong> on{' '}
                <strong>{fmtDate(info.residentDate)}</strong> ({info.daysInYear} days in {taxYear})
              </>
            ) : (
              <>
                ⚠️ You will <strong>NOT</strong> reach 182 days in {taxYear} — taxed as{' '}
                <strong>Non-Resident (30% flat)</strong> ({info.daysInYear} days in {taxYear})
              </>
            )}
          </div>
        )}

        <button
          className={styles.calcBtn}
          onClick={handleCalc}
          disabled={!salary || !arrivalDate}
        >
          ▶ Calculate Tax
        </button>
      </div>

      {/* ── Results ── */}
      {calculated && summary && (
        <>
          {/* Summary cards */}
          <div className={styles.summaryGrid}>
            <div className={`${styles.sumCard} ${styles.sumSalary}`}>
              <div className={styles.sumIcon}>💰</div>
              <div className={styles.sumVal}>{fmtRM(summary.totalSalary)}</div>
              <div className={styles.sumLabel}>Total Salary {taxYear}</div>
            </div>
            <div className={`${styles.sumCard} ${styles.sumTax}`}>
              <div className={styles.sumIcon}>🏛️</div>
              <div className={styles.sumVal}>{fmtRM(summary.totalTax)}</div>
              <div className={styles.sumLabel}>Total Tax Payable</div>
            </div>
            <div className={`${styles.sumCard} ${styles.sumNet}`}>
              <div className={styles.sumIcon}>🏦</div>
              <div className={styles.sumVal}>{fmtRM(summary.netIncome)}</div>
              <div className={styles.sumLabel}>Net Take-Home Pay</div>
            </div>
          </div>

          {/* Residency explanation box */}
          {info && !info.status && (
            <div className={styles.explainBox}>
              <div className={styles.explainTitle}>📋 How Your Tax Was Calculated</div>
              <p>
                You arrived on <strong>{fmtDate(info.arrival)}</strong>.
                {info.becomesResident ? (
                  <> Months before you complete <strong>182 days</strong> are taxed at the flat{' '}
                  <span className={styles.tagRed}>30% non-resident rate</span>.
                  After <strong>{fmtDate(info.residentDate)}</strong> you become a{' '}
                  <span className={styles.tagGreen}>Tax Resident</span> and Malaysia's{' '}
                  progressive brackets apply (0%–30%).</>
                ) : (
                  <> Since you will only be in Malaysia for <strong>{info.daysInYear} days</strong> in {taxYear},
                  all income is taxed at a flat <span className={styles.tagRed}>30% non-resident rate</span>.
                  Arrive before <strong>{fmtDate(new Date(taxYear, 0, 1 + (183 - Math.floor((new Date(arrivalDate) - new Date(`${taxYear}-01-01`)) / 86400000))))}</strong> next year to qualify as resident.</>
                )}
              </p>
            </div>
          )}

          {/* Legend */}
          <div className={styles.legend}>
            <div className={styles.legendItem}>
              <span className={`${styles.legendDot} ${styles.dotRed}`} />
              <span><strong>30% (Non-resident)</strong> — Flat rate, no deductions or reliefs</span>
            </div>
            <div className={styles.legendItem}>
              <span className={`${styles.legendDot} ${styles.dotGreen}`} />
              <span><strong>Progressive (Resident)</strong> — Monthly share of annual progressive tax</span>
            </div>
          </div>

          {/* Monthly table */}
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Salary (RM)</th>
                  <th>Tax (RM)</th>
                  <th>Rate</th>
                </tr>
              </thead>
              <tbody>
                {months.map((m, i) => (
                  <tr key={i} className={m.status === 'before' ? styles.rowBefore : m.status === 'resident' ? styles.rowResident : styles.rowNonResident}>
                    <td>{m.month}</td>
                    <td>{m.salary > 0 ? m.salary.toFixed(2) : '—'}</td>
                    <td>{m.tax > 0 ? m.tax.toFixed(2) : m.status === 'before' ? '—' : '0.00'}</td>
                    <td><span className={`${styles.rateTag} ${m.status === 'resident' ? styles.tagGreenSm : m.status === 'before' ? styles.tagGray : styles.tagRedSm}`}>{m.rateLabel}</span></td>
                  </tr>
                ))}
                <tr className={styles.totalRow}>
                  <td><strong>TOTAL</strong></td>
                  <td><strong>{fmtRM(summary.totalSalary)}</strong></td>
                  <td><strong>{fmtRM(summary.totalTax)}</strong></td>
                  <td>—</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 182-day timeline */}
          {info && !info.status && (
            <div className={styles.timeline}>
              <div className={styles.timelineTitle}>📅 Your 182-Day Residency Timeline — {taxYear}</div>
              <div className={styles.timelineBar}>
                <div
                  className={styles.tlNonRes}
                  style={{ width: `${(info.nonResidentDays / 366) * 100}%` }}
                  title={`${info.nonResidentDays} days @ 30%`}
                >
                  {info.nonResidentDays > 15 && <span>{info.nonResidentDays}d NR</span>}
                </div>
                {info.becomesResident && (
                  <div
                    className={styles.tlRes}
                    style={{ width: `${(info.residentDays / 366) * 100}%` }}
                    title={`${info.residentDays} days — Resident`}
                  >
                    {info.residentDays > 15 && <span>{info.residentDays}d Resident</span>}
                  </div>
                )}
                <div className={styles.tlRemain} style={{ flex: 1 }} />
              </div>
              <div className={styles.timelineLabels}>
                <span>Jan {taxYear}</span>
                {info.residentDate && <span style={{ marginLeft: `${(info.nonResidentDays / 366) * 100}%` }}>🏳️ {fmtDate(info.residentDate)}</span>}
                <span style={{ marginLeft: 'auto' }}>Dec {taxYear}</span>
              </div>
            </div>
          )}
        </>
      )}

      {/* ── References ── */}
      <div className={styles.references}>
        <div className={styles.refTitle}>📚 Official References</div>
        <div className={styles.refGrid}>
          <a href="https://www.hasil.gov.my/en/individual/individual-life-cycle/income-declaration/tax-rate/" target="_blank" rel="noreferrer" className={styles.refLink}>
            <span>🏛️</span>
            <div>
              <strong>LHDN — Official Tax Rates</strong>
              <span>hasil.gov.my — Malaysia Inland Revenue Board</span>
            </div>
          </a>
          <a href="https://www.hasil.gov.my/en/individual/individual-life-cycle/tax-residence/" target="_blank" rel="noreferrer" className={styles.refLink}>
            <span>📋</span>
            <div>
              <strong>LHDN — Tax Residency Rules</strong>
              <span>182-day rule & other residency tests</span>
            </div>
          </a>
          <a href="https://mytax.hasil.gov.my" target="_blank" rel="noreferrer" className={styles.refLink}>
            <span>🖥️</span>
            <div>
              <strong>MyTax Portal (e-Filing)</strong>
              <span>mytax.hasil.gov.my — official e-Filing</span>
            </div>
          </a>
          <a href="https://taxsummaries.pwc.com/malaysia/individual/taxes-on-personal-income" target="_blank" rel="noreferrer" className={styles.refLink}>
            <span>📊</span>
            <div>
              <strong>PwC Tax Summaries — Malaysia</strong>
              <span>Progressive brackets & rates reference</span>
            </div>
          </a>
        </div>
      </div>

      {/* ── Full disclaimer ── */}
      <div className={styles.fullDisclaimer}>
        <strong>⚠️ Full Disclaimer</strong>
        <p>This tool is provided by NikiBhavi for <strong>educational and informational purposes only</strong>. It is not a substitute for professional tax advice.</p>
        <ul>
          <li>Tax calculations use standard personal relief of RM 9,000 for residents. Actual relief depends on individual circumstances.</li>
          <li>The 182-day rule is the primary test. Other residency tests exist (e.g. 90-day rule for returning residents).</li>
          <li>Non-resident months are calculated at 30% flat — no deductions applied.</li>
          <li>Tax brackets shown are for YA 2024 onwards per LHDN. Rates may change in subsequent years.</li>
          <li>This tool does not account for Double Taxation Agreements (DTAs) between Malaysia and other countries.</li>
          <li>EPF, SOCSO, EIS deductions are not included in this simplified estimate.</li>
        </ul>
        <p>For official tax filing, use the <a href="https://mytax.hasil.gov.my" target="_blank" rel="noreferrer">MyTax Portal</a> or consult a registered tax agent in Malaysia.</p>
      </div>

    </div>
  )
}
