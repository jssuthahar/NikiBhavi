import { useState, useEffect } from 'react'
import TopNav from './components/TopNav'
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'
import BottomNav from './components/BottomNav'
import NikiBot from './components/NikiBot'
import SiteFooter from './components/SiteFooter'
import {
  HomePage, VisaPage, EpassPage, TouristPage, TouristInfoPage, StudentPage,
  HousingPage, BankPage, TransportPage, FoodPage, HealthPage,
  SimPage, MoneyPage, VideosPage, AboutPage,
  LivingCostPage, TaxCalcPage, TaxRefundPage,
  RemittancePage, SalaryPage, VisaTrackerPage, EPFPage,
  RentPage, HomeLoanPage, LeavePage, CostComparePage,
  EPEligPage, ProbationPage, SchoolFeesPage,
  EPLifeGuidePage,
  CarLoanPage, PCBCalcPage, MedicalCardPage, PRRoadmapPage, ExpenseTrackerPage,
  BuyCarGuidePage, HospitalGuidePage, MovingChecklistPage, DependentPassPage, EPFWithdrawalPage,
  StudentGuidePage, JobSearchPage, FlightHubPage,
  DrivingLicencePage,
  TermsPageFull, PrivacyPageFull,
  BudgetSimPage
} from './components/Pages'
import BuyMeCoffee from './components/BuyMeCoffee'
import { FollowToast } from './components/FollowBanner'
import styles from './App.module.css'

const ROUTES = {
  '':               'home',
  'home':           'home',
  'visa':           'visa',
  'employee-pass':  'epass',
  'tourist-visa':   'touristinfo',
  'tourist-hub':    'tourist',
  'tourist-info':   'touristinfo',
  'student-visa':   'student',
  'housing':        'housing',
  'banking':        'bank',
  'transport':      'transport',
  'food':           'food',
  'health':         'health',
  'sim-card':       'sim',
  'money-transfer': 'money',
  'videos':         'videos',
  'about':          'about',
  'living-cost':    'livingcost',
  'tax-residency':  'taxcalc',
  'tax-refund':     'taxrefund',
  'remittance':     'remittance',
  'salary':         'salary',
  'visa-tracker':   'visatrack',
  'epf':            'epf',
  'rent':           'rent',
  'home-loan':      'homeloan',
  'leave':          'leave',
  'cost-compare':   'costcompare',
  'ep-eligibility': 'epelig',
  'probation':      'probation',
  'school-fees':    'schoolfees',
  'ep-life-guide':  'eplifeguide',
  'car-loan':       'carloan',
  'pcb':            'pcb',
  'medical-card':   'medcard',
  'pr-roadmap':     'prroad',
  'expense':        'expense',
  'buy-car':        'buycar',
  'hospital':       'hospital',
  'moving':         'moving',
  'dependent-pass': 'dp',
  'epf-withdrawal': 'epfout',
  'student-guide':  'studentguide',
  'job-search':     'jobsearch',
  'flight-hub':     'flighthub',
  'budget':         'budget',
  'driving-licence':'drivinglicence',
  'terms':          'terms',
  'privacy':        'privacy',
}

const PAGE_TO_SLUG = Object.fromEntries(
  Object.entries(ROUTES)
    .filter(([slug]) => slug !== '')
    .map(([slug, id]) => [id, slug])
)

const PAGE_MAP = {
  home:        HomePage,
  visa:        VisaPage,
  epass:       EpassPage,
  tourist:     TouristPage,
  touristinfo: TouristInfoPage,
  student:     StudentPage,
  housing:     HousingPage,
  bank:        BankPage,
  transport:   TransportPage,
  food:        FoodPage,
  health:      HealthPage,
  sim:         SimPage,
  money:       MoneyPage,
  videos:      VideosPage,
  about:       AboutPage,
  livingcost:  LivingCostPage,
  taxcalc:     TaxCalcPage,
  taxrefund:   TaxRefundPage,
  remittance:  RemittancePage,
  salary:      SalaryPage,
  visatrack:   VisaTrackerPage,
  epf:         EPFPage,
  rent:        RentPage,
  homeloan:    HomeLoanPage,
  leave:       LeavePage,
  costcompare: CostComparePage,
  epelig:      EPEligPage,
  eplifeguide: EPLifeGuidePage,
  carloan:     CarLoanPage,
  pcb:         PCBCalcPage,
  medcard:     MedicalCardPage,
  prroad:      PRRoadmapPage,
  expense:     ExpenseTrackerPage,
  buycar:      BuyCarGuidePage,
  hospital:    HospitalGuidePage,
  moving:      MovingChecklistPage,
  dp:          DependentPassPage,
  epfout:      EPFWithdrawalPage,
  studentguide: StudentGuidePage,
  jobsearch:   JobSearchPage,
  flighthub:   FlightHubPage,
  probation:   ProbationPage,
  budget:      BudgetSimPage,
  drivinglicence: DrivingLicencePage,
  terms:       TermsPageFull,
  privacy:     PrivacyPageFull,
  schoolfees:  SchoolFeesPage,
}

function getPageFromHash() {
  const hash = window.location.hash.replace('#/', '').replace('#', '').split('?')[0].trim()
  return ROUTES[hash] || 'home'
}
function setHashUrl(pageId) {
  const slug = PAGE_TO_SLUG[pageId] || 'home'
  window.history.replaceState(null, '', '#/' + slug)
}

export default function App() {
  const [activePage,  setActivePage]  = useState(getPageFromHash)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [chatOpen,    setChatOpen]    = useState(false)
  const [showToast,   setShowToast]   = useState(false)

  const navigate = (id) => {
    setActivePage(id)
    setHashUrl(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (window.innerWidth < 769) setSidebarOpen(false)
  }

  useEffect(() => {
    const fn = () => { const p = getPageFromHash(); setActivePage(p); window.scrollTo({top:0,behavior:'smooth'}) }
    window.addEventListener('hashchange', fn)
    return () => window.removeEventListener('hashchange', fn)
  }, [])

  useEffect(() => {
    const p = getPageFromHash(); setActivePage(p); setHashUrl(p)
  }, [])

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 769) setSidebarOpen(false) }
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setShowToast(true), 40000)
    return () => clearTimeout(t)
  }, [])

  const ActivePage = PAGE_MAP[activePage] || HomePage

  return (
    <div className={styles.app}>
      <TopNav />
      <Topbar
        onMenuClick={() => setSidebarOpen(o => !o)}
        onNavigate={navigate}
        activePage={activePage}
        onChatOpen={() => setChatOpen(true)}
      />
      {sidebarOpen && <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />}
      <Sidebar activePage={activePage} onNavigate={navigate} isOpen={sidebarOpen} />

      <main className={styles.main}>
        <div className={styles.wrap}>
          <ActivePage onNavigate={navigate} />
          <SiteFooter onNavigate={navigate} />
        </div>
      </main>

      <BottomNav activePage={activePage} onNavigate={navigate} />

      {/* Floating chat button — mobile only */}
      {!chatOpen && (
        <button className={styles.fab} onClick={() => setChatOpen(true)}>
          🤖
        </button>
      )}

      <NikiBot
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        onNavigate={(id) => { navigate(id); setChatOpen(false) }}
      />

      <BuyMeCoffee />
      {showToast && <FollowToast />}
    </div>
  )
}
