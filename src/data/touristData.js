// ── Tourist Data for Malaysia (Indians visiting) ──────────────

export const PLACES = {
  kl: {
    name: 'Kuala Lumpur',
    icon: '🏙️',
    regions: [
      {
        name: 'KLCC & Bukit Bintang',
        places: [
          { name:'Petronas Twin Towers', type:'landmark', entry:'Free (outside) / RM 89.90 (skybridge)', time:'1–2 hrs', best:'Night', tip:'Book skybridge tickets online 2 weeks ahead', rating:4.9, indian:true, hidden:false, lat:3.1579, lng:101.7123 },
          { name:'KLCC Park', type:'nature', entry:'Free', time:'1 hr', best:'Evening', tip:'Free fountain show nightly 8–9pm', rating:4.6, indian:true, hidden:false, lat:3.1536, lng:101.7115 },
          { name:'Berjaya Times Square', type:'shopping', entry:'Free', time:'2–4 hrs', best:'Afternoon', tip:'Huge indoor theme park inside', rating:4.2, indian:false, hidden:false, lat:3.1420, lng:101.7109 },
          { name:'Pavilion KL', type:'shopping', entry:'Free', time:'2–3 hrs', best:'Anytime', tip:'Premium mall, great AC, free WiFi', rating:4.5, indian:false, hidden:false, lat:3.1489, lng:101.7131 },
        ]
      },
      {
        name: 'Batu Caves & Indian Heritage',
        places: [
          { name:'Batu Caves', type:'temple', entry:'Free', time:'2–3 hrs', best:'Morning (before 10am)', tip:'Most sacred Hindu site in Malaysia. 272 steps. Go early to avoid crowd & heat. Thaipusam festival in Jan is spectacular', rating:4.8, indian:true, hidden:false, lat:3.2379, lng:101.6840 },
          { name:'Sri Mahamariamman Temple', type:'temple', entry:'Free', time:'30 min', best:'Morning', tip:'Oldest Hindu temple in KL, right in Chinatown. Remove shoes, dress modestly', rating:4.6, indian:true, hidden:false, lat:3.1444, lng:101.6984 },
          { name:'Little India Brickfields', type:'cultural', entry:'Free', time:'2 hrs', best:'Evening', tip:'Best sarees, Tamil music, Indian snacks. Feels like Chennai! Flower garlands for RM 3', rating:4.5, indian:true, hidden:false, lat:3.1283, lng:101.6860 },
        ]
      },
      {
        name: 'Hidden & Local Gems',
        places: [
          { name:'Thean Hou Temple', type:'temple', entry:'Free', time:'1 hr', best:'Night', tip:'Chinese temple lit beautifully at night. Overlooking KL skyline. Almost no tourists know this', rating:4.7, indian:false, hidden:true, lat:3.1277, lng:101.6862 },
          { name:'Kampung Baru', type:'cultural', entry:'Free', time:'1.5 hrs', best:'Evening', tip:'Last Malay village in city centre. Authentic nasi lemak RM 3–5, stunning contrast to KLCC skyline', rating:4.3, indian:false, hidden:true, lat:3.1641, lng:101.7019 },
          { name:'Perdana Botanical Garden', type:'nature', entry:'Free', time:'2 hrs', best:'Morning', tip:'KL\'s Central Park. Deer park, bird park inside. Locals jog here at 6am', rating:4.4, indian:false, hidden:true, lat:3.1488, lng:101.6862 },
          { name:'KL Forest Eco Park', type:'nature', entry:'RM 20 (canopy walk)', time:'1.5 hrs', best:'Morning', tip:'Rainforest in the middle of KL city! 10 min from Petronas. Almost nobody visits', rating:4.5, indian:false, hidden:true, lat:3.1537, lng:101.7013 },
        ]
      }
    ]
  },
  penang: {
    name: 'Penang',
    icon: '🏝️',
    regions: [
      {
        name: 'Georgetown Heritage',
        places: [
          { name:'George Town UNESCO Heritage', type:'cultural', entry:'Free', time:'3–4 hrs', best:'Morning', tip:'Walk the street art trail. Grab a map at the tourist office. Best in cool morning air', rating:4.8, indian:true, hidden:false, lat:5.4141, lng:100.3288 },
          { name:'Penang Hill (Bukit Bendera)', type:'nature', entry:'RM 30 (cable car)', time:'2–3 hrs', best:'Morning', tip:'Takes 5 min by cable car. Cool 20°C at top. Amazing 360° view. Go on weekdays', rating:4.6, indian:false, hidden:false, lat:5.4197, lng:100.2730 },
          { name:'Sri Mahamariamman Temple Penang', type:'temple', entry:'Free', time:'45 min', best:'Morning', tip:'Beautiful South Indian architecture, 1833. The oldest Mariamman temple in Malaysia', rating:4.7, indian:true, hidden:false, lat:5.4161, lng:100.3344 },
        ]
      },
      {
        name: 'Penang Food Trail',
        places: [
          { name:'Gurney Drive Hawker Centre', type:'food', entry:'Free', time:'1.5 hrs', best:'Evening', tip:'Best char kway teow, asam laksa, cendol in Malaysia. Eat early (6pm) before crowds', rating:4.8, indian:true, hidden:false, lat:5.4377, lng:100.3084 },
          { name:'Penang Road Famous Teochew Chendul', type:'food', entry:'Free', time:'30 min', best:'Afternoon', tip:'Best cendol in Malaysia (RM 3.50). Queue is worth it. Cash only', rating:4.8, indian:true, hidden:false, lat:5.4152, lng:100.3342 },
          { name:'Sia Boey Urban Archeology Park', type:'cultural', entry:'Free', time:'1 hr', best:'Evening', tip:'Excavated old market by the river. Hidden gem — most tourists miss this completely', rating:4.4, indian:false, hidden:true, lat:5.4195, lng:100.3382 },
        ]
      }
    ]
  },
  langkawi: {
    name: 'Langkawi',
    icon: '🏖️',
    regions: [
      {
        name: 'Langkawi Must-Do',
        places: [
          { name:'Langkawi Cable Car (SkyCab)', type:'nature', entry:'RM 55', time:'2–3 hrs', best:'Morning', tip:'Go before 10am to avoid clouds. Steepest cable car in world. Stunning views', rating:4.7, indian:false, hidden:false, lat:6.3868, lng:99.6705 },
          { name:'Pantai Cenang Beach', type:'nature', entry:'Free', time:'Half day', best:'Evening', tip:'Best beach. Duty-free alcohol, cheap massages (RM 35/hr), water sports. Very lively at sunset', rating:4.6, indian:true, hidden:false, lat:6.2897, lng:99.7206 },
          { name:'Langkawi Duty Free Shopping', type:'shopping', entry:'Free', time:'2–3 hrs', best:'Anytime', tip:'Chocolates, alcohol, electronics, cosmetics all tax-free. Best deals in Malaysia. Buy Toblerone here!', rating:4.5, indian:true, hidden:false, lat:6.3133, lng:99.8499 },
          { name:'Mangrove Tour Kilim Karst', type:'nature', entry:'RM 80–100 (tour)', time:'3–4 hrs', best:'Morning', tip:'Eagles feeding show, bat caves, floating fish farms. One of the best boat tours in SE Asia', rating:4.8, indian:false, hidden:false, lat:6.4017, lng:100.1282 },
        ]
      }
    ]
  },
  malacca: {
    name: 'Malacca (Melaka)',
    icon: '🏰',
    regions: [
      {
        name: 'Malacca Heritage',
        places: [
          { name:'Jonker Street Night Market', type:'cultural', entry:'Free', time:'2–3 hrs', best:'Friday–Sunday evening', tip:'Street food, antiques, live music. Only on Fri/Sat/Sun nights. Try chicken rice ball (RM 8)', rating:4.8, indian:true, hidden:false, lat:2.1949, lng:102.2444 },
          { name:'A Famosa Fort', type:'landmark', entry:'Free', time:'45 min', best:'Morning', tip:'Portuguese fort from 1511. Free entry. Small but very historic. Combine with nearby St Paul\'s Hill', rating:4.3, indian:false, hidden:false, lat:2.1916, lng:102.2491 },
          { name:'Sri Poyyatha Vinayagar Moorthi Temple', type:'temple', entry:'Free', time:'30 min', best:'Morning', tip:'Oldest Hindu temple in Malaysia (1781)! Most Indians don\'t know this. In the heart of Chinatown', rating:4.7, indian:true, hidden:true, lat:2.1959, lng:102.2439 },
          { name:'Stadthuys (Red Square)', type:'landmark', entry:'RM 5', time:'1 hr', best:'Morning', tip:'Dutch colonial buildings, vivid red, great photos. Go early for fewer tourists in shots', rating:4.5, indian:false, hidden:false, lat:2.1949, lng:102.2491 },
        ]
      }
    ]
  },
  cameron: {
    name: 'Cameron Highlands',
    icon: '🍵',
    regions: [
      {
        name: 'Cameron Highlands',
        places: [
          { name:'BOH Tea Plantation', type:'nature', entry:'Free', time:'2–3 hrs', best:'Morning', tip:'Most beautiful tea estate in Malaysia. Free entry, scenic walk, tea house. RM 5/cup of fresh tea', rating:4.8, indian:true, hidden:false, lat:4.3613, lng:101.4167 },
          { name:'Mossy Forest Cameron', type:'nature', entry:'RM 5', time:'2 hrs', best:'Morning', tip:'Cloud forest at 2,000m. Surreal misty trees. Very cold (15°C). Bring jacket!', rating:4.7, indian:false, hidden:true, lat:4.4741, lng:101.3800 },
          { name:'Strawberry Farms', type:'nature', entry:'RM 15–25', time:'1–2 hrs', best:'Morning', tip:'Pick your own strawberries. 5 farms along main road. Price negotiable', rating:4.3, indian:true, hidden:false, lat:4.4691, lng:101.3795 },
        ]
      }
    ]
  }
}

