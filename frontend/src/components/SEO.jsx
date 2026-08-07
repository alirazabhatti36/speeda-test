import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, canonical = '/', schemaType = 'SoftwareApplication' }) {
  const fullTitle = title ? `${title} | Speeda Test 360` : 'Speeda Test 360 — Real-Time Internet Speed Test & Analytics';
  const fullDescription = description || 'Test your internet speed with high-precision 360° analytics. Free download, upload, ping, and jitter diagnostics.';
  const baseUrl = 'https://speedatest360.com'; // Default domain fallback
  const canonicalUrl = `${baseUrl}${canonical}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    'name': 'Speeda Test 360',
    'applicationCategory': 'UtilitiesApplication',
    'operatingSystem': 'All',
    'description': fullDescription,
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    }
  };

  return (
    <Helmet>
      {/* Title & Description */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}