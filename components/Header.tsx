'use client';
import Link from 'next/link';
import { Menu, Phone, X, Building2 } from 'lucide-react';
import { useState } from 'react';
export default function Header(){
 const [open,setOpen]=useState(false);
 return <header className="site-header"><div className="container header-inner"><Link href="/" className="brand"><span className="brand-mark"><Building2 size={22}/></span><span><b>PRESTIGE</b><small>INFRA REALTY</small></span></Link><button className="mobile-menu" aria-label="Toggle navigation" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button><nav className={open?'nav nav-open':'nav'}><Link onClick={()=>setOpen(false)} href="/#properties">Properties</Link><Link onClick={()=>setOpen(false)} href="/#residential">Residential</Link><Link onClick={()=>setOpen(false)} href="/#commercial">Commercial</Link><Link onClick={()=>setOpen(false)} href="/#about">About Us</Link><Link onClick={()=>setOpen(false)} href="/#contact">Contact</Link></nav><a className="header-call" href="tel:+919999999999"><Phone size={15}/> <span>Talk to an Expert</span></a></div></header>
}
