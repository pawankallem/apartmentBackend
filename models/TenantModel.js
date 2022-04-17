
const mongoose=require("mongoose");

const tenantSchema=new mongoose.Schema({
    flatId:{
        type:mongoose.ObjectId,
        required:true
    },
    name:{type:String,required:true},
    gender:{type:String},
    age:{type:Number}
},{
    versionKey:false,
    timestamps:true
})

module.exports=mongoose.model("Tenant",tenantSchema)