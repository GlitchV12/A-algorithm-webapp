export interface Node {
  x: number;
  y: number;
  isStart: boolean;
  isGoal: boolean;
  isWall: boolean;
  weight: number;
  f: number;
  g: number;
  h: number;
  parent: Node | null;
  isVisited: boolean;
  isPath: boolean;
}

export interface GridState {
  grid: Node[][];
  startNode: { x: number; y: number };
  goalNode: { x: number; y: number };
  isRunning: boolean;
  speed: number;
  mode: 'step' | 'challenge';
  gridSize: number;
  setGridSize: (size: number) => void;
}