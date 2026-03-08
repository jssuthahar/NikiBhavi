import { useState, useEffect } from 'react'
import { renderPDF } from './pdfExport'
import styles from './RemittanceCalc.module.css'
import PrivacyNotice from './PrivacyNotice'

const PROVIDERS = [
  { id: 'wise',     name: 'Wise',         icon: '💚', color: '#00B9FF', fee: 0.0065, minFee: 5,   time: '1–2 hours',  url: 'https://wise.com', tag: 'Best Rate' },
  { id: 'remitly',  name: 'Remitly',      icon: '🔵', color: '#1A56DB', fee: 0.008,  minFee: 0,   time: '3–5 mins',   url: 'https://remitly.com', tag: 'Fast' },
  { id: 'instarem', name: 'InstaReM',     icon: '🟣', color: '#7C3AED', fee: 0.007,  minFee: 0,   time: '1 day',      url: 'https://instarem.com', tag: 'Popular' },
  { id: 'maybank',  name: 'Maybank TT',   icon: '🏦', color: '#FFCC00', fee: 0.015,  minFee: 15,  time: '1–2 days',   url: 'https://maybank2u.com.my', tag: 'Bank' },
  { id: 'cimb',     name: 'CIMB Clicks',  icon: '🏦', color: '#c00',    fee: 0.016,  minFee: 10,  time: '1–2 days',   url: 'https://cimbclicks.com.my', tag: 'Bank' },
  { id: 'western',  name: 'Western Union', icon: '🟡', color: '#FFD700', fee: 0.022,  minFee: 5,   time: '10 mins',    url: 'https://westernunion.com', tag: 'Global' },
]

const BASE_RATE = 19.5 // 1 MYR ≈ ₹19.5 INR (approximate mid-2026, verify before transfer)

