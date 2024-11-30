import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCalibrationparameters } from "../Slices/DataSlice.js";
const CalibrationParameters = () => {
  const dispatch = useDispatch();
  const algorithms = ["LMch", "CG", "LMSearch", "bfgs"];  

  const [CalibrationParameters, setCalibrationParameters] = useState({
      algorithm:"",
      doforces:"",
      normalizeinput:"",
      tolerance:"",
      regularizer:"",
      logfile:"",
      potentialoutputfile:"",
      potentialoutputfrequency:"",
      maxepochs:"",
      overwritepotentials:"",
      debug1freq:"",
      debug2freq:"",
      debug3freq:"",
      debug4freq:"",
      debug5freq:"",
      debug6freq:"",
      adaptiveregularizer:"",
      lambdainitial:"",
      lambdaincrease:"",
      lambdareduce:"",
      inumweight:"",
      seed:"",
      targettype:""
  })

  useEffect(()=>{
    dispatch(setCalibrationparameters(CalibrationParameters))
  },[dispatch, CalibrationParameters])

return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Calibration Parameters
      </h1>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {/* Algorithm */}
        <div className="flex flex-col">
          <label className="text-gray-800 font-medium mb-2">Algorithm</label>
          <select className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none" onChange={(e)=>{setCalibrationParameters({...CalibrationParameters, algorithm:e.target.value})}}>
            {algorithms.map((algorithm) => (
              <option key={algorithm} value={algorithm}>
                {algorithm}
              </option>
            ))}
          </select>
        </div>

        {/* Dump Directory */}
        <div className="flex flex-col">
          <label className="text-gray-800 font-medium mb-2">Dump Directory</label>
          <input
            type="file"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Doforces */}
        <div className="flex flex-col">
          <label className="text-gray-800 font-medium mb-2">Doforces</label>
          <select className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none" 
           onChange={(e)=>{setCalibrationParameters({...CalibrationParameters, doforces:e.target.value})}}>
            <option value="0">0</option>
            <option value="1">1</option>
          </select>
        </div>

        {/* Normalize Input */}
        <div className="flex flex-col">
          <label className="text-gray-800 font-medium mb-2">Normalize Input</label>
          <select className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          onChange={(e)=>{setCalibrationParameters({...CalibrationParameters, normalizeinput:e.target.value})}}>
            <option value="0">0</option>
            <option value="1">1</option>
          </select>
        </div>

        {/* Tolerance */}
        <div className="flex flex-col">
          <label className="text-gray-800 font-medium mb-2">Tolerance</label>
          <input
            type="number"
            defaultValue="0.0000001"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            onChange={(e)=>{setCalibrationParameters({...CalibrationParameters, tolerance:e.target.value})}}
          />
        </div>

        {/* Regularizer */}
        <div className="flex flex-col">
          <label className="text-gray-800 font-medium mb-2">Regularizer</label>
          <input
            type="number"
            defaultValue="0.0002"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            onChange={(e)=>{setCalibrationParameters({...CalibrationParameters, regularizer:e.target.value})}}
          />
        </div>

        {/* Log File */}
        <div className="flex flex-col">
          <label className="text-gray-800 font-medium mb-2">Log File</label>
          <input
            type="text"
            placeholder="TiAl1012.log"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            onChange={(e)=>{setCalibrationParameters({...CalibrationParameters, logfile:e.target.value})}}
          />
        </div>

        {/* Potential Output File */}
        <div className="flex flex-col">
          <label className="text-gray-800 font-medium mb-2">Potential Output File</label>
          <input
            type="text"
            placeholder="TiAl1012.nn"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            onChange={(e)=>{setCalibrationParameters({...CalibrationParameters, potentialoutputfile:e.target.value})}}
          />
        </div>

        {/* Potential Output Frequency */}
        <div className="flex flex-col">
          <label className="text-gray-800 font-medium mb-2">Potential Output Frequency</label>
          <input
            type="number"
            defaultValue="10"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            onChange={(e)=>{setCalibrationParameters({...CalibrationParameters, potentialoutputfrequency:e.target.value})}}
          />
        </div>

        {/* Max Epochs */}
        <div className="flex flex-col">
          <label className="text-gray-800 font-medium mb-2">Max Epochs</label>
          <input
            type="number"
            defaultValue="10000"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            onChange={(e)=>{setCalibrationParameters({...CalibrationParameters, maxepochs:e.target.value})}}
          />
        </div>

        {/* Overwrite Potentials */}
        <div className="flex flex-col">
          <label className="text-gray-800 font-medium mb-2">Overwrite Potentials</label>
          <select className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          onChange={(e)=>{setCalibrationParameters({...CalibrationParameters, overwritepotentials:e.target.value})}}>
            <option value="0">0</option>
            <option value="1">1</option>
          </select>
        </div>
        
        {/*Debug Freqs*/}
        <div className="flex flex-col">
          <label className="text-gray-800 font-medium mb-2">debug1freq :</label>
          <input
            type="number"
            defaultValue="10"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            onChange={(e)=>{setCalibrationParameters({...CalibrationParameters, debug1freq:e.target.value})}}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-800 font-medium mb-2">debug2freq :</label>
          <input
            type="number"
            defaultValue="0"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            onChange={(e)=>{setCalibrationParameters({...CalibrationParameters, debug2freq:e.target.value})}}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-800 font-medium mb-2">debug3freq :</label>
          <input
            type="number"
            defaultValue="0"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            onChange={(e)=>{setCalibrationParameters({...CalibrationParameters, debug3freq:e.target.value})}}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-800 font-medium mb-2">debug4freq :</label>
          <input
            type="number"
            defaultValue="0"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            onChange={(e)=>{setCalibrationParameters({...CalibrationParameters, debug4freq:e.target.value})}}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-800 font-medium mb-2">debug5freq :</label>
          <input
            type="number"
            defaultValue="0"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            onChange={(e)=>{setCalibrationParameters({...CalibrationParameters, debug5freq:e.target.value})}}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-800 font-medium mb-2">debug6freq :</label>
          <input
            type="number"
            defaultValue="0"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            onChange={(e)=>{setCalibrationParameters({...CalibrationParameters, debug6freq:e.target.value})}}
          />
        </div>

        {/*Adaptive Regularizer */}
        <div className="flex flex-col">
          <label className="text-gray-800 font-medium mb-2">Adaptive Regularizer</label>
          <select className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            onChange={(e)=>{setCalibrationParameters({...CalibrationParameters, adaptiveregularizer:e.target.value})}}>
            <option value="0">0</option>
            <option value="1">1</option>
          </select>
        </div>
        
        {/*Lambda Initial */}
        <div className="flex flex-col">
          <label className="text-gray-800 font-medium mb-2">Lambda Initial :</label>
          <input
            onChange={(e)=>{setCalibrationParameters({...CalibrationParameters, lambdainitial:e.target.value})}}
            defaultValue="1000"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/*Lambda Increase*/}
        <div className="flex flex-col">
          <label className="text-gray-800 font-medium mb-2">Lambda Increase :</label>
          <input
            onChange={(e)=>{setCalibrationParameters({...CalibrationParameters, lambdaincrease:e.target.value})}}
            defaultValue="10"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/*Lambda Reduce*/}
        <div className="flex flex-col">
          <label className="text-gray-800 font-medium mb-2">Lambda Reduce :</label>
          <input
            onChange={(e)=>{setCalibrationParameters({...CalibrationParameters, lambdareduce:e.target.value})}}
            defaultValue="0.2"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/*Inum Weight*/}
        <div className="flex flex-col">
          <label className="text-gray-800 font-medium mb-2">Inum Weight :</label>
          <input
            onChange={(e)=>{setCalibrationParameters({...CalibrationParameters, inumweight:e.target.value})}}
            defaultValue="1"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/*Seed*/}
        <div className="flex flex-col">
          <label className="text-gray-800 font-medium mb-2">Seed :</label>
          <input
            onChange={(e)=>{setCalibrationParameters({...CalibrationParameters, seed:e.target.value})}}
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

          {/*Target Type*/}
        <div className="flex flex-col">
          <label className="text-gray-800 font-medium mb-2">Target Type</label>
          <select className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none" defaultValue={"1"}
          onChange={(e)=>{setCalibrationParameters({...CalibrationParameters, targettype:e.target.value})}}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CalibrationParameters;
