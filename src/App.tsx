import React from 'react';
import Grid from './components/Grid';
import Controls from './components/Controls';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          A* Pathfinding Visualizer
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <Grid />
          </div>
          <div className="w-full md:w-80">
            <Controls />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;