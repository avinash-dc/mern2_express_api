const { Router } = require("express");
const { Signup, Signin, getMe } = require("../controllers/auth");
// const {} = require("../controllers/auth");
const {protected } = require("../middlewares/auth");
const router = Router();

router.route("/Signup").post(Signup);
router.route("/Signin").post(Signin);
router.route("/me").get(protected,getMe);

module.exports = router;
