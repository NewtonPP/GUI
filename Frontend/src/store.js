import { configureStore } from "@reduxjs/toolkit"
import DataReducer from "./Slices/DataSlice"


export const store = configureStore({
reducer:{
 data:DataReducer
}
})