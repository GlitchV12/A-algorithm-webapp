import { create } from 'zustand';
const createInitialGrid = (size) => {
    const grid = [];
    for (let y = 0; y < size; y++) {
        const row = [];
        for (let x = 0; x < size; x++) {
            row.push({
                x,
                y,
                isStart: false,
                isGoal: false,
                isWall: false,
                weight: 1,
                f: 0,
                g: 0,
                h: 0,
                parent: null,
                isVisited: false,
                isPath: false,
            });
        }
        grid.push(row);
    }
    // Set start and goal nodes at proportional positions
    const startX = Math.floor(size * 0.2);
    const startY = Math.floor(size * 0.2);
    const goalX = Math.floor(size * 0.8);
    const goalY = Math.floor(size * 0.8);
    grid[startY][startX].isStart = true;
    grid[goalY][goalX].isGoal = true;
    return grid;
};
const calculateHeuristic = (node, goalNode) => {
    return Math.abs(node.x - goalNode.x) + Math.abs(node.y - goalNode.y);
};
const getNeighbors = (grid, node) => {
    const neighbors = [];
    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1] // Left, Right, Up, Down
    ];
    for (const [dx, dy] of directions) {
        const newX = node.x + dx;
        const newY = node.y + dy;
        if (newX >= 0 && newX < grid[0].length &&
            newY >= 0 && newY < grid.length &&
            !grid[newY][newX].isWall) {
            neighbors.push(grid[newY][newX]);
        }
    }
    return neighbors;
};
export const useGridStore = create((set, get) => ({
    grid: createInitialGrid(15),
    startNode: { x: 2, y: 2 },
    goalNode: { x: 12, y: 12 },
    isRunning: false,
    speed: 50,
    mode: 'step',
    gridSize: 15,
    setGridSize: (size) => {
        const newGrid = createInitialGrid(size);
        set({
            grid: newGrid,
            gridSize: size,
            startNode: { x: Math.floor(size * 0.2), y: Math.floor(size * 0.2) },
            goalNode: { x: Math.floor(size * 0.8), y: Math.floor(size * 0.8) }
        });
    },
    toggleWall: (x, y) => {
        set(state => {
            const newGrid = [...state.grid];
            const node = newGrid[y][x];
            if (!node.isStart && !node.isGoal) {
                node.isWall = !node.isWall;
            }
            return { grid: newGrid };
        });
    },
    resetGrid: () => {
        const { gridSize } = get();
        set({
            grid: createInitialGrid(gridSize),
            isRunning: false,
            startNode: { x: Math.floor(gridSize * 0.2), y: Math.floor(gridSize * 0.2) },
            goalNode: { x: Math.floor(gridSize * 0.8), y: Math.floor(gridSize * 0.8) }
        });
    },
    setSpeed: (speed) => {
        set({ speed });
    },
    setMode: (mode) => {
        set({ mode });
    },
    startPathfinding: async () => {
        const state = get();
        if (state.isRunning)
            return;
        set({ isRunning: true });
        const { grid, startNode, goalNode } = state;
        const start = grid[startNode.y][startNode.x];
        const goal = grid[goalNode.y][goalNode.x];
        // Reset previous path
        grid.forEach(row => row.forEach(node => {
            node.isVisited = false;
            node.isPath = false;
            node.f = 0;
            node.g = 0;
            node.h = 0;
            node.parent = null;
        }));
        const openSet = [start];
        const closedSet = new Set();
        start.g = 0;
        start.h = calculateHeuristic(start, goalNode);
        start.f = start.g + start.h;
        while (openSet.length > 0) {
            if (!get().isRunning)
                return;
            openSet.sort((a, b) => a.f - b.f);
            const current = openSet.shift();
            if (current.x === goal.x && current.y === goal.y) {
                // Path found, reconstruct and visualize
                let pathNode = current;
                while (pathNode) {
                    if (!pathNode.isStart && !pathNode.isGoal) {
                        pathNode.isPath = true;
                    }
                    pathNode = pathNode.parent;
                    set({ grid: [...grid] });
                    await new Promise(resolve => setTimeout(resolve, 100 - state.speed));
                }
                set({ isRunning: false });
                return;
            }
            closedSet.add(current);
            current.isVisited = true;
            set({ grid: [...grid] });
            const neighbors = getNeighbors(grid, current);
            for (const neighbor of neighbors) {
                if (closedSet.has(neighbor))
                    continue;
                const tentativeG = current.g + neighbor.weight;
                if (!openSet.includes(neighbor)) {
                    openSet.push(neighbor);
                }
                else if (tentativeG >= neighbor.g) {
                    continue;
                }
                neighbor.parent = current;
                neighbor.g = tentativeG;
                neighbor.h = calculateHeuristic(neighbor, goalNode);
                neighbor.f = neighbor.g + neighbor.h;
            }
            await new Promise(resolve => setTimeout(resolve, 100 - state.speed));
        }
        set({ isRunning: false });
    },
}));
