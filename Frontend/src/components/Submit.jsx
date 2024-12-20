import React from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'


const Submit = () => {
    const atomtypes = useSelector((state)=>state.data.atomtypes)
    const fingerprintsperelement = useSelector((state)=>state.data.fingerprintsperelement)
    const networklayers = useSelector((state)=>state.data.networklayers)
    const calibrationparameters = useSelector((state)=> state.data.calibrationparameters)
    const activationfunctions = useSelector((state)=>state.data.activationfunctions)
    const screening = useSelector((state)=>state.data.screening)
    const Data = {
        atomtypes,
        fingerprintsperelement,
        networklayers,
        calibrationparameters,
        activationfunctions,
        screening
    }
    const HandleSubmit = () =>{
        axios.post("http://localhost:5000/generatescripts",Data,{headers:{"Content-Type":"application/json"}})
        .then((response)=>console.log(response))
        .catch((error)=>{throw Error})
    }

  return (
    <div>
      <button onClick={HandleSubmit}>Submit</button>
    </div>
  )
}

export default Submit
