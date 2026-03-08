import styles from './UI.module.css'
import { CHANNEL } from '../data/content'

export function InfoCard({ icon, title, desc, tag }) {
  return (
    <div className={styles.infoCard}>
      <span className={styles.cardEmoji}>{icon}</span>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDesc}>{desc}</p>
      {tag && <span className={styles.cardTag}>{tag}</span>}
    </div>
  )
}

export function CardsGrid({ children }) {
  return <div className={styles.cardsGrid}>{children}</div>
}

export function StepItem({ num, title, desc }) {
  return (
    <div className={styles.stepItem}>
      <div className={styles.stepNum}>{num}</div>
      <div className={styles.stepContent}>
        <div className={styles.stepTitle}>{title}</div>
        <div className={styles.stepDesc}>{desc}</div>
      </div>
    </div>
  )
}

export function StepsList({ steps }) {
  return (
    <div className={styles.stepsList}>
      {steps.map((s, i) => <StepItem key={i} num={i+1} title={s.title} desc={s.desc} />)}
    </div>
  )
}

export function TipBox({ icon, title, text }) {
  return (
    <div className={styles.tipBox}>
      <span className={styles.tipIcon}>{icon || '💡'}</span>
      <div className={styles.tipContent}>
        <div className={styles.tipTitle}>{title}</div>
        <div className={styles.tipText}>{text}</div>
      </div>
    </div>
  )
}

export function AdBanner({ icon, title, desc, cta }) {
  return (
    <div className={styles.adBanner}>
      <span className={styles.adEmoji}>{icon}</span>
      <div className={styles.adContent}>
        <div className={styles.adTitle}>{title}</div>
        <div className={styles.adDesc}>{desc}</div>
      </div>
      <a href="#" className={styles.adCta}>{cta}</a>
    </div>
  )
}

export function StatsRow({ stats }) {
  return (
    <div className={styles.statsRow}>
      {stats.map(s => (
        <div key={s.l} className={styles.statCard}>
          <div className={styles.statNum}>{s.n}</div>
          <div className={styles.statLabel}>{s.l}</div>
        </div>
      ))}
    </div>
  )
}

export function SectionHeader({ title, sub }) {
  return (
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {sub && <p className={styles.sectionSub}>{sub}</p>}
    </div>
  )
}

export function SubscribeCTA({ title, sub }) {
  return (
    <div className={styles.subscribeCTA}>
      <h3 className={styles.ctaTitle}>{title}</h3>
      <p className={styles.ctaSub}>{sub}</p>
      <div className={styles.ctaBtns}>
        <a href={CHANNEL.ytUrl} target="_blank" rel="noreferrer" className={`${styles.ctaBtn} ${styles.ctaYt}`}>▶ Subscribe on YouTube</a>
        <a href={CHANNEL.igUrl} target="_blank" rel="noreferrer" className={`${styles.ctaBtn} ${styles.ctaIg}`}>📸 Follow on Instagram</a>
        <a href={CHANNEL.waUrl} target="_blank" rel="noreferrer" className={`${styles.ctaBtn} ${styles.ctaWa}`}>💬 Join WhatsApp</a>
      </div>
    </div>
  )
}

export function FeaturedVideo({ tag, title, views, videoTag }) {
  return (
    <a href={CHANNEL.ytUrl} target="_blank" rel="noreferrer" className={styles.featuredVideo}>
      <div className={styles.fvThumb}>🎬</div>
      <div className={styles.fvInfo}>
        <span className={styles.fvBadge}>{tag || 'Featured'}</span>
        <div className={styles.fvTitle}>{title}</div>
        <div className={styles.fvMeta}>{views} · {videoTag}</div>
      </div>
      <a href={CHANNEL.ytUrl} target="_blank" rel="noreferrer" className={styles.fvBtn}>▶ Watch</a>
    </a>
  )
}

export function VideoList({ videos }) {
  return (
    <div className={styles.videoList}>
      {videos.map((v, i) => (
        <a key={i} href={CHANNEL.ytUrl} target="_blank" rel="noreferrer" className={styles.videoRow}>
          <div className={styles.videoThumb}>{v.icon || '🎬'}</div>
          <div className={styles.videoInfo}>
            <div className={styles.videoTitle}>{v.title}</div>
            <div className={styles.videoMeta}>
              <span>{v.views}</span>
              <span>{v.tag}</span>
            </div>
          </div>
          <div className={styles.videoPlay}>▶</div>
        </a>
      ))}
    </div>
  )
}

export function TopicGrid({ topics, onNavigate }) {
  return (
    <div className={styles.topicGrid}>
      {topics.map(t => (
        <div key={t.id} className={styles.topicCard} onClick={() => onNavigate(t.id)}>
          <span className={styles.topicEmoji}>{t.icon}</span>
          <div className={styles.topicLabel}>{t.name}</div>
          <div className={styles.topicSub}>{t.count}</div>
        </div>
      ))}
    </div>
  )
}

export function QuickLinks({ links, onNavigate }) {
  const labels = { epass:'💼 Employee Pass', tourist:'✈️ Tourist Visa', student:'🎓 Student Pass' }
  return (
    <div className={styles.quickLinks}>
      {links.map(id => (
        <button key={id} className={styles.quickLink} onClick={() => onNavigate(id)}>{labels[id]}</button>
      ))}
    </div>
  )
}
