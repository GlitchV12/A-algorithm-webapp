import React from 'react';
import { motion } from 'framer-motion';
import { useGridStore } from '../store/useGridStore';
import Node from './Node';

const Grid: React.FC = () => {
  const grid = useGridStore((state) => state.grid);

  return (
    <div className="grid gap-0.5 bg-gray-200 p-0.5 rounded-lg">
      {grid.map((row, y) => (
        <div key={y} className="flex gap-0.5">
          {row.map((node, x) => (
            <Node key={`${x}-${y}`} node={node} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;