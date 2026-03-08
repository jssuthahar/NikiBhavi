import { useState, useRef, useEffect, useMemo } from 'react'
import styles from './NikiBot.module.css'

// ─── Knowledge base ────────────────────────────────────────────
const KB = [
  // VISA-FREE
  { keys:['visa free','visa-free','no visa','free visa','2026 visa','tourist visa','visit malaysia','30 days','mdac'],
    ans:`🎉 **Indians are VISA-FREE for Malaysia until December 31, 2026!**\n\nYou don't need eVisa. Just:\n• Submit **MDAC** (Malaysia Digital Arrival Card) free online, min 3 days before arrival\n• Have return flight ticket booked\n• Have hotel/accommodation booking\n• Valid passport (6+ months)\n\n📱 MDAC link: imigresen-online.imi.gov.my/mdac/main\nStay up to **30 days** per visit. Valid for tourism, social visits, business meetings.`,
    nav:'touristinfo' },

  // EP SALARY 2026
  { keys:['ep salary','employment pass salary','ep 2026','salary minimum','category i','category ii','category iii','rm 5000','rm 10000','rm 20000','minimum salary','new salary','june 2026','salary threshold'],
    ans:`⚠️ **EP Salary Policy — Effective 1 June 2026:**\n\n| Category | Min Salary |\n|---|---|\n| EP Category I | RM 20,000+/month |\n| EP Category II | RM 10,000–19,999 |\n| EP Category III | RM 5,000–9,999 |\n| Mfg Sector III | RM 7,000+ |\n\n• Cat I & II: up to 10 years validity\n• Cat III: max 5 years, succession plan required\n• Applies to all NEW and RENEWAL applications from June 1, 2026`,
    nav:'epass' },

  // EP GENERAL
  { keys:['employee pass','employment pass','ep guide','ep document','ep process','ep apply','how to get ep','ikad','esd portal','approval in principle','aip'],
    ans:`💼 **Employment Pass (EP) Process:**\n\n1. Get job offer letter with salary\n2. Company applies via ESD portal (esd.imi.gov.my)\n3. Submit docs: passport, degree, experience letters\n4. Approval In Principle (AIP) in 2–4 weeks\n5. Arrive Malaysia → collect i-Kad\n\n**Key docs needed:**\n• Passport (18+ months validity)\n• Degree certificate (apostilled)\n• Experience letters from previous employers\n• Passport photos (6 copies)`,
    nav:'epass' },

  // TAX REFUND
  { keys:['tax refund','lhdn','income tax','tax return','how much refund','ya 2024','ya 2025','ya 2026','e-filing','tax resident','pita'],
    ans:`💵 **Malaysian Income Tax Refund Guide:**\n\n• Tax year = calendar year (Jan–Dec)\n• File e-Filing at mytax.hasil.gov.my by April 30\n• Tax resident = 182+ days in Malaysia per year\n• Refund arrives in 30–90 days after submission\n\n**Common reliefs for Indians:**\n• Self & dependents: RM 9,000\n• Life insurance/EPF: up to RM 7,000\n• Medical expenses: up to RM 10,000\n• Lifestyle (phone, books, sport): RM 2,500\n• SSPN-i education savings: RM 8,000`,
    nav:'taxrefund' },

  // EPF
  { keys:['epf','kwsp','epf withdrawal','withdraw epf','epf balance','epf dividend','epf rate','akaun 1','akaun 2','akaun 3','akaun persaraan','akaun sejahtera','akaun fleksibel'],
    ans:`🏦 **EPF (KWSP) — Employees Provident Fund:**\n\n• Employee contributes: 11% of salary\n• Employer contributes: 12–13%\n• 3 accounts: Akaun Persaraan (75%), Akaun Sejahtera (15%), Akaun Fleksibel (10%)\n• 2024 dividend: 5.50%\n\n**Withdrawing when leaving Malaysia:**\n• Foreign nationals can make full withdrawal when leaving permanently\n• Need: passport, EP cancellation, bank details\n• Processing: 2–4 weeks\n• Akaun Fleksibel: can withdraw anytime`,
    nav:'epfout' },

  // REMITTANCE
  { keys:['send money','remittance','transfer money india','myr to inr','inr rate','exchange rate','wise','remitbee','instarem','how to send'],
    ans:`💸 **Sending Money from Malaysia to India:**\n\n**Best services (2026 rates ~₹19.5–20/RM):**\n• **Wise** — best rates, low fees, fast\n• **RemitBee** — good for large amounts\n• **InstaRem** — quick transfers\n• **Western Union** — widely available\n• **Bank transfer** — higher fees, slower\n\n**Tips:**\n• Compare rates at wise.com before transferring\n• Transfers above RM 3,000 may need source of funds proof\n• Monthly limit: generally no limit for salaried EP holders`,
    nav:'remittance' },

  // HOUSING
  { keys:['house','rent','housing','apartment','condo','where to live','best area','kl area','bangsar','cheras','petaling jaya','subang','mont kiara','kl sentral','brickfields'],
    ans:`🏠 **Best Areas for Indians in KL (2026):**\n\n• **Brickfields** — Little India, Tamil food, KTM/MRT access. Rent RM 1,200–2,500\n• **Cheras** — Affordable, big Indian community. RM 900–1,800\n• **Bangsar** — Upscale, expat-friendly. RM 2,500–5,000\n• **Petaling Jaya (PJ)** — Family-friendly, schools. RM 1,500–3,500\n• **Mont Kiara** — Premium, international schools. RM 3,000–8,000\n• **Subang Jaya** — Tech companies nearby. RM 1,200–2,500\n\nMost Indians prefer Cheras or Brickfields when starting out.`,
    nav:'housing' },

  // BANKING
  { keys:['bank account','open account','maybank','cimb','rhb','hong leong','public bank','banking','bank in malaysia'],
    ans:`🏦 **Opening Bank Account in Malaysia:**\n\n**Required documents:**\n• Passport (original)\n• EP / Approval letter\n• Company offer letter or pay slip\n• Utility bill or hotel address\n\n**Best banks for Indians:**\n• **Maybank** — largest network, good app, ATMs everywhere\n• **CIMB** — good digital banking, competitive FD rates\n• **RHB** — easy account opening process\n\nMost banks open accounts same day. Processing: 30–60 minutes.`,
    nav:'bank' },

  // SIM CARD
  { keys:['sim card','phone plan','postpaid','prepaid','maxis','celcom','digi','yes 5g','u mobile','cheapest plan','data plan'],
    ans:`📱 **Best SIM Card Plans in Malaysia (2026):**\n\n**Postpaid (recommended for EP holders):**\n• **Maxis Postpaid 30** — 30GB data, RM 30/mo (most popular)\n• **Celcom First Gold** — 40GB, RM 58/mo\n• **Digi Postpaid 40** — 30GB, RM 40/mo\n• **Yes 5G** — Unlimited data, RM 60/mo\n\n**For calls to India:** Activate international roaming or use WhatsApp/Facetime. IDD calls: RM 0.15–0.30/min to India.`,
    nav:'sim' },

  // FLIGHT BAGGAGE
  { keys:['baggage','luggage','grinder','mixer','wet grinder','carry','allowed','flight rules','checked bag','cabin bag','weight limit','how many laptop','power bank','tv flight'],
    ans:`✈️ **Flight Baggage — What's Allowed:**\n\n**Grinder/Wet Grinder:** ✅ ALLOWED in CHECKED bag. Remove blade, wrap in cloth. Declare at check-in.\n\n**Mixer/Juicer:** ✅ CHECKED bag. Remove blade separately.\n\n**Laptops:** 2 laptops allowed in cabin bag on most airlines.\n\n**Power Bank:** < 100Wh in CABIN only. 100–160Wh: max 2 in cabin. >160Wh: NOT allowed.\n\n**TV:** Small (<32"): checked bag, wrapped well. Large: use sea freight (DHL/courier).\n\n**AirAsia:** 7kg cabin, 20kg checked (add-on). Malaysia Airlines: 7kg cabin, 30kg checked.`,
    nav:'flighthub' },

  // AIRPORT
  { keys:['airport','klia','klia2','reach airport','when to reach','how early','terminal','express train','erl','grab to airport'],
    ans:`🏢 **KLIA Airport Guide:**\n\n**Which terminal?**\n• **KLIA (main):** Malaysia Airlines, Singapore Airlines, Emirates, Qatar\n• **KLIA2 (budget):** ALL AirAsia flights, some IndiGo, Batik Air\n\n**When to arrive:**\n• International flights: 2.5–3 hours before\n• AirAsia: check-in closes 60 min before\n• MH/others: 45 min before\n\n**Getting there:**\n• ERL Express Train from KL Sentral: 28 min, RM 55 (KLIA) or 33 min (KLIA2)\n• Grab car: RM 60–90 from city centre`,
    nav:'flighthub' },

  // PCB TAX
  { keys:['pcb','monthly tax','tax deduction','pcb calculator','potongan cukai berjadual','how much tax deducted','salary deduction'],
    ans:`📊 **PCB — Monthly Tax Deduction:**\n\nPCB (Potongan Cukai Berjadual) is the monthly income tax deducted from your salary automatically.\n\n**Rough estimates:**\n• RM 5,000/mo salary → ~RM 150–200 PCB\n• RM 8,000/mo salary → ~RM 400–600 PCB\n• RM 15,000/mo salary → ~RM 1,500–2,000 PCB\n\nActual amount depends on: marital status, number of children, EPF contribution, and other reliefs declared.\n\nUse our PCB calculator for exact monthly deduction!`,
    nav:'pcb' },

  // DEPENDENT PASS
  { keys:['dependent pass','dp','spouse visa','family visa','bring family','bring wife','bring husband','bring children','dp process'],
    ans:`🧳 **Dependent Pass — Bring Family to Malaysia:**\n\n• Spouse and children (under 18) of EP holder eligible\n• Employer applies together with or after EP application\n• DP holder cannot work without Letter of Approval (LOA)\n\n**Key documents:**\n• Marriage certificate (apostilled from India/MEA)\n• Birth certificates for children\n• Passport photos\n\n**Cost:** ~RM 500–1,000 total fees\n**Processing:** 2–4 weeks\n\n⚠️ After June 2026 — DP available for ALL EP categories including Category III`,
    nav:'dp' },

  // PR
  { keys:['pr','permanent resident','citizenship','rpt','rp-t','residence pass talent','how to get pr','pr eligibility','how long for pr'],
    ans:`🛂 **PR Roadmap — Indian in Malaysia:**\n\n**Path 1: Employment Pass → PR**\n• Work on EP for 5+ years\n• Minimum RM 15,000/mo for RP-T (Residence Pass-Talent)\n• RP-T = 10-year pass, leads to PR\n• Full PR application: 10 years in Malaysia\n\n**Path 2: MM2H (Malaysia My Second Home)**\n• Long-stay visa, not direct PR\n• Requirements revised 2024 — higher income/deposit needed\n\nNote: PR in Malaysia is very difficult — most Indians use RP-T as long-term option.`,
    nav:'prroad' },

  // LIVING COST
  { keys:['living cost','cost of living','monthly expenses','how much to live','budget kl','expensive','affordable'],
    ans:`📊 **Cost of Living in KL (2026 estimates):**\n\n**Single person:**\n• Rent (1BR, Cheras): RM 1,200–1,800\n• Food (home cooking + eating out): RM 600–900\n• Transport (MRT + Grab): RM 200–400\n• Utilities + Internet: RM 150–250\n• **Total: ~RM 2,500–4,000/month**\n\n**Family of 3:**\n• Rent (2–3BR): RM 2,000–3,500\n• All expenses: RM 5,000–8,000/month\n\n*1 RM ≈ ₹19.5 (2026)*`,
    nav:'livingcost' },

  // CAR
  { keys:['buy car','car price','perodua','proton','myvi','bezza','saga','honda city','car loan malaysia','hire purchase'],
    ans:`🚗 **Buying a Car in Malaysia:**\n\n**Popular affordable cars:**\n• Perodua Myvi: RM 46,000–62,000\n• Perodua Bezza: RM 38,000–52,000\n• Proton Saga: RM 38,000–50,000\n• Honda City: RM 85,000–100,000\n\n**EP holder car loan:**\n• Most banks approve EP holders after 3+ months of work\n• Need: EP sticker, 3 months payslips, bank statements\n• Loan up to 90% of car price\n• Interest rate: 2.5–3.5% p.a.\n\nFor used cars: use Carlist.my or Mudah.my`,
    nav:'buycar' },

  // SCHOOL
  { keys:['school','children school','tamil school','sjkt','international school','school fees','education','kids school'],
    ans:`🎓 **Schools in Malaysia for Indian Children:**\n\n**Tamil Schools (SJKT) — FREE government:**\n• Tamil medium instruction\n• Best for Tamil-speaking families\n• Apply at nearest SJKT before school year starts\n\n**National Schools (SK) — FREE:**\n• Bahasa Malaysia medium\n• English as second language\n• Good for children who'll stay long-term\n\n**International Schools:**\n• English/CBSE/IGCSE medium\n• Fees: RM 15,000–60,000 per year\n• Australian International, ISKL, Alice Smith\n\nMost Indian EP families choose between Tamil school + tuition or international school.`,
    nav:'schoolfees' },

  // JOB SEARCH
  { keys:['job search','find job','jobstreet','linkedin malaysia','job portal','find work','get job malaysia','job vacancy'],
    ans:`💼 **Job Search in Malaysia — Best Portals:**\n\n• **LinkedIn** — Best for MNCs, tech, finance\n• **JobStreet.com.my** — #1 local portal, all industries\n• **Indeed Malaysia** — Good volume, all sectors\n• **TalentCorp** — Government portal, faster EP processing\n• **Glassdoor** — Research salary + company culture\n\n**Tips for Indians:**\n• LinkedIn profile with "Open to Work" → Kuala Lumpur\n• TCS, Infosys, Cognizant, Wipro all have KL offices — internal transfer is easiest EP path\n• EP minimum from June 2026: RM 5,000/month (Category III)`,
    nav:'jobsearch' },

  // MEDICAL CARD
  { keys:['medical card','health insurance','insurance plan','aia','prudential','great eastern','panel clinic','hospital bill','medical insurance'],
    ans:`🏥 **Medical Card / Health Insurance in Malaysia:**\n\n**Top insurers for Indians:**\n• **AIA** — largest network, good panel clinics\n• **Prudential** — strong critical illness coverage\n• **Great Eastern** — competitive premiums\n• **Etiqa** — affordable entry-level plans\n\n**Monthly premiums (approx):**\n• Age 25–30: RM 100–200/month\n• Age 30–40: RM 200–400/month\n• Age 40–50: RM 400–700/month\n\nMost employers include medical card — check your offer letter. Government clinics (Klinik Kesihatan): RM 1–5 per visit with EP.`,
    nav:'medcard' },

  // FOOD
  { keys:['indian food','indian restaurant','brickfields','little india','tamil food','banana leaf','vegetarian','indian grocery','mustafa','mydin'],
    ans:`🍛 **Indian Food in Malaysia:**\n\n**Best areas:**\n• **Brickfields (Little India)** — Tamil restaurants, grocery shops, temple street food\n• **Cheras** — Many South Indian restaurants, affordable\n• **Bangsar** — Upscale Indian restaurants\n\n**Popular restaurant types:**\n• Banana leaf rice: RM 8–15\n• Roti canai + teh tarik breakfast: RM 3–6\n• Mamak (24hr Indian-Muslim): RM 5–12\n• Fine dining Indian: RM 30–80\n\n**Groceries:** Indian spices at Brickfields shops, Mydin, or Indian grocery stores. Cheaper than India for some items!`,
    nav:'food' },

  // ABOUT
  { keys:['nikibhavi','who are you','about','channel','youtube','instagram','contact','whatsapp'],
    ans:`🇮🇳 **About NikiBhavi:**\n\nNikiBhavi is an information channel helping **Indians navigate life in Malaysia** — from visa to jobs to daily life.\n\n📺 YouTube: youtube.com/@NikiBhavi\n📷 Instagram: instagram.com/nikibhavi\n💬 WhatsApp Channel: (link in footer)\n☕ Support us: buymeacoffee.com/jssuthahar\n\nAll information is based on real experiences of Indians living in Malaysia. For legal/immigration matters, always verify with official sources.`,
    nav:'about' },
]

