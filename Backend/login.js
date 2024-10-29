const {Router}=require('express')
const router=Router()
const controller=require('./dbcontrol')
 
router.post('/',controller.validate)
module.exports=router
 