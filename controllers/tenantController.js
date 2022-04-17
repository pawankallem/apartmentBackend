const Tenant=require("../models/TenantModel");

const getTenant=async (req,res)=>{
    const {flatId}=req.body;
    try {
        const tenant=await Tenant.find({flatId},(err)=>{
            if(err){
                console.log(err);
            }
            return err;
        })
        return res.send(tenant);

    } catch (error) {
          console.log(error);
        return res.send('Something went wrong');
    }
};

const createTenant=async (req,res)=>{
    try {
        const {flatId,name,gender,age}=req.body;
        const tenant=new Tenant({
            flatId,
            name,
            gender,
            age
        });
        const saveTenant=await tenant.save();
        return res.send(saveTenant);
        
    } catch (error) {
        console.log(error);
      return res.send('Something went wrong');
  }
};

const updateTenant=async (req,res)=>{
    try {

        const {tenantId,name,gender,age}=req.body;

        let tenant=await Tenant.findOne({_id:tenantId},(err)=>{
            if(err){
                console.log(err);
            }
            return err;
        })

        tenant.name=name;
        tenant.gender=gender;
        tenant.age=age;

        const saveTenant=await tenant.save();
        return res.send(saveTenant);
        
    } catch (error) {
        console.log(error);
      return res.send('Something went wrong');
  }
};

const deleteTenant=async (req,res)=>{
    try {

        const {tenantId}=req.body;

        await Tenant.findOneAndDelete({_id:tenantId},(err)=>{
            if(err){
                console.log(err);
                
            }
            return err;
        })

        return res.send("Deleted Successfully")
        
    } catch (error) {
        console.log(error);
      return res.send('Something went wrong');
  }
};

module.exports={getTenant,createTenant,updateTenant,deleteTenant};