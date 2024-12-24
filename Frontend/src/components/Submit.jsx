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
    const stateequations = useSelector((state)=>state.data.stateequations)
    const Data = {
        atomtypes,
        fingerprintsperelement,
        networklayers,
        calibrationparameters,
        activationfunctions,
        screening,
        stateequations
    }
    const HandleSubmit = () =>{
        axios.post("http://localhost:5000/generatescripts",Data,{headers:{"Content-Type":"application/json"}})
    }

  return (
    <div className='w-full'>
      <button onClick={HandleSubmit} className='w-full text-2xl bg-blue-500 flex justify-center items-center text-white font-semibold p-2 hover:bg-blue-700'>Submit</button>
    </div>
  )
}

export default Submit
