
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Search,
  ShieldCheck,
  TrendingUp,
  Headphones,
  MapPin,
  MoveRight,
} from 'lucide-react';

import PropertySection from '@/components/PropertySection';
import ContactForm from '@/components/ContactForm';
import { locations, properties, type Property } from '@/lib/properties';

type SiteSettings = {
  phone?: string;
  email?: string;
  address?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  twitter?: string;
  whatsapp?: string;
};

type HomepageContent = {
  heroEyebrow?: string;
  heroTitle?: string;
  heroDescription?: string;
  promoTitle?: string;
  promoDescription?: string;
  aboutTitle?: string;
  aboutDescription?: string;
};

type ContentResponse = {
  homepage?: HomepageContent;
  'site-settings'?: SiteSettings;
};

type ApiProject = {
  id?: string | number;
  name?: string;
  location?: string;
  category?: string;
  price?: string | number;
  bsp?: string | number;
  size?: string;
  config?: string;
  status?: string;
  image?: string;
  media?: unknown[];
  description?: string;
  amenities?: string[];
  rera?: string;
};

function getProjectCategory(category?: string): Property['category'] {
  if (category === 'Plot' || category === 'Villas & Plots') {
    return 'Villas & Plots';
  }

  if (category === 'Commercial') {
    return 'Commercial';
  }

  return 'Residential';
}

function mapApiProject(project: ApiProject): Property | null {
  if (project.id == null || !project.name) {
    return null;
  }

  const firstMedia =
    Array.isArray(project.media) &&
    typeof project.media[0] === 'string'
      ? project.media[0]
      : '';

  return {
    id: String(project.id),
    name: project.name,
    location: project.location || 'Noida Extension',
    category: getProjectCategory(project.category),
    price: String(project.price || ''),
    bsp: Number(project.bsp) || 0,
    size: project.size || '',
    config: project.config || '',
    status: project.status || '',
    image: project.image || firstMedia,
    description: project.description || '',
    amenities: Array.isArray(project.amenities)
      ? project.amenities
      : [],
    rera: project.rera || undefined,
  };
}

