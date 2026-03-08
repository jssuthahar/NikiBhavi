import { useState, useMemo } from 'react'
import { renderPDF } from './pdfExport'
import styles from './SalaryCalc.module.css'
import PrivacyNotice from './PrivacyNotice'

const INR_TO_MYR = 0.0513
const MYR_TO_INR = 19.5

const CITY_COL = {
  'kl':      { name:'Kuala Lumpur', idx:1.0,  rent:2200 },
  'penang':  { name:'Penang',       idx:0.82, rent:1600 },
  'jb':      { name:'Johor Bahru',  idx:0.78, rent:1300 },
  'mumbai':  { name:'Mumbai',       idx:0.95, rent:30000 },
  'bangalore':{ name:'Bangalore',   idx:0.88, rent:25000 },
  'delhi':   { name:'Delhi',        idx:0.85, rent:22000 },
  'hyderabad':{ name:'Hyderabad',   idx:0.80, rent:18000 },
  'chennai': { name:'Chennai',      idx:0.78, rent:16000 },
}

const EPF_RATE   = 0.11
const SOCSO_RATE = 0.005  // max insurable salary RM 6,000 (updated 2022, still current 2026)
const EIS_RATE   = 0.002

function calcPCB(annual) {
  const brackets = [
    [5000,0,0],[20000,0.01,0],[35000,0.03,150],[50000,0.08,600],
    [70000,0.13,1800],[100000,0.21,4400],[130000,0.24,10700],
    [250000,0.245,17900],[400000,0.25,47250],[600000,0.26,84750],[Infinity,0.28,136750]
  ]
  if (annual <= 0) return 0
  for (const [max,rate,base] of brackets) {
    if (annual <= max) return base + (annual - (brackets[brackets.indexOf(brackets.find(b=>b[0]===max))-1]?.[0]||0)) * rate
  }
  return 0
}

