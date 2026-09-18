// ─── Naja Safety · shared site data (all copy preserved from original site) ───

export const SITE = {
  name: 'Naja Safety',
  tagline: 'Your trusted safety partner for training, consultancy & compliance across Malaysia.',
  phone: '016-730-1802',
  phoneIntl: '+60167301802',
  email: 'najasafety@gmail.com',
  address: '09-03, Blok C, Kompleks Austin Perdana, Taman Mount Austin, 81100 Johor Bahru, Johor, Malaysia',
  bizReg: '200603041203 (JM0449867-U)',
  cidcCode: 'PLSICW20231022-068',
  hrdcId: '62976',
}

export const WA_LINK = (msg: string) =>
  `https://wa.me/60167301802?text=${encodeURIComponent(msg)}`

export const CREDENTIALS = [
  { accreditation: 'CIDB SICW Training Provider', reference: 'PLSICW20231022-068', valid: '17 July 2027' },
  { accreditation: 'HRD Corp Accredited Trainer (James Issachar)', reference: '62976', valid: '23 December 2028' },
  { accreditation: 'SSM Business Registration (Borang D)', reference: '200603041203 (JM0449867-U)', valid: '14 July 2031' },
  { accreditation: 'MBJB Business Licence', reference: 'L2026LI072807', valid: '8 February 2027' },
]

export const CLIENTS = [
  'Econpile (M) Sdn Bhd', 'Gadang Engineering', 'Penta Ocean Malaysia', 'Obayashi Corporation',
  'Mudajaya Corporation', 'Zublin Precast Industries', 'AECOM Malaysia', 'GP Batteries (M)',
  'FMC Wellhead Equipment', 'Alstom Services', 'Shapadu Properties', 'YHL Engineering and Construction',
  'Kean Leng Construction', 'Sin Sin Construction', 'Cityneon Contract', 'GE Water & Process Technologies',
  'Nobel Power ESH Management', 'JVS HSE Resources', 'CIDB', 'Technip Geoproduction', 'Seien Rubber (M)',
  'Hiroyuki Industries (M)', 'Betara Kasa Sdn Bhd', 'Metro Wealth Polymer', 'Wearnes Electronics',
  'Empire Mammoth', 'Essenvest Construction', 'Cekap Jati', 'Matsuka',
]

export const DOCTRINE = [
  {
    title: 'Field-First Deployment',
    body: 'We do not run classrooms in isolation. Every programme is built from real site data, incident histories, and jurisdictional risk profiles specific to your facility.',
  },
  {
    title: 'Statutory Integration',
    body: 'Training is not separate from compliance. Every module maps directly to OSH Act 1994, CIDB Act 520, or DOSH regulations your site is legally bound to meet.',
  },
  {
    title: 'Continuous Accountability',
    body: 'Post-training support is not an add-on. We maintain audit-ready documentation and provide ongoing advisory for 90 days post-delivery to ensure sustained compliance.',
  },
  {
    title: 'Levy Optimisation',
    body: 'Mandatory safety training should never strain your budget. We architect every programme for HRD Corp claimability and efficient levy deployment under e-TRiS.',
  },
  {
    title: 'Cross-Capability Execution',
    body: 'One partner, full spectrum. From OSH-C appointment and safety training to on-site consultancy and compliance documentation, we close every operational gap without hand-off friction.',
  },
  {
    title: 'Measurable Compliance Artifacts',
    body: 'Every engagement delivers tangible outputs: certificates, audit reports, HIRARC registers, and DOSH-ready documentation you can present to inspectors immediately.',
  },
]

export const STATUTES = [
  {
    body: 'DOSH', badge: 'Effective 1 June 2024', title: 'OSH (Amendment) Act 2022',
    desc: 'The cornerstone of Malaysian workplace safety law. Key changes: the 5-worker OSH Coordinator mandate (Section 29A), RM500,000 corporate fines, director criminal liability, and expansion to ALL workplaces — not just factories.',
    link: '#/regulatory-hub', linkText: 'Read the statutory summary',
  },
  {
    body: 'CIDB', badge: 'Mandatory for all construction sites', title: 'CIDB Act 520 & CIS 25:2018',
    desc: 'Every construction worker must hold a valid Green Card (SICW). Contractors must appoint Site Safety Supervisors (SSS) for projects exceeding RM500,000. Non-compliance triggers project suspension.',
    link: '#/services/cidb-green-card-sicw', linkText: 'Green Card training details',
  },
  {
    body: 'USECHH', badge: 'Chemical health risk assessments', title: 'USECHH Regulations 2000',
    desc: 'Workplaces using scheduled chemicals must conduct a Chemical Health Risk Assessment (CHRA) by a DOSH-registered assessor. Naja Safety provides awareness training and documentation support to prepare your team.',
    link: '#/services/chemical-health-risk-assessment-chra', linkText: 'CHRA coordination support',
  },
  {
    body: 'NOISE', badge: 'Action level: 82 dB(A)', title: 'Noise Exposure Regulations 2019',
    desc: 'Replaced the 1989 regulations. The action level is now 82 dB(A), down from 85 dB(A). Employers must provide hearing conservation programmes, audiometric testing, and PPE for exposed workers.',
    link: '#/regulatory-hub', linkText: 'Explore compliance requirements',
  },
]

