import Link from 'next/link';
import { ArrowUpRight, MapPin, MoveRight } from 'lucide-react';
import type { Property } from '@/lib/properties';
export default function PropertyCard({property}:{property:Property}){
 return <article className="property-card"><Link href={`/projects/${property.id}`} className="property-image" style={{backgroundImage:`url('${property.image}')`}} aria-label={`View ${property.name}`}><span className="property-tag">{property.tag || property.status}</span><span className="image-arrow"><ArrowUpRight size={18}/></span></Link><div className="property-info"><p className="property-location"><MapPin size={13}/>{property.location}</p><Link href={`/projects/${property.id}`} className="property-title">{property.name}</Link><div className="property-meta"><span>{property.config}</span><span>{property.size}</span></div><div className="property-bottom"><div><small>Starting from</small><strong>{property.price}</strong></div><Link href={`/projects/${property.id}`} className="text-link" aria-label={`Details for ${property.name}`}><MoveRight size={19}/></Link></div></div></article>
}