export default function RemittanceCalc() {
  const [amount, setAmount]       = useState('1000')
  const [spread, setSpread]       = useState(0.5) // % spread added to mid-rate

  const midRate = BASE_RATE
  const amtNum  = parseFloat(amount) || 0

  const results = PROVIDERS.map(p => {
    const fee       = Math.max(p.minFee, amtNum * p.fee)
    const netSend   = Math.max(0, amtNum - fee)
    const exchRate  = midRate * (1 - spread / 100)
    const received  = netSend * exchRate
    return { ...p, fee, netSend, exchRate, received }
  }).sort((a, b) => b.received - a.received)

  const best = results[0]


  const exportPDF = () => {
    renderPDF(
      'Remittance Calculator',
      `Sending RM ${Number(amount).toLocaleString()} to India`,
      [
        { type:'summary', title:'Best Providers', items: results.slice(0,4).map((r,i) => ({
            label: r.name, value:`₹ ${Math.round(r.received).toLocaleString()}`,
            sub:`Fee: RM ${r.fee}`, highlight: i === 0
          }))
        },
        { type:'table', title:'All Providers', headers:[
          { label:'Provider', align:'left' },
          { label:'Fee (RM)', align:'right' },
          { label:'Rate (₹/RM)', align:'right' },
          { label:'You Receive (₹)', align:'right', bold:true },
        ],
        rows: results.map(r => [
          r.name, `RM ${r.fee}`, r.exchRate.toFixed(2),
          { value:`₹ ${Math.round(r.received).toLocaleString()}`, color:'#16a34a' }
        ])},
      ],
      { alert:'Rates are estimates. Always verify live rates before transferring.' }
    )
  }
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.headerEmoji}>💸</span>
        <div>
          <h1 className={styles.headerTitle}>Remittance Calculator</h1>
          <button className={styles.pdfBtn} onClick={exportPDF}>📄 Export PDF</button>
        <p className={styles.headerDesc}>Compare Wise, Remitly, InstaReM, Banks — send money to India smartly</p>
        </div>
      </div>

      <PrivacyNotice />

      <div className={styles.notice}>
        <span>⚠️</span>
        <span>Rates shown use an approximate mid-market rate of <strong>1 MYR ≈ ₹{BASE_RATE}</strong>. Actual rates vary daily. Always check the provider's app for live rates before transferring.</span>
      </div>

      <div className={styles.inputCard}>
        <div className={styles.inputRow}>
          <div className={styles.field}>
            <label>💰 Amount to Send (MYR)</label>
            <div className={styles.inputWrap}>
              <span className={styles.prefix}>RM</span>
              <input type="number" min="0" value={amount} onChange={e => setAmount(e.target.value)} placeholder="e.g. 1000" />
            </div>
          </div>
          <div className={styles.field}>
            <label>📊 Exchange Rate Spread (%)</label>
            <div className={styles.sliderWrap}>
              <input type="range" min="0" max="3" step="0.1" value={spread} onChange={e => setSpread(parseFloat(e.target.value))} />
              <span className={styles.sliderVal}>{spread.toFixed(1)}% below mid-rate</span>
            </div>
          </div>
        </div>
        {amtNum > 0 && (
          <div className={styles.bestBanner}>
            🏆 Best deal: <strong>{best.name}</strong> — family receives <strong>₹{best.received.toLocaleString('en-IN', {maximumFractionDigits:0})}</strong> (saves ₹{(best.received - results[results.length-1].received).toLocaleString('en-IN', {maximumFractionDigits:0})} vs worst option)
          </div>
        )}
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Provider</th>
              <th>Fee (RM)</th>
              <th>Rate (1 MYR)</th>
              <th>India Receives (₹)</th>
              <th>Speed</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {results.map((p, i) => (
              <tr key={p.id} className={i === 0 ? styles.bestRow : ''}>
                <td>
                  <div className={styles.providerCell}>
                    <span className={styles.provIcon}>{p.icon}</span>
                    <div>
                      <div className={styles.provName}>{p.name}</div>
                      <span className={styles.provTag} style={{background: i===0?'#f5fce0':undefined, color: i===0?'#3d7200':undefined}}>{i===0?'👑 Best':p.tag}</span>
                    </div>
                  </div>
                </td>
                <td><span className={styles.fee}>RM {p.fee.toFixed(2)}</span></td>
                <td><span className={styles.rate}>₹{p.exchRate.toFixed(3)}</span></td>
                <td>
                  <span className={`${styles.received} ${i===0?styles.bestReceived:''}`}>
                    ₹{p.received.toLocaleString('en-IN', {maximumFractionDigits:0})}
                  </span>
                  {i > 0 && amtNum > 0 && <div className={styles.diff}>−₹{(best.received - p.received).toLocaleString('en-IN', {maximumFractionDigits:0})}</div>}
                </td>
                <td><span className={styles.time}>{p.time}</span></td>
                <td><a href={p.url} target="_blank" rel="noreferrer" className={styles.sendBtn}>Send →</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.tipsGrid}>
        {[
          { icon:'💡', t:'Use Wise for best rates', d:'Wise uses mid-market rate with a small transparent fee — usually the cheapest for large amounts.' },
          { icon:'⚡', t:'Remitly is fastest', d:'Delivers in minutes to Indian bank accounts. Good for urgent transfers.' },
          { icon:'🕐', t:'Best time to transfer', d:'Rates are usually better on weekday mornings (Malaysian time) when forex markets are active.' },
          { icon:'💳', t:'Avoid bank TT', d:'Malaysian bank telegraphic transfers typically have 1.5–2% spread + fixed fees. Use Wise or InstaReM instead.' },
        ].map((tip,i) => (
          <div key={i} className={styles.tipCard}>
            <span className={styles.tipIcon}>{tip.icon}</span>
            <div><div className={styles.tipTitle}>{tip.t}</div><p className={styles.tipText}>{tip.d}</p></div>
          </div>
        ))}
      </div>
    </div>
  )
}
