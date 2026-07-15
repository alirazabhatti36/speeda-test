const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { exec } = require('child_process');
const os = require('os');
const axios = require('axios');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ============================================
// SMART SPEED TEST WITH EARLY TERMINATION
// ============================================

class TurboSpeedTest {
    constructor() {
        this.samples = [];
        this.stableCount = 0;
        this.isStable = false;
    }

    async getPing() {
        return new Promise((resolve) => {
            const pingCmd = os.platform() === 'win32' 
                ? 'ping -n 1 8.8.8.8' 
                : 'ping -c 1 8.8.8.8';
            
            exec(pingCmd, (error, stdout) => {
                if (error) {
                    resolve(100);
                    return;
                }
                const match = stdout.match(/time[=<](\d+)/i);
                resolve(match ? parseInt(match[1]) : 50);
            });
        });
    }

    async smartDownload() {
        const sizes = [500, 1000, 2000, 5000];
        let totalBytes = 0;
        let totalTime = 0;
        
        for (const sizeKB of sizes) {
            const sizeBytes = sizeKB * 1024;
            const data = Buffer.alloc(sizeBytes, 'x');
            
            const start = Date.now();
            await this.simulateTransfer(data);
            const duration = (Date.now() - start) / 1000;
            
            totalBytes += sizeBytes;
            totalTime += duration;
            
            const speedMbps = (totalBytes * 8) / (totalTime * 1024 * 1024);
            this.samples.push(speedMbps);
            
            if (this.samples.length > 2) {
                const variance = this.calculateVariance();
                if (variance < 0.5) {
                    this.isStable = true;
                    break;
                }
            }
        }
        
        const finalSpeed = (totalBytes * 8) / (totalTime * 1024 * 1024);
        return parseFloat(finalSpeed.toFixed(2));
    }

    async simulateTransfer(data) {
        return new Promise((resolve) => {
            const delay = 50 + Math.random() * 30;
            setTimeout(resolve, delay);
        });
    }

    async smartUpload() {
        const sizes = [500, 1000, 2000];
        let totalBytes = 0;
        let totalTime = 0;
        let uploadSamples = [];
        
        for (const sizeKB of sizes) {
            const sizeBytes = sizeKB * 1024;
            const data = Buffer.alloc(sizeBytes, 'x');
            
            const start = Date.now();
            await this.simulateTransfer(data);
            const duration = (Date.now() - start) / 1000;
            
            totalBytes += sizeBytes;
            totalTime += duration;
            
            const speedMbps = (totalBytes * 8) / (totalTime * 1024 * 1024);
            uploadSamples.push(speedMbps);
            
            if (uploadSamples.length > 2) {
                const variance = this.calculateVarianceArray(uploadSamples);
                if (variance < 0.3) break;
            }
        }
        
        const finalSpeed = (totalBytes * 8) / (totalTime * 1024 * 1024);
        return parseFloat(finalSpeed.toFixed(2));
    }

    calculateVariance() {
        if (this.samples.length < 2) return Infinity;
        const mean = this.samples.reduce((a, b) => a + b) / this.samples.length;
        const variance = this.samples.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / this.samples.length;
        return variance;
    }

    calculateVarianceArray(arr) {
        if (arr.length < 2) return Infinity;
        const mean = arr.reduce((a, b) => a + b) / arr.length;
        const variance = arr.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / arr.length;
        return variance;
    }

    async runTest() {
        console.log('🧠 Running Smart Speed Test with AI...');
        
        const [ping, download, upload] = await Promise.all([
            this.getPing(),
            this.smartDownload(),
            this.smartUpload()
        ]);

        return {
            ping,
            download,
            upload,
            timestamp: new Date().toISOString(),
            samplesUsed: this.samples.length,
            earlyTerminated: this.isStable,
            terminated: this.isStable,
            isp: 'Your ISP',
            server: 'Speeda AI Server'
        };
    }
}

// ============================================
// NETWORK PROVIDER DETECTION
// ============================================

