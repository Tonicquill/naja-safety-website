// ─── Course detail pages, guide, locations, article — verbatim copy ───

export interface CourseDetail {
  slug: string
  crumb: string
  title: string
  intro: string
  bullets: string[]
  syllabus: { title: string; body?: string }[]
  outcomes: string[]
  audience: { title: string; body: string }[]
  specs: { label: string; value: string }[]
  related: { name: string; note: string; route: string }[]
  faqs: { q: string; a: string }[]
  ctaTitle: string
  ctaBody: string
  image: string
  durationTag: string
  modeTag: string
}

export const COURSE_DETAILS: CourseDetail[] = [
  {
    slug: 'scaffold-safety',
    crumb: 'Courses / Scaffold Safety',
    title: 'Scaffold Safety Awareness Program',
    intro: 'Practical scaffold erection, inspection, and dismantling training for construction sites. On-site delivery with real equipment demonstrations.',
    image: '/assets/original/course-scaffold.jpg',
    durationTag: '1 Day',
    modeTag: 'On-site preferred',
    bullets: [
      'Types of scaffolding systems and components',
      'Safe erection and dismantling procedures',
      'Load capacities and weight limitations',
      'Daily inspection checklists and tagging systems',
      'Fall prevention and edge protection',
      'Malaysian construction safety regulations and CIDB alignment',
    ],
    syllabus: [
      { title: 'Scaffold types and components identification' },
      { title: 'Safe erection and dismantling procedures' },
      { title: 'Load capacities and weight limitations' },
      { title: 'Daily inspection checklists and tagging systems' },
      { title: 'Fall prevention and edge protection' },
      { title: 'Malaysian construction safety regulations and CIDB alignment' },
      { title: 'Practical hands-on demonstration' },
    ],
    outcomes: [
      'Identify common scaffold types and components correctly',
      'Erect and dismantle scaffolding following safe procedures',
      'Calculate and respect load capacities and weight limitations',
      'Conduct daily inspections and implement tagging systems',
      'Apply fall prevention and edge protection measures effectively',
      'Demonstrate compliance with Malaysian construction safety regulations and CIDB standards',
    ],
    audience: [
      { title: 'Scaffold Erectors & Dismantlers', body: 'Workers directly involved in building and taking down scaffold structures who need hands-on safety skills.' },
      { title: 'Site Supervisors & Safety Officers', body: 'Site leaders responsible for overseeing safe scaffold operations and enforcing compliance on the ground.' },
      { title: 'Project Managers & Engineers', body: 'Management personnel who need to understand scaffold risks, resource planning, and regulatory requirements.' },
    ],
    specs: [
      { label: 'Duration', value: '1 day' },
      { label: 'Delivery Mode', value: 'On-site preferred / Classroom' },
      { label: 'Certification', value: 'Certificate of Attendance' },
      { label: 'Max Participants', value: '20' },
      { label: 'Language', value: 'English / Bahasa Melayu' },
      { label: 'Prerequisites', value: 'Basic construction safety awareness' },
      { label: 'HRD Corp Claimable', value: 'Yes, Trainer ID 62976' },
    ],
    related: [
      { name: 'CIDB Green Card', note: 'Mandatory construction induction certification', route: '#/services/cidb-green-card-sicw' },
      { name: 'OSH Coordinator', note: 'Statutory OSH compliance for 5+ employees', route: '#/services/osh-coordinator-section-29a' },
      { name: 'Chemical Safety', note: 'Hazardous material safety protocols', route: '#/courses/chemical-handling' },
    ],
    faqs: [
      { q: 'What is covered in the Scaffold Safety Awareness Program?', a: 'The programme covers scaffold types and components, safe erection and dismantling procedures, load capacities, inspection checklists, fall prevention, and regulatory compliance under Malaysian construction safety standards.' },
      { q: 'Who should attend scaffold safety training?', a: 'Scaffold erectors, site supervisors, safety officers, project managers, and any worker involved in erecting, using, or inspecting scaffolding on Malaysian construction sites should attend.' },
      { q: 'How long is the Scaffold Safety Awareness course?', a: "Naja Safety's Scaffold Safety Awareness Program is typically delivered over 1 day, combining classroom theory with hands-on practical demonstrations at your site." },
      { q: 'Do you provide on-site scaffold safety training?', a: 'We strongly recommend on-site delivery so trainers can assess your actual scaffold configurations, demonstrate proper techniques using your equipment, and tailor the programme to your site\'s specific risks.' },
      { q: 'Is this training HRD Corp claimable?', a: 'Scaffold Safety Awareness is HRD Corp claimable when delivered by our accredited trainer (ID 62976), subject to active balance thresholds and e-TRiS grant approvals.' },
    ],
    ctaTitle: 'Reduce Scaffold Risk On Your Site',
    ctaBody: 'One day of practical scaffold safety training can prevent months of project delays and protect your workers from preventable falls. Book on-site delivery anywhere in Malaysia.',
  },
  {
    slug: 'chemical-handling',
    crumb: 'Courses / Chemical Safety',
    title: 'Chemical Safety Training',
    intro: 'Safe handling, storage, labelling, and emergency response for hazardous chemicals in the workplace. Classroom and on-site delivery across Malaysia.',
    image: '/assets/original/course-hirarc.jpg',
    durationTag: '1 Day',
    modeTag: 'Classroom / On-site',
    bullets: [
      'Chemical hazard classification and pictogram recognition',
      'Reading and applying Safety Data Sheets (SDS)',
      'Proper handling, storage, and segregation techniques',
      'Chemical labelling and inventory requirements',
      'Personal Protective Equipment selection for chemical tasks',
      'Spill containment, clean-up, and emergency response',
      'Malaysian regulatory requirements under OSHA and Environmental Quality Act',
    ],
    syllabus: [
      { title: 'Chemical hazard classification and pictogram recognition', body: 'Understand GHS classifications and interpret hazard pictograms for safe chemical identification.' },
      { title: 'Reading and applying Safety Data Sheets (SDS)', body: 'Learn to extract critical information from SDS documents and apply them in real workplace scenarios.' },
      { title: 'Proper handling, storage, and segregation techniques', body: 'Master safe chemical handling procedures and correct storage segregation to prevent incompatible reactions.' },
      { title: 'Chemical labelling and inventory requirements', body: 'Ensure compliance with chemical labelling standards and maintain accurate chemical inventory records.' },
      { title: 'Personal Protective Equipment selection for chemical tasks', body: 'Select appropriate PPE based on chemical hazards and exposure routes identified in risk assessments.' },
      { title: 'Spill containment, clean-up, and emergency response', body: 'Respond effectively to chemical spills with proper containment, clean-up, and emergency protocols.' },
      { title: 'Malaysian regulatory requirements under OSHA and Environmental Quality Act', body: 'Navigate key Malaysian chemical safety regulations including OSHA 1994 and Environmental Quality Act 1974.' },
      { title: 'Practical chemical risk assessment exercise', body: 'Apply learned concepts through hands-on chemical risk assessment exercises tailored to workplace scenarios.' },
    ],
    outcomes: [
      'Identify and classify chemical hazards using GHS pictograms and hazard statements',
      'Interpret and apply Safety Data Sheets (SDS) to everyday chemical handling tasks',
      'Implement safe chemical storage, segregation, and labelling practices in compliance with Malaysian law',
      'Select suitable Personal Protective Equipment for specific chemical exposure risks',
      'Execute spill containment, clean-up, and emergency response procedures confidently',
      'Conduct practical chemical risk assessments aligned with OSHA 1994 and Environmental Quality Act 1974',
    ],
    audience: [
      { title: 'Safety Officers & EHS Personnel', body: 'Professionals responsible for workplace safety compliance, hazard management, and environmental health programmes.' },
      { title: 'Warehouse Supervisors & Storekeepers', body: 'Staff overseeing chemical storage, inventory control, and safe material movement within warehouse and depot environments.' },
      { title: 'Production Staff & Chemical Handlers', body: 'Frontline workers and operators who directly handle, mix, transport, or dispose of hazardous chemicals in daily operations.' },
    ],
    specs: [
      { label: 'Duration', value: '1 day' },
      { label: 'Delivery Mode', value: 'Classroom / On-site' },
      { label: 'Certification', value: 'Certificate of Attendance' },
      { label: 'Max Participants', value: '25' },
      { label: 'Language', value: 'English / Bahasa Melayu' },
      { label: 'Prerequisites', value: 'Basic workplace safety awareness' },
      { label: 'HRD Corp Claimable', value: 'Yes, Trainer ID 62976' },
      { label: 'Customisable', value: 'Yes — tailored to your chemical inventory' },
    ],
    related: [
      { name: 'OSH Coordinator', note: 'Workplace OSH statutory compliance', route: '#/services/osh-coordinator-section-29a' },
      { name: 'CIDB Green Card', note: 'Construction site induction certification', route: '#/services/cidb-green-card-sicw' },
      { name: 'Scaffold Safety', note: 'Scaffold erection and inspection safety', route: '#/courses/scaffold-safety' },
    ],
    faqs: [
      { q: 'What topics are covered in Chemical Safety training?', a: 'The course covers chemical hazard identification, Safety Data Sheet (SDS) comprehension, proper handling and storage techniques, labelling requirements, Personal Protective Equipment selection, spill containment, and emergency response protocols.' },
      { q: 'Who should attend Chemical Safety training?', a: 'Anyone who handles, stores, transports, or supervises work involving hazardous chemicals should attend. This includes safety officers, warehouse staff, production operators, lab technicians, and facility managers.' },
      { q: 'How long is the Chemical Safety course?', a: "Naja Safety's Chemical Safety training is typically a 1-day programme, delivered either at our Johor Bahru training centre or on-site at your facility." },
      { q: 'Is Chemical Safety training HRD Corp claimable?', a: 'Chemical Safety training is HRD Corp claimable when delivered by our accredited trainer (ID 62976), subject to active balance thresholds and e-TRiS grant approvals.' },
      { q: 'Can the training be customised for our specific chemicals?', a: 'We can tailor the programme to address the specific chemicals, processes, and risks present at your facility. Please share your chemical inventory and SDS files when booking so we can customise the content.' },
    ],
    ctaTitle: 'Protect Your Team From Chemical Hazards',
    ctaBody: 'One day of chemical safety training reduces incident risk, ensures regulatory compliance, and builds workforce confidence when handling hazardous substances.',
  },
]

