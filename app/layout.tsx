import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
export const metadata: Metadata = {title:'Prestige Infra Realty | Find Your Place in Noida NCR',description:'Explore sample residential, villa, plot and commercial property listings across Noida Extension, Noida, Greater Noida and Yamuna Expressway.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Header/>{children}</body></html>}
