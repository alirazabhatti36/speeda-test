import { Helmet } from 'react-helmet-async';

function SEO({ title, description, keywords, canonical, ogImage }) {
  const siteTitle = 'Speeda Test - Real Internet Speed Test';
  const siteDescription = 'Test your internet speed with AI-powered accuracy. Free, fast, and reliable speed test for download, upload, and ping.';
  const siteKeywords = 'speed test, internet speed, bandwidth test, network test, download speed, upload speed, ping test';
  const siteUrl = 'https://speedatest.com';
  const defaultImage = `${siteUrl}/og-image.png`;

  return (
    <Helmet>
      <title>{title ? `${title} | Speeda Test` : siteTitle}</title>
      <meta name="description" content={description || siteDescription} />
      <meta name="keywords" content={keywords || siteKeywords} />
      <link rel="canonical" href={`${siteUrl}${canonical || ''}`} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title || siteTitle} />
      <meta property="og:description" content={description || siteDescription} />
      <meta property="og:url" content={`${siteUrl}${canonical || ''}`} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage || defaultImage} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || siteTitle} />
      <meta name="twitter:description" content={description || siteDescription} />
      <meta name="twitter:image" content={ogImage || defaultImage} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Speeda Test" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
    </Helmet>
  );
}

export default SEO;