export const INDIAN_FOOD = [
  // KL
  { name:'Sangeetha Vegetarian Restaurant', city:'KL', area:'Brickfields (Little India)', type:'Veg South Indian', price:'RM 8–18', speciality:'Dosa, thali, filter coffee', rating:4.6, halal:true, lat:3.1285, lng:101.6861 },
  { name:'Banana Leaf Apollo', city:'KL', area:'Brickfields', type:'Banana Leaf', price:'RM 15–25', speciality:'Banana leaf rice, mutton curry', rating:4.7, halal:false, lat:3.1290, lng:101.6855 },
  { name:'Devi\'s Corner Bangsar', city:'KL', area:'Bangsar', type:'Mamak/North Indian', price:'RM 6–15', speciality:'Roti canai, mee goreng, teh tarik', rating:4.5, halal:true, lat:3.1304, lng:101.6748 },
  { name:'Sri Nirwana Maju', city:'KL', area:'Bangsar', type:'Banana Leaf', price:'RM 15–30', speciality:'Best banana leaf in KL, fish head curry', rating:4.8, halal:false, lat:3.1312, lng:101.6763 },
  { name:'Vishal Food & Catering', city:'KL', area:'Brickfields', type:'South Indian Veg', price:'RM 8–20', speciality:'Pure veg, Kerala-style, excellent thali', rating:4.5, halal:false, lat:3.1280, lng:101.6858 },
  { name:'Pelita Nasi Kandar', city:'KL', area:'Ampang / Multiple', type:'Nasi Kandar (Indian-Malay)', price:'RM 10–20', speciality:'Rice with multiple curry choices, open 24hrs', rating:4.4, halal:true, lat:3.1593, lng:101.7371 },
  // Penang
  { name:'Hameediyah Restaurant', city:'Penang', area:'Georgetown', type:'Nasi Kandar', price:'RM 12–25', speciality:'Oldest nasi kandar in Malaysia (1907)', rating:4.6, halal:true, lat:5.4173, lng:100.3313 },
  { name:'Line Clear Nasi Kandar', city:'Penang', area:'Georgetown', type:'Nasi Kandar', price:'RM 12–20', speciality:'Famous open-air nasi kandar, locals queue', rating:4.5, halal:true, lat:5.4158, lng:100.3309 },
  { name:'Restoran Sri Ananda Bahwan', city:'Penang', area:'Georgetown', type:'South Indian Veg', price:'RM 8–18', speciality:'Excellent pure veg Tamil meals, lassi', rating:4.7, halal:false, lat:5.4139, lng:100.3318 },
  // Malacca
  { name:'Selvam Restaurant', city:'Malacca', area:'Tengkera', type:'South Indian', price:'RM 10–20', speciality:'Fish head curry, banana leaf rice', rating:4.4, halal:false, lat:2.2022, lng:102.2401 },
]

