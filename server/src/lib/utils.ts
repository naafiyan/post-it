const jsonwebtoken = require("jsonwebtoken");

function issueJWT(user: any) {
  const _id = user._id;
  const expiresIn = process.env.JWT_EXPIRES_IN;

  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}

export { issueJWT };
