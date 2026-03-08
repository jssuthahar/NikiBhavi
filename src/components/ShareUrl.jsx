import { useState } from 'react'
import styles from './ShareUrl.module.css'

const PAGE_TO_SLUG = {
  home:       'home',
  visa:       'visa',
  epass:      'employee-pass',
  tourist:    'tourist-visa',
  student:    'student-visa',
  housing:    'housing',
  bank:       'banking',
  transport:  'transport',
  food:       'food',
  health:     'health',
  sim:        'sim-card',
  money:      'money-transfer',
  videos:     'videos',
  about:      'about',
  livingcost: 'living-cost',
  taxcalc:    'tax-residency',
  taxrefund:  'tax-refund',
}

const SHARE_LABELS = {
  home:       '🏠 NikiBhavi — Malaysia Life Guide for Indians',
  visa:       '🛂 Malaysia Visa Types — NikiBhavi',
  epass:      '💼 Malaysia Employee Pass Guide — NikiBhavi',
  tourist:    '✈️ Malaysia Tourist eVisa Guide — NikiBhavi',
  student:    '🎓 Malaysia Student Visa Guide — NikiBhavi',
  housing:    '🏠 Malaysia Housing & Rental Guide — NikiBhavi',
  bank:       '🏦 Malaysia Banking Guide for Indians — NikiBhavi',
  transport:  '🚇 Malaysia Transport Guide — NikiBhavi',
  food:       '🍛 Indian Food in Malaysia — NikiBhavi',
  health:     '🏥 Malaysia Healthcare Guide — NikiBhavi',
  sim:        '📱 Malaysia SIM Card Guide — NikiBhavi',
  money:      '💸 Money Transfer India to Malaysia — NikiBhavi',
  videos:     '🎬 NikiBhavi — All Malaysia Videos',
  about:      '👤 About NikiBhavi — Malaysia Life Guide',
  livingcost: '🧮 Malaysia Living Cost Calculator — NikiBhavi',
  taxcalc:    '🧾 Malaysia Tax Residency Calculator — NikiBhavi',
  taxrefund:  '💰 Malaysia Tax Refund Calculator — NikiBhavi',
}

export default function ShareUrl({ pageId }) {
  const [copied, setCopied] = useState(false)

  const slug  = PAGE_TO_SLUG[pageId] || 'home'
  const base  = window.location.origin + window.location.pathname
  const url   = `${base}#/${slug}`
  const label = SHARE_LABELS[pageId] || 'NikiBhavi'

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      const el = document.createElement('input')
      el.value = url
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareWa = () => {
    const text = encodeURIComponent(`${label}\n\n${url}\n\nFree guide for Indians in Malaysia 🇮🇳🇲🇾 by @NikiBhavi`)
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank')
  }

  const shareTg = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(label)}`, '_blank')
  }

  const shareNative = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: label, url }) } catch { /* cancelled */ }
    } else {
      copy()
    }
  }

  return (
    <div className={styles.bar}>
      <div className={styles.urlBox}>
        <span className={styles.urlIcon}>🔗</span>
        <span className={styles.urlText}>{url}</span>
      </div>
      <div className={styles.actions}>
        <button className={`${styles.btn} ${copied ? styles.copied : ''}`} onClick={copy} title="Copy link">
          {copied ? '✅' : '📋'} {copied ? 'Copied!' : 'Copy'}
        </button>
        <button className={`${styles.btn} ${styles.wa}`} onClick={shareWa} title="Share on WhatsApp">
          💬 WhatsApp
        </button>
        <button className={`${styles.btn} ${styles.tg}`} onClick={shareTg} title="Share on Telegram">
          ✈️ Telegram
        </button>
        {'share' in navigator && (
          <button className={`${styles.btn} ${styles.more}`} onClick={shareNative} title="More options">
            📤 More
          </button>
        )}
      </div>
    </div>
  )
}
