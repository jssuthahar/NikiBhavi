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
export function TouristPage({ onNavigate }) {
  const p = PAGES.tourist
  return (
    <PageWrapper id="tourist">
      <Hero hero={p.hero} onNavigate={onNavigate} />
      <SectionHeader title="Step-by-Step Process" />
      <StepsList steps={p.steps} />
      <CardsGrid>{p.cards.map((c, i) => <InfoCard key={i} {...c} />)}</CardsGrid>
      <TipBox {...p.tip} />
    </PageWrapper>
  )
}

// ══════════════════════════ STUDENT PASS ══════════════════════
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
