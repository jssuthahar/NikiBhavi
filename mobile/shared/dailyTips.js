export const DAILY_TIPS = [
  { emoji:'💸', cat:'Remittance', tip:'Transfer money to India on weekdays 9am–12pm KL time — rates are typically 0.1–0.3% better than evenings or weekends.' },
  { emoji:'🧾', cat:'Tax',        tip:'Keep all medical receipts! Malaysia allows up to RM 10,000 tax relief for medical expenses per year.' },
  { emoji:'🏦', cat:'EPF',        tip:'Your EPF Akaun Fleksibel (10% of contributions) can be withdrawn anytime — no need to leave Malaysia.' },
  { emoji:'🏠', cat:'Housing',    tip:'Negotiate rent before signing! Landlords in Malaysia often accept 5–10% lower for good tenants who pay on time.' },
  { emoji:'✈️', cat:'Travel',     tip:'MDAC for Malaysia must be submitted at least 3 days before arrival. Submit it at imigresen-online.imi.gov.my — it\'s FREE.' },
  { emoji:'💳', cat:'BigPay',     tip:'BigPay card has no forex fees! Use it for overseas purchases and ATM withdrawals — great exchange rates too.' },
  { emoji:'🚇', cat:'Transport',  tip:'Monthly Rapid KL pass is RM 100 for unlimited MRT, LRT and BRT rides in Klang Valley — huge savings vs daily tokens.' },
  { emoji:'🍛', cat:'Food',       tip:'Mamak restaurants are the best value in Malaysia — roti canai costs RM 1.50 and teh tarik RM 2. Open 24hrs everywhere.' },
  { emoji:'📊', cat:'PCB Tax',    tip:'As a tax resident, your PCB deduction may be higher than your actual tax — file Form BE to claim your refund by April 30.' },
  { emoji:'💼', cat:'EP',         tip:'EP renewal should be started 3 months before expiry. Your employer applies through ESD — remind them early.' },
  { emoji:'🛒', cat:'Groceries',  tip:'Mydin and Giant have the cheapest Indian groceries in Malaysia. Brickfields wet market is best for fresh vegetables.' },
  { emoji:'🏥', cat:'Health',     tip:'As an EP holder, government hospitals charge only RM 1 per outpatient visit. Keep your EP card handy.' },
  { emoji:'📱', cat:'SIM',        tip:'Maxis postpaid RM 80/mo gives you 40GB data and unlimited calls — best for heavy data users in Malaysia.' },
  { emoji:'🎯', cat:'Savings',    tip:'The 50/30/20 rule works well in KL: 50% needs (rent+food), 30% wants (dining out), 20% savings + remittance.' },
  { emoji:'⚖️', cat:'Legal',      tip:'Your EP is tied to one employer. If you change jobs, your new employer must apply for a fresh EP before you start work.' },
  { emoji:'🌅', cat:'Lifestyle',  tip:'Sunrise at Petronas Towers park (KLCC) at 6:30am is magical and completely free — almost nobody there that early!' },
  { emoji:'💰', cat:'Tax Refund', tip:'Self & dependents relief is RM 9,000 automatically. Add EPF (RM 4,000), life insurance (RM 3,000) to cut your tax bill.' },
  { emoji:'🏦', cat:'Banking',    tip:'Enable Duitnow on your Malaysian bank account immediately — it\'s Malaysia\'s instant transfer (like UPI). Free and instant.' },
  { emoji:'🚗', cat:'Car',        tip:'Proton and Perodua are the cheapest new cars in Malaysia. Perodua Axia starts at RM 40,000 — lowest in the market.' },
  { emoji:'🎓', cat:'Kids',       tip:'SJKT (Tamil schools) are free and available in most major cities. Register your child as soon as you get EP.' },
  { emoji:'⚡', cat:'InstaReM',   tip:'InstaReM credits money to Indian bank accounts within 1 minute! Use referral code kQodAW for your first free transfer.' },
  { emoji:'📦', cat:'Shopping',   tip:'Shopee and Lazada have the best deals in Malaysia. Download both — flash sales happen daily at 12pm and 9pm.' },
  { emoji:'🌿', cat:'Weekend',    tip:'Cameron Highlands is 3 hours from KL — cool weather, tea estates, strawberry farms. Perfect Indian family weekend trip.' },
  { emoji:'💡', cat:'Utility',    tip:'Unifi Home 300Mbps is the most popular internet plan at RM 129/mo. Offers up to 500Mbps for RM 159/mo.' },
  { emoji:'🏛️', cat:'PR',         tip:'EP holders can apply for Permanent Residency after 5 continuous years. Keep records of all EP renewals.' },
  { emoji:'🎪', cat:'Culture',    tip:'Pasar malam (night market) rotates by neighbourhood. Ask locals — there\'s one somewhere near you every night of the week.' },
  { emoji:'📈', cat:'Invest',     tip:'EPF dividend has averaged 5.5–6.1% over the last 5 years — much better than most FD rates. Don\'t withdraw early!' },
  { emoji:'🌴', cat:'Travel',     tip:'Langkawi is duty-free — chocolate, alcohol, perfume are 30–50% cheaper than KL. Great quick trip from Penang too.' },
  { emoji:'🤝', cat:'Community',  tip:'Join the "Indians in Malaysia" Facebook group — 50,000+ members sharing tips, jobs, housing, and events daily.' },
  { emoji:'🎉', cat:'Deepavali',  tip:'Deepavali is a national holiday in Malaysia! Indians celebrate big here — Brickfields KL transforms into a festival wonderland.' },
]

export function getTodayTip() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000)
  return DAILY_TIPS[dayOfYear % DAILY_TIPS.length]
}

export function getMultipleTips(n = 3) {
  const today = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000)
  return Array.from({ length: n }, (_, i) => DAILY_TIPS[(today + i) % DAILY_TIPS.length])
}
