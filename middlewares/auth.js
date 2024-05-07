const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  console.log("checkAuth");
  const { authorization } = req.headers;

  console.log("req.headers");
  console.log(req.headers);

  // const rezult = !authorization.startsWith("Bearer ");
  // console.log("rezult = ");
  // console.log(rezult);

  // const rezult2 = !authorization;
  // console.log("rezult2 = ");
  // console.log(rezult2);

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Необходима авторизация" });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    req.user = jwt.verify(token, "some-secret-key");
  } catch (err) {
    return res.status(401).send({ message: "Необходима авторизация" });
  }

  next();
};

const checkCookiesJWT = (req, res, next) => {
  if (!req.cookies.jwt) {
    return res.redirect("/");
  }
  req.headers.authorization = `Bearer ${req.cookies.jwt}`;
  next();
};

module.exports = { checkAuth, checkCookiesJWT };
