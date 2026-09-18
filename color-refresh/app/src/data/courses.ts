// ─── Full training catalogue: all 46 programmes, preserved verbatim ───

export interface Course {
  name: string
  category: string
  catKey: string
  desc: string
  duration: string
  mode: string
  claimable: boolean
  target: string
  detailRoute?: string
}

export const CATEGORIES = [
  { key: 'A', name: 'OSH Training' },
  { key: 'B', name: 'CIDB & Construction Safety' },
  { key: 'C', name: 'Safety Consultancy' },
  { key: 'D', name: 'HRD Corp Support' },
  { key: 'E', name: 'Industrial Waste & Environmental' },
  { key: 'F', name: 'Construction Safety & Accident Elimination' },
  { key: 'G', name: 'OSH Monitoring & Assessments' },
]

export const COURSES: Course[] = [
  // A — OSH Training
  { name: 'Incident & Accident Investigation', category: 'OSH Training', catKey: 'A', desc: 'Root-cause analysis, evidence gathering, compliance reporting under NADOPOD Regulations 2004.', duration: '1 Day', mode: 'On-Site', claimable: true, target: 'HSE Committee Members, Operational Managers, HR Directors' },
  { name: 'Safety & Health Committee Training', category: 'OSH Training', catKey: 'A', desc: 'Establish and run an effective internal safety council under OSH (Safety and Health Committee) Regulations 1996.', duration: '2 Days', mode: 'Nationwide', claimable: true, target: 'Enterprises with 40+ workers or high-risk operations' },
  { name: 'Chemical Safety', category: 'OSH Training', catKey: 'A', desc: 'Handling procedures, PPE deployment, and emergency spillage controls under USECHH Regulations 2000.', duration: '3 Days', mode: 'Nationwide', claimable: true, target: 'Factory operators, lab technicians, warehouse teams', detailRoute: '#/courses/chemical-handling' },
  { name: 'OSH Coordinator (OSH-C)', category: 'OSH Training', catKey: 'A', desc: 'Statutory appointment training under Section 29A of the OSH (Amendment) Act 2022. For workplaces with 5+ employees.', duration: '2 Days', mode: 'Nationwide', claimable: true, target: 'Safety officers, HR managers, company directors in statutory-scope workplaces', detailRoute: '#/services/osh-coordinator-section-29a' },
  { name: 'Electrical Safety', category: 'OSH Training', catKey: 'A', desc: 'High-voltage mitigation, lockout-tagout (LOTO) workflows, shock prevention.', duration: 'On-Site Custom', mode: 'Nationwide', claimable: true, target: 'Plant maintenance techs, facilities engineers' },
  { name: 'Emergency Response & Fire Safety', category: 'OSH Training', catKey: 'A', desc: 'Crisis command, fire fighting equipment handling, coordinated evacuation drills.', duration: '1 Day', mode: 'On-Site', claimable: true, target: 'ERT captains, floor wardens, security ops' },
  { name: 'First Aid & CPR', category: 'OSH Training', catKey: 'A', desc: 'AED usage, choking management, wound stabilization certified life support.', duration: '2 Days', mode: 'Nationwide', claimable: true, target: 'Workplace first-aiders, factory supervisors' },
  { name: 'Forklift & Machinery Safety', category: 'OSH Training', catKey: 'A', desc: 'Pre-shift checks, payload center-of-gravity, safe rack maneuvering.', duration: '3 Days', mode: 'Nationwide', claimable: true, target: 'Material handlers, warehouse operators' },
  { name: 'Warehouse Logistics & High-Racking Auditing', category: 'OSH Training', catKey: 'A', desc: 'Load distribution, pallet racking integrity, aisle safety under Factory & Machinery Act 1967.', duration: 'On-Site Custom', mode: 'Nationwide', claimable: true, target: 'Warehouse ops directors, distribution supervisors' },
  { name: 'HIRARC & Risk Management', category: 'OSH Training', catKey: 'A', desc: 'Hazard Identification, Risk Assessment, and Risk Control models meeting statutory criteria.', duration: '1 Day', mode: 'On-Site', claimable: true, target: 'Operations directors, safety executives, project planners', detailRoute: '#/services/hirarc-risk-management' },
  { name: 'Safety Audit & Inspection Techniques', category: 'OSH Training', catKey: 'A', desc: 'Internal audits, compliance gap identification, corrective action reports.', duration: '2 Days', mode: 'Nationwide', claimable: true, target: 'Internal auditors, plant managers', detailRoute: '#/services/safety-audit-inspection' },
  { name: 'Ergonomics Risk Assessment (ERA)', category: 'OSH Training', catKey: 'A', desc: 'Musculoskeletal disorder prevention, RSI mapping, anthropometric redesign.', duration: '3 Days', mode: 'Nationwide', claimable: true, target: 'Occupational health nurses, HR wellness coordinators' },
  { name: 'Tailor-Made HSE Programmes', category: 'OSH Training', catKey: 'A', desc: "Customized modules from your company's incident data and industry risk matrices.", duration: 'On-Site Custom', mode: 'Nationwide', claimable: true, target: 'Heavy industrial operations, multi-nationals' },
  // B — CIDB & Construction Safety
  { name: 'Safety Induction & Awareness', category: 'CIDB & Construction Safety', catKey: 'B', desc: 'Construction safety landscape, site risk identification, mandatory PPE guidelines.', duration: '1 Day', mode: 'On-Site', claimable: true, target: 'General laborers, project engineers, sub-contractors' },
  { name: 'Working at Height (WAH) Safety', category: 'CIDB & Construction Safety', catKey: 'B', desc: 'Fall arrest system configurations, full-body harness anchorage, safe MEWP operations.', duration: '2 Days', mode: 'Nationwide', claimable: true, target: 'Roofing, high-elevation painters, structural welders', detailRoute: '#/services/working-at-height-wah' },
  { name: 'Fall Protection Engineering', category: 'CIDB & Construction Safety', catKey: 'B', desc: 'Fall arrest design, permanent anchor point load testing, structural connection verification.', duration: '3 Days', mode: 'Nationwide', claimable: true, target: 'Structural engineers, rigging specialists' },
  { name: 'Site Safety Management', category: 'CIDB & Construction Safety', catKey: 'B', desc: 'Multi-tier subcontractor compliance and full CIDB structural compliance.', duration: 'On-Site Custom', mode: 'Nationwide', claimable: true, target: 'Main contractor PMs, site safety directors' },
  { name: 'Toolbox Talk & Safety Briefings', category: 'CIDB & Construction Safety', catKey: 'B', desc: 'Frameworks for daily pre-shift safety briefings reinforcing hazard awareness.', duration: '1 Day', mode: 'On-Site', claimable: true, target: 'Site foremen, safety supervisors' },
  { name: 'CIDB Green Card (SICW)', category: 'CIDB & Construction Safety', catKey: 'B', desc: 'Official accredited safety induction required under the CIDB Act.', duration: '2 Days', mode: 'Nationwide', claimable: true, target: 'Every individual on active construction developments', detailRoute: '#/services/cidb-green-card-sicw' },
  { name: 'Scaffold Safety Awareness', category: 'CIDB & Construction Safety', catKey: 'B', desc: 'Load limits, bracing setups, tie-back anchoring, and inspection routines.', duration: '3 Days', mode: 'Nationwide', claimable: true, target: 'Scaffold assemblers, on-site safety inspectors', detailRoute: '#/courses/scaffold-safety' },
  // C — Safety Consultancy
  { name: 'Workplace Safety Assessments', category: 'Safety Consultancy', catKey: 'C', desc: 'Facility safety evaluations locating latent risks ahead of official audits.', duration: 'On-Site Custom', mode: 'Nationwide', claimable: true, target: 'Corporate boards, manufacturing execs' },
  { name: 'Compliance & Risk Advisory', category: 'Safety Consultancy', catKey: 'C', desc: 'Navigating the OSH (Amendment) Act 2022 and avoiding costly non-compliance.', duration: '1 Day', mode: 'On-Site', claimable: true, target: 'SME directors adapting to new safety thresholds' },
  { name: 'Safety Documentation Support', category: 'Safety Consultancy', catKey: 'C', desc: 'Statutory records preparation: PMA/PMT machinery registers, SOP books, policies.', duration: '2 Days', mode: 'Nationwide', claimable: true, target: 'Admin managers, ops coordinators' },
  { name: 'Supply of Safety Supervisor / EO', category: 'Safety Consultancy', catKey: 'C', desc: 'Certified practitioners deployed to manage day-to-day compliance.', duration: '3 Days', mode: 'Nationwide', claimable: true, target: 'Civil projects, infrastructure, manufacturing hubs' },
  { name: 'Industrial Waste & Environmental Advisory', category: 'Safety Consultancy', catKey: 'C', desc: 'Disposal, recycling, on-site clean-up, waste labeling, ETP, air pollution.', duration: 'On-Site Custom', mode: 'Nationwide', claimable: true, target: 'Chemical facilities, manufacturing plants' },
  { name: 'PPE Supply', category: 'Safety Consultancy', catKey: 'C', desc: 'Head protection, respirators, fall arresters, safety shoes, full-body harnesses.', duration: '1 Day', mode: 'On-Site', claimable: true, target: 'Site managers, procurement officers' },
  { name: 'Signages & First Aid Equipment', category: 'Safety Consultancy', catKey: 'C', desc: 'Mandatory workplace safety signages, hazard labels, first aid boxes.', duration: '2 Days', mode: 'Nationwide', claimable: true, target: 'Facilities managers' },
  // D — HRD Corp Support
  { name: 'Claimable Programme Guidance', category: 'HRD Corp Support', catKey: 'D', desc: 'Course catalog mapped directly against your HRD Corp fund balance.', duration: '3 Days', mode: 'Nationwide', claimable: true, target: 'HR managers, training coordinators' },
  { name: 'Grant & Funding Assistance', category: 'HRD Corp Support', catKey: 'D', desc: 'Step-by-step support navigating the e-TRiS online platform.', duration: 'On-Site Custom', mode: 'Nationwide', claimable: true, target: 'Financial managers, training coordinators' },
  { name: 'Claim Process Support', category: 'HRD Corp Support', catKey: 'D', desc: 'Post-training documentation, attendance tracking, invoice validation.', duration: '1 Day', mode: 'On-Site', claimable: true, target: 'Accounting execs, finance depts' },
  { name: 'Training Budget Optimisation', category: 'HRD Corp Support', catKey: 'D', desc: 'Deploy funds before the rolling 24-month forfeiture threshold hits.', duration: '2 Days', mode: 'Nationwide', claimable: true, target: 'Finance directors, company owners' },
  // E — Industrial Waste & Environmental
  { name: 'Disposal & Recycling Options', category: 'Industrial Waste & Environmental', catKey: 'E', desc: 'Waste-stream analysis and disposal-pathway recommendations aligned with DOE.', duration: '3 Days', mode: 'Nationwide', claimable: true, target: 'Plant managers, EHS officers' },
  { name: 'On-Site Waste Clean-Up', category: 'Industrial Waste & Environmental', catKey: 'E', desc: 'Containment, segregation, and incident decontamination procedures.', duration: 'On-Site Custom', mode: 'Nationwide', claimable: true, target: 'Response teams handling spills/leakages' },
  { name: 'Waste Storage Recommendations', category: 'Industrial Waste & Environmental', catKey: 'E', desc: 'Compliant storage layout, secondary containment, segregation of incompatibles.', duration: '1 Day', mode: 'On-Site', claimable: true, target: 'Facilities managers retrofitting waste compounds' },
  { name: 'Waste & Chemical Labeling', category: 'Industrial Waste & Environmental', catKey: 'E', desc: 'Hazard-communication labeling aligned with DOSH, EPA, and GHS standards.', duration: '2 Days', mode: 'Nationwide', claimable: true, target: 'Warehouse supervisors, chemical handlers' },
  { name: 'Waste Water Treatment', category: 'Industrial Waste & Environmental', catKey: 'E', desc: 'ETP oversight and discharge compliance under Environmental Quality Act 1974.', duration: '3 Days', mode: 'Nationwide', claimable: true, target: 'Process engineers, utilities managers' },
  { name: 'Air Pollution Control', category: 'Industrial Waste & Environmental', catKey: 'E', desc: 'Emission monitoring, stack-testing, control-plan drafting under DOE.', duration: 'On-Site Custom', mode: 'Nationwide', claimable: true, target: 'Environmental compliance officers' },
  // F — Construction Safety & Accident Elimination
  { name: 'Pre-Construction Hazard Identification', category: 'Construction Safety & Accident Elimination', catKey: 'F', desc: 'Hazard identification and risk-ranking during design and planning.', duration: '1 Day', mode: 'On-Site', claimable: true, target: 'Project developers, architects, main contractors' },
  { name: 'Accident-Elimination Frameworks', category: 'Construction Safety & Accident Elimination', catKey: 'F', desc: 'Upstream risk controls, barrier analysis, behavioural safety programmes.', duration: '2 Days', mode: 'Nationwide', claimable: true, target: 'Site safety directors, PMs owning LTIFR' },
  { name: 'CIDB Statutory Compliance Integration', category: 'Construction Safety & Accident Elimination', catKey: 'F', desc: 'Full integration with CIDB Act requirements including SSS deployment.', duration: '3 Days', mode: 'Nationwide', claimable: true, target: 'Firms bidding on gov/private projects' },
  { name: 'On-Site Real-Time Risk Mitigation', category: 'Construction Safety & Accident Elimination', catKey: 'F', desc: 'Embedded practitioners for daily hazard walks and immediate sign-offs.', duration: 'On-Site Custom', mode: 'Nationwide', claimable: true, target: 'Fast-track civil projects, high-rise builds' },
  // G — OSH Monitoring & Assessments
  { name: 'Chemical Exposure Monitoring', category: 'OSH Monitoring & Assessments', catKey: 'G', desc: 'Air sampling under USECHH 2000 with DOSH PEL benchmarks.', duration: '1 Day', mode: 'On-Site', claimable: true, target: 'Manufacturing plants, chemical facilities' },
  { name: 'Local Exhaust Ventilation (LEV) Inspection', category: 'OSH Monitoring & Assessments', catKey: 'G', desc: 'Hoods, ducts, filters, fans — capture velocity and airflow verification.', duration: '2 Days', mode: 'Nationwide', claimable: true, target: 'Metalworking, spray booths, welding stations' },
  { name: 'Noise Mapping & Monitoring', category: 'OSH Monitoring & Assessments', catKey: 'G', desc: 'Calibrated dosimetry and octave-band analysis under the Occupational Safety and Health (Noise Exposure) Regulations 2019.', duration: '3 Days', mode: 'Nationwide', claimable: true, target: 'Foundries, textile plants, construction yards' },
  { name: 'Chemical Health Risk Assessment (CHRA)', category: 'OSH Monitoring & Assessments', catKey: 'G', desc: 'Systematic evaluation and control recommendations under USECHH 2000.', duration: 'On-Site Custom', mode: 'Nationwide', claimable: true, target: 'Labs, chemical manufacturers, warehouses', detailRoute: '#/services/chemical-health-risk-assessment-chra' },
  { name: 'HIRARC Workshops', category: 'OSH Monitoring & Assessments', catKey: 'G', desc: 'Structured HIRARC methodology and documentation support.', duration: '1 Day', mode: 'On-Site', claimable: true, target: 'Workplaces with 5+ workers preparing statutory assessments' },
]
