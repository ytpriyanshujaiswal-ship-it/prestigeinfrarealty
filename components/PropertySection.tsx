'use client';
import { useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { properties, locations } from '@/lib/properties';
import PropertyCard from './PropertyCard';
export default function PropertySection({title,subtitle,category,id,filters=false}:{title:string;subtitle:string;category?:string;id:string;filters?:boolean}){
 const [location,setLocation]=useState('Noida Extension'); const [showAll,setShowAll]=useState(false); const rail=useRef<HTMLDivElement>(null);
 const items=useMemo(()=>properties.filter(p=>(!category||p.category===category)&&(!filters||location==='All Locations'||p.location===location)),[category,filters,location]);
 const visible=showAll?items:items.slice(0,6);
 const move=(dir:number)=>rail.current?.scrollBy({left:dir*(rail.current.clientWidth*.82),behavior:'smooth'});
 return <section className="section" id={id}><div className="container"><div className="section-head"><div><span className="eyebrow">CURATED FOR YOU</span><h2>{title}</h2><p>{subtitle}</p></div><div className="rail-controls"><button aria-label="Scroll properties left" onClick={()=>move(-1)}><ChevronLeft/></button><button aria-label="Scroll properties right" onClick={()=>move(1)}><ChevronRight/></button></div></div>{filters&&<div className="location-filters"><span className="filter-label"><SlidersHorizontal size={15}/> Explore by location</span>{['All Locations',...locations].map(l=><button key={l} className={location===l?'location-chip active':'location-chip'} onClick={()=>setLocation(l)}>{l}</button>)}</div>}{visible.length?<div className="property-rail" ref={rail}>{visible.map(p=><div className="rail-card" key={p.id}><PropertyCard property={p}/></div>)}</div>:<div className="empty-state">No sample listings in this location yet. Try another location.</div>}<div className="section-bottom"><span className="muted-note">{items.length} sample properties to explore</span><button className="button button-outline" onClick={()=>setShowAll(!showAll)}>{showAll?'Show fewer':'View all properties'} <span>↗</span></button></div></div></section>
}
