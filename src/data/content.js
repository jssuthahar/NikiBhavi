// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  NikiBhavi — All Page & Navigation Data
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const CHANNEL = {
  name: 'NikiBhavi',
  handle: '@NikiBhavi · YouTube & Instagram',
  ytUrl:  'https://www.youtube.com/@NikiBhavi',
  igUrl:  'https://www.instagram.com/nikibhavi/follow',
  waUrl:  'https://whatsapp.com/channel/0029VaAyhBS6rsQuujk5G53h',
  stats: [
    { n: '10K+', l: 'Subs' },
    { n: '50+',  l: 'Videos' },
    { n: '5K+',  l: 'IG Followers' },
  ],
}

export const NAV_GROUPS = [
  {
    label: 'Home',
    items: [{ id: 'home', icon: '🏠', label: 'Home', badge: 'NEW' }],
  },
  {
    label: 'Visa & Entry',
    items: [
      { id: 'visa',    icon: '🛂', label: 'Visa Overview',   count: 4  },
      { id: 'epass',   icon: '💼', label: 'Employee Pass',    count: 12 },
      { id: 'touristinfo', icon: '✈️', label: 'Tourist Visa 🎉', count: 8  },
      { id: 'student', icon: '🎓', label: 'Student Pass',     count: 5  },
    ],
  },
  {
    label: 'Life in Malaysia',
    items: [
      { id: 'housing',   icon: '🏠', label: 'Housing & Rent',      count: 6 },
      { id: 'bank',      icon: '🏦', label: 'Bank Account',         count: 5 },
      { id: 'transport', icon: '🚗', label: 'Transport',            count: 5 },
      { id: 'food',      icon: '🍛', label: 'Food & Groceries',     count: 7 },
      { id: 'health',    icon: '🏥', label: 'Health & Insurance',   count: 4 },
      { id: 'sim',       icon: '📱', label: 'SIM & Internet',       count: 3 },
      { id: 'money',     icon: '💸', label: 'Money & Remittance',   count: 4 },
      { id: 'buycar',    icon: '🚗', label: 'Buying a Car',            badge: 'NEW' },
      { id: 'hospital',  icon: '💊', label: 'Hospitals & Clinics',     badge: 'NEW' },
      { id: 'moving',    icon: '📦', label: 'Moving to Malaysia',      badge: 'NEW' },
    ],
  },
  {
    label: 'Financial Tools',
    items: [
      { id: 'livingcost',  icon: '🧮', label: 'Living Cost Calculator'     },
      { id: 'taxcalc',     icon: '🧾', label: 'Tax Residency Calculator'   },
      { id: 'taxrefund',   icon: '💰', label: 'Tax Relief & Refund'        },
      { id: 'remittance',  icon: '💸', label: 'Remittance Calculator',     badge: 'NEW' },
      { id: 'salary',      icon: '📊', label: 'Salary Comparison',         badge: 'NEW' },
      { id: 'epf',         icon: '📈', label: 'EPF Calculator',            badge: 'NEW' },
      { id: 'homeloan',    icon: '🏡', label: 'Home Loan Eligibility',     badge: 'NEW' },
      { id: 'carloan',     icon: '🚗', label: 'Car Loan Calculator',        badge: 'NEW' },
      { id: 'pcb',         icon: '📊', label: 'PCB Tax Calculator',         badge: 'NEW' },
      { id: 'expense',     icon: '🧾', label: 'Expense Tracker',            badge: 'NEW' },
    ],
  },
  {
    label: 'Life & Visa Tools',
    items: [
      { id: 'eplifeguide', icon: '🏡', label: 'EP Holder Life Guide',      badge: '🔥' },
      { id: 'jobsearch',   icon: '💼', label: 'Job Search + EP 2026',      badge: '🔥' },
      { id: 'flighthub',   icon: '✈️', label: 'Flight Travel Hub',          badge: 'NEW' },
      { id: 'medcard',     icon: '🏥', label: 'Medical Card Advisor',       badge: 'NEW' },
      { id: 'prroad',      icon: '🛂', label: 'PR / Citizenship Roadmap',   badge: 'NEW' },
      { id: 'dp',          icon: '🧳', label: 'Dependent Pass Guide',       badge: 'NEW' },
      { id: 'epfout',      icon: '💰', label: 'EPF Withdrawal Guide',       badge: 'NEW' },
      { id: 'visatrack',   icon: '🛂', label: 'Visa Expiry Tracker',       badge: 'NEW' },
      { id: 'epelig',      icon: '💼', label: 'EP Eligibility Checker',    badge: 'NEW' },
      { id: 'rent',        icon: '🏠', label: 'Rent Affordability',        badge: 'NEW' },
      { id: 'costcompare', icon: '⚖️', label: 'India vs Malaysia Costs',   badge: 'NEW' },
      { id: 'leave',       icon: '📅', label: 'Leave Planner',             badge: 'NEW' },
      { id: 'probation',   icon: '📋', label: 'Probation End Date',        badge: 'NEW' },
      { id: 'schoolfees',  icon: '🎒', label: 'School Fee Planner',        badge: 'NEW' },
    ],
  },
  {
    label: '✈️ Tourist Tools',
    items: [
      { id: 'tourist', icon: '🗺️', label: 'Tourist Hub', badge: 'NEW', highlight: true },
    ],
  },
  {
    label: 'Channel',
    items: [
      { id: 'videos', icon: '🎬', label: 'All Videos' },
      { id: 'about',  icon: '👤', label: 'About Us' },
    ],
  },
]

