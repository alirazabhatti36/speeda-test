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

  const defaultKeywords = 'speed test, internet speed test, wifi speed test, broadband test, ping test, download speed, upload speed, jitter test, latency test, bufferbloat test, 5g speed test, 4g lte speed test, fiber speed test, website speed tester, ISP speed test, Speeda Test 360, PTCL speed test, StormFiber speed test, Nayatel speed test, Transworld speed test, Jazz 4G speed test, Zong 4G speed test, internet speed test Karachi, Lahore broadband speed, Islamabad fiber test, Rawalpindi speed test, Faisalabad internet, ATT fiber speed test, Verizon Fios speed test, Xfinity speed test, Spectrum speed test, Virgin Media speed test, BT broadband test, Etisalat speed test Dubai, du fiber UAE, JioFiber speed test, Airtel Xstream speed test, Starlink speed test';

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
      'keywords': fullKeywords,
      'areaServed': [
        { '@type': 'Country', 'name': 'Worldwide' },
        { '@type': 'Country', 'name': 'Pakistan' },
        { '@type': 'Country', 'name': 'United States' },
        { '@type': 'Country', 'name': 'United Kingdom' },
        { '@type': 'Country', 'name': 'United Arab Emirates' },
        { '@type': 'Country', 'name': 'India' }
      ],
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
      'founder': {
        '@type': 'Person',
        'name': 'Ali Raza Bhatti',
        'jobTitle': 'Lead Network Software Engineer'
      },
      'sameAs': [
        'https://github.com/alirazabhatti36/speeda-test'
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': 'Ali Raza Bhatti',
      'jobTitle': 'Lead Network Software Engineer',
      'url': `${baseUrl}/about`
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

  // Inject HowTo Schema on homepage for rich tutorial cards
  if (canonical === '/') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      'name': 'How to Test Your Internet Speed Accurately',
      'description': 'Simple 4-step guide to accurately test your broadband download speed, upload throughput, ping latency, and jitter in real-time.',
      'totalTime': 'PT30S',
      'step': [
        {
          '@type': 'HowToStep',
          'position': 1,
          'name': 'Connect to Network',
          'text': 'Connect your PC, laptop, or smartphone to your primary 5 GHz Wi-Fi band or connect directly via Ethernet cable.'
        },
        {
          '@type': 'HowToStep',
          'position': 2,
          'name': 'Close Background Apps',
          'text': 'Pause ongoing video downloads, torrents, cloud syncing (Google Drive/OneDrive), and heavy background tabs.'
        },
        {
          '@type': 'HowToStep',
          'position': 3,
          'name': 'Start Speed Test',
          'text': 'Click the START SPEED TEST button on Speeda Test 360 to initiate real-time multi-stream throughput testing.'
        },
        {
          '@type': 'HowToStep',
          'position': 4,
          'name': 'Analyze Your Metrics',
          'text': 'Review your real-time Download (Mbps), Upload (Mbps), Ping latency (ms), and Jitter network stability.'
        }
      ]
    });
  }

  // Inject BreadcrumbList Schema on secondary pages for enhanced SERP breadcrumbs
  if (canonical && canonical !== '/') {
    const pageLabel = title ? title.split('—')[0].trim() : canonical.replace('/', '').replace(/-/g, ' ');
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': baseUrl
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': pageLabel,
          'item': canonicalUrl
        }
      ]
    });
  }

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

  const ogImageUrl = `${baseUrl}/og-image.svg`;

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
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Speeda Test 360 — Real-Time Internet Speed Test" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={ogImageUrl} />

      {/* JSON-LD Schemas */}
      {schemas.map((s, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}