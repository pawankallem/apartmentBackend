
const Flat=require("../models/FlatModel");
const Manager=require("../models/ManagerModel");

const getFlat=async ( req,res)=>{
    const manager=await Manager.findOne({email:req.user.email},
        (err)=>{
            if(err){
                console.log(err)
            }
        })

        const managerId=manager._id;
        const {sort,filter,search}=req.query;

        const page=parseInt(req.query.page);
        const limit=parseInt(req.query.limit);

        let sortBy=sort==="asc"?1:sort==="desc"?-1:0;

        const flatsCount=await Flat.countDocuments({
            managerId:managerId,
            flatType:{$regex:filter},
            block:{$regex:search}
        },(err)=>{
            if(err){
                console.log(err);
            }
        });

        const finalPage=flatsCount/limit;

        try {

            const results=await Flat.find({
                managerId:managerId,
            flatType:{$regex:filter},
            block:{$regex:search}
            })
            .sort({flatNo:sortBy})
            .skip((page-1)*limit)
            .limit(limit)

            return res.send({data:results,currentPage:page,finalPage});

            
        } catch (error) {
            console.log(err);
            return res.send("Something went wrong");
        }

}

const createFlat=async (req,res)=>{
    const {email} = req.user;
    const {avatar,flatType,block,flatNo}=req.body;
    const manager=await Manager.findOne({email});
    const flat=new Flat({
        managerId:manager["_id"],
        avatar,
        flatType,
        block,
        flatNo
    });
    const savedFlat=await flat.save();
    console.log(savedFlat);
    return res.send(savedFlat);

}

module.exports={getFlat,createFlat};

