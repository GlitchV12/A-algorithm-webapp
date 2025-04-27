import React from 'react';
import { motion } from 'framer-motion';
import { Node as NodeType } from '../types/grid';
import * as Tooltip from '@radix-ui/react-tooltip';
import clsx from 'clsx';
import { useGridStore } from '../store/useGridStore';

interface NodeProps {
  node: NodeType;
}

const Node: React.FC<NodeProps> = ({ node }) => {
  const toggleWall = useGridStore(state => state.toggleWall);
  
  const nodeClasses = clsx(
    'w-12 h-12 rounded-md flex items-center justify-center transition-colors cursor-pointer',
    {
      'bg-blue-500': node.isStart,
      'bg-green-500': node.isGoal,
      'bg-gray-800': node.isWall,
      'bg-yellow-200': node.isPath && !node.isStart && !node.isGoal,
      'bg-blue-200': node.isVisited && !node.isPath && !node.isStart && !node.isGoal,
      'bg-white': !node.isStart && !node.isGoal && !node.isWall && !node.isVisited && !node.isPath,
    }
  );

  const getNodeStatus = () => {
    if (node.isStart) return "Start Node";
    if (node.isGoal) return "Goal Node";
    if (node.isWall) return "Wall";
    if (node.isPath) return "Optimal Path";
    if (node.isVisited) return "Visited Node";
    return "Unexplored Node";
  };

  const getNodeDescription = () => {
    if (node.isStart) return "Starting point of the pathfinding algorithm";
    if (node.isGoal) return "Destination that the algorithm is trying to reach";
    if (node.isWall) return "Obstacle that the algorithm must navigate around";
    if (node.isPath) return "Part of the shortest path found by the algorithm";
    if (node.isVisited) return "Node explored by A* while searching for the optimal path";
    return "Click to create a wall";
  };

  const handleClick = () => {
    toggleWall(node.x, node.y);
  };

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <motion.div
            className={nodeClasses}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
            onClick={handleClick}
          >
            {node.weight > 1 && (
              <span className="text-xs text-gray-600">{node.weight}</span>
            )}
          </motion.div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm max-w-xs"
            sideOffset={5}
          >
            <div className="space-y-2">
              <p className="font-semibold">{getNodeStatus()}</p>
              <p className="text-gray-300">{getNodeDescription()}</p>
              {(node.isVisited || node.isPath) && (
                <div className="border-t border-gray-600 pt-2 mt-2">
                  <p>f(n) = {node.f} (Total Cost)</p>
                  <p>g(n) = {node.g} (Cost from Start)</p>
                  <p>h(n) = {node.h} (Estimated Cost to Goal)</p>
                </div>
              )}
            </div>
            <Tooltip.Arrow className="fill-gray-800" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default Node;