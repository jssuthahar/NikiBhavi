import { useEffect, useRef } from 'react'
import styles from './AdUnit.module.css'

// ── Auto/responsive ad (sidebar, between sections) ───────────
export function AdBannerAuto({ className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    try {
      if (ref.current && ref.current.offsetWidth > 0) {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch {}
  }, [])
  return (
    <div className={`${styles.adWrap} ${className}`} ref={ref}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-3425499927549926"
        data-ad-slot="9337275138"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}

// ── In-article fluid ad (inside long content) ─────────────────
export function AdInArticle({ className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    try {
      if (ref.current) {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch {}
  }, [])
  return (
    <div className={`${styles.adInArticle} ${className}`} ref={ref}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-3425499927549926"
        data-ad-slot="8954131753"
      />
    </div>
  )
}
