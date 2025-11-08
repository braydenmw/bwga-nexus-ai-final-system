"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const GoalAnalyzer_1 = require("./core/GoalAnalyzer");
const ContextEngine_1 = require("./core/ContextEngine");
const IntelligenceDashboard_1 = require("./core/IntelligenceDashboard");
const ReportViewer_1 = require("./core/ReportViewer");
const CopilotAssistant_1 = require("./core/CopilotAssistant");

// --- Main Application Component ---

const App = () => {
    const [currentStep, setCurrentStep] = (0, react_1.useState)(0);
    const [goal, setGoal] = (0, react_1.useState)('');
    const [context, setContext] = (0, react_1.useState)(null);
    const [config, setConfig] = (0, react_1.useState)(null);
    const [reportContent, setReportContent] = (0, react_1.useState)('');
    const [isGenerating, setIsGenerating] = (0, react_1.useState)(false);
    const [isCopilotOpen, setIsCopilotOpen] = (0, react_1.useState)(false);
    const [copilotContext, setCopilotContext] = (0, react_1.useState)('');

    const handleGoalDefined = (definedGoal) => {
        setGoal(definedGoal);
        setCurrentStep(1); // Move to Context Engine
    };

    const handleContextComplete = (completedContext) => {
        setContext(completedContext);
        setCurrentStep(2); // Move to Intelligence Dashboard
    };

    const handleConfigurationComplete = async (completedConfig) => {
        setConfig(completedConfig);
        setCurrentStep(3); // Move to Report Generation/Viewing step
        setIsGenerating(true);
        setReportContent('');

        // --- API CALL TO GENERATE REPORT ---
        try {
            const response = await fetch('http://localhost:3001/api/report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    reportName: "Dynamic Intelligence Blueprint",
                    tier: ["Standard"],
                    region: context?.region,
                    industry: [context?.industry],
                    problemStatement: goal,
                    idealPartnerProfile: "Companies matching the strategic objective.",
                    ...completedConfig
                }),
            });

            if (!response.body) {
                throw new Error('Response body is null');
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let content = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                content += decoder.decode(value, { stream: true });
                setReportContent(content);
            }

        } catch (error) {
            console.error("Failed to generate report:", error);
            setReportContent(`## Error Generating Report\n\nAn error occurred while communicating with the Nexus Brain API. Please ensure the backend server is running and check the console for details.\n\n**Error:**\n\`\`\`\n${error.message}\n\`\`\``);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleRequestHelp = (helpContext) => {
        setCopilotContext(helpContext);
        setIsCopilotOpen(true);
    };

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 0:
                return (0, jsx_runtime_1.jsx)(GoalAnalyzer_1.GoalAnalyzer, { onGoalDefined: handleGoalDefined, onRequestHelp: handleRequestHelp });
            case 1:
                return (0, jsx_runtime_1.jsx)(ContextEngine_1.ContextEngine, { goal: goal, onContextComplete: handleContextComplete, onRequestHelp: handleRequestHelp });
            case 2:
                return (0, jsx_runtime_1.jsx)(IntelligenceDashboard_1.IntelligenceDashboard, { goal: goal, context: context, onConfigurationComplete: handleConfigurationComplete, onRequestHelp: handleRequestHelp });
            case 3:
                return (0, jsx_runtime_1.jsx)(ReportViewer_1.ReportViewer, { nsilContent: reportContent });
            default:
                return (0, jsx_runtime_1.jsx)(GoalAnalyzer_1.GoalAnalyzer, { onGoalDefined: handleGoalDefined, onRequestHelp: handleRequestHelp });
        }
    };

    const steps = [
        "Define Objective",
        "Enrich Context",
        "Configure AI",
        "View Report"
    ];

    return ((0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen bg-white font-sans", children: [(0, jsx_runtime_1.jsxs)("header", { className: "bg-white border-b border-gray-200 p-4", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-bold text-black text-center", children: "BWGA Nexus AI" }), (0, jsx_runtime_1.jsx)("p", { className: "text-center text-gray-500", children: "Universal Regional Development Intelligence Platform" })] }), (0, jsx_runtime_1.jsx)("div", { className: "p-4 sm:p-6 md:p-8", children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-7xl mx-auto", children: [(0, jsx_runtime_1.jsx)("div", { className: "mb-8", children: (0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center space-x-4 sm:space-x-8", children: steps.map((stepName, index) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: `flex items-center justify-center w-10 h-10 rounded-full border-2 ${currentStep >= index ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-300 text-gray-500'}`, children: [(0, jsx_runtime_1.jsx)("span", { className: "font-bold", children: index + 1 }), currentStep > index && ((0, jsx_runtime_1.jsx)("svg", { className: "w-5 h-5 hidden", fill: "currentColor", viewBox: "0 0 20 20", children: (0, jsx_runtime_1.jsx)("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }))] }), (0, jsx_runtime_1.jsx)("span", { className: `ml-3 hidden sm:block font-medium ${currentStep >= index ? 'text-black' : 'text-gray-400'}`, children: stepName }), index < steps.length - 1 && ((0, jsx_runtime_1.jsx)("div", { className: "flex-1 h-0.5 ml-4 sm:ml-8", style: { background: `linear-gradient(to right, ${currentStep > index ? '#2563EB' : '#D1D5DB'} 50%, #D1D5DB 50%)` } }))] }, index))) }) }), (0, jsx_runtime_1.jsx)("main", { children: renderCurrentStep() })] }) }), isCopilotOpen && ((0, jsx_runtime_1.jsx)(CopilotAssistant_1.CopilotAssistant, { isOpen: isCopilotOpen, onClose: () => setIsCopilotOpen(false), context: copilotContext }))] }));
};
exports.App = App;
//# sourceMappingURL=App.js.map
