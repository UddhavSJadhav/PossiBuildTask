import Upload_data from "./uploadmodel.js";
import { v2 as cloudinary } from "cloudinary";

class UploadController {
  static async apiUploadVideo(req, res, next) {
    try {
      const { title, description, thumbnail, video } = req.body;
      let errors = {};

      //Validation
      if (!title) errors.title = "*Title is required";
      if (!description) errors.description = "*Description is required";
      if (!thumbnail) errors.thumbnail = "*Thumbnail is required";
      if (!video) errors.video = "*Video is required";
      if (Object.keys(errors).length > 0) return res.status(400).json(errors);

      //File Upload
      const thumbnail_upload = await cloudinary.uploader.upload(
        thumbnail,
        { folder: "PossiBuildTask" },
        function (error, result) {
          if (error) return res.status(400).json({ error: error.message });
          return result;
        }
      );
      const video_upload = await cloudinary.uploader.upload(
        video,
        {
          folder: "PossiBuildTask",
          resource_type: "video",
        },
        function (error, result) {
          if (error) return res.status(400).json({ error: error.message });
          return result;
        }
      );

      //Doc Upload
      const result = await new Upload_data({
        title,
        description,
        video_url: video_upload?.url.toString(),
        thumbnail_url: thumbnail_upload?.url.toString(),
      }).save();
      res.status(200).json({ ...result._doc });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async apiGetALLVideos(req, res, next) {
    try {
      const all_videos_data = await Upload_data.find().sort({ _id: -1 });
      res.status(200).json({ all_videos_data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default UploadController;