export const WHY_SAFETY_PAYS = [
  { title: 'Reduce and Eliminate Worker Injuries', body: 'Proactive safety systems catch hazards before they become incidents. Fewer injuries mean fewer lost workdays and less disruption.' },
  { title: 'Reduce Accident Costs', body: 'Every ringgit spent on prevention saves multiple ringgits in compensation, repairs, and legal exposure down the line.' },
  { title: 'Increase Productivity', body: 'Safe workplaces run smoother. When workers feel protected, morale rises and output stabilises.' },
  { title: 'Boost Employee Morale', body: 'Goodwill between employees and management grows when safety is visibly prioritised at every level.' },
  { title: 'Generate Good Will', body: 'Strong safety records strengthen your brand reputation with clients, regulators, and potential hires.' },
  { title: 'Lower Operating Costs', body: 'From insurance premiums to equipment downtime, a safe site is a leaner, more profitable site.' },
]

export const HIDDEN_COSTS = [
  'Product and material damage', 'Plant and building damage', 'Tool and equipment damage',
  'Legal costs', 'Emergency expenditure', 'First-aid supplies', 'Clearing site',
  'Production delays', 'Overtime working', 'Temporary labour', 'Investigation time',
  'Supervisor time diverted', 'Clerical efforts', 'Fines', 'Loss of expertise and experience',
]

export const HOME_FAQS = [
  {
    q: 'Are your training programmes HRD Corp claimable?',
    a: 'All of our training programmes led by Lead Trainer James Issachar (ID: 62976) are structured for HRD Corp grant pathways. Our corporate compliance team manages the complete documentation workflow to pull down active grants, protecting your company payroll from the rolling 24-month fund forfeiture rule established under Section 25 of the PSMB Act 2001.',
  },
  {
    q: 'Do you conduct on-site training at our premises?',
    a: 'We deliver training at your premises nationwide. Our trainers travel to your factory, construction site, or office — including Johor Bahru, Pasir Gudang, Sedenak, PTP, Iskandar Puteri, Skudai, and beyond.',
  },
  {
    q: 'What is a CIDB Green Card and do you provide it?',
    a: 'The CIDB Green Card (SICW) is a strict statutory mandate for every individual operating on a construction site across Malaysia. As an accredited provider under CIDB center code PLSICW20231022-068, we deliver accredited safety inductions directly on-site to certify your engineering and field workforces.',
  },
  {
    q: 'How long has Naja Safety been operating?',
    a: 'James Issachar has been an OSH consultant since May 2006 and principal consultant with Naja Safety since January 2015. The firm brings over 20 years of hands-on experience in manufacturing, construction, and safety consultancy.',
  },
  {
    q: 'Do you supply competent safety supervisors or environmental officers?',
    a: 'Beyond training, we supply competent Safety Supervisors and Environmental Officers to support your site compliance and project needs.',
  },
  {
    q: 'What certificates are provided after training?',
    a: 'Participants receive certificates of attendance or competency depending on the programme. CIDB-related courses include the necessary CIDB documentation.',
  },
  {
    q: 'Can training be customised for our company?',
    a: "Yes. We design customized, site-focused HSE frameworks built completely around your industry's specific HIRARC metrics. For small-to-medium operations crossing the 5-employee threshold, we fast-track internal team members through the official OSH Coordinator syllabus without disrupting operational output.",
  },
  {
    q: 'What industries do you serve?',
    a: 'We serve construction, manufacturing, engineering, oil & gas, and government-linked projects. Notable clients include Econpile, Gadang Engineering, Penta Ocean Malaysia, GP Batteries, and CIDB.',
  },
]

export const VIDEOS = [
  { src: '/assets/original/video-erp-training.mp4', title: 'ERP Training' },
  { src: '/assets/original/video-fire-fighting-briefing.mp4', title: 'Fire Fighting Briefing' },
  { src: '/assets/original/video-forklift-training.mp4', title: 'Forklift Training' },
  { src: '/assets/original/video-importance-of-osh.mp4', title: 'Importance of Occupational Safety & Health' },
  { src: '/assets/original/video-safety-training-fire-drill.mp4', title: 'Safety Training & Fire Drill' },
  { src: '/assets/original/video-scaffold-safety-awareness.mp4', title: 'Scaffold Safety Awareness Program' },
]

export const INDUSTRIES = [
  { name: 'Construction', note: 'CIDB, WAH, scaffolding' },
  { name: 'Manufacturing', note: 'Machinery, chemical, audit' },
  { name: 'Engineering', note: 'EPC, oil & gas support' },
  { name: 'Government / GLC', note: 'Compliance, documentation' },
]

export const SOUTHERN_HUBS = [
  'Tebrau Industrial Estate', 'Pasir Gudang Ports', 'Senai Aviation Parks',
  'Pengerang RAPID Complexes', 'Iskandar Puteri', 'Skudai Manufacturing Corridors',
]
