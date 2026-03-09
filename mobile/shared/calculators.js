// ── NikiBhavi Shared Calculators ─────────────────────────
// Pure JS — no React, no DOM. Works on web AND mobile.

export const MYR_INR = 19.5
export const fmt  = n => 'RM ' + Math.abs(Math.round(n)).toLocaleString()
export const fmtI = n => '₹'  + Math.round(Math.abs(n) * MYR_INR).toLocaleString()
export const fmtN = n => Math.round(Math.abs(n)).toLocaleString()

// ── Tax brackets (Malaysia 2024-2026) ───────────────────
const BRACKETS = [
  { min:0,       max:5000,     rate:0,     base:0      },
  { min:5001,    max:20000,    rate:0.01,  base:0      },
  { min:20001,   max:35000,    rate:0.03,  base:150    },
  { min:35001,   max:50000,    rate:0.08,  base:600    },
  { min:50001,   max:70000,    rate:0.13,  base:1800   },
  { min:70001,   max:100000,   rate:0.21,  base:4400   },
  { min:100001,  max:130000,   rate:0.24,  base:10700  },
  { min:130001,  max:250000,   rate:0.245, base:17900  },
  { min:250001,  max:400000,   rate:0.25,  base:47250  },
  { min:400001,  max:600000,   rate:0.26,  base:84750  },
  { min:600001,  max:1000000,  rate:0.28,  base:136750 },
  { min:1000001, max:Infinity, rate:0.30,  base:248750 },
]

function taxFromChargeable(chargeable) {
  for (const b of BRACKETS) {
    if (chargeable <= b.max)
      return b.base + (chargeable - b.min) * b.rate
  }
  return 0
}

// ── PCB (monthly deductions) ─────────────────────────────
export function calcPCB(grossMonthly) {
  const gross = parseFloat(grossMonthly) || 0
  const epf   = Math.min(gross * 0.11, gross * 0.11) // 11%
  const socso = Math.min(gross * 0.005, 30)
  const eis   = Math.min(gross * 0.002, 12)
  const chargeable = Math.max(0, gross * 12 - 9000 - 4000 - 2500)
  const annualTax  = taxFromChargeable(chargeable)
  const pcb        = annualTax / 12
  return {
    gross,
    epf:       Math.round(epf * 100) / 100,
    socso:     Math.round(socso * 100) / 100,
    eis:       Math.round(eis * 100) / 100,
    pcb:       Math.round(pcb * 100) / 100,
    takehome:  Math.round((gross - epf - socso - eis - pcb) * 100) / 100,
    annualTax: Math.round(annualTax),
    totalDeductions: Math.round((epf + socso + eis + pcb) * 100) / 100,
  }
}

// ── Tax refund ───────────────────────────────────────────
export function calcTaxRefund({ annualIncome, totalRelief, taxPaidPCB }) {
  const income     = parseFloat(annualIncome) || 0
  const relief     = parseFloat(totalRelief)  || 9000
  const paid       = parseFloat(taxPaidPCB)   || 0
  const chargeable = Math.max(0, income - relief)
  const taxPayable = taxFromChargeable(chargeable)
  return {
    grossIncome: income,
    totalRelief: relief,
    chargeableIncome: chargeable,
    taxPayable:  Math.round(taxPayable),
    taxPaidPCB:  paid,
    refund:      Math.round(paid - taxPayable),
    effectiveRate: income > 0 ? +((taxPayable / income) * 100).toFixed(2) : 0,
  }
}

// ── EPF projection ───────────────────────────────────────
export function calcEPF({ monthlySalary, years = 10, dividendRate = 5.5 }) {
  const salary  = parseFloat(monthlySalary) || 0
  const yrs     = parseInt(years) || 10
  const div     = parseFloat(dividendRate) / 100
  const empMth  = salary * 0.11
  const errMth  = salary <= 5000 ? salary * 0.13 : salary * 0.12
  const total   = empMth + errMth
  const yearly  = total * 12
  let corpus    = 0
  for (let i = 0; i < yrs; i++) corpus = corpus * (1 + div) + yearly
  const totalContrib = yearly * yrs
  return {
    empMth:       Math.round(empMth),
    errMth:       Math.round(errMth),
    totalMth:     Math.round(total),
    yearly:       Math.round(yearly),
    totalContrib: Math.round(totalContrib),
    interest:     Math.round(corpus - totalContrib),
    corpus:       Math.round(corpus),
    inrCorpus:    Math.round(corpus * MYR_INR),
    yrs,
  }
}

