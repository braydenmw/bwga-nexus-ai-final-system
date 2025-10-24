



import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { fetchIntelligenceForCategory } from '../services/geminiService.ts';
import type { DashboardIntelligence, SymbiosisContext } from '../types.ts';
import Loader from './common/Loader.tsx';
import Card from './common/Card.tsx';
import { DASHBOARD_CATEGORIES } from '../constants.tsx';
import { ExternalLinkIcon, SymbiosisIcon, AnalyzeIcon } from './Icons.tsx';

interface DashboardProps {
    onAnalyze: (item: DashboardIntelligence['items'][0]) => void;
    onStartSymbiosis: (context: SymbiosisContext) => void;
}

const IntelligenceCard: React.FC<{ 
    item: DashboardIntelligence['items'][0]; 
    onAnalyze: DashboardProps['onAnalyze'];
    onStartSymbiosis: DashboardProps['onStartSymbiosis'];
}> = ({ item, onAnalyze, onStartSymbiosis }) => {
    
    const handleSymbiosisClick = (event: React.MouseEvent, topic: string, content: string) => {
        event.stopPropagation();
        onStartSymbiosis({
            topic: topic,
            originalContent: content,
        });
    };

    return (
        <Card className="flex flex-col h-full group border-nexus-border-medium hover:border-nexus-accent-cyan/60 hover:shadow-xl hover:shadow-nexus-accent-cyan/10 transition-all duration-500 bg-gradient-to-br from-nexus-surface-800 to-nexus-surface-700">
            <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-nexus-text-primary group-hover:text-nexus-accent-cyan transition-colors duration-300 leading-tight">{item.company}</h3>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        onClick={(e) => handleSymbiosisClick(e, `Strategic Implication for: ${item.company}`, item.implication)}
                        className="p-2 text-nexus-accent-brown hover:text-nexus-accent-cyan hover:bg-nexus-surface-600 rounded-lg transition-all duration-200"
                        title="Start Symbiosis Chat"
                    >
                        <SymbiosisIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <p className="text-sm text-nexus-text-secondary mb-6 flex-grow leading-relaxed">{item.details}</p>

            <div className="mt-auto space-y-4">
                <div className="bg-nexus-surface-600/50 rounded-lg p-4 border border-nexus-border-medium/50">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-nexus-accent-brown font-bold uppercase tracking-wider">Strategic Implication</p>
                        <button
                            onClick={(e) => handleSymbiosisClick(e, `Strategic Implication for: ${item.company}`, item.implication)}
                            className="p-1.5 text-nexus-accent-brown hover:text-nexus-accent-cyan hover:bg-nexus-surface-500 rounded-md transition-all duration-200 opacity-70 hover:opacity-100"
                            title="Start Symbiosis Chat"
                        >
                            <SymbiosisIcon className="w-4 h-4" />
                        </button>
                    </div>
                    <p className="text-sm text-nexus-text-primary leading-relaxed">{item.implication}</p>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-nexus-border-medium/50">
                     <span className="text-xs text-nexus-text-muted font-medium">Source: {item.source}</span>
                     <div className="flex items-center gap-3">
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-medium text-nexus-text-secondary hover:text-nexus-accent-cyan transition-colors duration-200 hover:bg-nexus-surface-600 px-2 py-1 rounded-md">
                           Source <ExternalLinkIcon className="w-3 h-3 ml-1" />
                        </a>
                        <button onClick={() => onAnalyze(item)} className="inline-flex items-center text-xs font-semibold text-nexus-primary-900 bg-gradient-to-r from-nexus-accent-cyan to-nexus-accent-cyan-dark px-3 py-1.5 rounded-lg hover:shadow-lg hover:shadow-nexus-accent-cyan/30 transition-all duration-200 transform hover:scale-105">
                           Analyze <AnalyzeIcon className="w-3 h-3 ml-1" />
                        </button>
                     </div>
                </div>
            </div>
        </Card>
    );
};

