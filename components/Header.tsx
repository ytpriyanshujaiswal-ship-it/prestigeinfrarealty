'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, Phone, X } from 'lucide-react';
import { useState } from 'react';
export default function Header(){
 const [open,setOpen]=useState(false);
 return <header className="site-header"><div className="container header-inner"><Link href="/" className="brand brand-image" aria-label="Prestige Infra Realty home"><Image src="/prestige-logo.png" alt="Prestige Infra Realty" width={190} height={90} priority /></Link><button className="mobile-menu" aria-label="Toggle navigation" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button><nav className={open?'nav nav-open':'nav'}><Link onClick={()=>setOpen(false)} href="/#properties">Properties</Link><Link onClick={()=>setOpen(false)} href="/#residential">Residential</Link><Link onClick={()=>setOpen(false)} href="/#commercial">Commercial</Link><Link onClick={()=>setOpen(false)} href="/#about">About Us</Link><Link onClick={()=>setOpen(false)} href="/#contact">Contact</Link><Link onClick={()=>setOpen(false)} href="/admin">Admin Panel</Link></nav><a className="header-call" href="tel:+919999999999"><Phone size={15}/> <span>Talk to an Expert</span></a></div></header>
}
