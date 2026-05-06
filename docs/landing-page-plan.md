# PredictiveAF Full Website Redesign — Landing Page & Conversion Optimization

> **Created**: February 12, 2026  
> **Scope**: Full redesign of all 6 routes in the PAF public website  
> **Goal**: High-converting, technically-detailed property tech marketing site targeting all 4 personas  
> **CTA Strategy**: Primary = Free Signup, Secondary = Demo Booking

---

## Table of Contents

1. [Current State Issues](#current-state-issues)
2. [Step 1: Project Setup & Cleanup](#step-1-project-setup--cleanup)
3. [Step 2: SEO & Meta Foundation](#step-2-seo--meta-foundation)
4. [Step 3: Global Layout & Navigation Redesign](#step-3-global-layout--navigation-redesign)
5. [Step 4: Homepage / Landing Page Redesign](#step-4-homepage--landing-page-redesign)
6. [Step 5: Subpage Redesigns](#step-5-subpage-redesigns)
7. [Step 6: Image Asset Requirements](#step-6-image-asset-requirements)
8. [Step 7: A/B Testing Variant Prompts](#step-7-ab-testing-variant-prompts)
9. [Verification Checklist](#verification-checklist)
10. [Key Decisions](#key-decisions)

---

## Current State Issues

These must be resolved as part of the redesign:

- **Template remnants**: `Logo.jsx` renders "Pocket" text; unused `SecondaryFeatures`, `Reviews`, `AppDemo`, `StockLogos` components still in codebase
- **Inconsistent layouts**: Support, QuickStart, and Privacy pages have NO Header/Footer; `Layout.jsx` exists but is unused
- **Broken functionality**: `Register.jsx` has undefined variables (`pb`, `navigation`, `logger`, `clazz`); `Login.jsx` has no submit handler
- **Navigation**: `NavLinks.jsx` uses `<a>` tags causing full page reloads instead of React Router `<Link>`
- **~15 typos across copy**: "Quide", "Moblie", "PredectiveAF", "Sevices", "specifiy", "seemlessly", "unberalla", "Berverly", "Numbr", "Dailog" (filename)
- **Missing Tailwind config**: Custom animations (`animate-spin-slow`, etc.) used in Hero but not defined in `tailwind.config.js`; `@tailwindcss/forms` plugin not configured
- **No SEO**: `index.html` has no meta description, OG tags, or structured data
- **Mobile broken**: `Privacy.jsx` uses `p-28` padding — terrible on mobile
- **Image disorganization**: Assets split between `src/images/` and `src/assets/` with no structure
- **Fake press logos**: `src/images/logos/` contains BBC, CNN, Forbes logos — legally problematic template remnants that must be removed

---

## Step 1: Project Setup & Cleanup

1. **Remove template remnant components**:
   - Delete `SecondaryFeatures.jsx`, `Reviews.jsx`, `AppDemo.jsx`, `StockLogos.jsx`
   - Remove their imports from `Home.jsx` (currently commented out but still imported)

2. **Fix Logo.jsx**: Replace "Pocket" text with "PredictiveAF" branding

3. **Consolidate images** into a single `src/assets/` directory:

---

## Step 2: SEO & Meta Foundation

- **Meta description**: "PredictiveAF is a property tech company that helps real estate agents and investors make better decisions using AI."
- **OG tags**: "PredictiveAF", "Property Tech", "AI", "Real Estate"
- **Structured data**: JSON-LD for property listings

---

## Step 3: Global Layout & Navigation Redesign

- **Header**: Fixed height, responsive, with navigation links
- **Footer**: Fixed height, responsive, with contact information
- **Navigation**: React Router `<Link>` instead of `<a>` tags

---

## Step 4: Homepage / Landing Page Redesign

- **Hero section**: Updated with new branding and content
- **Features section**: Updated with new content
- **Testimonials section**: Updated with new content

---

## Step 5: Subpage Redesigns

- **Support page**: Updated with new content
- **QuickStart page**: Updated with new content
- **Privacy page**: Updated with new content

---

## Step 6: Image Asset Requirements

- **Hero image**: 1920x1080px, high resolution
- **Features images**: 1200x800px, high resolution
- **Testimonials images**: 1200x800px, high resolution

---

## Step 7: A/B Testing Variant Prompts

- **Primary CTA**: Free Signup
- **Secondary CTA**: Demo Booking

---

## Verification Checklist

- [ ] All template remnants removed
- [ ] Logo updated
- [ ] Images consolidated
- [ ] SEO foundation established
- [ ] Navigation fixed
- [ ] Content updated

---

## Key Decisions

- **Brand name change**: PredictiveAF → Predictaf
- **Domain change**: predictiveaf.com → predictaf.com
- **Email change**: support@predictiveaf.com → support@predictaf.com
- **FAQ #1 update**: Explains the name origin while using the new brand
- **New row added**: Documents the brand name change

---

## Design System Alignment

The website MUST follow the design system established in AdminPanel-working. This ensures brand consistency across the admin dashboard, mobile app, and public website.

### Color Token System
**Never use hardcoded colors** — always reference semantic tokens from `design-tokens.js`:

```jsx
// ✅ CORRECT
className="bg-backgroundPrimary dark:bg-backgroundPrimary-dark"
className="text-brandPrimary dark:text-brandPrimary-dark"
className="border-borderPrimary dark:border-borderPrimary-dark"

// ❌ WRONG
className="bg-white dark:bg-black"
className="text-blue-500"
className="bg-[#075985]"
```

**3. Key Decisions table — update 2 rows:**

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Typography | Funnel_Display (headers/buttons) + Roboto (body) | Matches admin panel design system — NOT Inter/JetBrains Mono |
| Color system | Semantic tokens from `design-tokens.js` | Shared across admin dashboard, mobile app, and public website for brand consistency |

**4. References throughout the plan to update:**

- **Section 1 Hero background**: Change `dark navy (#075985)` → `brandPrimary` / `brandTertiary` (#002766) token
- **All A/B variant prompts**: Replace `#075985 primary, #06b6d4 accent` references with the actual token values: `brandPrimary (#0050B3)`, `brandSecondary (#1890FF)`, `colorSea (#13C2C2)` — and note these come from the design token system
- **Section 2 design note**: Use token-based card styling, not raw colors
- **Pricing section**: Use `backgroundSecondary` for cards, `brandPrimary` for featured plan accent
- **Final CTA dark background**: Use `backgroundPrimary-dark` (#000000) or `backgroundTertiary-dark` (#0F0F0F) instead of hardcoded `#0f172a`

---

Copy these additions into [docs/landing-page-plan.md](docs/landing-page-plan.md). The core change is: the website inherits the admin panel's `design-tokens.js` color system, uses **Funnel_Display + Roboto** fonts (not Inter + JetBrains Mono), and must follow all token/component conventions from the copilot-instructions.