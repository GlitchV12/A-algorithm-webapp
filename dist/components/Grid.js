import { jsx as _jsx } from "react/jsx-runtime";
import { useGridStore } from '../store/useGridStore';
import Node from './Node';
const Grid = () => {
    const grid = useGridStore((state) => state.grid);
    return (_jsx("div", { className: "grid gap-0.5 bg-gray-200 p-0.5 rounded-lg", children: grid.map((row, y) => (_jsx("div", { className: "flex gap-0.5", children: row.map((node, x) => (_jsx(Node, { node: node }, `${x}-${y}`))) }, y))) }));
};
export default Grid;
