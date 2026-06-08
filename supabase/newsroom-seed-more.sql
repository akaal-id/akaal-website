-- Run in Supabase → SQL Editor after newsroom.sql
-- Adds 10 more mock newsroom articles (skips if slug already exists)

insert into public.newsroom (slug, image, header_text, category, paragraph_text, created_at)
select * from (values
  (
    'akaal-wins-regional-design-award',
    '/images/lab.png',
    'AKAAL Creative Wins Regional Design Award for Financial Services Rebrand',
    'PRESS',
    $html$<p>AKAAL Creative has been named winner of the APAC Financial Brand Design Award for its comprehensive identity programme delivered for a leading institutional banking group. The jury cited exceptional craft in typography systems, regulatory-compliant template libraries, and a migration strategy that preserved decades of brand equity while modernising every client-facing touchpoint.</p>
<h2>Award criteria and jury feedback</h2>
<p>Entries were evaluated across strategic clarity, executional consistency, and measurable business impact. AKAAL's submission documented a thirty-one percent lift in brand recognition among institutional audiences within six months of rollout, supported by independent tracking studies commissioned by the client.</p>
<p>Jurors highlighted the programme's documentation layer: a living design system with coded tokens, Figma libraries, and CMS components that allowed internal teams to ship compliant materials without bottlenecking through a central studio.</p>
<blockquote>"This wasn't a cosmetic refresh. AKAAL proved that rigorous systems design can coexist with emotional resonance in a category that rarely rewards either."</blockquote>
<h3>What the programme included</h3>
<ul>
<li>Masterbrand architecture across retail, private banking, and asset management divisions</li>
<li>Motion principles for investor presentations and earnings broadcasts</li>
<li>Accessibility-first colour and type scales validated to WCAG 2.2 AA</li>
<li>Change-management workshops for four hundred internal stakeholders</li>
</ul>
<p>The award reinforces AKAAL Creative's position as a partner of choice for regulated industries navigating complex stakeholder environments. Case study materials will be published in the newsroom following client approval.</p>$html$,
    '2025-10-14T10:00:00+00:00'::timestamptz
  ),
  (
    'meridian-hospitality-digital-transformation',
    '/images/lab.png',
    'Meridian Hospitality Group: A Digital Transformation Case Study',
    'CASE STUDY',
    $html$<p>Meridian Hospitality Group engaged AKAAL to unify a fragmented digital estate spanning forty-two properties, twelve booking engines, and legacy content tools that had accreted over fifteen years of acquisitions. The mandate: one coherent guest experience without a disruptive rip-and-replace that would freeze marketing during peak season.</p>
<h2>Phased migration strategy</h2>
<p>Rather than a single cutover, AKAAL Labs architected a strangler-fig pattern—routing property pages incrementally to a headless CMS while preserving existing reservation deep links. Each wave migrated five to seven properties with rollback paths tested in staging environments mirrored from production traffic patterns.</p>
<p>Creative teams parallel-tracked a component library mapped to hospitality-specific patterns: room galleries, amenity grids, loyalty programme modules, and event venue configurators. Every component shipped with performance budgets enforced in CI.</p>
<h3>Results after twelve months</h3>
<ol>
<li>Average page load time reduced from 4.2s to 1.6s on mobile</li>
<li>Organic search impressions up forty-eight percent across APAC properties</li>
<li>Content publishing cadence increased from bi-weekly to daily for flagship resorts</li>
<li>Single sign-on for three hundred marketers across regional teams</li>
</ol>
<blockquote>"AKAAL treated our operational constraints as design requirements, not obstacles. That mindset difference is why the programme succeeded where two prior attempts had stalled."</blockquote>
<p>The case study illustrates how enterprise hospitality groups can modernise incrementally while maintaining brand distinctiveness at the property level within a shared technical foundation.</p>$html$,
    '2025-09-28T15:30:00+00:00'::timestamptz
  ),
  (
    'akaal-design-system-3-release',
    '/images/lab.png',
    'AKAAL Ships Design System 3.0 with Token Sync and Figma Code Connect',
    'PRODUCT',
    $html$<p>AKAAL Labs today released Design System 3.0, a major update to its open-core component framework used by internal product teams and select enterprise clients. The release introduces bidirectional token synchronisation between Figma variables and CSS custom properties, plus first-class Code Connect templates for React and Next.js implementations.</p>
<h2>What's new in version 3.0</h2>
<p>Design System 3.0 addresses the drift problem that plagues most multi-disciplinary organisations: designers update tokens in Figma, engineers miss the change, and production UI slowly diverges from the source of truth. The new sync CLI watches designated Figma files and generates pull requests against consuming repositories when semantic tokens change.</p>
<p>Component coverage expanded to sixty-four primitives and patterns, including data tables, filter bars, modal stacks, and editorial layouts tuned for marketing sites. Each component documents interaction states, keyboard behaviour, and responsive breakpoints in Storybook with visual regression baselines.</p>
<h3>Developer experience improvements</h3>
<ul>
<li>Tree-shakeable ESM bundles with per-component entry points</li>
<li>Automated contrast checking in CI for theme variants</li>
<li>Migration codemods from Design System 2.x</li>
<li>Edge-compatible CSS with zero runtime JS for static routes</li>
</ul>
<p>Existing clients on enterprise support plans receive guided migration workshops. Documentation, changelog, and upgrade guides are available on the AKAAL developer portal starting today.</p>$html$,
    '2025-08-12T09:00:00+00:00'::timestamptz
  ),
  (
    'akaal-partners-with-university-design-program',
    '/images/lab.png',
    'AKAAL Partners with Leading University on Emerging Creators Programme',
    'PRESS',
    $html$<p>AKAAL has announced a three-year partnership with a top-ranked design university to sponsor the Emerging Creators Programme, an initiative providing mentorship, studio placements, and production grants to students from underrepresented backgrounds pursuing careers in digital design and moving image.</p>
<h2>Programme structure</h2>
<p>Each academic year, twenty fellows receive structured mentorship from AKAAL Creative and Studio practitioners, access to production facilities during thesis projects, and a paid summer residency in either Singapore or Sydney. Fellows retain IP rights to personal work while collaborating on pro-bono campaigns for registered nonprofits nominated by the cohort.</p>
<p>The partnership also funds an annual lecture series open to the public, featuring conversations between AKAAL leadership and visiting creatives working at the intersection of technology, culture, and commerce.</p>
<blockquote>"Talent is evenly distributed; opportunity is not. This programme is one way we invest in the ecosystems that will define the next decade of creative work in our region."</blockquote>
<p>Applications for the inaugural cohort open in September. University faculty and AKAAL will co-chair the selection committee. Media enquiries and partnership extensions should be directed to the corporate communications desk.</p>$html$,
    '2025-07-22T11:00:00+00:00'::timestamptz
  ),
  (
    'northline-retail-omnichannel-case-study',
    '/images/lab.png',
    'How Northline Retail Built an Omnichannel Experience in Eight Months',
    'CASE STUDY',
    $html$<p>Northline Retail, a mid-market fashion group with two hundred stores across Southeast Asia, partnered with AKAAL to replace a patchwork of e-commerce plugins and static lookbooks with a unified omnichannel experience connecting inventory, loyalty, and editorial content.</p>
<h2>Connecting stores and screens</h2>
<p>The programme began with service blueprinting workshops in Jakarta, Bangkok, and Manila. Store associates, visual merchandisers, and digital marketers mapped customer journeys that crossed app notifications, in-store QR experiences, and post-purchase editorial—surfacing forty-three friction points in the first week alone.</p>
<p>AKAAL Creative led seasonal campaign systems while AKAAL Labs implemented real-time inventory visibility and client-side personalisation based on loyalty tier and browsing history. Studio produced modular video templates enabling regional teams to localise hero content without reshooting.</p>
<h3>Measured outcomes</h3>
<ul>
<li>Online conversion rate up nineteen percent within two quarters</li>
<li>Click-and-collect adoption grew from eight to thirty-four percent of digital orders</li>
<li>Content production costs per campaign dropped twenty-seven percent year-over-year</li>
<li>Employee NPS for internal tools improved from 12 to 41</li>
</ul>
<p>Northline's leadership credited cross-practice integration as the decisive factor—one partner accountable for strategy, experience design, engineering, and content production rather than four vendors passing deliverables over a wall.</p>$html$,
    '2025-06-05T14:00:00+00:00'::timestamptz
  ),
  (
    'akaal-analytics-dashboard-launch',
    '/images/lab.png',
    'AKAAL Labs Launches Unified Analytics Dashboard for Marketing Teams',
    'PRODUCT',
    $html$<p>AKAAL Labs has introduced a Unified Analytics Dashboard that aggregates web performance, campaign attribution, content engagement, and experiment results into a single interface designed for marketing leaders who previously juggled six disconnected tools to answer basic questions about ROI.</p>
<h2>One view across the stack</h2>
<p>The dashboard connects natively to the AKAAL Digital Experience Platform, Google Analytics 4, major ad platforms, and email service providers through a normalised metrics layer. Users define custom KPI groups—awareness, consideration, conversion—and drill from executive summaries to page-level diagnostics without exporting CSVs.</p>
<p>Built-in anomaly detection flags sudden drops in Core Web Vitals, conversion rate, or publish throughput, routing alerts to Slack or Microsoft Teams channels configured per workspace.</p>
<h3>Privacy and governance</h3>
<p>Role-based access mirrors CMS permissions: regional editors see property-level data, global administrators see portfolio rollups, and agency partners receive scoped views with time-limited tokens. All data processing adheres to configurable retention policies suitable for GDPR and regional APAC requirements.</p>
<blockquote>"We finally have a morning dashboard our CMO actually opens—because it answers her questions in under sixty seconds instead of sending her to three tabs and a BI tool nobody remembered how to use."</blockquote>
<p>The Unified Analytics Dashboard is included in Enterprise DXP tiers and available as an add-on for Labs platform customers. A fourteen-day trial is available for qualified accounts.</p>$html$,
    '2025-05-18T08:30:00+00:00'::timestamptz
  ),
  (
    'akaal-sustainability-report-2025',
    '/images/lab.png',
    'AKAAL Publishes 2025 Sustainability Report Highlighting Studio Operations',
    'PRESS',
    $html$<p>AKAAL has released its 2025 Sustainability Report, detailing progress across energy use, supply chain transparency, and community investment programmes. The report marks the first year of third-party assurance for Scope 1 and Scope 2 emissions across Studio facilities in Singapore, Sydney, and Jakarta.</p>
<h2>Key highlights</h2>
<p>Studio operations reduced per-project energy intensity by eighteen percent through LED volume adoption, cloud-based review workflows that cut physical shipping of drives, and a render-farm scheduling system that prioritises off-peak renewable windows where grid data is available.</p>
<p>The company committed to publishing embodied carbon estimates for major set builds starting in 2026, working with materials suppliers to standardise reporting formats that creative producers can understand without specialised sustainability training.</p>
<h3>Community and workforce</h3>
<ul>
<li>Four hundred mentorship hours delivered through the Emerging Creators Programme</li>
<li>Pro-bono production valued at USD 1.2M for registered nonprofits</li>
<li>Forty-one percent of leadership roles held by women across APAC practices</li>
<li>Mental health and burnout prevention training mandatory for all production leads</li>
</ul>
<p>The full report is available for download on the AKAAL corporate site. Journalists may request executive interviews through the press contact listed in the media kit.</p>$html$,
    '2025-04-30T10:00:00+00:00'::timestamptz
  ),
  (
    'volt-energy-brand-platform-case-study',
    '/images/lab.png',
    'Volt Energy: Building a Brand Platform for the Transition Economy',
    'CASE STUDY',
    $html$<p>Volt Energy, a renewable infrastructure developer expanding across ASEAN, engaged AKAAL to create a brand platform capable of speaking to governments, institutional investors, and local communities—audiences with sharply different expectations and vocabularies.</p>
<h2>Platform thinking beyond a logo</h2>
<p>AKAAL Creative developed a narrative architecture organised around three proof pillars: engineering rigour, community partnership, and long-horizon stewardship. Each pillar mapped to content types, spokesperson guidelines, and visual motifs that could flex from technical whitepapers to town-hall presentations without feeling like different brands.</p>
<p>Studio produced a flagship documentary-style film shot across three project sites, while Labs delivered a bilingual website with interactive project maps fed by a headless CMS integrated with Volt's investor relations data room.</p>
<blockquote>"Investors told us the new platform made complex projects legible for the first time. Communities told us they finally felt seen in how we presented local impact. That dual validation is rare."</blockquote>
<h3>Rollout metrics</h3>
<ol>
<li>RFP win rate increased twenty-three percent in the six months post-launch</li>
<li>Media sentiment analysis shifted from neutral to positive in four of five markets</li>
<li>Recruiting inbound applications up sixty percent for engineering roles</li>
</ol>
<p>The Volt Energy engagement demonstrates how B2B infrastructure companies can compete for attention and trust using editorial craft typically reserved for consumer brands.</p>$html$,
    '2025-03-15T13:00:00+00:00'::timestamptz
  ),
  (
    'akaal-edge-cdn-expansion',
    '/images/lab.png',
    'AKAAL Expands Edge CDN Footprint Across Southeast Asia and Oceania',
    'PRODUCT',
    $html$<p>AKAAL Labs has expanded its edge content delivery network with new points of presence in Ho Chi Minh City, Manila, Auckland, and Perth, reducing median time-to-first-byte for platform customers serving audiences across Southeast Asia and Oceania.</p>
<h2>Performance at the edge</h2>
<p>The expansion integrates with AKAAL's automatic image optimisation pipeline, generating responsive variants at the edge and caching them with cache keys derived from device class and accepted formats. Customers report Lighthouse performance score improvements averaging eleven points on content-heavy marketing pages after enabling the new regions.</p>
<p>Operations teams gain regional failover: if a PoP degrades, traffic reroutes automatically with health checks surfaced in the platform status dashboard. Incident history and post-mortems publish to a public status page with SLA credit automation for enterprise contracts.</p>
<h3>Availability</h3>
<p>Edge expansion is enabled by default for all DXP customers at no additional egress charge through the end of the calendar year. Configuration guides and Terraform modules are published in the developer documentation portal.</p>
<p>AKAAL plans further PoP additions in South Asia and Japan based on customer demand signals and renewable energy availability at colocation partners.</p>$html$,
    '2025-02-08T09:00:00+00:00'::timestamptz
  ),
  (
    'akaal-ceo-keynote-future-of-experience',
    '/images/lab.png',
    'AKAAL CEO Delivers Keynote on the Future of Composable Experience Design',
    'PRESS',
    $html$<p>AKAAL's Chief Executive Officer took the stage at Experience Forward 2025 to present a framework for composable experience design—the practice of assembling customer journeys from modular services, shared design systems, and governed content rather than monolithic platform deployments.</p>
<h2>Key themes from the keynote</h2>
<p>The address argued that marketing and product organisations have outgrown all-in-one suites designed for a pre-mobile, pre-AI internet. Composable architectures, the CEO contended, let teams swap best-of-breed capabilities without re-platforming entire estates every three to five years.</p>
<p>Practical examples drew from AKAAL client work: a hospitality group routing only booking flows to a new engine while preserving CMS investments; a financial institution layering AI-assisted content review atop existing compliance workflows; a retailer unifying loyalty data without replacing storefront infrastructure.</p>
<blockquote>"The question is no longer whether to replatform. It's whether you can evolve continuously without betting the company on a single vendor's roadmap."</blockquote>
<h3>Announcements on stage</h3>
<ul>
<li>Design System 3.0 general availability confirmed</li>
<li>Partner certification programme for systems integrators</li>
<li>Open-source release of token sync tooling planned for Q4</li>
</ul>
<p>A recording of the keynote will be available on the AKAAL newsroom and YouTube channel within two weeks. Press wishing to request follow-up interviews should contact corporate communications.</p>$html$,
    '2025-01-20T16:00:00+00:00'::timestamptz
  )
) as seed(slug, image, header_text, category, paragraph_text, created_at)
where not exists (
  select 1 from public.newsroom n where n.slug = seed.slug
);
