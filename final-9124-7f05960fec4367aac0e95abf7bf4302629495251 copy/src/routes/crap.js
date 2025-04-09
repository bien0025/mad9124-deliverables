const express = require("express");
const {checkAuth} = require("../middleware/authWare");
const crapJoystick = require("../controller/crapJoystick");
const {getAllCrap,getCrapById, createCrap, updateCrap, deleteCrap, markInterested, suggestPickup, agreeToPickup, disagreeToPickup, resetCrapFlow, flushCrap} = require("../controller/crapJoystick");

const router = express.Router();

//chemin
router.get("/", checkAuth, crapJoystick.getAllCraps);//Toute
router.get("/mine", checkAuth, crapJoystick.getMyCrap)//maPar
router.get("/:id", checkAuth, crapJoystick.getCrapById);//un
router.post("/", checkAuth, crapJoystick.createCrap);// faire1
router.patch("/:id", checkAuth, crapJoystick.updateCrap);//aJour
router.delete("/:id", checkAuth, crapJoystick.deleteCrap);//efac

//logique d'acheteur et vendeur
router.post("/:id/interested", checkAuth, crapJoystick.markInterested);
router.post("/:id/suggest", checkAuth, crapJoystick.suggestPickup);
router.post("/:id/agree", checkAuth, crapJoystick.agreeToPickup);
router.post("/:id/disagree", checkAuth, crapJoystick.disagreeToPickup);
router.post("/:id/reset", checkAuth, crapJoystick.resetCrapFlow);
router.post("/:id/flush", checkAuth, crapJoystick.flushCrap);

router.get("/test", (req, res) => {
    res.json({ msg: "Backend is working 🚀" });
  });
  

module.exports = router;
