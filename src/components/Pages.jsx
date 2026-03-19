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
import HomeHub       from './HomeHub'
import { TermsPage, PrivacyPage } from './TermsPrivacy'
import BudgetSim from './BudgetSim'
import StudentGuide  from './StudentGuide'
import JobSearch     from './JobSearch'
import FlightHub     from './FlightHub'
import DrivingLicence from './DrivingLicence'
import { BuyMeCoffeeCard } from './BuyMeCoffee'
import { FollowBanner } from './FollowBanner'
import ShareUrl from './ShareUrl'
import { AdBannerAuto, AdInArticle } from './AdUnit'
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

// ── Ad between tool and follow banner ─────────────────────────
function ToolFooter() {
  return (
    <>
      <AdBannerAuto />
      <FollowBanner />
      <AdInArticle />
      <BuyMeCoffeeCard />
    </>
  )
}

// ════════════════════════════════ HOME ════════════════════════
export function HomePage({ onNavigate }) {
  return (
    <PageWrapper id="home">
      <HomeHub onNavigate={onNavigate} />
      <AdBannerAuto />
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
      <AdBannerAuto />
      <TipBox {...p.tip} />
    </PageWrapper>
  )
}

// ═══════════════════════════ EMPLOYEE PASS ═══════════════════
export function EpassPage({ onNavigate }) {
  const p = PAGES.epass
  return (
    <PageWrapper id="epass">
      <div style={{
        background:'linear-gradient(135deg,#1a0800,#2a1000)',
        border:'2px solid #f59e0b',
        borderRadius:'20px',
        padding:'18px 22px',
        marginBottom:'16px',
        display:'flex',
        gap:'14px',
        alignItems:'flex-start'
      }}>
        <span style={{fontSize:'32px',flexShrink:0}}>⚠️</span>
        <div>
          <div style={{fontSize:'17px',fontWeight:900,color:'#fbbf24',marginBottom:'6px'}}>EP Salary Policy Update — Effective 1 June 2026</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:'6px',marginBottom:'8px'}}>
            {[['EP Category I','RM 20,000+'],['EP Category II','RM 10,000+'],['EP Category III','RM 5,000+'],['Mfg Sector III','RM 7,000+']].map(([cat,sal]) => (
              <div key={cat} style={{background:'rgba(255,255,255,.08)',borderRadius:'8px',padding:'6px 10px'}}>
                <div style={{fontSize:'10px',color:'rgba(255,255,255,.5)',marginBottom:'2px'}}>{cat}</div>
                <div style={{fontSize:'14px',fontWeight:900,color:'#fbbf24'}}>{sal}</div>
              </div>
            ))}
          </div>
          <div style={{fontSize:'12px',color:'rgba(255,255,255,.6)'}}>Applies to all new &amp; renewal applications from June 1, 2026.</div>
        </div>
      </div>
      <Hero
        hero={{ ...p.hero, actions: [{ href: CHANNEL.ytUrl, label: '▶ Watch Video Guide' }] }}
        onNavigate={onNavigate}
      />
      <SectionHeader title="Step-by-Step Process" sub="Follow these steps in order" />
      <StepsList steps={p.steps} />
      <AdBannerAuto />
      <SectionHeader title="Required Documents" />
      <CardsGrid>{p.cards.map((c, i) => <InfoCard key={i} {...c} />)}</CardsGrid>
      <AdInArticle />
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
            No eVisa. No fee. Just submit the free MDAC online 3 days before arrival. Valid until <strong style={{color:'#fff'}}>December 31, 2026</strong>.
          </div>
          <a href="https://imigresen-online.imi.gov.my/mdac/main" target="_blank" rel="noreferrer"
            style={{display:'inline-block',background:'#C9F53B',color:'#0d0d0d',fontWeight:900,fontSize:'13px',padding:'9px 20px',borderRadius:'20px',textDecoration:'none'}}>
            📱 Submit MDAC (Free) →
          </a>
        </div>
      </div>
      <div style={{
        background:'#fef2f2',border:'2px solid #fca5a5',borderRadius:'14px',
        padding:'14px 18px',marginBottom:'16px',fontSize:'13px',color:'#991b1b',lineHeight:'1.6'
      }}>
        <strong>⚠️ MDAC is MANDATORY even with visa-free entry.</strong> Submit at{' '}
        <a href="https://imigresen-online.imi.gov.my/mdac/main" target="_blank" rel="noreferrer" style={{color:'#991b1b',fontWeight:700}}>
          imigresen-online.imi.gov.my/mdac/main
        </a>. It is FREE.
      </div>
      <Hero hero={p.hero} onNavigate={onNavigate} />
      <AdBannerAuto />
      <SectionHeader title="How to Visit Malaysia in 2026 (Visa-Free)" sub="5 simple steps — no fee, no eVisa needed" />
      <StepsList steps={p.steps} />
      <CardsGrid>{p.cards.map((c, i) => <InfoCard key={i} {...c} />)}</CardsGrid>
      <AdInArticle />
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
      <AdBannerAuto />
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
      <AdBannerAuto />
      <SectionHeader title="Rental Tips" />
      <StepsList steps={p.steps} />
      <AdInArticle />
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
      <AdBannerAuto />
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
      <AdBannerAuto />
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
      <AdBannerAuto />
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
      <AdBannerAuto />
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
      <AdBannerAuto />
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
      <AdBannerAuto />
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
        hero={{ ...p.hero, actions: [{ href: CHANNEL.ytUrl, label: '▶ Subscribe Now' }] }}
        onNavigate={onNavigate}
      />
      <VideoList videos={p.videos} />
      <AdBannerAuto />
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
      <AdBannerAuto />
      <SubscribeCTA title="Stay Updated 🔔" sub="New guides posted every week — completely free" />
    </PageWrapper>
  )
}

