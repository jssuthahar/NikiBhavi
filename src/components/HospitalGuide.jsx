import { useState } from 'react'
import styles from './HospitalGuide.module.css'
import PrivacyNotice from './PrivacyNotice'

const TABS = [
  { id:'panel', label:'🏥 Panel Clinics' },
  { id:'govt',  label:'🏛️ Govt Hospitals' },
  { id:'private', label:'💊 Private Hospitals' },
  { id:'specialist', label:'🩺 Specialists' },
  { id:'tips', label:'💡 Tips' },
]

const DATA = {
  panel: {
    title: 'Panel Clinics — Free with Company Medical Card',
    intro: 'Your company HR will give a list of approved panel clinics on Day 1. Show your medical card / staff ID for free or RM 1–5 copay visits.',
    items:[
      {n:'KPJ Family Clinic',loc:'Multiple KL locations',cost:'Free with panel card',for:'GP, MC cert, basic medication'},
      {n:'Columbia Asia Clinic',loc:'Setapak, Cheras, Puchong, Bukit Jalil',cost:'Free or RM 10–30 copay',for:'GP, minor procedures, vaccination'},
      {n:'Klinik DR Clinic',loc:'Cheras, Ampang, Sri Petaling',cost:'Free with panel',for:'GP, common cold/fever, referral'},
      {n:'Caring Pharmacy Clinic',loc:'Most major shopping malls',cost:'Varies',for:'Quick GP consultations'},
      {n:'Any GP near office',loc:'Ask HR for panel list',cost:'Free-RM 10',for:'All basic GP needs'},
    ],
    note:'✅ Always carry company medical card + IC/Passport. Panel clinic gives MC (sick leave certificate) accepted by all employers.'
  },
  govt: {
    title: 'Government Hospitals & Clinics',
    intro: 'Quality care at RM 1–5 per visit. Long wait times but excellent for serious conditions. EP holders are eligible.',
    items:[
      {n:'Hospital Kuala Lumpur (HKL)',loc:'Jalan Pahang, KL',cost:'RM 1 registration + RM 1–5/visit',for:'Full specialist, trauma, A&E 24hr, ICU'},
      {n:'Hospital Universiti Kebangsaan Malaysia',loc:'Cheras, KL',cost:'RM 1–5',for:'Teaching hospital, all specialties, research'},
      {n:'Hospital Ampang',loc:'Ampang',cost:'RM 1–5',for:'General + specialist, near Indian community'},
      {n:'Hospital Selayang',loc:'Batu Caves',cost:'RM 1–5',for:'General hospital, good A&E'},
      {n:'Klinik Kesihatan (Community Clinic)',loc:'Every neighbourhood',cost:'RM 1',for:'GP, vaccination, maternal health, referrals'},
    ],
    note:'📋 Bring passport + EP to all govt hospitals. Foreigners pay slightly more than citizens but still heavily subsidised. Govt A&E is free for emergencies.'
  },
  private: {
    title: 'Private Hospitals — With Medical Insurance',
    intro: 'Cashless admission with company/personal medical card. Without insurance, private hospitals are expensive.',
    items:[
      {n:'Pantai Hospital KL',loc:'Bangsar South',cost:'Cashless with card / RM 500–5,000+ without',for:'Full specialist, surgery, maternity, cancer'},
      {n:'KPJ Tawakkal KL',loc:'Jalan Pahang',cost:'Cashless with card',for:'Cardiology, orthopaedics, general surgery'},
      {n:'Columbia Asia Hospital',loc:'Setapak, Cheras, Bukit Jalil',cost:'Cashless with card',for:'General, maternity, paediatrics'},
      {n:'Sunway Medical Centre',loc:'Subang Jaya',cost:'Premium pricing',for:'Top tier — cardiac, oncology, neurology'},
      {n:'Gleneagles KL',loc:'Jalan Ampang',cost:'Premium pricing',for:'Expat favourite, all specialties, luxury'},
      {n:'Prince Court Medical Centre',loc:'Jalan Kia Peng',cost:'Very premium',for:'International standard, medical tourism'},
    ],
    note:'⚠️ Without medical insurance, private hospital specialist consultation alone = RM 200–500. One night stay = RM 1,000–5,000. Always have insurance first.'
  },
  specialist: {
    title: 'How to See a Specialist in Malaysia',
    intro: 'For any specialist (eye doctor, cardiologist, orthopaedic, etc.) — follow this path to save money and time.',
    steps:[
      {s:'1',t:'Go to panel/GP clinic first',d:'Get consultation + referral letter. Referral costs RM 0–10. Without referral, specialist fee is higher (RM 50+ more).'},
      {s:'2',t:'Choose govt vs private specialist',d:'Govt specialist: RM 5–15, long wait (weeks for appointment). Private specialist: RM 150–500, same week appointment. Medical card covers private.'},
      {s:'3',t:'Book specialist appointment',d:'Call or book online. Bring: referral letter, medical card, passport, existing medications, previous test results.'},
      {s:'4',t:'Specialist consultation',d:'Specialist may order blood tests, X-ray, scan. Lab: RM 50–300 at govt, RM 150–600 at private. Most covered by insurance.'},
      {s:'5',t:'Follow-up visits',d:'Specialist sets follow-up dates. Keep all prescriptions and reports for future reference.'},
    ],
    specialties:[
      {name:'Cardiologist (Heart)',hospital:'HKL govt / Sunway Medical',note:'Indians statistically at higher risk — annual heart check recommended after 35'},
      {name:'Gynaecologist / Maternity',hospital:'KPJ Tawakkal, Columbia Asia',note:'Indian female doctors available. Ask HR for gynaecologist referral.'},
      {name:'Dentist',hospital:'Govt dental clinic RM 1–5 / Private RM 50–300',note:'Dental NOT covered by most medical cards — separate dental rider needed'},
      {name:'Ophthalmologist (Eye)',hospital:'Tun Hussein Onn Eye Hospital (govt, specialists)',note:'Free or RM 5 for cataract, glaucoma etc at govt'},
      {name:'Paediatrician (Children)',hospital:'Panel hospital paediatric ward',note:'Company card covers children IF they are registered as dependents'},
    ],
  },
  tips: {
    title: '💡 Essential Medical Tips for Indians in Malaysia',
    tips:[
      '🏥 Day 1 at new job: ask HR for medical card, panel clinic list, and insurance policy details',
      '📱 Save emergency numbers: 999 (ambulance/police), Hospital KL: 03-2615 5555',
      '💊 Government pharmacy (farmasi hospital) sells same drugs at 10–20% of private pharmacy price',
      '🌡️ For fever/cough: go to panel clinic first — save insurance for hospitalization',
      '🦷 Dental is NOT covered by most medical cards — get dental rider (RM 20–50/month extra)',
      '📋 Always get receipts — medical expenses claimable as tax relief (RM 8,000/year)',
      '🇮🇳 Visiting India? Check if your Malaysian insurance covers overseas hospitalization',
      '💉 Hepatitis A & B, Typhoid vaccinations available at Klinik Kesihatan for free/subsidised',
      '🧾 Keep all hospital discharge summaries and doctor reports — useful for insurance renewals',
      '👶 Pregnancy: register at nearest Klinik Kesihatan for free antenatal checks. Private for delivery.',
    ]
  }
}

