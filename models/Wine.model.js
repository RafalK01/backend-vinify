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
    // pairingInfo: {
    //   type: String,
    //   enum: ['Fish', 'Meat', 'Vegetables', 'Seafood', 'Cheese']
    // },
    pairingInfo: {
      type: Object,
      validate: {
        validator: function (value) {
          const validKeys = ['Fish', 'Meat', 'Vegetables', 'Seafood', 'Cheese'];
          const keys = Object.keys(value);
          return keys.every(key => validKeys.includes(key) && typeof value[key] === 'string');
        },
        message: props => `Invalid pairingInfo: ${props.value}`
      }
    },
    price: Number
  }
);

const Wine = model("Wine", userSchema)

module.exports = Wine