const express = require("express");
const multer = require("multer");
const { Client, Storage } = require("node-appwrite");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Appwrite configuration
const client = new Client();
client
  .setEndpoint("http://localhost/v1https://cloud.appwrite.io/console/project-675feb1100065a20dc46/overview/platforms") // Appwrite endpoint (or your server's)
  .setProject("675feb1100065a20dc46") // Replace with your Appwrite Project ID
  .setKey("standard_0579ea7146f615c28e87b78343e763c57ff4515df2d59d86790736db127797dd914addd31994125a9bba5db97bf2da097e2728d4a6b0a7e6c8d38dac2b679ec7dfc729e5427a27dec9b392830a69f7a92b8fee26ec37d490b2cf7ac8622dfcf4d303ff76540c82604cf7c8999f75df5cafc741b4ecc50420ee3e9919184f7282"); // Replace with your Appwrite API Key

const storage = new Storage(client);

// Multer configuration for handling file uploads
const upload = multer({ dest: "uploads/" });

// Upload route
app.post("/upload", upload.single("image"), async (req, res) => {
  const filePath = req.file.path; // Temporary file path
  const fileName = req.file.originalname; // Original file name

  try {
    // Upload file to Appwrite Storage
    const response = await storage.createFile(
      "675feb1100065a20dc46", // Replace with your Appwrite Bucket ID
      "unique()", // Unique file ID
      fs.createReadStream(filePath) // File stream
    );

    // Get public URL of uploaded file
    const fileUrl = `${client.config.endpoint}/storage/buckets/YOUR_BUCKET_ID/files/${response.$id}/view?project=675feb1100065a20dc46`;

    // Clean up the temporary file
    fs.unlinkSync(filePath);

    res.status(200).json({ imageUrl: fileUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upload image to Appwrite" });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