export default function HospitalGuide() {
  const [tab, setTab] = useState('panel')
  const d = DATA[tab]

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.emoji}>💊</span>
        <div>
          <h1 className={styles.title}>Hospitals & Clinics Guide</h1>
          <p className={styles.sub}>Panel clinics, govt hospitals, private specialists — for EP holders in Malaysia</p>
        </div>
      </div>
      <PrivacyNotice />
      <div className={styles.tabs}>
        {TABS.map(t => <button key={t.id} className={`${styles.tab} ${tab===t.id?styles.tabActive:''}`} onClick={()=>setTab(t.id)}>{t.label}</button>)}
      </div>
      <div className={styles.content} key={tab}>
        <h2 className={styles.contentTitle}>{d.title}</h2>
        {d.intro && <p className={styles.intro}>{d.intro}</p>}
        {d.items && (
          <>
            <div className={styles.itemGrid}>
              {d.items.map((item,i) => (
                <div key={i} className={styles.itemCard}>
                  <div className={styles.itemName}>{item.n}</div>
                  <div className={styles.itemLoc}>📍 {item.loc}</div>
                  <div className={styles.itemCost}>💰 {item.cost}</div>
                  <div className={styles.itemFor}>🏥 {item.for}</div>
                </div>
              ))}
            </div>
            {d.note && <div className={styles.note}>{d.note}</div>}
          </>
        )}
        {d.steps && (
          <div className={styles.steps}>
            {d.steps.map((s,i) => (
              <div key={i} className={styles.step}>
                <div className={styles.stepN}>{s.s}</div>
                <div><strong>{s.t}</strong><p>{s.d}</p></div>
              </div>
            ))}
            {d.specialties && (
              <div className={styles.specGrid}>
                {d.specialties.map((s,i) => (
                  <div key={i} className={styles.specCard}>
                    <div className={styles.specName}>{s.name}</div>
                    <div className={styles.specHosp}>{s.hospital}</div>
                    <div className={styles.specNote}>{s.note}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {d.tips && <div className={styles.tipsList}>{d.tips.map((t,i) => <div key={i} className={styles.tip}>{t}</div>)}</div>}
      </div>
    </div>
  )
}
