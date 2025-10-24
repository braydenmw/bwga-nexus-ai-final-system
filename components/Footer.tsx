import React from 'react';
import { RegionalDevelopmentIcon } from './Icons.tsx';

export const Footer: React.FC<{ onViewChange: (view: any) => void }> = ({ onViewChange }) => {
    return (
        <footer className="bg-gray-50 border-t">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <RegionalDevelopmentIcon className="w-8 h-8 text-blue-600" />
                            <h3 className="text-lg font-bold text-gray-900">BWGA Nexus AI</h3>
                        </div>
                        <p className="text-gray-600">Empowering global economic development through intelligent, data-driven insights.</p>
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-gray-900 mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><button onClick={() => onViewChange('who-we-are')} className="text-gray-600 hover:text-blue-600 transition-colors">How It Works</button></li>
                            <li><button onClick={() => onViewChange('opportunities')} className="text-gray-600 hover:text-blue-600 transition-colors">Data Hub</button></li>
                            <li><button onClick={() => onViewChange('report')} className="text-gray-600 hover:text-blue-600 transition-colors">Workspace</button></li>
                            <li><button onClick={() => onViewChange('compliance')} className="text-gray-600 hover:text-blue-600 transition-colors">Compliance</button></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-gray-900 mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li><button onClick={() => onViewChange('compliance')} className="text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</button></li>
                            <li><button onClick={() => onViewChange('compliance')} className="text-gray-600 hover:text-blue-600 transition-colors">Terms of Service</button></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-200 py-6 text-center text-gray-500">
                    <p className="text-sm">&copy; {new Date().getFullYear()} BW Global Advisory. All Rights Reserved.</p>
                    <p className="text-xs mt-2">ABN 55 978 113 300</p>
                </div>
            </div>
        </footer>
    );
};