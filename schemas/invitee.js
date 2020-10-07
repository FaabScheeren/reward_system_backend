var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const couponCode = require("../functions/uniqueCoupon");
const sendEmail = require("../functions/sendingEmail");

var inviteeSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  adress: {
    street: String,
    houseNumber: String,
    postalCode: String,
    city: String,
  },
  discountCode: {
    code: String,
    used: {
      type: Boolean,
      default: false,
    },
  },
  inviter: { type: Schema.Types.ObjectId, ref: "Inviter" },
});

// Define a pre-save method for categorySchema
inviteeSchema.pre("save", function (next) {
  const self = this;
  const discountCode = couponCode(6);
  self.discountCode.code = discountCode;
  next();
});

inviteeSchema.pre("save", function (next) {
  this.populate("inviter").execPopulate(function (err, poppedInvitee) {
    // console.log("invitee", popInviter);
    sendEmail(
      poppedInvitee.email,
      poppedInvitee.firstName,
      poppedInvitee.lastName,
      poppedInvitee.discountCode.code,
      poppedInvitee.inviter.firstName,
      poppedInvitee.inviter.lastName
    );
    return next();
  });
});

const Invitee = mongoose.model("Invitee", inviteeSchema);

module.exports = Invitee;
