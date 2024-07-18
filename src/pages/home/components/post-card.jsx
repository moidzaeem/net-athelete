import React, { useState } from "react";
import AppDiv from "../../../components/atoms/AppDiv";
import { AppLabel } from "../../../utils/theme";
import { Avatar, Divider, TextField } from "@mui/material";
import { PaperStyle } from "../../../utils/styles";
import gallery from "../../../assets/svg/gallery.svg";
import { toast } from "react-toastify";
import useCrypto from "../../../utils/hooks/encrypt";
import axios from "axios";

const PostCard = () => {
  const { decryptedData } = useCrypto();
  const [postContent, setPostContent] = useState("");
  const [media, setMedia] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  
  const formData = new FormData();
  const handleSubmit = async () => {
    const url = import.meta.env.VITE_BASE_URL;
    try {
      const token = decryptedData.tokens.access.token; // Get JWT token from local storage
      if (!token) {
        throw new Error('No token found in local storage');
      }

      console.log(media)

      const response = await axios.post(
        `${url}/feed`,{
          text:postContent,
          media:media,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        }
      );

      if (response.status === 200) {
        setLoading(false)
        toast.success(response.data.message); // Notify user of success
        // handleFile()
       } else {
        throw new Error('Failed to create post');
      }
    } catch (error) {
      setLoading(false)
      console.error('Error creating post:', error);
      toast.error('Failed to create post. Please try again.'); // Notify user of failure
    }
  }

const handleFile = async () => {
 
  formData.append("file", selectedImage);
  const url = import.meta.env.VITE_BASE_URL;
setLoading(true)
  try {
    const token = decryptedData.tokens.access.token; // Get JWT token from local storage
    if (!token) {
      throw new Error('No token found in local storage');
    }

    const response = await axios.post(
      `${url}/user/upload-file`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
    );

    if (response.status === 200) {
      console.log(response.data)
      if(response.data.status !== 400){
        setMedia(response?.data?.data?.upload_link)
        handleSubmit()
      }
      toast.error(response.data.message)
    
      
      // toast.success(response.data.message); // Notify user of success
    } else {
      throw new Error('Failed to upload file');
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    setLoading(false)
    toast.error('Failed to upload file. Please try again.'); // Notify user of failure
  }
};



  return (
    <AppDiv
      sx={{
        ...PaperStyle,
        width: "100%",
        background: "white",
        p: 2,
      }}
    >
      <AppDiv sx={{ display: "flex", justifyContent: "space-between" }}>
      <AppLabel>Post Something</AppLabel>
      </AppDiv>
      <Divider sx={{ my: 2 }} />
      <AppDiv sx={{ display: "flex", alignItems: "center" }}>
        <Avatar src="/avatar.svg" />
        <TextField
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#F6F8F9",
              },
            },
            "& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            borderRadius: 3,
          }}
          inputProps={{ style: { fontSize: 12 } }}
          variant="outlined"
          placeholder={"What’s on your mind?"}
          fullWidth
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
        <label htmlFor="image-upload">
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <img src={gallery} alt="gallery" style={{ cursor: "pointer", marginLeft: "10px" }} />
        </label>

        <button disabled={loading} className={`${loading && "post-btndisable"} post-btn`} onClick={handleFile}>Post</button>
      </AppDiv>
    </AppDiv>
  );
};

export default PostCard;
