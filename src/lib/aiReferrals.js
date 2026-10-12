// Use the existing analytics installation; do not collect query strings or identifiers.
export function trackAiReferral() {
  let hostname;
  try { hostname = new URL(document.referrer).hostname.toLowerCase(); } catch { return; }
  const sources = {'chatgpt.com':'ChatGPT','chat.openai.com':'ChatGPT','perplexity.ai':'Perplexity','copilot.microsoft.com':'Copilot','gemini.google.com':'Gemini','claude.ai':'Claude','bing.com':'Bing'};
  const match = Object.keys(sources).find(domain => hostname === domain || hostname.endsWith('.'+domain));
  if (!match) return;
  window.gtag?.('event','ai_referral',{ai_source:sources[match],landing_path:window.location.pathname});
  window.clarity?.('set','ai_source',sources[match]);
}
