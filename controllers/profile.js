const ProfileSchema = require("../models/Profile");

exports.createProfile = async (req, res) => {
  try {
    let { name, designation, yoe, email, linkedIn, location, skills } =
      req.body;
    let payload = new ProfileSchema({
      photo: req.file,
      name,
      designation,
      yoe,
      email,
      linkedIn,
      location,
      skills,
    });

    let data = await ProfileSchema.create(payload);
    res.status(201).json({ message: "successfully data created", data });
  } catch (err) {
    res.status(501).json({ message: "server error!" });
  }
};

exports.getAllprofile = async (req, res) => {
  try {
    let payload = await ProfileSchema.findById(req.params.id);
    res.status(200).json({ message: "featched all Data", payload });
  } catch (err) {
    res.status(501).json({ message: "Server Error" });
  }
};

exports.updateprofile = async (req, res) => {
  try {
    let { name, designation, yoe, email, linkedIn, location, skills } =
      req.body;
    let payload = await ProfileSchema.findByIdAndUpdate(
      req.params.id,
      {
        name,
        designation,
        yoe,
        email,
        linkedIn,
        location,
        skills,
        photo:req.file
      },
      { new: true }
    );
    await ProfileSchema(payload).save();
    res.status(201).json({ message: "Successfully profile updated", payload });
  } catch (err) {
    console.log(err);
    res.status(501).json({ message: "SERVER ERROR" });
  }
};

exports.deleteprofile = async (req, res) => {
  try {
    await ProfileSchema.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Successfully profile Deleted" });
  } catch (err) {
    console.log(err);
    res.status(501).json({ message: "SERVER ERROR" });
  }
};
