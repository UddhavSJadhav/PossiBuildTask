import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axioscommon";

const VideosList = () => {
  const [videosData, setVideosData] = useState([]);
  useEffect(() => {
    function getVideosData() {
      axios
        .get("/getallvideos")
        .then((res) => {
          setVideosData(res.data.all_videos_data);
          console.log(res);
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
    getVideosData();
  }, []);
  return (
    <div className='d-flex flex-row mb-3 justify-content-evenly flex-wrap mt-5'>
      {videosData &&
        videosData.map((video, index) => {
          return (
            <div
              key={index}
              className='card col-lg-3 text-center'
              style={{ height: "200px" }}>
              <Link to='/playvideo' state={{ video: video }}>
                <img
                  src={video.thumbnail_url.replace(
                    /(upload)/,
                    "upload/c_fill,h_170,w_250"
                  )}
                  alt={video.title}
                  className='img-thumbnail overflow-hidden'
                  style={{ height: "170px", maxWidth: "250px" }}
                />
                <h5
                  className='card-title text-center'
                  style={{ textDecoration: "none" }}>
                  {video.title}
                </h5>
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default VideosList;
