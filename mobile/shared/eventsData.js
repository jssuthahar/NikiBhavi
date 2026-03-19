// Malaysia Events & Public Holidays 2026 + 2027
// For Indians — includes all major holidays + Indian festivals + key dates

export const EVENTS_2026 = [
  // ── Jan–Feb ──
  { date:'2026-01-01', name:"New Year's Day",          emoji:'🎆', type:'holiday',  note:'Public holiday' },
  { date:'2026-01-14', name:'Thai Pongal',              emoji:'🌾', type:'indian',   note:'Tamil harvest festival — cook rice pudding!' },
  { date:'2026-01-26', name:'Thaipusam',                emoji:'🕌', type:'indian',   note:'Kavadi procession at Batu Caves — massive event!' },
  { date:'2026-01-26', name:'Republic Day (India)',     emoji:'🇮🇳', type:'india',    note:'India national day — stream parade live' },
  { date:'2026-02-14', name:"Valentine's Day",          emoji:'❤️',  type:'fun',      note:'Book restaurants early — KL gets packed' },
  { date:'2026-02-17', name:'Chinese New Year',         emoji:'🧧',  type:'holiday',  note:'2-day holiday — year of the Horse. Banks closed, plan cash!' },
  { date:'2026-02-18', name:'CNY Day 2',                emoji:'🧧',  type:'holiday',  note:'Markets & restaurants closed. Stock up the day before.' },

  // ── Mar ──
  { date:'2026-03-20', name:'Hari Raya Day 1',          emoji:'🌙', type:'holiday',  note:'2-day holiday. KL roads empty — best time to drive!' },
  { date:'2026-03-21', name:'Hari Raya Day 2',          emoji:'🌙', type:'holiday',  note:'Most shops closed. Great time for road trips.' },

  // ── Apr ──
  { date:'2026-04-13', name:"Agong's Birthday",         emoji:'👑', type:'holiday',  note:'Federal holiday' },
  { date:'2026-04-14', name:'Tamil New Year (Puthandu)',emoji:'🌺', type:'indian',   note:'Tamil New Year! Kali thali, mangoes, family gathering' },
  { date:'2026-04-30', name:'Income Tax Deadline',      emoji:'🧾', type:'deadline', note:'⚠️ File Form BE at mytax.hasil.gov.my TODAY!' },

  // ── May ──
  { date:'2026-05-01', name:'Labour Day',               emoji:'🛠️', type:'holiday',  note:'Public holiday — long weekend if near Fri/Mon' },
  { date:'2026-05-27', name:'Hari Raya Aidiladha',      emoji:'🐑', type:'holiday',  note:'Qurban day — some areas may have road closures' },
  { date:'2026-05-31', name:'Wesak Day',                emoji:'☸️',  type:'holiday',  note:'Buddhist festival — Brickfields has procession' },

  // ── Jun ──
  { date:'2026-06-01', name:'NEW EP Salary Policy',     emoji:'⚠️', type:'deadline', note:'EP Cat III min RM 5,000, Cat II min RM 10,000, Cat I min RM 20,000' },
  { date:'2026-06-17', name:'Awal Muharram',            emoji:'🌙', type:'holiday',  note:'Islamic New Year — public holiday' },

  // ── Jul–Aug ──
  { date:'2026-07-15', name:'Durian Season Peak',       emoji:'🌵', type:'fun',      note:'Musang King at its best! Visit Bentong or Raub for cheap farm fresh durian' },
  { date:'2026-08-31', name:'Merdeka Day',              emoji:'🇲🇾', type:'holiday',  note:'Malaysia Independence Day. Fireworks at Dataran Merdeka!' },

  // ── Sep ──
  { date:'2026-09-16', name:'Malaysia Day',             emoji:'🇲🇾', type:'holiday',  note:'Formation of Malaysia. Twin holiday with Merdeka — travel weekend!' },
  { date:'2026-09-26', name:"Prophet's Birthday",       emoji:'🌙', type:'holiday',  note:'Public holiday' },

  // ── Oct ──
  { date:'2026-10-02', name:"Gandhi Jayanti (India)",   emoji:'🇮🇳', type:'india',    note:'India national holiday' },
  { date:'2026-10-20', name:'Navratri Begins',          emoji:'💃', type:'indian',   note:'9 nights of Goddess worship. KL temple events!' },

  // ── Nov ──
  { date:'2026-11-08', name:'Deepavali',                emoji:'🪔', type:'indian',   note:'National holiday! Brickfields transforms — lights, sweets, sarees everywhere!' },
  { date:'2026-11-14', name:"Children's Day (India)",   emoji:'👶', type:'india',    note:'India Bal Diwas' },

  // ── Dec ──
  { date:'2026-12-25', name:'Christmas Day',            emoji:'🎄', type:'holiday',  note:'Public holiday. Malls decorated, carol singing, KL beautiful!' },
  { date:'2026-12-31', name:'Visa-Free Deadline',       emoji:'🎉', type:'deadline', note:'⚠️ Indians VISA-FREE ends Dec 31, 2026. Renew/plan for 2027!' },
  { date:'2026-12-31', name:"New Year's Eve",           emoji:'🥂', type:'fun',      note:'KLCC fireworks — best spot: Mandarin Oriental rooftop or KLCC park' },
]

