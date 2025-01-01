const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://naiksoham267:soham2607@cluster0.vv8f9.mongodb.net/paytm",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
