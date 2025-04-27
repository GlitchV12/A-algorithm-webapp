import React from 'react';
import * as Slider from '@radix-ui/react-slider';
import { useGridStore } from '../store/useGridStore';
import Instructions from './Instructions';
import * as Tooltip from '@radix-ui/react-tooltip';

const Controls: React.FC = () => {
  const { speed, mode, setSpeed, setMode, startPathfinding, resetGrid, isRunning, gridSize, setGridSize } = useGridStore();

  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center gap-4 mb-4">
        <Instructions />
      </div>
      
      <div className="flex items-center gap-4">
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
                onClick={() => startPathfinding()}
                disabled={isRunning}
              >
                {isRunning ? 'Finding Path...' : 'Start'}
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content className="bg-gray-800 text-white px-3 py-2 rounded text-sm">
              Start the A* pathfinding algorithm visualization
            </Tooltip.Content>
          </Tooltip.Root>
        </Tooltip.Provider>

        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button 
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                onClick={() => resetGrid()}
              >
                Reset
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content className="bg-gray-800 text-white px-3 py-2 rounded text-sm">
              Clear the grid and start over
            </Tooltip.Content>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 w-20">Grid Size:</span>
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <div className="flex-1">
                  <Slider.Root
                    className="relative flex items-center select-none touch-none w-[200px] h-5"
                    value={[gridSize]}
                    onValueChange={([newSize]) => setGridSize(newSize)}
                    min={8}
                    max={30}
                    step={1}
                  >
                    <Slider.Track className="bg-gray-200 relative grow rounded-full h-[3px]">
                      <Slider.Range className="absolute bg-blue-500 rounded-full h-full" />
                    </Slider.Track>
                    <Slider.Thumb
                      className="block w-5 h-5 bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none"
                      aria-label="Grid Size"
                    />
                  </Slider.Root>
                </div>
              </Tooltip.Trigger>
              <Tooltip.Content className="bg-gray-800 text-white px-3 py-2 rounded text-sm">
                Adjust grid size: {gridSize}x{gridSize}
                <br />
                Larger grids create more complex pathfinding scenarios
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 w-20">Speed:</span>
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <div className="flex-1">
                  <Slider.Root
                    className="relative flex items-center select-none touch-none w-[200px] h-5"
                    value={[speed]}
                    onValueChange={([newSpeed]) => setSpeed(newSpeed)}
                    max={100}
                    step={1}
                  >
                    <Slider.Track className="bg-gray-200 relative grow rounded-full h-[3px]">
                      <Slider.Range className="absolute bg-blue-500 rounded-full h-full" />
                    </Slider.Track>
                    <Slider.Thumb
                      className="block w-5 h-5 bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none"
                      aria-label="Speed"
                    />
                  </Slider.Root>
                </div>
              </Tooltip.Trigger>
              <Tooltip.Content className="bg-gray-800 text-white px-3 py-2 rounded text-sm">
                Adjust visualization speed
                <br />
                Slower speeds help understand each step better
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
        </div>
      </div>

      <div className="flex gap-2">
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                className={`px-4 py-2 rounded-md ${
                  mode === 'step' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
                onClick={() => setMode('step')}
              >
                Step Mode
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content className="bg-gray-800 text-white px-3 py-2 rounded text-sm">
              Watch the algorithm explore paths step by step
              <br />
              Great for understanding how A* makes decisions
            </Tooltip.Content>
          </Tooltip.Root>
        </Tooltip.Provider>

        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                className={`px-4 py-2 rounded-md ${
                  mode === 'challenge' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
                onClick={() => setMode('challenge')}
              >
                Challenge Mode
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content className="bg-gray-800 text-white px-3 py-2 rounded text-sm">
              Test your understanding by predicting the path
              <br />
              Try to guess which nodes A* will explore
            </Tooltip.Content>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>
    </div>
  );
};

export default Controls;