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
      [atom]: Array(count).fill({ fingerprint: "", fingerprinttype:"", params: {} }),
    }));
    setSplittedObj((prev) => ({ ...prev, [atom]: Array(count).fill("") }));
  };

  const handleFingerprintChange = (value, atom, index) => {
    const SplittedValue = value.split("_");
    setSplittedObj((prev) => ({
      ...prev,
      [atom]: prev[atom].map((val, i) => (i === index ? SplittedValue.length : val)),
    }));
    setFingerprintsArray((prev) => ({
      ...prev,
      [atom]: prev[atom].map((item, i) =>
        i === index ? { ...item, fingerprint: value } : item
      ),
    }));
  };

  const handleParameterChange = ({atom, index, fingerprinttype="" , param="" , paramValue=""}) => {
    setFingerprintsArray((prev) => ({
      ...prev,
      [atom]: prev[atom].map((item, i) =>
        i === index
          ? { ...item, fingerprinttype:fingerprinttype, params: { ...item.params, [param]: paramValue } }
          : item
      ),
    }));
  };


const FingerprintsData = {
  fingerprintsPerElement,
  fingerprintsArray
}

const TwoElementsFingerprintValues = ["bond","bondscreened","radialspin","radialspinscreened"]
const ThreeElementsFingerprintValues = ["bond", "bondscreened", "bondspin","bondspinscreened"]

useEffect(()=>{
dispatch(setFingerprints(FingerprintsData))
},[fingerprintsPerElement,fingerprintsArray, dispatch])

console.log(fingerprintsArray)

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
                // value={fingerprintsArray[atom][index] || ""}
                onChange={(e) => handleFingerprintChange(e.target.value, atom, index)}
                className="w-full sm:w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {
                SplittedObj[atom][index] == 1 ? 
                <div>
                  <select onChange={(e)=>handleParameterChange({atom:atom, index:index, fingerprinttype:e.target.value})}>
                    <option value={""}>Select an option</option>
                    <option value={"temperature"}>Temperature</option>
                  </select>
                </div>
                : SplittedObj[atom][index] ==2 ?
                <div>
                  <select onChange={(e)=>handleParameterChange({atom:atom, index:index, fingerprinttype:e.target.value})}>
                  <option value={""}>Select an option</option>
                  {
                    TwoElementsFingerprintValues.map((TwoElementsValue)=>(
                      <option value={TwoElementsValue}>{TwoElementsValue}</option>
                    ))
                  }
                  </select>
                </div>: 
                SplittedObj[atom][index] == 3 ?
                <div>
                  <select onChange={(e)=>handleParameterChange({atom:atom, index:index, fingerprinttype:e.target.value})}>
                    <option value={""}>Select an option</option>
                   {
                    ThreeElementsFingerprintValues.map((ThreeElementsValue)=>(
                      <option value={ThreeElementsValue}>{ThreeElementsValue}</option>
                    ))
                   }
                  </select>
                </div>:
                 SplittedObj[atom][index] == 4 ?
                 <div>
                    <select  onChange={(e)=>handleParameterChange({atom:atom, index:index, fingerprinttype:e.target.value})}>
                      <option value={""}>Select an option</option>
                      <option value={"torsion"}>torsion</option>
                    </select>
                 </div>:""
              }

              {
                SplittedObj[atom][index] == 2 ? 
                <div>
                  <div className='flex items-center'>
                  <label>re:</label>
                  <input className='h-4 w-40' onChange={(e)=>handleParameterChange({atom:atom, index:index, param :"re", paramValue: e.target.value})}></input>
                  </div>
                  <div className='flex items-center'>
                  <label>rc:</label>
                  <input className='h-4 w-40' onChange={(e)=>handleParameterChange({atom:atom, index:index, param :"rc", paramValue: e.target.value})}></input>
                  </div>
                  <div className='flex items-center'>
                  <label>dr:</label>
                  <input className='h-4 w-40' onChange={(e)=>handleParameterChange({atom:atom, index:index, param :"dr", paramValue: e.target.value})}></input>
                  </div>
                  <div className='flex items-center'>
                  <label>o:</label>
                  <input className='h-4 w-40' onChange={(e)=>handleParameterChange({atom:atom, index:index, param :"o", paramValue: e.target.value})}></input>
                  </div>
                  <div className='flex items-center'>
                  <label>n:</label>
                  <input className='h-4 w-40' onChange={(e)=>handleParameterChange({atom:atom, index:index, param :"n", paramValue: e.target.value})}></input>
                  </div>
                </div> :
                SplittedObj[atom][index] == 3 ?
                <div>
                  <div className='flex items-center'>
                  <label >re:</label>
                  <input className='h-4 w-40' onChange={(e)=>handleParameterChange({atom:atom, index:index, param :"re", paramValue: e.target.value})}></input>
                  </div>
                  <div className='flex items-center'>
                  <label >rc:</label>
                  <input className='h-4 w-40' onChange={(e)=>handleParameterChange({atom:atom, index:index, param :"rc", paramValue: e.target.value})}></input>
                  </div>
                  <div className='flex items-center'>
                  <label>dr:</label>
                  <input className='h-4 w-40' onChange={(e)=>handleParameterChange({atom:atom, index:index, param :"dr", paramValue: e.target.value})}></input>
                  </div>
                  <div className='flex items-center'>
                  <label>m:</label>
                  <input className='h-4 w-40' onChange={(e)=>handleParameterChange({atom:atom, index:index, param :"m", paramValue: e.target.value})}></input>
                  </div>
                  <div className='flex items-center'>
                  <label>k:</label>
                  <input className='h-4 w-40' onChange={(e)=>handleParameterChange({atom:atom, index:index, param :"k", paramValue: e.target.value})}></input>
                  </div>
                </div>
                :  SplittedObj[atom][index] == 4 ?
                <div>
                  <div className='flex items-center'>
                  <label>re:</label>
                  <input className='h-4 w-40' onChange={(e)=>handleParameterChange({atom:atom, index:index, param :"re", paramValue: e.target.value})}></input>
                  </div>
                  <div className='flex items-center'>
                  <label>rc:</label>
                  <input className='h-4 w-40' onChange={(e)=>handleParameterChange({atom:atom, index:index, param :"rc", paramValue: e.target.value})}></input>
                  </div>
                  <div className='flex items-center'>
                  <label>dr:</label>
                  <input defaultValueclassName='h-4 w-40' onChange={(e)=>handleParameterChange({atom:atom, index:index, param :"dr", paramValue: e.target.value})}></input>
                  </div>
                  <div className='flex items-center'>
                  <label>m:</label>
                  <input className='h-4 w-40' onChange={(e)=>handleParameterChange({atom:atom, index:index, param :"m", paramValue: e.target.value})}></input>
                  </div>
                  <div className='flex items-center'>
                  <label>k:</label>
                  <input className='h-4 w-40' onChange={(e)=>handleParameterChange({atom:atom, index:index, param :"k", paramValue: e.target.value})}></input>
                  </div>
                </div>
                :""
              }

           

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
