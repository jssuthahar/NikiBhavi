import { useState, useEffect } from 'react'
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'
import Ticker from './components/Ticker'
import {
  HomePage, VisaPage, EpassPage, TouristPage, StudentPage,
  HousingPage, BankPage, TransportPage, FoodPage, HealthPage,
  SimPage, MoneyPage, VideosPage, AboutPage,
  LivingCostPage, TaxCalcPage, TaxRefundPage,
  RemittancePage, SalaryPage, VisaTrackerPage, EPFPage,
  RentPage, HomeLoanPage, LeavePage, CostComparePage,
  EPEligPage, ProbationPage, SchoolFeesPage
} from './components/Pages'
import BuyMeCoffee from './components/BuyMeCoffee'
import { FollowToast } from './components/FollowBanner'
import styles from './App.module.css'

// ── Route map: URL slug <-> page id ──────────────────────────
const ROUTES = {
  '':               'home',
  'home':           'home',
  'visa':           'visa',
  'employee-pass':  'epass',
  'tourist-visa':   'tourist',
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
}

const PAGE_TO_SLUG = Object.fromEntries(
  Object.entries(ROUTES)
    .filter(([slug]) => slug !== '')
    .map(([slug, id]) => [id, slug])
)

const PAGE_MAP = {
  home:       HomePage,
  visa:       VisaPage,
  epass:      EpassPage,
  tourist:    TouristPage,
  student:    StudentPage,
  housing:    HousingPage,
  bank:       BankPage,
  transport:  TransportPage,
  food:       FoodPage,
  health:     HealthPage,
  sim:        SimPage,
  money:      MoneyPage,
  videos:     VideosPage,
  about:      AboutPage,
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
  probation:   ProbationPage,
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
  const [showToast,   setShowToast]   = useState(false)

  const navigate = (id) => {
    setActivePage(id)
    setHashUrl(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (window.innerWidth < 769) setSidebarOpen(false)
  }

  useEffect(() => {
    const onHashChange = () => {
      const page = getPageFromHash()
      setActivePage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    const page = getPageFromHash()
    setActivePage(page)
    setHashUrl(page)
  }, [])

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 769) setSidebarOpen(false) }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setShowToast(true), 30000)
    return () => clearTimeout(t)
  }, [])

  const ActivePage = PAGE_MAP[activePage] || HomePage

  return (
    <div className={styles.app}>
      <Topbar onMenuClick={() => setSidebarOpen(o => !o)} />
      {sidebarOpen && <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />}
      <Sidebar activePage={activePage} onNavigate={navigate} isOpen={sidebarOpen} />
      <main className={styles.main}>
        <Ticker />
        <div className={styles.wrap}>
          <ActivePage onNavigate={navigate} />
        </div>
      </main>
      <BuyMeCoffee />
      {showToast && <FollowToast />}
    </div>
  )
}
