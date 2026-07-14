import { useState } from 'react';
import './WebsiteTester.css';

function WebsiteTester() {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [testType, setTestType] = useState('basic');

    const runTest = async () => {
        if (!url) {
            setError('Please enter a URL');
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        const endpoint = testType === 'basic' 
            ? '/api/website-test' 
            : '/api/website-test-detailed';

        try {
            const response = await fetch(
                `http://localhost:5000${endpoint}?url=${encodeURIComponent(url)}`
            );
            
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.message || data.error);
            }
            
            setResult(data);
            
        } catch (err) {
            console.error('Error:', err);
            setError(err.message || 'Failed to test website');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        if (status === 200) return '#4CAF50';
        if (status >= 300 && status < 400) return '#FFC107';
        if (status >= 400) return '#F44336';
        return '#9E9E9E';
    };

    return (
        <div className="website-tester">
            <h2>🌐 Website Speed Tester</h2>
            <p className="subtitle">Test any website's performance</p>

            <div className="input-group">
                <input
                    type="url"
                    placeholder="Enter website URL (e.g., https://google.com)"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="url-input"
                />
                <select 
                    value={testType} 
                    onChange={(e) => setTestType(e.target.value)}
                    className="test-type-select"
                >
                    <option value="basic">Basic Test</option>
                    <option value="detailed">Detailed Test</option>
                </select>
                <button 
                    onClick={runTest} 
                    disabled={loading} 
                    className="test-website-btn"
                >
                    {loading ? '⏳ Testing...' : '🚀 Test Website'}
                </button>
            </div>

            {error && (
                <div className="error-msg">
                    ❌ {error}
                </div>
            )}

            {result && (
                <div className="website-results">
                    <div className="result-header">
                        <h3>📊 Results for: {result.url}</h3>
                        {result.rating && (
                            <span className="rating">{result.rating}</span>
                        )}
                    </div>

                    {result.error ? (
                        <div className="error-msg">{result.error}</div>
                    ) : (
                        <div className="metrics-grid">
                            {result.statusCode && (
                                <div className="metric-card">
                                    <span className="metric-label">Status</span>
                                    <span 
                                        className="metric-value"
                                        style={{ color: getStatusColor(result.statusCode) }}
                                    >
                                        {result.statusCode} {result.statusText}
                                    </span>
                                </div>
                            )}

                            {result.duration && (
                                <div className="metric-card">
                                    <span className="metric-label">Response Time</span>
                                    <span className="metric-value">{result.duration}ms</span>
                                </div>
                            )}

                            {result.totalLoadTime && (
                                <div className="metric-card">
                                    <span className="metric-label">Total Load Time</span>
                                    <span className="metric-value">{result.totalLoadTime}</span>
                                </div>
                            )}

                            {result.totalLoadTimeSeconds && (
                                <div className="metric-card">
                                    <span className="metric-label">Load Time (s)</span>
                                    <span className="metric-value">{result.totalLoadTimeSeconds}</span>
                                </div>
                            )}

                            {result.size && result.size.kb && (
                                <div className="metric-card">
                                    <span className="metric-label">Page Size</span>
                                    <span className="metric-value">{result.size.kb}</span>
                                </div>
                            )}

                            {result.pageInfo && (
                                <>
                                    <div className="metric-card">
                                        <span className="metric-label">Page Size</span>
                                        <span className="metric-value">{result.pageInfo.size}</span>
                                    </div>
                                    <div className="metric-card">
                                        <span className="metric-label">Characters</span>
                                        <span className="metric-value">{result.pageInfo.characters}</span>
                                    </div>
                                </>
                            )}

                            {result.tests && (
                                <>
                                    {result.tests.dns && (
                                        <div className="metric-card">
                                            <span className="metric-label">DNS</span>
                                            <span className="metric-value">{result.tests.dns.time}</span>
                                        </div>
                                    )}
                                    {result.tests.tcp && (
                                        <div className="metric-card">
                                            <span className="metric-label">TCP</span>
                                            <span className="metric-value">{result.tests.tcp.time}</span>
                                        </div>
                                    )}
                                    {result.tests.ssl && (
                                        <div className="metric-card">
                                            <span className="metric-label">SSL</span>
                                            <span className="metric-value">{result.tests.ssl.time}</span>
                                        </div>
                                    )}
                                    {result.tests.ttfb && (
                                        <div className="metric-card highlight">
                                            <span className="metric-label">TTFB</span>
                                            <span className="metric-value">{result.tests.ttfb.time}</span>
                                        </div>
                                    )}
                                </>
                            )}

                            {result.headers && (
                                <div className="metric-card full-width">
                                    <span className="metric-label">Server</span>
                                    <span className="metric-value">{result.headers.server}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default WebsiteTester;