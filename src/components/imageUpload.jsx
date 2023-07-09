import React from "react";
import { useState } from "react";
import axios from "axios";
import AWS from "aws-sdk";

const S3_BUCKET = "tigers-den";
const REGION = "us-east-2";

AWS.config.update({
  accessKeyId: "AKIA5GREX67LAR3SE3V2",
  secretAccessKey: "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",
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const ImageUpload = () => {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imgUrlFileName, setImgUrlFileName] = useState("");

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = async (file) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name,
    };

    console.log(params.Key);

    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
        setTimeout(() => {
          setImgUrlFileName(params.Key);
        }, 5000);
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };

  return (
    <>
      <div>
        <div>Native SDK File Upload Progress is {progress}%</div>
        <input type="file" onChange={handleFileInput} />
        <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
      </div>
      {imgUrlFileName !== "" && (
        <img
          src={`https://tigers-den.s3.us-east-2.amazonaws.com/${imgUrlFileName}`}
          alt=""
        />
      )}
    </>
  );
};

export default ImageUpload;
