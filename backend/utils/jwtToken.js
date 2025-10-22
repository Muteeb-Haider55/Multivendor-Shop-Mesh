// create token and saving that in cookies
const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  //Options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 100),
    httpOnly: true,
    // set secure and sameSite only in production so cookies work on localhost
    secure: process.env.NODE_ENV === "PRODUCTION",
    sameSite: process.env.NODE_ENV === "PRODUCTION" ? "none" : "lax",
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};
module.exports = sendToken;
