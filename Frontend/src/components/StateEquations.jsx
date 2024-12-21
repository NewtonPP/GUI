import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStateEquations } from "../Slices/DataSlice.js";

const StateEquations = ({ atoms = [] }) => {
  const stateEquations = [
    "eamscreened",
    "covalent",
    "repulse",
    "rose",
    "rosescreened",
    "spinbiquadratic",
    "spinj",
    "spinjscreened",
    "zbl",
  ];

  const HandleCovalent = (n) =>{
    const covalent ={
      "ec":Array(n).fill(""),
      "a":Array(n).fill(""),
      "rc":Array(1).fill(""),
      "b":Array(n).fill(""),
      "c":Array(n).fill(""),
      "dr":Array(n).fill("")
    }
    return covalent
  }

  const [Covalent,SetCovalent] = useState({ "ec":[],
    "a":[],
    "rc":[],
    "b":[],
    "c":[],
    "dr":[]})

    const HandleCovalentChange = (atom, equation, constant, value, index, idx) => {
  
      const newcovalent = {...Covalent};
      newcovalent[constant] = [...newcovalent[constant]]; 
      newcovalent[constant][index] = value;

      SetCovalent(newcovalent);

      if (
        stateEquationsArray?.[atom]?.[idx]?.equation === equation &&
        stateEquationsArray?.[atom]?.[idx]?.type === "covalent"
      ) {
        setStateEquationsArray((prevState) => {

          const updatedState = { ...prevState };
    
          updatedState[atom] = Array.isArray(prevState[atom])
            ? [...prevState[atom]]
            : [];
          updatedState[atom][idx] = {
            ...updatedState[atom][idx], 
            stateequationconstants: Covalent,
          };
          return updatedState;
        });
      }   
  };
  
  const HandleEamscreened = (n) =>{
    const eamscreened = {
      "ec":Array(n *n).fill(""),
      "re":Array(n *n).fill(""),
      "rc":Array(n *n).fill(""),
      "alpha":Array(n *n).fill(""),
      "delta":Array(n *n).fill(""),
      "dr":Array(n *n).fill(""),
      "cweight":Array(n).fill(""),
      "beta":Array(n).fill(""),
      "Asub":Array(n).fill(""),
      "lat":["b1", "b2","bcc","ch4","dia","dim","fcc","hcp","l12"]
    }

    return eamscreened
  }

  const [EamScrenedData, setEamScreenedData] = useState({
    "ec":Array().fill(""),
    "re":Array().fill(""),
    "rc":Array().fill(""),
    "alpha":Array().fill(""),
    "delta":Array().fill(""),
    "dr":Array().fill(""),
    "cweight":Array().fill(""),
    "beta":Array().fill(""),
    "Asub":Array().fill(""),
    "lat":""
  })
  const HandleEamScreenedChange = (atom, equation, constant, value, index, idx) =>{
    const newEamScreened = {...EamScrenedData};
    if(constant === "lat"){
      newEamScreened[constant] = value
      setEamScreenedData(newEamScreened);
      return;
    }
 
    newEamScreened[constant] = [...newEamScreened[constant]]; 
    newEamScreened[constant][index] = value; 

    if (
      stateEquationsArray?.[atom]?.[idx]?.equation === equation &&
      stateEquationsArray?.[atom]?.[idx]?.type === "eamscreened"
    ) {
      setStateEquationsArray((prevState) => {
        const updatedState = { ...prevState };
        updatedState[atom] = Array.isArray(prevState[atom])
          ? [...prevState[atom]]
          : [];
        updatedState[atom][idx] = {
          ...updatedState[atom][idx], 
          stateequationconstants: EamScrenedData, 
        };
        return updatedState; 
      });
    }

    setEamScreenedData(newEamScreened);
  }

  const HandleRepulse = () =>{
    const repulse = {
      "b":"",
      "rc":"",
      "alpha":"",
      "dr":""
    }
    return repulse
  }

  const[RepulseData, setRepulseData] = useState({
    "b":"",
    "rc":"",
    "alpha":"",
    "dr":""
  })

  const HandleRepulseChange = (atom, equation, constant, value, idx) =>{
    setRepulseData((prev)=>(
      {...prev,[constant]:value}
    ))

    if (
      stateEquationsArray?.[atom]?.[idx]?.equation === equation &&
      stateEquationsArray?.[atom]?.[idx]?.type === "repulse"
    ) {
      setStateEquationsArray((prevState) => {
        const updatedState = { ...prevState };
        updatedState[atom] = Array.isArray(prevState[atom])
          ? [...prevState[atom]]
          : [];
        updatedState[atom][idx] = {
          ...updatedState[atom][idx], 
          stateequationconstants: RepulseData, 
        };
        return updatedState; 
      });
    }
  }


  const HandleRose = () =>{
    const rose = {
      "b":"",
      "rc":"",
      "alpha":"",
      "delta":"",
      "dr":""
    }
    return rose
  }

  const [RoseData, setRoseData] = useState({
      "b":"",
      "rc":"",
      "alpha":"",
      "delta":"",
      "dr":""
  })

  const HandleRoseChange = (atom, equation, constant, value, idx) =>{
    setRoseData((prev)=>(
      {...prev,[constant]:value}
    ))

    if (
      stateEquationsArray?.[atom]?.[idx]?.equation === equation &&
      stateEquationsArray?.[atom]?.[idx]?.type === "rose"
    ) {
      setStateEquationsArray((prevState) => {
        const updatedState = { ...prevState };
        updatedState[atom] = Array.isArray(prevState[atom])
          ? [...prevState[atom]]
          : [];
        updatedState[atom][idx] = {
          ...updatedState[atom][idx], 
          stateequationconstants: RoseData, 
        };
        return updatedState; 
      });
    }
  }

  const HandleRosescreened = () =>{
   const rosescreened = {
      "ec":"",
      "re":"",
      "rc":"",
      "alpha":"",
      "delta":"",
      "dr":""
    }
    return rosescreened
  }

  const [RoseScreenedData, setRoseScreenedData] = useState({
    "ec":"",
    "re":"",
    "rc":"",
    "alpha":"",
    "delta":"",
    "dr":""
  })
  const HandleRosescreenedChange = (atom, equation, constant, value, idx) =>{
    setRoseScreenedData((prev)=>(
      {...prev,[constant]:value}
    ))

    if (
      stateEquationsArray?.[atom]?.[idx]?.equation === equation &&
      stateEquationsArray?.[atom]?.[idx]?.type === "rosescreened"
    ) {
      setStateEquationsArray((prevState) => {
        const updatedState = { ...prevState };
        updatedState[atom] = Array.isArray(prevState[atom])
          ? [...prevState[atom]]
          : [];
        updatedState[atom][idx] = {
          ...updatedState[atom][idx], 
          stateequationconstants: RoseScreenedData, 
        };
        return updatedState; 
      });
    }
  }

  const HandleSpinbiquadratic = () =>{
    const spinbiquadratic = {
      "aJ":"",
      "bJ":"",
      "dJ":"",
      "aK":"",
      "bK":"",
      "rc":"",
      "dr":""
    }
    return spinbiquadratic
  }


  const [SpinBiquadraticData, setSpinBiquadraticData] = useState({
    "aJ":"",
    "bJ":"",
    "dJ":"",
    "aK":"",
    "bK":"",
    "rc":"",
    "dr":""
  })

  const HandleSpinbiquadraticChange = (atom, equation, constant, value, idx) =>{
    setSpinBiquadraticData((prev)=>({...prev, [constant]:value}))

    if (
      stateEquationsArray?.[atom]?.[idx]?.equation === equation &&
      stateEquationsArray?.[atom]?.[idx]?.type === "spinbiquadratic"
    ) {
      setStateEquationsArray((prevState) => {
        const updatedState = { ...prevState };
        updatedState[atom] = Array.isArray(prevState[atom])
          ? [...prevState[atom]]
          : [];
        updatedState[atom][idx] = {
          ...updatedState[atom][idx], 
          stateequationconstants: SpinBiquadraticData, 
        };
        return updatedState; 
      });
    }
  }

  const HandleSpinj = () =>{
    const spinJ = {
      "a":"",
      "re":"",
      "rc":"",
      "b":"",
      "dr":""
    }
    return spinJ
  }

  const [SpinJData, setSpinJData] = useState({ 
    "a":"",
    "re":"",
    "rc":"",
    "b":"",
    "dr":""})

  const HandleSpinJChange = (atom, equation, constant, value, idx) =>{
    setSpinJData((prev)=>({...prev, [constant]:value}))

    if (
      stateEquationsArray?.[atom]?.[idx]?.equation === equation &&
      stateEquationsArray?.[atom]?.[idx]?.type === "spinj"
    ) {
      setStateEquationsArray((prevState) => {
        const updatedState = { ...prevState };
        updatedState[atom] = Array.isArray(prevState[atom])
          ? [...prevState[atom]]
          : [];
        updatedState[atom][idx] = {
          ...updatedState[atom][idx], 
          stateequationconstants: SpinJData, 
        };
        return updatedState; 
      });
    }
  }



  const HandleSpinjscreened = () =>{
    const spinjscreened = {
      "a":"",
      "re":"",
      "rc":"",
      "b":"",
      "dr":""
    } 
    return spinjscreened
  }

  const [SpinJScreenedData, setSpinJScreenedData] = useState({
    "a":"",
    "re":"",
    "rc":"",
    "b":"",
    "dr":""
  })

  const HandleSpinJScreenedChange = (atom, equation, constant, value, idx) =>{
    setSpinJScreenedData((prev)=>({...prev, [constant]:value}))

    if (
      stateEquationsArray?.[atom]?.[idx]?.equation === equation &&
      stateEquationsArray?.[atom]?.[idx]?.type === "spinjscreened"
    ) {
      setStateEquationsArray((prevState) => {
        const updatedState = { ...prevState };
        updatedState[atom] = Array.isArray(prevState[atom])
          ? [...prevState[atom]]
          : [];
        updatedState[atom][idx] = {
          ...updatedState[atom][idx], 
          stateequationconstants: SpinJScreenedData, 
        };
        return updatedState; 
      });
    }
    
  }


  const HandleZbl = () =>{
    const Zbl = {
      "zi":"",
      "zj":"",
      "rc":"",
      "dr":""
    }
    return Zbl
  }

  const [ZblData, setZblData] = useState({
    "zi":"",
    "zj":"",
    "rc":"",
    "dr":""
  })

  const HandleZblChange = (atom, equation, constant, value, idx) =>{
    setZblData((prev)=>({...prev, [constant]:value}))
  }

  const [stateEquationsPerElement, setStateEquationsPerElement] = useState({});
  const [stateEquationsArray, setStateEquationsArray] = useState({});
  const [stateEquationConstants, setStateEquationConstants] = useState({})


  const handleStateEquationsPerElement = (num, atom) => {
    const count = Number(num);
    setStateEquationsPerElement((prev) => ({ ...prev, [atom]: count }));
    setStateEquationsArray((prev) => ({
      ...prev,
      [atom]: Array(count).fill(""),
    }));
  };

  const HandleStateEquationsPerElementChange = (equation, atom, idx) => {
    setStateEquationsArray((prev) => {
      const updatedArray = [...(prev[atom] || [])];
      updatedArray[idx] = {equation};

      return { ...prev, [atom]: updatedArray };
    });
  };

  const HandleEquationTypeChange = (type, atom, idx) =>{
    setStateEquationsArray((prev) => {
      const updatedArray = [...(prev[atom] || [])];
      updatedArray[idx] = {...prev[atom][idx],type};
      return { ...prev, [atom]: updatedArray };
    
    });
  }

   const [stateequationconstants, setstateequationconstants] = useState()
  const HandleStateEquationConstants = (constant, value, atom,index, idx) =>{

    setstateequationconstants((prev)=>(
      {...prev, [constant]:{[index]:value}} 
    ))


    if (
      stateEquationsArray?.[atom]?.[idx]?.equation === equation &&
      stateEquationsArray?.[atom]?.[idx]?.type === "zbl"
    ) {
      setStateEquationsArray((prevState) => {
        const updatedState = { ...prevState };
        updatedState[atom] = Array.isArray(prevState[atom])
          ? [...prevState[atom]]
          : [];
        updatedState[atom][idx] = {
          ...updatedState[atom][idx], 
          stateequationconstants: ZblData, 
        };
        return updatedState; 
      });
    }

    };

const StateEquations = useMemo(()=>({
  Covalent,
  EamScrenedData,
  RepulseData,
  RoseData,
  RoseScreenedData,
  SpinJData,
  SpinBiquadraticData,
  SpinJScreenedData,
  ZblData
}),[ Covalent,
  EamScrenedData,
  RepulseData,
  RoseData,
  RoseScreenedData,
  SpinJData,
  SpinBiquadraticData,
  SpinJScreenedData,
  ZblData])

// const StateEquationsData = {
//   stateEquationsArray
// }

const dispatch = useDispatch();

useEffect(()=>{
dispatch(setStateEquations(stateEquationsArray))

},[stateEquationsArray, dispatch ])

const data = useSelector((state)=>state.data.stateequations)
console.log(data)
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        State Equations
      </h1>
      <div className="space-y-8">
        {atoms.map((atom, index) => (
          <div key={index} className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0">
              <label
                htmlFor={`state-equations-${atom}`}
                className="font-medium text-gray-700 sm:w-1/3"
              >
                State Equations for {atom}:
              </label>
              <input
                type="number"
                id={`state-equations-${atom}`}
                className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter number of equations"
                onChange={(e) =>
                  handleStateEquationsPerElement(e.target.value, atom)
                }
              />
            </div>

            {stateEquationsArray[atom]?.length > 0 && (
              <div className="space-y-4">
                {stateEquationsArray[atom]?.map((eq, idx) => (
                  <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div>
                      <label
                        htmlFor={`equation-${atom}-${idx}`}
                        className="block font-medium text-gray-600"
                      >
                        Equation {idx + 1} for {atom}:
                      </label>
                      <input
                        type="text"
                        id={`equation-${atom}-${idx}`}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder={`Enter equation ${idx + 1}`}
                        onChange={(e) =>
                          HandleStateEquationsPerElementChange(
                            e.target.value,
                            atom,
                            idx
                          )
                        }
                      />
                    </div>
                    <div>
                      {eq.equation?.split("_").length === 1 ? (
                        <div>
                          <label
                            htmlFor={`option-${atom}-${idx}`}
                            className="block font-medium text-gray-600"
                          >
                            Select Option:
                          </label>
                          <select
                            id={`option-${atom}-${idx}`}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={(e)=>HandleEquationTypeChange(e.target.value, atom, idx)}
                          >
                            <option value="">Select an option</option>
                            <option value="eshift">eshift</option>
                            <option value="zero">zero</option>
                          </select>
                        </div>
                      ) : eq.equation?.split("_").length === 2 ? (
                        <div>
                          <label
                            htmlFor={`state-equation-${atom}-${idx}`}
                            className="block font-medium text-gray-600"
                          >
                            Select State Equation:
                          </label>
                          <select
                            id={`state-equation-${atom}-${idx}`}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={(e)=>HandleEquationTypeChange(e.target.value, atom, idx)}
                          >
                            <option value="">Select an option</option>
                            {stateEquations.map((stateEquation, optionIdx) => (
                              <option key={optionIdx} value={stateEquation}>
                                {stateEquation}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : null}
                    </div>
                    <div className="flex flex-col gap-4 p-4 bg-gray-50 rounded-md shadow-md">
  {eq.type === "covalent" ? (
    Object.keys(HandleCovalent(eq.equation?.split("_").length)).map((covalent) => {
      return (
        <div key={covalent} className="flex flex-col gap-4 border-b border-gray-300 pb-4">
          <label className="font-semibold text-gray-700 text-lg">
            {covalent}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {HandleCovalent(eq.equation?.split("_").length)[covalent].map((constant, index) => {
              return (
                <div key={index} className="flex flex-col gap-1">
                  <input
                    className="h-10 w-full px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={constant}
                    onChange={(e)=>{HandleCovalentChange(atom, eq.equation, covalent,e.target.value,index, idx)}}
                  />
                </div>
              );
            })}
          </div>
        </div>
      );
    })
  ) : eq.type === "eamscreened" ? (
    (
      Object.keys(HandleEamscreened(eq.equation?.split("_").length)).map((eamscreened) => {
        return (
          <div key={eamscreened} className="flex flex-col gap-4 border-b border-gray-300 pb-4">
            <label className="font-semibold text-gray-700 text-lg">
              {eamscreened}
            </label>
            {
              eamscreened === "lat" ?
              <select  onChange={(e)=>HandleEamScreenedChange(atom, eq.equation, eamscreened, e.target.value, index, idx )}>
                <option value={""}>Select an option</option>
                {
                  HandleEamscreened(eq.equation?.split("_").length)[eamscreened].map((constant, index)=>{
                    return(
                    <option value={constant}>
                      {constant}
                    </option>
                    )
                  })
                }
              </select>: 
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {HandleEamscreened(eq.equation?.split("_").length)[eamscreened].map((constant, index) => {
                return(
                  <div key={index} className="flex flex-col gap-1">
                    <input
                    onChange={(e)=>HandleEamScreenedChange(atom, eq.equation, eamscreened, e.target.value, index, idx)}
                      className="h-10 w-full px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={constant}
                    />
                  </div>
                )
              })}
            </div>
            }
           
          </div>
        );
      })
    )
  ): eq.type === "eshift" ? (
    <div>
    <label className="font-semibold text-gray-700 text-lg">
    eshift
  </label>
  <input
  className="h-10 w-full px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  placeholder={"eshift"}/>
  </div>

    ) : eq.type === "repulse" ? (
      Object.keys(HandleRepulse(eq.equation?.split("_").length)).map((repulse) => {
        return (
          <div key={repulse} className="flex flex-col gap-4 border-b border-gray-300 pb-4">
            <label className="font-semibold text-gray-700 text-lg">
              {repulse}
            </label>
                    <input
                      onChange={(e)=>HandleRepulseChange(atom, eq.equation, repulse, e.target.value, idx)}
                      className="h-10 w-full px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={repulse}
                    />
            </div>
        );
      })
    ): eq.type === "rose" ? (
      Object.keys(HandleRose(eq.equation?.split("_").length)).map((rose) => {
        return (
          <div key={rose} className="flex flex-col gap-4 border-b border-gray-300 pb-4">
            <label className="font-semibold text-gray-700 text-lg">
              {rose}
            </label>
                    <input
                    onChange={(e)=>HandleRoseChange(atom, eq.equation, rose, e.target.value, idx)}
                      className="h-10 w-full px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={rose}
                    />
            </div>
        );
      })
    ): eq.type === "rosescreened" ? (
      Object.keys(HandleRosescreened(eq.equation?.split("_").length)).map((rosescreened) => {
        return (
          <div key={rosescreened} className="flex flex-col gap-4 border-b border-gray-300 pb-4">
            <label className="font-semibold text-gray-700 text-lg">
              {rosescreened}
            </label>
                    <input
                    onChange={(e)=>HandleRosescreenedChange(atom, eq.equation, rosescreened, e.target.value, idx)}
                      className="h-10 w-full px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={rosescreened}
                    />
            </div>
        );
      })
    ):eq.type === "spinbiquadratic" ? (
      Object.keys(HandleSpinbiquadratic(eq.equation?.split("_").length)).map((spinbiquadratic) => {
        return (
          <div key={spinbiquadratic} className="flex flex-col gap-4 border-b border-gray-300 pb-4">
            <label className="font-semibold text-gray-700 text-lg">
              {spinbiquadratic}
            </label>
                    <input
                    onChange={(e)=>HandleSpinbiquadraticChange(atom, eq.equation, spinbiquadratic, e.target.value, idx)}
                      className="h-10 w-full px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={spinbiquadratic}
                    />
            </div>
        );
      })
    ):eq.type === "spinj" ? (
      Object.keys(HandleSpinj(eq.equation?.split("_").length)).map((spinj) => {
        return (
          <div key={spinj} className="flex flex-col gap-4 border-b border-gray-300 pb-4">
            <label className="font-semibold text-gray-700 text-lg">
              {spinj}
            </label>
                    <input
                    onChange={(e)=>HandleSpinJChange(atom, eq.equation, spinj, e.target.value, idx)}
                      className="h-10 w-full px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={spinj}
                    />
            </div>
        );
      })
    ):eq.type === "spinjscreened" ? (
      Object.keys(HandleSpinjscreened(eq.equation?.split("_").length)).map((spinjscreened) => {
        return (
          <div key={spinjscreened} className="flex flex-col gap-4 border-b border-gray-300 pb-4">
            <label className="font-semibold text-gray-700 text-lg">
              {spinjscreened}
            </label>
                    <input
                    onChange={(e)=>HandleSpinJScreenedChange(atom, eq.equation, spinjscreened, e.target.value, idx)}
                      className="h-10 w-full px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={spinjscreened}
                    />
            </div>
        );
      })
    ):eq.type === "zbl" ? (
      Object.keys(HandleZbl(eq.equation?.split("_").length)).map((zbl) => {
        return (
          <div key={zbl} className="flex flex-col gap-4 border-b border-gray-300 pb-4">
            <label className="font-semibold text-gray-700 text-lg">
              {zbl}
            </label>
                    <input
                      onChange={(e)=>HandleZblChange(atom, eq.equation, zbl, e.target.value, idx)}
                      className="h-10 w-full px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={zbl}
                    />
            </div>
        );
      })
    ):("")}
</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StateEquations;
