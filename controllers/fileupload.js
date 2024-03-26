const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

//localFile upload

function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder) {
  const options = { folder };
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.localFileUpload = async (req, res) => {
  try {
    const file = req.files.file;
    console.log("File aa gayi", file);

    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    console.log("path", path);

    file.mv(path, (err) => {
      console.log(err);
    });

    res.json({
      success: true,
      message: "Local file uploaded successfully",
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.imageUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, tags, email);
    const file = req.files.imageFile;
    console.log(file);

    //validation

    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }

    const response = await uploadFileToCloudinary(file, "CodeHelp");
    console.log(response);

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      data: fileData,
      message: "image successfully uploaded",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
