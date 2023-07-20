// import React, { useEffect } from "react";
// import { useState } from "react";
// import AWS from "aws-sdk";

// const S3_BUCKET = "tigers-den";
// const REGION = "us-east-2";

// AWS.config.update({
//   accessKeyId: import.meta.env.VITE_ACCESS_KEY_ID,
//   secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY,
// });

// const myBucket = new AWS.S3({
//   params: { Bucket: S3_BUCKET },
//   region: REGION,
// });

// const ImageUpload = ({ setImageURL }) => {
//   const [progress, setProgress] = useState(0);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [imgUrlFileName, setImgUrlFileName] = useState("");

//   const handleFileInput = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   useEffect(() => {
//     if (progress === 100) {
//       setImageURL(
//         `https://tigers-den.s3.us-east-2.amazonaws.com/${imgUrlFileName}`
//       );
//     }
//   }, [progress]);

//   const uploadFile = async (file) => {
//     const params = {
//       ACL: "public-read",
//       Body: file,
//       Bucket: S3_BUCKET,
//       Key: file.name,
//     };

//     myBucket
//       .putObject(params)
//       .on("httpUploadProgress", (evt) => {
//         setProgress(Math.round((evt.loaded / evt.total) * 100));
//         setImgUrlFileName(params.Key);
//       })
//       .send((err) => {
//         if (err) console.log(err);
//       });
//   };

//   return (
//     <>
//       <div>
//         <input type="file" onChange={handleFileInput} />
//         <div id="upload-img-button" onClick={() => uploadFile(selectedFile)}>
//           Save Photo to Database
//         </div>
//         <div>Image File Upload Progress is {progress}%</div>
//       </div>
//     </>
//   );
// };

// export default ImageUpload;
