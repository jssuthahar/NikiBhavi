import { useState, useEffect } from 'react'
import styles from './AppPromo.module.css'

const PLAY_STORE = 'https://play.google.com/store/apps/details?id=com.nikibhavi.app'
const REVIEW_URL = 'https://play.google.com/store/apps/details?id=com.nikibhavi.app&showAllReviews=true'

export default function AppPromo() {
  const [platform, setPlatform] = useState('other') // 'android' | 'ios' | 'other'
  const [dismissed, setDismissed] = useState(false)
  const [iosInstalled, setIosInstalled] = useState(false)
  const [showReview, setShowReview] = useState(false)

  useEffect(() => {
    // Detect platform
    const ua = navigator.userAgent.toLowerCase()
    if (/android/.test(ua)) setPlatform('android')
    else if (/iphone|ipad|ipod/.test(ua)) setPlatform('ios')
    else setPlatform('other')

    // iOS PWA check
    if (window.navigator.standalone) setIosInstalled(true)

    // Show review prompt after 30 seconds
    const t = setTimeout(() => setShowReview(true), 30000)
    return () => clearTimeout(t)
  }, [])

  if (dismissed) return null

  return (
    <>
      {/* ── Smart App Banner ─────────────────────────────── */}
      {platform === 'android' && (
        <div className={styles.androidBanner}>
          <div className={styles.bannerLeft}>
            <div className={styles.bannerIcon}>N</div>
            <div>
              <div className={styles.bannerName}>NikiBhavi App</div>
              <div className={styles.bannerSub}>Free · Works offline · Live rates</div>
              <div className={styles.stars}>★★★★★</div>
            </div>
          </div>
          <div className={styles.bannerRight}>
            <button className={styles.dismissBtn} onClick={() => setDismissed(true)}>✕</button>
            <a href={PLAY_STORE} target="_blank" rel="noreferrer" className={styles.installBtn}>
              Install Free
            </a>
          </div>
        </div>
      )}

      {platform === 'ios' && !iosInstalled && (
        <div className={styles.iosBanner}>
          <button className={styles.dismissBtn} onClick={() => setDismissed(true)}>✕</button>
          <div className={styles.iosContent}>
            <div className={styles.bannerIcon}>N</div>
            <div>
              <div className={styles.bannerName}>Install NikiBhavi</div>
              <div className={styles.bannerSub}>Add to Home Screen for offline access</div>
            </div>
          </div>
          <div className={styles.iosSteps}>
            <div className={styles.iosStep}>
              <span className={styles.iosStepNum}>1</span>
              Tap <strong>Share</strong> button <span className={styles.shareIcon}>⎙</span> at the bottom
            </div>
            <div className={styles.iosStep}>
              <span className={styles.iosStepNum}>2</span>
              Select <strong>"Add to Home Screen"</strong>
            </div>
            <div className={styles.iosStep}>
              <span className={styles.iosStepNum}>3</span>
              Tap <strong>"Add"</strong> — done! Works like a native app
            </div>
          </div>
        </div>
      )}

      {/* ── Desktop / Other: Full promo section ──────────── */}
      {platform === 'other' && (
        <div className={styles.desktopPromo}>
          <div className={styles.promoLeft}>
            <div className={styles.promoTag}>📱 Now on Android</div>
            <h2 className={styles.promoTitle}>Get the NikiBhavi App</h2>
            <p className={styles.promoDesc}>
              Live MYR/INR rate · Works offline · Event calendar · Push notifications
            </p>
            <div className={styles.promoFeatures}>
              {['45+ Free Tools','Live Gold Rates','KL Weather','Daily Tips','NikiBot AI'].map(f => (
                <span key={f} className={styles.promoFeature}>{f}</span>
              ))}
            </div>
            <a href={PLAY_STORE} target="_blank" rel="noreferrer" className={styles.playBtn}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M3.18 23.76c.37.21.8.22 1.19.04l13.12-7.53-2.97-2.97L3.18 23.76z"/>
                <path d="M22.14 10.47L19.1 8.7l-3.28 3.28 3.28 3.28 3.06-1.79c.87-.51.87-1.5-.02-1.99z"/>
                <path d="M2.08 1.22C2.03 1.4 2 1.6 2 1.83v20.34c0 .23.03.43.08.61l.06.06 11.4-11.4v-.26L2.14 1.16l-.06.06z"/>
                <path d="M15.54 12.61l-3.99-3.99L2.14 1.16c.39-.22.85-.21 1.24.04l13.13 7.53-3.06 3.06.09.82z" opacity=".3"/>
              </svg>
              Get it on Google Play
            </a>
          </div>
          <div className={styles.promoRight}>
            <div className={styles.promoPhone}>
              <div className={styles.promoPhoneScreen}>
                <div className={styles.mockHeader}>
                  <span style={{color:'#C9F53B',fontWeight:700}}>₹23.73</span>
                  <span style={{color:'rgba(255,255,255,0.6)',fontSize:'11px'}}> per RM 1</span>
                </div>
                <div className={styles.mockRow}>🌤️ 27°C · No umbrella</div>
                <div className={styles.mockRow}>🗓️ Hari Raya · 2d away</div>
                <div className={styles.mockRow}>💡 Daily tip loading...</div>
                <div className={styles.mockTabs}>
                  {['🏠','👤','🛠️','📚','🤖'].map((t,i) => (
                    <span key={i} className={i===0 ? styles.mockTabActive : styles.mockTab}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Review Request (all platforms, after 30s) ─────── */}
      {showReview && (
        <div className={styles.reviewCard}>
          <button className={styles.reviewDismiss} onClick={() => setShowReview(false)}>✕</button>
          <div className={styles.reviewEmoji}>⭐</div>
          <div className={styles.reviewTitle}>Enjoying NikiBhavi?</div>
          <div className={styles.reviewSub}>Your review helps other Indians in Malaysia find us!</div>
          <div className={styles.reviewStars}>
            {[1,2,3,4,5].map(s => (
              <a key={s} href={REVIEW_URL} target="_blank" rel="noreferrer"
                 className={styles.reviewStar}>★</a>
            ))}
          </div>
          <a href={REVIEW_URL} target="_blank" rel="noreferrer" className={styles.reviewBtn}>
            Write a Review on Google Play
          </a>
          <button className={styles.reviewLater} onClick={() => setShowReview(false)}>
            Maybe Later
          </button>
        </div>
      )}
    </>
  )
}