export const SHOPPING = [
  { name:'Petaling Street (Chinatown KL)', city:'KL', type:'Street Market', best:['Souvenirs','Clothes','Electronics'], priceRange:'RM 5–200', tip:'Bargain hard — start at 40% of asking price. Best for fridge magnets, keychains, batik', hours:'10am–10pm daily', lat:3.1444, lng:101.6984 },
  { name:'Central Market (Pasar Seni)', city:'KL', type:'Craft Market', best:['Batik','Handicrafts','Art'], priceRange:'RM 10–500', tip:'Fixed price but quality is better than Petaling St. Good for authentic Malaysian crafts', hours:'10am–9:30pm daily', lat:3.1437, lng:101.6950 },
  { name:'Suria KLCC', city:'KL', type:'Premium Mall', best:['Branded goods','Chocolates','Electronics'], priceRange:'RM 50–5000', tip:'Great for buying Beryl\'s chocolate (very cheap vs India). GST refund available for tourists', hours:'10am–10pm daily', lat:3.1579, lng:101.7123 },
  { name:'1 Utama Shopping Centre', city:'KL', type:'Mega Mall', best:['Fashion','Electronics','Food'], priceRange:'RM 20–2000', tip:'4th largest mall in world. Good sales. AEON anchor store for cheap Malaysian products', hours:'10am–10pm daily', lat:3.1516, lng:101.6155 },
  { name:'Sunway Pyramid', city:'KL', type:'Theme Mall', best:['Fashion','Entertainment','Food'], priceRange:'RM 20–2000', tip:'Egypt-themed mall. Great cinema, ice rink, bowling. Lots of Indian food nearby', hours:'10am–10pm daily', lat:3.0732, lng:101.6066 },
  { name:'Langkawi Duty Free Zone', city:'Langkawi', type:'Duty Free', best:['Chocolate','Alcohol','Cosmetics','Electronics'], priceRange:'RM 5–3000', tip:'Best value duty-free in Malaysia. Toblerone, Lindt very cheap. No GST on whole island', hours:'Various', lat:6.3133, lng:99.8499 },
  { name:'Jonker Street Malacca', city:'Malacca', type:'Heritage Street Market', best:['Antiques','Local snacks','Souvenirs'], priceRange:'RM 5–500', tip:'Unique Peranakan items. Amazing pineapple tarts (RM 15/box). Only busy Fri–Sun', hours:'Fri–Sun 6pm–11pm', lat:2.1949, lng:102.2444 },
  { name:'Batu Ferringhi Night Market', city:'Penang', type:'Night Market', best:['Clothes','Bags','Souvenirs'], priceRange:'RM 10–200', tip:'Biggest night market in Penang. Good fakes, cheap clothes. Bargain 50% off ask price', hours:'Daily 7pm–12am', lat:5.4720, lng:100.2411 },
]

