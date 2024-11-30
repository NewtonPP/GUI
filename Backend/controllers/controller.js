import fs from "fs"
import { fileURLToPath, pathToFileURL } from "url";
import path from "path"


export const GenerateScripts = (req,res) =>{
try {
    const {atoms, atomicMasses,} = req.body.atomtypes;
    const {fingerprintsPerElement, fingerprintsArray} = req.body.fingerprintsperelement
    const {networklayers} = req.body;
    const {calibrationparameters} = req.body
    const {activationfunctions} = req.body

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
    console.log('Error in the GenerateScripts',error)
}
}