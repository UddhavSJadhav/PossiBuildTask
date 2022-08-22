import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PlayVideo = () => {
  const video = useLocation().state?.video;
  const history = useNavigate();
  useEffect(() => {
    if (!video) history("/videos");
  }, [video, history]);
  return (
    <div className='col-lg-6 mx-auto mt-5'>
      <video
        src={video.video_url}
        autoPlay={true}
        controls={true}
        className='img-fluid mt-3'
      />
      <h5>{video.title}</h5>
      <h6>{video.description}</h6>
    </div>
  );
};

export default PlayVideo;
