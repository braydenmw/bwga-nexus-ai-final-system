const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3002; // Use different port to avoid conflict

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Route for the main customer work report system - MUST come before static files
app.get('/', (req, res) => {
    const htmlPath = path.join(__dirname, 'customer-work-report.html');
    console.log('Serving customer work report from:', htmlPath);
    res.sendFile(htmlPath);
});

// Serve static files from the current directory
app.use(express.static(__dirname));

// Route to serve the full Clarity Matrix UI
app.get('/clarity-matrix', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Customer Work Report System - Full Interface</title>
            <style>
                body { margin: 0; font-family: 'Inter', sans-serif; }
                #root { height: 100vh; }
            </style>
        </head>
        <body>
            <div id="root"></div>
            
            <!-- React and dependencies -->
            <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
            <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
            <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
            
            <!-- Main app -->
            <script type="text/babel">
                const { useState, useEffect } = React;
                
                // Simplified Clarity Matrix UI for demo
                const CustomerWorkReportSystem = () => {
                    const [currentStep, setCurrentStep] = useState(1);
                    const [context, setContext] = useState({
                        organizationType: '',
                        region: '',
                        goal: '',
                        aiPersona: '',
                        analyticalLens: '',
                        toneStyle: '',
                        modules: [],
                        dataSources: []
                    });

                    const steps = [
                        { id: 1, title: 'Context & Profile', description: 'Define your organization and regional context' },
                        { id: 2, title: 'Goal Articulation', description: 'Specify your strategic objectives' },
                        { id: 3, title: 'Stakeholder Mapping', description: 'Identify key stakeholders and their interests' },
                        { id: 4, title: 'Market Analysis', description: 'Analyze market conditions and opportunities' },
                        { id: 5, title: 'Competitive Landscape', description: 'Map competitive dynamics' },
                        { id: 6, title: 'Risk Assessment', description: 'Evaluate potential risks and mitigation strategies' },
                        { id: 7, title: 'AI Configuration', description: 'Configure AI personas and analytical frameworks' },
                        { id: 8, title: 'Data Integration', description: 'Integrate and validate data sources' },
                        { id: 9, title: 'Model Training', description: 'Train AI models on your specific context' },
                        { id: 10, title: 'Intelligence Generation', description: 'Generate novel insights and frameworks' },
                        { id: 11, title: 'Validation & Testing', description: 'Validate generated intelligence' },
                        { id: 12, title: 'Deployment & Monitoring', description: 'Deploy and monitor your intelligence system' }
                    ];

                    const updateContext = (updates) => {
                        setContext(prev => ({ ...prev, ...updates }));
                    };

                    return (
                        <div style={{
                            minHeight: '100vh',
                            background: '#000',
                            color: '#fff',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            {/* Header */}
                            <header style={{
                                background: 'linear-gradient(135deg, #1a1a1a 0%, #000 100%)',
                                borderBottom: '1px solid #3a3a3a',
                                padding: '1rem 2rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div>
                                    <div style={{
                                        fontSize: '1.5rem',
                                        fontWeight: '700',
                                        color: '#00ffff',
                                        textTransform: 'uppercase',
                                        letterSpacing: '2px'
                                    }}>
                                        Customer Work Report System
                                    </div>
                                    <div style={{
                                        fontSize: '0.875rem',
                                        color: '#888',
                                        marginTop: '0.25rem'
                                    }}>
                                        12-Step Intelligence Generation System
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{
                                        width: '8px',
                                        height: '8px',
                                        background: '#00ffff',
                                        borderRadius: '50%',
                                        animation: 'pulse 2s infinite'
                                    }} />
                                    <span style={{ fontSize: '0.875rem', color: '#00ffff' }}>
                                        Step {currentStep} of 12
                                    </span>
                                </div>
                            </header>

                            {/* Main Content */}
                            <main style={{
                                flex: 1,
                                display: 'grid',
                                gridTemplateColumns: '300px 1fr 350px',
                                gap: '1px',
                                background: '#3a3a3a',
                                minHeight: 'calc(100vh - 80px)'
                            }}>
                                {/* Navigator */}
                                <div style={{
                                    background: '#1a1a1a',
                                    overflowY: 'auto',
                                    padding: '1.5rem'
                                }}>
                                    <h3 style={{
                                        color: '#00ffff',
                                        marginBottom: '1.5rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px'
                                    }}>
                                        Workflow Steps
                                    </h3>
                                    {steps.map((step) => (
                                        <div
                                            key={step.id}
                                            onClick={() => setCurrentStep(step.id)}
                                            style={{
                                                padding: '1rem',
                                                marginBottom: '0.5rem',
                                                background: currentStep === step.id ? '#00ffff20' : '#2a2a2a',
                                                border: currentStep === step.id ? '1px solid #00ffff' : '1px solid #3a3a3a',
                                                borderRadius: '0.5rem',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.75rem',
                                                marginBottom: '0.5rem'
                                            }}>
                                                <div style={{
                                                    width: '2rem',
                                                    height: '2rem',
                                                    borderRadius: '50%',
                                                    background: currentStep === step.id ? '#00ffff' : '#3a3a3a',
                                                    color: currentStep === step.id ? '#000' : '#fff',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontWeight: 'bold',
                                                    fontSize: '0.875rem'
                                                }}>
                                                    {step.id}
                                                </div>
                                                <div style={{
                                                    fontWeight: '600',
                                                    color: currentStep === step.id ? '#00ffff' : '#fff'
                                                }}>
                                                    {step.title}
                                                </div>
                                            </div>
                                            <div style={{
                                                fontSize: '0.75rem',
                                                color: '#888',
                                                marginLeft: '2.75rem'
                                            }}>
                                                {step.description}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Workspace */}
                                <div style={{
                                    background: '#000',
                                    overflowY: 'auto',
                                    padding: '2rem'
                                }}>
                                    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                                        <h2 style={{
                                            fontSize: '2rem',
                                            color: '#00ffff',
                                            marginBottom: '1rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px'
                                        }}>
                                            {steps[currentStep - 1].title}
                                        </h2>
                                        <p style={{
                                            fontSize: '1.125rem',
                                            color: '#ccc',
                                            lineHeight: '1.6',
                                            marginBottom: '2rem'
                                        }}>
                                            {steps[currentStep - 1].description}
                                        </p>

                                        {currentStep === 1 && (
                                            <div>
                                                <h3 style={{ color: '#00ffff', marginBottom: '1rem' }}>Organization Context</h3>
                                                <div style={{ marginBottom: '1.5rem' }}>
                                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>
                                                        Organization Type
                                                    </label>
                                                    <select
                                                        value={context.organizationType}
                                                        onChange={(e) => updateContext({ organizationType: e.target.value })}
                                                        style={{
                                                            width: '100%',
                                                            padding: '0.75rem',
                                                            background: '#2a2a2a',
                                                            border: '1px solid #3a3a3a',
                                                            borderRadius: '0.5rem',
                                                            color: '#fff'
                                                        }}
                                                    >
                                                        <option value="">Select Organization Type</option>
                                                        <option value="government">Government Agency</option>
                                                        <option value="corporation">Corporation</option>
                                                        <option value="startup">Startup</option>
                                                        <option value="ngo">Non-Profit</option>
                                                        <option value="academic">Academic Institution</option>
                                                    </select>
                                                </div>
                                                <div style={{ marginBottom: '1.5rem' }}>
                                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>
                                                        Region
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={context.region}
                                                        onChange={(e) => updateContext({ region: e.target.value })}
                                                        placeholder="Enter your region"
                                                        style={{
                                                            width: '100%',
                                                            padding: '0.75rem',
                                                            background: '#2a2a2a',
                                                            border: '1px solid #3a3a3a',
                                                            borderRadius: '0.5rem',
                                                            color: '#fff'
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {currentStep === 2 && (
                                            <div>
                                                <h3 style={{ color: '#00ffff', marginBottom: '1rem' }}>Goal Articulation</h3>
                                                <textarea
                                                    value={context.goal}
                                                    onChange={(e) => updateContext({ goal: e.target.value })}
                                                    placeholder="Describe your strategic objectives..."
                                                    rows={4}
                                                    style={{
                                                        width: '100%',
                                                        padding: '0.75rem',
                                                        background: '#2a2a2a',
                                                        border: '1px solid #3a3a3a',
                                                        borderRadius: '0.5rem',
                                                        color: '#fff',
                                                        resize: 'vertical'
                                                    }}
                                                />
                                            </div>
                                        )}

                                        {currentStep === 10 && (
                                            <div style={{ textAlign: 'center', padding: '2rem' }}>
                                                <div style={{
                                                    width: '150px',
                                                    height: '150px',
                                                    border: '3px solid #00ffff',
                                                    borderRadius: '50%',
                                                    margin: '0 auto 2rem',
                                                    position: 'relative',
                                                    animation: 'brainPulse 2s infinite ease-in-out'
                                                }}>
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '20%',
                                                        left: '30%',
                                                        width: '8px',
                                                        height: '8px',
                                                        background: '#00ffff',
                                                        borderRadius: '50%',
                                                        animation: 'neuralActivity 1.5s infinite ease-in-out'
                                                    }} />
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '40%',
                                                        left: '70%',
                                                        width: '8px',
                                                        height: '8px',
                                                        background: '#00ffff',
                                                        borderRadius: '50%',
                                                        animation: 'neuralActivity 1.5s infinite ease-in-out 0.3s'
                                                    }} />
                                                </div>
                                                <h3 style={{ color: '#00ffff', marginBottom: '1rem' }}>Intelligence Generation</h3>
                                                <p style={{ color: '#ccc' }}>The system is ready to generate novel economic theories and strategic insights.</p>
                                            </div>
                                        )}

                                        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                                            <button
                                                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                                                disabled={currentStep === 1}
                                                style={{
                                                    background: currentStep === 1 ? '#3a3a3a' : '#00ffff',
                                                    color: currentStep === 1 ? '#666' : '#000',
                                                    border: 'none',
                                                    padding: '0.75rem 1.5rem',
                                                    borderRadius: '0.5rem',
                                                    fontWeight: 'bold',
                                                    cursor: currentStep === 1 ? 'not-allowed' : 'pointer'
                                                }}
                                            >
                                                Previous
                                            </button>
                                            <button
                                                onClick={() => setCurrentStep(Math.min(12, currentStep + 1))}
                                                disabled={currentStep === 12}
                                                style={{
                                                    background: '#00ffff',
                                                    color: '#000',
                                                    border: 'none',
                                                    padding: '0.75rem 1.5rem',
                                                    borderRadius: '0.5rem',
                                                    fontWeight: 'bold',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Copilot */}
                                <div style={{
                                    background: '#1a1a1a',
                                    overflowY: 'auto',
                                    padding: '1.5rem'
                                }}>
                                    <div style={{
                                        borderBottom: '1px solid #3a3a3a',
                                        paddingBottom: '1rem',
                                        marginBottom: '1rem'
                                    }}>
                                        <div style={{
                                            fontSize: '1.125rem',
                                            fontWeight: '700',
                                            color: '#00ffff',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px'
                                        }}>
                                            NEXUS COPILOT
                                        </div>
                                        <div style={{
                                            fontSize: '0.875rem',
                                            color: '#888'
                                        }}>
                                            AI-Powered Intelligence Assistant
                                        </div>
                                    </div>
                                    
                                    <div style={{ marginBottom: '1rem' }}>
                                        <div style={{
                                            background: 'linear-gradient(135deg, #00ffff 0%, #ffffff 100%)',
                                            color: '#000',
                                            padding: '1rem',
                                            borderRadius: '1rem',
                                            marginBottom: '1rem'
                                        }}>
                                            Welcome to the Customer Work Report System! I'm here to help you generate comprehensive intelligence reports. 
                                            Current step: {steps[currentStep - 1].title}.
                                        </div>
                                    </div>

                                    <div style={{ marginTop: '1rem' }}>
                                        <input
                                            type="text"
                                            placeholder="Ask me anything about your analysis..."
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                background: '#2a2a2a',
                                                border: '1px solid #3a3a3a',
                                                borderRadius: '2rem',
                                                color: '#fff',
                                                outline: 'none'
                                            }}
                                        />
                                    </div>
                                </div>
                            </main>
                        </div>
                    );
                };

                // Add CSS animations
                const style = document.createElement('style');
                style.textContent = \`
                    @keyframes pulse {
                        0% { box-shadow: 0 0 0 0 #00ffff; }
                        70% { box-shadow: 0 0 0 10px rgba(0, 255, 255, 0); }
                        100% { box-shadow: 0 0 0 0 rgba(0, 255, 255, 0); }
                    }
                    
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    
                    @keyframes brainPulse {
                        0%, 100% { transform: scale(1); box-shadow: 0 0 20px #00ffff; }
                        50% { transform: scale(1.05); box-shadow: 0 0 40px #00ffff, 0 0 60px #00ffff; }
                    }
                    
                    @keyframes neuralActivity {
                        0%, 100% { opacity: 0.3; transform: scale(1); }
                        50% { opacity: 1; transform: scale(1.5); }
                    }
                \`;
                document.head.appendChild(style);

                // Render the app
                const root = ReactDOM.createRoot(document.getElementById('root'));
                root.render(<CustomerWorkReportSystem />);
            </script>
        </body>
        </html>
    `);
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        system: 'Customer Work Report System',
        version: '1.0.0'
    });
});

// API endpoint for system info
app.get('/api/system-info', (req, res) => {
    res.json({
        name: 'Customer Work Report System',
        version: '1.0.0',
        description: '12-Step Intelligence Generation Platform',
        components: [
            'ClarityWorkflowNavigator',
            'ClarityWorkspace', 
            'ClarityCopilot',
            'ClarityIntelligenceGeneration'
        ],
        features: [
            '12-step workflow management',
            'AI-powered copilot assistance',
            'Interactive intelligence generation',
            'Visual analytics dashboard',
            'Responsive design system'
        ]
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Customer Work Report System`);
    console.log(`📊 Server running on http://localhost:${PORT}`);
    console.log(`🔗 Main Interface: http://localhost:${PORT}/clarity-matrix`);
    console.log(`🏠 Landing Page: http://localhost:${PORT}/`);
    console.log(`⚡ Health Check: http://localhost:${PORT}/health`);
    console.log(`📈 System Info: http://localhost:${PORT}/api/system-info`);
    console.log('');
    console.log('✅ All systems ready!');
});

module.exports = app;