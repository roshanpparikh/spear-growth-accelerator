/* =====================================================================
   COURSE NAME: edit this ONE line to rename the flagship 2-day course
   everywhere on the site (landing, launch page, plan, Rx print view).
   ===================================================================== */
window.SGA_COURSE_NAME = "[Course name TBD]";
window.SGA_COURSE_SUFFIX = "The 2-Day Growth Accelerator Launch";

/* Spear Growth Accelerator prototype data.
   REAL = published on speareducation.com / campus.speareducation.com / app.speareducation.com as of Oct 8, 2026.
   PLACEHOLDER = invented for the prototype. Every placeholder is labeled in the UI. */
window.SP_DATA = {
  // Published membership prices (speareducation.com/spear-dental-ce-membership-benefits/), billed yearly
  tiers: {
    foundations: { name: "Foundations Membership", annual: 720, real: true, priceNote: "$60/mo for clinicians in their first 5 years (published)", discount: 0.10, discountReal: false, discountNote: "Early Career page says it includes the benefits of Individual (10% workshop discount). Verify.", studyClubs: false, team: false, unlimited: false },
    individual:  { name: "Individual", annual: 995, real: true, priceNote: "$995 billed yearly (published)", discount: 0.10, discountReal: true, studyClubs: false, team: false, unlimited: false },
    practice:    { name: "Practice", annual: 3200, real: true, priceNote: "$3,200 billed yearly (published)", discount: 0.20, discountReal: true, studyClubs: true, team: true, unlimited: false },
    faculty:     { name: "Faculty Club", annual: 4500, real: true, priceNote: "$4,500 billed yearly (published)", discount: 0.30, discountReal: true, studyClubs: true, team: true, unlimited: false },
    allaccess:   { name: "Spear All Access", annual: 33000, real: true, priceNote: "$33,000 billed yearly, up to 2 doctors and 10 team members (published)", discount: 1, discountReal: true, studyClubs: true, team: true, unlimited: true, navigator: true }
  },
  // Focus areas -> real Spear workshop names and published durations (campus.speareducation.com/workshops/)
  areas: [
    { id: "tp",   label: "Treatment planning and case acceptance", icon: "◎", lift: 0.08, hyg: 0, ws: [{ n: "Treatment Planning with Confidence", d: 3, cat: "Spear Core" }, { n: "Mastering Chairside Restorative Case Acceptance", d: 2, cat: "Special Focus" }] },
    { id: "imp",  label: "Implants", icon: "⌖", lift: 0.06, hyg: 0, ws: [{ n: "Implant Restorative Dentistry", d: 3, cat: "Spear Technique" }] },
    { id: "clr",  label: "Clear aligners", icon: "◠", lift: 0.05, hyg: 0, ws: [{ n: "Clear Aligner Essentials: Ortho-Restorative Integration", d: 3, cat: "Special Focus" }, { n: "Orthodontic Clear Aligners in Restorative Practice", d: 3, cat: "Special Focus" }] },
    { id: "arch", label: "Full-arch and complex restorative", icon: "▦", lift: 0.07, hyg: 0, ws: [{ n: "Restoring the Edentulous Arch", d: 3, cat: "Spear Technique" }, { n: "Phasing and Sequencing Complex Treatment", d: 3, cat: "Spear Core" }] },
    { id: "cos",  label: "Veneers and cosmetic", icon: "✦", lift: 0.05, hyg: 0, ws: [{ n: "Anterior Restorative Dentistry", d: 3, cat: "Spear Core" }, { n: "Excellence in Composite Restorations", d: 3, cat: "Spear Core" }] },
    { id: "endo", label: "Endodontics", icon: "⟟", lift: 0.04, hyg: 0, ws: [{ n: "Comprehensive Clinical Endodontics", d: 3, cat: "Special Focus" }] },
    { id: "slp",  label: "Sleep and airway", icon: "☾", lift: 0.04, hyg: 0, ws: [{ n: "Airway Prosthodontics and Sleep Dentistry: Prevention to Control", d: 3, cat: "Spear Core" }] },
    { id: "occ",  label: "Occlusion and TMD", icon: "⧖", lift: 0.04, hyg: 0, ws: [{ n: "Occlusion in Clinical Practice", d: 3, cat: "Spear Core" }, { n: "Advanced Occlusion", d: 3, cat: "Special Focus" }] },
    { id: "team", label: "Team and leadership", icon: "◇", lift: 0.04, hyg: 0.06, ws: [{ n: "Train Your Team to Shine: Best Practice Systems Playbook", d: 2, cat: "Team" }, { n: "The Leadership/ Management Bootcamp", d: 2, cat: "Team" }] }
  ],
  // FLAGSHIP 2-DAY LAUNCH (concept). Combines Spear Foundations (Day 1) + Treatment Planning with Confidence (Day 2).
  // Everything here is a concept for discussion. Faculty are roles, not people. Targets are illustrative.
  launch: {
    d: 2, cat: "Flagship launch", price: 4995, // target list price for the 2-Day Launch
    days: [
      { n: "Day 1", t: "See it, then say it", src: "Built on Spear Foundations", sessions: [
        { t: "The comprehensive exam", what: "A repeatable exam flow that finds what single-tooth dentistry misses.", mon: "Run the full comprehensive exam on every new patient this week, checklist in hand.", kpi: "Comprehensive exams per week" },
        { t: "Fast records and face-first diagnosis (short block)", what: "A 10-minute smartphone photo series plus scans, then sort findings into esthetics, function, structure, biology. Enough to see it and show it, no studio required.", mon: "Take the phone photo series on your first 3 new patients and sort findings into the four categories.", kpi: "% of new patients with complete records" },
        { t: "Occlusion and esthetic fundamentals", what: "Spot wear, instability and esthetic risk early, before they become failures.", mon: "Add a 2-minute occlusal and esthetic screen to every adult exam.", kpi: "% of adult exams with a documented screen" },
        { t: "Communicating findings (extended block, live role-play)", what: "Co-discovery: patients walk through their own photos and own the problem. Practice the words in pairs until they sound like you.", mon: "Review photos chairside with every new patient using the findings script.", kpi: "% of patients who book the next visit before leaving" },
        { t: "Chairside confidence", what: "Say what you see, recommend what you would do for your own family, and stop apologizing for the fee. Reps with your near-peer co-lead, filmed and debriefed.", mon: "Make one clear recommendation per new patient, in one sentence, with no hedging words.", kpi: "% of new patients given a clear recommendation" }
      ]},
      { n: "Day 2", t: "Plan it, present it, close it", src: "Built on Treatment Planning with Confidence", sessions: [
        { t: "Sequencing that holds up", what: "Disease control first, then foundation, then function and esthetics. In that order, every time.", mon: "Re-sequence 2 of your open treatment plans with the sequencing template.", kpi: "% of plans with a documented sequence" },
        { t: "Phased plans patients can say yes to", what: "Break big cases into phases that fit the patient's time, budget and priorities.", mon: "Offer every major case in 2 or 3 phases, with phase 1 ready to schedule today.", kpi: "Case acceptance % on multi-phase plans" },
        { t: "Presenting the plan (extended block, live role-play)", what: "A sit-down consult structure that turns findings into decisions. Each doctor presents a real case to a mock patient and gets coached on words, pacing and silence.", mon: "Run one sit-down consult away from the chair using the presentation template.", kpi: "Case acceptance %" },
        { t: "Case acceptance and objections (extended block, live role-play)", what: "Handle \u201clet me think about it,\u201d \u201cis insurance covering this?\u201d and \u201cthat's a lot\u201d without discounting or pressure. Practice every objection out loud.", mon: "Call every unscheduled plan within 48 hours using the follow-up script.", kpi: "% of unscheduled treatment recovered" },
        { t: "Your 90-day production plan", what: "Set your baseline, pick three numbers, commit to the first week.", mon: "Log your baseline: production per hour, case acceptance %, exams per week.", kpi: "Production per hour, % lift vs baseline" }
      ]}
    ],
    // ILLUSTRATIVE 90-day targets, shown as % lift only. Spear must validate with cohort data before publishing.
    targets: [
      { k: "Case acceptance", v: "+15%", s: "relative lift vs baseline acceptance rate" },
      { k: "Comprehensive exams per week", v: "+25%", s: "vs the 4 weeks before the course" },
      { k: "Production per hour", v: null, calc: "m3", s: "by day 90 at $2,500 a day, vs baseline" }
    ],
    kit: [
      ["Comprehensive exam checklist", "Checklist"], ["10-minute smartphone photo series", "Checklist"], ["Chairside confidence phrases (and words to drop)", "Script"],
      ["2-minute occlusal and esthetic screen", "Checklist"], ["Findings conversation script", "Script"], ["Sequencing template", "Template"],
      ["Phased plan template", "Template"], ["Sit-down consult presentation", "Template"], ["Objection handling scripts plus 48-hour follow-up", "Script"],
      ["90-day scorecard: baseline plus 3 numbers", "Template"]
    ],
    followup: [
      { d: "Day 30", t: "Virtual cohort check-in", s: "60 minutes on video. Report your 3 numbers, troubleshoot with your near-peer co-lead, lock in the next fix." },
      { d: "Day 60", t: "Case review", s: "Each doctor presents one case planned and presented with the method. Feedback from the cohort and faculty." },
      { d: "Day 90", t: "Results readout", s: "% lift vs your baseline on all 3 numbers. Graduate into the next workshop in your plan. DSOs get a cohort scorecard." }
    ]
  },
  foundationsWorkshop: { n: "Foundations", d: 2, cat: "Spear Technique", price: 3995, real: true, ce: 14 },
  capstone: { n: "Advanced Treatment Planning", d: 3, cat: "Spear Core (capstone)" },
  summit: "Spear Summit 2027, April 7-10, JW Marriott Grande Lakes, Orlando",
  // Verbatim testimonials from Spear's public site. Do not edit text.
  testimonials: [
    { id: "nelson", q: "Spear has taken my revenue sky high. There’s actually a clear delineation from when I started with Spear and the growth and profit of my practice. This is an invaluable education you can get from Spear.", who: "Dr. John Nelson", org: "Midtown Dental, Miami, FL", src: "https://www.speareducation.com/", for: ["owner"] },
    { id: "schuler", q: "I describe Spear as ‘a dental school for dentists.’ The workshops are designed as building blocks of information that, when taken in order, make sense of so many problems dentists encounter day to day, and the continuum of topics is unparalleled.", who: "Dr. Jaclyn Schuler", org: "Dakota Dental, South Dakota", src: "https://www.speareducation.com/who-we-serve/associates/", for: ["associate", "owner"] },
    { id: "nguyen", q: "I think the biggest hurdle for a new dentist is understanding the big picture instead of relying on single-tooth dentistry. Spear Education gave me a foundation and a structure to follow.", who: "Dr. Anthony Nguyen", org: "ARTSCI Dental, California", src: "https://www.speareducation.com/who-we-serve/associates/", for: ["early", "associate"] },
    { id: "ponzio", q: "Each doctor who completed our P1 Academy while using the Spear platform showed an increase in production-per-hour growth from 2025 to 2026. The results ranged from a 10% increase to over 40%, depending on the doctor.", who: "Dr. Anthony Ponzio", org: "Clinical Director at P1 Dental Partners", src: "https://www.speareducation.com/resources/success-stories/clinician-development-that-increased-production-by-40/", photo: "assets/people/anthony-ponzio.jpg", for: ["dso"] },
    { id: "dudley", q: "As clinicians learned to diagnose more comprehensively through Facially Generated Treatment Planning, production per hour and production per day increased.", who: "Dr. Scott Dudley", org: "Founder and CEO of Branin Dental Group", src: "https://www.speareducation.com/resources/success-stories/scaling-a-shared-clinical-philosophy-across-a-dso/", photo: "assets/people/scott-dudley.jpg", for: ["dso"] },
    { id: "portnoff", q: "Doctor development cannot depend on geography or individual offices, it has to be intentional and scalable.", who: "Dr. Traci Portnoff", org: "Dir. of Doctor Development", src: "https://www.speareducation.com/who-we-serve/enterprise-dental-service-organizations/", photo: "assets/people/traci-portnoff.jpg", for: ["dso"] },
    { id: "larrick", q: "Team training is five-star.", who: "Adina Larrick", org: "Glamm Dentistry, Ohio", src: "https://www.speareducation.com/", for: ["owner"] },
    { id: "burns", q: "Facially Generated Treatment Planning has totally transformed my practice.", who: "Dr. Jill Burns", org: "West Main Family Dental, Indiana", src: "https://www.speareducation.com/", for: ["owner", "associate"] }
  ],
  // Official Spear YouTube channel (linked from speareducation.com), "Member Testimonials" playlist. Verified Oct 9, 2026.
  video: { id: "RlId6JVMNFk", title: "Unlock the Power of Focused Treatment Planning: A Testimonial by Dr. Rachel Day, D.D.S.", who: "Dr. Rachel Day, DDS", published: "December 14, 2023",
    about: "Dr. Rachel Day, DDS, on the Treatment Planning with Confidence hands-on workshop at Spear's Scottsdale campus. It is the same workshop that anchors most plans built here.",
    desc: "Despite the rigors, Dr. Day describes her visits to Spear’s Scottsdale campus as rejuvenating vacations, emphasizing the indispensable resource the workshop has become for overcoming common challenges in treatment planning.",
    url: "https://www.youtube.com/watch?v=RlId6JVMNFk", channel: "https://www.youtube.com/user/SpearEducation", playlist: "https://www.youtube.com/playlist?list=PLqWVYpoCgxcegN2TdL0I_K_IKySrmIPNj", thumb: "assets/people/video-day-thumb.jpg" },
  // Real, verifiable facts used on the landing page
  facts: [
    { k: "700+", v: "Study Clubs" },
    { k: "23", v: "hands-on campus workshops in the current catalog" },
    { k: "ADA CERP + AGD PACE", v: "approved CE provider" }
  ],
  // ILLUSTRATIVE assumptions. All editable in the Assumptions drawer.
  defaults: {
    margin: 0.40, weeks: 48, hoursPerDay: 8, hygShare: 0.30,
    lagMonths: 1, rampMonths: 3, onlineHeadStart: 0.20,
    tuition2: 3995, tuition3: 4995, travel: 1500, includeChairDays: true,
    horizon: 24, billing: "monthly",
    dsoDoctors: 25, dsoLocations: 10, dsoAdoption: 0.8, dsoProgramFee: 0, dsoReplacement: 0, dsoRetentionLift: 0,
    // 2-Day Launch lift at full effect, at the $5,000/day reference (headroom scales it). Calibrated Oct 2026 so the Typical plan
    // reaches about $1,500 to $2,000, $2,500 to $3,200 and $6,000 to $7,000 per day by month 6 (illustrative).
    launchLift: 0.26,
    // DSO cohort snapshot default (Launch only, one associate): set so an associate's month-6 lift at $2,500/day matches the
    // Typical plan's month-6 headline at the same production (about +28%). Conservative vs the full doctor-only Launch lift.
    dsoLaunchLift: 0.18,
    // Headroom effect: lower starting production means more room to grow. Multiplies every lift % (see headroom() in app.js).
    headroom: true, headroomStrength: 1, liftCap: 0.55, modelV: 3
  }
};
