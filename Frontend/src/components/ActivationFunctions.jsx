import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActivationFunctions } from "../Slices/DataSlice.js";

const ActivationFunctions = ({ layers, atoms = [] }) => {
  const dispatch = useDispatch();

  const [ActivationData, setActivationData] = useState({});
  const activationFunctions = [
    "",
    "capped",
    "cappedsharp",
    "linear",
    "sharpcapped",
    "sigl",
    "slowcapped",
    "tanh",
    "tanhtwist",
    "ttanh",
    "zero",
  ];

  // Initialize ActivationData for all atoms
  useEffect(() => {
    const initialData = {};
    atoms.forEach((atom) => {
      if (layers[atom] && Array.isArray(layers[atom])) {
        initialData[atom] = Array(layers[atom].length).fill("");
      }
    });
    setActivationData(initialData);
  }, [atoms, layers]);

  // Handle dropdown change
  const HandleActivationChange = (value, atom, index) => {
    setActivationData((prev) => ({
      ...prev,
      [atom]: prev[atom].map((v, i) => (i === index ? value : v)),
    }));
  };

  // Dispatch ActivationData to Redux whenever it changes
  useEffect(() => {
    dispatch(setActivationFunctions(ActivationData));
  }, [ActivationData, dispatch]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Activation Functions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {atoms.map((atom) => {
          if (!layers[atom] || !Array.isArray(layers[atom])) {
            return (
              <div
                key={atom}
                className="border border-dashed border-gray-300 p-4 rounded-lg text-center text-gray-500"
              >
                <p className="font-medium">No layers available</p>
                <p>Atom: {atom}</p>
              </div>
            );
          }

          return layers[atom].map((layer, index) => (
            <div
              key={`${atom}-${index}`}
              className="border border-gray-200 shadow-md rounded-lg p-4 flex flex-col gap-4 bg-white"
            >
              <h2 className="text-lg font-semibold text-gray-700">
                {atom} - Layer {index}
              </h2>
              <div>
                <label
                  htmlFor={`activation-${atom}-${index}`}
                  className="block text-sm font-medium text-gray-600 mb-2"
                >
                  Select Activation Function
                </label>
                <select
                  id={`activation-${atom}-${index}`}
                  className="block w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                  value={ActivationData[atom]?.[index] || ""}
                  onChange={(e) => HandleActivationChange(e.target.value, atom, index)}
                >
                  {activationFunctions.map((activation) => (
                    <option key={activation} value={activation}>
                      {activation || "Select an option"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ));
        })}
      </div>
    </div>
  );
};

export default ActivationFunctions;