export const TICKER_ITEMS = [
  { label: '🆕 New:', text: 'Employee Pass Documents 2024 Guide' },
  { label: '🏠 Hot:', text: 'How to Rent a Flat in KL' },
  { label: '🎉 BREAKING:', text: 'Indians are VISA-FREE for Malaysia until Dec 31, 2026! Submit MDAC 3 days before arrival — free at imigresen-online.imi.gov.my/mdac/main' },
  { label: '⚠️ EP UPDATE:', text: 'New EP salary thresholds from June 1, 2026: Category I → RM 20,000 | Category II → RM 10,000 | Category III → RM 5,000' },
  { label: '✈️ Updated:', text: 'Tourist Visa Guide — Visa-Free 2026 + MDAC mandatory' },
  { label: '💰 Tips:', text: 'Best Ways to Send Money to India' },
]

export const TOPIC_CARDS = [
  { id: 'epass',     icon: '💼', name: 'Employee Pass',  count: '12 videos' },
  { id: 'tourist',   icon: '✈️', name: 'Tourist Visa',   count: '8 videos'  },
  { id: 'student',   icon: '🎓', name: 'Student Pass',   count: '5 videos'  },
  { id: 'housing',   icon: '🏠', name: 'Housing & Rent', count: '6 videos'  },
  { id: 'bank',      icon: '🏦', name: 'Bank Account',   count: '5 videos'  },
  { id: 'food',      icon: '🍛', name: 'Food',           count: '7 videos'  },
  { id: 'health',    icon: '🏥', name: 'Health',         count: '4 videos'  },
  { id: 'transport', icon: '🚗', name: 'Transport',      count: '5 videos'  },
  { id: 'sim',       icon: '📱', name: 'SIM & Internet', count: '3 videos'  },
  { id: 'money',     icon: '💸', name: 'Money Transfer', count: '4 videos'  },
]

