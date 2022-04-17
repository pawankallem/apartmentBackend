
const express=require("express");
const authToken=require("../controllers/authToken");
const router=express.Router();
const {getTenant,createTenant,updateTenant,deleteTenant}=require("../controllers/tenantController");

router.get("/get",authToken,getTenant);
router.post("/get",authToken,createTenant);
router.put("/get",authToken,updateTenant);
router.delete("/get",authToken,deleteTenant);

module.exports=router;