import { useState } from 'react'
import styles from './EPLifeGuide.module.css'
import PrivacyNotice from './PrivacyNotice'

// ── Data ─────────────────────────────────────────────────────

const SECTIONS = [
  { id:'salary',    emoji:'💰', label:'Best Salary',        sub:'Single / Couple / Family' },
  { id:'sim',       emoji:'📱', label:'Best SIM Card',      sub:'Postpaid & Prepaid compare' },
  { id:'house',     emoji:'🏠', label:'Find Best House',    sub:'Areas, costs & what to pay' },
  { id:'bank',      emoji:'🏦', label:'Open Bank Account',  sub:'Docs & which bank' },
  { id:'credit',    emoji:'💳', label:'Credit Card',        sub:'Eligibility & best picks' },
  { id:'simport',   emoji:'🔄', label:'Port Your SIM',      sub:'How to switch network' },
  { id:'rentcosts', emoji:'🗝️', label:'Renting Costs',      sub:'Deposit, access card & more' },
  { id:'endlease',  emoji:'📋', label:'End of Tenancy',     sub:'What to do before leaving' },
  { id:'internet',  emoji:'🌐', label:'Home Internet',      sub:'Best fibre plans 2026' },
  { id:'water',     emoji:'💧', label:'Water Purifier',     sub:'Which one & where to buy' },
  { id:'areas',     emoji:'📍', label:'Best Areas to Stay', sub:'KL zones for Indians' },
  { id:'grocery',   emoji:'🛒', label:'Indian Groceries',   sub:'Fish, milk, spices & more' },
  { id:'school',    emoji:'🎓', label:'School Guide',       sub:'Tamil, national & international' },
  { id:'malls',     emoji:'🏪', label:'Weekday Mall Plan',  sub:'Best malls near you' },
  { id:'weekend',   emoji:'🌴', label:'Weekend Getaways',   sub:'Nearest places to visit' },
  { id:'kids',      emoji:'🎢', label:'Weekend — Kids',     sub:'Fun places for children' },
  { id:'lunch',     emoji:'🍛', label:'Lunch Out',          sub:'Best Indian restaurants' },
]

