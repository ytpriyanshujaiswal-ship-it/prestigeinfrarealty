'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight, MapPin, Phone } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

type PageSection = {
  heading?: string;
  text?: string;
  description?: string;
  items?: string[];
};

type PageContent = {
  title: string;
  intro: string;
  sections: PageSection[];
};

type SiteSettings = {
  phone?: string;
  email?: string;
  address?: string;
};

type ContentResponse = Record<string, unknown>;

const pages: Record<string, PageContent & { key: string }> = {
  about: {
    key: 'about-page',
    title: 'About Prestige Infra Realty',
    intro:
      'Our approach to property is built around clarity, care and informed decisions.',
    sections: [
      {
        heading: 'Property decisions with clarity',
        text:
          'We help buyers explore residential and commercial property options across Noida NCR with practical information and personal guidance.',
      },
    ],
  },

  contact: {
    key: 'contact-page',
    title: 'Contact Prestige Infra Realty',
    intro:
      'Tell us what you are looking for and our team can help you take the next step.',
    sections: [],
  },

  faqs: {
    key: 'faq-page',
    title: 'Frequently Asked Questions',
    intro:
      'Find answers to common questions about property enquiries and site visits.',
    sections: [
      {
        heading: 'How can I request a site visit?',
        text:
          'Submit the enquiry form or call our team to discuss availability and schedule a visit.',
      },
      {
        heading: 'How do I verify a project?',
        text:
          'Ask our team for current project details and independently verify applicable approvals and RERA information before making a decision.',
      },
    ],
  },

  privacy: {
    key: 'privacy-page',
    title: 'Privacy Policy',
    intro:
      'We use the details you provide to respond to property enquiries and coordinate requested follow-up.',
    sections: [
      {
        heading: 'Information you provide',
        text:
          'Your name, contact details and property preferences are used to handle your enquiry. Do not submit sensitive personal information through the enquiry form.',
      },
      {
        heading: 'Contact',
        text:
          'For questions about your enquiry data, contact prestigeinfrarealty1@gmail.com.',
      },
    ],
  },

  terms: {
    key: 'terms-page',
    title: 'Terms & Conditions',
    intro:
      'Website information is provided for general property discovery and enquiry purposes.',
    sections: [
      {
        heading: 'Property information',
        text:
          'Prices, inventory, approvals, possession timelines and other project details may change. Confirm current details directly with the project team before making a decision.',
      },
      {
        heading: 'No investment guarantee',
        text:
          'Any market commentary or illustrative growth information is not a guarantee of future returns.',
      },
    ],
  },
};

function isPageContent(value: unknown): value is PageContent {
  if (!value || typeof value !== 'object') return false;

  const content = value as Partial<PageContent>;

  return (
    typeof content.title === 'string' &&
    typeof content.intro === 'string' &&
    Array.isArray(content.sections)
  );
}

function isSiteSettings(value: unknown): value is SiteSettings {
  return Boolean(value && typeof value === 'object');
}

export default function ContentPage({
  params,
}: {
  params: { slug: string };
}) {
  const base = pages[params.slug];

  const [content, setContent] = useState<PageContent | null>(
    base
      ? {
          title: base.title,
          intro: base.intro,
          sections: base.sections,
        }
      : null,
  );

  const [settings, setSettings] = useState<SiteSettings>({});

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

        const rawSettings: unknown = data['site-settings'];

        if (isSiteSettings(rawSettings)) {
          setSettings(rawSettings);
        }

        if (base) {
          const pageData: unknown = data[base.key];

          if (isPageContent(pageData)) {
            setContent(pageData);
          }
        }
      } catch (error) {
        console.error('Unable to load website content:', error);
      }
    }

    void loadContent();

    return () => {
      active = false;
    };
  }, [params.slug]);

  if (!base) {
    return (
      <main className="section">
        <div className="container admin-empty">
          <h1>Page not found</h1>
          <p>This page is not available.</p>
          <Link href="/" className="button button-gold">
            Back to homepage
          </Link>
        </div>
      </main>
    );
  }

  const page = content ?? base;

  const phone = settings.phone || '+91 95829 80948';
  const phoneLink = phone.replace(/[^+0-9]/g, '');
  const email = settings.email || 'prestigeinfrarealty1@gmail.com';
  const address =
    settings.address ||
    'Golden I, Sector Techzone 4, Greater Noida West, Uttar Pradesh, 201318';

  return (
    <main className="section content-page">
      <div className="container">
        <div className="detail-breadcrumb">
          <Link href="/">
            <ArrowLeft size={16} />
            Back to homepage
          </Link>
        </div>

        <span className="eyebrow">PRESTIGE INFRA REALTY</span>

        <h1>{page.title || base.title}</h1>

        <p className="content-page-intro">
          {page.intro || base.intro}
        </p>

        {params.slug === 'contact' && (
          <div className="content-contact-grid">
            <div>
              <p>
                <Phone size={16} />
                {' '}
                <a href={`tel:${phoneLink}`}>{phone}</a>
              </p>

              <p>
                <MapPin size={16} />
                {' '}
                {address}
              </p>

              <p>
                <a href={`mailto:${email}`}>{email}</a>
              </p>
            </div>

            <div className="contact-panel">
              <div className="panel-heading">
                <h3>Send an enquiry</h3>
                <p>
                  Our team can help with your property search.
                </p>
              </div>

              <ContactForm />
            </div>
          </div>
        )}

        <div className="content-page-sections">
          {page.sections.map((section, index) => (
            <section className="detail-block" key={index}>
              <h2>
                {section.heading || `Information ${index + 1}`}
              </h2>

              <p>
                {section.text || section.description || ''}
              </p>

              {Array.isArray(section.items) && (
                <ul>
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="content-page-cta">
          <h2>Looking for a property?</h2>

          <p>
            Explore available listings or contact our team for more
            information.
          </p>

          <Link
            className="button button-gold"
            href="/#properties"
          >
            Explore properties
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
