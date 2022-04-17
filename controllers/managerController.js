
const Manager=require("../models/ManagerModel");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
const {signup,login} = require("./authValidation")

dotenv.config();

const registerManager=async (req,res)=>{
    // console.log("inside reg of manager coming")
    let err=await signup.validate(req.body)
    .catch((err)=>{
        return err;
    });

    if(err.errors){
        return res.send(err.errors[0]);
    }
    try {
        const {firstName,lastName,email,password,avatar,gender,age}=req.body;

        const exists=await Manager.find({email});

        if(exists.length){
            return res.send(`${email} email id already in use`);
        }

        const hash=await bcrypt.hash(password,await bcrypt.genSalt(10));

        const manager=new Manager({
            firstName,
            lastName,
            email,
            password:hash,
            avatar,
            gender,
            age
        })

        const saveData=await manager.save();

        const token={email:saveData.email};

        const accessToken=await jwt.sign(token,process.env.SECRET_KEY);
        return res.send({accessToken:accessToken});
        
    } catch (error) {
        console.log(error);
        return res.send(error)
    }

};

const loginManager=async(req,res)=>{
    let err=await login.validate(req.body)
    .catch((err)=>{
        return err;
    });

    if(err.errors){
        return res.send(err.errors[0]);
    }

    try {

        const {email} = req.body;
        let manager=await Manager.findOne({email});
        if(!manager){
            return res.send("Email not found");
        }
        const check=await bcrypt.compare(req.body.password,manager.password);
        if(!check){
            return res.send("invalid password");
        }

        const token={email:manager.email};

        const accessToken= await jwt.sign(token,process.env.SECRET_KEY);
        return res.send({accessToken:accessToken});


        
    } catch (error) {

        console.log(error);
        return res.send(error)
        
    }
}

module.exports={registerManager,loginManager}

