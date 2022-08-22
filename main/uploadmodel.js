import mongoose from "mongoose";
const { Schema } = mongoose;

const UploadSchema = new Schema({
  title: String,
  description: String,
  thumbnail_url: String,
  video_url: String,
  date: { type: Date, default: Date.now },
});

// const uploadSchema = new Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   thumbnail_url: { type: String, required: true },
//   video_url: { type: String, required: true },
//   date: { type: Date, default: Date.now },
// });

export default mongoose.model("upload_data_doc", UploadSchema);
