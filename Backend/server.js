import fs from "fs"
import express from "express"
import cors from "cors"
import { Route } from "./routes/route.js";

const app = express();
app.use(express.json())
app.use(cors())
app.use(Route)
const PORT =5000;
app.listen(PORT,()=>{
    console.log(`Server Running on PORT ${PORT}`)
})
