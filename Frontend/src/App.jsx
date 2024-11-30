import Atomtypes from "./components/Atomtypes"
import {Provider} from "react-redux"
import { store } from "./store.js"
import Submit from "./components/Submit.jsx"
import CalibrationParameters from "./components/CalibrationParameters.jsx"


function App() {
  return (
    <>
    <Provider store={store}> 
    <Atomtypes/>
    <CalibrationParameters/>
    <Submit/>
    </Provider>
    </>
  )
}

export default App
