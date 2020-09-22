const { Router } = require("express");
const router = Router();

const Inviter = require("../schemas/inviter");
const Invitee = require("../schemas/invitee");

router.get("/", (req, res) => {
  return res.send("Inviter");
});

router.post("/", async (req, res) => {
  const inviterData = req.body;
  const invitees = req.body.invitees;
  // console.log("Inviter data", inviterData);
  // console.log("invitees", invitees);

  delete inviterData.invitees;

  const inviter = await Inviter.create(inviterData, (err, inviterPerson) => {
    if (err) {
      // if (err || err.code === 11000) {
      // return handleError(err)
      console.log("Error in inviter", err);
      // console.log("Error in inviter", err);
      return res.status(409).send("Inviter already exists");
    }

    invitees.forEach((invitee) => {
      invitee.inviter = inviterPerson._id;
    });

    const invitee = Invitee.create(invitees, (err, createdInvitee) => {
      if (err) {
        // return handleError(err)
        console.log("Error in invitee", err);
        // res.status()
        return res.send("Something went wrong");
      }

      createdInvitee.map((invitee) => {
        inviterPerson.invitees.push(invitee._id);
      });
      inviterPerson.save();
    });
    res.send({ inviter: inviterPerson });
  });
});

module.exports = router;
