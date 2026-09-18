// ─── Services page: 7 categories, every programme with full copy ───

export interface ServiceItem {
  title: string
  desc: string
  target: string
  detailRoute?: string
}

export interface ServiceCategory {
  key: string
  name: string
  intro: string
  notice?: string
  items: ServiceItem[]
  enquiry: string
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    key: 'A',
    name: 'OSH Training',
    intro: 'Comprehensive Occupational Safety and Health programmes designed for Malaysian workplaces. Delivered on-site or in-classroom by experienced practitioners.',
    enquiry: 'Enquire about OSH Training',
    items: [
      { title: 'OSH Coordinator (Section 29A)', desc: 'Statutory appointment training for OSH Coordinators mandated under Section 29A of the OSH (Amendment) Act 2022. Covers legal duties, hazard reporting workflows, and emergency coordination for workplaces with 5+ employees.', target: 'All workplaces with 5 or more employees required to appoint an OSH Coordinator under Malaysian law.', detailRoute: '#/services/osh-coordinator-section-29a' },
      { title: 'Incident & Accident Investigation', desc: 'Comprehensive training covering root-cause analysis, evidence gathering, and compliance reporting frameworks under NADOPOD Regulations 2004.', target: 'HSE Committee Members, Operational Managers, and HR Directors tasked with handling workplace accident response.' },
      { title: 'Safety & Health Committee Training', desc: 'Strategic implementation steps to establish, train, and run an effective, compliant internal safety council under the OSH (Safety and Health Committee) Regulations 1996.', target: 'Mandatory for all enterprises employing 40 or more workers, or operations handling high-risk chemical/mechanical manufacturing.' },
      { title: 'Chemical Safety', desc: 'Practical handling procedures, personal protective equipment (PPE) deployment, and emergency spillage controls under USECHH Regulations 2000.', target: 'Factory operators, lab technicians, and warehouse logistics teams handling hazardous or scheduled toxic wastes.', detailRoute: '#/courses/chemical-handling' },
      { title: 'Electrical Safety', desc: 'Specialized risk awareness training highlighting high-voltage mitigation protocols, lockout-tagout (LOTO) isolation workflows, and shock prevention.', target: 'Plant maintenance technicians, facilities engineers, and mechanical repair crews working around live heavy machinery.' },
      { title: 'Emergency Response & Fire Safety', desc: 'Comprehensive crisis command structures, fire fighting equipment handling, and coordinated building evacuation drill management.', target: 'Appointed internal Emergency Response Team (ERT) captains, floor wardens, and security operations managers.' },
      { title: 'First Aid & CPR', desc: 'Certified life support instruction covering basic first aid, automated external defibrillator (AED) usage, choking management, and wound stabilization.', target: 'Mandatory for designated workplace first-aiders, factory supervisors, and project operations leads.' },
      { title: 'Forklift & Machinery Safety', desc: 'Rigorous operational competency training covering pre-shift equipment check sheets, payload center-of-gravity calculations, and safe rack maneuvering.', target: 'Material handlers, warehouse forklift drivers, and logistics fleet operators within manufacturing plants.' },
      { title: 'Advanced Warehouse Logistics & High-Racking Structural Auditing Operations', desc: 'Advanced competency training for warehouse operations managers covering high-racking load distribution analysis, pallet racking structural integrity audits, and aisle safety compliance under Malaysian Factory and Machinery Act 1967.', target: 'Warehouse operations directors, logistics fleet managers, and distribution center supervisors responsible for multi-tier storage facilities and high-volume inventory throughput.' },
      { title: 'HIRARC & Risk Management', desc: 'Clear, actionable frameworks for mapping out Hazard Identification, Risk Assessment, and Risk Control models to meet strict statutory inspection criteria.', target: 'Operations directors, safety executives, and project planners needing to eliminate structural workplace liabilities.', detailRoute: '#/services/hirarc-risk-management' },
      { title: 'Safety Audit & Inspection Techniques', desc: 'Practical methodology training for conducting regular internal site hazard audits, identifying compliance gaps, and constructing corrective action reports.', target: 'Internal safety auditors, operational supervisors, and plant managers preparing for formal government evaluations.', detailRoute: '#/services/safety-audit-inspection' },
      { title: 'Ergonomics Awareness & Industrial Workstation Posture Optimization', desc: 'Scientific workstation analysis and musculoskeletal disorder (MSD) prevention training covering repetitive strain injury (RSI) mapping, anthropometric workstation redesign, and ergonomic compliance benchmarking.', target: 'Occupational health nurses, industrial hygienists, HR wellness coordinators, and factory line supervisors managing seated assembly or repetitive manual handling tasks.' },
      { title: 'Tailor-Made HSE Programmes', desc: "Completely customized safety modules engineered directly from your company's historic site incident data and industry risk matrices.", target: 'Heavy industrial operations, multi-national logistics setups, and unique operational plants looking for specific corporate risk reduction.' },
    ],
  },
  {
    key: 'B',
    name: 'CIDB & Construction Safety Training',
    intro: 'CIDB-certified instruction for construction sites. We cover everything from induction to scaffold safety — and we come to your site.',
    notice: 'Note: We conduct CIDB Green Card training across Johor Bahru, Pasir Gudang, Sedenak, and nationwide.',
    enquiry: 'Enquire about CIDB Training',
    items: [
      { title: 'Safety Induction & Awareness', desc: 'Core foundations of the construction safety landscape, site risk identification, and mandatory safety gear guidelines for civil projects.', target: 'General laborers, project engineers, and sub-contractor crews entering active development plots.' },
      { title: 'Working at Height (WAH) Safety', desc: 'Specialized training focusing on fall arrest system configurations, full-body harness anchorage tracking, and safe mobile elevated work platform operations.', target: 'Roofing specialists, high-elevation painters, civil structural welders, and facade maintenance technicians.', detailRoute: '#/services/working-at-height-wah' },
      { title: 'Fall Protection Engineering & Technical Structural Anchor Auditing', desc: 'Engineering-grade instruction on fall arrest system design, permanent anchor point load testing, and structural connection verification for elevated construction and maintenance environments.', target: 'Structural engineers, rigging specialists, and construction safety officers overseeing vertical facade work, steel erection, and high-rise infrastructure projects.' },
      { title: 'Site Safety Management', desc: 'Master compliance management structures tailored to coordinate multi-tier subcontractor arrays and ensure full CIDB structural compliance.', target: 'Main contractor project managers, site safety directors, and development consultants.' },
      { title: 'Toolbox Talk & Safety Briefings', desc: 'Practical frameworks for delivering impactful daily pre-shift safety briefings that reinforce hazard awareness and site safety rules on the ground.', target: 'Site foremen, construction team leads, and safety supervisors managing daily shift turnarounds.' },
      { title: 'Green Card Related Training (SICW / CIDB Green Card)', desc: 'Official accredited safety induction program required under the CIDB Act to secure full, legal access to all construction zones across Malaysia.', target: 'Every individual operating on or visiting an active construction development—including site engineers, suppliers, and safety managers.', detailRoute: '#/services/cidb-green-card-sicw' },
      { title: 'Scaffold Safety Awareness Program', desc: 'Technical structural integrity training covering load limits, bracing setups, safe tie-back anchoring, and official inspection routines.', target: 'Scaffold assemblers, on-site safety inspectors, and structural development supervisors.', detailRoute: '#/courses/scaffold-safety' },
    ],
  },
  {
    key: 'C',
    name: 'Safety Consultancy & Support',
    intro: 'Beyond training, we embed ourselves as your external compliance shield. Under the Occupational Safety and Health Act 1994 (Act 514) and the OSH (Amendment) Act 2022, companies face mandatory compliance requirements. Non-compliance means heavy fines and stop-work orders.',
    enquiry: 'Enquire about Consultancy',
    items: [
      { title: 'Workplace Safety Assessments', desc: 'Complete structural facility safety evaluations designed to locate latent risk variables and establish reliable compliance baselines ahead of official audits.', target: 'Corporate boards, manufacturing executives, and business owners looking to verify their current legal protection standing.' },
      { title: 'Compliance & Risk Advisory', desc: 'Clear guidance navigating the latest mandates of the OSH (Amendment) Act 2022, helping organizations avoid costly legal non-compliance penalties.', target: 'Small-to-medium enterprise (SME) directors transitioning their business practices to meet newly enforced safety thresholds.' },
      { title: 'Safety Documentation Support', desc: 'Professional preparation and maintenance of mandatory statutory records, including official machinery registers (PMA/PMT), SOP books, and safety policies.', target: 'Administrative managers and operations coordinators facing administrative backlogs ahead of compliance updates.' },
      { title: 'Environmental Compliance Coordination & Training', desc: 'Awareness training and coordination support for DOE environmental requirements, including waste handling protocols, labelling standards, and liaison with licensed environmental consultants.', target: 'Manufacturing plants, chemical facilities, and industrial operations facing environmental compliance audits or expanding production capacity.' },
    ],
  },
  {
    key: 'D',
    name: 'HRD Corp Training Support',
    intro: 'James Issachar is HRD Corp-certified (Trainer ID: 62976). Your mandatory safety training may be claimable against your HRD Corp levy, subject to active balance thresholds and e-TRiS grant approvals. We help you navigate the claim process — turning compliance into a recoverable investment.',
    enquiry: 'Enquire about HRD Corp Support',
    items: [
      { title: 'Guidance on Claimable Training Programmes', desc: "Detailed assessment mapping Naja Safety's complete course catalog directly against your company's available HRD Corp fund balance.", target: 'HR managers and human resource executives planning their corporate skills development timelines.' },
      { title: 'Grant & Funding Assistance', desc: 'Step-by-step assistance navigating the official e-TRiS online platform to ensure training grants are approved smoothly before classes begin.', target: 'Financial managers and training coordinators looking for direct support navigating the application system.' },
      { title: 'Claim Process Support', desc: 'Administrative management handling post-training documentation, attendance tracking, and invoice validation to ensure smooth, efficient funding disbursements.', target: 'Accounting executives and finance departments looking to avoid administrative friction during reimbursement tracking.' },
      { title: 'Training Budget Optimisation', desc: 'Strategic planning to deploy training funds effectively, ensuring your contributions are utilised before the rolling expiry window closes. Subject to HRD Corp eligibility and active balance thresholds.', target: 'Finance directors and company owners looking to protect their paid tax levies from automatic system forfeiture.' },
    ],
  },
  {
    key: 'E',
    name: 'Industrial Waste & Environmental Awareness',
    intro: 'Environmental compliance awareness and training for manufacturing plants, chemical facilities, and industrial operations facing DOE statutory audits or expanding production capacity.',
    notice: 'Important: Wastewater treatment, air pollution control, and scheduled-waste disposal require DOE-licensed consultants and certified treatment operators. Naja Safety provides awareness training, documentation support, and compliance coordination. We do not perform statutory environmental assessments or operate treatment systems directly.',
    enquiry: 'Enquire about Environmental Awareness',
    items: [
      { title: 'Disposal & Recycling Awareness', desc: 'Training on waste-stream classification, scheduled-waste handling, and coordination with licensed disposal contractors aligned with DOE requirements.', target: 'Plant managers and EHS officers responsible for hazardous waste manifests and scheduled waste consignment notes.' },
      { title: 'Spill Response & Containment Training', desc: 'Practical emergency-response training for chemical spills, including containment, segregation, and initial decontamination protocols for on-site response teams.', target: 'Operations teams and emergency response teams preparing for chemical spill events within plant boundaries.' },
      { title: 'Waste Storage Compliance Training', desc: 'Training on regulatory-compliant storage layout, secondary containment, and segregation protocols for incompatible waste categories under DOE guidelines.', target: 'Facilities managers setting up new storage yards or retrofitting existing waste compounds to meet DOE inspection standards.' },
      { title: 'Waste & Chemical Labeling', desc: 'Hazard-communication labeling aligned with DOSH, EPA, and GHS standards — ensuring every container carries compliant identification.', target: 'Warehouse supervisors and chemical handlers managing inventory turnover and drum re-labeling programmes.' },
      { title: 'Wastewater Management Awareness', desc: 'Training on effluent management basics, discharge parameters, and coordination with licensed treatment operators under the Environmental Quality Act 1974.', target: 'Process engineers and utilities managers overseeing effluent treatment plants (ETP) or planning capacity upgrades.' },
      { title: 'Air Pollution Control Awareness', desc: 'Training on emission parameters, stack-testing coordination, and liaison with licensed environmental consultants for DOE air-quality licensing compliance.', target: 'Environmental compliance officers and plant directors operating boilers, furnaces, or spray-booth installations.' },
    ],
  },
  {
    key: 'F',
    name: 'Construction Safety & Accident Elimination',
    intro: 'Elite solution provider for building-construction risk reduction. We do not just react to incidents — we engineer them out before the first brick is laid.',
    enquiry: 'Enquire about Construction Safety',
    items: [
      { title: 'Pre-Construction Hazard Identification', desc: 'Systematic hazard identification and risk-ranking during the design and planning phase, before ground is broken.', target: 'Project developers, architects, and main contractors preparing CIDB-compliant safety plans for tender submission.' },
      { title: 'Accident-Elimination Frameworks', desc: 'Proactive structural frameworks that replace reactive incident response with upstream risk controls, barrier analysis, and behavioural safety programmes.', target: 'Site safety directors and project managers accountable for Lost Time Injury Frequency Rate (LTIFR) targets.' },
      { title: 'CIDB Statutory Compliance Integration', desc: 'Full integration with CIDB Act requirements, including Green Card induction, scaffolding permits, and site-safety supervisor deployment.', target: 'Construction firms bidding for government or private-sector projects requiring CIDB-grade safety documentation.' },
      { title: 'On-Site Real-Time Risk Mitigation', desc: 'Embedded safety practitioners deployed to active construction sites for daily hazard walks, toolbox talks, and immediate corrective-action sign-offs.', target: 'Fast-track civil projects and high-rise developments where safety headcount cannot keep pace with construction velocity.' },
    ],
  },
  {
    key: 'G',
    name: 'OSH Monitoring & Assessments',
    intro: 'Training and coordination programmes to prepare your team for DOSH-mandated assessments and build internal competency in industrial hygiene awareness.',
    notice: 'Important: Chemical Health Risk Assessments (CHRA), noise risk assessments, and LEV inspections require DOSH-registered assessors. Naja Safety provides training, documentation support, and coordination to prepare your workplace and interface with registered third-party assessors. We do not conduct statutory assessments directly.',
    enquiry: 'Enquire about Monitoring & Assessments',
    items: [
      { title: 'Chemical Exposure Awareness & Monitoring Coordination', desc: 'Training on exposure awareness, PEL interpretation, and coordination with registered occupational hygienists for quantitative air sampling under USECHH Regulations 2000.', target: 'Manufacturing plants, chemical processing facilities, and workshops handling scheduled toxic substances or volatile organic compounds.' },
      { title: 'Local Exhaust Ventilation (LEV) Awareness & Inspection Coordination', desc: 'Training on LEV system fundamentals, visual inspection protocols, and coordination with registered assessors for thorough examination of hoods, ducts, filters, and fans.', target: 'Metalworking shops, spray booths, welding stations, and any facility relying on extraction systems to control airborne contaminants.' },
      { title: 'Noise Exposure Awareness & Assessment Coordination', desc: 'Training on hearing conservation zones, dosimetry basics, and coordination with registered Noise Risk Assessors for compliance under the Occupational Safety and Health (Noise Exposure) Regulations 2019.', target: 'Heavy manufacturing, foundries, textile plants, and construction yards where sustained noise levels exceed 82 dB(A).' },
      { title: 'Chemical Health Risk Assessment (CHRA) Awareness & Preparation', desc: 'Training and documentation support to prepare your workplace for CHRA compliance under USECHH Regulations 2000. We coordinate with registered Chemical Health Risk Assessors for statutory evaluation.', target: 'Mandatory for all workplaces using scheduled chemicals under the USECHH Regulations 2000; critical for chemical manufacturers, laboratories, and warehouse operations.', detailRoute: '#/services/chemical-health-risk-assessment-chra' },
      { title: 'Hazard Identification, Risk Assessment & Control (HIRARC)', desc: 'Structured HIRARC methodology workshops and documentation support to map workplace hazards, quantify risk levels, and implement practical control measures that satisfy DOSH inspection requirements.', target: 'All Malaysian workplaces employing 5 or more workers; especially relevant for SMEs preparing their first statutory risk assessment or updating an outdated HIRARC register.', detailRoute: '#/services/hirarc-risk-management' },
    ],
  },
]

