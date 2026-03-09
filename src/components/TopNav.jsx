import styles from './TopNav.module.css'

const CHANNEL = {
  yt:  'https://www.youtube.com/@NikiBhavi',
  ig:  'https://www.instagram.com/nikibhavi/',
  wa:  'https://whatsapp.com/channel/0029VaAyhBS6rsQuujk5G53h',
  web: 'https://nikibhavi.msdevbuild.com',
}

const SOCIAL = [
  { href: CHANNEL.yt,  label: 'YouTube',   emoji: '▶',  color: '#FF0000', text: '@NikiBhavi' },
  { href: CHANNEL.ig,  label: 'Instagram', emoji: '📸', color: '#E4405F', text: '@nikibhavi' },
  { href: CHANNEL.wa,  label: 'WhatsApp',  emoji: '💬', color: '#25D366', text: 'Join Channel' },
]

export default function TopNav() {
  return (
    <div className={styles.topnav}>
      <div className={styles.inner}>
        {/* Left — tagline */}
        <span className={styles.tagline}>
          🇲🇾 Free guide for Indians in Malaysia
        </span>

        {/* Right — social links */}
        <div className={styles.links}>
          {SOCIAL.map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className={styles.link}
              aria-label={s.label}
            >
              <span className={styles.linkEmoji}>{s.emoji}</span>
              <span className={styles.linkText}>{s.text}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
