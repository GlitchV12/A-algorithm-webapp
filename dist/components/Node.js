import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import * as Tooltip from '@radix-ui/react-tooltip';
import clsx from 'clsx';
import { useGridStore } from '../store/useGridStore';
const Node = ({ node }) => {
    const toggleWall = useGridStore(state => state.toggleWall);
    const nodeClasses = clsx('w-12 h-12 rounded-md flex items-center justify-center transition-colors cursor-pointer', {
        'bg-blue-500': node.isStart,
        'bg-green-500': node.isGoal,
        'bg-gray-800': node.isWall,
        'bg-yellow-200': node.isPath && !node.isStart && !node.isGoal,
        'bg-blue-200': node.isVisited && !node.isPath && !node.isStart && !node.isGoal,
        'bg-white': !node.isStart && !node.isGoal && !node.isWall && !node.isVisited && !node.isPath,
    });
    const getNodeStatus = () => {
        if (node.isStart)
            return "Start Node";
        if (node.isGoal)
            return "Goal Node";
        if (node.isWall)
            return "Wall";
        if (node.isPath)
            return "Optimal Path";
        if (node.isVisited)
            return "Visited Node";
        return "Unexplored Node";
    };
    const getNodeDescription = () => {
        if (node.isStart)
            return "Starting point of the pathfinding algorithm";
        if (node.isGoal)
            return "Destination that the algorithm is trying to reach";
        if (node.isWall)
            return "Obstacle that the algorithm must navigate around";
        if (node.isPath)
            return "Part of the shortest path found by the algorithm";
        if (node.isVisited)
            return "Node explored by A* while searching for the optimal path";
        return "Click to create a wall";
    };
    const handleClick = () => {
        toggleWall(node.x, node.y);
    };
    return (_jsx(Tooltip.Provider, { children: _jsxs(Tooltip.Root, { children: [_jsx(Tooltip.Trigger, { asChild: true, children: _jsx(motion.div, { className: nodeClasses, initial: { scale: 0.8 }, animate: { scale: 1 }, whileHover: { scale: 1.1 }, transition: { duration: 0.2 }, onClick: handleClick, children: node.weight > 1 && (_jsx("span", { className: "text-xs text-gray-600", children: node.weight })) }) }), _jsx(Tooltip.Portal, { children: _jsxs(Tooltip.Content, { className: "bg-gray-800 text-white px-4 py-2 rounded-md text-sm max-w-xs", sideOffset: 5, children: [_jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "font-semibold", children: getNodeStatus() }), _jsx("p", { className: "text-gray-300", children: getNodeDescription() }), (node.isVisited || node.isPath) && (_jsxs("div", { className: "border-t border-gray-600 pt-2 mt-2", children: [_jsxs("p", { children: ["f(n) = ", node.f, " (Total Cost)"] }), _jsxs("p", { children: ["g(n) = ", node.g, " (Cost from Start)"] }), _jsxs("p", { children: ["h(n) = ", node.h, " (Estimated Cost to Goal)"] })] }))] }), _jsx(Tooltip.Arrow, { className: "fill-gray-800" })] }) })] }) }));
};
export default Node;
