const router = require("express").Router();
const jwt = require("jsonwebtoken");

router.post("/", (req, res) => {
  const token = req.body.token;
  console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, res) => {
      if (err) {
        console.log(err);
        return "token expired";
      }
      return res;
    });
    console.log(decoded);
    if (decoded === "token expired") {
      return res.send({ status: 408, data: "token expired" });
    } else {
      return res.send({ status: 200, email: decoded.email });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
});

module.exports = router;
