export const dashboard = (req, res, next) => {
  // In your dashboard route
  console.log("User reached dashboard with user data:", req.user);
  const user = req.user;
  res.status(200).json({ message: "welcome to the protected dashboard", user });
};
