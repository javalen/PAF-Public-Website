const base = (import.meta.env.VITE_CLIENTS_SVR_URL || import.meta.env.VITE_CLIENTS_SERVER_URL || '').replace(/\/+$/, '');

export async function submitPricingLead(details) {
  if (!base) throw new Error('Pricing requests are temporarily unavailable. Please contact support or try again later.');
  const response = await fetch(base + '/pricing/lead', {
    method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(details), signal:AbortSignal.timeout(30000),
  });
  const data = await response.json().catch(()=>null);
  if (!response.ok || data?.ok !== true || !data?.id) throw new Error(data?.error || 'We could not confirm your request. Please try again.');
  return data;
}
