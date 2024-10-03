const cloudinary = require("cloudinary").v2;

const uploadCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream((error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result.secure_url); // คืนค่า URL ของภาพ
    }).end(file.buffer); // ใช้ buffer ของไฟล์จาก Multer
  });
};


module.exports = { uploadCloudinary }