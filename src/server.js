import express from "express"
import connectDB  from "./db/db.js";
import dotenv from "dotenv"
import authrouter from "./routes/authRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
const app=express();
dotenv.config();


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req,res)=>{
    res.send("all ok").status(200);
})


connectDB()
.then(()=>{
   console.log("connected")
})
.catch(()=>{
    console.log("not connected")
});

app.use("/api/auth", authrouter);
app.use("/api/blogs", blogRouter);

app.listen(process.env.PORT, ()=>{
    console.log("running server")
})