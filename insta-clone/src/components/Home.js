import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, storage, db } from "../Firebase"; // Import Firestore
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDocs } from "firebase/firestore"; // Firestore functions

const Home = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // Fetch existing posts from Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const fetchedPosts = querySnapshot.docs.map((doc) => doc.data());
      setPosts(fetchedPosts);
    };
    fetchPosts();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image || !caption) {
      alert("Please select an image and add a caption.");
      return;
    }

    setUploading(true);
    try {
      // Upload image to Firebase Storage
      const imageRef = ref(storage, `posts/${image.name}`);
      await uploadBytes(imageRef, image);
      const imageURL = await getDownloadURL(imageRef);

      // Save post info (image URL and caption) to Firestore
      await addDoc(collection(db, "posts"), {
        imageURL,
        caption,
      });

      setPosts((prevPosts) => [...prevPosts, { imageURL, caption }]);
      setImage(null);
      setCaption("");
      alert("Post uploaded successfully!");
    } catch (error) {
      console.error("Error uploading post:", error.message);
    }
    setUploading(false);
  };

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };

  return (
    <div className="home">
      <header className="header">
        <img
          src="https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png"
          alt="Instagram Logo"
          style={{ width: "100px", marginLeft: "10px" }}
        />
        <button onClick={handleLogout} style={{ marginRight: "10px" }}>
          Logout
        </button>
      </header>

      <div className="post-upload">
        <h3>Add New Post</h3>
        <input type="file" onChange={handleFileChange} />
        <input
          type="text"
          placeholder="Caption here"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <button onClick={handleUpload} disabled={uploading}>
          {uploading ? "Uploading..." : "Add Post"}
        </button>
      </div>

      <div className="post-display">
        {posts.map((post, index) => (
          <div key={index} className="post-card">
            <img
              src={post.imageURL}
              alt="Uploaded post"
              style={{ width: "300px" }}
            />
            <p>{post.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
