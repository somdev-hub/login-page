const router = require("express").Router();
const { User } = require("./user");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(401).send("Invalid email or password");
    } else {
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "10s"
      });
      if (res.status(201)) {
        return res.json({
          status: 200,
          data: token,
          message: "Login successful"
        });
      } else {
        return res.json({ error: "error" });
      }
    }
    // const token = user.generateAuthToken();
    // res.status(200).send({ data: token, message: "Login successful" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});
const validate = (user) => {
  const schema = joi.object({
    email: joi.string().required().email().label("Email"),
    password: joi.string().required().label("Password")
  });
  return schema.validate(user);
};

module.exports = router;
