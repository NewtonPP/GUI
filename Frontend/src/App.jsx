import Atomtypes from "./components/Atomtypes"
import {Provider} from "react-redux"
import { store } from "./store.js"
import Submit from "./components/Submit.jsx"


function App() {
  return (
    <>
    <Provider store={store}> 
    <Atomtypes/>
    <Submit/>
    </Provider>
    </>
  )
}

export default App
