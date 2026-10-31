/**
 * PureNest Cleaning Co. - Centralized Brand Configuration
 * All business details, contact information, hours, pricing, and service areas
 * can be modified here to quickly rebrand or update the business profile.
 */

export interface ServiceDetail {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  fullDescription: string;
  startingPrice: number;
  priceNote: string;
  durationEstimate: string;
  popular?: boolean;
  idealFor: string;
  inclusions: string[];
  deepInclusions?: string[];
  imageUrl: string;
  category: 'residential' | 'commercial' | 'specialized';
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  location: string;
  rating: number;
  service: string;
  comment: string;
  date: string;
  isDemo: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  experience: string;
  specialty: string;
  photoUrl: string;
}

export const BRAND_CONFIG = {
  companyName: "PureNest Cleaning Co.",
  legalName: "PureNest Cleaning Services LLC",
  tagline: "A Cleaner Space. A Better Everyday.",
  shortDescription: "Premier residential and commercial cleaning with meticulous care, eco-safe products, and fully vetted professionals.",
  establishedYear: 2019,
  
  // Contact details (fully configurable)
  contact: {
    phone: "+1 (800) 555-NEST",
    phoneRaw: "+18005556378",
    email: "concierge@purenestcleaning.com",
    supportEmail: "support@purenestcleaning.com",
    whatsappNumber: "+18005556378",
    whatsappMessage: "Hello PureNest! I would like to enquire about booking a cleaning service for my property.",
    addressLine1: "742 Evergreen Terrace, Suite 300",
    cityStateZip: "Portland, OR 97201",
    serviceRadius: "Serving Greater Metro Area & surrounding 35-mile radius",
  },

  // Operating Hours
  hours: [
    { days: "Monday – Friday", hours: "7:30 AM – 7:00 PM" },
    { days: "Saturday", hours: "8:00 AM – 5:00 PM" },
    { days: "Sunday", hours: "9:00 AM – 3:00 PM (Emergency & Move-out only)" },
  ],

  // Service Areas covered
  serviceAreas: [
    { name: "Downtown & Pearl District", postalCodes: ["97201", "97205", "97209"], turnaround: "Same-day available" },
    { name: "West Hills & Beaverton", postalCodes: ["97221", "97225", "97005"], turnaround: "Daily routes" },
    { name: "Eastside & Hawthorne", postalCodes: ["97214", "97215", "97202"], turnaround: "Daily routes" },
    { name: "Lake Oswego & West Linn", postalCodes: ["97034", "97035", "97068"], turnaround: "Mon / Wed / Fri" },
    { name: "North & Northeast Metro", postalCodes: ["97211", "97212", "97217"], turnaround: "Tue / Thu / Sat" },
    { name: "Tigard & Tualatin", postalCodes: ["97223", "97224", "97062"], turnaround: "Daily routes" },
  ],

  // Core Pillars & Trust Badges
  trustMetrics: [
    { label: "Insured & Bonded", value: "$2M", desc: "Comprehensive liability coverage for full peace of mind" },
    { label: "Vetted Cleaners", value: "100%", desc: "Strict background checks and 80-hour training regimen" },
    { label: "Eco-Friendly", value: "Zero Toxins", desc: "EPA Safer Choice certified plant-based solutions" },
    { label: "Client Satisfaction", value: "99.4%", desc: "Free reclean guarantee within 24 hours if unsatisfied" },
  ],

  // Social Links
  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
    yelp: "https://yelp.com",
  },
};