const CONTENT = {
  salary: {
    title: 'What Salary is Best for EP Holders?',
    intro: 'EP minimum is RM 5,000 but living comfortably depends on your situation. Here\'s a realistic breakdown:',
    cards: [
      {
        label: '🧑 Single',
        color: '#2563eb',
        min: 'RM 5,000',
        comfortable: 'RM 6,000–7,000',
        ideal: 'RM 8,000+',
        breakdown: [
          ['Rent (studio/1BR in KL)', 'RM 1,500–2,000'],
          ['Food & groceries', 'RM 800–1,200'],
          ['Transport (Grab + LRT)', 'RM 300–500'],
          ['Utilities + internet', 'RM 200–300'],
          ['Personal / savings', 'RM 1,000–2,000'],
          ['India remittance', 'RM 500–1,000'],
        ],
        tip: 'On RM 5,000 you can survive but savings will be tight. RM 7,000+ gives breathing room.',
      },
      {
        label: '👫 Couple (both working)',
        color: '#16a34a',
        min: 'RM 5,000 each',
        comfortable: 'RM 6,000 each',
        ideal: 'RM 7,000+ each',
        breakdown: [
          ['Rent (2BR in good area)', 'RM 2,200–3,000'],
          ['Food & groceries', 'RM 1,500–2,000'],
          ['2× transport', 'RM 600–900'],
          ['Utilities + internet', 'RM 250–350'],
          ['Personal + savings', 'RM 2,000–3,500'],
          ['India remittance ×2', 'RM 1,000–2,000'],
        ],
        tip: 'Combined income RM 12K–14K is very comfortable. Can save RM 3K–5K/month easily.',
      },
      {
        label: '👨‍👩‍👧 Family with Kids',
        color: '#f59e0b',
        min: 'RM 8,000',
        comfortable: 'RM 10,000–12,000',
        ideal: 'RM 15,000+',
        breakdown: [
          ['Rent (3BR with school zone)', 'RM 2,800–4,000'],
          ['Food & groceries', 'RM 2,000–2,800'],
          ['School fees (Tamil SK)', 'RM 300–800/yr'],
          ['School fees (International)', 'RM 2,000–6,000/mo'],
          ['Transport + car loan', 'RM 800–1,500'],
          ['Medical insurance', 'RM 300–600/mo'],
          ['Family savings + remit', 'RM 1,500–3,000'],
        ],
        tip: 'For international school kids, add RM 2,500–6,000/month to budget. Tamil or national school is very affordable.',
      },
    ],
    notes: [
      '💡 EPF (11%) + SOCSO + PCB tax are deducted from gross salary — take-home on RM 8,000 gross ≈ RM 6,400',
      '🚗 If buying a car, add RM 600–1,200/month loan + parking RM 150–400/month',
      '🏥 Company medical card saves huge — negotiate this in offer letter',
    ],
  },

  sim: {
    title: 'Best SIM Card for EP Holders',
    intro: 'Get a postpaid line — it builds credit history, needed for bank & credit card. Prepaid is fine temporarily.',
    postpaid: [
      { name:'Maxis', plan:'Maxis Postpaid 80', price:'RM 80/mo', data:'40GB', calls:'Unlimited', verdict:'Best coverage nationwide, premium', star:true },
      { name:'Celcom', plan:'Celcom MEGA 60', price:'RM 60/mo', data:'30GB', calls:'Unlimited', verdict:'Good for Sabah/Sarawak travel', star:false },
      { name:'Digi', plan:'Digi Postpaid 60', price:'RM 60/mo', data:'35GB', calls:'Unlimited', verdict:'Best for KL & Selangor area', star:false },
      { name:'U Mobile', plan:'U Postpaid 45', price:'RM 45/mo', data:'30GB', calls:'Unlimited', verdict:'Budget best value, good urban coverage', star:true },
      { name:'YES 5G', plan:'YES Postpaid 60', price:'RM 60/mo', data:'Unlimited 5G', calls:'Unlimited', verdict:'Best for 5G areas in KL', star:false },
    ],
    prepaid: [
      { name:'Hotlink (Maxis)', plan:'Hotlink Prepaid', price:'RM 0.02/MB or bundle', data:'From RM 10', verdict:'Best prepaid coverage' },
      { name:'Digi Prepaid', plan:'DG Prepaid Value', price:'RM 0', data:'From RM 8/7 days', verdict:'Good short-term use' },
    ],
    docs: ['Passport (original + copy)', 'Employment Pass (EP)', 'Employer letter (some require)', 'RM 50–200 for deposit (postpaid)'],
    tip: '✅ Recommended: Get Maxis or U Mobile postpaid first week. Postpaid bill = proof of address for bank account opening.',
  },

  house: {
    title: 'How to Find the Best House in Malaysia',
    intro: 'Most Indians prefer Cheras, Ampang, Puchong, Sri Petaling, Subang. Here\'s how to find the right one.',
    steps: [
      { step:'1', title:'Use these portals', desc:'PropertyGuru.com.my, iProperty.com.my, Mudah.my, Facebook Groups ("Indians in Malaysia Rent"). WhatsApp groups are fastest for Indian-community areas.' },
      { step:'2', title:'Types of units', desc:'Condo: RM 1,500–3,500. Terrace house: RM 1,800–4,000. Studio/SoHo: RM 900–1,600. Serviced apt: RM 1,400–2,800. Always ask if it\'s furnished.' },
      { step:'3', title:'Things to check', desc:'Water pressure test all taps. Air-con condition (test cooling). Hot water heater working. WiFi infrastructure (ask TM or TIME availability). Parking allocation. Security guard 24hr.' },
      { step:'4', title:'Near Tamil areas', desc:'Cheras: Taman Connaught, Batu 9. Ampang: Taman Cahaya, Pandan Indah. Puchong: IOI, Bandar Puteri. Sri Petaling: High Indian density. Subang SS15/SS17 near LRT.' },
      { step:'5', title:'Negotiate', desc:'Ask for 1 month free rent on 1-year contract. Ask landlord to repaint, fix AC, change mattress before move-in. Get everything in writing in the tenancy agreement.' },
    ],
    greenflags: ['24hr security guard', 'Covered parking included', 'Gym + pool access', 'Near MRT/LRT station', 'Masjid India / Brickfields nearby', 'Indian grocery shop walking distance'],
    redflags: ['No security / open access', 'Monthly rent cash only (no receipt)', 'No official tenancy agreement', 'Mold or water stain on walls', 'Old wiring / no earthing', 'Landlord refuses to fix before move-in'],
  },

  bank: {
    title: 'How to Open a Bank Account in Malaysia',
    intro: 'Open within first 2 weeks. Needed for salary crediting, online shopping, bill payments.',
    banks: [
      { name:'Maybank', type:'Best overall', why:'Most ATMs, best online banking, Indian-friendly staff in many branches', docs:['Passport', 'EP', 'Offer letter / employment letter', 'Address proof (postpaid bill or utility bill)', 'RM 20–50 initial deposit'] },
      { name:'CIMB', type:'Best for expats', why:'Opens account same day, good expat experience, free debit card', docs:['Passport', 'EP', 'Employment letter', 'RM 10 initial deposit'] },
      { name:'Public Bank', type:'Best savings rate', why:'Higher FD rates, stable, preferred by long-term residents', docs:['Passport', 'EP', 'Employment letter', 'RM 50 initial deposit'] },
      { name:'RHB', type:'Good alternative', why:'Easy online banking, quick account opening', docs:['Passport', 'EP', 'RM 20 deposit'] },
    ],
    tips: [
      '📋 Bring employer stamp + HR letter — speeds up the process significantly',
      '📱 Download the bank app same day — set up online banking before leaving branch',
      '💳 Request debit card + cheque book at the same time',
      '⏱️ Best time to visit: Tuesday–Thursday 10am–12pm (less queue)',
      '🏢 Go to a main branch, not a small outlet — main branches handle expat accounts faster',
    ],
  },

  credit: {
    title: 'Credit Card for EP Holders — Am I Eligible?',
    intro: 'Yes, EP holders can apply. Banks typically approve after 3–6 months of Malaysian income history.',
    eligibility: [
      { cond:'EP valid for 1+ year', ok:true },
      { cond:'Minimum salary RM 24,000/year (RM 2,000/month)', ok:true },
      { cond:'Malaysian bank account with 3+ month salary history', ok:true },
      { cond:'Postpaid phone line (proves address & credit behavior)', ok:true },
      { cond:'No existing bad credit in Malaysia', ok:true },
      { cond:'Permanent Resident status NOT required', ok:true },
    ],
    cards: [
      { bank:'Maybank', card:'Visa Signature', income:'RM 60K/yr', cashback:'5% dining + 0.2% others', fee:'RM 550/yr waived', best:'High spenders', color:'#f59e0b' },
      { bank:'CIMB', card:'Cash Rebate Platinum', income:'RM 36K/yr', cashback:'10% petrol, 5% groceries', fee:'Free first year', best:'Groceries + petrol', color:'#dc2626' },
      { bank:'Public Bank', card:'Quantum Visa', income:'RM 24K/yr', cashback:'5% online + contactless', fee:'RM 80/yr', best:'Low income threshold', color:'#2563eb' },
      { bank:'RHB', card:'Visa Platinum', income:'RM 24K/yr', cashback:'5% dining', fee:'RM 150/yr waived', best:'First credit card', color:'#7c3aed' },
    ],
    tips: [
      '⏰ Apply after 6 months in Malaysia — higher approval rate',
      '📄 Attach 3 months salary slip + EPF statement with application',
      '💳 Start with Public Bank or RHB — lower income threshold, easier approval',
      '🚫 Never apply for 2+ cards at once — hurts credit score',
    ],
  },

  simport: {
    title: 'How to Port Your SIM to Another Network (MNP)',
    intro: 'MNP = Mobile Number Portability. Keep your existing number, switch to better plan. Takes 3 hours–1 working day.',
    steps: [
      { step:'1', title:'Check if eligible', desc:'Your current postpaid contract must be completed. Prepaid can port anytime. Outstanding bills must be cleared.' },
      { step:'2', title:'Choose new network', desc:'Visit the new network\'s store (e.g. going from Digi → Maxis: go to Maxis centre). Bring passport + EP + old SIM.' },
      { step:'3', title:'Fill MNP form', desc:'At the new network counter, request MNP. They give you a new SIM with same number. No online process — must visit store.' },
      { step:'4', title:'Wait for activation', desc:'Porting completes in 3–24 hours. Your old SIM will stop working. New SIM activates with same number.' },
      { step:'5', title:'Update contacts', desc:'Tell your employer HR to update payroll records. Update banking OTP number. Inform bank immediately.' },
    ],
    important: [
      '⚠️ Do NOT port before clearing last month bill — old telco can reject MNP',
      '📍 Visit new network store in person — cannot be done online or via app',
      '📲 WhatsApp, Telegram history stays safe — linked to phone, not SIM',
      '🏦 Update your bank immediately — OTP will come to new SIM',
      '⏱️ Best to port on Friday after work — active by Monday morning',
    ],
  },

  rentcosts: {
    title: 'Renting a House — All Costs You Must Pay',
    intro: 'Before moving in, landlords collect several payments. Know exactly what to expect:',
    costs: [
      { item:'Security Deposit', amount:'2 months rent', example:'RM 3,000 for RM 1,500/mo rent', desc:'Refundable. Returned within 30 days after vacating (minus deductions for damage)', color:'#2563eb' },
      { item:'Utility Deposit', amount:'½ month rent', example:'RM 750', desc:'Some landlords charge this. Refundable when you move out. Covers electricity & water.', color:'#7c3aed' },
      { item:'1st Month Rent', amount:'1 month rent', example:'RM 1,500', desc:'Paid upfront before moving in. Then monthly on due date.', color:'#16a34a' },
      { item:'Access Card / FOB', amount:'RM 50–200 each', example:'RM 100 × 2 cards = RM 200', desc:'For condo gate, lobby, gym. Usually 2 cards given. Lost card: RM 50–150 replacement.', color:'#f59e0b' },
      { item:'Tenancy Agreement', amount:'RM 200–500', example:'Stamping fee at LHDN', desc:'Lawyer prepares TA, tenant usually pays stamp duty. RM 1/250 of total rent value.', color:'#ef4444' },
      { item:'Parking Deposit', amount:'RM 100–500', example:'Some condos charge separately', desc:'Refundable. Get parking number in writing in TA.', color:'#0891b2' },
      { item:'Furniture Deposit', amount:'1 month rent', example:'RM 1,500 (furnished units)', desc:'Only for fully furnished. Refunded if no damage. Always photograph everything on move-in.', color:'#d97706' },
    ],
    total: {
      label: 'Total Move-In Budget (RM 2,000/mo fully furnished condo)',
      items: ['Security deposit: RM 4,000', 'Utility deposit: RM 1,000', '1st month rent: RM 2,000', 'Access cards: RM 200', 'Tenancy agreement: RM 350', 'Furniture deposit: RM 2,000', '➡️ TOTAL: ~RM 9,550 upfront'],
    },
    tips: [
      '📸 Take photos + video of EVERYTHING before moving in — send to WhatsApp to landlord',
      '📄 Read tenancy agreement carefully — check notice period (usually 2 months)',
      '🔑 Get official receipt for every payment made',
      '🚰 Test water, electricity, AC, hot water before signing',
    ],
  },

  endlease: {
    title: 'End of Tenancy — What To Do Before Leaving',
    intro: 'Give proper notice and do these steps to get your full deposit back.',
    timeline: [
      { days:'60 days before', title:'Give written notice', desc:'WhatsApp + email landlord. "I wish to vacate on [date] as per 2-month notice clause." Keep screenshot.' },
      { days:'30 days before', title:'Start minor repairs', desc:'Fill nail holes, repaint scuffs, fix loose handles. Cheaper to DIY than landlord deducting deposit.' },
      { days:'7 days before', title:'Deep clean the unit', desc:'Hire professional cleaner (RM 150–400). Includes aircon cleaning. Landlord cannot deduct for normal wear & tear.' },
      { days:'3 days before', title:'Settle all utilities', desc:'Pay final TNB electricity bill, Syabas water bill. Get final reading done. Cancel TM/Maxis home internet.' },
      { days:'Move-out day', title:'Joint inspection', desc:'Walk through with landlord. Mark any disputed items. Sign move-out form together.' },
      { days:'After move-out', title:'Return keys + cards', desc:'Return ALL access cards, keys, parking sticker. Get written acknowledgment.' },
      { days:'Within 30 days', title:'Deposit refund', desc:'Landlord must return deposit within 30 days. If delayed, send formal notice. DBKL/tribunal if unresolved.' },
    ],
    donts: [
      '❌ Don\'t leave without written notice — landlord can forfeit deposit',
      '❌ Don\'t turn off utilities before landlord acknowledges',
      '❌ Don\'t leave large furniture behind without landlord consent',
      '❌ Don\'t pay last month rent from deposit — illegal and can cause issues',
    ],
  },

  internet: {
    title: 'Best Home Internet in Malaysia 2026',
    intro: 'Fibre is standard now. TM Unifi covers most areas; TIME is fastest for condos. Check coverage first.',
    plans: [
      { provider:'TM Unifi', speed:'100 Mbps', price:'RM 99/mo', contract:'24 months', router:'Free', coverage:'Widest — terrace, condo, landed', best:'Most areas', color:'#2563eb', star:true },
      { provider:'TM Unifi', speed:'300 Mbps', price:'RM 129/mo', contract:'24 months', router:'Free', coverage:'Same wide coverage', best:'Family with streaming', color:'#2563eb', star:false },
      { provider:'TIME Fibre', speed:'500 Mbps', price:'RM 99/mo', contract:'24 months', router:'Free mesh', coverage:'Selected condos in KL/PJ/Selangor', best:'Fastest if available', color:'#7c3aed', star:true },
      { provider:'TIME Fibre', speed:'1 Gbps', price:'RM 139/mo', contract:'24 months', router:'Free mesh', coverage:'Same TIME buildings', best:'Work from home / gaming', color:'#7c3aed', star:false },
      { provider:'Maxis Fibre', speed:'100 Mbps', price:'RM 99/mo', contract:'24 months', router:'Free', coverage:'Good urban coverage', best:'Bundle with Maxis mobile', color:'#f59e0b', star:false },
      { provider:'Yes 5G Home', speed:'100 Mbps', price:'RM 79/mo', contract:'No contract', router:'RM 0 with plan', coverage:'5G coverage areas only', best:'No contract flexibility', color:'#16a34a', star:false },
    ],
    tips: [
      '🔍 Check TIME coverage first at time.com.my/my/residential — if available, TIME is best value',
      '📞 Call TM 100 to check Unifi coverage at your address before signing lease',
      '📦 Installation takes 3–7 working days — book in advance',
      '🔄 Yes 5G Home WiFi is best if you move often — no contract, plug and play',
      '🎁 Look for promotions: free mesh router, 1st month free, or cashback via Shopee/Lazada apps',
    ],
  },

  water: {
    title: 'Water Purifier — Which One to Get?',
    intro: 'KL tap water is treated but pipe conditions vary in older buildings. Most Indians prefer a purifier.',
    options: [
      { type:'Under-sink RO Filter', brands:'Coway, NOVITA, A.O. Smith', price:'RM 1,500–4,000 one-time OR RM 60–100/mo rental', pros:'Cleanest water, removes 99%+ contaminants, permanent', cons:'Needs plumber installation, annual filter change', best:'Best for family / long stay', color:'#2563eb' },
      { type:'Countertop Purifier', brands:'Coway Prime, Panasonic', price:'RM 800–2,000 one-time OR RM 50–80/mo rental', pros:'No installation, portable, easy to move', cons:'Takes counter space, slower flow', best:'Renters / condo living', color:'#16a34a' },
      { type:'Pitcher Filter (Brita)', brands:'Brita, Cleansui', price:'RM 80–200 + RM 30–50 filter/2 months', pros:'Cheapest, no installation', cons:'Small volume, filter change needed', best:'Temporary / budget option', color:'#f59e0b' },
      { type:'Alkaline Water Purifier', brands:'Coway, Tyent, Kangen', price:'RM 3,000–12,000', pros:'Alkaline water benefits, long-lasting', cons:'Very expensive, debated health claims', best:'If health-conscious & long stay', color:'#7c3aed' },
    ],
    recommendation: '✅ Best for most EP holders: Coway countertop rental plan at RM 60–80/month. No installation headache, company maintains it, take it when you move.',
    where: ['Coway Malaysia (Official): coway.com.my', 'Lazada / Shopee — frequent 50–70% off promotions', 'AEON, Giant, myNEWS — small countertop models', 'Indian friends recommendation — often get referral discount'],
  },

  areas: {
    title: 'Best Areas to Stay for Indians in Malaysia',
    intro: 'These zones have strong Indian communities, Tamil food, grocery shops, temples and good transport.',
    areas: [
      { name:'Cheras (KL)', rating:'⭐⭐⭐⭐⭐', rent:'RM 1,400–2,800', why:'Highest Indian density, Tamil restaurants everywhere, great MRT access, Sri Sakthi, Murugan Kovil', transport:'MRT Cheras, Taman Connaught', indian:'★★★★★', color:'#f59e0b' },
      { name:'Ampang', rating:'⭐⭐⭐⭐⭐', rent:'RM 1,500–3,000', why:'Old Indian area, Seremban chicken rice, Little India feel, many Tamil schools', transport:'Ampang LRT', indian:'★★★★★', color:'#ef4444' },
      { name:'Puchong', rating:'⭐⭐⭐⭐', rent:'RM 1,300–2,500', why:'Affordable, large Indian community in Bandar Puteri/IOI, Tamil temples, good highways', transport:'LRT Pusat Bandar Puchong', indian:'★★★★', color:'#2563eb' },
      { name:'Sri Petaling', rating:'⭐⭐⭐⭐⭐', rent:'RM 1,400–2,600', why:'Strong Tamil community, many Indian restaurants, Brickfields nearby, active Tamil associations', transport:'MRT Sri Petaling', indian:'★★★★★', color:'#16a34a' },
      { name:'Subang Jaya', rating:'⭐⭐⭐⭐', rent:'RM 1,600–3,200', why:'Modern area, SS15/SS17 popular, good malls, mix of Indian & Chinese families', transport:'LRT SS15, Subang Jaya', indian:'★★★', color:'#7c3aed' },
      { name:'Brickfields (KL)', rating:'⭐⭐⭐⭐', rent:'RM 1,800–3,500', why:'Official Little India, Sri Mahamariamman Temple, saree shops, Tamil restaurants, central location', transport:'KL Sentral (all lines)', indian:'★★★★★', color:'#d97706' },
      { name:'Klang', rating:'⭐⭐⭐', rent:'RM 900–1,800', why:'Very affordable, large Indian estate community, but far from KL city, less corporate offices', transport:'KTM Komuter', indian:'★★★★', color:'#0891b2' },
    ],
  },

  grocery: {
    title: 'Where to Find Indian Groceries in Malaysia',
    intro: 'You\'ll find everything — from Kolkata rosogulla to Madurai jasmine oil. Here\'s where:',
    categories: [
      {
        cat:'🛒 Indian Grocery Stores',
        items: [
          { name:'Mustafa / Mydin', where:'All over Malaysia', what:'Best for bulk Indian spices, dal, rice (ponni, basmati), snacks, Horlicks, Ovaltine' },
          { name:'Little India (Brickfields)', where:'KL Sentral area', what:'Sarees, spices, fresh jasmine, Tamil movie DVDs, puja items, cooking vessels' },
          { name:'Mahameru Stores', where:'Cheras, Ampang, Klang', what:'South Indian staples — tamarind, curry leaves, drumstick, raw mango' },
          { name:'Tamil Grocery Shops', where:'Near Tamil temples', what:'Local Tamil community shops, fresh curry leaves, drumstick daily, cheaper than supermarket' },
        ],
      },
      {
        cat:'🐟 Fresh Fish',
        items: [
          { name:'Wet Markets (Pasar)', where:'Chow Kit, Selayang', what:'Biggest wet market. Indian fish — vanjaram, seer fish, pomfret, crab, prawn. Best price before 8am' },
          { name:'Chow Kit Market', where:'Jalan Raja Laut, KL', what:'Best fresh fish market in KL. Open from 5am. Fishmongers know Indian fish names.' },
          { name:'Indian Fishmongers', where:'Brickfields, Ampang Pasar', what:'Specifically cater to Indians. Will cut the Kerala/Tamil style on request.' },
          { name:'Tesco / Aeon', where:'All major areas', what:'Clean frozen fish. Less variety but convenient. Look for Kerala fish section in Cheras stores.' },
        ],
      },
      {
        cat:'🥛 Indian Milk & Dairy',
        items: [
          { name:'UHT Full Cream Milk', where:'All supermarkets', what:'Farm Fresh, Marigold are popular. Taste closest to Indian milk.' },
          { name:'Curd / Yogurt', where:'Guardian, Tesco', what:'Marigold plain yogurt (best for curd rice), Vitagen, Yakult widely available' },
          { name:'Paneer', where:'Cold Storage, Village Grocer', what:'Indian-made paneer in KL. Also available at Little India shops. Or make from UHT milk at home.' },
          { name:'Ghee', where:'Any Indian grocery', what:'Minyak sapi = ghee in Malay. Cow Brand, Anchor ghee widely available.' },
          { name:'Coconut Milk (Santan)', where:'All supermarkets', what:'Kara brand, Ayam brand — fresh santan at Tesco, best for curries' },
        ],
      },
      {
        cat:'🌿 Fresh Vegetables',
        items: [
          { name:'Curry leaves (Daun Kari)', where:'Any Pasar / Indian shop', what:'Buy 3–4 stalks for RM 1. Keep in damp cloth in fridge for 2 weeks.' },
          { name:'Drumstick (Murungakkai)', where:'Chow Kit, Indian grocers', what:'Seasonal but usually available. RM 2–4 per bunch.' },
          { name:'Green Mango, Raw Banana', where:'Selayang Wholesale Market', what:'Best prices at wholesale. Sunday morning trip. Also bitter gourd, jackfruit.' },
          { name:'Indian herbs bundle', where:'Tamil grocery shops', what:'Karpooravalli (Mexican mint), Tulsi, Vetiver — near temples or specialty stores' },
        ],
      },
    ],
  },

  school: {
    title: 'School Guide for Indian Families in Malaysia',
    intro: 'Malaysia has 4 types of schools relevant to Indian families. Choose based on budget, language preference and citizenship plans.',
    types: [
      {
        type:'Tamil SJK(T) Schools',
        lang:'Tamil + BM + English',
        fees:'RM 300–2,000/year',
        pros:['Tamil language preservation', 'Very affordable', 'Strong Indian community', 'Good foundation in 3 languages', 'Many near Indian residential areas'],
        cons:['Heavy academic load from young age', 'Less focus on extra-curricular', 'Quality varies by school'],
        bestfor:'Indian families planning long-term stay or PR',
        color:'#f59e0b',
        famous:['SJKT Ladang Batu Caves (Gombak)', 'SJKT Brickfields (KL)', 'SJKT Ladang Effingham (Sg Buloh)'],
      },
      {
        type:'National SK Schools',
        lang:'Bahasa Malaysia + English',
        fees:'RM 500–3,000/year',
        pros:['Free education (Sekolah Kebangsaan)', 'Good integration with local community', 'English medium in many urban schools', 'Extra-curricular strong'],
        cons:['No Tamil language', 'Less Indian community focus'],
        bestfor:'Families who want local integration + PR pathway',
        color:'#2563eb',
        famous:['SRJK nearby condos — check school zone on your address'],
      },
      {
        type:'Private Schools',
        lang:'English + BM',
        fees:'RM 5,000–25,000/year',
        pros:['Better facilities', 'Smaller class sizes', 'Good for transitioning kids', 'More flexible curriculum'],
        cons:['Moderate cost', 'Varies in quality'],
        bestfor:'Families who want affordable private schooling',
        color:'#16a34a',
        famous:['Sri KL (Cheras)', 'Alice Smith (Bangsar)', 'Tenby Schools'],
      },
      {
        type:'International Schools',
        lang:'English (IGCSE/IB/US)',
        fees:'RM 20,000–80,000/year',
        pros:['International curriculum (IGCSE/IB)', 'Global recognition', 'Back to India or global friendly', 'Excellent facilities'],
        cons:['Very expensive', 'Need EP working parent to enroll'],
        bestfor:'Short-term stay, or families returning to India / moving globally',
        color:'#7c3aed',
        famous:['Garden International School', 'Mont Kiara International', 'ISKL (KL)', 'Nexus International'],
      },
    ],
    important: [
      '📋 EP holders can enroll kids in national and Tamil schools with passport + EP + birth certificate',
      '🏫 Apply 6 months before school year starts (school year: Jan–Nov)',
      '🗺️ Check school zone — your home address determines which SK school your child can attend',
      '💉 Vaccination record from India must be translated + presented on enrollment',
    ],
  },

  malls: {
    title: 'Weekday Mall Plan — Best Malls for Indians',
    intro: 'These malls have Indian restaurants, grocery stores, Indian fashion, and affordable food courts.',
    malls: [
      { name:'Mid Valley Megamall', area:'KL / Bangsar', why:'Everything in one — AEON, Cold Storage, Indian restaurants, GSC cinema, affordable food court', indian:'Indian restaurants on G floor', day:'Any weekday for shorter queues', color:'#2563eb' },
      { name:'Cheras Leisure Mall', area:'Cheras', why:'High Indian crowd, budget shopping, Tamil wedding saree shops, Mydin inside, Indian food aplenty', indian:'★★★★★ — most Indian-friendly mall', day:'Mon–Fri less crowded', color:'#f59e0b' },
      { name:'Sunway Pyramid', area:'Subang', why:'Massive, IKEA nearby, good cinema, Sunway Lagoon for kids, many Indian resto', indian:'★★★', day:'Tuesday–Thursday best', color:'#ef4444' },
      { name:'IOI City Mall', area:'Puchong/Putrajaya', why:'Modern, spacious, less crowded weekdays, Parkson, many good restaurants', indian:'★★★', day:'Weekday afternoons ideal', color:'#16a34a' },
      { name:'Berjaya Times Square', area:'Bukit Bintang', why:'Indoor theme park for kids, budget restaurants, close to Little India (Brickfields)', indian:'★★★', day:'Any day', color:'#7c3aed' },
      { name:'MyTOWN', area:'Cheras/KL', why:'Integrated with Ikea (closest to central KL), large food hall, less crowded', indian:'★★', day:'Best on weekday mornings', color:'#0891b2' },
    ],
  },

  weekend: {
    title: 'Weekend Getaways — Nearest Places from KL',
    intro: 'Living in KL gives access to incredible getaways within 1–3 hours. Perfect for EP holders with EP holders.',
    places: [
      { name:'Genting Highlands', dist:'1 hr from KL', type:'🎰 Entertainment + Cool weather', desc:'Sky Casino, Genting Premium Outlets, First World Hotel, cool 15–20°C weather, cable car. Ideal weekend escape from KL heat.', cost:'RM 200–500/family', tip:'Avoid public holidays — massive crowd. Go Friday evening.' },
      { name:'Cameron Highlands', dist:'3 hrs from KL', type:'🍵 Tea gardens + Fresh air', desc:'BOH Tea Plantation, strawberry farms, night market, cool 15–18°C. Indians love it for fresh air and dosa served with highland views.', cost:'RM 300–600', tip:'Book hotel on Thursday — weekends sell out fast.' },
      { name:'Putrajaya', dist:'30 min from KL', type:'🏛️ Architecture + Gardens', desc:'Botanical gardens, Putra Mosque (pink mosque), pedal boating on lake, stunning government buildings. Free to visit most attractions.', cost:'RM 50–150', tip:'Morning visit before 10am — cool and uncrowded.' },
      { name:'Port Dickson', dist:'1.5 hrs from KL', type:'🏖️ Beach', desc:'Closest beach to KL. Clear water in some areas (Teluk Kemang). Indian restaurant strips nearby. Good for 1-night stay.', cost:'RM 200–400', tip:'Avillion or Lexis PD are worth splurging on once.' },
      { name:'Malacca (Melaka)', dist:'2 hrs from KL', type:'🏰 Heritage + Food', desc:'UNESCO World Heritage City, Jonker Street, Peranakan food, Kampung Kling Mosque, Little India in Melaka. Amazing weekend trip.', cost:'RM 300–600', tip:'Leave at 7am Saturday — arrive before the tour buses do.' },
      { name:'Ipoh', dist:'2 hrs from KL', type:'🍜 Food paradise + Caves', desc:'Famous for white coffee, Ipoh chicken rice, Batu Gajah temples, Cave temples (Perak Tong). Very laid-back, Indian-friendly city.', cost:'RM 250–500', tip:'Saturday drive, street food lunch, temple visit, return Sunday evening.' },
      { name:'Pangkor Island', dist:'3.5 hrs from KL', type:'🐚 Island beach', desc:'Small island, beautiful coral beach, fresh seafood, laid-back vibe. 30 min ferry from Lumut. Much less crowded than Langkawi.', cost:'RM 400–800', tip:'Avoid monsoon months (Oct–Jan). Best Mar–Sep.' },
    ],
  },

  kids: {
    title: 'Weekend Plans for Kids — Fun Places',
    intro: 'Malaysia has fantastic affordable attractions for children. Indians in KL are well-placed for most of these.',
    places: [
      { name:'KLCC Aquaria', age:'3+', price:'RM 42 (child) / RM 55 (adult)', why:'Walk-through underwater tunnel, sharks, rays, touch pool. Brilliant for toddlers and young children.', tip:'Go Tuesday–Thursday 10am to avoid school holiday crowds.', color:'#2563eb' },
      { name:'KL Tower Mini Zoo', age:'2+', price:'Free with KL Tower ticket (~RM 20)', why:'Mini zoo at KL Tower base — reptiles, birds, rabbits. Easy, central, quick visit.', tip:'Combine with KL Tower observation deck.', color:'#16a34a' },
      { name:'Sunway Lagoon', age:'4+', price:'RM 100–150/child, RM 120–180/adult', why:'6 parks: water park, wildlife park, extreme park. Full-day outing. Indian food stalls inside.', tip:'Book online for 20% discount. Bring own food/water — expensive inside.', color:'#f59e0b' },
      { name:'Berjaya Times Square Theme Park', age:'4+', price:'RM 45–80/person', why:'Indoor roller coaster + rides. Air-conditioned. Perfect for hot days.', tip:'Weekday afternoons — no queue, same price.', color:'#ef4444' },
      { name:'KidZania KL', age:'4–16', price:'RM 80–100/child, adults RM 45', why:'Kids role-play as doctors, firemen, pilots. Interactive learning. Massively popular with Indian families.', tip:'Book Friday slot for Saturday visit — sells out online.', color:'#7c3aed' },
      { name:'FRIM Forest Reserve', age:'5+', price:'RM 5/person', why:'Canopy walkway through jungle, nature trails, monkeys, birds. Cheap and unique experience. Indians love weekend trekking here.', tip:'Go early 8am before it gets hot. Wear shoes.', color:'#16a34a' },
      { name:'Petrosains KLCC', age:'5+', price:'RM 25–35/person', why:'Science + petroleum discovery centre. Interactive. Educational for school-age kids.', tip:'Book online — limited daily slots.', color:'#0891b2' },
      { name:'Zoo Negara', age:'All ages', price:'RM 27 (child) / RM 47 (adult)', why:'National Zoo with tigers, elephants, orang utan, bird park. Full 3–4 hour outing.', tip:'Morning slot — animals more active before noon.', color:'#d97706' },
    ],
  },

  lunch: {
    title: 'Best Indian Restaurants for Lunch Out',
    intro: 'These are the most popular and trusted Indian restaurants among the Indian expat community in Malaysia.',
    types: [
      {
        type:'🍛 Banana Leaf Rice',
        places: [
          { name:'Vishal Food & Catering', area:'Bangsar / Brickfields', price:'RM 10–16', famous:'Classic banana leaf, mutton varuval, unlimited rice', days:'Daily 11am–3pm' },
          { name:'Sri Nirwana Maju', area:'Bangsar', price:'RM 12–20', famous:'Legendary KL banana leaf, tourist & local favourite, long queue always', days:'Daily 10am–10pm' },
          { name:'Devi\'s Corner', area:'Bangsar', price:'RM 10–15', famous:'Good daily banana leaf and mamak-style meals', days:'Daily 24hr (mamak)' },
          { name:'Raj\'s Banana Leaf', area:'Bangsar', price:'RM 10–16', famous:'Consistent quality, busy lunch crowd, good sambar', days:'Daily 11am–3pm' },
        ],
      },
      {
        type:'🥘 North Indian / Tandoor',
        places: [
          { name:'Restoran Bombay Palace', area:'KLCC / Bukit Bintang', price:'RM 25–60', famous:'Butter chicken, naan, biryani — premium North Indian dining', days:'Daily 11am–11pm' },
          { name:'Passage To India', area:'Bangsar', price:'RM 30–70', famous:'Upscale, good for special dinners, full North Indian menu', days:'Daily 12pm–3pm, 6pm–11pm' },
          { name:'Delhi Restaurant', area:'Brickfields (Little India)', price:'RM 15–30', famous:'Affordable North Indian, popular with new Indian arrivals', days:'Daily 10am–10pm' },
        ],
      },
      {
        type:'🍳 Breakfast / Tiffin',
        places: [
          { name:'Raju\'s Restaurant', area:'Brickfields', price:'RM 5–12', famous:'Best idli, dosa, pongal in KL. Indian expat favourite since 1970s.', days:'Daily 7am–5pm' },
          { name:'Annalakshmi Restaurant', area:'Brickfields', price:'Pay by heart (donation)', famous:'Vegetarian. Pay what you wish. Run by Indian cultural society. Unique experience.', days:'Mon–Sat 11:30am–3pm' },
          { name:'Gerai Nasi Lemak', area:'Any pasar malam / kopitiam', price:'RM 2–5', famous:'Malaysian nasi lemak with sambal — Indians love it, perfect breakfast', days:'Morning only' },
        ],
      },
      {
        type:'🕌 Mamak (24hr Indian Muslim)',
        places: [
          { name:'Pelita Nasi Kandar', area:'Ampang / Bangsar / multiple', price:'RM 8–15', famous:'Late night roti canai, mee goreng mamak, teh tarik. Indian staple in Malaysia.', days:'24 hours' },
          { name:'Nasi Kandar Line Clear', area:'Penang (worth the trip)', price:'RM 12–20', famous:'Famous Penang nasi kandar — curried rice masterpiece', days:'Open late evening' },
          { name:'Any mamak near your house', area:'Everywhere', price:'RM 5–12', famous:'Roti canai (RM 1.80), maggi goreng, teh tarik — daily go-to for Indian expats', days:'24hr mostly' },
        ],
      },
    ],
    tips: [
      '🍽️ Lunch 11:30am–12:30pm beats the crowd — most places fill up by 1pm',
      '💰 Banana leaf lunch RM 10–18 is the best value meal in Malaysia',
      '📱 Grab Food / Foodpanda delivers from most Indian restaurants — convenient for new arrivals',
      '🌿 Tell them "without beef" — Muslim Indian restaurants (mamak) serve halal, no pork. Hindu restaurants may serve beef — always check.',
    ],
  },
}

