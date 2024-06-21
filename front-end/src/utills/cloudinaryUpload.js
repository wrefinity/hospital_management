import axios from "axios";

const uploadFiles = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME)
  data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);

  try {
    const res = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, data);
    console.warn(res)
    const { url } = res.data;
    return url;
  } catch (err) {
    // console.log(err);
  }
};

export default uploadFiles;