export const SERVICES_CATALOG: ServiceDetail[] = [
  {
    id: "residential-regular",
    name: "Residential & House Cleaning",
    slug: "residential-cleaning",
    tagline: "Effortless, ongoing home care for your sanctuary.",
    description: "Scheduled recurring or single-visit maintenance that keeps every room polished, fresh, and welcoming.",
    fullDescription: "Our signature residential cleaning program is crafted to give you your weekends back. Our dedicated technicians thoroughly sanitize bathrooms, polish kitchens, vacuum carpets with HEPA-filtration, dust surfaces, and leave your home smelling naturally crisp and revitalized.",
    startingPrice: 139,
    priceNote: "Based on 1-2 bedroom home",
    durationEstimate: "2 - 3.5 hours",
    popular: true,
    idealFor: "Busy professionals, growing families, and homeowners seeking regular weekly or bi-weekly maintenance.",
    category: "residential",
    imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
    inclusions: [
      "All countertops, tables, and visible surfaces wiped and sanitized",
      "Sinks, faucets, mirrors, and glass surfaces polished streak-free",
      "Stove exterior, microwave interior and exterior cleaned",
      "Cabinet exteriors wiped down and handles disinfected",
      "Toilets, showers, and tubs scrubbed and sanitized",
      "High & low dusting: ceiling fans, picture frames, baseboards",
      "Hardwood & tile floors vacuumed and microfiber damp-mopped",
      "Trash bins emptied and relined with fresh bags",
    ],
  },
  {
    id: "deep-cleaning",
    name: "Intensive Deep Cleaning",
    slug: "deep-cleaning",
    tagline: "Total restorative revitalization down to every crevice.",
    description: "An exhaustive top-to-bottom detail covering baseboards, appliance exteriors, grout, and neglected corners.",
    fullDescription: "Over time, dust, grease, and soap scum accumulate where standard cleaning cannot reach. Our Deep Clean protocol is a multi-hour intensive scrub designed for seasonal refreshes, spring overhauls, or homes that haven't had professional care in over 3 months.",
    startingPrice: 249,
    priceNote: "Comprehensive flat or sq. ft. rate",
    durationEstimate: "4 - 6 hours",
    popular: true,
    idealFor: "First-time clients, seasonal spring cleaning, or homes overdue for comprehensive detailing.",
    category: "residential",
    imageUrl: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80",
    inclusions: [
      "Everything in Residential Cleaning plus:",
      "Hand-washed baseboards, door frames, and window sills",
      "Exterior & vent hood degreasing on kitchen appliances",
      "Heavy scale and soap scum removal in tile grout & glass enclosures",
      "Behind and under accessible freestanding furniture",
      "Interior door handles, light switch plates, and trim detailed",
      "Deep cobweb removal in cathedral ceilings & corners",
      "Sanitizing of kitchen backsplash and range knobs",
    ],
  },
  {
    id: "commercial-office",
    name: "Commercial & Office Cleaning",
    slug: "commercial-cleaning",
    tagline: "Productive, hygienic workspaces that impress clients.",
    description: "Customized janitorial and sanitation solutions for corporate offices, medical suites, and retail studios.",
    fullDescription: "A pristine office improves employee wellness, lowers sick days, and presents an impeccable image to visitors. We provide after-hours, weekend, or daytime porter cleaning designed around your corporate security protocols and workflow.",
    startingPrice: 199,
    priceNote: "Custom monthly contract or per-visit rate",
    durationEstimate: "Tailored to square footage",
    popular: false,
    idealFor: "Corporate offices, creative agencies, medical clinics, boutique stores, and coworking spaces.",
    category: "commercial",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    inclusions: [
      "Desk surfaces, monitor perimeters, and shared tables disinfected",
      "High-touch point protocol: door pulls, conference remotes, elevator buttons",
      "Restroom bank deep sanitization and consumable restocking",
      "Staff kitchen: sinks, coffee stations, countertops, fridge exterior",
      "Large-scale commercial carpet HEPA vacuuming",
      "Hard surface scrubbing and slip-resistant floor polish",
      "Confidential waste disposal and recycling sort",
    ],
  },
  {
    id: "move-in-out",
    name: "Move-In / Move-Out Cleaning",
    slug: "move-in-out-cleaning",
    tagline: "Turnkey perfection for tenants, landlords, and realtors.",
    description: "Guaranteed spotless turnover to ensure 100% security deposit return or ready a new home for your family.",
    fullDescription: "Moving is stressful enough without having to scrub ovens and wipe down empty closets. PureNest delivers white-glove empty-home cleanouts that meet property managers' strictest move-out checklists. Ready for staging or move-in day.",
    startingPrice: 289,
    priceNote: "Full empty-home turnover standard",
    durationEstimate: "4 - 7 hours",
    popular: true,
    idealFor: "Tenants moving out, new homeowners before furniture delivery, landlords, and real estate staging.",
    category: "specialized",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    inclusions: [
      "Deep clean inside all kitchen cabinets and drawers",
      "Deep clean inside oven, stovetop, and refrigerator/freezer",
      "Clean inside all bedroom, linen, and coat closets",
      "Scrub and polish all baseboards, doors, and trim throughout",
      "Full disinfection of bathrooms from ceiling vents to floors",
      "Interior window tracks, sills, and reachable glass",
      "Spot clean wall scuffs and marks where safe",
    ],
  },
  {
    id: "recurring-plans",
    name: "Recurring Maintenance Plans",
    slug: "recurring-cleaning",
    tagline: "Consistent cleanliness on autopilot with member discounts.",
    description: "Weekly, bi-weekly, or monthly automated visits with dedicated cleaning staff and priority rescheduling.",
    fullDescription: "Join the PureNest Family Plan. Recurring clients receive locked-in discounted rates, the same dedicated crew assigned to your home, flexible skip/reschedule options, and free seasonal deep-cleaning upgrades.",
    startingPrice: 119,
    priceNote: "Up to 25% off standard one-time pricing",
    durationEstimate: "Regular scheduled blocks",
    popular: false,
    idealFor: "Homeowners desiring guaranteed recurring slots without the hassle of rebooking every week.",
    category: "residential",
    imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    inclusions: [
      "Weekly plan: 25% discount off standard rate",
      "Bi-weekly plan: 15% discount off standard rate",
      "Monthly plan: 10% discount off standard rate",
      "Same dedicated technician team every visit",
      "Zero-fee cancellation or skip with 24h notice",
      "Priority emergency holiday booking slots",
    ],
  },
  {
    id: "custom-addons",
    name: "Specialty & Add-On Services",
    slug: "specialty-addons",
    tagline: "Targeted solutions to customize any cleaning package.",
    description: "Add-on options like inside refrigerator, interior oven, carpet steam extraction, and patio wash.",
    fullDescription: "Need an extra touch? You can seamlessly append any of our specialized treatments to your booking or request them as standalone services.",
    startingPrice: 45,
    priceNote: "Per service add-on",
    durationEstimate: "30 - 60 mins each",
    popular: false,
    idealFor: "Clients wanting to personalize their clean with specific appliance care or exterior extensions.",
    category: "specialized",
    imageUrl: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1200&q=80",
    inclusions: [
      "Inside Oven Deep Degrease ($45)",
      "Inside Refrigerator & Freezer Deep Sanitization ($45)",
      "Interior Window & Track Detailing ($55/floor)",
      "Balcony / Covered Patio Sweep & Pressure Wash ($65)",
      "Pet Dander & Odor Enzyme Treatment ($40)",
      "Mattress UV & Steam Sanitization ($50/bed)",
    ],
  },
];

