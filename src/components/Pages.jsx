import Hero from './Hero'
import {
  CardsGrid, InfoCard, StepsList, VideoList, TipBox,
  AdBanner, StatsRow, SectionHeader, SubscribeCTA,
  FeaturedVideo, TopicGrid, QuickLinks
} from './UI'
import LiveRates from './LiveRates'
import LivingCost from './LivingCost'
import TaxCalc from './TaxCalc'
import TaxRefund from './TaxRefund'
import RemittanceCalc  from './RemittanceCalc'
import SalaryCalc      from './SalaryCalc'
import VisaTracker     from './VisaTracker'
import EPFCalc         from './EPFCalc'
import RentCalc        from './RentCalc'
import HomeLoanCalc    from './HomeLoanCalc'
import LeavePlanner    from './LeavePlanner'
import CostCompare     from './CostCompare'
import EPEligibility   from './EPEligibility'
import ProbationCalc   from './ProbationCalc'
import SchoolFees      from './SchoolFees'
import TouristHub     from './TouristHub'
import EPLifeGuide    from './EPLifeGuide'
import CarLoanCalc    from './CarLoanCalc'
import PCBCalc        from './PCBCalc'
import MedicalCard    from './MedicalCard'
import PRRoadmap      from './PRRoadmap'
import ExpenseTracker from './ExpenseTracker'
import BuyCarGuide    from './BuyCarGuide'
import HospitalGuide  from './HospitalGuide'
import MovingChecklist from './MovingChecklist'
import DependentPass  from './DependentPass'
import EPFWithdrawal  from './EPFWithdrawal'
import { BuyMeCoffeeCard } from './BuyMeCoffee'
import { FollowBanner } from './FollowBanner'
import ShareUrl from './ShareUrl'
import { PAGES, TOPIC_CARDS, ALL_VIDEOS, CHANNEL } from '../data/content'
import styles from './Pages.module.css'

// ── Helper: wrap with animation + share bar ───────────────────
function PageWrapper({ id, children }) {
  return (
    <div key={id} className={styles.page}>
      <ShareUrl pageId={id} />
      {children}
    </div>
  )
}

// ════════════════════════════════ HOME ════════════════════════
export function HomePage({ onNavigate }) {
  const p = PAGES.home
  return (
    <PageWrapper id="home">
      <Hero
        hero={{
          ...p.hero,
          actions: [
            { href: CHANNEL.ytUrl, label: '▶ Watch Videos' },
            { page: 'epass', label: '💼 Employee Pass' },
          ]
        }}
        onNavigate={onNavigate}
      />
      <StatsRow stats={p.stats} />
      <SectionHeader title="📊 Live Rates" sub="Real-time currency & gold prices — updated every minute" />
      <LiveRates />
      <AdBanner {...p.ad} />
      <SectionHeader title="Browse All Topics" sub="Tap any topic to open the full guide" />
      <TopicGrid topics={TOPIC_CARDS} onNavigate={onNavigate} />
      <SectionHeader title="🔥 Most Watched Videos" sub="Top content from our channel" />
      <FeaturedVideo {...p.featuredVideo} />
      <VideoList videos={p.videos} />
      <BuyMeCoffeeCard />
      <FollowBanner />
      <SubscribeCTA title="Never Miss an Update 🔔" sub="Subscribe free — new guides & videos every week" />
    </PageWrapper>
  )
}

// ════════════════════════════════ VISA ════════════════════════
export function VisaPage({ onNavigate }) {
  const p = PAGES.visa
  return (
    <PageWrapper id="visa">
      <Hero hero={p.hero} onNavigate={onNavigate} />
      <QuickLinks links={p.quickLinks} onNavigate={onNavigate} />
      <SectionHeader title="Visa Types at a Glance" sub="Choose the right visa for your exact situation" />
      <CardsGrid>{p.cards.map((c, i) => <InfoCard key={i} {...c} />)}</CardsGrid>
      <TipBox {...p.tip} />
    </PageWrapper>
  )
}

// ═══════════════════════════ EMPLOYEE PASS ═══════════════════
export function EpassPage({ onNavigate }) {
  const p = PAGES.epass
  return (
    <PageWrapper id="epass">
      <Hero
        hero={{
          ...p.hero,
          actions: [{ href: CHANNEL.ytUrl, label: '▶ Watch Video Guide' }]
        }}
        onNavigate={onNavigate}
      />
      <SectionHeader title="Step-by-Step Process" sub="Follow these steps in order" />
      <StepsList steps={p.steps} />
      <AdBanner {...p.ad} />
      <SectionHeader title="Required Documents" />
      <CardsGrid>{p.cards.map((c, i) => <InfoCard key={i} {...c} />)}</CardsGrid>
      <TipBox {...p.tip} />
      <SectionHeader title="Related Videos" />
      <VideoList videos={p.videos} />
    </PageWrapper>
  )
}

