const mongoose = require("mongoose");

// Connect to MongoDB Atlas
mongoose.connect(
  "mongodb+srv://naiksoham267:soham2607@cluster0.vv8f9.mongodb.net/paytm",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Define the schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
});

// Create the model
const User = mongoose.model("User", userSchema); // Capitalized "User" to match usage

// Export the model
module.exports = {
  User, // Fixed to reference the correct variable
};
