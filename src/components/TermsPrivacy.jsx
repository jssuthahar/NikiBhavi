import styles from './TermsPrivacy.module.css'

const TERMS_SECTIONS = [
  {
    title: '1. About NikiBhavi',
    content: `NikiBhavi ("we", "us", "our") is an information and guide platform designed to help Indian nationals understand life, work, and travel in Malaysia. The website is operated by NikiBhavi and is available at nikibhavi.msdevbuild.com and through its YouTube/social channels.

This website is NOT an official government service. We are an independent information resource created by Indians who live and have lived in Malaysia.`
  },
  {
    title: '2. Information Purposes Only',
    content: `All content on this website — including visa guides, tax calculators, salary information, immigration steps, legal information, financial tools, and any other content — is provided for GENERAL INFORMATION AND EDUCATIONAL PURPOSES ONLY.

Nothing on this website constitutes:
• Legal advice
• Immigration advice
• Financial advice
• Medical advice
• Tax advice

Always verify important information with official sources such as the Immigration Department of Malaysia (Jabatan Imigresen Malaysia), Inland Revenue Board (LHDN), Employees Provident Fund (KWSP), or a qualified professional.`
  },
  {
    title: '3. Accuracy of Information',
    content: `We make reasonable efforts to keep information accurate and up-to-date. However:

• Immigration policies, visa rules, and salary thresholds change frequently
• Tax laws and EPF regulations are updated by the Malaysian government
• Flight rules and baggage policies vary by airline and change over time
• Exchange rates and financial figures are approximate

We cannot guarantee that all information is current, complete, or accurate at the time of reading. Users should independently verify all critical information before making decisions.`
  },
  {
    title: '4. Calculators and Tools',
    content: `The financial calculators, tax estimators, salary comparisons, and other tools on this website provide ESTIMATES ONLY. Results from these tools:

• Are based on approximate formulas and publicly available data
• May not reflect your exact personal or tax situation
• Should not be used as the sole basis for financial decisions
• Do not account for all individual variables

Consult a qualified accountant, financial advisor, or immigration consultant for advice specific to your situation.`
  },
  {
    title: '5. Third-Party Links',
    content: `This website contains links to external websites including government portals, airline websites, job portals, and other resources. We:

• Do not endorse or control these external websites
• Are not responsible for their content, accuracy, or privacy practices
• Recommend you review the terms and privacy policies of any external site you visit`
  },
  {
    title: '6. Intellectual Property',
    content: `All original content on this website — including text, guides, tool designs, graphics, and the NikiBhavi brand — is the property of NikiBhavi. You may share or reference our content provided you:

• Credit NikiBhavi as the source
• Link back to the original page
• Do not reproduce entire pages or tools for commercial purposes without permission`
  },
  {
    title: '7. Limitation of Liability',
    content: `To the fullest extent permitted by law, NikiBhavi and its creators shall not be liable for:

• Any decisions made based on information from this website
• Any visa rejection, immigration issues, or legal consequences
• Financial losses resulting from use of our calculators or estimates
• Any indirect, incidental, or consequential damages

Use this website at your own risk.`
  },
  {
    title: '8. Changes to These Terms',
    content: `We may update these Terms and Conditions from time to time. Continued use of the website after changes constitutes acceptance of the updated terms. Last updated: March 2026.`
  },
  {
    title: '9. Contact',
    content: `For questions about these terms or to report inaccurate information:
• Instagram: @nikibhavi
• YouTube: youtube.com/@NikiBhavi
• WhatsApp Channel: available in the footer of the website`
  },
]

