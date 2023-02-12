const mongoose = require("mongoose");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model("User", userSchema);

const validate = (user) => {
  const schema = {
    email: joi.string().required().email().label("Email"),
    password: passwordComplexity().required().label("Password")
  };
  return joi.validate(user, schema);
};

module.exports = { User, validate };
