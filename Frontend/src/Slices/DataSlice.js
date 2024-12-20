import { createSlice } from "@reduxjs/toolkit";

const DataSlice = createSlice({
    name:"Data",
    initialState:{
        atomtypes:"",
        fingerprintsperelement:"",
        networklayers:"",
        calibrationparameters:"",
        activationfunctions:"",
        screening:""
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
        }

    }
})

export const {setAtomtypes, setFingerprints,setNetworkLayers, setCalibrationparameters, setActivationFunctions, setScreening} = DataSlice.actions
export default DataSlice.reducer