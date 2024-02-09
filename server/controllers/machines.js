const multer = require("multer");
const path = require("path");

const Machines = require("../models/machines");
const { fstat } = require("fs");

async function handleMachineCreation(req, res) {
  try {
    const {
      productName,
      description,
      manufacturer,
      price,
      quantityAvailable,
      modelNumber,
      weight,
      imageURL,
    } = req.body;

    const newMachine = new Machines({
      productName: productName,
      description: description,
      manufacturer: manufacturer,
      price: price,
      quantityAvailable: quantityAvailable,
      modelNumber: modelNumber,
      weight: weight,
      imageURL: `/uploads/products/${req.file.filename}`,
    });

    const saveMachine = await newMachine.save();
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
      error: "Error machine user",
    });
  }
}

module.exports = { handleMachineCreation };