// Suggested questions for quick-tap
const SUGGESTIONS = [
  'Do Indians need visa for Malaysia?',
  'What is EP salary in 2026?',
  'How to withdraw EPF?',
  'Can I carry grinder on flight?',
  'How much is living cost in KL?',
  'How to open bank account?',
  'Best areas to live in KL?',
  'How to send money to India?',
]

function getBotReply(input) {
  const q = input.toLowerCase()
  // Try to find best matching KB entry
  let best = null
  let bestScore = 0
  for (const entry of KB) {
    const score = entry.keys.filter(k => q.includes(k)).length
    if (score > bestScore) { bestScore = score; best = entry }
  }
  if (best && bestScore > 0) return best

  // Fuzzy: partial word match
  for (const entry of KB) {
    const matched = entry.keys.some(k => k.split(' ').some(word => word.length > 3 && q.includes(word)))
    if (matched) return entry
  }

  return {
    ans: `🤔 I don't have a specific answer for that, but I can help you find the right page!\n\nTry asking about:\n• **Tourist visa 2026** — Indians visa-free!\n• **EP salary 2026** — new minimums from June\n• **EPF withdrawal** — how to get your money back\n• **Flight baggage** — grinder, TV, laptop rules\n• **Living cost KL** — monthly budget estimates\n• **Job search** — best portals for Indians\n\nOr use the **Search** button (🔍) to find any page!`,
    nav: null
  }
}

