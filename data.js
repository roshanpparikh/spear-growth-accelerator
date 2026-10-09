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
    dsoDoctors: 25, dsoLocations: 10, dsoAdoption: 0.8, dsoProgramFee: 0, dsoReplacement: 0, dsoRetentionLift: 0
  }
};
