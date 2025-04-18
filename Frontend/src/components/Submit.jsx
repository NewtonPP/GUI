import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { LoadingContext } from '../../Contexts/LoadingContext'


const Submit = () => {
    const atomtypes = useSelector((state)=>state.data.atomtypes)
    const fingerprintsperelement = useSelector((state)=>state.data.fingerprintsperelement)
    const networklayers = useSelector((state)=>state.data.networklayers)
    const calibrationparameters = useSelector((state)=> state.data.calibrationparameters)
    const activationfunctions = useSelector((state)=>state.data.activationfunctions)
    const screening = useSelector((state)=>state.data.screening)
    const stateequations = useSelector((state)=>state.data.stateequations)
    const netsperelement = useSelector((state)=>state.data.netsperelement)
    const Data = {
        atomtypes,
        fingerprintsperelement,
        networklayers,
        calibrationparameters,
        activationfunctions,
        screening,
        stateequations,
        netsperelement
    }
    const {setIsLoading} = useContext(LoadingContext)
    let filename
    const HandleSubmit = () =>{
      setIsLoading(true)
        axios.post(`${import.meta.env.VITE_API_URL}generatescripts`,Data)
        .then((response)=>{
           filename = response.data.filename
           axios.get(`${import.meta.env.VITE_API_URL}downloadscripts/${filename}`,{
            responseType:"blob"
          })
          .then((response)=>{
            const fileUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a")
            link.href = fileUrl;
            link.setAttribute("download",`RANNscript_${filename}`)
            document.body.appendChild(link)
            link.click();
            document.body.removeChild(link)
            setIsLoading(false)
          })
          .catch((error)=>console.log(error))
        })

       
    }

  return (
    <div className='w-full'>
      <button onClick={HandleSubmit} className='w-full text-2xl bg-blue-500 flex justify-center items-center text-white font-semibold p-2 hover:bg-blue-700'>Submit</button>
    </div>
  )
}

export default Submit
