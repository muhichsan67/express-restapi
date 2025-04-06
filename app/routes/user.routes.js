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

/**
 * @swagger
 * /api/test/all:
 *   get:
 *     summary: Ambil semua pengguna
 *     responses:
 *       200:
 *         description: Daftar pengguna berhasil diambil
 */
router.get("/all", controller.allAccess);

/**
 * @swagger
 * /api/test/user:
 *   get:
 *     summary: Halaman pengguna biasa
 *     responses:
 *       200:
 *         description: Akses pengguna berhasil
 */
router.get("/user", authJwt.verifyToken, authJwt.isUser, controller.userBoard);

/**
 * @swagger
 * /api/test/mod:
 *   get:
 *     summary: Halaman moderator
 *     responses:
 *       200:
 *         description: Akses moderator berhasil
 */
router.get("/mod", authJwt.verifyToken, authJwt.isModerator, controller.moderatorBoard);

/**
 * @swagger
 * /api/test/admin:
 *   get:
 *     summary: Halaman admin
 *     responses:
 *       200:
 *         description: Akses admin berhasil
 */
router.get("/admin", authJwt.verifyToken, authJwt.isAdmin, controller.adminBoard);

module.exports = router;
