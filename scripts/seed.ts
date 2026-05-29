import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../payload.config'

/**
 * Seeds CMS pages with their real design copy (idempotent — re-running replaces them).
 * Run with: pnpm seed   (after `docker compose up -d` and a dev-server restart).
 * Add a block to a page here as each block type lands; one upsert call per page.
 */
async function upsertPage(
  payload: Awaited<ReturnType<typeof getPayload>>,
  slug: string,
  data: Record<string, unknown>,
) {
  await payload.delete({ collection: 'pages', where: { slug: { equals: slug } } })
  await payload.create({ collection: 'pages', data: { slug, ...data } as never })
  console.log(`  ✓ ${slug}`)
}

async function seed() {
  const payload = await getPayload({ config: await config })
  console.log('Seeding pages...')

  await upsertPage(payload, 'industries', {
    title: 'Industries',
    layout: [
      {
        blockType: 'pageHero',
        eyebrow: 'Industry Specialization',
        heading: 'Industry *Focus*',
        subheading:
          'Arduwyn does not spread thin across every sector. We go deep where the stakes — and the regulators — are highest: financial services and healthcare. Each is engineered for its own examiners, threat model, and core platforms.',
      },
      {
        blockType: 'lede',
        eyebrow: 'Why it matters',
        heading: 'A generalist treats every sector the same',
        body: "A regional bank and a hospital system do not share a threat model, a regulator, or an application stack — but generalist security advice quietly assumes they do. Arduwyn's work in each industry is shaped by its examiners, its core platforms, and the specific ways a *Zero Trust* architecture has to bend to financial and clinical reality.",
      },
      {
        blockType: 'industryTiles',
        heading: 'Where we go deep',
        subheading: 'Two industries — each with a dedicated practice.',
        items: [
          {
            icon: 'finance',
            title: 'Financial *Services*',
            lede: "Banks, brokerages, and lenders operate under continuous regulatory scrutiny. We engineer Zero Trust architectures that don't just satisfy the examiner — they move the institution's real risk posture well beyond the regulatory floor.",
            bullets: [
              { text: 'FDIC examination & audit readiness' },
              { text: 'FFIEC-aligned Zero Trust architecture' },
              { text: 'Core banking & lending platform protection' },
              { text: 'Exceeding the compliance baseline, by design' },
            ],
            linkLabel: 'Explore financial services',
            href: '/finance',
          },
          {
            icon: 'healthcare',
            title: 'Healthcare',
            lede: 'Healthcare runs on systems that cannot go down and data that cannot leak. We bring Zero Trust to clinical environments — protecting patient data and the platforms care depends on, from the electronic health record outward.',
            bullets: [
              { text: 'Protection for Epic and Athenahealth environments' },
              { text: 'Clinical system & medical-device segmentation' },
              { text: 'HIPAA-aligned access and evidence' },
              { text: 'Further detail in progress', muted: true },
            ],
            linkLabel: 'Explore healthcare',
            href: '/healthcare',
          },
        ],
      },
      {
        blockType: 'cta',
        eyebrow: 'Engage',
        heading: 'In a regulated industry — and tired of generalist security advice?',
        body: 'Tell us your sector and your constraint. We respond within one business day with input shaped by your regulators and your platforms.',
        buttons: [
          { label: 'hello@arduwyn.com', href: 'mailto:hello@arduwyn.com?subject=Industry%20Engagement', style: 'primary' },
          { label: 'See case studies', href: '/#portfolio', style: 'ghost' },
        ],
      },
    ],
  })

  await upsertPage(payload, 'finance', {
    title: 'Financial Services',
    layout: [
      {
        blockType: 'pageHero',
        eyebrow: 'Industry · Financial Services',
        heading: 'Financial *Services*',
        subheading:
          'Zero Trust engineering for banks, brokerages, and lenders — where a security gap is also an examination finding, and "compliant" is the starting line, not the goal.',
      },
      {
        blockType: 'lede',
        eyebrow: 'The stakes',
        heading: 'The examiner is already in the room',
        body: 'Every financial institution operates knowing the next FDIC examination is coming. Most security programs are built to pass it — and that is the wrong target.\n\nAn examination confirms you met a baseline on a single day. It says little about the other 364. Arduwyn engineers financial-services Zero Trust to a *higher standard than the exam* — so passing it becomes a by-product, not the project.',
      },
      {
        blockType: 'callouts',
        heading: 'Built for the regulatory reality',
        subheading:
          'FDIC examinations, FFIEC expectations, and the obligations underneath them — engineered into the architecture, not bolted on before an audit.',
        items: [
          {
            tag: 'FDIC audits',
            title: 'Examination readiness',
            body: 'Architecture, controls, and evidence organized the way an IT examination expects to find them. Examination prep stops being a quarterly scramble and becomes a report you can run on demand.',
          },
          {
            tag: 'Frameworks',
            title: 'FFIEC-aligned architecture',
            body: 'Zero Trust controls mapped to the FFIEC IT Handbook and Cybersecurity Assessment Tool, with GLBA Safeguards obligations engineered into the design rather than reverse-fitted to it.',
          },
          {
            tag: 'Evidence',
            title: 'Records that hold up',
            body: 'Continuous audit collection and tamper-evident records — so when an examiner, an auditor, or an incident asks what happened, the answer is already documented and verifiable.',
          },
        ],
      },
      {
        blockType: 'lede',
        eyebrow: 'The standard',
        heading: 'Compliance is the floor, not the ceiling',
        body: 'A passing examination means you cleared the minimum. The institutions that get breached are frequently the ones that were fully "compliant" the week before.\n\nArduwyn\'s financial-services work lives in the gap between the regulatory minimum and an architecture that is genuinely hard to breach — identity-centric access in place of network trust, segmentation that contains an intrusion instead of letting it spread, and continuous verification that does not wait for the annual review. The examination is satisfied along the way. The point is *everything beyond it*.',
      },
      {
        blockType: 'platformTags',
        heading: 'Core financial platforms we secure',
        subheading: 'The applications a financial institution actually runs on — protected as first-class systems, not afterthoughts.',
        intro: 'Zero Trust access, segmentation, and inspection engineered around the platforms below — with policy that maps to how each one is genuinely used.',
        tags: [
          { label: 'Encompass' },
          { label: 'Raymond James' },
          { label: 'FIS' },
          { label: 'Q2' },
          { label: 'ICE Mortgage Technology' },
          { label: 'Black Knight' },
          { label: 'nCino' },
          { label: 'Bloomberg' },
          { label: 'Workday' },
          { label: 'NetSuite' },
          { label: 'SAP' },
        ],
      },
      {
        blockType: 'cta',
        eyebrow: 'Engage',
        heading: 'Want a security posture that outpaces the examiner?',
        body: "Tell us your institution's size, regulator, and platform stack. We respond within one business day.",
        buttons: [
          { label: 'hello@arduwyn.com', href: 'mailto:hello@arduwyn.com?subject=Financial%20Services', style: 'primary' },
          { label: 'Back to industries', href: '/industries', style: 'ghost' },
        ],
      },
    ],
  })

  await upsertPage(payload, 'healthcare', {
    title: 'Healthcare',
    layout: [
      {
        blockType: 'pageHero',
        eyebrow: 'Industry · Healthcare',
        heading: 'Healthcare',
        subheading:
          'Zero Trust engineering for healthcare — protecting patient data and the clinical systems care depends on, from the electronic health record outward.',
      },
      {
        blockType: 'lede',
        eyebrow: 'The stakes',
        heading: "Security that can't get in the way of care",
        body: 'A hospital cannot take the network down for a maintenance window, and a clinician cannot wait on an access request mid-procedure. Healthcare *Zero Trust* has to protect patient data and connected medical systems without ever becoming the thing that slows care down.',
      },
      {
        blockType: 'platformTags',
        heading: 'Clinical systems & EHR platforms',
        subheading: 'Zero Trust engineered around the electronic health record and the systems that surround it.',
        intro: 'Access, segmentation, and inspection designed around the platforms healthcare organizations actually run on.',
        tags: [
          { label: 'Epic' },
          { label: 'Athenahealth' },
          { label: 'Cerner' },
          { label: 'Optum' },
          { label: 'MyChart' },
          { label: 'PACS' },
        ],
        note: {
          tag: 'Placeholder',
          body: 'James to add platform-specific detail here — how Arduwyn secures each of these environments and the integration specifics for each. The six platforms above are confirmed; the supporting detail is still to come. PACS vendor to be named once recalled.',
        },
      },
      {
        blockType: 'placeholder',
        heading: 'Regulatory & compliance',
        subheading: 'HIPAA, HITECH, and the access controls and evidence that satisfy them.',
        tag: 'Placeholder — to be written',
        body: 'James to add the healthcare regulatory section — HIPAA Security Rule alignment, PHI protection, HITECH, breach-notification posture, audit and evidence handling, and how Zero Trust maps to each. Drafting later once the brain blank clears.',
      },
      {
        blockType: 'placeholder',
        heading: 'The Arduwyn healthcare approach',
        subheading: 'How a healthcare Zero Trust engagement runs, end to end.',
        tag: 'Placeholder — to be written',
        body: 'James to add the healthcare approach section — clinical and medical-device segmentation, identity-centric access for clinical staff and third parties, GenAI guardrails for clinical workflows, and the engagement model. Reference the anonymized healthcare case study on the home page as proof.',
      },
      {
        blockType: 'cta',
        eyebrow: 'Engage',
        heading: 'Bringing Zero Trust to a clinical environment?',
        body: 'Tell us about your systems and your constraints. We respond within one business day.',
        buttons: [
          { label: 'hello@arduwyn.com', href: 'mailto:hello@arduwyn.com?subject=Healthcare', style: 'primary' },
          { label: 'Back to industries', href: '/industries', style: 'ghost' },
        ],
      },
    ],
  })

  await upsertPage(payload, 'managed-services', {
    title: 'Managed Services',
    layout: [
      {
        blockType: 'pageHero',
        eyebrow: 'Lifecycle Engagement',
        heading: 'Managed *Services*',
        subheading:
          'Zero Trust is not a project that closes. Arduwyn takes you from the first advisory conversation through licensing, design, and rollout — then stays on as the team that runs it. Architecture-led operations, built to prevent issues rather than react to them.',
      },
      {
        blockType: 'lede',
        eyebrow: 'The difference',
        heading: 'Break-fix is not an operating model',
        body: "Plenty of capable engineers can fix what just broke. Far fewer spend their hours making sure it *doesn't* break — tuning policy before it drifts, catching a capacity limit before it pages someone at 2 a.m., and evolving the architecture as the business and the threat model move.\n\nBreak-fix keeps the lights on. Architecture-led operations keep the security program ahead of the problem. Every Arduwyn managed engagement is built on the second model — and staffed by the principal engineer who designed the environment in the first place.",
      },
      {
        blockType: 'numberedTimeline',
        heading: 'One relationship, end to end',
        subheading: 'Five stages. Most clients enter at the one they need today — and stay through the rest.',
        panelStyle: 'boxed',
        steps: [
          { number: '01', title: 'Advisory', body: 'It starts with a technical brief — not a sales call. We define the target state, assess maturity against the Zero Trust models, and produce a roadmap scoped to your environment rather than a reference template.' },
          { number: '02', title: 'Licensing & *procurement*', body: 'Zscaler licensing, sized to what the architecture actually needs. Arduwyn can provision it directly, or work alongside entitlement you already hold or buy through a VAR. The sizing is honest either way — you are never sold capacity to fill a quota.' },
          { number: '03', title: 'Design & *architecture*', body: 'The reference architecture, policy framework, segmentation model, and identity-integration design — the blueprint every later stage is built and measured against.' },
          { number: '04', title: 'Implementation', body: 'Deployment, migration, and cutover — staged in waves and rehearsed with dry-runs. Every wave has a tested rollback path before it goes live.' },
          { number: '05', title: 'Managed *services*', body: 'The retained engagement. Arduwyn runs, tunes, and evolves the platform as an extension of your team — the operating model the rest of this page describes.' },
        ],
      },
      {
        blockType: 'featureCards',
        heading: 'Inside the managed service',
        subheading: 'What Arduwyn runs once the platform is live — continuously, and as prevention.',
        columns: '3',
        items: [
          { icon: 'policy', title: 'Policy management & tuning', body: 'Access, TLS-inspection, and DLP policy maintained as the business changes — rules retired before they bloat, exceptions sunset on a schedule.' },
          { icon: 'config', title: 'Configuration assurance', body: "Every tenant's configuration snapshotted daily and version-controlled. Unexpected drift is flagged and investigated — not discovered mid-incident." },
          { icon: 'health', title: 'Health & experience monitoring', body: 'ZDX-driven monitoring of user experience and connector capacity, so degradation is caught and corrected before it becomes a ticket.' },
          { icon: 'identity', title: 'Identity & access governance', body: 'SCIM provisioning kept clean, conditional access reviewed, and just-in-time access for sensitive applications so standing privilege never accumulates.' },
          { icon: 'incident', title: 'Incident response & escalation', body: 'Tier-3 and Tier-4 escalation cover — with forensic-grade evidence and incident timelines produced on demand when something does go wrong.' },
          { icon: 'roadmap', title: 'Architecture review & roadmap', body: 'A standing quarterly review: the architecture is re-checked against new threats, business change, and Zscaler platform updates, and the roadmap revised.' },
        ],
      },
      {
        blockType: 'calloutBar',
        body: 'Managed services run on the *automation Arduwyn builds* — daily configuration backup, unified audit, just-in-time access, and incident tooling — so operations are continuous and evidenced, not best-effort.',
        button: { label: 'See the automation', href: '/automation' },
      },
      {
        blockType: 'statGrid',
        heading: 'The operating rhythm',
        subheading: 'Managed services run on a cadence — automated where it should be, human where it matters.',
        columns: '4',
        items: [
          { term: 'Daily', body: 'Automated configuration backup, drift checks, and audit collection. Experience and capacity monitoring runs continuously.' },
          { term: 'Weekly', body: 'Drift and alert review, policy-change requests processed, and any escalations triaged and closed out.' },
          { term: 'Monthly', body: 'Policy optimization, a capacity and licensing review, and a written posture report readable by engineers and the board alike.' },
          { term: 'Quarterly', body: 'A full architecture review against new threats and business change — the roadmap re-prioritized for the quarter ahead.' },
        ],
      },
      {
        blockType: 'cta',
        eyebrow: 'Engage',
        heading: 'Want a team to run Zero Trust — not just rescue it?',
        body: 'Tell us where you are: choosing a platform, mid-rollout, or live and under-supported. We respond within one business day.',
        buttons: [
          { label: 'hello@arduwyn.com', href: 'mailto:hello@arduwyn.com?subject=Managed%20Services', style: 'primary' },
          { label: 'See the automation behind it', href: '/automation', style: 'ghost' },
        ],
      },
    ],
  })

  await upsertPage(payload, 'engineering', {
    title: 'Zscaler Engineering',
    layout: [
      {
        blockType: 'pageHero',
        eyebrow: 'Tier 3 / Tier 4 Engineering',
        heading: '*Zscaler* Engineering',
        subheading:
          'Deployment, recovery, performance, and stabilization across ZIA, ZPA, and ZDX. The escalation authority called when standard implementations break — and the architecture work that prevents that from happening in the first place.',
      },
      {
        blockType: 'productCards',
        heading: 'What we engineer',
        subheading: 'Three platforms, one operational discipline. Each gets designed, deployed, and supported as a production system — not a checkbox deliverable.',
        items: [
          {
            code: 'ZIA',
            title: 'Internet *Access*',
            lede: 'Inline cloud proxy with TLS inspection, DLP, CASB, advanced threat prevention, and policy that scales beyond the IP-rule era.',
            bullets: [
              { text: 'Policy framework built around business intent, not subnet' },
              { text: 'TLS 1.3 inspection with cert-pinning exception handling' },
              { text: 'DLP rules tuned for healthcare PHI and PCI cardholder data' },
              { text: 'CASB integration for SaaS posture and shadow IT discovery' },
              { text: 'Inline GenAI controls for ChatGPT, Copilot, agent-mode tooling' },
            ],
          },
          {
            code: 'ZPA',
            title: 'Private *Access*',
            lede: 'ZTNA replacing the VPN. Users connect to applications, not networks. Third-party access is scoped per app, per session, with full audit.',
            bullets: [
              { text: 'App Connector topology designed for the actual workload footprint' },
              { text: 'Browser Access for unmanaged endpoints and contractors' },
              { text: 'Segment group design that maps to business ownership' },
              { text: 'Active Directory tree integration without legacy network exposure' },
              { text: 'Posture-aware access tied to EDR signal' },
            ],
          },
          {
            code: 'ZDX',
            title: 'Digital *Experience*',
            lede: 'End-to-end visibility into the user experience — from the endpoint through the cloud edge to the app — and the engineering work that makes the data actionable.',
            bullets: [
              { text: 'Probe design tuned to the apps that actually matter to the business' },
              { text: 'Baseline establishment and drift detection' },
              { text: 'Root cause triage workflows for help desk and SRE handoff' },
              { text: 'Correlation with ZIA and ZPA telemetry for full-path diagnosis' },
              { text: 'Reporting that survives a board-level conversation' },
            ],
          },
        ],
      },
      {
        blockType: 'numberedGrid',
        heading: '*Failure* category coverage',
        count: '27',
        intro: "The production-blocking issue classes we've engineered through and built escalation playbooks for. These are the categories that decide whether a Zscaler deployment stays in production or rolls back at 2 a.m.",
        columns: '3',
        items: [
          { number: '01', label: 'TLS inspection cert-pinning conflicts' },
          { number: '02', label: 'App Connector tunnel instability' },
          { number: '03', label: 'QUIC fallback breaking inline DLP' },
          { number: '04', label: 'IdP claim mapping drift after IdP change' },
          { number: '05', label: 'Conditional access evaluation loops' },
          { number: '06', label: 'Browser Access certificate chain breaks' },
          { number: '07', label: 'Tenant policy bloat & rule evaluation cost' },
          { number: '08', label: 'PAC file regression after edge change' },
          { number: '09', label: 'SAML / SCIM provisioning desync' },
          { number: '10', label: 'M365 / Teams traffic exemption regression' },
          { number: '11', label: 'Posture API failures from EDR outages' },
          { number: '12', label: 'CASB API rate-limit cascades' },
          { number: '13', label: 'DLP false positives on legitimate workflows' },
          { number: '14', label: 'Cross-tenant resource access after M&A' },
          { number: '15', label: 'Encrypted SNI / ECH visibility loss' },
          { number: '16', label: 'DNS-over-HTTPS bypass paths' },
          { number: '17', label: 'Latency regressions from policy depth' },
          { number: '18', label: 'App Connector capacity / load balancing' },
          { number: '19', label: 'Segment group sprawl & access drift' },
          { number: '20', label: 'Third-party contractor offboarding gaps' },
          { number: '21', label: 'ZDX probe coverage blind spots' },
          { number: '22', label: 'SCIM provisioning storms post-merger' },
          { number: '23', label: 'Endpoint posture / Falcon signal lag' },
          { number: '24', label: 'GenAI / agent-mode prompt exfil paths' },
          { number: '25', label: 'Compliance evidence generation drift' },
          { number: '26', label: 'Multi-tenant routing during cutover' },
          { number: '27', label: 'Rollback safety & staged-policy testing' },
        ],
      },
      {
        blockType: 'labeledRows',
        heading: 'Integration patterns',
        subheading: "The seams where Zscaler meets the rest of your stack. Designed to fail safe, log everything, and survive vendor changes.",
        layout: 'grid',
        items: [
          { title: 'Identity providers', description: "Single source of identity wired to SAML / OIDC, with conditional access policy mirrored across the IdP and Zscaler control planes so they don't drift.", tags: [{ label: 'Entra ID' }, { label: 'Okta' }, { label: 'Ping' }, { label: 'SCIM' }] },
          { title: 'Endpoint & EDR', description: 'Device posture signal fed into ZPA access decisions. Quarantine paths defined for unhealthy endpoints. No surprise loss of access during EDR outages.', tags: [{ label: 'CrowdStrike Falcon' }, { label: 'Defender for Endpoint' }, { label: 'Posture API' }] },
          { title: 'SIEM & SOAR', description: 'NSS feeds and API connectors to your SIEM, with detection-engineering input on what telemetry actually drives a credible alert.', tags: [{ label: 'Splunk' }, { label: 'Sentinel' }, { label: 'XSIAM' }, { label: 'NSS' }] },
          { title: 'Cloud (AWS / Azure)', description: 'App Connectors deployed in the right VPCs/VNets, posture management integrated, identity federation done once and done correctly.', tags: [{ label: 'AWS' }, { label: 'Azure' }, { label: 'VPC peering' }, { label: 'Private endpoints' }] },
          { title: 'CASB & SaaS', description: "API-mode CASB for posture and inline-mode for control. Shadow IT discovery wired to a sanctioned-app workflow that doesn't antagonize the business.", tags: [{ label: 'M365' }, { label: 'Google Workspace' }, { label: 'Salesforce' }, { label: 'ServiceNow' }] },
          { title: 'AI / GenAI tooling', description: 'Inline visibility for ChatGPT, Copilot, Gemini, Claude, and agent-mode workflows. Prompt-level DLP and exfiltration prevention with policy carve-outs for sanctioned workflows.', tags: [{ label: 'ChatGPT' }, { label: 'Copilot' }, { label: 'Claude' }, { label: 'Agent mode' }] },
        ],
      },
      {
        blockType: 'numberedTimeline',
        heading: 'Post-merger stabilization playbook',
        subheading: 'The repeatable sequence for combining two Zscaler estates without taking either down. Proven at 120K+ user scale.',
        panelStyle: 'boxed',
        steps: [
          { number: '01', title: 'Tenant audit & baseline', body: 'Full inventory of both tenants — policies, App Connectors, segments, conditional access. Identify drift between intended state and live config. Establish a "do not change" set for the cutover window.' },
          { number: '02', title: 'Identity unification', body: 'Single IdP for the combined entity, SCIM into Zscaler from one source, claim mapping rationalized. Old IdP kept warm for safe rollback until cutover stabilizes.' },
          { number: '03', title: 'Policy convergence', body: 'Reconcile the two policy frameworks into one. Carve out exception rules for the inherited apps that need migration, with a sunset date for every exception.' },
          { number: '04', title: 'App Connector consolidation', body: 'Migrate App Connectors into the surviving tenant in waves, by business unit, with rollback drills before each wave. Capacity planning sized for the combined estate, not the average.' },
          { number: '05', title: 'Stabilize & decommission', body: 'Run dual-tenant for the validation window. Decommission the absorbed tenant only after the new posture passes a full audit cycle. Document everything for the next M&A event.' },
        ],
      },
      {
        blockType: 'tagGroups',
        heading: 'Platform expertise',
        subheading: 'Arduwyn engineers across the full Zscaler platform — and the systems it has to integrate with.',
        columns: '2',
        groups: [
          { label: 'Zscaler platform', tags: [{ label: 'ZIA' }, { label: 'ZPA' }, { label: 'ZDX' }, { label: 'ZWA' }, { label: 'ZTB' }, { label: 'Branch Connector' }, { label: 'Cloud Connector' }, { label: 'Risk360' }] },
          { label: 'Integration ecosystem', tags: [{ label: 'CrowdStrike Falcon' }, { label: 'Microsoft Entra ID' }, { label: 'Microsoft Azure' }, { label: 'Microsoft Defender' }] },
        ],
      },
      {
        blockType: 'cta',
        eyebrow: 'Engage',
        heading: 'Have a Zscaler problem that needs an engineer?',
        body: "Whether it's a new deployment, a stabilization, or a Tier-3 escalation — tell us the constraint. We respond within one business day.",
        buttons: [
          { label: 'hello@arduwyn.com', href: 'mailto:hello@arduwyn.com?subject=Zscaler%20Engineering', style: 'primary' },
          { label: 'See architecture approach', href: '/architecture', style: 'ghost' },
        ],
      },
    ],
  })

  await upsertPage(payload, 'automation', {
    title: 'Zero Trust Automation',
    layout: [
      {
        blockType: 'pageHero',
        eyebrow: 'Automation Engineering',
        heading: '*Zero Trust* Automation',
        subheading:
          'The architecture is signed off — now it has to survive production. We build the automation that keeps a Zero Trust deployment trustworthy after go-live: idempotent provisioning, continuous configuration assurance, just-in-time access, and forensic-grade incident tooling — built on the Zscaler OneAPI SDK and running inside your own CI and SIEM.',
      },
      {
        blockType: 'lede',
        body: 'A Zero Trust architecture is a *living system*. Policies drift, connectors fail over, access is granted and must be revoked, and when an incident lands, someone has to reconstruct exactly what happened — and prove it.\n\nArduwyn engineers the operational layer that standard deployments leave manual. The toolkit below is drawn from real engagements: a coherent suite spanning provisioning, configuration assurance, access governance, and incident response. Every component is auditable, idempotent, and yours — there is no Arduwyn-hosted black box in the path.',
      },
      {
        blockType: 'featureCards',
        heading: 'The automation lifecycle',
        subheading: 'Four stages of Zero Trust operations — each one a place where manual process becomes risk.',
        columns: '4',
        items: [
          { number: '01', title: 'Provision', body: 'Stand the ZPA estate up — and stand up its failover — from declared desired state, not console clicks.' },
          { number: '02', title: 'Observe', body: "Snapshot every tenant's configuration, detect drift, and stream a unified audit trail to your SIEM." },
          { number: '03', title: 'Govern', body: 'Replace standing access with time-boxed, approved grants that revoke themselves automatically.' },
          { number: '04', title: 'Respond', body: 'Reconstruct an incident across every source — then preserve the evidence in a court-defensible form.' },
        ],
      },
      {
        blockType: 'terminal',
        label: 'zpa-dr · bootstrap & failover rehearsal',
        lines: [
          { style: 'command', text: 'python playbooks/run_all.py --config config/dr_topology.yaml' },
          { style: 'output', text: '=== running deploy_connector_groups.py ===' },
          { style: 'output', text: '=== running deploy_server_groups.py ===' },
          { style: 'output', text: '=== running deploy_segment_groups.py ===' },
          { style: 'output', text: '=== running deploy_app_segments.py ===' },
          { style: 'success', text: 'all playbooks converged. secondary DC is pre-staged and ready for failover.' },
          { style: 'output', text: '' },
          { style: 'command', text: 'python playbooks/failover.py --config config/dr_topology.yaml --dry-run' },
          { style: 'output', text: 'preflight_ok      connector_group  appconn-dc-west   healthy_connectors=3' },
          { style: 'output', text: 'snapshot          app_segment      *                 count=3' },
          { style: 'output', text: 'failover          app_segment      erp-web           dry_run=True' },
          { style: 'output', text: 'failover          app_segment      git-https         dry_run=True' },
          { style: 'output', text: 'failover          app_segment      workday           dry_run=True' },
          { style: 'success', text: 'failover complete (dry_run=True) snapshot=snapshots/3f9c1a.json cid=3f9c1a' },
        ],
      },
      {
        blockType: 'toolStages',
        heading: 'The toolkit',
        subheading: 'Seven automations, grouped by lifecycle stage. Each runs in your infrastructure and is built on the Zscaler OneAPI SDK.',
        stages: [
          {
            number: '01',
            title: '*Provision*',
            blurb: 'Bring the estate — and its disaster-recovery posture — up from desired state.',
            columns: '2',
            tools: [
              {
                modPath: 'playbooks/ · config/',
                title: 'ZPA disaster-recovery topology',
                lede: 'A two-datacenter ZPA estate declared in one YAML file, with a single-command failover between primary and secondary.',
                bullets: [
                  { text: '`run_all.py` bootstraps connector groups, server groups, segment groups, and app segments in dependency order — both datacenters staged from one config.' },
                  { text: 'App segments are datacenter-agnostic; only their server-group binding flips. Failover swaps `server_group_ids` from the primary DC to the secondary.' },
                  { text: '`failover.py` pre-flights that at least two secondary connectors are authenticated, snapshots current bindings, then converges — writing every change to a JSONL audit log with a correlation ID, actor, and before/after state.' },
                  { text: 'Rollback restores from the snapshot. `--dry-run` is mandatory rehearsal before any live cut-over.' },
                ],
                tags: [{ label: 'zscaler-sdk-python' }, { label: 'YAML desired-state' }, { label: 'JSONL audit' }],
              },
              {
                modPath: 'app_onboarding/',
                title: 'ServiceNow app onboarding',
                lede: 'A self-service ServiceNow catalog item that provisions a ZPA application end to end — from request to live access policy — with no console clicks.',
                bullets: [
                  { text: 'Manager and Zscaler-Admin approvals gate the request. On fulfilment, a ServiceNow business rule fires a GitHub `repository_dispatch` carrying the RITM payload.' },
                  { text: 'GitHub Actions renders Terraform variables from the payload, runs `fmt` / `validate` / `plan`, and gates the plan through an OPA / conftest policy check before anything applies.' },
                  { text: 'Terraform creates the segment group, application segment, and the access-policy rule binding the AD / SCIM group to the app — stamping the RITM number into every resource for traceability.' },
                  { text: 'Resource IDs are written back into ServiceNow and the request closes itself. A GitHub Environment reviewer gate sits on top of the SNOW approvals.' },
                ],
                tags: [{ label: 'ServiceNow' }, { label: 'GitHub Actions' }, { label: 'Terraform' }, { label: 'OPA / conftest' }],
              },
            ],
          },
          {
            number: '02',
            title: '*Observe*',
            blurb: 'Know the configuration, prove what it was, and see every action across the platform.',
            columns: '2',
            tools: [
              {
                modPath: 'config_backup/',
                title: 'Configuration backup & drift detection',
                lede: "A daily, version-controlled snapshot of every tenant's configuration — and an alert the moment something changes that shouldn't have.",
                bullets: [
                  { text: 'Exporters cover ZIA, ZPA, ZDX, ZWA, and ZIdentity. Each nightly run commits a snapshot to git — the repository becomes a tamper-evident configuration history.' },
                  { text: 'Drift detection diffs consecutive snapshots, classifies each change by actor — separating Terraform and automation from human edits — and renders a unified-diff report.' },
                  { text: 'Unexpected drift alerts to Slack and ships as events to Datadog. `compare.py` lets an analyst diff any two snapshot dates on demand.' },
                ],
                tags: [{ label: 'GitHub Actions' }, { label: 'git-as-store' }, { label: 'Slack' }, { label: 'Datadog' }],
              },
              {
                modPath: 'unified_audit/',
                title: 'Unified audit pipeline',
                lede: "Every Zscaler service's audit log, every tenant, normalized into one event shape and streamed to your SIEM.",
                bullets: [
                  { text: 'A ten-minute cron collects audit entries from ZIA, ZPA, ZDX, ZWA, and ZIdentity through the Zscaler OneAPI.' },
                  { text: 'Each entry is normalized to a single Datadog event schema — so a detection is written once, not five times in five dialects.' },
                  { text: 'A per-tenant, per-product checkpoint guarantees exactly-once delivery. Runs never cancel mid-flight, so no audit event is dropped or double-counted.' },
                ],
                tags: [{ label: 'OneAPI' }, { label: 'GitHub Actions' }, { label: 'Datadog' }, { label: 'Checkpoint store' }],
              },
            ],
          },
          {
            number: '03',
            title: '*Govern*',
            blurb: 'Grant access narrowly, with approval — and take it back automatically.',
            columns: '1',
            tools: [
              {
                modPath: 'zpa_jit/',
                title: 'Just-in-time ZPA access',
                lede: 'Standing access to sensitive ZPA-fronted applications, replaced by time-boxed grants requested in Slack and revoked on a timer.',
                wide: true,
                bullets: [
                  { text: 'The `/zpa-jit` slash command requests membership of a ZPA-synced IdP group for a stated duration and reason.' },
                  { text: 'An approval card posts to a review channel; on approval, the user is added to the SCIM-synced group in Okta or Entra ID.' },
                  { text: 'A revoke worker runs every five minutes and removes every expired grant. The grant database is the system of record — every state change emits a tagged Datadog event.' },
                ],
                tags: [{ label: 'Flask' }, { label: 'Slack' }, { label: 'Okta / Entra ID' }, { label: 'Datadog' }],
                guardTitle: 'Guardrails',
                guardBullets: [
                  { text: 'Self-approval is hard-blocked.' },
                  { text: 'Duration ceilings are enforced server-side, ignoring whatever the user typed in Slack.' },
                  { text: 'Only pre-listed IdP groups are eligible — anything else is rejected, regardless of who asks.' },
                  { text: 'The state change trail is the audit chain an IR analyst follows.' },
                ],
              },
            ],
          },
          {
            number: '04',
            title: '*Respond*',
            blurb: 'When something goes wrong, reconstruct it — and preserve it.',
            columns: '2',
            tools: [
              {
                modPath: 'ir_timeline/',
                title: 'Incident-response timeline',
                lede: 'A correlated, multi-source timeline of everything a subject did inside a time window — built in seconds, not an afternoon.',
                bullets: [
                  { text: 'Pulls from the unified audit feed in Datadog, DLP incidents, ZDX, and ZPA access logs, then clusters related events and flags high-signal sources.' },
                  { text: 'Renders to JSON, Markdown, and HTML in one run — analyst-readable and machine-ingestible at the same time.' },
                  { text: 'Drives from a Slack command, or from a ZWA playbook via an HTTP action: a DLP incident or an admin role change triggers a timeline that is attached to the incident and pages on-call when high-signal events are present.' },
                ],
                tags: [{ label: 'Python' }, { label: 'Datadog' }, { label: 'ZDX / DLP / ZPA' }, { label: 'ZWA HTTP action' }],
              },
              {
                modPath: 'forensics_bundler/',
                title: 'Forensic evidence bundler',
                lede: 'A court-defensible evidence package — signed, hash-verified, and reproducible byte for byte.',
                bullets: [
                  { text: "Collects a subject's Datadog audit logs, the configuration snapshots bracketing the incident window, and live identity, group, and accessible-app pulls into one archive." },
                  { text: 'Every file is SHA-256 hashed into a `MANIFEST.json`, signed with a detached Ed25519 signature, and journaled in an append-only chain-of-custody log.' },
                  { text: 'The tarball is deterministic — fixed timestamps and ownership mean two bundlings of the same input are byte-identical. `verify.py` re-checks signature, hashes, and custody chain end to end.' },
                ],
                tags: [{ label: 'Python' }, { label: 'Ed25519' }, { label: 'Deterministic tar' }, { label: 'OneAPI' }],
              },
            ],
          },
        ],
      },
      {
        blockType: 'featureCards',
        heading: 'Engineering principles',
        subheading: 'The non-negotiables every automation in the suite is built to. They are why this tooling is safe to point at production.',
        columns: '3',
        items: [
          { title: '*Idempotent by default*', body: 'Every playbook converges to desired state. Re-running is safe — an unchanged resource records a no-op, never a duplicate.' },
          { title: '*Audited, always*', body: 'Every state change is written with a correlation ID, the acting principal, and a full before/after — to a JSONL log, to Datadog, or both.' },
          { title: '*Dry-run before live*', body: 'Mutating operations support a dry-run flag. Rehearsal against real configuration is mandatory practice before any production change.' },
          { title: '*Least privilege, no exceptions*', body: 'Access is time-boxed and self-approval is impossible. Ceilings are enforced server-side — not in a UI a user can edit.' },
          { title: '*Forensic determinism*', body: 'Evidence bundles are signed, hash-manifested, and byte-reproducible. A receiver verifies provenance without having to trust the sender.' },
          { title: '*Your infrastructure, not ours*', body: 'Everything runs in your CI, your ServiceNow, your SIEM, on the Zscaler OneAPI SDK. There is no Arduwyn-hosted service in the path.' },
        ],
      },
      {
        blockType: 'numberedTimeline',
        heading: 'How we deliver',
        subheading: 'Automation goes into production the same way the architecture did — incrementally, with guardrails, and with a handover.',
        panelStyle: 'boxed',
        steps: [
          { number: '01', title: 'Scope & topology', body: 'We map your tenants, datacenters, IdP groups, and SIEM. The desired-state YAML and configuration files are written against your actual estate — not a reference template.' },
          { number: '02', title: 'Pilot on one workflow', body: 'One automation goes in first — usually config backup or the audit pipeline, because they are read-only and prove the OneAPI integration with zero blast radius.' },
          { number: '03', title: 'Roll out with guardrails', body: 'Mutating automations follow, each behind dry-run rehearsal, policy gates, and approval workflows. Your team reviews every plan before it applies.' },
          { number: '04', title: 'Handover & runbooks', body: 'You own the repositories. We document every workflow, leave rollback procedures, and stay on call through the first failover drill and the first live incident.' },
        ],
      },
      {
        blockType: 'cta',
        eyebrow: 'Engage',
        heading: "Have a Zero Trust deployment that's still run by hand?",
        body: 'Tell us where the manual work — and the risk — lives. We respond within one business day with a scoped plan to automate it.',
        buttons: [
          { label: 'hello@arduwyn.com', href: 'mailto:hello@arduwyn.com?subject=Zero%20Trust%20Automation', style: 'primary' },
          { label: 'See engineering approach', href: '/engineering', style: 'ghost' },
        ],
      },
    ],
  })

  await upsertPage(payload, 'home', {
    title: 'Home',
    layout: [
      {
        blockType: 'homeHero',
        eyebrow: 'Modern Cybersecurity',
        heading: 'Architecture And *Zero Trust* Engineering',
        sub: 'We help enterprises evolve from legacy networks to identity-centric Zero Trust strategies. Expert implementation of Zscaler, SASE, and secure cloud transformation.',
        ctas: [
          { label: 'Start a technical brief', href: '#contact', style: 'primary' },
          { label: 'View engagements', href: '#portfolio', style: 'ghost' },
        ],
        showDiagram: true,
      },
      {
        blockType: 'aboutSplit',
        anchor: 'about',
        eyebrow: 'The Firm',
        heading: 'Built for the gaps standard Zero Trust deployments leave open.',
        subheading: 'Principal-led cybersecurity engineering — no staffing pyramid, no handoffs, no security theater.',
        story: 'Arduwyn is a boutique Zero Trust and cybersecurity engineering firm. We exist for the moment a security program meets reality — when the maturity slide says *Zero Trust* but the network still trusts anything inside the perimeter, when an acquisition doubles the attack surface overnight, and when modern encryption quietly blinds the controls a previous team installed.\n\nWe engage where complexity is highest: post-merger environments, security initiatives stalled in proof-of-concept, AI-driven attack-surface expansion, and the Tier-3 and Tier-4 escalations standard implementation partners cannot resolve. Every engagement is delivered by a principal engineer — the person who scopes the work is the person who does it.\n\nThe output is technical and direct: architectures that function in production, documentation an auditor and a board can both read, and Zscaler estates that stay stable through change. We are measured by what works after we leave — not by the size of the deck we hand over.',
        groups: [
          { label: 'Zscaler platform', tags: [{ label: 'ZIA' }, { label: 'ZPA' }, { label: 'ZDX' }, { label: 'ZWA' }, { label: 'ZTB' }, { label: 'Branch Connector' }, { label: 'Cloud Connector' }, { label: 'Risk360' }] },
          { label: 'Integration ecosystem', tags: [{ label: 'CrowdStrike Falcon' }, { label: 'Microsoft Entra ID' }, { label: 'Microsoft Azure' }, { label: 'Microsoft Defender' }] },
        ],
        focusLabel: 'Where we focus',
        focus: 'Healthcare · Financial services · Enterprise M&A · Cloud-native enterprise',
        ctaLabel: 'Start a technical brief',
        ctaHref: '#contact',
        differentiators: [
          { icon: 'user', title: 'Principal-only delivery', body: 'The engineer who scopes your work is the engineer who does it. No junior bench, no knowledge lost in handoff.' },
          { icon: 'layers', title: 'Engineering, not slideware', body: 'We leave production systems, configuration, and runbooks your team can operate — not a recommendations deck.' },
          { icon: 'window', title: 'Architecture over break-fix', body: 'Most operations work is reactive. We spend ours preventing the incident — tuning policy before it drifts and evolving the design ahead of the threat.' },
          { icon: 'target', title: "We engage where it's hardest", body: 'Post-merger chaos, stalled programs, production-blocking escalations — the work other firms decline.' },
        ],
      },
      {
        blockType: 'outcomes',
        eyebrow: 'For the CISO',
        heading: 'Outcomes a security program can be measured on',
        subheading: 'Zero Trust framed as a business result — not an architecture diagram.',
        items: [
          { icon: 'config', title: 'Measurable risk reduction', body: 'VPNs retired, lateral movement closed, third-party access scoped per application and per session. Exposure you can show the board moving down — not just a control checklist marked complete.' },
          { icon: 'clipboard', title: 'Audit & compliance readiness', body: 'Architectures mapped to HIPAA, PCI DSS, NIST CSF, and GDPR, with evidence generation built into the design — so an audit becomes a report you run, not a fire drill you survive.' },
          { icon: 'monitor', title: 'Board-ready clarity', body: 'Technical posture translated into the language a board funds: what is exposed, what it would cost, and what each phase of the roadmap actually buys down. Documentation written for the room, not the wiki.' },
          { icon: 'roadmap', title: 'Resilience through change', body: 'Mergers, cloud migration, and AI adoption handled without security becoming the thing that blocks the business — or the thing that breaks when the business moves fastest.' },
        ],
      },
      {
        blockType: 'serviceCards',
        anchor: 'services',
        heading: 'Services',
        subheading: 'Comprehensive security solutions designed for modern enterprises',
        items: [
          { tag: 'Strategy', title: 'Zero Trust Architecture & Strategy', bullets: [{ text: 'Zero Trust maturity assessments' }, { text: 'Architecture design and roadmap creation' }, { text: 'Identity-centric security planning' }, { text: 'Network perimeter elimination' }, { text: 'Trust boundary modeling' }] },
          { tag: 'Engineering', title: 'Zscaler Engineering & Implementation', bullets: [{ text: 'ZIA deployment & policy design' }, { text: 'ZPA deployment & App Connector architecture' }, { text: 'Internet security, TLS inspection, DLP' }, { text: 'Zscaler + IdP integration (Okta, Entra ID)' }, { text: 'Tenant recovery & performance tuning' }] },
          { tag: 'Identity', title: 'Secure Access & Identity Integration', bullets: [{ text: 'ZTNA for workforce & third-party access' }, { text: 'MFA, conditional access, identity hardening' }, { text: 'IAM modernization' }, { text: 'Continuous posture validation' }, { text: 'SSO architecture and rollout' }] },
          { tag: 'Cloud', title: 'Cloud & Network Security Engineering', bullets: [{ text: 'SASE strategy development' }, { text: 'Secure SD-WAN' }, { text: 'Cloud workload security (AWS / Azure)' }, { text: 'Segmentation & microsegmentation' }, { text: 'Inline DLP for GenAI workflows' }] },
          { tag: 'Assessment', title: 'Security Posture Assessments', bullets: [{ text: 'Zero Trust Maturity Model alignment' }, { text: 'PCI DSS, HIPAA, GDPR, NIST CSF gap analysis' }, { text: 'TLS 1.3 / QUIC encryption visibility audit' }, { text: 'AI attack-surface & agent-mode review' }, { text: 'Board-ready risk documentation' }] },
          { tag: 'Advisory', title: 'Architecture Advisory & Consulting', bullets: [{ text: 'CISO-level architecture advisory' }, { text: 'Documentation, diagrams, and training' }, { text: '3–12 month retainer with on-call escalation' }, { text: 'Migration planning & modernization' }, { text: 'Vendor selection guidance' }] },
        ],
      },
      {
        blockType: 'industryTiles',
        heading: 'Industry focus',
        subheading: 'We go deep in two regulated, high-stakes verticals — rather than thin across all of them.',
        items: [
          { icon: 'finance', title: 'Financial Services', lede: 'Zero Trust engineered for FDIC examinations and FFIEC expectations — built to exceed the regulatory baseline, not just pass it.', linkLabel: 'Explore financial services', href: '/finance' },
          { icon: 'healthcare', title: 'Healthcare', lede: 'Zero Trust for clinical environments — protecting patient data and the systems care depends on, from the EHR outward.', linkLabel: 'Explore healthcare', href: '/healthcare' },
        ],
      },
      {
        blockType: 'caseStudies',
        heading: 'Case Studies',
        subheading: 'Selected engagements across healthcare, financial services, and enterprise M&A.',
        ctaLabel: 'Request a full briefing',
        ctaHref: '#contact',
        items: [
          { title: 'Healthcare — First Zero Trust Clinic', summary: 'Designed and delivered the first enterprise Zero Trust healthcare clinic. Eliminated VPN dependency across clinical and administrative environments and deployed AI guardrail controls for clinical GenAI workflows.' },
          { title: 'Enterprise M&A — Merger Stabilization', summary: 'Primary security authority during a 120,000+ user enterprise merger experiencing production-blocking failures. Established a unified Zero Trust posture across both entities and recovered tenant stability.' },
          { title: 'Financial Services — ZT Program Recovery', summary: 'Recovered a Zero Trust initiative stalled in proof-of-concept for over two years. Re-architected the program for operational execution during a major brokerage merger — delivering results where previous efforts had failed.' },
        ],
      },
      {
        blockType: 'briefCards',
        heading: 'Technical Briefs',
        subheading: 'Sample analysis — the depth a brief delivers.',
        items: [
          { tag: 'Automation', title: 'Zscaler as Code', summary: 'Provisioning ZPA through Terraform, not the console.' },
          { tag: 'Data Protection', title: 'DLP in Layers', summary: 'Four enforcement points — and why endpoint is non-negotiable.' },
        ],
      },
      {
        blockType: 'laneCards',
        heading: 'How we engage',
        subheading: 'Three lanes, each scoped and priced up front. Start with a brief — not a contract.',
        items: [
          { tag: 'Design', title: 'Architecture & Strategy', forText: 'For programs that need a credible Zero Trust target state — and a roadmap that survives contact with the existing environment.', receiveLabel: 'You receive', receive: 'Reference architecture, maturity assessment, trust-boundary model, and a phased roadmap with board-ready documentation.', duration: '4–8 weeks · fixed scope' },
          { tag: 'Build', title: 'Zscaler Engineering & Recovery', forText: 'For deployments to stand up, stabilize, or escalate — including Tier-3 and Tier-4 incidents blocking production today.', receiveLabel: 'You receive', receive: 'Engineered ZIA / ZPA / ZDX configuration, identity integration, tenant recovery, and the runbooks to operate it.', duration: '2–10 weeks · scoped to the problem' },
          { tag: 'Advise', title: 'Advisory Retainer', forText: 'For teams that need principal-level judgment on call — for design reviews, escalations, and vendor decisions — without adding headcount.', receiveLabel: 'You receive', receive: 'Ongoing architecture review, escalation support, and roadmap and vendor-selection guidance.', duration: '3–12 month retainer' },
        ],
        note: 'Every engagement starts the same way — a technical brief, not a sales call. Tell us the constraint, and we respond within one business day with scope, deliverables, and a price.',
      },
      {
        blockType: 'faq',
        heading: 'FAQ',
        items: [
          { question: 'What is your engagement model?', answer: 'Structured scope, fixed deliverables, no retainer required to begin. Three lanes — Architecture & Strategy, Zscaler Engineering & Recovery, and Advisory — each with defined scope and measurable output. Advisory retainers run 3–12 months for teams needing principal-level input without the headcount.' },
          { question: 'Do you work alongside our existing security team?', answer: 'Yes — that is the normal case. We integrate with your team, transfer knowledge as the engagement runs, and leave documentation and runbooks so your staff owns the result. The goal is a capable internal team, not a permanent dependency on us.' },
          { question: 'Can you help with an active incident or outage?', answer: 'Yes. A significant share of our work is Tier-3 and Tier-4 escalation — production-blocking Zscaler failures, post-cutover instability, broken identity integration. We can engage on an expedited basis; tell us the impact and we will respond within one business day.' },
          { question: 'Which industries and compliance frameworks do you work within?', answer: 'Primarily healthcare, financial services, and enterprise M&A. Engagements are routinely mapped to HIPAA, PCI DSS, NIST CSF, and GDPR, with evidence and documentation designed to hold up under an audit rather than be assembled in a rush before one.' },
          { question: 'Do you resell Zscaler — and does that bias your recommendations?', answer: 'Arduwyn provides Zscaler licensing and procurement as part of a full engagement, so we can take a client from advisory through to managed services. But much of our work is for organizations that already own Zscaler or buy through a VAR — and the recommendations are identical either way. We size to what the architecture actually needs, and we will tell you when a different tool, or no additional spend, is the right answer.' },
          { question: 'How do engagements start, and how are they priced?', answer: 'Every engagement starts with a technical brief — a scoping conversation, not a sales pitch. From there, scope and deliverables are fixed and priced up front. No open-ended billing, and no retainer required to begin.' },
        ],
      },
      {
        blockType: 'cta',
        eyebrow: 'Engage',
        heading: 'Start with a technical brief.',
        body: 'Tell us the constraint — a stalled program, a merger, a Tier-3 escalation, or a Zero Trust target state you need defined. We respond within one business day.',
        buttons: [
          { label: 'hello@arduwyn.com', href: 'mailto:hello@arduwyn.com?subject=Technical%20Brief', style: 'primary' },
          { label: 'Explore services', href: '#services', style: 'ghost' },
        ],
      },
    ],
  })

  console.log('Done.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
