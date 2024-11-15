import React, { useState } from 'react';

const Fingerprints = ({ atoms = [] }) => {
  const [fingerprintsPerElement, setFingerprintsPerElement] = useState({});
  const [fingerprintsArray, setFingerprintsArray] = useState({});

  const handleFingerprintCount = (value, atom) => {
    const count = Number(value);
    setFingerprintsPerElement((prev) => ({ ...prev, [atom]: count }));
    setFingerprintsArray((prev) => ({
      ...prev,
      [atom]: Array(count).fill(""),  // Initialize empty inputs for each fingerprint
    }));
  };
  console.log(fingerprintsPerElement)
  console.log(fingerprintsArray)

  const handleFingerprintChange = (value, atom, index) => {
    setFingerprintsArray((prev) => ({
      ...prev,
      [atom]: prev[atom].map((val, i) => (i === index ? value : val)),
    }));
  };

  return (
    <div className="container mx-auto p-6">
      {atoms.map((atom) => (
        <div key={atom} className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200">
          <h1 className="text-xl font-semibold mb-4 text-gray-800">
            Select Fingerprints for {atom}
          </h1>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label className="font-medium text-gray-700 sm:w-1/3">Fingerprints per element:</label>
            <input
              type="number"
              min="0"
              onChange={(e) => handleFingerprintCount(e.target.value, atom)}
              className="w-full sm:w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {fingerprintsArray[atom]?.map((_, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-center gap-4 mt-4">
              <label className="font-medium text-gray-700 sm:w-1/3">
                Fingerprint {index + 1}:
              </label>
              <input
                type="text"
                value={fingerprintsArray[atom][index] || ""}
                onChange={(e) => handleFingerprintChange(e.target.value, atom, index)}
                className="w-full sm:w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Fingerprints;