// ══════════════════════════ TOURIST VISA ══════════════════════
export function TouristInfoPage({ onNavigate }) {
  const p = PAGES.tourist
  return (
    <PageWrapper id="tourist">
      {/* Visa-free breaking news banner */}
      <div style={{
        background:'linear-gradient(135deg,#0d2b00,#1a4a00)',
        border:'2px solid #C9F53B',
        borderRadius:'20px',
        padding:'20px 22px',
        marginBottom:'16px',
        display:'flex',
        gap:'14px',
        alignItems:'center'
      }}>
        <span style={{fontSize:'42px',flexShrink:0}}>🎉</span>
        <div>
          <div style={{fontSize:'20px',fontWeight:900,color:'#C9F53B',marginBottom:'5px'}}>Indians are VISA-FREE for Malaysia!</div>
          <div style={{fontSize:'13px',color:'rgba(255,255,255,.75)',lineHeight:'1.55',marginBottom:'10px'}}>
            No eVisa. No fee. Just submit the free MDAC online 3 days before arrival. Valid until <strong style={{color:'#fff'}}>December 31, 2026</strong> — Visit Malaysia 2026 campaign.
          </div>
          <a
            href="https://imigresen-online.imi.gov.my/mdac/main"
            target="_blank"
            rel="noreferrer"
            style={{display:'inline-block',background:'#C9F53B',color:'#0d0d0d',fontWeight:900,fontSize:'13px',padding:'9px 20px',borderRadius:'20px',textDecoration:'none'}}
          >
            📱 Submit MDAC (Free) →
          </a>
        </div>
      </div>

      {/* MDAC mandatory warning */}
      <div style={{
        background:'#fef2f2',border:'2px solid #fca5a5',borderRadius:'14px',
        padding:'14px 18px',marginBottom:'16px',fontSize:'13px',color:'#991b1b',lineHeight:'1.6'
      }}>
        <strong>⚠️ MDAC is MANDATORY even with visa-free entry.</strong> Malaysia Digital Arrival Card must be submitted online at least 3 days before arrival at{' '}
        <a href="https://imigresen-online.imi.gov.my/mdac/main" target="_blank" rel="noreferrer" style={{color:'#991b1b',fontWeight:700}}>
          imigresen-online.imi.gov.my/mdac/main
        </a>. Airlines may deny boarding without MDAC confirmation. It is FREE.
      </div>

      <Hero hero={p.hero} onNavigate={onNavigate} />
      <SectionHeader title="How to Visit Malaysia in 2026 (Visa-Free)" sub="5 simple steps — no fee, no eVisa needed" />
      <StepsList steps={p.steps} />
      <CardsGrid>{p.cards.map((c, i) => <InfoCard key={i} {...c} />)}</CardsGrid>
      <TipBox {...p.tip} />
    </PageWrapper>
  )
}


export function StudentPage({ onNavigate }) {
  const p = PAGES.student
  return (
    <PageWrapper id="student">
      <Hero hero={p.hero} onNavigate={onNavigate} />
      <CardsGrid>{p.cards.map((c, i) => <InfoCard key={i} {...c} />)}</CardsGrid>
      <TipBox {...p.tip} />
    </PageWrapper>
  )
}

// ════════════════════════════ HOUSING ═════════════════════════
export function HousingPage({ onNavigate }) {
  const p = PAGES.housing
  return (
    <PageWrapper id="housing">
      <Hero hero={p.hero} onNavigate={onNavigate} />
      <SectionHeader title="Best Areas for Indians in KL" />
      <CardsGrid>{p.cards.map((c, i) => <InfoCard key={i} {...c} />)}</CardsGrid>
      <AdBanner {...p.ad} />
      <SectionHeader title="Rental Tips" />
      <StepsList steps={p.steps} />
      <TipBox {...p.tip} />
    </PageWrapper>
  )
}

// ══════════════════════════ BANK ACCOUNT ══════════════════════
export function BankPage({ onNavigate }) {
  const p = PAGES.bank
  return (
    <PageWrapper id="bank">
      <Hero hero={p.hero} onNavigate={onNavigate} />
      <CardsGrid>{p.cards.map((c, i) => <InfoCard key={i} {...c} />)}</CardsGrid>
      <SectionHeader title="Documents Required" />
      <StepsList steps={p.steps} />
      <TipBox {...p.tip} />
    </PageWrapper>
  )
}

