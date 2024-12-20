import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setScreening } from '../Slices/DataSlice.js';

const Screening = ({ atoms }) => {

const [ScreeningData, setScreeningData] = useState({})

const dispatch = useDispatch();

const HandleCminData = (atom, CminData) =>{
    setScreeningData((prev)=>(
        {...prev, [atom]:{...prev[atom],cmin:CminData}}
    ))
}


const HandleCmaxData = (atom, CmaxData) =>{
    setScreeningData((prev)=>(
        {...prev, [atom]:{...prev[atom],cmax:CmaxData}}
    ))
}

  function GetCombinations(atoms, groupSize) {
    if (atoms.length === 0) return [];

    const combinations = [];

    function helper(currentCombination) {
      if (currentCombination.length === groupSize) {
        combinations.push(currentCombination.join('_'));
        return;
      }

      for (let atom of atoms) {
        helper([...currentCombination, atom]);
      }
    }

    helper([]);
    return combinations;
  }
  const CombinationsValue = GetCombinations(atoms, 3)

  useEffect (() =>{
    dispatch(setScreening(ScreeningData))
  },[ScreeningData, dispatch, atoms]) 


  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-6 text-gray-700">
        Screening Parameter Input
      </h1>
      <div className="grid gap-6 w-full max-w-2xl">
        {CombinationsValue.map((combination) => (
          <div
            key={combination}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                {combination}:Cmin
              </label>
              <input
              onChange={(e)=>{HandleCminData(combination, e.target.value)}}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="0.8"
                type="number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {combination}:Cmax
              </label>
              <input
                onChange={(e)=>{HandleCmaxData(combination,e.target.value)}}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="3.2"
                type="number"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Screening;