const Dashboard: React.FC<DashboardProps> = ({ onAnalyze, onStartSymbiosis }) => {
  const [intelligence, setIntelligence] = useState<DashboardIntelligence[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const hasFetched = useRef(false);

  const loadIntelligence = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setIntelligence([]);
    setActiveCategory('All');
    let hasFetchError = false;

    const fetchPromises = DASHBOARD_CATEGORIES.map(category =>
      fetchIntelligenceForCategory(category)
        .then(data => {
          setIntelligence(prev => {
            const newIntelligence = [...prev, data];
            newIntelligence.sort((a, b) => DASHBOARD_CATEGORIES.indexOf(a.category) - DASHBOARD_CATEGORIES.indexOf(b.category));
            return newIntelligence;
          });
        })
        .catch(err => {
          console.error(`Failed to fetch category '${category}':`, err);
          hasFetchError = true;
        })
    );

    await Promise.all(fetchPromises);
    
    if (hasFetchError) {
      setError("Failed to load some intelligence categories. The feed may be incomplete.");
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    loadIntelligence();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uniqueCategories = useMemo(() => 
    ['All', ...DASHBOARD_CATEGORIES],
  []);

  const filteredIntelligence = useMemo(() => 
    intelligence.filter(categoryData => 
        activeCategory === 'All' || categoryData.category === activeCategory
    ),
  [intelligence, activeCategory]);

  if (isLoading && intelligence.length === 0) {
    return <Loader message="Fetching Live Global Intelligence..." />;
  }

  if (!isLoading && intelligence.length === 0) {
     return (
      <div className="flex items-center justify-center h-full p-4">
        <div className="text-center text-yellow-300 p-8 bg-yellow-900/20 rounded-lg border border-yellow-400/30 max-w-lg">
          <h3 className="text-xl font-bold text-nexus-warning">Intelligence Service Error</h3>
          <p className="mt-2 text-nexus-text-secondary">Could not connect to the live global intelligence feed. The AI service may be temporarily unavailable or returned no data.</p>
          <p className="text-xs text-yellow-500 mt-2">({error || "No data received."})</p>
          <button onClick={loadIntelligence} className="mt-6 px-5 py-2.5 bg-gradient-to-r from-nexus-accent-cyan to-nexus-accent-cyan-dark text-nexus-primary-900 font-semibold rounded-lg hover:opacity-90 transition-opacity">
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 h-full flex flex-col gap-8 bg-gradient-to-br from-nexus-surface-900 via-nexus-surface-800 to-nexus-surface-900">
      <header className="max-w-6xl w-full mx-auto">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-nexus-text-primary tracking-tight mb-2 bg-gradient-to-r from-nexus-text-primary via-nexus-accent-cyan to-nexus-text-primary bg-clip-text text-transparent">
            Live Intelligence Dashboard
          </h2>
          <p className="text-base text-nexus-text-secondary max-w-3xl mx-auto leading-relaxed">
            Real-time global intelligence feed with strategic implications. Transform market signals into actionable insights with comprehensive <span className="font-bold text-nexus-accent-cyan bg-nexus-accent-cyan/10 px-2 py-1 rounded-md">BWGA Nexus Reports</span>.
          </p>
        </div>

        {/* Data Visualization Section */}
       <div className="mt-8 bg-gradient-to-br from-nexus-surface-800 via-nexus-surface-700 to-nexus-surface-800 rounded-2xl p-8 border border-nexus-border-medium shadow-2xl backdrop-blur-sm">
         <div className="text-center mb-8">
           <h3 className="text-2xl font-bold text-nexus-text-primary mb-3 flex items-center justify-center gap-3">
             <span className="text-3xl">📊</span>
             Advanced Data Visualization Suite
           </h3>
           <p className="text-base text-nexus-text-secondary max-w-3xl mx-auto leading-relaxed">
             Transform raw data into compelling visual narratives. Our comprehensive suite of visualization tools enables you to create professional reports with interactive charts, regional maps, and intelligent insights that drive strategic decision-making.
           </p>
         </div>

         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
           {/* Basic Items */}
           <div className="bg-gradient-to-br from-nexus-surface-700 to-nexus-surface-600 rounded-xl p-6 border border-nexus-border-medium hover:border-nexus-accent-cyan/30 transition-all duration-300 hover:shadow-lg hover:shadow-nexus-accent-cyan/10 group">
             <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-nexus-accent-cyan/20 rounded-lg flex items-center justify-center group-hover:bg-nexus-accent-cyan/30 transition-colors">
                 <span className="text-nexus-accent-cyan font-bold">📝</span>
               </div>
               <h4 className="font-bold text-nexus-accent-cyan text-lg">Basic Elements</h4>
             </div>
             <ul className="text-sm text-nexus-text-secondary space-y-2">
               <li className="flex items-center gap-3"><span className="w-2 h-2 bg-nexus-accent-brown rounded-full"></span> Rich text formatting</li>
               <li className="flex items-center gap-3"><span className="w-2 h-2 bg-nexus-accent-brown rounded-full"></span> High-resolution images</li>
               <li className="flex items-center gap-3"><span className="w-2 h-2 bg-nexus-accent-brown rounded-full"></span> Vector graphics</li>
               <li className="flex items-center gap-3"><span className="w-2 h-2 bg-nexus-accent-brown rounded-full"></span> Custom shapes</li>
             </ul>
           </div>

           {/* Data Region Items */}
           <div className="bg-gradient-to-br from-nexus-surface-700 to-nexus-surface-600 rounded-xl p-6 border border-nexus-border-medium hover:border-nexus-accent-cyan/30 transition-all duration-300 hover:shadow-lg hover:shadow-nexus-accent-cyan/10 group">
             <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-nexus-accent-cyan/20 rounded-lg flex items-center justify-center group-hover:bg-nexus-accent-cyan/30 transition-colors">
                 <span className="text-nexus-accent-cyan font-bold">📊</span>
               </div>
               <h4 className="font-bold text-nexus-accent-cyan text-lg">Data Tables</h4>
             </div>
             <ul className="text-sm text-nexus-text-secondary space-y-2">
               <li className="flex items-center gap-3"><span className="w-2 h-2 bg-nexus-accent-brown rounded-full"></span> Dynamic pivot tables</li>
               <li className="flex items-center gap-3"><span className="w-2 h-2 bg-nexus-accent-brown rounded-full"></span> Cross-tab analysis</li>
               <li className="flex items-center gap-3"><span className="w-2 h-2 bg-nexus-accent-brown rounded-full"></span> Hierarchical lists</li>
               <li className="flex items-center gap-3"><span className="w-2 h-2 bg-nexus-accent-brown rounded-full"></span> Data aggregation</li>
             </ul>
           </div>

           {/* Data Visualization */}
           <div className="bg-gradient-to-br from-nexus-surface-700 to-nexus-surface-600 rounded-xl p-6 border border-nexus-border-medium hover:border-nexus-accent-cyan/30 transition-all duration-300 hover:shadow-lg hover:shadow-nexus-accent-cyan/10 group">
             <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-nexus-accent-cyan/20 rounded-lg flex items-center justify-center group-hover:bg-nexus-accent-cyan/30 transition-colors">
                 <span className="text-nexus-accent-cyan font-bold">📈</span>
               </div>
               <h4 className="font-bold text-nexus-accent-cyan text-lg">Interactive Charts</h4>
             </div>
             <ul className="text-sm text-nexus-text-secondary space-y-2">
               <li className="flex items-center gap-3"><span className="w-2 h-2 bg-nexus-accent-brown rounded-full"></span> Multi-axis charts</li>
               <li className="flex items-center gap-3"><span className="w-2 h-2 bg-nexus-accent-brown rounded-full"></span> Trend sparklines</li>
               <li className="flex items-center gap-3"><span className="w-2 h-2 bg-nexus-accent-brown rounded-full"></span> KPI indicators</li>
               <li className="flex items-center gap-3"><span className="w-2 h-2 bg-nexus-accent-brown rounded-full"></span> Geographic maps</li>
             </ul>
           </div>

           {/* Advanced Features */}
           <div className="bg-gradient-to-br from-nexus-surface-700 to-nexus-surface-600 rounded-xl p-6 border border-nexus-border-medium hover:border-nexus-accent-cyan/30 transition-all duration-300 hover:shadow-lg hover:shadow-nexus-accent-cyan/10 group">
             <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-nexus-accent-cyan/20 rounded-lg flex items-center justify-center group-hover:bg-nexus-accent-cyan/30 transition-colors">
                 <span className="text-nexus-accent-cyan font-bold">⚡</span>
               </div>
               <h4 className="font-bold text-nexus-accent-cyan text-lg">Advanced Tools</h4>
             </div>
             <ul className="text-sm text-nexus-text-secondary space-y-2">
               <li className="flex items-center gap-3"><span className="w-2 h-2 bg-nexus-accent-brown rounded-full"></span> Embedded subreports</li>
               <li className="flex items-center gap-3"><span className="w-2 h-2 bg-nexus-accent-brown rounded-full"></span> QR code generation</li>
               <li className="flex items-center gap-3"><span className="w-2 h-2 bg-nexus-accent-brown rounded-full"></span> Custom components</li>
               <li className="flex items-center gap-3"><span className="w-2 h-2 bg-nexus-accent-brown rounded-full"></span> API integrations</li>
             </ul>
           </div>

           {/* Regional Investment Focus */}
           <div className="bg-gradient-to-br from-nexus-surface-700 to-nexus-surface-600 rounded-xl p-6 border border-nexus-border-medium hover:border-nexus-accent-cyan/30 transition-all duration-300 hover:shadow-lg hover:shadow-nexus-accent-cyan/10 group">
             <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-nexus-accent-cyan/20 rounded-lg flex items-center justify-center group-hover:bg-nexus-accent-cyan/30 transition-colors">
                 <span className="text-nexus-accent-cyan font-bold">🌍</span>
               </div>
               <h4 className="font-bold text-nexus-accent-cyan text-lg">Regional Intelligence</h4>
             </div>
             <ul className="text-sm text-nexus-text-secondary space-y-2">
               <li className="flex items-center gap-3"><span className="w-2 h-2 bg-nexus-accent-brown rounded-full"></span> City investment heatmaps</li>
               <li className="flex items-center gap-3"><span className="w-2 h-2 bg-nexus-accent-brown rounded-full"></span> Corporate presence mapping</li>
               <li className="flex items-center gap-3"><span className="w-2 h-2 bg-nexus-accent-brown rounded-full"></span> Growth corridor analysis</li>
               <li className="flex items-center gap-3"><span className="w-2 h-2 bg-nexus-accent-brown rounded-full"></span> Investment flow tracking</li>
             </ul>
           </div>

           {/* Business Intelligence */}
           <div className="bg-gradient-to-br from-nexus-surface-700 to-nexus-surface-600 rounded-xl p-6 border border-nexus-border-medium hover:border-nexus-accent-cyan/30 transition-all duration-300 hover:shadow-lg hover:shadow-nexus-accent-cyan/10 group">
             <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-nexus-accent-cyan/20 rounded-lg flex items-center justify-center group-hover:bg-nexus-accent-cyan/30 transition-colors">
                 <span className="text-nexus-accent-cyan font-bold">🎯</span>
               </div>
               <h4 className="font-bold text-nexus-accent-cyan text-lg">Strategic BI</h4>
             </div>
             <ul className="text-sm text-nexus-text-secondary space-y-2">
               <li className="flex items-center gap-3"><span className="w-2 h-2 bg-nexus-accent-brown rounded-full"></span> Market share analysis</li>
               <li className="flex items-center gap-3"><span className="w-2 h-2 bg-nexus-accent-brown rounded-full"></span> Competitive positioning</li>
               <li className="flex items-center gap-3"><span className="w-2 h-2 bg-nexus-accent-brown rounded-full"></span> Partnership opportunity scoring</li>
               <li className="flex items-center gap-3"><span className="w-2 h-2 bg-nexus-accent-brown rounded-full"></span> ROI forecasting models</li>
             </ul>
           </div>
         </div>
       </div>

        <div className="mt-8">
            <nav className="flex justify-center" aria-label="Intelligence Categories">
                <div className="bg-nexus-surface-800/50 backdrop-blur-sm rounded-2xl p-2 border border-nexus-border-medium shadow-lg">
                    <div className="flex space-x-2 overflow-x-auto">
                        {uniqueCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`whitespace-nowrap px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105
                                ${activeCategory === cat ?
                                    'bg-gradient-to-r from-nexus-accent-brown to-nexus-accent-brown-dark text-white shadow-lg shadow-nexus-accent-brown/30'
                                    : 'text-nexus-text-secondary hover:text-nexus-text-primary hover:bg-nexus-surface-700/50 hover:shadow-md'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>
        </div>
      </header>
      
      <main className="flex-grow overflow-y-auto max-w-7xl w-full mx-auto pr-4 -mr-4">
        {error && (
          <div className="bg-nexus-warning/10 border border-nexus-warning/20 rounded-xl p-4 mb-6 text-center">
            <p className="text-nexus-warning font-medium">{error}</p>
          </div>
        )}
        {filteredIntelligence.length > 0 ? (
              <div className="space-y-12">
                 {filteredIntelligence.map((categoryData) => (
                     <section key={categoryData.category} className="bg-nexus-surface-800/30 backdrop-blur-sm rounded-2xl p-8 border border-nexus-border-medium/50 shadow-xl">
                         <div className="flex items-center gap-4 mb-8">
                           <div className="w-12 h-12 bg-gradient-to-br from-nexus-accent-cyan to-nexus-accent-cyan-dark rounded-xl flex items-center justify-center shadow-lg">
                             <span className="text-2xl">📰</span>
                           </div>
                           <div>
                             <h3 className="text-3xl font-bold text-nexus-text-primary mb-1">{categoryData.category}</h3>
                             <p className="text-nexus-text-secondary text-sm">Latest intelligence and strategic insights</p>
                           </div>
                         </div>
                         <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                             {categoryData.items.map((item, index) => (
                                 <IntelligenceCard
                                     key={`${item.url}-${index}`}
                                     item={item}
                                     onAnalyze={onAnalyze}
                                     onStartSymbiosis={onStartSymbiosis}
                                 />
                             ))}
                         </div>
                     </section>
                 ))}
                 {isLoading && (
                     <div className="flex justify-center items-center p-8 mt-8 bg-nexus-surface-800/50 backdrop-blur-sm rounded-2xl border border-nexus-border-medium/50">
                         <div className="flex items-center gap-4">
                           <div className="w-10 h-10 border-4 border-nexus-accent-cyan/50 border-dashed rounded-full animate-spin"></div>
                           <p className="text-nexus-text-secondary font-medium">Loading additional intelligence streams...</p>
                         </div>
                     </div>
                 )}
              </div>
         ) : (
             <div className="flex items-center justify-center h-full">
                 <Card className="text-center bg-nexus-surface-800/50 backdrop-blur-sm border-nexus-border-medium/50 shadow-2xl max-w-md">
                     <div className="w-16 h-16 bg-nexus-surface-700 rounded-full flex items-center justify-center mx-auto mb-4">
                       <span className="text-3xl">🔍</span>
                     </div>
                     <h3 className="text-2xl font-bold text-nexus-text-primary mb-2">No Intelligence Found</h3>
                     <p className="text-nexus-text-secondary mb-6">No items match the current filter. Try reloading or selecting another category.</p>
                     <button onClick={loadIntelligence} className="bg-gradient-to-r from-nexus-accent-cyan to-nexus-accent-cyan-dark text-nexus-primary-900 font-semibold px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-nexus-accent-cyan/30 transition-all duration-200">
                       Refresh Feed
                     </button>
                 </Card>
             </div>
         )}
      </main>
    </div>
  );
};

export default Dashboard;