import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStateEquations } from "../Slices/DataSlice.js";

const StateEquations = ({ atoms = [] }) => {
  const stateEquations = [
    "eamscreened",
    "covalent",
    "repulse",
    "rose",
    "rosescreened",
    "spinbiquadratic",
    "spinj",
    "spinjscreened",
    "zbl",
  ];

  const initialState = {
    covalent: {
      ec: [], a: [], rc: [], b: [], c: [], dr: []
    },
    eamscreened: {
      ec: [], re: [], rc: [], alpha: [], delta: [], dr: [],
      cweight: [], beta: [], Asub: [], lat: ""
    },
    repulse: { b: "", rc: "", alpha: "", dr: "" },
    rose: { b: "", rc: "", alpha: "", delta: "", dr: "" },
    rosescreened: { ec: "", re: "", rc: "", alpha: "", delta: "", dr: "" },
    spinbiquadratic: { aJ: "", bJ: "", dJ: "", aK: "", bK: "", rc: "", dr: "" },
    spinj: { a: "", re: "", rc: "", b: "", dr: "" },
    spinjscreened: { a: "", re: "", rc: "", b: "", dr: "" },
    zbl: { zi: "", zj: "", rc: "", dr: "" }
  };

  const [equationData, setEquationData] = useState(initialState);
  const [stateEquationsArray, setStateEquationsArray] = useState({});

  const dispatch = useDispatch();
  const reduxStateEquations = useSelector((state) => state.data.stateequations);

  const initializeEquationData = (type, n = 1) => {
    switch (type) {
      case "covalent":
        return {
          ec: Array(n).fill(""),
          a: Array(n).fill(""),
          rc: Array(1).fill(""),
          b: Array(n).fill(""),
          c: Array(n).fill(""),
          dr: Array(n).fill("")
        };
      case "eamscreened":
        return {
          ec: Array(n * n).fill(""),
          re: Array(n * n).fill(""),
          rc: Array(n * n).fill(""),
          alpha: Array(n * n).fill(""),
          delta: Array(n * n).fill(""),
          dr: Array(n * n).fill(""),
          cweight: Array(n).fill(""),
          beta: Array(n).fill(""),
          Asub: Array(n).fill(""),
          lat: ["b1", "b2", "bcc", "ch4", "dia", "dim", "fcc", "hcp", "l12"]
        };
      case "repulse":
      case "rose":
      case "rosescreened":
      case "spinj":
      case "spinjscreened":
      case "zbl":
      case "spinbiquadratic":
        return { ...initialState[type] };
      default:
        return {};
    }
  };

  const handleEquationDataChange = (atom, equation, type, constant, value, index, idx) => {
    setEquationData((prev) => {
      const newData = { ...prev };
      const newTypeData = { ...newData[type] };

      if (type === "eamscreened" && constant === "lat") {
        newTypeData[constant] = value;
      } else if (Array.isArray(newTypeData[constant])) {
        newTypeData[constant] = [...newTypeData[constant]];
        newTypeData[constant][index] = value;
      } else {
        newTypeData[constant] = value;
      }

      newData[type] = newTypeData;

      // Update stateEquationsArray
      setStateEquationsArray((prevState) => {
        if (!prevState[atom]?.[idx]?.equation === equation ||
            !prevState[atom]?.[idx]?.type === type) {
          return prevState;
        }

        const updatedState = { ...prevState };
        updatedState[atom] = [...(prevState[atom] || [])];
        updatedState[atom][idx] = {
          ...updatedState[atom][idx],
          stateequationconstants: newTypeData
        };
        return updatedState;
      });

      return newData;
    });
  };

  const handleStateEquationsPerElement = (num, atom) => {
    const count = Number(num);
    setStateEquationsArray((prev) => ({
      ...prev,
      [atom]: Array(count).fill().map(() => ({ equation: "", type: "", stateequationconstants: {} }))
    }));
  };

  const handleStateEquationsPerElementChange = (equation, atom, idx) => {
    setStateEquationsArray((prev) => {
      const updatedArray = [...(prev[atom] || [])];
      updatedArray[idx] = { ...updatedArray[idx], equation };
      
      // Initialize constants based on equation format
      const parts = equation.split("_");
      const type = parts.length === 1 ? "eshift" : parts.length === 2 ? "" : "";
      updatedArray[idx].type = type;
      updatedArray[idx].stateequationconstants = initializeEquationData(type, parts.length);

      return { ...prev, [atom]: updatedArray };
    });
  };

  const handleEquationTypeChange = (type, atom, idx) => {
    setStateEquationsArray((prev) => {
      const updatedArray = [...(prev[atom] || [])];
      updatedArray[idx] = {
        ...updatedArray[idx],
        type,
        stateequationconstants: initializeEquationData(type, updatedArray[idx].equation?.split("_").length)
      };
      return { ...prev, [atom]: updatedArray };
    });
  };

  useEffect(() => {
    dispatch(setStateEquations(stateEquationsArray));
  }, [stateEquationsArray, dispatch]);

  const memoizedStateEquations = useMemo(() => equationData, [equationData]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        State Equations
      </h1>
      <div className="space-y-8">
        {atoms.map((atom, index) => (
          <div key={index} className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0">
              <label
                htmlFor={`state-equations-${atom}`}
                className="font-medium text-gray-700 sm:w-1/3"
              >
                State Equations for {atom}:
              </label>
              <input
                type="number"
                min="0"
                id={`state-equations-${atom}`}
                className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter number of equations"
                onChange={(e) => handleStateEquationsPerElement(e.target.value, atom)}
              />
            </div>

            {stateEquationsArray[atom]?.length > 0 && (
              <div className="space-y-4">
                {stateEquationsArray[atom].map((eq, idx) => (
                  <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div>
                      <label
                        htmlFor={`equation-${atom}-${idx}`}
                        className="block font-medium text-gray-600"
                      >
                        Equation {idx + 1} for {atom}:
                      </label>
                      <input
                        type="text"
                        id={`equation-${atom}-${idx}`}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder={`Enter equation ${idx + 1}. Ex: Li_Li`}
                        onChange={(e) => handleStateEquationsPerElementChange(e.target.value, atom, idx)}
                      />
                    </div>
                    <div>
                      {eq.equation?.split("_").length === 1 ? (
                        <div>
                          <label
                            htmlFor={`option-${atom}-${idx}`}
                            className="block font-medium text-gray-600"
                          >
                            Select Option:
                          </label>
                          <select
                            id={`option-${atom}-${idx}`}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={(e) => handleEquationTypeChange(e.target.value, atom, idx)}
                            value={eq.type}
                          >
                            <option value="">Select an option</option>
                            <option value="eshift">eshift</option>
                            <option value="zero">zero</option>
                          </select>
                        </div>
                      ) : eq.equation?.split("_").length === 2 ? (
                        <div>
                          <label
                            htmlFor={`state-equation-${atom}-${idx}`}
                            className="block font-medium text-gray-600"
                          >
                            Select State Equation:
                          </label>
                          <select
                            id={`state-equation-${atom}-${idx}`}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={(e) => handleEquationTypeChange(e.target.value, atom, idx)}
                            value={eq.type}
                          >
                            <option value="">Select an option</option>
                            {stateEquations.map((stateEquation, optionIdx) => (
                              <option key={optionIdx} value={stateEquation}>
                                {stateEquation}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : null}
                    </div>
                    <div className="flex flex-col gap-4 p-4 bg-gray-50 rounded-md shadow-md">
                      {eq.type && memoizedStateEquations[eq.type] && (
                        Object.keys(memoizedStateEquations[eq.type]).map((constant) => (
                          <div key={constant} className="flex flex-col gap-4 border-b border-gray-300 pb-4">
                            <label className="font-semibold text-gray-700 text-lg">
                              {constant}
                            </label>
                            {eq.type === "eamscreened" && constant === "lat" ? (
                              <select
                                onChange={(e) => handleEquationDataChange(
                                  atom, eq.equation, eq.type, constant, e.target.value, 0, idx
                                )}
                                value={memoizedStateEquations[eq.type][constant]}
                              >
                                <option value="">Select an option</option>
                                {memoizedStateEquations[eq.type][constant].map((option, i) => (
                                  <option key={i} value={option}>{option}</option>
                                ))}
                              </select>
                            ) : Array.isArray(memoizedStateEquations[eq.type][constant]) ? (
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {memoizedStateEquations[eq.type][constant].map((value, index) => (
                                  <input
                                    key={index}
                                    className="h-10 w-full px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder={constant}
                                    value={value}
                                    onChange={(e) => handleEquationDataChange(
                                      atom, eq.equation, eq.type, constant, e.target.value, index, idx
                                    )}
                                  />
                                ))}
                              </div>
                            ) : (
                              <input
                                className="h-10 w-full px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder={constant}
                                value={memoizedStateEquations[eq.type][constant]}
                                onChange={(e) => handleEquationDataChange(
                                  atom, eq.equation, eq.type, constant, e.target.value, 0, idx
                                )}
                              />
                            )}
                          </div>
                        ))
                      )}
                      {eq.type === "eshift" && (
                        <div>
                          <label className="font-semibold text-gray-700 text-lg">eshift</label>
                          <input
                            className="h-10 w-full px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="eshift"
                            onChange={(e) => handleEquationDataChange(
                              atom, eq.equation, eq.type, "eshift", e.target.value, 0, idx
                            )}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StateEquations;