// ═══════════════════════ LIVING COST ══════════════════════════
export function LivingCostPage({ onNavigate }) {
  return (
    <PageWrapper id="livingcost">
      <LivingCost />
      <AdBannerAuto />
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
      <AdBannerAuto />
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
      <AdBannerAuto />
      <FollowBanner />
      <BuyMeCoffeeCard />
    </PageWrapper>
  )
}

// ═══════════════════ TOOL PAGES (all get ad + follow + coffee) ═
export function RemittancePage()   { return <PageWrapper id="remittance"><RemittanceCalc /><ToolFooter /></PageWrapper> }
export function SalaryPage()       { return <PageWrapper id="salary"><SalaryCalc /><ToolFooter /></PageWrapper> }
export function VisaTrackerPage()  { return <PageWrapper id="visatrack"><VisaTracker /><ToolFooter /></PageWrapper> }
export function EPFPage()          { return <PageWrapper id="epf"><EPFCalc /><ToolFooter /></PageWrapper> }
export function RentPage()         { return <PageWrapper id="rent"><RentCalc /><ToolFooter /></PageWrapper> }
export function HomeLoanPage()     { return <PageWrapper id="homeloan"><HomeLoanCalc /><ToolFooter /></PageWrapper> }
export function LeavePage()        { return <PageWrapper id="leave"><LeavePlanner /><ToolFooter /></PageWrapper> }
export function CostComparePage()  { return <PageWrapper id="costcompare"><CostCompare /><ToolFooter /></PageWrapper> }
export function EPEligPage()       { return <PageWrapper id="epelig"><EPEligibility /><ToolFooter /></PageWrapper> }
export function ProbationPage()    { return <PageWrapper id="probation"><ProbationCalc /><ToolFooter /></PageWrapper> }
export function SchoolFeesPage()   { return <PageWrapper id="schoolfees"><SchoolFees /><ToolFooter /></PageWrapper> }
export function TouristPage()      { return <PageWrapper id="tourist-hub"><TouristHub /><ToolFooter /></PageWrapper> }
export function EPLifeGuidePage()  { return <PageWrapper id="eplifeguide"><EPLifeGuide /><ToolFooter /></PageWrapper> }
export function CarLoanPage()      { return <PageWrapper id="carloan"><CarLoanCalc /><ToolFooter /></PageWrapper> }
export function PCBCalcPage()      { return <PageWrapper id="pcb"><PCBCalc /><ToolFooter /></PageWrapper> }
export function MedicalCardPage()  { return <PageWrapper id="medcard"><MedicalCard /><ToolFooter /></PageWrapper> }
export function PRRoadmapPage()    { return <PageWrapper id="prroad"><PRRoadmap /><ToolFooter /></PageWrapper> }
export function ExpenseTrackerPage(){ return <PageWrapper id="expense"><ExpenseTracker /><ToolFooter /></PageWrapper> }
export function BuyCarGuidePage()  { return <PageWrapper id="buycar"><BuyCarGuide /><ToolFooter /></PageWrapper> }
export function HospitalGuidePage(){ return <PageWrapper id="hospital"><HospitalGuide /><ToolFooter /></PageWrapper> }
export function MovingChecklistPage(){ return <PageWrapper id="moving"><MovingChecklist /><ToolFooter /></PageWrapper> }
export function DependentPassPage(){ return <PageWrapper id="dp"><DependentPass /><ToolFooter /></PageWrapper> }
export function EPFWithdrawalPage(){ return <PageWrapper id="epfout"><EPFWithdrawal /><ToolFooter /></PageWrapper> }
export function StudentGuidePage() { return <PageWrapper id="studentguide"><StudentGuide /><ToolFooter /></PageWrapper> }
export function JobSearchPage()    { return <PageWrapper id="jobsearch"><JobSearch /><ToolFooter /></PageWrapper> }
export function FlightHubPage()      { return <PageWrapper id="flighthub"><FlightHub /><ToolFooter /></PageWrapper> }
export function BudgetSimPage()      { return <PageWrapper id="budget"><BudgetSim /><ToolFooter /></PageWrapper> }
export function DrivingLicencePage() { return <PageWrapper id="drivinglicence"><DrivingLicence /><ToolFooter /></PageWrapper> }
export function TermsPageFull()    { return <PageWrapper id="terms"><TermsPage /><BuyMeCoffeeCard /></PageWrapper> }
export function PrivacyPageFull()  { return <PageWrapper id="privacy"><PrivacyPage /><BuyMeCoffeeCard /></PageWrapper> }
