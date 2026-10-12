import { useParams } from 'react-router-dom';
import { resources } from '../data/resources.js';
import { resourceHtml } from '../lib/resourceHtml.js';
import SearchMetadata from '../components/SearchMetadata';
import './Home.css';
import './Resources.css';
export default function Resources() {
  const { slug } = useParams();
  const article = resources.find(item => item.slug === slug);
  return <div className="reserve-site"><SearchMetadata /><header className="resource-header"><a href="/">Predictaf</a><a href="/resources">Resources</a><a href="/explore-demo">Explore a demo</a></header><main>{slug && !article ? <div className="resource-content"><h1>Resource not found</h1><a href="/resources">Browse all resources</a></div> : <div dangerouslySetInnerHTML={{__html:resourceHtml(article)}} />}</main><footer className="resource-header"><a href="/">Predictaf home</a><a href="/privacy">Privacy</a><a href="/support">Support</a></footer></div>;
}