export const EVENTS_2027 = [
  { date:'2027-01-01', name:"New Year's Day",           emoji:'🎆', type:'holiday',  note:'Public holiday' },
  { date:'2027-01-14', name:'Thai Pongal',              emoji:'🌾', type:'indian',   note:'Tamil harvest festival' },
  { date:'2027-02-06', name:'Chinese New Year (Snake)', emoji:'🐍', type:'holiday',  note:'Year of the Snake. 2-day holiday' },
  { date:'2027-03-09', name:'Hari Raya',                emoji:'🌙', type:'holiday',  note:'2-day public holiday' },
  { date:'2027-04-14', name:'Tamil New Year',           emoji:'🌺', type:'indian',   note:'Tamil Puthandu — new year celebrations' },
  { date:'2027-04-30', name:'Income Tax Deadline',      emoji:'🧾', type:'deadline', note:'⚠️ File YA 2026 taxes at mytax.hasil.gov.my' },
  { date:'2027-05-01', name:'Labour Day',               emoji:'🛠️', type:'holiday',  note:'Public holiday' },
  { date:'2027-08-31', name:'Merdeka Day',              emoji:'🇲🇾', type:'holiday',  note:'Independence Day — 70th anniversary!' },
  { date:'2027-10-28', name:'Deepavali',                emoji:'🪔', type:'indian',   note:'Festival of lights — national holiday' },
  { date:'2027-12-25', name:'Christmas',                emoji:'🎄', type:'holiday',  note:'Public holiday' },
]

export const TYPE_COLORS = {
  holiday:  { bg:'#E6F7EE', text:'#007A37', label:'Holiday'  },
  indian:   { bg:'#FFF0EF', text:'#CC3300', label:'Indian'   },
  india:    { bg:'#FF9933', text:'#fff',    label:'India'    },
  deadline: { bg:'#FFF0EF', text:'#CC0000', label:'Deadline' },
  fun:      { bg:'#F0EDFF', text:'#7B61FF', label:'Fun'      },
}

export function getUpcomingEvents(days = 60) {
  const now   = new Date()
  const limit = new Date(now.getTime() + days * 86400000)
  return [...EVENTS_2026, ...EVENTS_2027]
    .map(e => ({ ...e, dateObj: new Date(e.date) }))
    .filter(e => e.dateObj >= now && e.dateObj <= limit)
    .sort((a, b) => a.dateObj - b.dateObj)
}

export function getDaysUntil(dateStr) {
  const d = new Date(dateStr)
  const now = new Date()
  now.setHours(0,0,0,0)
  return Math.ceil((d - now) / 86400000)
}
