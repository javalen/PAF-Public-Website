import { resources } from '../data/resources.js';
export const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
export function resourceHtml(article) {
  const e = escapeHtml;
  const list = resources.filter(item => item.slug !== article?.slug);
  return '<div class="resource-content"><nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/resources">Resources</a></nav>' + (article
    ? '<article><p class="reserve-kicker">Maintenance &amp; capital planning guide</p><h1>'+e(article.title)+'</h1><p class="resource-answer">'+e(article.answer)+'</p><p class="resource-byline">By Predictaf · Product education</p>'+article.sections.map(([heading,body])=>'<section><h2>'+e(heading)+'</h2><p>'+e(body)+'</p></section>').join('')+'</article>'
    : '<h1>Property maintenance resources</h1><p class="resource-answer">Practical answers for property teams managing building assets, preventive maintenance, inspections, and long-term capital plans.</p>')
    + '<aside class="resource-cta"><h2>See the workflow in Predictaf</h2><p>Explore connected asset maintenance and reserve planning.</p><a href="/explore-demo">Explore a demo →</a></aside><section><h2>'+(article?'Related resources':'Explore the guides')+'</h2><div class="resource-grid">'+list.map(item=>'<a class="resource-card" href="/resources/'+item.slug+'"><h3>'+e(item.title)+'</h3><p>'+e(item.answer)+'</p><span>Read the guide →</span></a>').join('')+'</div></section></div>';
}