export const ALL_VIDEOS = [
  { icon: '📄', tag: 'Employee Pass', title: 'Employee Pass Documents – Complete List 2024',           meta: '👁 45K views · 25 min' },
  { icon: '🏠', tag: 'Housing',       title: 'How to Find a Flat in KL – Budget to Luxury',            meta: '👁 32K views · 18 min' },
  { icon: '✈️', tag: 'Tourist Visa',  title: 'Malaysia Tourist eVisa from India – Full Guide',         meta: '👁 28K views · 15 min' },
  { icon: '🏦', tag: 'Banking',       title: 'Open a Bank Account in Malaysia – Step by Step',         meta: '👁 24K views · 12 min' },
  { icon: '🍛', tag: 'Food',          title: 'Best Indian Food & Restaurants in KL Malaysia',          meta: '👁 22K views · 10 min' },
  { icon: '🚗', tag: 'Transport',     title: 'How to Get Around KL – MRT, Grab & Bus Guide',           meta: '👁 18K views · 14 min' },
  { icon: '💸', tag: 'Money Transfer',title: 'Best Ways to Send Money from Malaysia to India',         meta: '👁 15K views · 11 min' },
]

// ── Page content definitions ──────────────────────────────────────────────────
export const PAGES = {

  home: {
    hero: { variant: 'lime', emoji: '🇲🇾', badge: '🇮🇳 India → 🇲🇾 Malaysia', title: 'Your Complete\nMalaysia Life Guide', desc: 'Employee Pass, Visa, Housing, Banking, Food & more — everything Indians need to know about living in Malaysia.' },
    stats: [{ n: '50+', l: 'Videos' }, { n: '10K+', l: 'Subscribers' }, { n: '11', l: 'Topics' }, { n: 'Free', l: 'Always' }],
    ad: { icon: '✈️', title: 'Planning to Move to Malaysia?', desc: 'Get a free consultation on your Employee Pass eligibility — speak to a Malaysia immigration expert today.', cta: 'Get Free Advice →' },
    featuredVideo: { tag: 'Latest Video', title: "Employee Pass Documents —\nComplete List 2024", views: '👁 45,000 views · 25 min', videoTag: 'Employee Pass' },
    videos: ALL_VIDEOS.slice(1, 4),
  },

  visa: {
    hero: { variant: 'grad', emoji: '🛂', badge: 'Visa & Entry', title: 'All Ways to\nEnter Malaysia', desc: 'Tourist, Employee, Student, MM2H — find the right visa for your exact situation.' },
    cards: [
      { icon: '💼', title: 'Employee Pass',       desc: 'Job offer required. Company sponsors your pass. Min salary RM 5,000+. Family gets Dependent Pass.' },
      { icon: '✈️', title: 'Tourist Visa (eVisa)', desc: '30–90 day stay. Apply online from India. Cost approx RM 50–100. Processed in 3–5 days.' },
      { icon: '🎓', title: 'Student Pass',         desc: 'University admission first. The university processes the pass on your behalf in most cases.' },
      { icon: '🏡', title: 'MM2H Programme',       desc: 'Long-term residency. High financial requirements. For retirees or permanent stays.' },
    ],
    tip: { icon: '⚠️', title: 'Critical Warning', text: 'Visa overstay is a serious offence in Malaysia. You can be blacklisted, fined, or deported. Always renew or exit before expiry.' },
    quickLinks: ['epass', 'tourist', 'student'],
  },

  epass: {
    hero: { variant: 'lime', emoji: '💼', badge: '⚠️ Updated June 2026', title: 'Employee Pass —\nComplete Guide', desc: 'IMPORTANT: New EP salary minimums from June 1, 2026. Category I: RM 20,000 | Category II: RM 10,000 | Category III: RM 5,000. From documents to approval — every step explained.' },
    ep2026Alert: { cat1:'RM 20,000+', cat2:'RM 10,000–19,999', cat3:'RM 5,000–9,999', cat3mfg:'RM 7,000+ (manufacturing)', effective:'1 June 2026' },
    steps: [
      { title: 'Get Your Job Offer Letter',      desc: 'Receive a written offer with salary, designation, and joining date. Ensure salary meets new EP thresholds from June 2026: EP III minimum RM 5,000 (RM 7,000 for manufacturing).' },
      { title: 'Company Applies via ESD Portal', desc: 'Your employer submits the application through the Expatriate Services Division (ESD) portal. Company must be ESD-registered.' },
      { title: 'Submit Your Documents',          desc: 'Passport, educational certificates, resume, and experience letters — certified copies required. For EP II/III: succession plan document now required.' },
      { title: 'Receive Approval Letter (AIP)',  desc: 'Approval In Principle arrives by email in 2–4 weeks. Keep it safe — needed to enter Malaysia.' },
      { title: 'Arrive & Collect Your i-Kad',   desc: 'Enter with approval letter. Employer completes immigration. You receive the i-Kad expat ID card.' },
    ],
    ad: { icon: '📋', title: 'Need Help with Your Employee Pass?', desc: 'Our partner immigration consultants can handle the entire process for you.', cta: 'Get Help →' },
    cards: [
      { icon: '📘', title: 'Passport',               desc: 'Minimum 18 months validity. Ensure enough blank pages are available.' },
      { icon: '🎓', title: 'Education Certificates', desc: 'Degree & marksheets — Apostille certified. MEF verification may be required.' },
      { icon: '💼', title: 'Experience Letters',      desc: 'All previous employers. On company letterhead with official seal and signature.' },
      { icon: '📸', title: 'Passport Photos',         desc: 'White background, recent. Keep 4–6 copies — needed at multiple steps.' },
    ],
    tip: { icon: '⚠️', title: 'June 2026 EP Salary Update', text: 'NEW from June 1, 2026: EP Category I minimum doubles to RM 20,000. Category II rises to RM 10,000. Category III rises to RM 5,000 (manufacturing: RM 7,000). All renewals after June 1 must also meet new thresholds. Plan your salary negotiation accordingly.' },
    videos: ALL_VIDEOS.filter(v => v.tag === 'Employee Pass'),
  },

  tourist: {
    hero: { variant: 'dark', emoji: '✈️', badge: '🎉 Visa-FREE 2026', title: 'Indians are VISA-FREE\\nfor Malaysia in 2026!', desc: 'No eVisa needed. No fee. Just submit MDAC online 3 days before arrival. Valid until December 31, 2026.' },
    visaFreeAlert: true,
    steps: [
      { title: '📱 Submit MDAC Online (Free)', desc: 'Go to imigresen-online.imi.gov.my/mdac/main — fill in passport, travel dates, flight number, hotel address. Takes 10 minutes. Must be done at least 3 days before arrival. IT\'S FREE.' },
      { title: '✈️ Book Return Flight',        desc: 'You need a confirmed return flight. Immigration officers may ask to see it at entry. Book before submitting MDAC.' },
      { title: '🏨 Book Accommodation',        desc: 'Hotel booking confirmation required. Even AirBnB booking printout works. Show at immigration if asked.' },
      { title: '🛫 Check-in at Airport',        desc: 'Airlines may verify your MDAC confirmation at check-in. Carry screenshot / printout of your MDAC reference number.' },
      { title: '🇲🇾 Arrive & Enjoy 30 Days',  desc: 'At Malaysia immigration, officer scans passport. No visa stamp needed — it\'s all digital. Welcome to Malaysia! 🎉' },
    ],
    cards: [
      { icon: '🎉', title: 'VISA-FREE for Indians', desc: 'No application, no fee, no wait. Indians can visit Malaysia visa-free until December 31, 2026.' },
      { icon: '⏰', title: 'Stay Up to 30 Days',    desc: 'Each visit: up to 30 days. Extension possible at Immigration Dept (RM 100 for 30 more days).' },
      { icon: '📱', title: 'MDAC is Mandatory',     desc: 'Malaysia Digital Arrival Card must be submitted FREE online at least 3 days before arrival. No MDAC = no entry.' },
    ],
    tip: { icon: '⚠️', title: 'MDAC is NOT Optional', text: 'The Malaysia Digital Arrival Card (MDAC) is mandatory even with visa-free entry. Submit at imigresen-online.imi.gov.my/mdac/main — free, 10 minutes, minimum 3 days before arrival. Airlines may deny boarding without MDAC confirmation.' },
    mdacUrl: 'https://imigresen-online.imi.gov.my/mdac/main',
  },

  student: {
    hero: { variant: 'lime', emoji: '🎓', badge: 'Student Pass', title: 'Study in Malaysia —\nComplete Guide', desc: 'Universities, fees, visa process — everything you need before applying.' },
    cards: [
      { icon: '🏫', title: 'Top Universities', desc: 'UM, UTM, UPM, Monash Malaysia, Taylor\'s, HELP — from RM 15,000/year.' },
      { icon: '📝', title: 'How to Apply',     desc: 'Apply to university → get offer letter → university processes your Student Pass.' },
      { icon: '💰', title: 'Tuition Fees',     desc: 'Undergraduate: RM 40,000–80,000. Masters: RM 20,000–50,000. Far cheaper than UK/Australia.' },
      { icon: '🏠', title: 'Living Cost',      desc: 'Hostel + food + transport: RM 800–1,500/month. Very affordable student lifestyle.' },
    ],
    tip: { icon: '💡', title: 'Part-Time Work', text: 'Student Pass holders can work up to 20 hours/week during semester breaks. Always verify exact conditions on your visa first.' },
  },

  housing: {
    hero: { variant: 'grad', emoji: '🏠', badge: 'Housing & Rent', title: 'How to Find\na Home in KL', desc: 'Best areas, budgets, apps, and rental tips for Indians moving to Malaysia.' },
    cards: [
      { icon: '📍', title: 'Brickfields (Little India)', desc: "KL's Indian heart. Temples, restaurants, groceries all nearby. RM 800–1,500/month." },
      { icon: '📍', title: 'Bangsar & KL Sentral',       desc: 'Excellent transport links, popular with working professionals. RM 1,200–2,500/month.' },
      { icon: '📍', title: 'Petaling Jaya (PJ)',         desc: 'Suburban, family-friendly, many IT companies nearby. RM 900–1,800/month.' },
      { icon: '📍', title: 'Puchong & Subang',           desc: 'Most affordable with a good Indian community. RM 700–1,200/month.' },
    ],
    ad: { icon: '🏠', title: 'Find Your Perfect Home in KL', desc: 'Browse thousands of verified rental listings — search by area and budget.', cta: 'Search Now →' },
    steps: [
      { title: 'Use PropertyGuru & iProperty Apps', desc: "Malaysia's top property apps. Filter by location, budget, and property type easily." },
      { title: 'Get a Stamped Tenancy Agreement',   desc: 'Protects both parties. Expect 2 months deposit + 1 month utility deposit upfront.' },
      { title: 'Check Utility Bills First',          desc: 'Ask for recent electricity (TNB) and water bills. AC units can cost RM 100–250/month.' },
    ],
    tip: { icon: '⚠️', title: 'Scam Warning', text: 'Fake listings are common on Facebook and WhatsApp. Always visit first, verify photos match reality. Never pay an advance without a proper receipt.' },
  },

  bank: {
    hero: { variant: 'lime', emoji: '🏦', badge: 'Bank Account', title: 'Open a Bank Account\nin Malaysia', desc: 'Which bank is best? What documents? How to send money home to India?' },
    cards: [
      { icon: '🥇', title: 'Maybank',   desc: "Malaysia's #1 bank. Excellent MAE app. Easiest for new arrivals to open an account." },
      { icon: '🏦', title: 'CIMB Bank', desc: 'Great mobile app and low fees. OctoPay wallet useful for everyday spending.' },
      { icon: '🏦', title: 'RHB Bank',  desc: 'Popular among Indians in Malaysia. Good customer service. Solid salary account.' },
      { icon: '🌍', title: 'HSBC',      desc: 'Best for international wire transfers. Makes sending money to India straightforward.' },
    ],
    steps: [
      { title: 'Original Passport',    desc: 'With valid Malaysia entry stamp or active visa. Must be original, not a photocopy.' },
      { title: 'Employee Pass / i-Kad',desc: 'Valid work permit or i-Kad is required by all Malaysian banks to open an account.' },
      { title: 'Proof of Address',     desc: 'Malaysian utility bill, tenancy agreement, or employer letter showing your address.' },
    ],
    tip: { icon: '💸', title: 'Sending Money to India', text: 'Wise (formerly TransferWise) is the best — lowest fees and best exchange rates. Brickfields money changers and Western Union are also good options.' },
  },

  transport: {
    hero: { variant: 'dark', emoji: '🚗', badge: 'Transport', title: 'Getting Around\nMalaysia', desc: 'MRT, Bus, Grab, or your own car — the complete commuting guide for KL.' },
    cards: [
      { icon: '🚇', title: 'MRT / LRT / Monorail', desc: 'Best public transport in KL. Use Touch & Go card. RM 1–5 per trip. Clean and AC.' },
      { icon: '🚖', title: 'Grab (like Ola/Uber)',  desc: 'Most convenient. Download the app. Safe, reliable. RM 8–20 per trip in KL.' },
      { icon: '🚌', title: 'RapidKL Bus',            desc: 'Cheapest option. RM 1–2.50 per trip. Use Touch & Go card. Wide KL coverage.' },
      { icon: '🚗', title: 'Own Car',                desc: 'Worth it for long-term residents. Indian license valid 3 months. Proton/Perodua affordable.' },
    ],
    tip: { icon: '🎫', title: 'Get a Touch & Go Card First', text: "Malaysia's universal card for toll, MRT, bus, and LRT. Costs RM 10 at any convenience store. Top it up as needed." },
  },

  food: {
    hero: { variant: 'lime', emoji: '🍛', badge: 'Food & Groceries', title: "Indian Food Guide\nin Malaysia", desc: "Little India, restaurants, grocery stores — you'll never miss home-cooked food." },
    cards: [
      { icon: '🏘️', title: 'Little India (Brickfields)', desc: "KL's Indian hub. Dosa, idli, biryani, paan — all here. Indian grocery shops right next door." },
      { icon: '🍽️', title: 'Mamak Restaurants',          desc: 'Open 24/7. Roti canai, Mee goreng, Teh Tarik. A full meal for just RM 5–10.' },
      { icon: '🛒', title: 'Indian Grocery Stores',       desc: 'Mydin, Giant, Cold Storage all have Indian sections. Atta, dal, spices — all available.' },
      { icon: '🥗', title: 'Vegetarian Options',          desc: 'Many vegetarian restaurants in KL. Areas near Hindu temples are especially good.' },
    ],
    tip: { icon: '🌶️', title: 'Try Malaysian Food Too!', text: 'Nasi Lemak, Char Kway Teow, and Laksa are hugely popular with Indians — spicy and flavourful. Don\'t miss them!' },
  },

  health: {
    hero: { variant: 'grad', emoji: '🏥', badge: 'Health & Insurance', title: 'Healthcare Guide\nin Malaysia', desc: 'Hospitals, clinics, and insurance — Malaysia has excellent healthcare. Here\'s how to use it.' },
    cards: [
      { icon: '🏥', title: 'Government Hospitals', desc: 'KL Hospital (HKL) — RM 1–5 per consultation. Quality care, longer wait times.' },
      { icon: '🏥', title: 'Private Hospitals',    desc: 'Pantai, KPJ, Sunway Medical — world-class. Expensive without insurance.' },
      { icon: '💊', title: 'Clinics (Klinik)',      desc: 'General checkups. RM 30–60 per visit. Common medications readily available.' },
      { icon: '🛡️', title: 'Health Insurance',     desc: 'AIA, Prudential, Great Eastern — top providers. RM 100–300/month. Most employers include this.' },
    ],
    ad: { icon: '🛡️', title: 'Get Health Insurance in Malaysia', desc: 'Compare plans from AIA, Prudential & Great Eastern — starting from RM 80/month.', cta: 'Compare Plans →' },
    tip: { icon: '⚠️', title: 'Insurance is Essential', text: 'One private hospital admission can cost RM 10,000+. Always insist on health coverage from your employer. Never arrive in Malaysia without it.' },
  },

  sim: {
    hero: { variant: 'lime', emoji: '📱', badge: 'SIM & Internet', title: 'Best SIM Card\nin Malaysia', desc: 'Maxis, Celcom, Digi, U Mobile — full comparison and our top recommendation for Indians.' },
    cards: [
      { icon: '📶', title: 'Maxis / Hotlink',  desc: 'Best nationwide coverage. RM 25–50/month. Most popular among Indians in Malaysia.' },
      { icon: '📶', title: 'CelcomDigi',        desc: 'Good coverage, especially outside KL. Budget-friendly at RM 20–40/month.' },
      { icon: '📶', title: 'U Mobile',          desc: 'Cheapest plans. Unlimited data from RM 30–38/month. Slightly less rural coverage.' },
      { icon: '🏠', title: 'Home Fibre (Unifi)',desc: 'TM Unifi — most popular home broadband. Plans from RM 80–150/month.' },
    ],
    tip: { icon: '💡', title: 'Start with Prepaid', text: 'For new arrivals, begin with a prepaid SIM. After 3 months switch to postpaid for better value. Maxis Hotlink RM 30 plan is the best starter.' },
  },

  money: {
    hero: { variant: 'dark', emoji: '💸', badge: 'Money & Remittance', title: 'Send Money to India —\nBest Options', desc: 'Best exchange rates and lowest fees so your family receives the maximum amount.' },
    cards: [
      { icon: '⭐', title: 'Wise (Best Option)', desc: 'Best exchange rate and lowest fees. Direct transfer to any Indian bank. Arrives in 1–2 days.' },
      { icon: '🏪', title: 'Money Changers',      desc: 'Physical shops. Brickfields offers the best rates in KL. No app needed.' },
      { icon: '🏦', title: 'Bank Wire (TT)',       desc: 'Via HSBC or Maybank. Fee RM 5–15 per transfer. Reliable but slightly costly.' },
      { icon: '📱', title: 'Western Union',        desc: 'Same-day transfer. Cash pickup available in India. Slightly higher fees.' },
    ],
    tip: { icon: '📊', title: 'Always Check Rates First', text: 'Before transferring, check xe.com for the live rate. A good rate is RM 1 = ₹17–19. Brickfields money changers usually beat bank rates.' },
  },

  videos: {
    hero: { variant: 'lime', emoji: '🎬', badge: 'All Videos', title: 'NikiBhavi —\nAll Videos', desc: 'Every guide in one place. Subscribe on YouTube — completely free!' },
    videos: ALL_VIDEOS,
  },

  about: {
    hero: { variant: 'grad', emoji: '👤', badge: 'About Us', title: 'Who is\nNikiBhavi?', desc: 'Indians helping Indians — honest, real information for everyone making the move to Malaysia.' },
    cards: [
      { icon: '🎯', title: 'Our Mission',        desc: 'Every Indian moving to Malaysia deserves accurate info before they arrive. No surprises, no scams.' },
      { icon: '🌍', title: 'Language',           desc: 'Content in English and Hindi — so the maximum number of Indians can benefit from our guides.' },
      { icon: '📲', title: 'Contact Us',         desc: 'DM on Instagram or comment on YouTube. We try to answer every single question we receive.' },
      { icon: '💼', title: 'Advertise with Us',  desc: 'Reach thousands of Indians moving to Malaysia. Contact us for sponsorship and advertising opportunities.' },
    ],
  },
}