export const TESTIMONIALS_SAMPLE: Testimonial[] = [
  {
    id: "test-1",
    author: "Elena Rostova",
    role: "Architect & Homeowner",
    location: "Pearl District",
    rating: 5,
    service: "Deep Cleaning + Recurring Bi-Weekly",
    comment: "PureNest completely changed our standards. We have two golden retrievers and dark hardwood floors; after their deep clean, not a single hair was left in the corners. The team is discreet, polite, and uses products that don't give me headaches.",
    date: "October 2026",
    isDemo: true,
  },
  {
    id: "test-2",
    author: "Marcus Vance",
    role: "Managing Director, Studio Apex",
    location: "Downtown",
    rating: 5,
    service: "Commercial Office Cleaning",
    comment: "We switched our 8,000 sq. ft. design studio to PureNest 6 months ago. The difference in air quality and workstation hygiene is palpable. Their evening crew is dependable and adheres strictly to our high-tech security check-ins.",
    date: "September 2026",
    isDemo: true,
  },
  {
    id: "test-3",
    author: "Sarah & David Jenkins",
    role: "Tenants / New Homeowners",
    location: "West Hills",
    rating: 5,
    service: "Move-Out & Move-In Package",
    comment: "Our landlord is notoriously strict with move-out walkthroughs. PureNest cleaned the oven and baseboards so thoroughly we got 100% of our $2,400 deposit back within 48 hours. Then they cleaned our new home before moving our furniture in!",
    date: "August 2026",
    isDemo: true,
  },
  {
    id: "test-4",
    author: "Dr. Rachel Chen",
    role: "Pediatrician",
    location: "Lake Oswego",
    rating: 5,
    service: "Residential House Cleaning",
    comment: "As a physician and mother of two toddlers, I am particular about chemical residues. PureNest's plant-based EPA Safer Choice cleaners give me complete peace of mind. Truly immaculate attention to detail.",
    date: "July 2026",
    isDemo: true,
  },
];

