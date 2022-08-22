import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axioscommon";

const Upload = () => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    thumbnail: "",
    video: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    thumbnail: "",
    video: "",
  });
  const [uploading, setUploading] = useState(false);
  const history = useNavigate();

  const handleTextChange = (prop) => (event) => {
    setValues((prevValues) => ({ ...prevValues, [prop]: event.target.value }));
  };

  const handleFileChange = (prop) => (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 100000000) {
      setErrors({ [prop]: "*Uploaded file exceeds 100mb." });
      return (event.target.value = null);
    }
    if (prop === "thumbnail" && !/\.(jpg|png)$/i.test(file.name)) {
      setErrors({ [prop]: "*Upload only jpg and png." });
      return (event.target.value = null);
    }
    if (prop === "video" && !/\.(mp4|mpg|avi)$/i.test(file.name)) {
      setErrors({ [prop]: "*Upload only mpg, avi and mp4." });
      return (event.target.value = null);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setValues((prevValues) => ({
        ...prevValues,
        [prop]: reader.result,
      }));
    };
    reader.onerror = () => {
      setErrors({ [prop]: "*Something went wrong" });
      return (event.target.value = null);
    };
    setErrors({ [prop]: "" });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    axios
      .post("/uploadvideo", JSON.stringify({ ...values }))
      .then((res) => {
        console.log(res);
        setUploading(false);
        history("/videos");
      })
      .catch((err) => {
        console.error(err.message);
        setErrors((prevErrs) => ({ ...err.response.data }));
        setUploading(false);
      });
  };

  return (
    <div>
      <div className='card col-lg-6 mx-auto mt-5'>
        <div className='card-body'>
          <h3 className='text-center'>Upload Video</h3>
          <hr />
          <form onSubmit={handleOnSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Title</label>
              <input
                type='text'
                maxLength='50'
                className='form-control'
                onChange={handleTextChange("title")}
              />
              <span className='form-text text-danger'>{errors.title}</span>
            </div>
            <div className='mb-3'>
              <label className='form-label'>Description</label>
              <textarea
                maxLength='200'
                className='form-control'
                onChange={handleTextChange("description")}
              />
              <span className='form-text text-danger'>
                {errors.description}
              </span>
            </div>
            <div className='mb-3'>
              <label className='form-label'>Upload Thumbnail</label>
              <input
                type='file'
                className='form-control'
                onChange={handleFileChange("thumbnail")}
              />
              <span className='form-text text-danger'>{errors.thumbnail}</span>
            </div>
            <div className='mb-3'>
              <label className='form-label'>Upload Video</label>
              <input
                type='file'
                className='form-control'
                onChange={handleFileChange("video")}
              />
              <span className='form-text text-danger'>{errors.video}</span>
            </div>
            <button
              type='submit'
              className='btn btn-primary'
              disabled={uploading}>
              {uploading ? "Uploading" : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload;
