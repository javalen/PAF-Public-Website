# Search and answer discovery

The build generates a resource index and ten HTML guide pages containing readable content, canonical links, social metadata, and Article or CollectionPage structured data. Homepage FAQ markup uses the same answers shown on the page. Organization and SoftwareApplication data describe verified website capabilities without invented addresses, pricing, reviews, or ratings.

Deploy the complete dist folder. Configure hosting to serve existing /resources/<slug>/index.html files before the SPA fallback; preserve the existing pilot entry. Verify production canonical URLs and submit /sitemap.xml to search consoles. Resource HTML is generated on every npm run build; edit src/data/resources.js to maintain guide text.

Existing GA4 and Clarity installations receive an ai_referral event and ai_source tag when the incoming referrer identifies a supported source. In GA4, register ai_source and landing_path as event-scoped custom dimensions. Missing referrers cannot be attributed; Bing traffic is labeled Bing and does not prove AI usage. No new tracker was installed.

Follow-up work outside this repository: validate and launch paid campaigns in the appropriate ad accounts, update the LinkedIn company profile, obtain legitimate directory listings and industry mentions, and review guide content with product and subject-matter owners. No ads or external accounts were changed. No ranking or AI citation is guaranteed.
