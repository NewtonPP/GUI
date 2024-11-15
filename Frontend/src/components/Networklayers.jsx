import React, { useState } from 'react';

const NetworkLayers = ({ atoms = [] }) => {
  const [layers, setLayers] = useState({});

  const handleLayerSizes = (value, atom) => {
    const count = Number(value);
    setLayers((prev) => ({ ...prev, [atom]: Array(count).fill("") }));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-8 w-full max-w-full mx-auto">
        {atoms.map((atom) => (
          <div
            key={atom}
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
          >
            <h1 className="text-2xl font-semibold mb-4 text-gray-800">
              Select Network Layers for {atom}
            </h1>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Number of Layers:
              </label>
              <input
                onChange={(e) => handleLayerSizes(e.target.value, atom)}
                type="number"
                min="0"
                className="w-full sm:w-1/2 p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter number of layers"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium mb-2">
                Layer Size:
              </label>
              <div className="space-y-4">
                {layers[atom]?.map((layer, index) => (
                  <div key={index}>
                    <input
                      type="number"
                      placeholder="Enter layer size"
                      className="w-full sm:w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NetworkLayers;
