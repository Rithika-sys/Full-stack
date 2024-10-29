const {Router}=require('express')
const router=Router()
const controller=require('./dbcontrol')
 
router.post('/',controller.insertRecord)
module.exports=router;