export const BUDGET_ITEMS = [
  // Things Indians should buy
  { category:'🍫 Chocolate & Sweets', items:[
    { name:"Beryl's Chocolate (local brand)", price:'RM 15–35/box', saving:'40% cheaper than India', tip:'Available everywhere. Best gift to take back' },
    { name:'Toblerone / Lindt (Langkawi)', price:'RM 18–45', saving:'Up to 60% cheaper duty-free', tip:'Buy in Langkawi duty-free for best price' },
    { name:'Kinder varieties', price:'RM 8–20', saving:'30% cheaper than India', tip:'Many varieties not available in India' },
    { name:'Rotiboy pastry', price:'RM 2–3 each', saving:'Local specialty', tip:'Famous Malaysian coffee bun — try fresh from oven' },
  ]},
  { category:'💄 Beauty & Personal Care', items:[
    { name:'SK-II / Sulwhasoo skincare', price:'RM 200–600', saving:'20–30% cheaper than India (no duty)', tip:'Authentic products, better price than India grey market' },
    { name:'The Body Shop Malaysia', price:'RM 30–200', saving:'15–20% cheaper', tip:'Good deals during sales. Buy 3 get 3 free often' },
    { name:'Watsons local brands', price:'RM 5–50', saving:'Unique products', tip:'Kose, Biore Japan brands much cheaper here' },
  ]},
  { category:'👕 Fashion & Clothing', items:[
    { name:'Batik fabric (Kelantan/Terengganu)', price:'RM 20–150', saving:'Unique to Malaysia', tip:'Authentic batik from east coast. Buy from Central Market KL' },
    { name:'Uniqlo Malaysia', price:'RM 30–200', saving:'10–15% cheaper than India', tip:'Heat-tech, Airism — way cheaper. Buy in sales (Nov/Dec)' },
    { name:'Padini / Brands Outlet', price:'RM 20–120', saving:'Very affordable local brand', tip:'Local fashion brand. Great quality-price ratio for casual wear' },
  ]},
  { category:'🎁 Souvenirs & Gifts', items:[
    { name:'Kek Lapis Sarawak (layer cake)', price:'RM 25–80', saving:'Only in Malaysia', tip:'Beautiful layered cake, excellent gift. Buy at KLIA before flying' },
    { name:'Petronas / Malaysia keychains', price:'RM 3–15', saving:'Petaling Street cheapest', tip:'Buy in bulk at Petaling Street — RM 3 each if you buy 10+' },
    { name:'Pewterware (Royal Selangor)', price:'RM 30–500', saving:'Malaysia exclusive', tip:'World-famous tin products. Factory tour free in KL. Unique gift' },
    { name:'Sarawak pepper (black/white)', price:'RM 10–30', saving:'World best pepper here', tip:'Sarawak has world-famous pepper. Buy at Central Market' },
  ]},
  { category:'📱 Electronics & Tech', items:[
    { name:'Smartphones (Samsung, Apple)', price:'RM 1500–8000', saving:'Similar to India or slightly cheaper', tip:'Avoid grey market. Buy from official stores — warranty valid' },
    { name:'Earphones / Accessories', price:'RM 30–500', saving:'10–20% cheaper', tip:'Logitech, Anker very cheap at Low Yat Plaza (IT mall KL)' },
    { name:'Low Yat Plaza IT Mall', price:'Various', saving:'Best IT prices in Malaysia', tip:'7-floor IT mall in KL. Price match aggressively. Friday evenings best deals' },
  ]},
]