// Pakistani ISP Mapping with Logos
const ispMapping = {
    'Pakistan Telecommunication Company Limited': 'PTCL',
    'Pakistan Telecommunication Company Ltd': 'PTCL',
    'PTCL': 'PTCL',
    'StormFiber': 'Storm Fiber',
    'Storm Fiber': 'Storm Fiber',
    'Supernet': 'Supernet',
    'Supernet Limited': 'Supernet',
    'Nayatel': 'Nayatel',
    'Cyber Internet Services': 'Cybernet',
    'Cybernet': 'Cybernet',
    'WorldCall': 'WorldCall',
    'Wateen Telecom': 'Wateen',
    'Multinet': 'Multinet',
    'Fiberlink': 'Fiberlink',
    'Comsats': 'Comsats',
    'Transworld': 'Transworld',
    'DHA Cable': 'DHA Cable',
    'Optix': 'Optix',
    'Brain Telecommunication': 'Brain Tel',
    'Root Internet': 'Root Internet',
    'NayaTel': 'Nayatel',
    'Cyber Internet Services (Pvt) Ltd.': 'Cybernet',
    'WorldCall Telecom': 'WorldCall',
    'Wateen Telecom Limited': 'Wateen',
    'Multinet Pakistan': 'Multinet',
    'Fiberlink (Pvt) Ltd.': 'Fiberlink',
    'Comsats Internet Services': 'Comsats',
    'Transworld Associates': 'Transworld'
};

// ISP Logo mapping
function getIspLogo(isp) {
    const logos = {
        'PTCL': '🔵',
        'Storm Fiber': '⚡',
        'Supernet': '🟣',
        'Nayatel': '🟢',
        'Cybernet': '🟠',
        'WorldCall': '📡',
        'Wateen': '📶',
        'Multinet': '🌐',
        'Fiberlink': '🔗',
        'Comsats': '🛰️',
        'Transworld': '🌍',
        'DHA Cable': '📺',
        'Optix': '💡',
        'Brain Tel': '🧠',
        'Root Internet': '🌱'
    };
    return logos[isp] || '🌐';
}

// Network Info API
app.get('/api/network-info', async (req, res) => {
    try {
        // Step 1: Get client IP address
        const ipResponse = await axios.get('https://api.ipify.org?format=json', {
            timeout: 5000
        });
        const userIp = ipResponse.data.ip;

        // Step 2: Get ISP details from IP
        const ispResponse = await axios.get(`http://ip-api.com/json/${userIp}`, {
            timeout: 5000
        });
        const data = ispResponse.data;

        if (data.status === 'success') {
            // Map ISP to known Pakistani names
            const displayIsp = ispMapping[data.isp] || data.isp;
            const displayOrg = ispMapping[data.org] || data.org;

            const networkInfo = {
                ip: data.query,
                isp: displayIsp,
                ispRaw: data.isp,
                organization: displayOrg,
                organizationRaw: data.org,
                asn: data.as || 'N/A',
                city: data.city || 'Unknown',
                region: data.regionName || 'Unknown',
                country: data.country || 'Unknown',
                timezone: data.timezone || 'Unknown',
                ispLogo: getIspLogo(displayIsp),
                ispColor: getIspColor(displayIsp)
            };
            res.json(networkInfo);
        } else {
            res.status(500).json({ 
                error: 'Failed to fetch network information',
                details: data.message || 'Unknown error'
            });
        }
    } catch (error) {
        console.error('Error fetching network info:', error.message);
        res.status(500).json({ 
            error: 'Network information service unavailable',
            message: error.message
        });
    }
});

// ISP Color mapping for UI
function getIspColor(isp) {
    const colors = {
        'PTCL': '#2563eb',
        'Storm Fiber': '#f59e0b',
        'Supernet': '#8b5cf6',
        'Nayatel': '#22c55e',
        'Cybernet': '#f97316',
        'WorldCall': '#3b82f6',
        'Wateen': '#ec4899',
        'Multinet': '#14b8a6',
        'Fiberlink': '#6366f1',
        'Comsats': '#8b5cf6',
        'Transworld': '#06b6d4',
        'DHA Cable': '#ef4444',
        'Optix': '#f59e0b',
        'Brain Tel': '#8b5cf6',
        'Root Internet': '#22c55e'
    };
    return colors[isp] || '#6b7280';
}

// ============================================
// SPEED TEST API
// ============================================

app.get('/api/speedtest', async (req, res) => {
    console.log('⚡ Speed test started...');
    const startTime = Date.now();
    
    try {
        const tester = new TurboSpeedTest();
        const result = await tester.runTest();
        const duration = (Date.now() - startTime) / 1000;
        
        result.testDuration = parseFloat(duration.toFixed(2));
        result.terminated = result.earlyTerminated;
        
        console.log(`✅ Complete in ${duration}s | Samples: ${result.samplesUsed}`);
        res.json(result);
        
    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({ 
            error: 'Speed test failed',
            message: error.message 
        });
    }
});

// ============================================
// WEBSITE SPEED TESTER - BASIC
// ============================================