// ═══════════════════════════ TRANSPORT ════════════════════════
export function TransportPage({ onNavigate }) {
  const p = PAGES.transport
  return (
    <PageWrapper id="transport">
      <Hero hero={p.hero} onNavigate={onNavigate} />
      <CardsGrid>{p.cards.map((c, i) => <InfoCard key={i} {...c} />)}</CardsGrid>
      <TipBox {...p.tip} />
    </PageWrapper>
  )
}

// ════════════════════════════ FOOD ════════════════════════════
export function FoodPage({ onNavigate }) {
  const p = PAGES.food
  return (
    <PageWrapper id="food">
      <Hero hero={p.hero} onNavigate={onNavigate} />
      <CardsGrid>{p.cards.map((c, i) => <InfoCard key={i} {...c} />)}</CardsGrid>
      <TipBox {...p.tip} />
    </PageWrapper>
  )
}

// ════════════════════════════ HEALTH ══════════════════════════
export function HealthPage({ onNavigate }) {
  const p = PAGES.health
  return (
    <PageWrapper id="health">
      <Hero hero={p.hero} onNavigate={onNavigate} />
      <CardsGrid>{p.cards.map((c, i) => <InfoCard key={i} {...c} />)}</CardsGrid>
      <AdBanner {...p.ad} />
      <TipBox {...p.tip} />
    </PageWrapper>
  )
}

// ══════════════════════════════ SIM ═══════════════════════════
export function SimPage({ onNavigate }) {
  const p = PAGES.sim
  return (
    <PageWrapper id="sim">
      <Hero hero={p.hero} onNavigate={onNavigate} />
      <CardsGrid>{p.cards.map((c, i) => <InfoCard key={i} {...c} />)}</CardsGrid>
      <TipBox {...p.tip} />
    </PageWrapper>
  )
}

// ═══════════════════════════ MONEY ════════════════════════════
export function MoneyPage({ onNavigate }) {
  const p = PAGES.money
  return (
    <PageWrapper id="money">
      <Hero hero={p.hero} onNavigate={onNavigate} />
      <CardsGrid>{p.cards.map((c, i) => <InfoCard key={i} {...c} />)}</CardsGrid>
      <TipBox {...p.tip} />
    </PageWrapper>
  )
}

// ══════════════════════════ VIDEOS ════════════════════════════
export function VideosPage({ onNavigate }) {
  const p = PAGES.videos
  return (
    <PageWrapper id="videos">
      <Hero
        hero={{
          ...p.hero,
          actions: [{ href: CHANNEL.ytUrl, label: '▶ Subscribe Now' }]
        }}
        onNavigate={onNavigate}
      />
      <VideoList videos={p.videos} />
      <SubscribeCTA title="Join 10,000+ Indians 🙌" sub="Subscribe free — new guides every week" />
    </PageWrapper>
  )
}

// ════════════════════════════ ABOUT ═══════════════════════════
export function AboutPage({ onNavigate }) {
  const p = PAGES.about
  return (
    <PageWrapper id="about">
      <Hero hero={p.hero} onNavigate={onNavigate} />

      <div className={styles.aboutCard}>
        <div className={styles.aboutAvatar}>🧑‍💻</div>
        <div className={styles.aboutInfo}>
          <h2>NikiBhavi Channel</h2>
          <p>
            We are Indians living in Malaysia, sharing real experiences about Employee Pass, Tourist Visa,
            Jobs, Food, Housing, and everyday life. Every guide covers real documents, real processes,
            and practical tips — no misinformation, no paid promotions. Just honest guidance. 🙏
          </p>
          <div className={styles.aboutBtns}>
            <a href={CHANNEL.ytUrl} target="_blank" rel="noreferrer" className={styles.ytBtn}>▶ Subscribe on YouTube</a>
            <a href={CHANNEL.igUrl} target="_blank" rel="noreferrer" className={styles.igBtn}>📸 Follow on Instagram</a>
          </div>
        </div>
      </div>

      <CardsGrid>{p.cards.map((c, i) => <InfoCard key={i} {...c} />)}</CardsGrid>
      <SubscribeCTA title="Stay Updated 🔔" sub="New guides posted every week — completely free" />
    </PageWrapper>
  )
}

// ═══════════════════════ LIVING COST ══════════════════════════
export function LivingCostPage({ onNavigate }) {
  return (
    <PageWrapper id="livingcost">
      <LivingCost />
      <FollowBanner />
      <BuyMeCoffeeCard />
    </PageWrapper>
  )
}

