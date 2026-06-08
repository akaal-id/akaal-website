-- Run in Supabase → SQL Editor for your AKAAL project.

create table if not exists public.newsroom (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  slug text not null unique,
  image text not null default '',
  header_text text not null,
  category text not null default 'general',
  paragraph_text text not null default ''
);

alter table public.newsroom enable row level security;

drop policy if exists "newsroom_select_public" on public.newsroom;
create policy "newsroom_select_public"
  on public.newsroom for select
  to public
  using (true);

drop policy if exists "newsroom_insert_authenticated" on public.newsroom;
create policy "newsroom_insert_authenticated"
  on public.newsroom for insert
  to authenticated
  with check (true);

drop policy if exists "newsroom_update_authenticated" on public.newsroom;
create policy "newsroom_update_authenticated"
  on public.newsroom for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "newsroom_delete_authenticated" on public.newsroom;
create policy "newsroom_delete_authenticated"
  on public.newsroom for delete
  to authenticated
  using (true);

-- Seed mock articles (skip if slug already exists)
insert into public.newsroom (slug, image, header_text, category, paragraph_text, created_at)
select * from (values
  (
    'akaal-digital-platform-launch',
    '/images/lab.png',
    'AKAAL Launches New Digital Experience Platform for Enterprise Clients',
    'PRESS',
    $html$<p>AKAAL today announced the launch of its next-generation Digital Experience Platform (DXP), a unified suite designed to help enterprise organisations orchestrate content, commerce, and customer data across every digital touchpoint. Built on a composable architecture, the platform enables teams to ship personalised experiences faster while maintaining the governance and security standards that regulated industries demand.</p>
<h2>A platform built for scale</h2>
<p>The new DXP consolidates capabilities that were previously scattered across disconnected tools: headless content management, real-time personalisation, analytics pipelines, and multi-channel publishing. Product teams can compose experiences from modular services rather than wrestling with monolithic CMS deployments that slow iteration cycles to a crawl.</p>
<p>Early design partners reported a forty-percent reduction in time-to-publish for campaign landing pages, alongside measurable improvements in Core Web Vitals scores after migrating legacy front ends to AKAAL's edge-optimised delivery layer. Engineering leads cited the platform's API-first contract as the single biggest factor in accelerating cross-functional delivery.</p>
<blockquote>"We evaluated a dozen vendors over eighteen months. AKAAL was the only partner that treated design systems, engineering velocity, and compliance as first-class requirements—not afterthoughts bolted onto a generic CMS."</blockquote>
<h3>Key capabilities at launch</h3>
<ul>
<li>Composable content APIs with granular role-based access control</li>
<li>Visual page builder with live preview across breakpoints</li>
<li>Integrated A/B testing and experiment analytics</li>
<li>Edge caching with automatic image optimisation</li>
<li>Audit logging and data residency controls for APAC deployments</li>
</ul>
<p>Availability begins in Q3 for existing AKAAL Labs clients, with a self-serve onboarding path for mid-market teams planned for early next year. The company will host a series of technical deep-dive webinars covering migration strategies from legacy WordPress, Sitecore, and custom React stacks.</p>
<p>For press enquiries, partnership opportunities, or demo requests, contact the AKAAL communications team through the official newsroom channel. Additional product documentation and architecture whitepapers will be published alongside the general availability announcement.</p>$html$,
    '2026-04-02T09:00:00+00:00'::timestamptz
  ),
  (
    'indo-pacific-rebrand-case-study',
    '/images/lab.png',
    'Behind the Rebrand: How We Transformed Indo Pacific''s Visual Identity',
    'CASE STUDY',
    $html$<p>When Indo Pacific approached AKAAL Creative, their brand had grown organically over two decades—accumulating inconsistent typography, competing colour palettes, and a logo that no longer reflected the sophistication of their advisory practice. The brief was ambitious: unify a fragmented identity system without erasing the equity built with long-standing institutional clients.</p>
<h2>Discovery and stakeholder alignment</h2>
<p>Our team began with a six-week discovery phase spanning executive interviews, competitive audits, and workshops with client-facing teams across Singapore, Jakarta, and Sydney. We mapped every touchpoint where the brand appeared—from pitch decks and annual reports to signage in member lounges—and catalogued over two hundred distinct visual variants of the legacy mark.</p>
<p>The insight that shaped the entire programme was deceptively simple: Indo Pacific's clients valued discretion and clarity above spectacle. The rebrand needed to signal institutional trust while introducing a contemporary visual language that could flex across digital products the firm was preparing to launch.</p>
<h3>Design system foundations</h3>
<p>We developed a modular identity system anchored by a refined wordmark, a restrained chromatic palette inspired by maritime navigation charts, and a typographic pairing that balanced editorial authority with digital legibility. Custom iconography was drawn on a consistent grid so that wayfinding, data visualisation, and interface elements could share a single geometric logic.</p>
<blockquote>"AKAAL didn't hand us a PDF and disappear. They embedded with our marketing and product teams, stress-testing every decision against real deliverables before we committed to production."</blockquote>
<p>Rollout spanned eighteen months and included:</p>
<ol>
<li>Brand guidelines and asset library hosted in a shared Figma workspace</li>
<li>Template system for presentations, proposals, and research publications</li>
<li>Website redesign with headless CMS integration</li>
<li>Environmental graphics for three flagship offices</li>
<li>Training programme for eighty internal champions</li>
</ol>
<p>Post-launch measurement showed a twenty-two percent increase in branded search visibility and significantly improved consistency scores in quarterly brand audits. The case study demonstrates how methodical discovery, cross-functional collaboration, and systems thinking can transform even the most established professional services brands.</p>$html$,
    '2026-02-18T14:30:00+00:00'::timestamptz
  ),
  (
    'akaal-labs-ai-content-suite',
    '/images/lab.png',
    'AKAAL Labs Introduces AI-Powered Content Automation Suite',
    'PRODUCT',
    $html$<p>AKAAL Labs has released its AI-Powered Content Automation Suite, a workflow engine that connects large language models to governed content pipelines so marketing and product teams can generate, review, and publish assets without sacrificing brand voice or compliance guardrails.</p>
<h2>From experimentation to production</h2>
<p>Generative AI tools promised to revolutionise content production, but most organisations stalled at the pilot stage—unable to reconcile speed with quality control, rights management, and the nuanced tone their audiences expected. The Content Automation Suite addresses that gap by embedding human-in-the-loop review, version history, and policy checks directly into the generation flow.</p>
<p>Teams define brand voice parameters, restricted terminology lists, and approval chains before any model invocation occurs. Drafts route automatically to subject-matter experts, legal reviewers, or regional localisation leads depending on content classification tags assigned at intake.</p>
<h3>Technical architecture</h3>
<p>The suite runs on AKAAL's orchestration layer, which abstracts provider-specific APIs behind a unified interface. Customers can route requests to OpenAI, Anthropic, or self-hosted models without rewriting integration code. Token usage, latency, and quality scores surface in a central dashboard designed for both engineering and marketing stakeholders.</p>
<ul>
<li>Template library with variable slots for product, audience, and channel</li>
<li>Semantic diffing to highlight changes between model revisions</li>
<li>Webhook triggers for CMS publish and social scheduling tools</li>
<li>Red-team testing module for bias and hallucination detection</li>
</ul>
<blockquote>"We cut our weekly newsletter production time from twelve hours to under three, while actually increasing the number of stakeholder reviews—because the tool made reviews painless instead of a bottleneck."</blockquote>
<p>Pricing follows a consumption model with enterprise tiers that include dedicated model fine-tuning, private VPC deployment, and SLA-backed support. AKAAL Labs will publish reference architectures for integrating the suite with popular headless CMS platforms, including the company's own Digital Experience Platform announced earlier this year.</p>
<p>Developers can explore the public API documentation starting today, with sandbox credits available for qualified evaluation accounts. Full general availability is scheduled for the next platform release cycle.</p>$html$,
    '2026-01-05T11:00:00+00:00'::timestamptz
  ),
  (
    'akaal-studio-expands-jakarta',
    '/images/lab.png',
    'AKAAL Studio Expands Operations with New Jakarta Production Facility',
    'PRESS',
    $html$<p>AKAAL Studio has opened a state-of-the-art production facility in Jakarta, expanding its capacity to deliver motion, photography, and experiential content for clients across Southeast Asia. The twelve-thousand-square-foot space houses three sound stages, a permanent LED volume, colour-grading suites, and collaborative workshop areas designed for rapid prototyping with brand and agency partners.</p>
<h2>Investing in regional talent</h2>
<p>The expansion reflects AKAAL's long-term commitment to building production infrastructure where its clients operate, rather than shipping work through distant time zones with fragmented handoffs. Over sixty creative and technical roles will be based in the new facility by year end, spanning directors, cinematographers, real-time engine artists, and post-production specialists.</p>
<p>Studio leadership emphasised sustainability in the build: LED lighting throughout, heat-recovery HVAC systems, and a digital asset management workflow that reduces duplicate renders and overnight transfer batches. These choices align with corporate clients who increasingly audit suppliers on environmental impact alongside creative credentials.</p>
<h3>Capabilities and client programmes</h3>
<p>Jakarta joins existing Studio hubs in Singapore and Sydney, forming a production triangle that supports follow-the-sun schedules for global campaign launches. Shared pipeline standards mean an edit begun in one office can be handed off seamlessly to another without proprietary format conversions or lost metadata.</p>
<blockquote>"Southeast Asia is one of the most visually dynamic markets on earth. We wanted a home here that matches the ambition of the stories our clients need to tell—not a satellite office running on leftovers from other regions."</blockquote>
<p>Initial client programmes include long-form documentary series for financial services brands, launch films for technology products entering ASEAN markets, and immersive retail installations that blend physical set design with generative visuals. The facility will also host quarterly open-house sessions for emerging directors enrolled in AKAAL's mentorship pipeline.</p>
<p>Press tours and facility walkthroughs can be arranged through the Studio partnerships desk. B-Roll, photography, and executive interview availability are listed on the AKAAL newsroom media kit page.</p>$html$,
    '2025-11-20T08:00:00+00:00'::timestamptz
  )
) as seed(slug, image, header_text, category, paragraph_text, created_at)
where not exists (
  select 1 from public.newsroom n where n.slug = seed.slug
);
