const router = require("express-promise-router")();
const UserController = require("../controller/user");
const passport = require("passport");
const validators = require("../common/validators");


require("../passport");
const authenticate = (strategy) =>
  passport.authenticate(`${strategy}`, { session: false });

router.route("/signup").post(UserController.signUp);

router.route("/signin").post(authenticate("local"), UserController.signIn);

router
  .route("/google")
  .post(authenticate("googleToken"), UserController.signIn);

router.post("/forgot-password", validators.validate("forgotPassWord"), validators.validationMiddleware, UserController.forgotPassword);
router.post("/reset-password", validators.validate("resetPassWord"), validators.validationMiddleware, UserController.resetPassword);


module.exports = router;