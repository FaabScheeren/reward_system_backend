var mongoose = require("mongoose");
const shortid = require("shortid");
const couponCode = require("../functions/uniqueCoupon");
const uniqueValidator = require("mongoose-unique-validator");

var Schema = mongoose.Schema;

var inviterSchema = new Schema({
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
  invitees: [{ type: Schema.Types.ObjectId, ref: "Invitee" }],
});

// inviterSchema.plugin(uniqueValidator);

// Define a pre-save method for categorySchema
// inviterSchema.pre("save", function (next) {
//   const self = this;
//   self.discountCode.code = couponCode(6);
//   // self.discountCode.code = shortid.generate();
//   return next();
// });

const Inviter = mongoose.model("Inviter", inviterSchema);
module.exports = Inviter;
