import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title, 
  description, 
  keywords, 
  canonical = '/', 
  schemaType = 'SoftwareApplication',
  faqs = []
}) {
  const fullTitle = title 
    ? `${title} | Speeda Test 360` 
    : 'Speeda Test 360 — Real-Time Internet Speed Test & Broadband Analytics';

  const fullDescription = description || 
    'Test your internet download speed, upload speed, ping latency, and jitter in real-time with Speeda Test 360. Free, accurate, and 100% client-side broadband diagnostics.';

  const defaultKeywords = 'speed test, internet speed test, wifi speed test, broadband test, ping test, download speed, upload speed, jitter test, ISP speed test, Speeda Test 360, PTCL speed test, StormFiber speed test, Nayatel speed test, Cybernet speed test, website speed tester';

  const fullKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;
  const baseUrl = 'https://speedatest360.online';
  const canonicalUrl = `${baseUrl}${canonical === '/' ? '' : canonical}`;

  // Structured Data Schema Array
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'Speeda Test 360',
      'url': baseUrl,
      'applicationCategory': 'UtilitiesApplication',
      'operatingSystem': 'All',
      'description': fullDescription,
      'browserRequirements': 'Requires JavaScript & HTML5',
      'softwareVersion': '360.2.0',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'Speeda Test 360',
      'url': baseUrl,
      'logo': `${baseUrl}/favicon.svg`,
      'sameAs': [
        'https://github.com/alirazabhatti36/speeda-test'
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'Speeda Test 360',
      'url': baseUrl,
      'potentialAction': {
        '@type': 'SearchAction',
        'target': `${baseUrl}/website-test?url={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    }
  ];

  // Inject FAQPage Schema if faqs provided
  if (faqs && faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqs.map(faq => ({
        '@type': 'Question',
        'name': faq.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.a
        }
      }))
    });
  }

  return (
    <Helmet>
      {/* Title & Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Speeda Test 360" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />

      {/* JSON-LD Schemas */}
      {schemas.map((s, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}