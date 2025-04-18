import Atomtypes from "./components/Atomtypes"
import {Provider} from "react-redux"
import { store } from "./store.js"
import Submit from "./components/Submit.jsx"
import CalibrationParameters from "./components/CalibrationParameters.jsx"
import { useContext } from "react"
import { LoadingContext } from "../Contexts/LoadingContext.jsx"
import Loader from "./components/Loader.jsx"


function App() {
  const {isLoading, setIsLoading} = useContext(LoadingContext)
  return (
    <>
    <Provider store={store}>
   { !isLoading ? <> 
    <Atomtypes/>
    <CalibrationParameters/>
    <Submit/>
    </>:<Loader/>}

    </Provider>
    </>
  )
}

export default App
