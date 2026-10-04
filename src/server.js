const express= require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const connectDB = require("./config/db");
const authRoutes=require("./routes/authRoutes");
const taskRoutes=require("./routes/taskRoutes");
dotenv.config();

const app=express();


app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/",(req,res)=>{
    res.json({
        message:"Task Management"
    })
});



connectDB();



const port=process.env.PORT;
app.listen(port,()=>{
console.log(`App is listening to the ${port}`);

})


