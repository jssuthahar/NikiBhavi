import { useState, useEffect, useCallback } from 'react'
import styles from './LiveRates.module.css'

const REFRESH_MS = 5 * 60 * 1000
const GRAMS_PER_OZ = 31.1035

// ── Try multiple free currency APIs until one works ──────────
async function getMyrRates() {
  const apis = [
    async () => {
      const r = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/myr.json', { cache: 'no-store' })
      const d = await r.json()
      return { myr_inr: d.myr.inr, myr_usd: d.myr.usd }
    },
    async () => {
      const r = await fetch('https://latest.currency-api.pages.dev/v1/currencies/myr.json', { cache: 'no-store' })
      const d = await r.json()
      return { myr_inr: d.myr.inr, myr_usd: d.myr.usd }
    },
    async () => {
      const r = await fetch('https://open.er-api.com/v6/latest/MYR', { cache: 'no-store' })
      const d = await r.json()
      return { myr_inr: d.rates.INR, myr_usd: d.rates.USD }
    },
    async () => {
      const r = await fetch('https://api.frankfurter.app/latest?from=MYR&to=INR,USD', { cache: 'no-store' })
      const d = await r.json()
      return { myr_inr: d.rates.INR, myr_usd: d.rates.USD }
    },
  ]
  for (const fn of apis) {
    try {
      const res = await fn()
      if (res.myr_inr > 0 && res.myr_usd > 0) return res
    } catch { /* try next */ }
  }
  throw new Error('All currency APIs failed')
}

// ── Try multiple free gold APIs ──────────────────────────────
async function getGoldUsdPerOz() {
  const apis = [
    async () => {
      const r = await fetch('https://gold-api.com/price/XAU', { cache: 'no-store' })
      const d = await r.json()
      const p = d?.price ?? d?.ask ?? d?.rate
      if (!p || p < 500) throw new Error('bad')
      return p
    },
    async () => {
      const r = await fetch('https://api.metals.live/v1/spot/gold', { cache: 'no-store' })
      const d = await r.json()
      const p = Array.isArray(d) ? (d[0]?.gold ?? d[0]?.price) : (d?.price ?? d?.gold)
      if (!p || p < 500) throw new Error('bad')
      return p
    },
    async () => {
      // goldprice.org via allorigins CORS proxy
      const url = encodeURIComponent('https://data-asg.goldprice.org/dbXRates/USD')
      const r = await fetch(`https://api.allorigins.win/get?url=${url}`, { cache: 'no-store' })
      const w = await r.json()
      const d = JSON.parse(w.contents)
      const p = d?.items?.[0]?.xauPrice
      if (!p || p < 500) throw new Error('bad')
      return p
    },
  ]
  for (const fn of apis) {
    try { return await fn() } catch { /* try next */ }
  }
  throw new Error('All gold APIs failed')
}

async function fetchLiveRates() {
  const [{ myr_inr, myr_usd }, goldUsdPerOz] = await Promise.all([
    getMyrRates(),
    getGoldUsdPerOz(),
  ])
  const usd_to_myr = 1 / myr_usd
  const usd_to_inr = myr_inr / myr_usd
  return {
    myr_to_inr:       myr_inr,
    inr_to_myr:       1 / myr_inr,
    gold_myr_per_gram: (goldUsdPerOz / GRAMS_PER_OZ) * usd_to_myr,
    gold_inr_per_gram: (goldUsdPerOz / GRAMS_PER_OZ) * usd_to_inr,
    gold_usd_per_oz:   goldUsdPerOz,
    fetched_at: new Date(),
  }
}

// ── Arrow ────────────────────────────────────────────────────
function Arrow({ dir }) {
  if (dir === 'up')   return <span className={`${styles.arrow} ${styles.up}`}>▲</span>
  if (dir === 'down') return <span className={`${styles.arrow} ${styles.down}`}>▼</span>
  return null
}

// ── Rate card ────────────────────────────────────────────────
function RateCard({ icon, title, value, sub, unit, trend, highlight }) {
  return (
    <div className={`${styles.rateCard} ${highlight ? styles.highlight : ''}`}>
      <div className={styles.cardHeader}>
        <span className={styles.cardIcon}>{icon}</span>
        <span className={styles.cardTitle}>{title}</span>
        <Arrow dir={trend} />
      </div>
      <div className={styles.cardValue}>
        <span className={styles.unit}>{unit}</span>
        <span className={styles.amount}>{value}</span>
      </div>
      <div className={styles.cardSub}>{sub}</div>
    </div>
  )
}

// ── Skeleton ─────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className={styles.grid}>
      {[1,2,3,4].map(i => (
        <div key={i} className={`${styles.rateCard} ${styles.skeleton}`}>
          <div className={styles.skLine} style={{ width:'55%', height:11, marginBottom:10 }} />
          <div className={styles.skLine} style={{ width:'75%', height:26, marginBottom:8 }} />
          <div className={styles.skLine} style={{ width:'45%', height:10 }} />
        </div>
      ))}
    </div>
  )
}

