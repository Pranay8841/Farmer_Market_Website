const multer = require("multer");
const path = require("path");
const fs = require("fs");
//User model
const User = require("../models/user");

async function handleUserSignup(req, res) {
  try {
    const { username, email, password, roles, address, contact } = req.body;

    const newUser = new User({
      username: username,
      email: email,
      password: password,
      profileImageURL: `/uploads/profiles/${req.file.filename}`,
      roles: roles,
      address: address,
      contact: contact,
    });

    const savedUser = await newUser.save();
    try {
      await fs.promises.appendFile(
        "../log.txt",
        `New user created:- ${savedUser.username}`
      );
      console.log("Log appended successfully");
    } catch (error) {
      console.error("Error appending to log:", error);
    }
    return res.status(201).redirect("/");
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      error: "Error creating user",
    });
  }
}

async function handleUserSignin(req, res) {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);

    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect Email or Password",
    });
  }
}

async function handleUserUpdate(req, res) {
  try {
    // console.log(req);
    const id = req.params.id;
    const updateDetails = req.body;
    // console.log(id, "   detail   ", updateDetails);

    const updatedUser = await User.findByIdAndUpdate(
      { _id: id },
      { $set: updateDetails },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(updatedUser);
    res.status(200).json({
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}

//deleting user
async function handleUserDelete(req, res) {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete({
      _id: id,
    });

    res.clearCookie("token").redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}

async function handleGetUser(req, res) {
  try {
    const id = req.params.id;
    const user = await User.findOne({
      _id: id,
    });

    if (!user) {
      return res.status(404).json({ message: "No user found for this user" });
    }

    res.status(200).json({ message: "User found", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  handleUserSignup,
  handleUserSignin,
  handleUserUpdate,
  handleUserDelete,
  handleGetUser,
};
