const { Router } = require("express");
const router = Router();
const Invitee = require("../schemas/invitee");

router.get("/", (req, res) => {
  return res.send("Invitee");
});

router.post("/", async (req, res) => {
  const inviteeData = req.body;

  try {
    const invitee = await Invitee.create(inviteeData);
    res.send(invitee);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
