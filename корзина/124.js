const jwt = require("jsonwebtoken");
const login = (req, res) => {
  console.log("Метод login - НАЧАЛО");
  const { email, password } = req.body;
  console.log("req.body = ");
  console.log(req.body);
  users
    .findUserByCredentials(email, password)
    .then((user) => {
      console.log("До этого места код не доходит");
      const token = jwt.sign({ _id: user._id }, "some-secret-key", {
        expiresIn: 3600,
      });
      res.status(200).send({
        _id: user._id,
        username: user.username,
        email: user.email,
        jwt: token,
      });
    })
    .catch((error) => {
      res.status(401).send({ message: error.message });
    });
};
module.exports = { login };
