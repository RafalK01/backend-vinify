const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    tasteProfile: [String],
    wineList: [{ 
      type: Schema.Types.ObjectId, 
      ref: "Wine" 
    }],
    signedUp: {
      type: Boolean,
      default: false
    }
  }
)

const User = model("User", userSchema)

module.exports = User
