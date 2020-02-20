import React, { useState, useEffect } from "react";
import { storage } from "../firebase";
function AddProduct() {
  const [input, setInput] = useState({
    image: null,
    url: "",
    progress:0
  });
  const handleChange = e => {
    if (e.target.files[0]) {
      setInput({ ...input, [e.target.name]: e.target.files[0] });
    }
  };

  const handleUpload = e => {
    e.preventDefault();
    const UploadTask = storage
      .ref(`images/${input.image.name }`)
      .put(input.image);
    UploadTask.on(
      "state_changed",
      snapshot => {
        //progress function
        const progress=Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100)
         setInput({...input,progress:progress})
      },
      error => {
        //error function
        console.log(error);
      },
      () => {
        //complete function
        storage.ref("images").child(input.image.name).getDownloadURL().then(url=>{
            console.log(url)
            setInput({...input,url:url})
        })
      }
    );
  };

  return (
    <div>
        <progress value={input.progress} max="100"/>
        <br/>
      <input
        name="image"
        type="file"
        
        onChange={handleChange}
      />

      <button onClick={handleUpload}>Upload</button>
      <br/>
      <img name="url" src={input.url || "https://via.placeholder.com/150x200?text=Product Image"} alt="uploaded" height="300" width= "400"/>
   
    
    </div>
  );
}
export default AddProduct;
