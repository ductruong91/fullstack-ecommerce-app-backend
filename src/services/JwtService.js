const jwt = require("jsonwebtoken");

export const generalAccessToken = (payload) => {
  const accessToken = jwt.sign(
    {
      payload,
    },
    "access_token",
    { expiresIn: "1h" }
  );
  return access_token
};

module.exports = {
    generalAccessToken
}