export const GUIDE_INDUSTRIES = [
  {
    name: 'Manufacturing', sub: 'Factories, assembly plants, and production facilities.',
    mandatory: ['Safety & Health Committee Training — if 40+ employees', 'First Aid & CPR — designated first-aiders', 'HIRARC — if 5+ employees', 'Chemical Exposure Monitoring & CHRA — if scheduled chemicals', 'Noise Mapping — if >82 dB(A)', 'LEV Inspection — if LEV installed'],
    recommended: ['Forklift & Machinery Safety', 'Electrical Safety', 'Emergency Response & Fire Safety', 'Safety Audit & Inspection Techniques', 'Ergonomics Risk Assessment (ERA)', 'Supply of Competent Safety Supervisor'],
    note: 'Most programmes above are HRD Corp claimable. We also supply PPE, safety signages, and first aid equipment.',
  },
  {
    name: 'Construction', sub: 'Building, civil engineering, and infrastructure projects.',
    mandatory: ['CIDB Green Card (SICW) — all site personnel', 'Working at Height (WAH) — elevated work', 'Scaffold Safety Awareness — if scaffolding used', 'Site Safety Management'],
    recommended: ['Safety Induction & Awareness', 'Toolbox Talk & Safety Briefings', 'Pre-Construction Hazard Identification', 'Accident-Elimination Frameworks', 'Incident & Accident Investigation', 'Supply of Competent Safety Supervisor'],
    note: 'We are an accredited CIDB provider (Center Code: PLSICW20231022-068). All construction training can be delivered on-site nationwide.',
  },
  {
    name: 'Warehouse & Logistics', sub: 'Distribution centres, storage yards, and material handling.',
    mandatory: ['Forklift & Machinery Safety', 'Safety & Health Committee Training — if 40+ employees', 'First Aid & CPR', 'HIRARC — if 5+ employees'],
    recommended: ['Advanced Warehouse Logistics & High-Racking Auditing', 'Emergency Response & Fire Safety', 'Electrical Safety', 'Safety Documentation Support', 'Supply of PPE & Safety Signages'],
    note: 'Most programmes above are HRD Corp claimable. We also supply PPE, safety signages, and first aid equipment.',
  },
  {
    name: 'Chemical & Process', sub: 'Chemical manufacturing, laboratories, and processing plants.',
    mandatory: ['Chemical Safety', 'Chemical Health Risk Assessment (CHRA)', 'Chemical Exposure Monitoring', 'LEV Inspection — if LEV installed', 'Emergency Response & Fire Safety', 'HIRARC — if 5+ employees'],
    recommended: ['First Aid & CPR', 'Safety Audit & Inspection Techniques', 'Industrial Waste Management & Environmental Advisory', 'Safety Documentation Support'],
    note: 'Most programmes above are HRD Corp claimable. We also supply PPE, safety signages, and first aid equipment.',
  },
  {
    name: 'Commercial & Office', sub: 'Corporate offices, retail, and service-based businesses.',
    mandatory: ['Safety & Health Committee Training — if 40+ employees', 'First Aid & CPR', 'Emergency Response & Fire Safety', 'HIRARC — if 5+ employees'],
    recommended: ['Electrical Safety', 'Ergonomics Risk Assessment (ERA)', 'Safety Assessments & Compliance Advisory', 'Safety Documentation Support', 'Safety Signages & First Aid Equipment'],
    note: 'Most programmes above are HRD Corp claimable. We also supply PPE, safety signages, and first aid equipment.',
  },
  {
    name: 'Oil & Gas', sub: 'Upstream, midstream, and downstream energy operations.',
    mandatory: ['Working at Height (WAH)', 'Fall Protection Engineering', 'Chemical Safety', 'Emergency Response & Fire Safety', 'First Aid & CPR', 'HIRARC'],
    recommended: ['Safety Audit & Inspection Techniques', 'Incident & Accident Investigation', 'Chemical Exposure Monitoring', 'Noise Mapping & Monitoring', 'Industrial Waste Management & Environmental Advisory', 'Supply of Competent Safety Supervisor'],
    note: 'Most programmes above are HRD Corp claimable. We also supply PPE, safety signages, and first aid equipment.',
  },
]

