const { Router } = require("express");
const multer = require("multer");
const {
  createProfile,
  getAllprofile,
  updateprofile,
  deleteprofile,
} = require("../controllers/profile");
let { storage } = require("../middlewares/multer");
const upload = multer({ storage: storage });

// const {  } = require("../controllers/profile");
// const {  } = require("../controllers/profile");
// const {  } = require("../controllers/profile");

const router = Router();

router.route("/createprofile").post(upload.single("photo"), createProfile);
router.route("/:id").get(getAllprofile);
router.route("/:id").put(upload.single("photo"),updateprofile);
router.route("/:id").delete(deleteprofile);

module.exports = router;