// ── Car loan ─────────────────────────────────────────────
export function calcCarLoan({ price, downPct = 10, ratePA = 3.0, years = 7 }) {
  const p       = parseFloat(price) || 0
  const downAmt = p * (downPct / 100)
  const loan    = p - downAmt
  const months  = years * 12
  const monthly = emi(loan, ratePA, months)
  return {
    price: p, downAmt: Math.round(downAmt), loan: Math.round(loan),
    months, ratePA,
    monthly:       Math.round(monthly),
    totalPay:      Math.round(monthly * months),
    totalInterest: Math.round(monthly * months - loan),
    roadTax:       Math.round(p < 50000 ? 90 : p < 100000 ? 180 : 380),
    insurance:     Math.round(p * 0.025),
  }
}

// ── Home loan ────────────────────────────────────────────
export function calcHomeLoan({ price, income, years = 30, ratePA = 4.25 }) {
  const p       = parseFloat(price)  || 0
  const gross   = parseFloat(income) || 0
  const down    = p * 0.10
  const loan    = p * 0.90
  const months  = years * 12
  const monthly = emi(loan, ratePA, months)
  const dsr     = gross > 0 ? (monthly / gross) * 100 : 0
  return {
    price: p, down: Math.round(down), loan: Math.round(loan),
    monthly:   Math.round(monthly),
    totalPay:  Math.round(monthly * months),
    interest:  Math.round(monthly * months - loan),
    dsr:       +dsr.toFixed(1),
    eligible:  dsr < 65,
  }
}

// ── Remittance ───────────────────────────────────────────
const PROVIDERS = [
  { name:'Wise',          baseRate:19.8, fee:8  },
  { name:'RemitBee',      baseRate:19.6, fee:0  },
  { name:'InstaReM',      baseRate:19.5, fee:5  },
  { name:'Western Union', baseRate:19.2, fee:10 },
  { name:'Bank TT',       baseRate:18.8, fee:15 },
  { name:'Maybank',       baseRate:18.5, fee:20 },
]
export function calcRemittance(amountMYR) {
  const amt = parseFloat(amountMYR) || 0
  return PROVIDERS
    .map(p => ({ ...p, received: Math.round((amt - p.fee) * p.baseRate) }))
    .sort((a, b) => b.received - a.received)
}

// ── EP eligibility ───────────────────────────────────────
export function checkEP(salary) {
  const s = parseFloat(salary) || 0
  if (s >= 20000) return { cat:'Category I',        eligible:true,  tenure:10, note:'Top tier — 10-year EP' }
  if (s >= 10000) return { cat:'Category II',       eligible:true,  tenure:10, note:'10-year EP validity' }
  if (s >= 7000)  return { cat:'Manufacturing III', eligible:true,  tenure:5,  note:'Manufacturing sector only' }
  if (s >= 5000)  return { cat:'Category III',      eligible:true,  tenure:5,  note:'5-year max, succession plan needed' }
  return { cat:null, eligible:false, tenure:0, note:`Below RM 5,000 minimum. Shortfall: RM ${(5000-s).toLocaleString()}` }
}

// ── Budget simulation ────────────────────────────────────
export function calcBudget({ salary, expenses, years=5, growthPct=7, epfDivPct=5.5 }) {
  const gross   = parseFloat(salary) || 0
  const pcb     = calcPCB(gross)
  const totalExp = Object.values(expenses).reduce((s, v) => s + (parseFloat(v)||0), 0)
  const gr      = parseFloat(growthPct) / 100
  const div     = parseFloat(epfDivPct) / 100
  let cumSav = 0, epfCorpus = 0
  const projection = Array.from({ length: parseInt(years) }, (_, i) => {
    const ySal  = gross * Math.pow(1 + gr, i)
    const yPCB  = calcPCB(ySal)
    const yExp  = totalExp * Math.pow(1.04, i)
    const yMSav = yPCB.takehome - yExp
    cumSav     += yMSav * 12
    epfCorpus   = epfCorpus * (1 + div) + (yPCB.epf + (ySal <= 5000 ? ySal*0.13 : ySal*0.12)) * 12
    return { year:i+1, salary:Math.round(ySal), takehome:Math.round(yPCB.takehome),
             expenses:Math.round(yExp), savings:Math.round(yMSav), cumSavings:Math.round(cumSav) }
  })
  return { ...pcb, gross, totalExp, monthlySavings:Math.round(pcb.takehome - totalExp),
           savingsPct: gross > 0 ? +((( pcb.takehome - totalExp) / pcb.takehome)*100).toFixed(1) : 0,
           projection, epfCorpus: Math.round(epfCorpus) }
}

// ── Helper ───────────────────────────────────────────────
function emi(principal, ratePA, months) {
  if (!principal || !ratePA) return principal / months
  const r = ratePA / 100 / 12
  return principal * r * Math.pow(1+r, months) / (Math.pow(1+r, months) - 1)
}
