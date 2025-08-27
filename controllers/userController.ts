import User from "../models/User";

export const signUpUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  // console.log("Signup ho gaya", req.body);

  // res.send("Sign up sucessful" , req.body);

  try {
    const userExist = await User.findOne({ name, email });
    console.log(userExist);
    if (userExist) {
      return res.status(401).json({ message: "user alredy registed" });
    }

    if (!name || !email || !password || !role) {
      return res
        .status(401)
        .json({ message: "Please enter the complete data " });
    } else {
      const user = new User({
        name,
        email,
        password,
        role,
      });
      await user.save();
      return res
        .status(200)
        .json({ message: "User created successfully", newuser: user });
    }
  } catch (error) {
    console.log("Error in fetcing upcommings events", error?.message ?? error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
