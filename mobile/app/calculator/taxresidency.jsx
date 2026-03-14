import { useState, useMemo } from 'react'
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { C, s, SP, R, W, shadowMd } from '../../src/theme/index'

const TAX_BRACKETS = [
  { min:0,      max:5000,    rate:0,    base:0     },
  { min:5001,   max:20000,   rate:0.01, base:0     },
  { min:20001,  max:35000,   rate:0.03, base:150   },
  { min:35001,  max:50000,   rate:0.08, base:600   },
  { min:50001,  max:70000,   rate:0.13, base:1800  },
  { min:70001,  max:100000,  rate:0.21, base:4400  },
  { min:100001, max:130000,  rate:0.24, base:10700 },
  { min:130001, max:250000,  rate:0.245,base:17900 },
  { min:250001, max:Infinity,rate:0.30, base:84750 },
]

function calcResidentTax(annual) {
  const chargeable = Math.max(0, annual - 9000)
  for (const b of TAX_BRACKETS) {
    if (chargeable <= b.max) return b.base + (chargeable - b.min) * b.rate
  }
  return 0
}

const fmt = n => 'RM ' + Math.round(n).toLocaleString()

export default function TaxResidencyScreen() {
  const [day,     setDay]     = useState('')
  const [month,   setMonth]   = useState('')
  const [year,    setYear]    = useState('2026')
  const [monthly, setMonthly] = useState('')
  const [calculated, setCalculated] = useState(false)

  const TAX_YEAR = 2026

  const r = useMemo(() => {
    const d = parseInt(day), m = parseInt(month), y = parseInt(year)
    if (!d || !m || !y) return null
    const arrival     = new Date(y, m - 1, d)
    const yearStart   = new Date(TAX_YEAR, 0, 1)
    const yearEnd     = new Date(TAX_YEAR, 11, 31)
    if (arrival > yearEnd) return { notArrived: true }
    const effectiveStart = arrival < yearStart ? yearStart : arrival
    const daysInYear  = Math.floor((yearEnd - effectiveStart) / 86400000) + 1
    const residentDate= new Date(effectiveStart.getTime() + 181 * 86400000)
    const becomesResident = residentDate <= yearEnd
    const annualIncome = (parseFloat(monthly) || 0) * 12
    const residentTax    = calcResidentTax(annualIncome)
    const nonResidentTax = annualIncome * 0.30
    const saving         = nonResidentTax - residentTax
    return { daysInYear, becomesResident, residentDate, annualIncome, residentTax, nonResidentTax, saving }
  }, [day, month, year, monthly])

  const canCalc = day && month && year

  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom:40 }}>

      <Text style={s.sectionHdr}>Your Arrival Date in Malaysia</Text>
      <View style={s.inputGroup}>
        <View style={s.inputRow}>
          <Text style={s.inputLabel}>Day</Text>
          <TextInput style={s.input} value={day} onChangeText={setDay}
            keyboardType="numeric" placeholder="e.g. 15" placeholderTextColor={C.placeholder} returnKeyType="next" />
        </View>
        <View style={s.inputRow}>
          <Text style={s.inputLabel}>Month</Text>
          <TextInput style={s.input} value={month} onChangeText={setMonth}
            keyboardType="numeric" placeholder="1–12" placeholderTextColor={C.placeholder} returnKeyType="next" />
        </View>
        <View style={[s.inputRow, { borderBottomWidth:0 }]}>
          <Text style={s.inputLabel}>Year</Text>
          <TextInput style={s.input} value={year} onChangeText={setYear}
            keyboardType="numeric" placeholder="2026" placeholderTextColor={C.placeholder} returnKeyType="done" />
        </View>
      </View>

      <Text style={s.sectionHdr}>Monthly Salary (for tax estimate)</Text>
      <View style={s.inputGroup}>
        <View style={[s.inputRow, { borderBottomWidth:0 }]}>
          <Text style={s.inputLabel}>Monthly Gross</Text>
          <Text style={[s.small, { marginRight:6, color:C.muted }]}>RM</Text>
          <TextInput style={s.input} value={monthly} onChangeText={setMonthly}
            keyboardType="numeric" placeholder="e.g. 8000" placeholderTextColor={C.placeholder} returnKeyType="done" />
        </View>
      </View>

      <TouchableOpacity style={[s.btnPrimary, !canCalc && { opacity:0.45 }]}
        onPress={() => canCalc && setCalculated(true)} activeOpacity={0.8}>
        <Text style={s.btnText}>Check Tax Residency</Text>
      </TouchableOpacity>

      {calculated && r && !r.notArrived && (
        <>
          <View style={[ls.card, { backgroundColor: r.becomesResident ? C.primary : C.warning }]}>
            <Text style={s.resultLabel}>{r.becomesResident ? '✅ Tax Resident in 2026' : '⚠️ Non-Resident in 2026'}</Text>
            <Text style={s.resultValue}>{r.daysInYear} days in Malaysia</Text>
            <Text style={s.resultSub}>
              {r.becomesResident
                ? `Resident from ${r.residentDate.toLocaleDateString('en-MY',{day:'numeric',month:'short'})} → progressive tax 0–30%`
                : `Need 182 days for residency. You have ${r.daysInYear}. Non-resident = flat 30%.`}
            </Text>
          </View>

          {r.annualIncome > 0 && (
            <>
              <Text style={s.sectionHdr}>Tax Comparison</Text>
              <View style={s.card}>
                {[
                  ['Annual Income',          fmt(r.annualIncome),    C.label  ],
                  ['Non-Resident (flat 30%)',fmt(r.nonResidentTax),  C.danger ],
                  ['Resident Tax',           fmt(r.residentTax),     C.primary],
                  ['You save as resident',   fmt(r.saving),          C.primary],
                ].map(([l,v,c],i,arr) => (
                  <View key={l} style={i < arr.length-1 ? s.row : s.rowLast}>
                    <Text style={[s.body,{flex:1}]}>{l}</Text>
                    <Text style={[s.title,{color:c}]}>{v}</Text>
                  </View>
                ))}
              </View>
            </>
          )}
        </>
      )}

      <Text style={s.sectionHdr}>Resident Tax Brackets 2026</Text>
      <View style={[s.card, { paddingVertical:0 }]}>
        {[['Up to RM 5,000','0%'],['RM 5,001–20,000','1%'],['RM 20,001–35,000','3%'],
          ['RM 35,001–50,000','8%'],['RM 50,001–70,000','13%'],['RM 70,001–100,000','21%'],
          ['RM 100,001–130,000','24%'],['RM 130,001–250,000','24.5%'],['Above RM 250,000','30%'],
        ].map(([range,rate],i,arr) => (
          <View key={range} style={i < arr.length-1 ? s.row : s.rowLast}>
            <Text style={[s.body,{flex:1}]}>{range}</Text>
            <Text style={[s.title,{color:C.primary}]}>{rate}</Text>
          </View>
        ))}
      </View>

      <View style={ls.tip}>
        <Text style={ls.tipTxt}>📌 File by April 30, 2027 at mytax.hasil.gov.my. Residents use Form BE, non-residents use Form M.</Text>
      </View>
    </ScrollView>
  )
}
const ls = StyleSheet.create({
  card: { marginHorizontal:SP.lg, marginTop:SP.lg, borderRadius:R.xxl, padding:SP.xl, ...shadowMd },
  tip:  { marginHorizontal:SP.lg, backgroundColor:'#FFFBEB', borderRadius:R.xl, padding:SP.md },
  tipTxt: { fontSize:13, color:'#92400E', lineHeight:19 },
})