export const VISA_INFO = {
  visaFree2026: {
    name: '🎉 Visa-FREE for Indians (2026)',
    eligible: true,
    fee: 'FREE — No visa required',
    validity: 'Up to 30 days per visit',
    validUntil: 'December 31, 2026',
    campaign: 'Visit Malaysia 2026',
    purposes: ['Tourism', 'Social visits', 'Business meetings'],
    notAllowed: ['Employment', 'Long-term study'],
    mdac: {
      name: 'Malaysia Digital Arrival Card (MDAC)',
      mandatory: true,
      when: 'Submit online at least 3 days before arrival',
      url: 'https://imigresen-online.imi.gov.my/mdac/main',
      free: true,
      note: 'MDAC is mandatory — without it you may be denied boarding or entry',
    },
    conditions: [
      'Valid passport (6+ months validity)',
      'Return flight ticket',
      'Proof of accommodation (hotel booking)',
      'Sufficient funds for stay',
      'Complete MDAC online 3 days before arrival',
    ],
    tips: [
      '🎉 No visa fee — saves RM 150 (₹2,900) vs old eVisa',
      '📱 Submit MDAC at imigresen-online.imi.gov.my — free, takes 10 minutes',
      '⏰ MDAC must be submitted minimum 3 days before arrival — do it early',
      '🔄 Extension possible: visit Immigration Dept for 30 more days (RM 100)',
      '✈️ Valid until Dec 31 2026 — extended for Visit Malaysia 2026 campaign',
      '💼 For work or long study — still need eVisa / Employment Pass',
    ],
  },
  eVisa: {
    name: 'eVisa (for other purposes / after 2026)',
    eligible: true,
    fee: 'RM 150 (~₹2,900)',
    validity: '30 days (single entry)',
    processing: '3–5 working days',
    apply: 'https://evisa.imi.gov.my',
    docs: ['Valid passport (6+ months)', 'Recent photo', 'Return flight ticket', 'Hotel booking', 'Bank statement (last 3 months)', 'Employment letter or salary slips'],
    tips: ['Apply minimum 2 weeks before travel', 'eVisa is stamped on arrival — keep printout', 'Extension possible (30 more days) at Immigration office'],
    note: 'Use eVisa for employment purposes or if visa-free exemption has ended (after Dec 31 2026)',
  },
  voa: {
    name: 'Visa on Arrival',
    eligible: false,
    note: 'Not available for Indian passport holders',
  },
  extension: {
    name: 'Visa Extension',
    fee: 'RM 100',
    where: 'Immigration Dept, Putrajaya or state offices',
    docs: ['Passport', 'Current visa', 'Onward ticket', 'Hotel booking'],
  }
}

