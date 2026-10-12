import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE, resources, homeFaqs } from '../data/resources.js';
export default function SearchMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const article = resources.find(item => pathname.replace(/\/$/, '') === '/resources/' + item.slug);
    const isResources = pathname.replace(/\/$/, '') === '/resources';
    const title = article ? article.title + ' | Predictaf' : isResources ? 'Property maintenance resources | Predictaf' : 'Predictaf | Preventive Maintenance & Reserve Intelligence';
    const description = article?.answer || (isResources ? 'Practical guides to building assets, preventive maintenance, inspections, CMMS selection, and capital planning.' : 'Predictaf connects preventive maintenance, building assets, inspections, and work orders with system and facility Reserve Studies for property teams.');
    document.title = title;
    const url = SITE + pathname.replace(/\/$/, '') + (pathname === '/' ? '/' : '');
    function meta(selector, attributes) {
      let element = document.head.querySelector(selector);
      if (!element) { element = document.createElement('meta'); document.head.appendChild(element); }
      Object.entries(attributes).forEach(([key,value]) => element.setAttribute(key,value));
    }
    meta('meta[name="description"]', {name:'description',content:description});
    ['og','twitter'].forEach(prefix => {
      meta('meta[property="'+prefix+':title"]', {property:prefix+':title',content:title});
      meta('meta[property="'+prefix+':description"]', {property:prefix+':description',content:description});
      meta('meta[property="'+prefix+':url"]', {property:prefix+':url',content:url});
    });
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = url;
    document.getElementById('page-schema')?.remove();
    const schema = document.createElement('script'); schema.id = 'page-schema'; schema.type = 'application/ld+json';
    schema.textContent = JSON.stringify(article ? {'@context':'https://schema.org','@type':'Article',headline:article.title,description:article.answer,url,author:{'@type':'Organization',name:'Predictaf'},publisher:{'@id':SITE+'/#organization'}} : pathname === '/' ? {'@context':'https://schema.org','@type':'FAQPage',mainEntity:homeFaqs.map(faq=>({'@type':'Question',name:faq.question,acceptedAnswer:{'@type':'Answer',text:faq.answer}}))} : {'@context':'https://schema.org','@type':'CollectionPage',name:title,url});
    document.head.appendChild(schema);
    return () => schema.remove();
  }, [pathname]);
  return null;
}