export const GUIDE_TRIGGERS = [
  { q: 'We have 40+ employees — what safety training is mandatory?', a: 'Under the OSH (Safety and Health Committee) Regulations 1996, any workplace with 40 or more employees must establish a Safety and Health Committee and ensure members receive certified training. You also need designated first-aiders, emergency response protocols, and a current HIRARC register. Naja Safety delivers all of these on-site or in-classroom.' },
  { q: 'A DOSH audit is coming — what should we prepare?', a: 'Prepare a complete HIRARC register, updated machinery registers (PMA/PMT), Safety and Health Committee records, first-aider certificates, and evidence of OSH Coordinator appointment. We conduct pre-audit gap assessments and supply competent Safety Supervisors to help you pass cleanly.' },
  { q: 'We are starting a CIDB project — what do our workers need?', a: 'Every individual on a construction site must hold a valid CIDB Green Card (SICW). Depending on the work scope, additional training may include Working at Height, Scaffold Safety, and Site Safety Management. We are an accredited CIDB provider (Center Code: PLSICW20231022-068) and deliver all training on-site.' },
  { q: 'We handle scheduled chemicals — what is required by law?', a: 'Under the USECHH Regulations 2000, you must conduct a Chemical Health Risk Assessment (CHRA), implement exposure monitoring, and provide chemical safety training to all affected workers. If you use LEV systems, they must be inspected periodically. We provide CHRA, exposure monitoring, LEV inspection, and chemical safety training.' },
  { q: 'Our factory noise exceeds 82 dB(A) — what must we do?', a: 'The Occupational Safety and Health (Noise Exposure) Regulations 2019 require a comprehensive noise survey and hearing conservation programme. The new action level is 82 dB(A). We conduct calibrated noise mapping and dosimetry to identify affected zones and recommend engineering controls, administrative controls, and PPE.' },
  { q: 'We have a Local Exhaust Ventilation (LEV) system — does it need inspection?', a: 'Yes. LEV systems must be thoroughly examined to verify capture velocity, airflow rates, and system integrity. Our inspection covers hoods, ducts, filters, and fans, with documentation aligned to DOSH inspection criteria.' },
  { q: 'Our HRD Corp levy is expiring — which courses are claimable?', a: 'Most of our OSH and CIDB training programmes are claimable under HRD Corp, led by James Issachar (Trainer ID: 62976). We guide you through e-TRiS grant applications so your training investment is recoverable before the rolling 24-month forfeiture threshold.' },
  { q: 'We need a competent Safety Supervisor on site — can you supply one?', a: 'Yes. Beyond training, we supply competent Safety Supervisors and Environmental Officers to support your site compliance and project needs.' },
  { q: 'How do we know if our business needs a Chemical Health Risk Assessment (CHRA)?', a: 'If your workplace uses any scheduled chemicals listed under the USECHH Regulations 2000 — including solvents, acids, heavy metals, or toxic gases — a CHRA is mandatory. We evaluate your chemical inventory and conduct the full assessment.' },
]

