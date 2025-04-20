import express from "express"
import cors from "cors"
import { Route } from "./routes/route.js";

const app = express();
app.use(cors({
  origin: ['https://mlrann.netlify.app','http://localhost:5173'],
  credentials: true
}))
app.use(express.json())

app.use(Route)
const PORT =5000;
app.listen(PORT,()=>{
    console.log(`Server Running on PORT ${PORT}`)
})
