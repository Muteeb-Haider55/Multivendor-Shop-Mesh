const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

// Configure Cloudinary with provided credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME || "dueo1tldn",
  api_key: process.env.CLOUDINARY_API_KEY || "628548479715255",
  api_secret: process.env.CLOUDINARY_API_SECRET || "sNVzT-YSCNNJkV9NcPwyb6U1e0E",
});

// Upload buffer to Cloudinary into given folder. Returns a Promise resolving to the upload result.
function uploadBuffer(buffer, folder = "products") {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}

// Delete by public_id
function deleteByPublicId(public_id) {
  return cloudinary.uploader.destroy(public_id);
}

module.exports = {
  cloudinary,
  uploadBuffer,
  deleteByPublicId,
};
