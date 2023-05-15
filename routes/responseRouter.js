const router = require("express").Router();
const responseCtrl = require("../controllers/responseCtrl");

router.get("/data", responseCtrl.getData);
router.get("/data/user/:id", responseCtrl.getDataUser);
router.get("/data/advertisiment", responseCtrl.getAdvertisiment);
router.get("/data/advertisiment/:id", responseCtrl.getOneAdvertisiment);
router.post("/data/advertisiment/create", responseCtrl.createAdvertisiment);
router.post("/data/post/create", responseCtrl.createPost);
router.post("/data/user/newuser", responseCtrl.register);
router.patch("/data/user/:id/edit", responseCtrl.editDataUser);
router.patch("/data/post/:id/edit", responseCtrl.editPostUser);
router.patch("/data/advertisiment/:id/edit", responseCtrl.editAdvertisiment);
router.delete("/data/user/:id/delete", responseCtrl.deleteDataUser);
router.delete("/data/post/:id/delete", responseCtrl.deletePost);
router.delete("/data/advertisiment/:id/delete", responseCtrl.deleteAdvertisiment);

module.exports = router;