// ── Converter ────────────────────────────────────────────────
function Converter({ rate }) {
  const [myr, setMyr] = useState('100')
  const inr = myr && !isNaN(myr) ? (parseFloat(myr) * rate).toFixed(2) : ''
  return (
    <div className={styles.converter}>
      <div className={styles.convTitle}>⚡ Quick Converter</div>
      <div className={styles.convRow}>
        <div className={styles.convField}>
          <label>Malaysian Ringgit</label>
          <div className={styles.convInput}>
            <span className={styles.convPrefix}>RM</span>
            <input type="number" value={myr} onChange={e => setMyr(e.target.value)} placeholder="0" min="0" />
          </div>
        </div>
        <div className={styles.convEq}>=</div>
        <div className={styles.convField}>
          <label>Indian Rupees</label>
          <div className={`${styles.convInput} ${styles.convOutput}`}>
            <span className={styles.convPrefix}>₹</span>
            <input type="number" value={inr} readOnly placeholder="0" />
          </div>
        </div>
      </div>
      <div className={styles.convHint}>Rate: RM 1 = ₹{rate.toFixed(2)}</div>
    </div>
  )
}

// ── Main widget ──────────────────────────────────────────────
export default function LiveRates() {
  const [rates,     setRates]     = useState(null)
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState(null)
  const [prevRates, setPrevRates] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchLiveRates()
      setRates(old => { if (old) setPrevRates(old); return data })
    } catch (e) {
      console.error('[LiveRates]', e.message)
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
    const id = setInterval(load, REFRESH_MS)
    return () => clearInterval(id)
  }, [load])

  const trend = key => {
    if (!prevRates || !rates) return 'flat'
    const d = rates[key] - prevRates[key]
    return d > 0 ? 'up' : d < 0 ? 'down' : 'flat'
  }

  const fmt = (n, dec = 2) =>
    n != null
      ? Number(n).toLocaleString('en-IN', { minimumFractionDigits: dec, maximumFractionDigits: dec })
      : '—'

  const timeStr = rates?.fetched_at
    ? rates.fetched_at.toLocaleTimeString('en-MY', { hour:'2-digit', minute:'2-digit', timeZone:'Asia/Kuala_Lumpur' })
    : null

  return (
    <div className={styles.widget}>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={`${styles.liveDot} ${loading ? styles.loadingDot : ''}`} />
          <span className={styles.headerTitle}>Live Rates</span>
          <span className={styles.headerSub}>MYR · INR · Gold</span>
        </div>
        <div className={styles.headerRight}>
          {timeStr && <span className={styles.updated}>Updated {timeStr} MYT</span>}
          <button className={styles.refreshBtn} onClick={load} disabled={loading} title="Refresh">
            <span className={loading ? styles.spinning : ''}>↻</span>
          </button>
        </div>
      </div>

      {/* Loading skeleton (first load only) */}
      {loading && !rates && <Skeleton />}

      {/* Error — only shown if no data yet */}
      {error && !rates && (
        <div className={styles.errorBox}>
          <div className={styles.errorMsg}>
            <span>⚠️</span>
            <div>
              <strong>Could not load live rates</strong>
              <p>Check your internet connection and try again.</p>
            </div>
          </div>
          <button className={styles.retryBtn} onClick={load}>↻ Retry</button>
        </div>
      )}

      {/* Live rates grid */}
      {rates && (
        <>
          <div className={styles.grid}>
            <RateCard
              icon="💱" title="MYR → INR" highlight
              value={fmt(rates.myr_to_inr, 2)} unit="₹"
              sub="per 1 Malaysian Ringgit"
              trend={trend('myr_to_inr')}
            />
            <RateCard
              icon="💱" title="INR → MYR"
              value={fmt(rates.inr_to_myr, 4)} unit="RM"
              sub="per 1 Indian Rupee"
              trend={trend('inr_to_myr')}
            />
            <RateCard
              icon="🥇" title="Gold · Malaysia"
              value={fmt(rates.gold_myr_per_gram, 2)} unit="RM"
              sub="per gram · 24K"
              trend={trend('gold_myr_per_gram')}
            />
            <RateCard
              icon="🥇" title="Gold · India"
              value={fmt(rates.gold_inr_per_gram, 0)} unit="₹"
              sub="per gram · 24K"
              trend={trend('gold_inr_per_gram')}
            />
          </div>

          <Converter rate={rates.myr_to_inr} />

          <div className={styles.sourceNote}>
            📡 Live data · Refreshes every 5 min
            {loading && <span className={styles.refreshingTag}> · Updating…</span>}
          </div>
        </>
      )}

    </div>
  )
}