// ══════════════════════ TAX CALCULATOR ════════════════════════
export function TaxCalcPage({ onNavigate }) {
  return (
    <PageWrapper id="taxcalc">
      <TaxCalc />
      <FollowBanner />
      <BuyMeCoffeeCard />
    </PageWrapper>
  )
}

// ═══════════════════ TAX REFUND CALCULATOR ════════════════════
export function TaxRefundPage({ onNavigate }) {
  return (
    <PageWrapper id="taxrefund">
      <TaxRefund />
      <FollowBanner />
      <BuyMeCoffeeCard />
    </PageWrapper>
  )
}

// ═══════════════════ NEW TOOLS ════════════════════════════════
export function RemittancePage()  { return <PageWrapper id="remittance"><RemittanceCalc /><FollowBanner /><BuyMeCoffeeCard /></PageWrapper> }
export function SalaryPage()      { return <PageWrapper id="salary"><SalaryCalc /><FollowBanner /><BuyMeCoffeeCard /></PageWrapper> }
export function VisaTrackerPage() { return <PageWrapper id="visatrack"><VisaTracker /><FollowBanner /><BuyMeCoffeeCard /></PageWrapper> }
export function EPFPage()         { return <PageWrapper id="epf"><EPFCalc /><FollowBanner /><BuyMeCoffeeCard /></PageWrapper> }
export function RentPage()        { return <PageWrapper id="rent"><RentCalc /><FollowBanner /><BuyMeCoffeeCard /></PageWrapper> }
export function HomeLoanPage()    { return <PageWrapper id="homeloan"><HomeLoanCalc /><FollowBanner /><BuyMeCoffeeCard /></PageWrapper> }
export function LeavePage()       { return <PageWrapper id="leave"><LeavePlanner /><FollowBanner /><BuyMeCoffeeCard /></PageWrapper> }
export function CostComparePage() { return <PageWrapper id="costcompare"><CostCompare /><FollowBanner /><BuyMeCoffeeCard /></PageWrapper> }
export function EPEligPage()      { return <PageWrapper id="epelig"><EPEligibility /><FollowBanner /><BuyMeCoffeeCard /></PageWrapper> }
export function ProbationPage()   { return <PageWrapper id="probation"><ProbationCalc /><FollowBanner /><BuyMeCoffeeCard /></PageWrapper> }
export function SchoolFeesPage()  { return <PageWrapper id="schoolfees"><SchoolFees /><FollowBanner /><BuyMeCoffeeCard /></PageWrapper> }

export function TouristPage()     { return <PageWrapper id="tourist-hub"><TouristHub /><FollowBanner /><BuyMeCoffeeCard /></PageWrapper> }
export function EPLifeGuidePage() { return <PageWrapper id="eplifeguide"><EPLifeGuide /><FollowBanner /><BuyMeCoffeeCard /></PageWrapper> }
export function CarLoanPage()       { return <PageWrapper id="carloan"><CarLoanCalc /><FollowBanner /><BuyMeCoffeeCard /></PageWrapper> }
export function PCBCalcPage()       { return <PageWrapper id="pcb"><PCBCalc /><FollowBanner /><BuyMeCoffeeCard /></PageWrapper> }
export function MedicalCardPage()   { return <PageWrapper id="medcard"><MedicalCard /><FollowBanner /><BuyMeCoffeeCard /></PageWrapper> }
export function PRRoadmapPage()     { return <PageWrapper id="prroad"><PRRoadmap /><FollowBanner /><BuyMeCoffeeCard /></PageWrapper> }
export function ExpenseTrackerPage(){ return <PageWrapper id="expense"><ExpenseTracker /><FollowBanner /><BuyMeCoffeeCard /></PageWrapper> }
export function BuyCarGuidePage()   { return <PageWrapper id="buycar"><BuyCarGuide /><FollowBanner /><BuyMeCoffeeCard /></PageWrapper> }
export function HospitalGuidePage() { return <PageWrapper id="hospital"><HospitalGuide /><FollowBanner /><BuyMeCoffeeCard /></PageWrapper> }
export function MovingChecklistPage(){ return <PageWrapper id="moving"><MovingChecklist /><FollowBanner /><BuyMeCoffeeCard /></PageWrapper> }
export function DependentPassPage() { return <PageWrapper id="dp"><DependentPass /><FollowBanner /><BuyMeCoffeeCard /></PageWrapper> }
export function EPFWithdrawalPage() { return <PageWrapper id="epfout"><EPFWithdrawal /><FollowBanner /><BuyMeCoffeeCard /></PageWrapper> }
