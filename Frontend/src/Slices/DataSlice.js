import { createSlice } from "@reduxjs/toolkit";

const DataSlice = createSlice({
    name:"Data",
    initialState:{
        atomtypes:"",
        fingerprintsperelement:"",
        networklayers:"",
        calibrationparameters:"",
        activationfunctions:"",
        screening:"",
        stateequations:"",
        netsperelement:""
    },
    reducers:{
        setAtomtypes: (state,action)=>{
            state.atomtypes = action.payload
        },
        setFingerprints:(state,action)=>{
            state.fingerprintsperelement = action.payload
        },
        setNetworkLayers:(state,action)=>{
            state.networklayers = action.payload
        },
        setCalibrationparameters:(state,action)=>{
            state.calibrationparameters = action.payload
        },
        setActivationFunctions:(state,action)=>{
            state.activationfunctions = action.payload
        },
        setScreening:(state,action)=>{
            state.screening = action.payload
        },
        setStateEquations:(state,action)=>{
            state.stateequations = action.payload
        },
        setNetsPerElement:(state, action)=>{
            state.netsperelement = action.payload
        }

    }
})

export const {setAtomtypes, setFingerprints,setNetworkLayers, setCalibrationparameters, setActivationFunctions, setScreening,setStateEquations, setNetsPerElement} = DataSlice.actions
export default DataSlice.reducer