export default function SalaryCalc() {
  const [mode,       setMode]       = useState('myr') // 'myr' or 'inr'
  const [salary,     setSalary]     = useState('')
  const [myCity,     setMyCity]     = useState('kl')
  const [indiaCity,  setIndiaCity]  = useState('bangalore')
  const [experience, setExperience] = useState('mid')

  const result = useMemo(() => {
    const raw = parseFloat(salary) || 0
    if (raw <= 0) return null

    let myrMonthly, inrMonthly
    if (mode === 'myr') {
      myrMonthly = raw
      inrMonthly = raw * MYR_TO_INR
    } else {
      inrMonthly = raw
      myrMonthly = raw * INR_TO_MYR
    }

    const myrAnnual  = myrMonthly * 12
    const epf        = myrMonthly * EPF_RATE
    const socso      = Math.min(myrMonthly * SOCSO_RATE, 30.00)  // SOCSO cap at RM 6,000 salary
    const eis        = Math.min(myrMonthly * EIS_RATE, 12.00)   // EIS cap at RM 6,000 salary
    const pcbAnnual  = calcPCB(myrAnnual - epf*12 - 9000)
    const pcbMonthly = pcbAnnual / 12
    const takeHome   = myrMonthly - epf - socso - eis - pcbMonthly

    const myColCity   = CITY_COL[myCity]
    const inColCity   = CITY_COL[indiaCity]
    const myRent      = myColCity.rent
    const myLiving    = myRent + myrMonthly * 0.25
    const myNet       = takeHome - myLiving
    const indiaEquiv  = inrMonthly / inColCity.idx * myColCity.idx

    const betterOff = takeHome * MYR_TO_INR > (inrMonthly * 1.2)

    return {
      myrMonthly, inrMonthly, myrAnnual,
      epf, socso, eis, pcbMonthly,
      takeHome, myRent, myLiving, myNet,
      betterOff, indiaEquiv
    }
  }, [salary, mode, myCity, indiaCity, experience])

  const fmt = (n, cur='RM') => `${cur} ${Math.round(n||0).toLocaleString()}`
  const fmtINR = n => `₹${Math.round(n||0).toLocaleString('en-IN')}`


  const exportPDF = () => {
    const r = result
    renderPDF(
      'Salary Comparison — India vs Malaysia',
      `Malaysia: RM ${(parseFloat(myrSalary)||0).toLocaleString()} / India: ₹${(parseFloat(inrSalary)||0).toLocaleString()}`,
      [
        { type:'summary', title:'Comparison', items:[
          { label:'Malaysia Gross',     value:`RM ${Math.round(r.myrGross||0).toLocaleString()}` },
          { label:'Malaysia Take-Home', value:`RM ${Math.round(r.myrNet||0).toLocaleString()}`, highlight:true },
          { label:'India Gross',        value:`₹ ${Math.round(r.inrGross||0).toLocaleString()}` },
          { label:'India Take-Home',    value:`₹ ${Math.round(r.inrNet||0).toLocaleString()}` },
        ]},
        { type:'keyvalue', title:'Detailed Comparison', items:[
          { label:'Malaysia Gross',         value:`RM ${Math.round(r.myrGross||0).toLocaleString()}` },
          { label:'Malaysia EPF (11%)',      value:`− RM ${Math.round(r.myrEpf||0).toLocaleString()}`, color:'#dc2626' },
          { label:'Malaysia PCB',           value:`− RM ${Math.round(r.myrPcb||0).toLocaleString()}`, color:'#dc2626' },
          { label:'Malaysia Net',           value:`RM ${Math.round(r.myrNet||0).toLocaleString()}`, color:'#16a34a', bold:true },
          { label:'Equivalent INR',         value:`₹ ${Math.round((r.myrNet||0)*19.5).toLocaleString()}` },
        ]},
      ],
      { alert:'Exchange rate: 1 MYR ≈ ₹19.5 (2026).' }
    )
  }
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.headerEmoji}>📊</span>
        <div>
          <h1 className={styles.headerTitle}>Salary & Offer Comparison</h1>
          <button className={styles.pdfBtn} onClick={exportPDF}>📄 Export PDF</button>
        <p className={styles.headerDesc}>India CTC vs Malaysia offer — see real take-home after EPF, PCB, SOCSO</p>
        </div>
      </div>
      <PrivacyNotice />

      <div className={styles.inputCard}>
        <div className={styles.modeToggle}>
          <button className={`${styles.modeBtn} ${mode==='myr'?styles.active:''}`} onClick={()=>setMode('myr')}>🇲🇾 Malaysia Salary (MYR)</button>
          <button className={`${styles.modeBtn} ${mode==='inr'?styles.active:''}`} onClick={()=>setMode('inr')}>🇮🇳 India CTC (INR)</button>
        </div>
        <div className={styles.fieldsGrid}>
          <div className={styles.field}>
            <label>{mode==='myr'?'💰 Monthly Gross Salary (RM)':'💰 Monthly CTC / In-Hand (₹)'}</label>
            <div className={styles.inputWrap}>
              <span className={styles.prefix}>{mode==='myr'?'RM':'₹'}</span>
              <input type="number" min="0" value={salary} onChange={e=>setSalary(e.target.value)} placeholder={mode==='myr'?'e.g. 8000':'e.g. 80000'} />
            </div>
          </div>
          <div className={styles.field}>
            <label>📍 Malaysia City</label>
            <select value={myCity} onChange={e=>setMyCity(e.target.value)}>
              {['kl','penang','jb'].map(c=><option key={c} value={c}>{CITY_COL[c].name}</option>)}
            </select>
          </div>
          <div className={styles.field}>
            <label>🏙️ India City (for comparison)</label>
            <select value={indiaCity} onChange={e=>setIndiaCity(e.target.value)}>
              {['mumbai','bangalore','delhi','hyderabad','chennai'].map(c=><option key={c} value={c}>{CITY_COL[c].name}</option>)}
            </select>
          </div>
        </div>
      </div>

      {result && (<>
        <div className={`${styles.verdictCard} ${result.betterOff?styles.verdictGood:styles.verdictMeh}`}>
          <span className={styles.verdictEmoji}>{result.betterOff?'🎉':'🤔'}</span>
          <div>
            <div className={styles.verdictTitle}>{result.betterOff?'You are financially better off in Malaysia!':'Worth comparing more carefully'}</div>
            <div className={styles.verdictSub}>Malaysia take-home ≈ {fmtINR(result.takeHome * MYR_TO_INR)}/month purchasing power</div>
          </div>
        </div>

        <div className={styles.breakdownGrid}>
          <div className={styles.breakCard}>
            <div className={styles.breakTitle}>🇲🇾 Malaysia Monthly</div>
            {[
              ['Gross Salary',  fmt(result.myrMonthly), ''],
              ['EPF (11%)',     `− ${fmt(result.epf)}`, 'red'],
              ['SOCSO',         `− ${fmt(result.socso)}`, 'red'],
              ['EIS',           `− ${fmt(result.eis)}`, 'red'],
              ['PCB Tax',       `− ${fmt(result.pcbMonthly)}`, 'red'],
              ['Take-Home',     fmt(result.takeHome), 'green'],
              ['Est. Rent',     `− ${fmt(result.myRent)}`, 'muted'],
              ['Living Cost',   `− ${fmt(result.myLiving - result.myRent)}`, 'muted'],
              ['Monthly Savings', fmt(result.myNet), result.myNet>0?'green':'red'],
            ].map(([l,v,c])=>(
              <div key={l} className={`${styles.breakRow} ${l==='Take-Home'||l==='Monthly Savings'?styles.highlight:''}`}>
                <span>{l}</span><span className={styles[c]||''}>{v}</span>
              </div>
            ))}
          </div>
          <div className={styles.breakCard}>
            <div className={styles.breakTitle}>🇮🇳 India Equivalent</div>
            <div className={styles.convRow}><span>Malaysia take-home</span><strong>{fmt(result.takeHome)}</strong></div>
            <div className={styles.convRow}><span>In INR (×{MYR_TO_INR})</span><strong>{fmtINR(result.takeHome*MYR_TO_INR)}</strong></div>
            <div className={styles.divider}/>
            <div className={styles.convRow}><span>India in-hand entered</span><strong>{fmtINR(result.inrMonthly)}</strong></div>
            <div className={styles.convRow}><span>Difference</span>
              <strong className={result.takeHome*MYR_TO_INR>result.inrMonthly?styles.green:styles.red}>
                {result.takeHome*MYR_TO_INR>result.inrMonthly?'+':''}{fmtINR(result.takeHome*MYR_TO_INR - result.inrMonthly)}
              </strong>
            </div>
            <div className={styles.divider}/>
            <div className={styles.noteBox}>
              <strong>💡 Remember:</strong> Malaysia gives you EPF savings that compound, no India income tax filing hassle, and potential PR path. Factor in relocation cost (RM 5,000–15,000 one-time).
            </div>
          </div>
        </div>
      </>)}
    </div>
  )
}
