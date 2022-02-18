const AuthSchema = require("../models/Auth");
const { success,error,info } = require("consola");
const bcrypt = require("bcryptjs");
const JWT_COOKIE_EXPIRE= require("../config")
/*
@Access public
@http request post
@URL api/auth/signup
*/

exports.Signup = async (req, res) => {
    try {
        let { username, email, password, role } = req.body;
        let payload = new AuthSchema({
          username,
          email,
          password,
          role,
        });
        let user = await AuthSchema.create(payload);
        sendTokenResponse(user, 201, res);
       
        
    } catch (err) {
        error(err);
        res.status(501).json({ message: "server error" })

    }
};

exports.Signin =async(req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(501).json({ message: "Email and Password is required" })
        
        }
        let user = await AuthSchema.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({message:"EMAIL NOT EXIST"})
        }

        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "password not matched" });
        }
        
        sendTokenResponse(user, 201, res);
       
    } catch (err) {
        return res.status(501).json({ message: "SERVER ERROR" });
    }
};

function sendTokenResponse(user, statusCode, res) {
    let token = user.getJWTtoken();
    const options = {
        expires: new Date(Date.now() + JWT_COOKIE_EXPIRE * 24 * 60 * 60
            * 1000), httpOnly:true,
    };

    res.status(statusCode).cookie("token", token, options).json({ message: "successfully stored", token});
}

exports.getMe = async (req, res, next) => {
    try {
        let user = await AuthSchema.findById(req.user.id);
        res.status(200).json({ message: "successfully fetched", user });
    } catch (err) {
        res.status(501).json({ message:"sever error" })
    }
}

