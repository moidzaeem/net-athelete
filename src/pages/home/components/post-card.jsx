import React, { useEffect, useState } from "react";
import AppDiv from "../../../components/atoms/AppDiv";
import { AppLabel } from "../../../utils/theme";
import { Avatar, Divider, TextField } from "@mui/material";
import { PaperStyle } from "../../../utils/styles";
import gallery from "../../../assets/svg/gallery.svg";
import { toast } from "react-toastify";
import useCrypto from "../../../utils/hooks/encrypt";
import axios from "axios";

const PostCard = ({ chnageFeedData, setChangeFeedData }) => {
  const { decryptedData } = useCrypto();
  const [postContent, setPostContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [media, setMedia] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  useEffect(() => {
    const handleSubmit = async () => {
      setLoading(true);
      const url = import.meta.env.VITE_BASE_URL; // Assuming you are using Vite for environment variables

      try {
        const token = decryptedData.tokens.access.token; // Get JWT token from local storage
        if (!token) {
          throw new Error("No token found in local storage");
        }

        console.log(media);
        const response = await axios.post(
          `${url}/feed`,
          {
            text: postContent,
            media: media, // Use the media state here
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setLoading(false);
          setChangeFeedData(!chnageFeedData);
          setPostContent("");
          toast.success(response.data.message); // Notify user of success
          // Optionally, reset form fields or take other actions after successful post creation
        } else {
          throw new Error("Failed to create post");
        }
      } catch (error) {
        setLoading(false);
        console.error("Error creating post:", error);
        toast.error("Failed to create post. Please try again."); // Notify user of failure
      }
    };

    if (media) {
      handleSubmit();
    }
  }, [media]);

  const handleFile = async () => {
    setLoading(true);
    const url = import.meta.env.VITE_BASE_URL; // Assuming you are using Vite for environment variables

    try {
      const token = decryptedData.tokens.access.token; // Get JWT token from local storage
      if (!token) {
        throw new Error("No token found in local storage");
      }

      const formData = new FormData();
      formData.append("file", selectedImage);

      const response = await axios.post(`${url}/user/upload-file`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        if (response.data.status !== 400) {
          // setMedia(response.data.data.upload_link); // Set media state with the uploaded file link
          setMedia(response.data.data.upload_link); // Set media state with the uploaded file link
          // handleSubmit(); // Call handleSubmit after successful file upload
        }
        setLoading(false);
        toast.error(response.data.message); // Notify user of success or failure
      } else {
        throw new Error("Failed to upload file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setLoading(false);
      toast.error("Failed to upload file. Please try again."); // Notify user of failure
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
          <img
            src={gallery}
            alt="gallery"
            style={{ cursor: "pointer", marginLeft: "10px" }}
          />
        </label>

        <button
          disabled={loading}
          className={`${loading && "post-btndisable"} post-btn`}
          onClick={handleFile}
        >
          Post
        </button>
      </AppDiv>
    </AppDiv>
  );
};

export default PostCard;
