const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
  name: {
    type: String,
    required:true,
  },
  email: {
    type: String,
    required:true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  contact_no: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },

});

// userSchema.pre("save", async function () {
//   this.password = await bcrypt.hash(this.password, 12);
// });

module.exports = mongoose.model("User", userSchema);