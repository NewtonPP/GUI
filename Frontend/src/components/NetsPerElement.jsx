import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNetsPerElement } from '../Slices/DataSlice';
import CreatableSelect from 'react-select/creatable';

const NetsPerElement = ({ atoms, fingerprints }) => {
  const [NetData, setNetData] = useState([]); // Initialize as an empty array
  const [FPS, setFPS] = useState({}); // Initialize FPS state
  const dispatch = useDispatch();

  const HandleChangeInNumber = (Number, atom, index) => {
    setNetData((prev) => {
      const newNetData = [...prev];
      newNetData[index] = { Nets: Array(Number).fill(""), atom };
      return newNetData;
    });
  };

  const HandleChangeInNet = (value, index, idx, atom) => {
    setNetData((prev) => {
      const newNetData = [...prev];
      newNetData[index] = { ...newNetData[index] }; // Spread to maintain other properties
      newNetData[index].Nets = [...newNetData[index].Nets]; // Spread to create a new array
      newNetData[index].Nets[idx] = { value }; // Update the specific net
      return newNetData;
    });
  };

  const HandleChangeInLayerSize = (value, index, idx, atom) => {
    setNetData((prev) => {
      const newNetData = [...prev];
      newNetData[index] = { ...newNetData[index] };
      newNetData[index].Nets = [...newNetData[index].Nets];
      newNetData[index].Nets[idx] = {
        ...newNetData[index].Nets[idx],
        layersize: value,
      };
      return newNetData;
    });
  };

  const HandleChangeInActivation = (value, index, idx, atom) => {
    setNetData((prev) => {
      const newNetData = [...prev];
      newNetData[index] = { ...newNetData[index] };
      newNetData[index].Nets = [...newNetData[index].Nets];
      newNetData[index].Nets[idx] = {
        ...newNetData[index].Nets[idx],
        activation: value,
      };
      return newNetData;
    });
  };

  const HandleChangeInFingerprintMap = (value, index, idx, atom) => {
    setNetData((prev) => {
      const newNetData = [...prev];
      newNetData[index] = { ...newNetData[index] };
      newNetData[index].Nets = [...newNetData[index].Nets];
      newNetData[index].Nets[idx] = {
        ...newNetData[index].Nets[idx],
        fingerprintmap: value,
      };
      return newNetData;
    });
  };

  const HandleChangeInOrder = (value, index, idx, atom) => {
    setNetData((prev) => {
      const newNetData = [...prev];
      newNetData[index] = { ...newNetData[index] };
      newNetData[index].Nets = [...newNetData[index].Nets];
      newNetData[index].Nets[idx] = {
        ...newNetData[index].Nets[idx],
        order: value,
      };
      return newNetData;
    });
  };

  useEffect(() => {
    const newFPS = {};

    for (const key in fingerprints) {
      const fingerprintTypes = fingerprints[key].map(
        (item) => ({value:item.fingerprinttype,label:item.fingerprinttype})
      );
      newFPS[key] = fingerprintTypes;
    }

    setFPS(newFPS); 
  }, [fingerprints]);


  const HandleFingerprintSelection = (values, atom, index, idx) =>{
    setNetData((prev) => {
      const newNetData = [...prev];
      newNetData[index] = { ...newNetData[index] };
      newNetData[index].Nets = [...newNetData[index].Nets];
      newNetData[index].Nets[idx] = {
        ...newNetData[index].Nets[idx],
        fingerprintmap: values.map((fpm)=>fpm.value),
      };
      return newNetData;
    });
  }


  console.log(NetData)

  useEffect(() => {
    dispatch(setNetsPerElement(NetData)); 
  }, [dispatch, NetData]);

  return (
    <div className="space-y-8 p-6">
      {atoms.map((atom, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-semibold mb-4 text-gray-700">
            Nets per element {atom}:
          </h1>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-600">
              Number of Nets
            </label>
            <input
              type="number"
              placeholder="Enter number of nets"
              onChange={(e) =>
                HandleChangeInNumber(Number(e.target.value), atom, index)
              }
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {NetData[index] &&
            NetData[index].Nets?.map((_, idx) => {
              return (
                <div key={idx} className="space-y-4">
                  <div>
                    <label className="block text-lg font-medium text-gray-600">
                      Select Net Type
                    </label>
                    <select
                      onChange={(e) => {
                        HandleChangeInNet(e.target.value, index, idx, atom);
                      }}
                      className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="">Select</option>
                      <option value="default_0">default_0</option>
                      <option value="exchangespin_0">exchangespin_0</option>
                    </select>
                  </div>

                  {/* Handle conditional rendering based on net type */}
                  {NetData[index]?.Nets[idx]?.value === "default_0" ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-lg font-medium text-gray-600">
                          Layer Size
                        </label>
                        <input
                          placeholder="Enter comma separated values"
                          className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                          onChange={(e) =>
                            HandleChangeInLayerSize(e.target.value, index, idx, atom)
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-600">
                          Activation
                        </label>
                        <select
                          className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                          onChange={(e) => {
                            HandleChangeInActivation(e.target.value, index, idx, atom);
                          }}
                        >
                          <option value="">Select</option>
                          <option value="SigI">SigI</option>
                          <option value="linear">Linear</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-600">
                          Fingerprint Map
                        </label>
                        <CreatableSelect isMulti options={FPS[atom]} onChange={(e)=>HandleFingerprintSelection(e, atom, index, idx)}/>
                        {/* <select
                          className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                          onChange={(e) => {
                            HandleChangeInFingerprintMap(e.target.value, index, idx, atom);
                          }}
                        >
                            <option>Select</option>
                          {
                            FPS[atom].map((fp)=>(
                            
                            fp?<option>{fp}</option>:""
                          
                            ))
                          }
                        </select> */}
                      </div>
                    </div>
                  ) : NetData[index]?.Nets[idx]?.value === "exchangespin_0" ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-lg font-medium text-gray-600">
                          Layer Size
                        </label>
                        <input
                          placeholder="Enter comma separated values. Ex: 24,10,13"
                          className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                          onChange={(e) => {
                            HandleChangeInLayerSize(e.target.value, index, idx, atom);
                          }}
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-600">
                          Activation
                        </label>
                        <select
                          className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                          onChange={(e) => {
                            HandleChangeInActivation(e.target.value, index, idx, atom);
                          }}
                        >
                          <option value="">Select</option>
                          <option value="SigI">SigI</option>
                          <option value="linear">Linear</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-600">
                          Fingerprint Map
                        </label>
                        <CreatableSelect isMulti options={FPS[atom]} onChange={(e)=>HandleFingerprintSelection(e, atom, index, idx)}/>
                        {/* <select
                          className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                          onChange={(e) => {
                            HandleChangeInFingerprintMap(e.target.value, index, idx, atom);
                          }}
                        >
                          <option>Select</option>
                          {
                            FPS[atom].map((fp)=>(
                            
                            fp?<option>{fp.value}</option>:""
                          
                            ))
                          }
                        </select> */}
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-600">
                          Order
                        </label>
                        <input
                          type="number"
                          placeholder="Enter a number"
                          className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                          onChange={(e) => {
                            HandleChangeInOrder(e.target.value, index, idx, atom);
                          }}
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
