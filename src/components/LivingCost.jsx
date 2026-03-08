import { useState, useMemo, useRef } from 'react'
import { FAMILY_TYPES, EXPENSE_CATEGORIES, getDefaults } from '../data/livingCost'
import styles from './LivingCost.module.css'
import PrivacyNotice from './PrivacyNotice'

// ── PDF Export via print ─────────────────────────────────────
function exportPDF(data) {
  const { familyType, income, expenses, total, savings, yearlySavings, categoryTotals } = data
  const family = FAMILY_TYPES.find(f => f.id === familyType)
  const now = new Date().toLocaleDateString('en-MY', { day:'numeric', month:'long', year:'numeric' })
  const savingsPct = income > 0 ? ((savings / income) * 100).toFixed(1) : 0

  const catRows = EXPENSE_CATEGORIES.map(cat => {
    const catTotal = categoryTotals[cat.id] || 0
    if (catTotal === 0) return ''
    const itemRows = cat.items
      .filter(item => (expenses[item.id] || 0) > 0)
      .map(item => `
        <tr>
          <td style="padding:6px 12px;color:#555;font-size:13px;">${item.icon} ${item.label}</td>
          <td style="padding:6px 12px;text-align:right;font-size:13px;color:#333;">RM ${(expenses[item.id]||0).toLocaleString()}</td>
        </tr>`).join('')
    if (!itemRows) return ''
    return `
      <tr style="background:#f8f9fa;">
        <td colspan="2" style="padding:8px 12px;font-weight:700;font-size:13px;color:${cat.color};">${cat.icon} ${cat.label}</td>
      </tr>
      ${itemRows}
      <tr style="background:#fff3cd;">
        <td style="padding:5px 12px;font-weight:600;font-size:12px;color:#666;">Subtotal</td>
        <td style="padding:5px 12px;text-align:right;font-weight:700;font-size:12px;color:#333;">RM ${catTotal.toLocaleString()}</td>
      </tr>`
  }).join('')

  const months = Array.from({length:12},(_,i)=>i+1)
  const barMax = savings * 12
  const barRows = months.map(m => {
    const val = savings * m
    const pct = barMax > 0 ? (val/barMax*100).toFixed(0) : 0
    return `<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
      <div style="width:28px;text-align:right;font-size:11px;color:#888;">M${m}</div>
      <div style="flex:1;background:#f0f0f0;border-radius:4px;height:14px;overflow:hidden;">
        <div style="height:100%;width:${pct}%;background:linear-gradient(90deg,#C9F53B,#7cb800);border-radius:4px;"></div>
      </div>
      <div style="width:70px;text-align:right;font-size:11px;color:#333;font-weight:600;">RM ${val.toLocaleString()}</div>
    </div>`
  }).join('')

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>NikiBhavi Living Cost Report</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family: 'Segoe UI', sans-serif; background:#fff; color:#1a1a1a; }
  @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
</style>
</head>
<body>

<!-- HEADER -->
<div style="background:linear-gradient(135deg,#0d0d0d 0%,#1a2a0a 100%);padding:28px 32px;display:flex;align-items:center;justify-content:space-between;">
  <div>
    <div style="font-size:22px;font-weight:900;color:#C9F53B;letter-spacing:-0.5px;">NikiBhavi</div>
    <div style="font-size:12px;color:rgba(255,255,255,0.5);margin-top:3px;">Malaysia Life Guide for Indians</div>
  </div>
  <div style="text-align:right;">
    <div style="font-size:15px;font-weight:700;color:#fff;">Living Cost Report</div>
    <div style="font-size:11px;color:rgba(255,255,255,0.45);margin-top:3px;">${now}</div>
  </div>
</div>

<!-- PROFILE BANNER -->
<div style="background:#f5fce0;border-bottom:3px solid #C9F53B;padding:16px 32px;display:flex;gap:32px;align-items:center;flex-wrap:wrap;">
  <div style="display:flex;align-items:center;gap:10px;">
    <span style="font-size:28px;">${family.icon}</span>
    <div>
      <div style="font-size:13px;color:#666;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Family Type</div>
      <div style="font-size:16px;font-weight:800;color:#0d0d0d;">${family.label}</div>
    </div>
  </div>
  ${income > 0 ? `
  <div style="border-left:2px solid #C9F53B;padding-left:24px;">
    <div style="font-size:13px;color:#666;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Monthly Income</div>
    <div style="font-size:16px;font-weight:800;color:#0d0d0d;">RM ${Number(income).toLocaleString()}</div>
  </div>` : ''}
  <div style="border-left:2px solid #C9F53B;padding-left:24px;">
    <div style="font-size:13px;color:#666;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Total Expenses</div>
    <div style="font-size:16px;font-weight:800;color:#ef4444;">RM ${total.toLocaleString()}</div>
  </div>
  ${income > 0 ? `
  <div style="border-left:2px solid #C9F53B;padding-left:24px;">
    <div style="font-size:13px;color:#666;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Monthly Savings</div>
    <div style="font-size:16px;font-weight:800;color:${savings>=0?'#16a34a':'#ef4444'};">RM ${savings.toLocaleString()}</div>
  </div>
  <div style="border-left:2px solid #C9F53B;padding-left:24px;">
    <div style="font-size:13px;color:#666;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Savings Rate</div>
    <div style="font-size:16px;font-weight:800;color:${savings>=0?'#16a34a':'#ef4444'};">${savingsPct}%</div>
  </div>` : ''}
</div>

<!-- EXPENSE TABLE -->
<div style="padding:24px 32px;">
  <div style="font-size:16px;font-weight:800;color:#0d0d0d;margin-bottom:14px;">📊 Expense Breakdown</div>
  <table style="width:100%;border-collapse:collapse;border:1px solid #e8eaf0;border-radius:12px;overflow:hidden;">
    <thead>
      <tr style="background:#0d0d0d;">
        <th style="padding:10px 12px;text-align:left;font-size:12px;color:#C9F53B;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">Category / Item</th>
        <th style="padding:10px 12px;text-align:right;font-size:12px;color:#C9F53B;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">Amount (RM)</th>
      </tr>
    </thead>
    <tbody>
      ${catRows}
      <tr style="background:#0d0d0d;">
        <td style="padding:12px;font-weight:900;font-size:15px;color:#C9F53B;">💰 TOTAL EXPENSES</td>
        <td style="padding:12px;text-align:right;font-weight:900;font-size:15px;color:#C9F53B;">RM ${total.toLocaleString()}</td>
      </tr>
    </tbody>
  </table>
</div>

${income > 0 && savings > 0 ? `
<!-- SAVINGS PROJECTION -->
<div style="padding:0 32px 24px;">
  <div style="font-size:16px;font-weight:800;color:#0d0d0d;margin-bottom:14px;">📈 12-Month Savings Projection</div>
  <div style="background:#f8f9fa;border-radius:12px;padding:16px;">
    ${barRows}
    <div style="margin-top:12px;padding:10px 12px;background:#C9F53B;border-radius:8px;display:flex;justify-content:space-between;align-items:center;">
      <span style="font-weight:800;font-size:14px;color:#0d0d0d;">🎯 Total Yearly Savings</span>
      <span style="font-weight:900;font-size:16px;color:#0d0d0d;">RM ${yearlySavings.toLocaleString()}</span>
    </div>
  </div>
</div>` : ''}

<!-- TIPS -->
<div style="padding:0 32px 24px;">
  <div style="background:#fff3cd;border:1px solid #fbbf24;border-radius:12px;padding:16px;">
    <div style="font-size:13px;font-weight:800;color:#92400e;margin-bottom:8px;">💡 Money-Saving Tips for Indians in Malaysia</div>
    <ul style="list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:6px;">
      <li style="font-size:12px;color:#555;">✅ Cook at home — saves RM 300–500/month</li>
      <li style="font-size:12px;color:#555;">✅ Use Touch & Go for MRT — cheaper than Grab</li>
      <li style="font-size:12px;color:#555;">✅ Shop at Mydin / Giant for Indian groceries</li>
      <li style="font-size:12px;color:#555;">✅ Use Wise for remittance — best exchange rate</li>
      <li style="font-size:12px;color:#555;">✅ Brickfields for cheapest Indian food in KL</li>
      <li style="font-size:12px;color:#555;">✅ Hotlink prepaid — cheapest mobile plan</li>
    </ul>
  </div>
</div>

<!-- FOOTER -->
<div style="background:#0d0d0d;padding:20px 32px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
  <div>
    <div style="font-size:14px;font-weight:800;color:#C9F53B;">NikiBhavi</div>
    <div style="font-size:11px;color:rgba(255,255,255,0.45);margin-top:2px;">Real info for Indians in Malaysia. Always free.</div>
  </div>
  <div style="display:flex;gap:16px;align-items:center;">
    <div style="display:flex;align-items:center;gap:6px;">
      <div style="background:#FF0000;color:#fff;font-size:10px;font-weight:700;padding:3px 8px;border-radius:4px;">▶ YouTube</div>
      <span style="font-size:11px;color:rgba(255,255,255,0.6);">youtube.com/@NikiBhavi</span>
    </div>
    <div style="display:flex;align-items:center;gap:6px;">
      <div style="background:linear-gradient(135deg,#f09433,#dc2743);color:#fff;font-size:10px;font-weight:700;padding:3px 8px;border-radius:4px;">📸 Instagram</div>
      <span style="font-size:11px;color:rgba(255,255,255,0.6);">instagram.com/NikiBhavi</span>
    </div>
  </div>
  <div style="font-size:10px;color:rgba(255,255,255,0.3);">🇮🇳 ❤️ 🇲🇾 Generated by NikiBhavi · ${now}</div>
</div>

</body>
</html>`

  const win = window.open('', '_blank')
  win.document.write(html)
  win.document.close()
  win.focus()
  setTimeout(() => { win.print(); win.close() }, 600)
}

// ── Editable expense row ──────────────────────────────────────
function ExpenseRow({ item, value, onChange }) {
  return (
    <div className={styles.expRow}>
      <div className={styles.expLabel}>
        <span className={styles.expIcon}>{item.icon}</span>
        <span>{item.label}</span>
      </div>
      <div className={styles.expInput}>
        <span className={styles.expPrefix}>RM</span>
        <input
          type="number"
          min="0"
          value={value}
          onChange={e => onChange(item.id, Math.max(0, parseFloat(e.target.value) || 0))}
        />
      </div>
    </div>
  )
}

// ── Category section ─────────────────────────────────────────
function CategorySection({ cat, expenses, onChange, total }) {
  const [open, setOpen] = useState(true)
  return (
    <div className={styles.catSection}>
      <button className={styles.catHeader} onClick={() => setOpen(o => !o)}>
        <span className={styles.catDot} style={{ background: cat.color }} />
        <span className={styles.catIcon}>{cat.icon}</span>
        <span className={styles.catLabel}>{cat.label}</span>
        <span className={styles.catTotal} style={{ color: cat.color }}>RM {total.toLocaleString()}</span>
        <span className={styles.catChevron}>{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className={styles.catBody}>
          {cat.items.map(item => (
            <ExpenseRow
              key={item.id}
              item={item}
              value={expenses[item.id] ?? 0}
              onChange={onChange}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Donut chart (pure SVG) ────────────────────────────────────
function DonutChart({ segments }) {
  const total = segments.reduce((s, x) => s + x.value, 0)
  if (total === 0) return null
  let cumulative = 0
  const paths = segments.map((seg, i) => {
    if (seg.value === 0) return null
    const pct = seg.value / total
    const startAngle = cumulative * 2 * Math.PI - Math.PI / 2
    const endAngle = (cumulative + pct) * 2 * Math.PI - Math.PI / 2
    cumulative += pct
    const r = 45, cx = 60, cy = 60
    const x1 = cx + r * Math.cos(startAngle)
    const y1 = cy + r * Math.sin(startAngle)
    const x2 = cx + r * Math.cos(endAngle)
    const y2 = cy + r * Math.sin(endAngle)
    const large = pct > 0.5 ? 1 : 0
    return (
      <path
        key={i}
        d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} Z`}
        fill={seg.color}
        opacity={0.85}
      />
    )
  })
  return (
    <svg viewBox="0 0 120 120" className={styles.donut}>
      {paths}
      <circle cx="60" cy="60" r="28" fill="var(--ink2)" />
      <text x="60" y="57" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700">Total</text>
      <text x="60" y="69" textAnchor="middle" fill="#C9F53B" fontSize="8" fontWeight="800">RM {(total/1000).toFixed(1)}K</text>
    </svg>
  )
}

