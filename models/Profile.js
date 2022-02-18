const { Schema, model } = require("mongoose");
const ProfileSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "please add username"],
      minlength: [6, "name should be minimum 6 characters"],
    },

    designation: {
      type: String,
      required: [true, "please add designation"],
    },

    yoe: {
      type: String,
      required: [true, "please add year of experienced"],
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

    linkedIn: {
      type: String,
      required: [true, "please add your linkedIn ID"],
    },

    location: {
      type: String,
      required: [true, "please add your location"],
    },

    skills: {
      type: String,
      required: [true, "please add your skills"],
      default: ["Javascript", "HTML", "CSS"],
    },

    photo: {
      type: [""],
      required: true,
      default:"",
    },
  },
  { timestamps: true }
);

module.exports = model("profile", ProfileSchema);
