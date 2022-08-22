import express from "express";
import UploadController from "./uploadcontroller.js";

const router = express.Router();

router.route("/uploadvideo").post(UploadController.apiUploadVideo);
router.route("/getallvideos").get(UploadController.apiGetALLVideos);

export default router;