export const FAQ_DATA: FAQItem[] = [
  {
    category: "Booking & Pricing",
    question: "How do you determine the pricing for my home or business?",
    answer: "Our rates are based on your property's square footage, the number of bedrooms and bathrooms, and the depth of service selected (regular maintenance vs. intensive deep clean). We provide flat-rate estimates upfront so there are never hidden fees.",
  },
  {
    category: "Safety & Staff",
    question: "Are your cleaners insured and background-checked?",
    answer: "Yes, 100%. Every PureNest cleaning specialist is a direct, W-2 employee (never unverified subcontractors) who has passed a rigorous 7-year background check, drug screening, and 80 hours of supervised white-glove training. We carry full $2,000,000 general liability insurance.",
  },
  {
    category: "Products & Pets",
    question: "What cleaning products and equipment do you use?",
    answer: "We supply all hospital-grade, EPA Safer Choice certified, non-toxic, and hypoallergenic products alongside commercial HEPA-filtration vacuums and color-coded microfiber cloths to eliminate any cross-contamination between bathrooms and kitchens. Safe for pets and children.",
  },
  {
    category: "Access & Logistics",
    question: "Do I need to be home during the cleaning appointment?",
    answer: "Not at all. Over 70% of our clients prefer to be away at work or running errands. You can provide a lockbox code, smart lock code, or leave keys with building concierge. We notify you via SMS 15 minutes before arrival and right after completion with a digital checklist.",
  },
  {
    category: "Guarantee",
    question: "What is your 100% Satisfaction Guarantee policy?",
    answer: "If any area does not meet your complete satisfaction, simply contact us within 24 hours. A team lead will return to your property within 24 to 48 hours to re-clean the specific area at zero charge to you.",
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Hannah Lindqvist",
    role: "Founder & Quality Director",
    bio: "With over 12 years in hospitality management, Hannah established PureNest to bring 5-star hotel hygiene standards into modern private residences.",
    experience: "12+ Years Experience",
    specialty: "Quality Protocols & Green Chemistry",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Julian Rivera",
    role: "Head of Operations & Field Training",
    bio: "Julian oversees our technician training academy, ensuring every team member masters cross-contamination prevention and high-end surface care.",
    experience: "9 Years Experience",
    specialty: "Crew Training & Safety Compliance",
    photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Maya Patel",
    role: "Senior Lead Technician",
    bio: "Specializing in marble, quartz, and heritage hardwood restoration. Maya leads our most meticulous move-in and deep cleaning assignments.",
    experience: "7 Years Experience",
    specialty: "Delicate Finishes & Deep Detailing",
    photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
  },
];
