import express from "express"
import { userModel } from "../model/User.js";

export const usersRouter = express.Router();

usersRouter.post("/signup", async (req, res) => {
    const { name, email, phone, password } = req.body;
    console.log(phone);
    const userExist = await userModel.findOne({ $or: [{ email }, { phone }] });
    if (userExist) {
        res.status(403).json({ msg: "User already exist" })
    }
    else {
        try {
            const user = new userModel({ name, email, phone, password });
            const savedUser = await user.save();
            res.status(201).json({ msg: "user Registered successfully, please try to login now" });
        }
        catch (e) {
            res.status(500).json({ msg: `server error - ${e}` });
        }
    }
});

usersRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email },{__v:0});

    if (user == null) {
        res.status(400).json({ msg: "user not exist, Please register user by clicking signup link" })
    }
    else if (user.password != password) {
        res.status(400).json({ msg: "Entered wrong password" });
    }
    else {
        const userObj = user.toObject();
        res.status(200).json({ msg: "User logged in successfully", userObj });
    }
})

