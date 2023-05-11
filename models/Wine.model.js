const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: String,
    headline: String,
    flavours: [String],
    description: String,
    kind: String,
    origin: String,
    pairingItems: [String],
    pairinInfo: {
        fish: [String],
        meat: [String],
        vegetables: [String],
        seafood: [String],
        cheese: [String],
    },
    price: Number
  }
);

const Wine = model("Wine", userSchema)

module.exports = Wine