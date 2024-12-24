import React, { useEffect, useState } from 'react'
import { PeriodicTable } from '../PeriodicTable.js'
import Fingerprints from './Fingerprints.jsx';
import Networklayers from './Networklayers.jsx';
import { setAtomtypes } from '../Slices/DataSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import StateEquations from './StateEquations.jsx';
import Screening from './Screening.jsx';

const AtomTypes = () => {
  const dispatch = useDispatch();

  const [selectionArray, setSelectionArray] = useState([]);  // Track the number of dropdowns
  const [atoms, setAtoms] = useState([]);  // Track selected atoms
  const [atomicMasses, setAtomicMasses] = useState({});  // Track atomic masses for each selected atom

//This is the  function to handle the atom type selection. A new dropdown appears whenever
//the user clicks on add atom   
  const handleAddAtom = () => {
    setSelectionArray((prev) => [...prev, {}]);  // Add a new dropdown entry
  };

  // This function handles the atoms selected by storing it in an array
  const handleAtomSelection = (value, index) => {
    const updatedAtoms = [...atoms];
    updatedAtoms[index] = value;
    setAtoms(updatedAtoms);

    // Update atomic mass for the selected atom
    const selectedAtom = PeriodicTable.find((elem) => elem.symbol === value);
    if (selectedAtom) {
      setAtomicMasses((prevMasses) => ({
        ...prevMasses,
        [value]: selectedAtom.atomic_mass,
      }));
    }
  };

const AtomsDataToSend = {atoms,atomicMasses}
useEffect(()=>{
dispatch(setAtomtypes(AtomsDataToSend))
},[atoms,atomicMasses,dispatch])


  return (
    <>
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-300">
        <h1 className="text-2xl font-semibold text-center mb-4">Select Atom Type</h1>
        
        <button
          onClick={handleAddAtom}
          className="mb-6 px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-all"
        >
          Add Atom
        </button>

        <div className="space-y-4">
          {selectionArray.map((_, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-center gap-4 flex-wrap">
              <select
                className="w-full sm:w-2/3 lg:w-1/2 h-10 border border-gray-300 rounded px-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleAtomSelection(e.target.value, index)}
                defaultValue=""
              >
                <option value="" disabled>
                  Select an atom
                </option>
                {PeriodicTable.map((atom) => (
                  <option key={atom.symbol} value={atom.symbol}>
                    {atom.symbol}
                  </option>
                ))}
              </select>

              <div className="text-gray-700 text-center sm:text-left">
                <p className="font-medium">Atomic Mass:</p>
                <p>{atomicMasses[atoms[index]] || "N/A"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div>
    {
      atoms.length>0 && <Fingerprints atoms = {atoms}></Fingerprints>
    }
  </div>
  <div>
    {
      atoms.length>0 && <Networklayers atoms = {atoms}></Networklayers>
    }
  </div><div>
    {
      atoms.length>0 && <StateEquations atoms = {atoms}></StateEquations>
    }
  </div>
  <div>
    {
      atoms.length>0 && <Screening atoms = {atoms}></Screening>
    }
  </div>
  </>
  );
};

export default AtomTypes;