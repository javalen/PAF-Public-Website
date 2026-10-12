# Pricing requests

The homepage pricing section now gathers maintenance priorities, team size, and contact details in three steps. It displays no prices, billing discounts, or calculated quote.

The website posts to VITE_CLIENTS_SVR_URL + /pricing/lead through a dedicated public lead-only endpoint with origin checks and rate limits. No API key is included in this form. PAF-Clients-Svr validates the request, saves pricing_leads through the authenticated master client, and calls the existing Predictaf-Email /new-lead-email route. The inspected master configuration targets https://paf-client-host-mgr.fly.dev. The live collection schema was read without modifying it: quote is optional, so no dummy quote is created. Priorities, team size, company size, region, and comments are stored in notes.

Email recipient: existing LEAD_NOTIFICATION_TO configuration, with the email service fallback to leads@predictaf.com. The email contains name, email, phone, company, role, and full request notes. No SMTP credentials are exposed to the website.

Deployment requires all three changes: rebuild/deploy PAF-Public-Website, restart/deploy PAF-Clients-Svr, and restart/deploy Predictaf-Email. Verify production VITE_CLIENTS_SVR_URL , PRICING_ALLOWED_ORIGINS if using other domains, MASTER_PB_URL, PAF_EMAIL_HOST, and LEAD_NOTIFICATION_TO. No production deployment or live test email is performed by the implementation script.

If notification fails after storage succeeds, the API returns 201 with notification=failed and logs the saved record ID. The visitor sees that the request was received; the saved lead remains available for follow-up. There is no automatic email retry queue.

Backend validation and notification behavior tests: node --test test/pricingLead.test.js in PAF-Clients-Svr.
