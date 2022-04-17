
const express=require("express");
const authToken=require("../controllers/authToken");
const router=express.Router();
const {getFlat,createFlat}=require("../controllers/flatController");

router.get("/get",authToken,getFlat);
router.post("/createFlat",authToken,createFlat);

module.exports=router;