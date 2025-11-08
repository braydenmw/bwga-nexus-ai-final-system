import React from 'react';
import { ClarityMatrixUI } from './ClarityMatrixUI';

/**
 * Clarity Matrix Demo Component
 * 
 * This component demonstrates how to integrate the Clarity Matrix UI
 * into your application. The Clarity Matrix provides a 12-step workflow
 * for generating AI-powered economic intelligence and strategic frameworks.
 * 
 * Features:
 * - 12-step guided workflow
 * - Real-time AI copilot assistance
 * - Interactive intelligence generation
 * - Visual analytics (RROI, TPT, SEAM)
 * - Responsive design with dark theme
 * 
 * Usage:
 * Simply import and render this component in your React application.
 * The Clarity Matrix handles all state management and workflow navigation internally.
 */

export const ClarityMatrixDemo: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ClarityMatrixUI />
    </div>
  );
};

/**
 * Example App Integration
 * 
 * Here's how you would integrate the Clarity Matrix into your main app:
 * 
 * ```tsx
 * import React from 'react';
 * import { ClarityMatrixUI } from './components/clarity/ClarityMatrixUI';
 * 
 * function App() {
 *   return (
 *     <div className="App">
 *       <ClarityMatrixUI />
 *     </div>
 *   );
 * }
 * 
 * export default App;
 * ```
 * 
 * Or if you want to use it as a route in a larger application:
 * 
 * ```tsx
 * import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 * import { ClarityMatrixUI } from './components/clarity/ClarityMatrixUI';
 * 
 * function App() {
 *   return (
 *     <Router>
 *       <Routes>
 *         <Route path="/clarity-matrix" element={<ClarityMatrixUI />} />
 *         <Route path="/" element={<HomePage />} />
 *       </Routes>
 *     </Router>
 *   );
 * }
 * ```
 */

export default ClarityMatrixDemo;