
const express=require("express");
const connect=require ("./config/db");
// const mongoose=require("mongoose");
const cors=require("cors");
const dotenv=require("dotenv");
dotenv.config();

const authRoute=require("./routes/authRoute");
const flatRoute=require("./routes/flatRoute");
const tenantRoute=require("./routes/tenantRoute");

const app=express()

app.use(cors());
app.use(express.json());

app.use("/api/manager",authRoute);
app.use("/api/flats",flatRoute);
app.use("/api/tenants",tenantRoute);


const port=1234;
app.listen(port,async()=>{
    try {
        await connect();
        console.log(`Listening to port ${port}`)
    } catch (error) {
        console.log(error.message)
    }
})