export default function NikiBot({ isOpen, onClose, onNavigate }) {
  const [msgs, setMsgs]   = useState([
    { from:'bot', text:`👋 Hi! I'm **NikiBot** — your Malaysia guide assistant!\n\nAsk me anything about:\n• Visa, EP, Student Pass\n• Tax, EPF, salary\n• Flights, baggage rules\n• Housing, banking, food\n\nOr tap a question below 👇`, nav:null }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)
  const inputRef  = useRef(null)

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 200)
  }, [isOpen])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:'smooth' })
  }, [msgs, typing])

  const send = (text) => {
    const q = (text || input).trim()
    if (!q) return
    setInput('')
    setMsgs(m => [...m, { from:'user', text:q }])
    setTyping(true)
    setTimeout(() => {
      const reply = getBotReply(q)
      setMsgs(m => [...m, { from:'bot', text:reply.ans, nav:reply.nav }])
      setTyping(false)
    }, 600 + Math.random()*400)
  }

  const handleKey = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }

  const renderText = (text) => {
    // Simple markdown: **bold**, bullet points, newlines
    return text.split('\n').map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/g)
      return (
        <span key={i}>
          {parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}
          {i < text.split('\n').length - 1 && <br/>}
        </span>
      )
    })
  }

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.avatar}>🤖</div>
            <div>
              <div className={styles.botName}>NikiBot</div>
              <div className={styles.botStatus}><span className={styles.onlineDot}/>Online · Malaysia Guide</div>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Messages */}
        <div className={styles.messages}>
          {msgs.map((msg, i) => (
            <div key={i} className={`${styles.msgRow} ${msg.from==='user' ? styles.userRow : ''}`}>
              {msg.from === 'bot' && <div className={styles.msgAvatar}>🤖</div>}
              <div className={`${styles.bubble} ${msg.from==='user' ? styles.userBubble : styles.botBubble}`}>
                <p className={styles.bubbleText}>{renderText(msg.text)}</p>
                {msg.nav && (
                  <button className={styles.navBtn} onClick={() => { onNavigate(msg.nav); onClose() }}>
                    Open page →
                  </button>
                )}
              </div>
            </div>
          ))}
          {typing && (
            <div className={styles.msgRow}>
              <div className={styles.msgAvatar}>🤖</div>
              <div className={`${styles.bubble} ${styles.botBubble} ${styles.typingBubble}`}>
                <span className={styles.dot1}/><span className={styles.dot2}/><span className={styles.dot3}/>
              </div>
            </div>
          )}
          <div ref={bottomRef}/>
        </div>

        {/* Suggestions */}
        <div className={styles.suggestions}>
          {SUGGESTIONS.map((s, i) => (
            <button key={i} className={styles.suggestion} onClick={() => send(s)}>{s}</button>
          ))}
        </div>

        {/* Input */}
        <div className={styles.inputRow}>
          <input
            ref={inputRef}
            className={styles.input}
            placeholder="Ask anything about Malaysia..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
          />
          <button className={styles.sendBtn} onClick={() => send()} disabled={!input.trim()}>
            ➤
          </button>
        </div>
      </div>
    </div>
  )
}
