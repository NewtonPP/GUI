import React, { useEffect, useState } from 'react';
import { setFingerprints } from '../Slices/DataSlice.js';
import { useSelector, useDispatch } from 'react-redux';

const Fingerprints = ({ atoms = [] }) => {
  const dispatch = useDispatch();
  const [fingerprintsPerElement, setFingerprintsPerElement] = useState({});
  const [fingerprintsArray, setFingerprintsArray] = useState({});
  const [SplittedObj, setSplittedObj] = useState({})

  const handleFingerprintCount = (value, atom) => {
    const count = Number(value);
    setFingerprintsPerElement((prev) => ({ ...prev, [atom]: count }));
    setFingerprintsArray((prev) => ({
      ...prev,
      [atom]: Array(count).fill(""),  // Initialize empty inputs for each fingerprint
    }));
    setSplittedObj((prev)=>({...prev, [atom]:Array(count).fill("")}))
  };



  const handleFingerprintChange = (value, atom, index) => {
    const SplittedValue = value.split("_");
    
    if(SplittedValue[0]!=atom) console.log("The first atom should be selected atom")
    setFingerprintsArray((prev) => ({
      ...prev,
      [atom]: prev[atom].map((val, i) => (i === index ? value : val)),
    }));
  };


  console.log(fingerprintsArray)

  // const ValidationArray = {...fingerprintsArray}
 
  // for (let key in ValidationArray){
  //   for(let i =0; i<ValidationArray[key].length; i++){
  //    const SplittedAtoms =  ValidationArray[key][i].split("_")

  //    if(SplittedAtoms[0] !== key){
  //     console.log("The first atom should be the selected atom")
  //    }
  //   }
  // }
  //FingerprintsPerElement is an object that holds the element and numbers of fingerprints associated
  //with that element

  //FingerprintsArray is the array with the fingerprints of that element
const FingerprintsData = {
  fingerprintsPerElement,
  fingerprintsArray
}

//Sending Data to  the reducer
useEffect(()=>{
dispatch(setFingerprints(FingerprintsData))
},[fingerprintsPerElement,fingerprintsArray, dispatch])


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
            <>
            <div key={index} className="flex flex-col sm:flex-row items-center gap-4 mt-4">
              <label className="font-medium text-gray-700 sm:w-1/3">
                Fingerprint {index + 1}:
              </label>

              <div>
              <input
                type="text"
                value={fingerprintsArray[atom][index] || ""}
                onChange={(e) => handleFingerprintChange(e.target.value, atom, index)}
                className="w-full sm:w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              </div>

            </div>
            </>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Fingerprints;
