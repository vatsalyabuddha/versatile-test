const tesseract = require("node-tesseract-ocr");

const imageUploadController = async (req, res) => {
  try {
    let result = "";
    const config = {
      lang: "eng",
      oem: 1,
      psm: 3,
      tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    };
    const text = await tesseract.recognize(
      req.files.number_plate_image.data,
      config
    );
    result = text.replace(/[^a-z0-9]/gi, "");
    res.status(200).send(result);
  } catch (e) {
    res.status(400).send(e);
  }
};
module.exports = { imageUploadController };
