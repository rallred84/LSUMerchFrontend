import React from "react";
import { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [image, setImage] = useState("");

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleApi = () => {
    const fd = new FormData();
    fd.append("image", image);
    axios
      .post("urllll", fd)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <h2>TESTING IMAGES</h2>
      <div>
        <input type="file" name="file" onChange={handleImage}></input>
        <button onClick={handleApi}>Submit</button>
      </div>
    </>
  );
};

export default ImageUpload;
