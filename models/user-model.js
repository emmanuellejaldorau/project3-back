const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const userSchema = new Schema({
  // document structure & rules
  fullName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^.+@.+\..+$/,
  },
  encryptedPassword: { type: String },
  avatar: { type: String  },
  wishList: [ String  ],
}, {
  // additional settings for Schema constructor function (class)
  timestamps: true,
});


const User = mongoose.model("User", userSchema);


module.exports = User;