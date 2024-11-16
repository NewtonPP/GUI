import { createSlice } from "@reduxjs/toolkit";

const DataSlice = createSlice({
    name:"Data",
    initialState:{
        atomtypes:"",
        fingerprintsperelement:"",
        networklayers:""
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
        }

    }
})

export const {setAtomtypes, setFingerprints,setNetworkLayers} = DataSlice.actions
export default DataSlice.reducer