// ── Component ─────────────────────────────────────────────────

export default function EPLifeGuide() {
  const [active, setActive] = useState('salary')
  const section = CONTENT[active]

  return (
    <div className={styles.wrap}>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerBadge}>🇮🇳 → 🇲🇾</div>
        <h1 className={styles.headerTitle}>EP Holder Life Guide</h1>
        <p className={styles.headerSub}>Everything Indians need to live well in Malaysia — 2026 updated</p>
      </div>

      <PrivacyNotice />

      {/* Nav Grid */}
      <div className={styles.navGrid}>
        {SECTIONS.map(s => (
          <button
            key={s.id}
            className={`${styles.navBtn} ${active === s.id ? styles.navBtnActive : ''}`}
            onClick={() => setActive(s.id)}
          >
            <span className={styles.navEmoji}>{s.emoji}</span>
            <span className={styles.navLabel}>{s.label}</span>
            <span className={styles.navSub}>{s.sub}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className={styles.content} key={active}>

        <div className={styles.contentHeader}>
          <span className={styles.contentEmoji}>{SECTIONS.find(s=>s.id===active)?.emoji}</span>
          <div>
            <h2 className={styles.contentTitle}>{section.title}</h2>
            <p className={styles.contentIntro}>{section.intro}</p>
          </div>
        </div>

        {/* ── SALARY ─────────────────── */}
        {active === 'salary' && (
          <>
            <div className={styles.salaryGrid}>
              {section.cards.map((c,i) => (
                <div key={i} className={styles.salaryCard} style={{'--accent':c.color}}>
                  <div className={styles.salaryCardLabel}>{c.label}</div>
                  <div className={styles.salaryBands}>
                    <div className={styles.salaryBand} style={{background:'rgba(239,68,68,0.1)',color:'#ef4444'}}>Min: <strong>{c.min}</strong></div>
                    <div className={styles.salaryBand} style={{background:'rgba(245,158,11,0.1)',color:'#d97706'}}>Comfortable: <strong>{c.comfortable}</strong></div>
                    <div className={styles.salaryBand} style={{background:'rgba(22,163,74,0.1)',color:'#16a34a'}}>Ideal: <strong>{c.ideal}</strong></div>
                  </div>
                  <table className={styles.salaryTable}>
                    <tbody>
                      {c.breakdown.map(([k,v],j) => (
                        <tr key={j}><td>{k}</td><td>{v}</td></tr>
                      ))}
                    </tbody>
                  </table>
                  <div className={styles.salaryTip}>{c.tip}</div>
                </div>
              ))}
            </div>
            <div className={styles.notesList}>
              {section.notes.map((n,i) => <div key={i} className={styles.note}>{n}</div>)}
            </div>
          </>
        )}

        {/* ── SIM ─────────────────────── */}
        {active === 'sim' && (
          <>
            <h3 className={styles.subhead}>📱 Postpaid Plans (Recommended)</h3>
            <div className={styles.tableWrap}>
              <table className={styles.dataTable}>
                <thead><tr><th>Provider</th><th>Plan</th><th>Price</th><th>Data</th><th>Calls</th><th>Best For</th></tr></thead>
                <tbody>
                  {section.postpaid.map((p,i) => (
                    <tr key={i} className={p.star ? styles.starRow : ''}>
                      <td><strong>{p.name}</strong>{p.star && <span className={styles.starTag}>⭐ Recommended</span>}</td>
                      <td>{p.plan}</td>
                      <td><strong>{p.price}</strong></td>
                      <td>{p.data}</td>
                      <td>{p.calls}</td>
                      <td className={styles.verdictCell}>{p.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3 className={styles.subhead} style={{marginTop:'20px'}}>📦 Documents Needed</h3>
            <div className={styles.docList}>
              {section.docs.map((d,i) => <div key={i} className={styles.docItem}>✅ {d}</div>)}
            </div>
            <div className={styles.highlightBox}>{section.tip}</div>
          </>
        )}

        {/* ── HOUSE ─────────────────── */}
        {active === 'house' && (
          <>
            <div className={styles.stepsList}>
              {section.steps.map((s,i) => (
                <div key={i} className={styles.step}>
                  <div className={styles.stepNum}>{s.step}</div>
                  <div><strong className={styles.stepTitle}>{s.title}</strong><p className={styles.stepDesc}>{s.desc}</p></div>
                </div>
              ))}
            </div>
            <div className={styles.flagsGrid}>
              <div className={styles.flagCard}>
                <div className={styles.flagTitle} style={{color:'#16a34a'}}>✅ Green Flags — Look For</div>
                {section.greenflags.map((f,i) => <div key={i} className={styles.flagItem} style={{color:'#16a34a'}}>• {f}</div>)}
              </div>
              <div className={styles.flagCard}>
                <div className={styles.flagTitle} style={{color:'#ef4444'}}>🚩 Red Flags — Avoid</div>
                {section.redflags.map((f,i) => <div key={i} className={styles.flagItem} style={{color:'#ef4444'}}>• {f}</div>)}
              </div>
            </div>
          </>
        )}

        {/* ── BANK ─────────────────── */}
        {active === 'bank' && (
          <>
            <div className={styles.bankGrid}>
              {section.banks.map((b,i) => (
                <div key={i} className={styles.bankCard}>
                  <div className={styles.bankName}>{b.name}</div>
                  <div className={styles.bankType}>{b.type}</div>
                  <p className={styles.bankWhy}>{b.why}</p>
                  <div className={styles.docList}>
                    {b.docs.map((d,j) => <div key={j} className={styles.docItem}>📄 {d}</div>)}
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.notesList}>
              {section.tips.map((t,i) => <div key={i} className={styles.note}>{t}</div>)}
            </div>
          </>
        )}

        {/* ── CREDIT CARD ─────────── */}
        {active === 'credit' && (
          <>
            <h3 className={styles.subhead}>✅ Eligibility Checklist</h3>
            <div className={styles.checkGrid}>
              {section.eligibility.map((e,i) => (
                <div key={i} className={styles.checkItem}>
                  <span style={{color:e.ok?'#16a34a':'#ef4444'}}>{e.ok?'✅':'❌'}</span> {e.cond}
                </div>
              ))}
            </div>
            <h3 className={styles.subhead} style={{marginTop:'20px'}}>💳 Best Cards to Apply</h3>
            <div className={styles.cardGrid}>
              {section.cards.map((c,i) => (
                <div key={i} className={styles.ccCard} style={{'--accent':c.color}}>
                  <div className={styles.ccBank}>{c.bank}</div>
                  <div className={styles.ccName}>{c.card}</div>
                  <div className={styles.ccRows}>
                    <div><span>Min Income</span><strong>{c.income}</strong></div>
                    <div><span>Cashback</span><strong>{c.cashback}</strong></div>
                    <div><span>Annual Fee</span><strong>{c.fee}</strong></div>
                    <div><span>Best For</span><strong>{c.best}</strong></div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.notesList}>
              {section.tips.map((t,i) => <div key={i} className={styles.note}>{t}</div>)}
            </div>
          </>
        )}

        {/* ── SIM PORT ─────────────── */}
        {active === 'simport' && (
          <>
            <div className={styles.stepsList}>
              {section.steps.map((s,i) => (
                <div key={i} className={styles.step}>
                  <div className={styles.stepNum}>{s.step}</div>
                  <div><strong className={styles.stepTitle}>{s.title}</strong><p className={styles.stepDesc}>{s.desc}</p></div>
                </div>
              ))}
            </div>
            <div className={styles.notesList}>
              {section.important.map((n,i) => <div key={i} className={styles.note}>{n}</div>)}
            </div>
          </>
        )}

        {/* ── RENT COSTS ──────────── */}
        {active === 'rentcosts' && (
          <>
            <div className={styles.costsGrid}>
              {section.costs.map((c,i) => (
                <div key={i} className={styles.costCard} style={{'--accent':c.color}}>
                  <div className={styles.costItem}>{c.item}</div>
                  <div className={styles.costAmount}>{c.amount}</div>
                  <div className={styles.costExample}>{c.example}</div>
                  <p className={styles.costDesc}>{c.desc}</p>
                </div>
              ))}
            </div>
            <div className={styles.totalBox}>
              <div className={styles.totalTitle}>{section.total.label}</div>
              {section.total.items.map((item,i) => (
                <div key={i} className={`${styles.totalRow} ${item.includes('TOTAL') ? styles.totalFinal : ''}`}>{item}</div>
              ))}
            </div>
            <div className={styles.notesList}>
              {section.tips.map((t,i) => <div key={i} className={styles.note}>{t}</div>)}
            </div>
          </>
        )}

        {/* ── END LEASE ────────────── */}
        {active === 'endlease' && (
          <>
            <div className={styles.timeline}>
              {section.timeline.map((t,i) => (
                <div key={i} className={styles.timelineItem}>
                  <div className={styles.timelineDot} />
                  <div className={styles.timelineDays}>{t.days}</div>
                  <div className={styles.timelineBody}>
                    <strong>{t.title}</strong>
                    <p>{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.notesList}>
              {section.donts.map((d,i) => <div key={i} className={styles.note}>{d}</div>)}
            </div>
          </>
        )}

        {/* ── INTERNET ────────────── */}
        {active === 'internet' && (
          <>
            <div className={styles.tableWrap}>
              <table className={styles.dataTable}>
                <thead><tr><th>Provider</th><th>Speed</th><th>Price</th><th>Contract</th><th>Router</th><th>Best For</th></tr></thead>
                <tbody>
                  {section.plans.map((p,i) => (
                    <tr key={i} className={p.star ? styles.starRow : ''}>
                      <td><strong>{p.provider}</strong>{p.star && <span className={styles.starTag}>⭐</span>}</td>
                      <td><strong>{p.speed}</strong></td>
                      <td><strong>{p.price}</strong></td>
                      <td>{p.contract}</td>
                      <td>{p.router}</td>
                      <td>{p.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={styles.notesList}>
              {section.tips.map((t,i) => <div key={i} className={styles.note}>{t}</div>)}
            </div>
          </>
        )}

        {/* ── WATER ──────────────── */}
        {active === 'water' && (
          <>
            <div className={styles.waterGrid}>
              {section.options.map((o,i) => (
                <div key={i} className={styles.waterCard} style={{'--accent':o.color}}>
                  <div className={styles.waterType}>{o.type}</div>
                  <div className={styles.waterBrands}>{o.brands}</div>
                  <div className={styles.waterPrice}>{o.price}</div>
                  <div className={styles.waterPros}>✅ {o.pros}</div>
                  <div className={styles.waterCons}>⚠️ {o.cons}</div>
                  <div className={styles.waterBest}>👍 {o.best}</div>
                </div>
              ))}
            </div>
            <div className={styles.highlightBox}>{section.recommendation}</div>
            <div className={styles.notesList}>
              {section.where.map((w,i) => <div key={i} className={styles.note}>🛒 {w}</div>)}
            </div>
          </>
        )}

        {/* ── AREAS ──────────────── */}
        {active === 'areas' && (
          <div className={styles.areasGrid}>
            {section.areas.map((a,i) => (
              <div key={i} className={styles.areaCard} style={{'--accent':a.color}}>
                <div className={styles.areaHeader}>
                  <span className={styles.areaName}>{a.name}</span>
                  <span className={styles.areaRating}>{a.rating}</span>
                </div>
                <div className={styles.areaRent}>{a.rent}/month</div>
                <p className={styles.areaWhy}>{a.why}</p>
                <div className={styles.areaMeta}>
                  <span>🚇 {a.transport}</span>
                  <span>🇮🇳 Indian community: {a.indian}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── GROCERY ────────────── */}
        {active === 'grocery' && (
          <div>
            {section.categories.map((cat,i) => (
              <div key={i} className={styles.groceryCat}>
                <div className={styles.groceryCatTitle}>{cat.cat}</div>
                <div className={styles.groceryItems}>
                  {cat.items.map((item,j) => (
                    <div key={j} className={styles.groceryItem}>
                      <div className={styles.groceryName}>{item.name}</div>
                      <div className={styles.groceryWhere}>📍 {item.where}</div>
                      <div className={styles.groceryWhat}>{item.what}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── SCHOOL ─────────────── */}
        {active === 'school' && (
          <>
            <div className={styles.schoolGrid}>
              {section.types.map((s,i) => (
                <div key={i} className={styles.schoolCard} style={{'--accent':s.color}}>
                  <div className={styles.schoolType}>{s.type}</div>
                  <div className={styles.schoolLang}>🗣️ {s.lang}</div>
                  <div className={styles.schoolFees}>💰 {s.fees}</div>
                  <div className={styles.schoolPros}>
                    {s.pros.map((p,j) => <div key={j}>✅ {p}</div>)}
                  </div>
                  <div className={styles.schoolCons}>
                    {s.cons.map((c,j) => <div key={j}>⚠️ {c}</div>)}
                  </div>
                  <div className={styles.schoolBestFor}>👍 Best for: {s.bestfor}</div>
                  {s.famous && <div className={styles.schoolFamous}>🏫 {s.famous.join(' • ')}</div>}
                </div>
              ))}
            </div>
            <div className={styles.notesList}>
              {section.important.map((n,i) => <div key={i} className={styles.note}>{n}</div>)}
            </div>
          </>
        )}

        {/* ── MALLS ──────────────── */}
        {active === 'malls' && (
          <div className={styles.mallGrid}>
            {section.malls.map((m,i) => (
              <div key={i} className={styles.mallCard} style={{'--accent':m.color}}>
                <div className={styles.mallName}>{m.name}</div>
                <div className={styles.mallArea}>📍 {m.area}</div>
                <p className={styles.mallWhy}>{m.why}</p>
                <div className={styles.mallMeta}>
                  <span>🇮🇳 {m.indian}</span>
                  <span>📅 Best: {m.day}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── WEEKEND ────────────── */}
        {active === 'weekend' && (
          <div className={styles.weekendGrid}>
            {section.places.map((p,i) => (
              <div key={i} className={styles.weekendCard}>
                <div className={styles.weekendHeader}>
                  <div>
                    <div className={styles.weekendName}>{p.name}</div>
                    <div className={styles.weekendType}>{p.type}</div>
                  </div>
                  <div className={styles.weekendDist}>{p.dist}</div>
                </div>
                <p className={styles.weekendDesc}>{p.desc}</p>
                <div className={styles.weekendFooter}>
                  <span>💰 {p.cost}</span>
                  <span>💡 {p.tip}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── KIDS ───────────────── */}
        {active === 'kids' && (
          <div className={styles.kidsGrid}>
            {section.places.map((p,i) => (
              <div key={i} className={styles.kidsCard} style={{'--accent':p.color}}>
                <div className={styles.kidsHeader}>
                  <div className={styles.kidsName}>{p.name}</div>
                  <div className={styles.kidsAge}>Age {p.age}</div>
                </div>
                <div className={styles.kidsPrice}>{p.price}</div>
                <p className={styles.kidsWhy}>{p.why}</p>
                <div className={styles.kidsTip}>💡 {p.tip}</div>
              </div>
            ))}
          </div>
        )}

        {/* ── LUNCH ──────────────── */}
        {active === 'lunch' && (
          <>
            {section.types.map((type,i) => (
              <div key={i} className={styles.lunchSection}>
                <div className={styles.lunchType}>{type.type}</div>
                <div className={styles.lunchGrid}>
                  {type.places.map((p,j) => (
                    <div key={j} className={styles.lunchCard}>
                      <div className={styles.lunchName}>{p.name}</div>
                      <div className={styles.lunchArea}>📍 {p.area} · {p.days}</div>
                      <div className={styles.lunchPrice}>💰 {p.price}</div>
                      <p className={styles.lunchFamous}>{p.famous}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className={styles.notesList}>
              {section.tips.map((t,i) => <div key={i} className={styles.note}>{t}</div>)}
            </div>
          </>
        )}

      </div>
    </div>
  )
}