export const HRDC_TABLE = [
  { feature: 'Trainer Certification', with: 'HRD Corp ID 62976', without: 'Uncertified risk' },
  { feature: 'Grant Navigation', with: 'Full e-TRiS support', without: 'Self-managed' },
  { feature: 'Documentation', with: 'Complete admin handled', without: 'Internal burden' },
  { feature: 'Cost to Company', with: 'Levy-funded (subject to approval)', without: 'Full cash outlay' },
  { feature: 'Fund Protection', with: 'Rolling 24-month expiry monitored', without: 'Auto-forfeiture risk' },
]

export const REG_FRAMEWORKS = [
  { agency: 'DOSH', act: 'OSH (Amendment) Act 2022', body: 'DOSH Malaysia (JKKP)', source: 'Download Official Act 514 PDF ↗' },
  { agency: 'DOSH', act: 'Site Public Safety & Health Guidelines', body: 'Ministry of Human Resources', source: 'Download DOSH Site Guidelines PDF ↗' },
  { agency: 'CIDB', act: 'CIS 25:2018 (CARA)', body: 'CIDB Malaysia', source: 'View Verified CIDB Industry Frameworks ↗' },
  { agency: 'OSHA', act: '29 CFR 1926 Construction Playbook', body: 'US Federal OSHA', source: 'Access Verbatim OSHA 1926 Rulebook ↗' },
]

export const DELIVERY = {
  inhouse: {
    label: 'Recommended',
    title: 'In-House Delivery',
    points: [
      'Zero travel downtime — your team trains on-site without leaving the facility',
      'Specialized facility hazard mapping mapped into every module',
      'Class dates scheduled around your production calendar',
      'Group rates and HRD Corp levy optimisation',
    ],
    cta: 'Request In-House Quote',
  },
  public: {
    label: 'Alternative',
    title: 'Public Seminars',
    points: [
      'Fixed schedules that may clash with shift rotations',
      'Generic curriculum — not mapped to your specific hazards',
      'Travel time and transport costs for every participant',
      'Limited intake per batch; certification may be delayed',
    ],
    cta: 'Join Public Schedule',
  },
}
