// import React, { useState } from "react";
// import axios from "axios";
// import "./App.css";

// const App = () => {
//   const [images, setImages] = useState([null, null]);

//   const handleUpload = async (index, file) => {
//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       const response = await axios.post("http://localhost:5000/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       // Update the images array with the uploaded image's URL
//       const updatedImages = [...images];
//       updatedImages[index] = response.data.imageUrl;
//       setImages(updatedImages);
//       alert("Image uploaded successfully!");
//     } catch (error) {
//       console.error(error);
//       alert("Failed to upload image!");
//     }
//   };

//   return (
//     <div className="app">
//       <h1 className="app-title">Dynamic Image Gallery</h1>
//       <div className="gallery-container">
//         {images.map((image, index) => (
//           <div className="image-upload-box" key={index}>
//             <label className="upload-label">
//               Upload Image {index + 1}
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => handleUpload(index, e.target.files[0])}
//               />
//             </label>
//             {image && (
//               <div className="image-preview">
//                 <img src={image} alt={`Uploaded ${index + 1}`} />
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;




import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [images, setImages] = useState([null, null]);

  const handleUpload = async (index, file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Update images state with the URL received from the backend
      const updatedImages = [...images];
      updatedImages[index] = response.data.imageUrl;
      setImages(updatedImages);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Failed to upload image:", error);
      alert("Image upload failed. Please try again.");
    }
  };

  return (
    <div className="app">
      <h1>Dynamic Image Gallery</h1>

      <div className="gallery-container">
        {images.map((image, index) => (
          <div className="image-upload-box" key={index}>
            <label className="upload-label">
              Upload Image {index + 1}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleUpload(index, e.target.files[0])}
              />
            </label>

            {image && (
              <div className="image-preview">
                <img src={image} alt={`Uploaded ${index + 1}`} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