const PRIVACY_SECTIONS = [
  {
    title: '1. What Data We Collect',
    content: `NikiBhavi does NOT collect personal data in the traditional sense. Specifically:

• We do NOT have user accounts or registration
• We do NOT store your name, email, or contact details
• We do NOT collect payment information
• Calculator inputs are processed in your browser only — they are NOT sent to any server
• Chat (NikiBot) runs entirely in your browser — your questions are NOT stored or sent anywhere

The only data that may be collected is anonymous analytics through standard web hosting services.`
  },
  {
    title: '2. Cookies and Analytics',
    content: `Our website may use:

• **Essential cookies** — required for the website to function (e.g., remembering your last visited page)
• **Analytics** — anonymous visitor counts (e.g., how many people visited a page). No personally identifiable information is collected.

We do NOT use advertising cookies or tracking pixels from ad networks.`
  },
  {
    title: '3. NikiBot Chatbot',
    content: `Our NikiBot assistant is a fully LOCAL chatbot — it runs entirely in your browser using a built-in knowledge base. It does NOT:

• Send your questions to any external server or AI API
• Store your conversation history
• Collect or transmit any personal information

When you close the browser, the conversation is completely gone. There is no server involved.`
  },
  {
    title: '4. Calculator Data',
    content: `All calculator tools on this website (tax calculator, EPF calculator, salary comparison, etc.) run entirely in your browser using JavaScript.

• Your salary, tax details, or any other inputs are NOT sent to our servers
• Data is NOT stored between sessions
• We cannot see what you enter into any calculator`
  },
  {
    title: '5. Third-Party Services',
    content: `Our website may link to or embed content from:
• YouTube (for videos)
• Google Fonts (for typography)
• External government/airline websites

These third-party services have their own privacy policies. We encourage you to review them. Google Fonts may log your IP address when fonts are loaded.`
  },
  {
    title: '6. Data Security',
    content: `Since we collect minimal to no personal data, there is limited security risk from our website itself. All pages are served over HTTPS for secure transmission. Our hosting infrastructure follows standard security practices.`
  },
  {
    title: '7. Children\'s Privacy',
    content: `This website is intended for adults (18+) navigating work, visa, and life decisions in Malaysia. We do not knowingly collect data from children under 13. If you believe a child has provided personal data through our contact channels, please contact us immediately.`
  },
  {
    title: '8. Your Rights',
    content: `Since we don't collect personal data, most data rights requests are not applicable. However, if you have concerns about any data collected through analytics or contact channels, you may:

• Contact us via Instagram @nikibhavi or YouTube to request deletion
• Opt out of analytics by using browser privacy settings or extensions like uBlock Origin`
  },
  {
    title: '9. Changes to Privacy Policy',
    content: `We may update this Privacy Policy when we add new features. We will note the updated date at the top of this page. Last updated: March 2026.`
  },
]

export function TermsPage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.hero}>
        <span className={styles.heroIcon}>📋</span>
        <div>
          <h1 className={styles.heroTitle}>Terms & Conditions</h1>
          <p className={styles.heroSub}>Last updated: March 2026 · Please read before using NikiBhavi</p>
        </div>
      </div>
      <div className={styles.disclaimer}>
        ⚠️ <strong>Important:</strong> NikiBhavi provides general information only. Nothing here is legal, immigration, financial, or tax advice. Always verify with official sources.
      </div>
      {TERMS_SECTIONS.map((sec, i) => (
        <div key={i} className={styles.section}>
          <h2 className={styles.secTitle}>{sec.title}</h2>
          <div className={styles.secContent}>{sec.content.split('\n').map((line, j) => (
            <p key={j} className={line.startsWith('•') ? styles.bullet : styles.para}>{line}</p>
          ))}</div>
        </div>
      ))}
    </div>
  )
}

export function PrivacyPage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.hero} style={{background:'linear-gradient(135deg,#0a1a2e,#0d2b1a)'}}>
        <span className={styles.heroIcon}>🔒</span>
        <div>
          <h1 className={styles.heroTitle}>Privacy Policy</h1>
          <p className={styles.heroSub}>Last updated: March 2026 · Your privacy matters to us</p>
        </div>
      </div>
      <div className={styles.privacyHighlight}>
        <div className={styles.phGrid}>
          {[
            ['🚫','No accounts','We don\'t require registration'],
            ['🔐','No personal data','Calculators run in your browser'],
            ['🤖','Local chatbot','NikiBot never sends data online'],
            ['📊','No ad tracking','Zero advertising cookies'],
          ].map(([icon, title, desc]) => (
            <div key={title} className={styles.phCard}>
              <span className={styles.phIcon}>{icon}</span>
              <div>
                <div className={styles.phTitle}>{title}</div>
                <div className={styles.phDesc}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {PRIVACY_SECTIONS.map((sec, i) => (
        <div key={i} className={styles.section}>
          <h2 className={styles.secTitle}>{sec.title}</h2>
          <div className={styles.secContent}>{sec.content.split('\n').map((line, j) => {
            if (!line.trim()) return null
            const isBullet = line.startsWith('•')
            const hasBold  = line.includes('**')
            const parts    = line.split(/\*\*(.*?)\*\*/g)
            return (
              <p key={j} className={isBullet ? styles.bullet : styles.para}>
                {parts.map((p, k) => k % 2 === 1 ? <strong key={k}>{p}</strong> : p)}
              </p>
            )
          })}</div>
        </div>
      ))}
    </div>
  )
}
