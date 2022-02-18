const bcrypt = require("bcryptjs");
const { Schema, model } = require("mongoose");
const jwt = require('jsonwebtoken');
const {JWT_EXPIRE,JWT_SECRET}=require("../config/index")
const AuthSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "please add username"],
      minlength: [6, "username should be minimum 6 characters"],
    },
    email: {
      type: String,
      unique: true,
      require: [true, "please add email address"],
      match: [
        /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      require: [true, "please add password"],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "publisher"],
      default: "user",
    },
  },
  { timestamps: true }
);

//hash password
AuthSchema.pre("save", async function () {
  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

AuthSchema.methods.getJWTtoken = function () {
  return jwt.sign({ id: this._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });
}

module.exports = model("user", AuthSchema);
