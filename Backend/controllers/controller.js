import fs from "fs"
import { fileURLToPath, pathToFileURL } from "url";
import path from "path"
export const GenerateScripts = (req,res) =>{
try {
    const {elements, mass} = req.body;
    var scriptContent = ""
    scriptContent+="atomtypes:\n"
    elements.forEach((elem, index) =>{
        scriptContent+=elem
        scriptContent+=" "
    });

    scriptContent+="\n"

    // elements.forEach((elem, index)=>{
    //     scriptContent+=`mass:${elem}:\n${mass[index]}\n`
    // })
    for (let key in mass){
        if(mass.hasOwnProperty(key)){
            console.log(key, mass[key])
        }
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