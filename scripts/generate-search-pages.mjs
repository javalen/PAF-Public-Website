import fs from 'node:fs';
import { SITE, resources, homeFaqs } from '../src/data/resources.js';
import { escapeHtml, resourceHtml } from '../src/lib/resourceHtml.js';
const template = fs.readFileSync('dist/index.html','utf8');
const paths = ['', ...resources.map(item=>'/'+item.slug)];
for (const suffix of paths) {
  const article = resources.find(item=>suffix === '/'+item.slug);
  const title = article ? article.title+' | Predictaf' : 'Property maintenance resources | Predictaf';
  const description = article?.answer || 'Practical guides to building assets, preventive maintenance, inspections, CMMS selection, and capital planning.';
  const url = SITE+'/resources'+suffix;
  const schema = article ? {'@context':'https://schema.org','@type':'Article',headline:article.title,description,url,author:{'@type':'Organization',name:'Predictaf'},publisher:{'@id':SITE+'/#organization'}} : {'@context':'https://schema.org','@type':'CollectionPage',name:title,url};
  let html = template.replace(/<title>[^<]*<\/title>/, '<title>'+escapeHtml(title)+'</title>').replace(/<link rel="canonical"[^>]*>/g,'').replace(/<meta\s+(?:name="description"|property="(?:og|twitter):(?:title|description|url)")[^>]*>/g,'');
  html = html.replace('</head>', '<link rel="canonical" href="'+url+'"/><meta name="description" content="'+escapeHtml(description)+'"/>'+['og','twitter'].map(prefix=>'<meta property="'+prefix+':title" content="'+escapeHtml(title)+'"/><meta property="'+prefix+':description" content="'+escapeHtml(description)+'"/><meta property="'+prefix+':url" content="'+url+'"/>').join('')+'<script id="page-schema" type="application/ld+json">'+JSON.stringify(schema)+'</script></head>').replace('<div id="root"></div>','<div id="root"><div class="reserve-site"><header class="resource-header"><a href="/">Predictaf</a><a href="/resources">Resources</a><a href="/explore-demo">Explore a demo</a></header><main>'+resourceHtml(article)+'</main></div></div>');
  const dir = 'dist/resources'+suffix; fs.mkdirSync(dir,{recursive:true}); fs.writeFileSync(dir+'/index.html',html);
}
const faq = {'@context':'https://schema.org','@type':'FAQPage',mainEntity:homeFaqs.map(item=>({'@type':'Question',name:item.question,acceptedAnswer:{'@type':'Answer',text:item.answer}}))};
fs.writeFileSync('dist/index.html',template.replace('<div id="root"></div>','<div id="root"><main><h1>Predictaf preventive maintenance and reserve intelligence</h1><p>Predictaf connects building assets, maintenance, inspections, and work orders with system and facility Reserve Studies.</p><a href="/resources">Maintenance resources</a>'+homeFaqs.map(item=>'<section><h2>'+escapeHtml(item.question)+'</h2><p>'+escapeHtml(item.answer)+'</p></section>').join('')+'</main></div>').replace('</head>','<script id="page-schema" type="application/ld+json">'+JSON.stringify(faq)+'</script></head>'));
fs.writeFileSync('dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+['/','/resources',...resources.map(item=>'/resources/'+item.slug)].map(route=>'<url><loc>'+SITE+route+'</loc></url>').join('')+'</urlset>');
console.log('Generated 10 static guides, resource index, homepage answers, and sitemap.');