export const TRIP_PRESETS = [
  { name:'Solo Backpacker', icon:'🎒', days:7,  budget:2500,  hotels:'hostel',    style:'budget',   destinations:['kl','penang','malacca'] },
  { name:'Couple Romantic', icon:'💑', days:7,  budget:5000,  hotels:'3star',     style:'mid',      destinations:['kl','langkawi'] },
  { name:'Family Trip',     icon:'👨‍👩‍👧‍👦', days:10, budget:12000, hotels:'4star',     style:'comfort',  destinations:['kl','penang','cameron'] },
  { name:'Luxury Escape',   icon:'✨', days:7,  budget:20000, hotels:'5star',     style:'luxury',   destinations:['kl','langkawi'] },
  { name:'Budget Explorer', icon:'💰', days:14, budget:3500,  hotels:'hostel',    style:'budget',   destinations:['kl','penang','malacca','cameron'] },
]

export const DAILY_COSTS = {
  hostel:  { accommodation:50,  food:30,  transport:25, activities:40 },
  budget:  { accommodation:100, food:50,  transport:35, activities:60 },
  '3star': { accommodation:200, food:80,  transport:60, activities:100 },
  '4star': { accommodation:380, food:130, transport:100, activities:150 },
  '5star': { accommodation:700, food:250, transport:200, activities:250 },
}

export const TOURIST_TRAPS = [
  { trap:'Taxi from KLIA without meter', howToAvoid:'Use GRAB app only. Fixed price RM 35–75 to KL. Metered taxis at arrival overcharge by 3x', saving:'RM 60–120', icon:'🚕' },
  { trap:'Changing money at airport kiosks', howToAvoid:'Change minimum at airport (just enough for transport). Change at money changers in Chinatown/Petaling Street — 5–8% better rate', saving:'₹800–2000 per RM 1000', icon:'💱' },
  { trap:'Buying overpriced SIM at airport', howToAvoid:'Airport SIMs are RM 50–80. Buy Maxis/Celcom/Digi at any 7-Eleven or convenience store for RM 10–30 with more data', saving:'RM 30–50', icon:'📱' },
  { trap:'Trishaw/rickshaw in Malacca (tourist price)', howToAvoid:'Fun ride but negotiate BEFORE getting on. Ask price first — should be RM 20–30 for 30 min, not RM 100+', saving:'RM 50–80', icon:'🛺' },
  { trap:'Buying water at tourist spots', howToAvoid:'7-Eleven everywhere. Buy 1.5L for RM 2.50 vs RM 8–10 at tourist spots. Malaysia tap water safe in cities', saving:'RM 15–30/day', icon:'🚰' },
  { trap:'Shopping at airport for souvenirs', howToAvoid:'Airport souvenirs are 3x Petaling Street price. Buy everything at Petaling St, pack in checked bag', saving:'RM 50–200', icon:'🛍️' },
  { trap:'Restaurant near major tourist sites', howToAvoid:'Walk 2–3 streets away from Petronas/Batu Caves. Same food, 50% cheaper. Use Google Maps "restaurants nearby"', saving:'RM 20–50/meal', icon:'🍽️' },
  { trap:'Unofficial tour guides at Batu Caves', howToAvoid:'Batu Caves is free, no guide needed. Anyone approaching you outside asking for "guided tour fee" is a scam', saving:'RM 50–200', icon:'⚠️' },
]

