import React, { useState, useEffect } from "react";
import { auth, storage } from "../Firebase"; // Use correct relative path
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";

const UploadPost = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);

  // Fetch previously uploaded images on component mount
  useEffect(() => {
    const fetchImages = async () => {
      const imageListRef = ref(storage, "posts/");
      const response = await listAll(imageListRef);
      const urls = await Promise.all(
        response.items.map((item) => getDownloadURL(item))
      );
      setImageUrls(urls);
    };

    fetchImages();
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image to upload.");
      return;
    }

    setUploading(true);
    try {
      const imageRef = ref(storage, `posts/${image.name}`);
      await uploadBytes(imageRef, image);
      const imageURL = await getDownloadURL(imageRef);
      setImageUrls((prevUrls) => [...prevUrls, imageURL]); // Add uploaded image URL to the list
      setImage(null); // Reset the image state
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error.message);
    }
    setUploading(false);
  };

  return (
    <div>
      <h2>Upload Post</h2>
      <input type="file" onChange={handleFileChange} />
      <br />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Post"}
      </button>

      <div>
        <h3>Uploaded Posts</h3>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {imageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt="Uploaded Post"
              style={{ width: "150px", height: "150px", margin: "10px" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadPost;
