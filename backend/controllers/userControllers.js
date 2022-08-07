const User = require('../models/userModel');

const loginUser = async (req, res) => {
    const { name, email, mobile } = req.body;

    if(name === "admin" && email === "admin@admin.com" && mobile === "0000000000"){
        const user = await User.findOne({ name });
        if(user){
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                loginTime: user.createdAt
            })
            return;
        }
    }

    const nameExists = await User.findOne({ name });
    const emailExists = await User.findOne({ email });
    const mobileExists = await User.findOne({ mobile });

    if (nameExists || emailExists || mobileExists) {
        res.status(400).send("User already exists");
        return
    }

    const user = await User.create({
        name, email, mobile
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            loginTime: user.createdAt
        });
    } else {
        res.status(400)
        throw new Error("Something went wrong");
    }
};

module.exports = { loginUser }