export const LOCATIONS = [
  { state: 'Johor', base: 'Primary base: Johor Bahru (Mount Austin). Regular coverage of Tebrau, Pasir Gudang, Senai, Pengerang, Iskandar Puteri, and Skudai. Same-day site visits available.', services: ['OSH Coordinator (OSH-C) training', 'CIDB Green Card (SICW) on-site', 'Chemical Safety & CHRA', 'Scaffold & Working at Height'] },
  { state: 'Selangor & Kuala Lumpur', base: 'Monthly scheduled runs to Shah Alam, Petaling Jaya, Subang, Klang, and Kuala Lumpur city centre. Ideal for central-region companies with multiple sites.', services: ['HIRARC & Risk Management', 'Safety Audit & Inspection', 'First Aid & CPR certification', 'Forklift & MEWP training'] },
  { state: 'Melaka', base: 'Bi-monthly training blocks in Ayer Keroh and Melaka city. Popular with manufacturing clients in the industrial zones.', services: ['Fire Safety & Emergency Response', 'Chemical Handling & Spill Control', 'Noise Monitoring & LEV Inspection'] },
  { state: 'Perak', base: 'On-demand deployment to Ipoh, Batu Gajah, and Kampar. Suitable for mining, plantation, and manufacturing sites.', services: ['OSH Monitoring & Assessments', 'Environmental Officer Training', 'Waste Management Compliance'] },
  { state: 'Penang', base: 'Quarterly runs to George Town and Bayan Lepas. Strong demand from electronics and semiconductor manufacturing clusters.', services: ['Chemical Health Risk Assessment (CHRA)', 'Air Quality Sampling', 'Industrial Hygiene Consultancy'] },
  { state: 'Negeri Sembilan', base: 'Scheduled visits to Seremban, Port Dickson, and Nilai. Serving oil & gas support services and construction contractors.', services: ['Working at Height (WAH)', 'Demolition Safety', 'Temporary Works Coordination'] },
]
