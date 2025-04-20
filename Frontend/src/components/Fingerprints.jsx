import React, { useEffect, useState } from 'react';
import { setFingerprints } from '../Slices/DataSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import NetsPerElement from './NetsPerElement.jsx';

const Fingerprints = ({ atoms = [] }) => {
  const dispatch = useDispatch();
  const [fingerprintsPerElement, setFingerprintsPerElement] = useState({});
  const [fingerprintsArray, setFingerprintsArray] = useState({});
  const [SplittedObj, setSplittedObj] = useState({})
  const [FingerPrinttypeChange, setFingerprintTypeChange] = useState("")
  const [ArrayCreated, setArrayCreated] = useState([])
  const CreateArray = (count)=>{
    setArrayCreated(Array(count).fill(""))
  }

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

  const handleParameterChange = ({ atom, index, fingerprinttype = "", param = "", paramValue = "" }) => {
    setFingerprintsArray((prev) => {
      const updatedArray = prev[atom].map((item, i) => {
        if (i === index) {
          const updatedParams = { ...item.params, [param]: paramValue };
  
          // If 'n' or 'o' are updated, calculate 'alpha' array size
          if (param === "n" || param === "o") {
            const n = param === "n" ? parseInt(paramValue, 10) : parseInt(item.params.n || 0, 10);
            const o = param === "o" ? parseInt(paramValue, 10) : parseInt(item.params.o || 0, 10);
            if (!isNaN(n) && !isNaN(o) && n >= o) {
              updatedParams.alpha = Array(n - o + 1).fill(""); // Initialize alpha array
            }
          }
  
          // If 'k' is updated, initialize the 'alphak' array with size 'k'
          if (param === "k") {
            const k = parseInt(paramValue, 10);
            if (!isNaN(k) && k > 0) {
              updatedParams.alphak = Array(k).fill(""); // Initialize alphak array
            }
          }
  
          return { ...item, fingerprinttype, params: updatedParams };
        }
        return item;
      });
  
      return { ...prev, [atom]: updatedArray };
    });
  };

const handleAlphaChange = ({ atom, index, alphaIndex, alphaValue }) => {
  setFingerprintsArray((prev) => {
    const updatedArray = prev[atom].map((item, i) => {
      if (i === index) {
        const updatedAlpha = [...item.params.alpha];
        updatedAlpha[alphaIndex] = alphaValue;
        return { ...item, params: { ...item.params, alpha: updatedAlpha } };
      }
      return item;
    });

    return { ...prev, [atom]: updatedArray };
  });
};


const handleAlphakChange = ({ atom, index, alphakIndex, alphakValue }) => {
  setFingerprintsArray((prev) => {
    const updatedArray = prev[atom].map((item, i) => {
      if (i === index) {
        const updatedAlphak = [...item.params.alphak];
        updatedAlphak[alphakIndex] = alphakValue; // Update specific element in alphak array
        return { ...item, params: { ...item.params, alphak: updatedAlphak } };
      }
      return item;
    });

    return { ...prev, [atom]: updatedArray };
  });
};



const FingerprintsData = {
  fingerprintsPerElement,
  fingerprintsArray
}

const TwoElementsFingerprintValues = ["bond","bondscreened","radialspin","radialspinscreened", "radialscreenedexchange_0"]
const ThreeElementsFingerprintValues = ["bond", "bondscreened", "bondspin","bondspinscreened"]

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

          {fingerprintsArray[atom]?.map((item, index) => (
            <>
            <div key={index} className="flex flex-col sm:flex-row items-center gap-4 mt-4">
              <label className="font-medium text-gray-700 sm:w-1/3">
                Fingerprint {index + 1}:
              </label>

              <div>
              <p className='text-red-700'>Enter elements separated by '_'</p>
              <input
                type="text"
                // value={fingerprintsArray[atom][index] || ""}
                placeholder='Ex: H_H_H'
                onChange={(e) =>{ handleFingerprintChange(e.target.value, atom, index)
                  setFingerprintTypeChange("")
                }}
                className="w-full sm:w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              

              {
                SplittedObj[atom][index] === 2 ?
                <div className='p-2'>
                  <select onChange={(e)=>{handleParameterChange({atom:atom, index:index, fingerprinttype:e.target.value})
                 setFingerprintTypeChange(e.target.value)}}
                 className='border border-gray-300 p-2 rounded-md'>
                  <option value={""}>Select an option</option>
                  {
                    TwoElementsFingerprintValues.map((TwoElementsValue)=>(
                      <option value={TwoElementsValue}>{TwoElementsValue}</option>
                    ))
                  }
                  </select>
                </div>:
                SplittedObj[atom][index] === 1 ? 
                <div className='p-2'>
                  <select className='border border-gray-300 p-2 rounded-md' onChange={(e)=>{handleParameterChange({atom:atom, index:index, fingerprinttype:e.target.value})
                  setFingerprintTypeChange(e.target.value)}}>
                    <option value={""}>Select an option</option>
                    <option value={"temperature"}>Temperature</option>
                  </select>
                </div>
                :  
                SplittedObj[atom][index] === 3 ?
                <div className='p-2'>
                  <select 
                  className='border border-gray-300 p-2 rounded-md'
                  onChange={(e)=>{handleParameterChange({atom:atom, index:index, fingerprinttype:e.target.value})
                 setFingerprintTypeChange(e.target.value)}}
                 
                 >
                    <option value={""}>Select an option</option>
                   {
                    ThreeElementsFingerprintValues.map((ThreeElementsValue)=>(
                      <option value={ThreeElementsValue}>{ThreeElementsValue}</option>
                    ))
                   }
                  </select>
                </div>:
                 SplittedObj[atom][index] === 4 ?
                 <div className='p-2'>
                    <select  
                    className='border border-gray-300 p-2 rounded-md'
                    onChange={(e)=>{handleParameterChange({atom:atom, index:index, fingerprinttype:e.target.value})
                   setFingerprintTypeChange(e.target.value)}}>
                      <option value={""}>Select an option</option>
                      <option value={"torsion"}>torsion</option>
                    </select>
                 </div>:""
              }

              {
                SplittedObj[atom][index] === 2 ? 
                <div>
                  <div className='flex items-center mt-2'>
                  <label className='mr-2 text-base font-semibold'>re:</label>
                  <input className='h-4 w-40 border border-gray-300 py-4 px-2 rounded-md' onChange={(e)=>handleParameterChange({atom:atom, index:index,fingerprinttype:FingerPrinttypeChange, param :"re", paramValue: e.target.value})}></input>
                  </div>

                  <div className='flex items-center mt-2'>
                  <label className='mr-2 text-base font-semibold'>rc:</label>
                  <input className='h-4 w-40 border border-gray-300 py-4 px-2 rounded-md' onChange={(e)=>handleParameterChange({atom:atom, index:index,fingerprinttype:FingerPrinttypeChange, param :"rc", paramValue: e.target.value})}></input>
                  </div>

                  <div className='flex items-center mt-2'>
                  <label className='mr-2 text-base font-semibold'>dr:</label>
                  <input className='h-4 w-40 border border-gray-300 py-4 px-2 rounded-md' onChange={(e)=>handleParameterChange({atom:atom, index:index,fingerprinttype:FingerPrinttypeChange, param :"dr", paramValue: e.target.value})}></input>
                  </div>

                  <div className='flex items-center mt-2'>
                  <label className='mr-2 text-base font-semibold'>o:</label>
                  <input className='h-4 w-40 border border-gray-300 py-4 px-2 rounded-md' onChange={(e)=>handleParameterChange({atom:atom, index:index,fingerprinttype:FingerPrinttypeChange, param :"o", paramValue: e.target.value})}></input>
                  </div>

                  <div className='flex items-center mt-2'>
                  <label className='mr-2 text-base font-semibold'>n:</label>
                  <input className='h-4 w-40 border border-gray-300 py-4 px-2 rounded-md' onChange={(e)=>{
                    handleParameterChange({atom:atom, index:index, fingerprinttype:FingerPrinttypeChange, param :"n", paramValue: e.target.value})}}></input>
                  </div>

                <div>
   
      {item.params.alpha && (
        <div className="mt-4">
          <label className="font-medium text-gray-700">
            Alpha Array:
          </label>
          {item.params.alpha.map((alphaValue, alphaIndex) => (
            <div key={alphaIndex} className="flex items-center gap-2 mt-2">
              <label>{`Alpha[${alphaIndex}]`}</label>
              <input
                type="text"
                value={alphaValue || ""}
                onChange={(e) =>
                  handleAlphaChange({
                    atom,
                    index,
                    alphaIndex,
                    alphaValue: e.target.value,
                  })
                }
                className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      )}
    </div>
                </div> :
                SplittedObj[atom][index] == 3 ?
                <div>
                  <div className='flex items-center mt-2'>
                  <label className='mr-2 text-base font-semibold' >re:</label>
                  <input  className='h-4 w-40 border border-gray-300 py-4 px-2 rounded-md' onChange={(e)=>handleParameterChange({atom:atom, index:index,fingerprinttype:FingerPrinttypeChange, param :"re", paramValue: e.target.value})}></input>
                  </div>

                  <div className='flex items-center mt-2'>
                  <label className='mr-2 text-base font-semibold'>rc:</label>
                  <input  className='h-4 w-40 border border-gray-300 py-4 px-2 rounded-md' onChange={(e)=>handleParameterChange({atom:atom, index:index,fingerprinttype:FingerPrinttypeChange, param :"rc", paramValue: e.target.value})}></input>
                  </div>

                  <div className='flex items-center mt-2'>
                  <label className='mr-2 text-base font-semibold'>dr:</label>
                  <input  className='h-4 w-40 border border-gray-300 py-4 px-2 rounded-md' onChange={(e)=>handleParameterChange({atom:atom, index:index,fingerprinttype:FingerPrinttypeChange, param :"dr", paramValue: e.target.value})}></input>
                  </div>

                  <div className='flex items-center mt-2'>
                  <label className='mr-2 text-base font-semibold'>m:</label>
                  <input  className='h-4 w-40 border border-gray-300 py-4 px-2 rounded-md' onChange={(e)=>handleParameterChange({atom:atom, index:index,fingerprinttype:FingerPrinttypeChange, param :"m", paramValue: e.target.value})}></input>
                  </div>

                  <div className='flex items-center mt-2'>
                  <label className='mr-2 text-base font-semibold'>k:</label>
                  <input  className='h-4 w-40 border border-gray-300 py-4 px-2 rounded-md' onChange={(e)=>handleParameterChange({atom:atom, index:index,fingerprinttype:FingerPrinttypeChange, param :"k", paramValue: e.target.value})}></input>

                  {
  item.params.alphak && (
    <div className="mt-4">
      <label className="font-medium text-gray-700">
        Alphak Array:
      </label>
      {item.params.alphak.map((alphakValue, alphakIndex) => (
        <div key={alphakIndex} className="flex items-center gap-2 mt-2">
          <label>{`Alphak[${alphakIndex}]`}</label>
          <input
            type="text"
            value={alphakValue || ""}
            onChange={(e) =>
              handleAlphakChange({
                atom,
                index,
                alphakIndex,
                alphakValue: e.target.value,
              })
            }
            className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}
    </div>
  )
}
                  </div>
                </div>
                :  SplittedObj[atom][index] == 4 ?
                <div>
                  <div className='flex items-center mt-2'>
                  <label className='mr-2 text-base font-semibold' >re:</label>
                  <input  className='h-4 w-40 border border-gray-300 py-4 px-2 rounded-md' onChange={(e)=>handleParameterChange({atom:atom, index:index,fingerprinttype:FingerPrinttypeChange, param :"re", paramValue: e.target.value})}></input>
                  </div>

                  <div className='flex items-center mt-2'>
                  <label className='mr-2 text-base font-semibold'>rc:</label>
                  <input  className='h-4 w-40 border border-gray-300 py-4 px-2 rounded-md' onChange={(e)=>handleParameterChange({atom:atom, index:index,fingerprinttype:FingerPrinttypeChange, param :"rc", paramValue: e.target.value})}></input>
                  </div>

                  <div className='flex items-center mt-2'>
                  <label className='mr-2 text-base font-semibold'>dr:</label>
                  <input  className='h-4 w-40 border border-gray-300 py-4 px-2 rounded-md' onChange={(e)=>handleParameterChange({atom:atom, index:index,fingerprinttype:FingerPrinttypeChange, param :"dr", paramValue: e.target.value})}></input>
                  </div>

                  <div className='flex items-center mt-2'>
                  <label className='mr-2 text-base font-semibold'>m:</label>
                  <input  className='h-4 w-40 border border-gray-300 py-4 px-2 rounded-md' onChange={(e)=>handleParameterChange({atom:atom, index:index,fingerprinttype:FingerPrinttypeChange, param :"m", paramValue: e.target.value})}></input>
                  </div>

                  <div className='flex items-center mt-2'>
                  <label className='mr-2 text-base font-semibold'>k:</label>
                  <input  className='h-4 w-40 border border-gray-300 py-4 px-2 rounded-md' onChange={(e)=>handleParameterChange({atom:atom, index:index,fingerprinttype:FingerPrinttypeChange, param :"k", paramValue: e.target.value})}></input>
                  </div>
                  {
  item.params.alphak && (
    <div className="mt-4">
      <label className="font-medium text-gray-700">
        Alphak Array:
      </label>
      {item.params.alphak.map((alphakValue, alphakIndex) => (
        <div key={alphakIndex} className="flex items-center gap-2 mt-2">
          <label>{`Alphak[${alphakIndex}]`}</label>
          <input
            type="text"
            value={alphakValue || ""}
            onChange={(e) =>
              handleAlphakChange({
                atom,
                index,
                alphakIndex,
                alphakValue: e.target.value,
              })
            }
            className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}
    </div>
  )
}

                </div>
                :""
              }

           

              </div>

            </div>
            </>
          ))}
        </div>
      ))}
    <div>
    {
      atoms.length>0 && <NetsPerElement atoms = {atoms} fingerprints = {fingerprintsArray}></NetsPerElement>
    }
  </div>
    </div>
  );
};

export default Fingerprints;
