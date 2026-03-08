import { useState, useMemo } from 'react'
import { renderPDF } from './pdfExport'
import styles from './EPFCalc.module.css'
import PrivacyNotice from './PrivacyNotice'

const EMP_RATE  = 0.11
const EMP_RATE2 = 0.09 // optional reduced
const ER_RATE1  = 0.13 // salary <= 5000
const ER_RATE2  = 0.12 // salary > 5000
const DIVIDEND  = 0.055 // 5.50% — EPF Conventional declared for 2024 (announced Jan 2025)

export default function EPFCalc() {
  const [salary,    setSalary]    = useState('')
  const [years,     setYears]     = useState('30')
  const [existing,  setExisting]  = useState('')
  const [rate9,     setRate9]     = useState(false)
  const [divRate,   setDivRate]   = useState(5.50)

  const result = useMemo(() => {
    const sal    = parseFloat(salary) || 0
    const yrs    = parseInt(years) || 30
    const exist  = parseFloat(existing) || 0
    if (sal <= 0) return null

    const empRate  = rate9 ? EMP_RATE2 : EMP_RATE
    const errRate  = sal <= 5000 ? ER_RATE1 : ER_RATE2
    const empMth   = sal * empRate
    const errMth   = sal * errRate
    const totalMth = empMth + errMth
    const div      = divRate / 100

    let corpus = exist
    const yearly = []
    for (let y = 1; y <= yrs; y++) {
      const startBal = corpus
      corpus = (corpus + totalMth * 12) * (1 + div)
      yearly.push({ year: y, balance: corpus, contribution: totalMth * 12, interest: corpus - startBal - totalMth * 12 })
    }

    const totalContrib = totalMth * 12 * yrs + exist
    const interest     = corpus - totalContrib
    const inrCorpus    = corpus * 19.5

    return { empMth, errMth, totalMth, corpus, yearly, totalContrib, interest, inrCorpus, yrs }
  }, [salary, years, existing, rate9, divRate])

  const fmtRM  = n => `RM ${Math.round(n||0).toLocaleString()}`


  // const exportPDF = () => {
  //   const r = result
  //   renderPDF(
  //     'EPF Savings Calculator',
  //     `Salary: RM ${salary.toLocaleString()} · ${yrs} years`,
  //     [
  //       { type:'summary', title:'EPF Projection', items:[
  //         { label:'Monthly Contribution',  value:`RM ${Math.round(r.totalMth).toLocaleString()}` },
  //         { label:'Your EPF (11%)',         value:`RM ${Math.round(r.empMth).toLocaleString()}` },
  //         { label:'Employer EPF (12-13%)',  value:`RM ${Math.round(r.errMth).toLocaleString()}` },
  //         { label:'Projected Corpus',       value:`RM ${Math.round(r.corpus).toLocaleString()}`, highlight:true },
  //       ]},
  //       { type:'keyvalue', title:'Full Projection', items:[
  //         { label:'Monthly: Your EPF',      value:`RM ${Math.round(r.empMth).toLocaleString()}` },
  //         { label:'Monthly: Employer EPF',  value:`RM ${Math.round(r.errMth).toLocaleString()}` },
  //         { label:'Monthly: Total EPF',     value:`RM ${Math.round(r.totalMth).toLocaleString()}` },
  //         { label:'Annual Contribution',    value:`RM ${Math.round(r.yearly).toLocaleString()}` },
  //         { label:'Total Contributed ('+r.yrs+' yrs)', value:`RM ${Math.round(r.totalContrib).toLocaleString()}` },
  //         { label:'Interest Earned',        value:`RM ${Math.round(r.interest).toLocaleString()}`,  color:'#16a34a' },
  //         { label:'Final EPF Corpus',       value:`RM ${Math.round(r.corpus).toLocaleString()}`,    color:'#16a34a', bold:true },
  //         { label:'Corpus in INR',          value:`₹ ${Math.round(r.inrCorpus).toLocaleString()}` },
  //       ]},
  //     ],
  //     { alert:'Based on 5.5% dividend rate (FY2024). Actual EPF dividend varies yearly.' }
  //   )
  // }

  const exportPDF = () => {
    const r = result
    renderPDF(
      'EPF Savings Calculator',
      `Salary: RM ${salary.toLocaleString()} · ${r.yrs} years`,
      [
        { type:'summary', title:'EPF Overview', items:[
          { label:'Your Monthly EPF',    value:`RM ${Math.round(r.empMth).toLocaleString()}` },
          { label:'Employer Monthly EPF',value:`RM ${Math.round(r.errMth).toLocaleString()}` },
          { label:'Total Monthly',       value:`RM ${Math.round(r.totalMth).toLocaleString()}` },
          { label:'Projected Corpus',    value:`RM ${Math.round(r.corpus).toLocaleString()}`, highlight:true },
        ]},
        { type:'keyvalue', title:'Full Projection', items:[
          { label:'Annual Contribution',    value:`RM ${Math.round(r.yearly).toLocaleString()}` },
          { label:'Total Contributed',      value:`RM ${Math.round(r.totalContrib).toLocaleString()}` },
          { label:'Interest Earned',        value:`RM ${Math.round(r.interest).toLocaleString()}`, color:'#16a34a' },
          { label:'Final EPF Corpus',       value:`RM ${Math.round(r.corpus).toLocaleString()}`, color:'#16a34a', bold:true },
          { label:'Corpus in INR',          value:`₹ ${Math.round(r.inrCorpus).toLocaleString()}` },
        ]},
      ],
      { alert:'Based on 5.5% dividend rate (FY2024).' }
    )
  }
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.headerEmoji}>📈</span>
        <div>
          <h1 className={styles.headerTitle}>EPF Calculator</h1>
          <button className={styles.pdfBtn} onClick={exportPDF}>📄 Export PDF</button>
        <p className={styles.headerDesc}>Project your EPF corpus growth with employer + employee contributions & dividends</p>
        </div>
      </div>
      <PrivacyNotice />

      <div className={styles.inputCard}>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>💰 Monthly Gross Salary (RM)</label>
            <div className={styles.inputWrap}>
              <span className={styles.prefix}>RM</span>
              <input type="number" min="0" value={salary} onChange={e=>setSalary(e.target.value)} placeholder="e.g. 8000" />
            </div>
          </div>
          <div className={styles.field}>
            <label>📅 Years to Retire</label>
            <div className={styles.inputWrap}>
              <input type="number" min="1" max="40" value={years} onChange={e=>setYears(e.target.value)} placeholder="30" style={{paddingLeft:'14px'}} />
              <span className={styles.suffix}>yrs</span>
            </div>
          </div>
          <div className={styles.field}>
            <label>🏦 Existing EPF Balance (RM)</label>
            <div className={styles.inputWrap}>
              <span className={styles.prefix}>RM</span>
              <input type="number" min="0" value={existing} onChange={e=>setExisting(e.target.value)} placeholder="0" />
            </div>
          </div>
          <div className={styles.field}>
            <label>📊 Dividend Rate (%)</label>
            <div className={styles.inputWrap}>
              <input type="number" min="1" max="10" step="0.1" value={divRate} onChange={e=>setDivRate(parseFloat(e.target.value)||5.7)} style={{paddingLeft:'14px'}} />
              <span className={styles.suffix}>%/yr</span>
            </div>
          </div>
        </div>
        <label className={styles.toggle}>
          <input type="checkbox" checked={rate9} onChange={e=>setRate9(e.target.checked)} />
          <span>Use reduced 9% employee rate (optional for age 60+)</span>
        </label>
      </div>

      {result && (<>
        <div className={styles.summaryGrid}>
          {[
            { l:'Your contribution/month', v:fmtRM(result.empMth), sub:`${rate9?9:11}% of salary`, c:'lime' },
            { l:'Employer adds/month',     v:fmtRM(result.errMth), sub:`${parseFloat(salary)<=5000?13:12}% of salary`, c:'' },
            { l:'Total/month to EPF',      v:fmtRM(result.totalMth), sub:'Combined deposit', c:'blue' },
            { l:`Corpus in ${result.yrs} years`, v:fmtRM(result.corpus), sub:`≈ ₹${Math.round(result.inrCorpus/100000)}L`, c:'green' },
          ].map(s=>(
            <div key={s.l} className={`${styles.sumCard} ${s.c?styles['sum_'+s.c]:''}`}>
              <div className={styles.sumVal}>{s.v}</div>
              <div className={styles.sumLabel}>{s.l}</div>
              <div className={styles.sumSub}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div className={styles.chartCard}>
          <div className={styles.chartTitle}>📈 Balance Growth Over {result.yrs} Years</div>
          <div className={styles.bars}>
            {result.yearly.filter((_,i)=>(i+1)%Math.max(1,Math.floor(result.yrs/10))===0||(i+1)===result.yrs).map(y=>{
              const pct = (y.balance / result.corpus) * 100
              return (
                <div key={y.year} className={styles.barCol}>
                  <div className={styles.barWrap}>
                    <div className={styles.barFill} style={{height:`${pct}%`}} />
                    <div className={styles.barLabel2}>{fmtRM(y.balance).replace('RM ','')}</div>
                  </div>
                  <div className={styles.barYear}>Yr {y.year}</div>
                </div>
              )
            })}
          </div>
        </div>

        <div className={styles.insightGrid}>
          <div className={styles.insight}><span>💰</span><div><strong>Total contributed:</strong> {fmtRM(result.totalContrib)}</div></div>
          <div className={styles.insight}><span>📈</span><div><strong>Dividend earned:</strong> {fmtRM(result.interest)}</div></div>
          <div className={styles.insight}><span>🇮🇳</span><div><strong>In INR at retirement:</strong> ≈ ₹{Math.round(result.inrCorpus/100000)}L (at today's rate)</div></div>
          <div className={styles.insight}><span>💡</span><div><strong>Tip:</strong> You can withdraw EPF when you leave Malaysia permanently. Keep Account 1 (Akaun Persaraan, 75%) untouched — it grows with dividends. EPF Conventional declared 5.50% for 2024 (Syariah: 5.40%).</div></div>
        </div>
      </>)}
    </div>
  )
}
