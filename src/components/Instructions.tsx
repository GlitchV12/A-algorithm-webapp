import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';

const Instructions: React.FC = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors">
          How to Play
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl w-[600px] max-h-[85vh] overflow-y-auto">
          <Dialog.Title className="text-2xl font-bold mb-4">
            A* Pathfinding Visualizer
          </Dialog.Title>
          <div className="space-y-4">
            <section>
              <h3 className="text-lg font-semibold mb-2">What is A* Pathfinding?</h3>
              <p>
                A* (pronounced "A-star") is an informed search algorithm that finds the shortest path between two points. 
                It combines Dijkstra's algorithm's focus on finding the shortest path with a heuristic function that estimates 
                the distance to the goal, making it more efficient than traditional pathfinding algorithms.
              </p>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold mb-2">Why A* Algorithm?</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Guarantees the shortest path when using an admissible heuristic</li>
                <li>More efficient than Dijkstra's algorithm by using heuristic guidance</li>
                <li>Widely used in games, robotics, and navigation systems</li>
                <li>Balances completeness with computational efficiency</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">How to Use the Visualizer</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Create Walls:</strong> Click on cells to create or remove walls. Walls are obstacles that the algorithm must navigate around.</li>
                <li><strong>Adjust Grid Size:</strong> Use the size slider to create larger or smaller grids, testing how the algorithm performs in different spaces.</li>
                <li><strong>Control Speed:</strong> Adjust the visualization speed to see the algorithm work faster or slower.</li>
                <li><strong>Choose Mode:</strong>
                  <ul className="list-disc pl-5 mt-2">
                    <li><strong>Step Mode:</strong> Watch the algorithm explore paths step by step, with detailed information about each decision.</li>
                    <li><strong>Challenge Mode:</strong> Test your understanding by predicting which path the algorithm will choose.</li>
                  </ul>
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">Understanding the Algorithm</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Blue Cells (Visited):</strong> These are nodes the algorithm has explored. They turn blue as A* evaluates different possible paths.</li>
                <li><strong>Yellow Path:</strong> This is the optimal path found by the algorithm. It's chosen because it has the lowest total cost (f = g + h).</li>
                <li><strong>Node Values:</strong> Hover over any cell to see:
                  <ul className="list-disc pl-5 mt-2">
                    <li><strong>f(n):</strong> Total estimated cost (g + h)</li>
                    <li><strong>g(n):</strong> Actual cost from start to current node</li>
                    <li><strong>h(n):</strong> Estimated cost from current node to goal (Manhattan distance)</li>
                  </ul>
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">Color Guide</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><span className="inline-block w-4 h-4 bg-blue-500 rounded-sm mr-2"></span> Start node (where pathfinding begins)</li>
                <li><span className="inline-block w-4 h-4 bg-green-500 rounded-sm mr-2"></span> Goal node (destination)</li>
                <li><span className="inline-block w-4 h-4 bg-gray-800 rounded-sm mr-2"></span> Wall (obstacle that cannot be passed)</li>
                <li><span className="inline-block w-4 h-4 bg-blue-200 rounded-sm mr-2"></span> Visited nodes (paths the algorithm has explored)</li>
                <li><span className="inline-block w-4 h-4 bg-yellow-200 rounded-sm mr-2"></span> Final shortest path (optimal route found)</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">Tips for Learning</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Start with a simple grid and gradually increase complexity</li>
                <li>Create different wall patterns to see how the algorithm adapts</li>
                <li>Watch how the algorithm prioritizes promising paths using the heuristic</li>
                <li>Compare the explored area with other pathfinding algorithms like Dijkstra's</li>
              </ul>
            </section>
          </div>
          
          <Dialog.Close asChild>
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              ✕
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Instructions;