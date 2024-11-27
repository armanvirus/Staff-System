const express = require("express")
const router = express.Router();
const isAuth = require("../middlewares/isAuths")
const isAllowed = require("../middlewares/isAllowed")
const {
    staffs,
    add,
    addInfo,
    remove,
    modify,
    search,
    } = require('../controllers.js/management')

// define the routes 
router.get('/get/staffs', [isAuth, isAllowed], staffs)
router.post('/add/staffs',[isAuth, isAllowed], add)
router.post('/add/staffs/info',[isAuth, isAllowed], addInfo)
router.get('/delete/staff/:idnum', remove)
router.put('/update/staff',modify)
router.post('/search/staff', search)

module.exports = router;