# PureNest Cleaning Co. — Premium Cleaning Services Website

A full-stack web application designed for residential and commercial cleaning businesses. Features an editorial, conversion-focused user interface, custom SVG branding, responsive layouts, four distinct pages, dynamic price calculator, interactive before-and-after slider, and a secure backend with enquiry persistence and staff dispatch portal.

---

## 🌟 Key Highlights & Features

### 1. Multi-Page Architecture
- **Home**: Hero section, trust indicators ($2M insured, vetted W-2 staff, non-toxic botany), popular service showcase, Why Choose Us, 3-step booking flow, interactive before-and-after comparison slider, instant quote estimator, demo testimonials, regional ZIP code availability checker, and FAQs.
- **Services**: In-depth catalog (Residential, Intensive Deep Clean, Commercial & Janitorial, Move-In / Move-Out, Recurring Maintenance, and Specialty Add-ons), inclusions checklist, duration estimates, transparent starting pricing, and an interactive side-by-side Service Comparison Matrix.
- **About Us**: Brand story, founder & leadership profiles, core values, hospital-grade color-coded microfiber sanitation protocol, HEPA vacuum extraction standards, and 100% satisfaction guarantee.
- **Contact Us & Booking**: Comprehensive quote enquiry form with real-time validation, property specifications (beds/baths, property type, preferred date/window), rate-limited submission to the Express backend, booking reference ID generation (e.g. `PN-10482`), direct WhatsApp chat link, phone, email, and operating hours.
- **Staff & Dispatch Portal (Admin Dashboard)**: Passcode-protected console (`purenest2026`) for managers to review incoming customer leads, filter by status (`New`, `Contacted`, `Quoted`, `Scheduled`, `Completed`), inspect detailed customer notes, update statuses live, and export enquiries to CSV.

### 2. Custom Brand Identity & SVG Assets
- **Original Logo Symbol**: Handcrafted SVG vector depicting a sleek home roofline enclosing a fresh water droplet and radiant sparkle in teal, mint, and navy.
- **Light & Dark Variations**: Embedded vector components with instant copy/export functionality.
- **Favicon**: Saved to `/public/favicon.svg`.
- **Centralized Brand Config**: Edit `src/config/brand.ts` to instantly rename the company, phone numbers, email, hours, pricing, or service zones across the entire website.

### 3. Backend & Security Architecture
- **Express + Vite Full-Stack**: `server.ts` seamlessly mounts Vite dev middleware during development and serves optimized production bundles in production.
- **Persistent Storage**: Enquiries are saved with atomic file persistence in `data/enquiries.json`.
- **Privacy & Authorization**: Public users can only submit enquiries; customer private contact records are protected behind bearer authentication.
- **Anti-Spam Rate Limiter**: Built-in sliding window rate limiter protects endpoints from automated abuse.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the website.

### Production Build
```bash
npm run build
npm start
```

---

## ⚙️ Configuration & Rebranding

### Changing Brand Information
Open `src/config/brand.ts`:
```typescript
export const BRAND_CONFIG = {
  companyName: "Your Brand Here",
  contact: {
    phone: "+1 (800) 555-0199",
    phoneRaw: "+18005550199",
    email: "hello@yourbrand.com",
    whatsappNumber: "+18005550199",
    // ...
  },
  // Update pricing, service areas, and team members here
};
```

### Staff Portal Passcode
Default passcode: `purenest2026`.
To change it in production, set the environment variable:
```bash
ADMIN_PASSCODE="your_secret_passcode"
```

---

## 📄 License
Apache-2.0
