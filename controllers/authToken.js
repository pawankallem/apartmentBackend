
const jwt=require("jsonwebtoken");

const authenticateToken=(req,res,next)=>{
    const authHeader=req.headers["authorization"];
    const token=authHeader && authHeader.split(" ")[1];
    if(!token){
        return res.send("Bad request");
    }
    jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
        if(err){
            return res.send(err);
        }
        req.user=user;
        next();
    })
}

module.exports=authenticateToken;