export const LOCAL_DEALS = [
  { name:'Grab App first ride', discount:'50% off up to RM 20', code:'NEWGRAB', valid:'New users', type:'transport', icon:'🚗' },
  { name:'Foodpanda new user', discount:'RM 10 off first order', code:'Check app', valid:'New users', type:'food', icon:'🍔' },
  { name:'Happy hour Mamak', discount:'Teh Tarik RM 1 (was RM 2)', code:'No code — ask', valid:'Typically 3–5pm', type:'food', icon:'☕' },
  { name:'MyMesra (Petronas)', discount:'Fuel/snacks rewards', code:'Free app', valid:'Ongoing', type:'misc', icon:'⛽' },
  { name:'Visit Malaysia tourist discounts', discount:'Up to 50% off attractions', code:'Show passport', valid:'Year-round', type:'attraction', icon:'🎟️' },
  { name:'MRT/LRT weekend pass', discount:'RM 10 unlimited rides', code:'Token machine', valid:'Sat–Sun', type:'transport', icon:'🚇' },
  { name:'Sunway Lagoon group discount', discount:'20% off (5+ people)', code:'Check website', valid:'Weekdays best', type:'attraction', icon:'🎢' },
  { name:'Redbox Karaoke weekday', discount:'From RM 9/hr (vs RM 18)', code:'Walk-in rate', valid:'Mon–Thu before 5pm', type:'entertainment', icon:'🎤' },
]

export const SIM_COMPARISON = {
  india: [
    { name:'Jio (roaming)', icon:'🇮🇳', data:'2GB/day', validity:'Daily', cost:'₹550–750/day', calls:'₹5/min (intl)', pros:['Familiar interface','Easy activate'], cons:['Very expensive for long stays','Speed throttles after 2GB','Calls expensive'] },
    { name:'Airtel (roaming)', icon:'🇮🇳', data:'2GB/day', validity:'Daily', cost:'₹675/day', calls:'₹5/min (intl)', pros:['Good coverage','Familiar'], cons:['Most expensive option','Better to buy local SIM'] },
    { name:'BSNL International', icon:'🇮🇳', data:'500MB/day', validity:'Daily', cost:'₹299–599/day', calls:'Included some', pros:['Cheapest Indian roaming'], cons:['Very slow data','Limited coverage'] },
  ],
  malaysia: [
    { name:'Maxis HotLink Tourist SIM', icon:'🇲🇾', data:'30GB', validity:'30 days', cost:'RM 30 (≈₹585)', calls:'Free local, RM 0.20/min to India', pros:['Best coverage Malaysia','30GB data','Fast 4G/5G'], cons:['Buy at airport/7-Eleven','Need passport to register'] },
    { name:'Celcom Tourist SIM', icon:'🇲🇾', data:'25GB', validity:'30 days', cost:'RM 25 (≈₹488)', calls:'Included local', pros:['Good coverage','Affordable','Works in rural areas'], cons:['Slightly slower than Maxis in KL'] },
    { name:'Digi Tourist SIM', icon:'🇲🇾', data:'20GB', validity:'15 days', cost:'RM 20 (≈₹390)', calls:'Some local included', pros:['Cheapest option','Good KL coverage'], cons:['Weaker in outskirts','15 days only'] },
    { name:'U Mobile Tourist Pack', icon:'🇲🇾', data:'50GB', validity:'30 days', cost:'RM 35 (≈₹682)', calls:'Some included', pros:['Most data','5G capable','Great value'], cons:['Coverage weaker in rural Malaysia'] },
  ],
  verdict: 'Buy a Malaysian SIM. For 30 days, Indian roaming = ₹15,000–20,000 vs Malaysian SIM = RM 25–35 (₹490–680). That\'s 30x cheaper. Buy at KLIA Arrivals or any 7-Eleven/Guardian store.'
}