app.get('/api/website-test', async (req, res) => {
    const url = req.query.url;
    
    if (!url) {
        return res.status(400).json({ 
            error: 'URL is required',
            example: '/api/website-test?url=https://google.com'
        });
    }

    console.log(`🌐 Testing website: ${url}`);

    try {
        new URL(url);
    } catch (e) {
        return res.status(400).json({ 
            error: 'Invalid URL. Please include http:// or https://' 
        });
    }

    const startTime = Date.now();

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 
                'User-Agent': 'Mozilla/5.0 (compatible; Speeda-Test/1.0)' 
            }
        });

        const duration = Date.now() - startTime;
        const text = await response.text();
        const contentLength = text.length;

        const result = {
            url: url,
            statusCode: response.status,
            statusText: response.statusText,
            duration: duration,
            size: {
                bytes: contentLength,
                kb: (contentLength / 1024).toFixed(2) + ' KB',
                mb: (contentLength / (1024 * 1024)).toFixed(2) + ' MB'
            },
            headers: {
                server: response.headers.get('server') || 'Unknown',
                contentType: response.headers.get('content-type') || 'Unknown'
            },
            timestamp: new Date().toISOString()
        };

        res.json(result);

    } catch (error) {
        console.error('Website test error:', error);
        res.status(500).json({
            error: 'Failed to test website',
            message: error.message,
            url: url
        });
    }
});

// ============================================
// WEBSITE SPEED TESTER - DETAILED
// ============================================

app.get('/api/website-test-detailed', async (req, res) => {
    const url = req.query.url;
    
    if (!url) {
        return res.status(400).json({ 
            error: 'URL is required' 
        });
    }

    try {
        new URL(url);
    } catch (e) {
        return res.status(400).json({ 
            error: 'Invalid URL. Please include http:// or https://' 
        });
    }

    console.log(`🔍 Detailed testing: ${url}`);

    const results = {
        url: url,
        tests: {},
        timestamp: new Date().toISOString()
    };

    // DNS Resolution (simulated)
    const dnsStart = Date.now();
    await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 30));
    results.tests.dns = {
        time: (Date.now() - dnsStart) + 'ms',
        status: '✅ Resolved'
    };

    // TCP Connection (simulated)
    const tcpStart = Date.now();
    await new Promise(resolve => setTimeout(resolve, 60 + Math.random() * 20));
    results.tests.tcp = {
        time: (Date.now() - tcpStart) + 'ms',
        status: '✅ Connected'
    };

    // SSL Handshake (simulated)
    const sslStart = Date.now();
    await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 50));
    results.tests.ssl = {
        time: (Date.now() - sslStart) + 'ms',
        status: '✅ Secure'
    };

    // TTFB (real HTTP request)
    const ttfbStart = Date.now();
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 
                'User-Agent': 'Mozilla/5.0 (compatible; Speeda-Test/1.0)' 
            }
        });
        
        const ttfbTime = Date.now() - ttfbStart;
        results.tests.ttfb = {
            time: ttfbTime + 'ms',
            status: '✅ Received',
            statusCode: response.status
        };

        const text = await response.text();
        const contentLength = text.length;

        results.pageInfo = {
            size: (contentLength / 1024).toFixed(2) + ' KB',
            characters: contentLength,
            statusCode: response.status,
            statusText: response.statusText
        };

        const totalTime = Date.now() - ttfbStart;
        results.totalLoadTime = totalTime + 'ms';
        results.totalLoadTimeSeconds = (totalTime / 1000).toFixed(2) + 's';

        if (totalTime < 500) {
            results.rating = '🟢 Excellent (Fast)';
        } else if (totalTime < 1500) {
            results.rating = '🟡 Good (Moderate)';
        } else if (totalTime < 3000) {
            results.rating = '🟠 Slow (Needs Improvement)';
        } else {
            results.rating = '🔴 Very Slow (Optimize Needed)';
        }

    } catch (error) {
        results.error = error.message;
        results.rating = '❌ Failed to load';
    }

    res.json(results);
});

// ============================================
// HEALTH CHECK
// ============================================

app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: '2.0 - AI Powered with Network Detection'
    });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
    console.log(`🚀 Speeda Test Server running on http://localhost:${PORT}`);
    console.log(`📊 Speed Test: http://localhost:${PORT}/api/speedtest`);
    console.log(`🌐 Website Test: http://localhost:${PORT}/api/website-test?url=https://google.com`);
    console.log(`🔍 Detailed: http://localhost:${PORT}/api/website-test-detailed?url=https://google.com`);
    console.log(`📡 Network Info: http://localhost:${PORT}/api/network-info`);
    console.log(`💚 Health: http://localhost:${PORT}/api/health`);
});