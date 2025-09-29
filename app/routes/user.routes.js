const express = require('express');
const router = express.Router();
const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

// Middleware header untuk semua request ke router ini
router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept, Authorization, x-access-token"
  );
  next();
});

router.get("/all", controller.allAccess);

router.get("/user", authJwt.verifyToken, authJwt.isUser, controller.userBoard);

router.get("/mod", authJwt.verifyToken, authJwt.isModerator, controller.moderatorBoard);

router.get("/admin", authJwt.verifyToken, authJwt.isAdmin, controller.adminBoard);

module.exports = router;
