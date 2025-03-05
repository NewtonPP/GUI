import React, { useState } from 'react';

const NetsPerElement = ({ atoms }) => {
  const [NetData, setNetData] = useState([]); // Initialize as an empty array

  const HandleChangeInNumber = (Number, atom, index) => {
    setNetData(prev => {
      const newNetData = [...prev];
      newNetData[index] = { Nets: Array(Number).fill(""), atom };
      return newNetData; 
    });
  };

  const HandleChangeInNet = (value, index, idx, atom) => {
    setNetData((prev) => {
      const newNetData = [...prev];
      newNetData[index].Nets[idx] = value;
      return newNetData;
    });
  };

  console.log(NetData);

  return (
    <div className="space-y-8 p-6">
      {atoms.map((atom, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-semibold mb-4 text-gray-700">Nets per element {atom}:</h1>
          
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-600">Number of Nets</label>
            <input
              type="number"
              placeholder="Enter number of nets"
              onChange={(e) => HandleChangeInNumber(Number(e.target.value), atom, index)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {NetData[index] && NetData[index].Nets?.map((_, idx) => {
            return (
              <div key={idx} className="space-y-4">
                <div>
                  <label className="block text-lg font-medium text-gray-600">Select Net Type</label>
                  <select
                    onChange={(e) => { HandleChangeInNet(e.target.value, index, idx, atom) }}
                    className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Select</option>
                    <option value="default_0">default_0</option>
                    <option value="exchangespin_0">exchangespin_0</option>
                  </select>
                </div>

                {NetData[index]?.Nets[idx] === "default_0" ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-lg font-medium text-gray-600">Layer Size</label>
                      <input
                        placeholder="Enter comma separated values"
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>

                    <div>
                      <label className="block text-lg font-medium text-gray-600">Activation</label>
                      <select
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        <option value="">Select</option>
                        <option value="SigI">SigI</option>
                        <option value="linear">Linear</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-lg font-medium text-gray-600">Fingerprint Map</label>
                      <select
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        <option value="">Select</option>
                        <option value="radialscreened_0">radialscreened_0</option>
                        <option value="bondscreened_0">bondscreened_0</option>
                      </select>
                    </div>
                  </div>
                ) : NetData[index]?.Nets[idx] === "exchangespin_0" ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-lg font-medium text-gray-600">Layer Size</label>
                      <input
                        placeholder="Enter comma separated values"
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>

                    <div>
                      <label className="block text-lg font-medium text-gray-600">Activation</label>
                      <select
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        <option value="">Select</option>
                        <option value="SigI">SigI</option>
                        <option value="linear">Linear</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-lg font-medium text-gray-600">Fingerprint Map</label>
                      <select
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        <option value="">Select</option>
                        <option value="radialscreened_0">radialscreened_0</option>
                        <option value="bondscreened_0">bondscreened_0</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-lg font-medium text-gray-600">Order</label>
                      <input
                        type="number"
                        placeholder="Enter a number"
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default NetsPerElement;
