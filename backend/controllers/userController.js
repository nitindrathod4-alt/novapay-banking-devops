exports.login = (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin123") {
    return res.json({
      success: true,
      message: "Login Successful",
      token: "dummy-jwt-token"
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid Credentials"
  });
};
