const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const uploader = require("../middlewares/cloudinary.config");

router.post(
  "/multiple-uploads",
  uploader.array("imageUrl"),
  async (req, res) => {
    try {
      // Validate that files are uploaded
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }

      const images = req.files; // Uploaded images
      const imageUrls = []; // Array to hold secure URLs

      // Upload images to Cloudinary
      for (const image of images) {
        try {
          const result = await cloudinary.uploader.upload(image.path, {
            resource_type: "auto",
          });
          imageUrls.push(result.secure_url);
        } catch (cloudinaryError) {
          console.error(
            `Error uploading image to Cloudinary: ${cloudinaryError.message}`
          );
          // Optionally skip the failed image and continue with others
          return res.status(500).json({
            message: "Error uploading image to Cloudinary",
            error: cloudinaryError.message,
          });
        }
      }

      // Respond with the URLs
      console.log("Uploaded images:", imageUrls);
      res.status(200).json({ message: "Success!", imageUrls });
    } catch (error) {
      console.error("Server error during file upload:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

module.exports = router;
