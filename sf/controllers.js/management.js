const User = require("../database/UserModel")
const encryptions = require("../utils/encryptions")
const infoModel = require("../database/staffsInfoModel")
module.exports = {
    staffs: async (req, res) => {
        const staffs = await User.find({})
        res.status(200).json({ msg: "this are the staffs records", data: staffs })
    },
    add: async (req, res) => {
        const { email, password, idNum, role } = req.body;
        if (!email || !password || !idNum)
            return res.json({ status: 401, msg: "required id, email and password" });
        const user = await User.findOne({ email });
        if (user)
            return res.json({ status: 401, msg: "user already exist" })
        const hashedPassword = await encryptions.hashPassword(password);
        if (!hashedPassword)
            return res.json({ status: 401, msg: "something went wrong" })
        const newUser = new User({
            idNum,
            email,
            password: hashedPassword,
            role
        });

        const registeredUser = await newUser.save();
        if (!registeredUser)
            return res.json({ status: 501, msg: "something went wrong" })
        res.json({ status: 201, msg: "user is created" });
    },
    addInfo: async (req, res) => {
        const {
            idNum,
            img,
            name,
            address,
            phone } = req.body;
        if (!idNum || !img || !name || !address || !phone)
            return res.status(401).json({ msg: "incomplete data information" })
        const isAddedInfo = await infoModel.findOne({idNum})
        if(isAddedInfo)
            return res.status(200).json({msg:"staff information is already exist, do update instead"})
        const newInfo = new infoModel({
            idNum,
            img,
            name,
            address,
            phone
        })
        const savedinfo = await newInfo.save()
        if (!savedinfo)
            return res.json({ status: 501, msg: "something went wrong" })
        res.json({ status: 201, msg: "staff information added succefully" });
    },
    remove: async (req, res) => {
        const {idnum } = req.params
        const user = await User.findOne({ email:idnum })
        if(!user)
            return res.status(200).json({msg:"action can't be completed, user does not exist"})
        const deletedUser = await User.findOneAndDelete({email:idnum})
        console.log(deletedUser)
        res.status(200).json({data:deletedUser})
    },
    modify: (req, res) => {

    },
    search: async(req, res) => {
        const searchKey = req.body.searchkey
        const searchFound = await User.find({
            $or: [
                { email: searchKey },
                { idNum: searchKey  },
                {role: searchKey}
            ]
        })

        res.status(200).json({msg:'this is the result', data:searchFound})

    }
}