export default function Home() {
  const [cms, setCms] = useState<HomepageContent>({});
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({});
  const [liveProperties, setLiveProperties] = useState<Property[]>([]);

  const [place, setPlace] = useState('Noida Extension');
  const [kind, setKind] = useState('Any property');
  const [budget, setBudget] = useState('Any budget');
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadContent() {
      try {
        const response = await fetch('/api/content', {
          cache: 'no-store',
        });

        if (!response.ok) return;

        const data: ContentResponse = await response.json();

        if (!active) return;

        setCms(data.homepage || {});
        setSiteSettings(data['site-settings'] || {});
      } catch (error) {
        console.error('Unable to load website content:', error);
      }
    }

    async function loadProjects() {
      try {
        const response = await fetch('/api/projects', {
          cache: 'no-store',
        });

        if (!response.ok) return;

        const rows: ApiProject[] = await response.json();

        if (!active || !Array.isArray(rows)) return;

        const mappedProjects = rows
          .map(mapApiProject)
          .filter((project): project is Property => project !== null);

        setLiveProperties(mappedProjects);
      } catch (error) {
        console.error('Unable to load published projects:', error);
      }
    }

    void loadContent();
    void loadProjects();

    return () => {
      active = false;
    };
  }, []);

  const catalogue = liveProperties.length > 0
    ? liveProperties
    : properties;

  const results = useMemo(() => {
    return catalogue.filter((property) => {
      const matchesLocation =
        place === 'All locations' || property.location === place;

      const matchesKind =
        kind === 'Any property' ||
        (kind === 'Apartments' &&
          property.category === 'Residential') ||
        (kind === 'Villas & plots' &&
          property.category === 'Villas & Plots') ||
        (kind === 'Commercial' &&
          property.category === 'Commercial');

      const bsp = Number(property.bsp) || 0;

      const matchesBudget =
        budget === 'Any budget' ||
        (budget === 'Under ₹1 Cr' && bsp < 10000) ||
        (budget === '₹1–2 Cr' && bsp >= 10000 && bsp < 20000) ||
        (budget === '₹2 Cr+' && bsp >= 20000);

      return matchesLocation && matchesKind && matchesBudget;
    });
  }, [catalogue, place, kind, budget]);

  const phone = siteSettings.phone || '+91 95829 80948';
  const phoneLink = phone.replace(/[^+0-9]/g, '');
  const email = siteSettings.email || 'prestigeinfrarealty1@gmail.com';

  const address =
    siteSettings.address ||
    'Golden I, Sector Techzone 4, Greater Noida West, Uttar Pradesh, 201318';

  const heroTitle = cms.heroTitle || 'Find a place to belong.';
  const heroWords = heroTitle.trim().split(/\s+/);
  const heroFirstLine =
    heroWords.length > 2
      ? heroWords.slice(0, -2).join(' ')
      : heroTitle;

  const heroSecondLine =
    heroWords.length > 2
      ? heroWords.slice(-2).join(' ')
      : '';

  return (
    <main id="top">
      <section className="hero">
        <div className="hero-image" />
        <div className="hero-shade" />

        <div className="container hero-content">
          <div className="hero-copy">
            <span className="eyebrow eyebrow-light">
              <span className="eyebrow-dot" />
              {cms.heroEyebrow || 'YOUR NEXT CHAPTER STARTS HERE'}
            </span>

            <h1>
              {heroFirstLine}
              {heroSecondLine && (
                <>
                  <br />
                  <em>{heroSecondLine}</em>
                </>
              )}
            </h1>

            <p>
              {cms.heroDescription ||
                'Thoughtfully chosen homes and investment opportunities across Noida NCR — with guidance you can trust.'}
            </p>

            <div className="hero-actions">
              <a className="button button-gold" href="#properties">
                Explore properties
                <ArrowUpRight size={17} />
              </a>

              <a className="hero-text-link" href="#about">
                Why Prestige Infra
                <MoveRight size={16} />
              </a>
            </div>
          </div>

          <div className="hero-caption">
            <span>01 / 04</span>
            <span className="caption-line" />
            <span>Spaces for living. Opportunities for growth.</span>
          </div>
        </div>

        <div className="container search-wrap">
          <form
            className="property-search"
            onSubmit={(event) => {
              event.preventDefault();
              setSearched(true);

              document
                .getElementById('search-results')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="search-title">
              <span>FIND YOUR PROPERTY</span>
              <small>Tell us what you’re looking for</small>
            </div>

            <label>
              <span>Location</span>
              <select
                value={place}
                onChange={(event) => setPlace(event.target.value)}
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
                <option value="All locations">All locations</option>
              </select>
            </label>

            <label>
              <span>Property type</span>
              <select
                value={kind}
                onChange={(event) => setKind(event.target.value)}
              >
                <option value="Any property">Any property</option>
                <option value="Apartments">Apartments</option>
                <option value="Villas & plots">Villas &amp; plots</option>
                <option value="Commercial">Commercial</option>
              </select>
            </label>

            <label>
              <span>Budget</span>
              <select
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
              >
                <option value="Any budget">Any budget</option>
                <option value="Under ₹1 Cr">Under ₹1 Cr</option>
                <option value="₹1–2 Cr">₹1–2 Cr</option>
                <option value="₹2 Cr+">₹2 Cr+</option>
              </select>
            </label>

            <button className="search-button" type="submit">
              <Search size={17} />
              <span>Search</span>
            </button>
          </form>
        </div>
      </section>

      {searched && (
        <section className="search-results section" id="search-results">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow">YOUR SEARCH</span>
                <h2>Matching properties</h2>
                <p>
                  {results.length} listing(s) match your selected filters.
                </p>
              </div>

              <button
                className="button button-outline"
                type="button"
                onClick={() => setSearched(false)}
              >
                Clear results
              </button>
            </div>

            <div className="results-grid">
              {results.map((property) => (
                <Link
                  href={`/projects/${property.id}`}
                  className="result-row"
                  key={property.id}
                >
                  <div
                    className="result-thumb"
                    style={{
                      backgroundImage: property.image
                        ? `url("${property.image}")`
                        : 'none',
                    }}
                  />

                  <div>
                    <strong>{property.name}</strong>
                    <small>
                      <MapPin size={12} />
                      {' '}
                      {property.location} · {property.config}
                    </small>
                  </div>

                  <b>{property.price}</b>
                  <ArrowUpRight size={17} />
                </Link>
              ))}

              {results.length === 0 && (
                <p>No properties match these filters. Try another search.</p>
              )}
            </div>
          </div>
        </section>
      )}

      <div id="properties">
        <PropertySection
          title="Trending properties"
          subtitle="A handpicked starting point for your next move."
          id="trending"
          filters
        />
      </div>

      <PropertySection
        title="Residential apartments"
        subtitle="Everyday comfort, considered design and room to grow."
        category="Residential"
        id="residential"
      />

      <section className="promo-banner">
        <div className="promo-photo" />
        <div className="promo-overlay" />

        <div className="container promo-content">
          <span className="eyebrow eyebrow-light">
            A BETTER WAY TO INVEST
          </span>

          <h2>
            {cms.promoTitle || 'Live beautifully. Invest thoughtfully.'}
          </h2>

          <p>
            {cms.promoDescription ||
              'Let’s find a property that fits your plans today — and the possibilities you’re building for tomorrow.'}
          </p>

          <a className="button button-gold" href="#contact">
            Let’s connect
            <ArrowUpRight size={17} />
          </a>

          <div className="promo-index">
            PRESTIGE INFRA REALTY
            <span>—</span>
            YOUR PROPERTY PARTNER
          </div>
        </div>
      </section>

      <PropertySection
        title="Villas & plots"
        subtitle="More room to imagine what comes next."
        category="Villas & Plots"
        id="villas"
      />

      <PropertySection
        title="Commercial opportunities"
        subtitle="Explore spaces for your next business chapter."
        category="Commercial"
        id="commercial"
      />

      <section className="trust-section" id="about">
        <div className="container trust-inner">
          <div className="trust-intro">
            <span className="eyebrow eyebrow-light">
              THE PRESTIGE APPROACH
            </span>

            <h2>
              {cms.aboutTitle || 'Property decisions, with more clarity.'}
            </h2>

            <p>
              {cms.aboutDescription ||
                'Buying property is personal. We aim to make the journey more informed, more transparent and more aligned with your goals.'}
            </p>

            <a href="/about" className="light-link">
              Get to know us
              <MoveRight size={16} />
            </a>
          </div>

          <div className="trust-points">
            <div className="trust-point">
              <span className="trust-icon">
                <ShieldCheck />
              </span>
              <div>
                <h3>Guidance with care</h3>
                <p>
                  Understand the details, compare options and make decisions
                  at your pace.
                </p>
              </div>
            </div>

            <div className="trust-point">
              <span className="trust-icon">
                <TrendingUp />
              </span>
              <div>
                <h3>Choices with context</h3>
                <p>
                  Discuss location, budget, property fit and investment
                  considerations clearly.
                </p>
              </div>
            </div>

            <div className="trust-point">
              <span className="trust-icon">
                <Headphones />
              </span>
              <div>
                <h3>Support at every step</h3>
                <p>
                  From first enquiry to arranging a site visit, get help
                  along the way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="container contact-layout">
          <div className="contact-copy">
            <span className="eyebrow">
              LET’S START A CONVERSATION
            </span>

            <h2>
              Your next move
              <br />
              starts <em>here.</em>
            </h2>

            <p>
              Tell us a little about what you’re looking for. Our team can
              help you explore the options.
            </p>

            <div className="contact-detail">
              <span className="detail-icon">
                <Headphones size={19} />
              </span>
              <div>
                <small>Speak to our team</small>
                <a href={`tel:${phoneLink}`}>{phone}</a>
                <small>Call or WhatsApp for property enquiries</small>
              </div>
            </div>

            <div className="contact-detail">
              <span className="detail-icon">
                <MapPin size={19} />
              </span>
              <div>
                <small>Our focus locations</small>
                <strong>{address}</strong>
              </div>
            </div>
          </div>

          <div className="contact-panel">
            <div className="panel-heading">
              <h3>Tell us what you need</h3>
              <p>We’ll help you take the next step.</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-main">
            <a href="#top" className="brand brand-footer">
              <Image
                src="/prestige-mark.png"
                alt="Prestige Infra Realty emblem"
                width={88}
                height={88}
              />
            </a>

            <p className="footer-tagline">
              <span>Spaces for living.</span>
              <span>Opportunities for growth.</span>
            </p>

            <div className="footer-links">
              <a href="#properties">Properties</a>
              <Link href="/about">About us</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/faqs">FAQs</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/admin">Admin Panel</Link>
            </div>

            <div className="footer-socials">
              <a
                href={siteSettings.instagram || 'https://www.instagram.com/'}
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>

              <a
                href={siteSettings.facebook || 'https://www.facebook.com/'}
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>

              <a
                href={siteSettings.linkedin || 'https://www.linkedin.com/'}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>

              <a
                href={siteSettings.twitter || 'https://x.com/'}
                target="_blank"
                rel="noreferrer"
              >
                X / Twitter
              </a>

              <a
                href={
                  siteSettings.whatsapp ||
                  'https://wa.me/919582980948'
                }
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>

              <a href={`mailto:${email}`}>{email}</a>
            </div>

            <div className="footer-bottom">
              <span>
                © {new Date().getFullYear()} Prestige Infra Realty. Your
                property partner.
              </span>
              <span>
                Sample listings and prices are illustrative and must be
                verified.
              </span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
