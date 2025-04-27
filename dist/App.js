import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Grid from './components/Grid';
import Controls from './components/Controls';
function App() {
    return (_jsx("div", { className: "min-h-screen bg-gray-100 p-8", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-800 mb-8", children: "A* Pathfinding Visualizer" }), _jsxs("div", { className: "flex flex-col md:flex-row gap-8", children: [_jsx("div", { className: "flex-1", children: _jsx(Grid, {}) }), _jsx("div", { className: "w-full md:w-80", children: _jsx(Controls, {}) })] })] }) }));
}
export default App;
