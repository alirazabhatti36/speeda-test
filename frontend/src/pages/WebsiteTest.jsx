import SEO from '../components/SEO';
import WebsiteTester from '../components/WebsiteTester';

function WebsiteTest() {
  return (
    <>
      <SEO
        title="Website Performance Test"
        description="Analyze any website's speed and performance with basic and detailed testing tools."
        canonical="/website-test"
      />

      <div className="page-container">
        <WebsiteTester />
      </div>
    </>
  );
}

export default WebsiteTest;
