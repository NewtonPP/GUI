import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNetsPerElement } from '../Slices/DataSlice';
import CreatableSelect from 'react-select/creatable';

const NetsPerElement = ({ atoms, fingerprints }) => {
  const [NetData, setNetData] = useState([]); 
  const [FPS, setFPS] = useState({}); 
  const ActivationValues = ["capped","cappedsharp","cappedshift","linear","sharpcapped","sigl","slowcapped","tanh",
    "tanhtwist","ttanh","zero"
  ]
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
      newNetData[index] = { ...newNetData[index] }; 
      newNetData[index].Nets = [...newNetData[index].Nets]; 
      newNetData[index].Nets[idx] = { value };
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
        layersize: value.split(","),
        NumberOfLayer:value.split(",")
      };
      return newNetData;
    });
  };

const HandleChangeInActivation = (value, index, idx, atom, layerIdx) => {
  setNetData((prev) => {
    const newNetData = [...prev];
    const net = newNetData[index].Nets[idx];

    const updatedActivations = [...(net.activation || [])];
    updatedActivations[layerIdx] = value;

    newNetData[index] = { ...newNetData[index] };
    newNetData[index].Nets = [...newNetData[index].Nets];
    newNetData[index].Nets[idx] = {
      ...net,
      activation: updatedActivations,
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
              min='0'
              placeholder="Enter number of nets"
              
              onChange={(e) =>
                HandleChangeInNumber(Math.abs(Number(e.target.value)), atom, index)
              }
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {NetData[index] &&
            NetData[index].Nets?.map((net, idx) => {
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
                       {net?.NumberOfLayer?.map((_, layerIdx) =>
  layerIdx !== net?.NumberOfLayer?.length - 1 ? (
    <div key={layerIdx}>
      <select
        className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) =>
          HandleChangeInActivation(e.target.value, index, idx, atom, layerIdx)
        }
      >
        <option value="">Select Activation</option>
        {ActivationValues.map((activation, i) => (
          <option key={i} value={activation}>{activation}</option>
        ))}
      </select>
    </div>
  ) : null
)}

                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-600">
                          Fingerprint Map
                        </label>
                        <CreatableSelect isMulti options={FPS[atom]} onChange={(e)=>HandleFingerprintSelection(e, atom, index, idx)}/>

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
                        {net?.NumberOfLayer?.map((_, layerIdx) =>
  layerIdx !== net?.NumberOfLayer?.length - 1 ? (
    <div key={layerIdx}>
      <select
        className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) =>
          HandleChangeInActivation(e.target.value, index, idx, atom, layerIdx)
        }
      >
        <option value="">Select Activation</option>
        {ActivationValues.map((activation, i) => (
          <option key={i} value={activation}>{activation}</option>
        ))}
      </select>
    </div>
  ) : null
)}
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-600">
                          Fingerprint Map
                        </label>
                        <CreatableSelect isMulti options={FPS[atom]} onChange={(e)=>HandleFingerprintSelection(e, atom, index, idx)}/>
 
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