// ── Mini bar chart ────────────────────────────────────────────
function SavingsChart({ savings, months = 12 }) {
  if (savings <= 0) return null
  const bars = Array.from({ length: months }, (_, i) => (i + 1) * savings)
  const max = bars[bars.length - 1]
  return (
    <div className={styles.barChart}>
      {bars.map((v, i) => (
        <div key={i} className={styles.barCol}>
          <div className={styles.barWrap}>
            <div className={styles.bar} style={{ height: `${(v / max) * 100}%` }} />
          </div>
          <span className={styles.barLabel}>M{i + 1}</span>
        </div>
      ))}
    </div>
  )
}

// ── Share Panel ───────────────────────────────────────────────
function SharePanel({ data }) {
  const [copied, setCopied] = useState(false)
  const [showPanel, setShowPanel] = useState(false)

  const { familyType, income, total, savings, yearlySavings } = data
  const family = FAMILY_TYPES.find(f => f.id === familyType)
  const savingsPct = income > 0 ? ((savings / income) * 100).toFixed(1) : null

  const shareText = `🇮🇳➡️🇲🇾 Malaysia Living Cost Report by NikiBhavi

👨‍👩‍👧 Family: ${family.label}
💰 Monthly Income: RM ${income > 0 ? Number(income).toLocaleString() : 'N/A'}
💸 Total Expenses: RM ${total.toLocaleString()}
${income > 0 ? `🏦 Monthly Savings: RM ${savings.toLocaleString()} (${savingsPct}%)
📅 Yearly Savings: RM ${yearlySavings.toLocaleString()}` : ''}

📊 Calculate yours FREE 👇
🎥 youtube.com/@NikiBhavi
📸 instagram.com/NikiBhavi

#Malaysia #IndiansinMalaysia #NikiBhavi #MalaysiaLife #ExpenseTracker`

  const encodedText = encodeURIComponent(shareText)
  const pageUrl = encodeURIComponent('https://youtube.com/@NikiBhavi')

  const platforms = [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: '💬',
      color: '#25D366',
      url: `https://api.whatsapp.com/send?text=${encodedText}`,
    },
    {
      id: 'telegram',
      label: 'Telegram',
      icon: '✈️',
      color: '#2AABEE',
      url: `https://t.me/share/url?url=${pageUrl}&text=${encodedText}`,
    },
    {
      id: 'twitter',
      label: 'X / Twitter',
      icon: '🐦',
      color: '#000000',
      url: `https://twitter.com/intent/tweet?text=${encodedText}`,
    },
    {
      id: 'facebook',
      label: 'Facebook',
      icon: '👥',
      color: '#1877F2',
      url: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}&quote=${encodedText}`,
    },
    {
      id: 'instagram',
      label: 'Instagram',
      icon: '📸',
      color: '#E1306C',
      action: 'copy', // Instagram doesn't support direct share URLs — copy to clipboard
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: '💼',
      color: '#0A66C2',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`,
    },
  ]

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // fallback
      const el = document.createElement('textarea')
      el.value = shareText
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My Malaysia Living Cost — NikiBhavi', text: shareText })
      } catch { /* user cancelled */ }
    } else {
      setShowPanel(true)
    }
  }

  return (
    <div className={styles.shareWrap}>
      {/* Main share button */}
      <button className={styles.shareMainBtn} onClick={() => setShowPanel(o => !o)}>
        <span>🔗</span>
        <span>Share My Report</span>
        <span className={styles.shareChevron}>{showPanel ? '▲' : '▼'}</span>
      </button>

      {/* Share panel */}
      {showPanel && (
        <div className={styles.sharePanel}>
          <div className={styles.sharePanelTitle}>Share via</div>

          <div className={styles.shareGrid}>
            {platforms.map(p => (
              <a
                key={p.id}
                href={p.url || '#'}
                target={p.url ? '_blank' : undefined}
                rel="noreferrer"
                className={styles.sharePlatform}
                style={{ '--pcolor': p.color }}
                onClick={p.action === 'copy' ? (e) => { e.preventDefault(); handleCopy() } : undefined}
                title={p.id === 'instagram' ? 'Copy text — paste in Instagram caption' : `Share on ${p.label}`}
              >
                <span className={styles.platformIcon}>{p.icon}</span>
                <span className={styles.platformLabel}>{p.label}</span>
                {p.action === 'copy' && <span className={styles.platformHint}>Copy</span>}
              </a>
            ))}
          </div>

          {/* Native share (mobile) */}
          {'share' in navigator && (
            <button className={styles.nativeShareBtn} onClick={handleNativeShare}>
              📤 More sharing options…
            </button>
          )}

          {/* Copy text */}
          <div className={styles.copyRow}>
            <div className={styles.copyPreview}>{shareText.substring(0, 80)}…</div>
            <button className={`${styles.copyBtn} ${copied ? styles.copied : ''}`} onClick={handleCopy}>
              {copied ? '✅ Copied!' : '📋 Copy Text'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ══════════════════════════════════════════════════════════════
export default function LivingCost() {
  const [familyType, setFamilyType] = useState('single')
  const [income, setIncome] = useState('')
  const [expenses, setExpenses] = useState(() => getDefaults('single'))

  const setFamily = (id) => {
    setFamilyType(id)
    setExpenses(getDefaults(id))
  }

  const setExpense = (id, val) => setExpenses(prev => ({ ...prev, [id]: val }))

  const { total, savings, yearlySavings, categoryTotals, donutSegments } = useMemo(() => {
    const total = Object.values(expenses).reduce((s, v) => s + (v || 0), 0)
    const inc = parseFloat(income) || 0
    const savings = inc - total
    const yearlySavings = savings * 12
    const categoryTotals = {}
    const donutSegments = []
    EXPENSE_CATEGORIES.forEach(cat => {
      const catTotal = cat.items.reduce((s, item) => s + (expenses[item.id] || 0), 0)
      categoryTotals[cat.id] = catTotal
      if (catTotal > 0) donutSegments.push({ label: cat.label, value: catTotal, color: cat.color })
    })
    return { total, savings, yearlySavings, categoryTotals, donutSegments }
  }, [expenses, income])

  const incomeNum = parseFloat(income) || 0
  const savingsPct = incomeNum > 0 ? ((savings / incomeNum) * 100).toFixed(1) : null

  const handleExport = () => exportPDF({
    familyType, income: incomeNum, expenses, total, savings, yearlySavings, categoryTotals,
  })

  return (
    <div className={styles.wrap}>

      {/* ── Header ── */}
      <div className={styles.pageHeader}>
        <div className={styles.headerEmoji}>🏡</div>
        <div>
          <h1 className={styles.headerTitle}>Living Cost Calculator</h1>
          <p className={styles.headerDesc}>Estimate your monthly expenses in Malaysia — Single, Couple, or Family</p>
        </div>
      </div>

      {/* ── Privacy notice ── */}
      <PrivacyNotice />

      {/* ── Family type selector ── */}
      <div className={styles.familyGrid}>
        {FAMILY_TYPES.map(f => (
          <button
            key={f.id}
            className={`${styles.familyBtn} ${familyType === f.id ? styles.familyActive : ''}`}
            onClick={() => setFamily(f.id)}
          >
            <span className={styles.familyIcon}>{f.icon}</span>
            <span className={styles.familyLabel}>{f.label}</span>
            <span className={styles.familyDesc}>{f.desc}</span>
          </button>
        ))}
      </div>

      {/* ── Income input ── */}
      <div className={styles.incomeCard}>
        <div className={styles.incomeLabel}>
          <span>💰</span>
          <span>Monthly Income (After Tax)</span>
        </div>
        <div className={styles.incomeInput}>
          <span className={styles.incomePrefix}>RM</span>
          <input
            type="number"
            placeholder="e.g. 5000"
            value={income}
            min="0"
            onChange={e => setIncome(e.target.value)}
          />
          {incomeNum > 0 && (
            <span className={styles.incomeINR}>≈ ₹{(incomeNum * 19).toLocaleString('en-IN')}</span>
          )}
        </div>
        <p className={styles.incomeHint}>Enter your take-home salary to calculate savings</p>
      </div>

      {/* ── Summary cards ── */}
      <div className={styles.summaryGrid}>
        <div className={`${styles.sumCard} ${styles.sumExpense}`}>
          <div className={styles.sumIcon}>💸</div>
          <div className={styles.sumVal}>RM {total.toLocaleString()}</div>
          <div className={styles.sumLabel}>Total Expenses / Month</div>
        </div>
        {incomeNum > 0 && (
          <>
            <div className={`${styles.sumCard} ${savings >= 0 ? styles.sumSaving : styles.sumDeficit}`}>
              <div className={styles.sumIcon}>{savings >= 0 ? '🏦' : '⚠️'}</div>
              <div className={styles.sumVal}>RM {Math.abs(savings).toLocaleString()}</div>
              <div className={styles.sumLabel}>{savings >= 0 ? `Savings / Month (${savingsPct}%)` : 'Deficit / Month'}</div>
            </div>
            <div className={`${styles.sumCard} ${savings >= 0 ? styles.sumYearly : styles.sumDeficit}`}>
              <div className={styles.sumIcon}>{savings >= 0 ? '📅' : '📉'}</div>
              <div className={styles.sumVal}>RM {Math.abs(yearlySavings).toLocaleString()}</div>
              <div className={styles.sumLabel}>{savings >= 0 ? 'Yearly Savings' : 'Yearly Deficit'}</div>
            </div>
          </>
        )}
      </div>

      {/* ── Main body: chart + categories ── */}
      <div className={styles.mainBody}>

        {/* Left: categories */}
        <div className={styles.categories}>
          <div className={styles.catTitle}>✏️ Edit Expenses</div>
          <p className={styles.catHint}>Pre-filled based on your family type — adjust as needed</p>
          {EXPENSE_CATEGORIES.map(cat => (
            <CategorySection
              key={cat.id}
              cat={cat}
              expenses={expenses}
              onChange={setExpense}
              total={categoryTotals[cat.id] || 0}
            />
          ))}
        </div>

        {/* Right: charts & legend */}
        <div className={styles.sidebar}>

          {/* Donut chart */}
          <div className={styles.chartCard}>
            <div className={styles.chartTitle}>Expense Breakdown</div>
            <DonutChart segments={donutSegments} />
            <div className={styles.legend}>
              {donutSegments.map((s, i) => (
                <div key={i} className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ background: s.color }} />
                  <span className={styles.legendLabel}>{s.label}</span>
                  <span className={styles.legendVal}>RM {s.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Savings projection chart */}
          {savings > 0 && (
            <div className={styles.chartCard}>
              <div className={styles.chartTitle}>📈 12-Month Savings</div>
              <SavingsChart savings={savings} />
              <div className={styles.projTotal}>
                <span>By Month 12:</span>
                <strong>RM {yearlySavings.toLocaleString()}</strong>
              </div>
            </div>
          )}

          {/* Deficit warning */}
          {incomeNum > 0 && savings < 0 && (
            <div className={styles.warningCard}>
              <div className={styles.warnIcon}>⚠️</div>
              <strong>Expenses exceed income!</strong>
              <p>You're spending RM {Math.abs(savings).toLocaleString()} more than you earn. Review your expenses — especially rent, remittance, and eating out.</p>
            </div>
          )}

          {/* Export button */}
          <button className={styles.exportBtn} onClick={handleExport}>
            <span>📄</span>
            <span>Export PDF Report</span>
          </button>

          {/* Share panel */}
          <SharePanel data={{ familyType, income: incomeNum, total, savings, yearlySavings }} />

          <div className={styles.exportNote}>
            PDF includes expense breakdown, savings chart & NikiBhavi YouTube / Instagram links
          </div>
        </div>
      </div>

    </div>
  )
}
