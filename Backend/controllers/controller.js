import fs from "fs"
import { fileURLToPath, pathToFileURL } from "url";
import path from "path"


export const GenerateScripts = (req,res) =>{
try {
    const {atoms, atomicMasses,} = req.body.atomtypes;
    const {fingerprintsPerElement, fingerprintsArray} = req.body.fingerprintsperelement
    const {screening} = req.body
    const {networklayers} = req.body;
    const {calibrationparameters} = req.body
    const {activationfunctions} = req.body
    const{stateequations} = req.body


    var scriptContent = ""
    scriptContent+="atomtypes:\n"
    atoms.forEach((atom, index) =>{
        scriptContent+=atom
        scriptContent+=" "
    });

    scriptContent+="\n"

    for (let key in atomicMasses){
        if(atomicMasses.hasOwnProperty(key)){
            scriptContent+=`mass:${key}:\n${atomicMasses[key]}\n`   
        }
    }

    for(let key in fingerprintsPerElement){
        scriptContent+=`fingerprintsperelement:${key}:\n`
        scriptContent+=`${fingerprintsPerElement[key]}\n`
    }



   for (let elem in fingerprintsArray){
        fingerprintsArray[elem].forEach((fingerprintObj)=>{
           const {fingerprint, fingerprinttype} = fingerprintObj
            scriptContent+=`fingerprints:${fingerprint}:\n`
            scriptContent+=`${fingerprinttype}\n`
        })
   }

   for (let elem in fingerprintsArray){
        fingerprintsArray[elem].forEach((fingerprintObj)=>{
            const {fingerprint,fingerprinttype, params} = fingerprintObj
            for (let key in params){
                if(key === "re")
                {
                    scriptContent+=`fingerprintconstants:${fingerprint}:${fingerprinttype}:${key}\n`
                    scriptContent+=`${params[key]}\n`
                }
                else if(key === "rc")
                    {
                        scriptContent+=`fingerprintconstants:${fingerprint}:${fingerprinttype}:${key}\n`
                    scriptContent+=`${params[key]}\n`
                    }
                    else if(key === "dr")
                        {
                            scriptContent+=`fingerprintconstants:${fingerprint}:${fingerprinttype}:${key}\n`
                        scriptContent+=`${params[key]}\n`
                        }
                        else if(key === "o")
                            {
                                scriptContent+=`fingerprintconstants:${fingerprint}:${fingerprinttype}:${key}\n`
                            scriptContent+=`${params[key]}\n`
                            }

                            else if(key === "n")
                                {
                                    scriptContent+=`fingerprintconstants:${fingerprint}:${fingerprinttype}:${key}\n`
                                scriptContent+=`${params[key]}\n`
                                }

                                else if(key === "m")
                                    {
                                        scriptContent+=`fingerprintconstants:${fingerprint}:${fingerprinttype}:${key}\n`
                                    scriptContent+=`${params[key]}\n`
                                    }
                else if(key === "alpha"){
                    scriptContent+=`fingerprintconstants:${fingerprint}:${fingerprinttype}:${key}\n`
                        params[key].forEach((alpha)=>{
                            scriptContent+=alpha
                            scriptContent+=" "
                        })
                        scriptContent+="\n"
                }
                else if (key === "alphak"){
                    scriptContent+=`fingerprintconstants:${fingerprint}:${fingerprinttype}:${key}\n`
                    params[key].forEach((alphak)=>{
                        scriptContent+=alphak
                        scriptContent+=" "
                    })
                    scriptContent+="\n"
                }
                }
           
        })
   }
    

   for (let key in screening){
    for ( let c in screening[key]){
            scriptContent+=`screening:${key}:${c}:\n`
            scriptContent+=`${screening[key][c]}\n`
    }
   }

    for (let key in networklayers){
        scriptContent+=`networklayers:${key}:\n`
        scriptContent+=`${networklayers[key].length}\n`
    }

    for (let key in networklayers){
       for (let i = 0; i<networklayers[key].length; i++){
        scriptContent+=`layersize:${key}:${i}:\n`
        scriptContent+=`${networklayers[key][i]}\n`
       }   
    }

    for (let key in activationfunctions){
        for (let i = 0; i<activationfunctions[key].length-1; i++){
            scriptContent+=`activationfunctions:${key}:${i}:\n`
            scriptContent+=`${activationfunctions[key][i]}\n`
        }
    }

    
    for (let key in stateequations){
        stateequations[key].forEach((eq)=>{
          scriptContent+=`stateequations:${eq.equation}:\n`
          scriptContent+=`${eq.type}\n`
        })


        stateequations[key].forEach((eq)=>{
            for (let constantKey in eq.stateequationconstants){
    
               scriptContent+=`stateequationconstants:${eq.equation}:${eq.type}:${constantKey}:\n`
               if(Array.isArray(eq.stateequationconstants[constantKey])){
                eq.stateequationconstants[constantKey].forEach((arr)=>{
                    scriptContent+=`${arr} `
                })
                scriptContent+="\n"
               }
               else{
                scriptContent+=`${eq.stateequationconstants[constantKey]}\n`
               }
            }
        })
    }


    //For Calibration Parameters
    for (let key in calibrationparameters){
        scriptContent+=`calibrationparameters:${key}:\n`
        scriptContent+=`${calibrationparameters[key]}\n`
    }

    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    const filename = `generatescripts_${Date.now()}.nn`
    const filepath = path.join(__dirname,"scripts", filename)

     if(!fs.existsSync(path.join(__dirname,"scripts"))){
        fs.mkdirSync(path.join(__dirname, "scripts"))
     }
        fs.writeFile(filepath,scriptContent,(err)=>{
            if(err) {
            console.log('Error while generating the script')
        }
        else{
            res.status(200).json({message:"Success"})
        }
    }
        )

} catch (error) {
    res.status(400).json({error:error})
    console.log('Error in the GenerateScripts',error)
}
}