const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
  const { username, password } = req.body; //3 ways to check, 1. By Mongo, 2. Joi, 3. Check in controller

  if (!username || !password) {
    throw new CustomAPIError("Please provide email and password", 400);
  }

  const id = new Date().getDate(); //just for demo, as not connected to DB as of now.

  //Goal is to keep payload small, for better user experince, because bigger the payload, the more data we are sending to server and will create issue during bad internet connection.
  const token = jwt.sign(
    {
      id,
      username,
    },
    process.env.JWT_SECRET, // In production, our goal is to use long, complex and unguessable sting value as secret key, for better secruity.
    { expiresIn: "30d" } //30 days
  );

  res.status(200).json({ msg: "User created", token });
};

const dashboard = async (req, res) => {
  console.log(req.user);
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
