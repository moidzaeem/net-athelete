import React, { useState, useEffect, useRef } from "react";
import AppDiv from "../../../components/atoms/AppDiv";
import { AppLabel, Appcaption } from "../../../utils/theme";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { gamma, secondary } from "../../../utils/theme/colors";
import { Avatar, Divider, CircularProgress, Dialog, DialogContent, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Appfont } from "./../../../utils/theme/index";
import { AppButton } from "../../../components/atoms/AppButton";
import { PaperStyle } from "../../../utils/styles";
import axios from "axios";
import useCrypto from "../../../utils/hooks/encrypt";
import CloseIcon from "@mui/icons-material/Close";

const StoriesCard = () => {
  const { decryptedData } = useCrypto();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showAll, setShowAll] = useState(false); // State to manage showing all stories
  const [openModal, setOpenModal] = useState(false); // State to manage modal visibility
  const [selectedStory, setSelectedStory] = useState(null); // State to store the selected story
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchStories = async () => {
      const token = decryptedData?.tokens?.access?.token;
      if (!token) return;

      try {
        const url = import.meta.env.VITE_BASE_URL;
        const response = await axios.get(`${url}/story`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setStories(response.data.data || []); // Update according to your response structure
        } else {
          throw new Error("Failed to fetch stories");
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [decryptedData]);

  const handleCreateStory = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const url = import.meta.env.VITE_BASE_URL;
      const token = decryptedData?.tokens?.access?.token;
      if (!token) {
        throw new Error("No token found in local storage");
      }

      // Upload the file
      const formData = new FormData();
      formData.append("file", file);

      const responseUpload = await axios.post(
        `${url}/user/upload-file`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (responseUpload.status === 200) {
        const uploadLink = responseUpload.data.data.upload_link;

        // Create a new story with the uploaded image
        const responseStory = await axios.post(
          `${url}/story`,
          {
            media: uploadLink,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (responseStory.status === 200) {
          setStories([...stories, responseStory.data.data]); // Add the new story to the list
        } else {
          throw new Error("Failed to create story");
        }
      } else {
        throw new Error("Failed to upload file");
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setUploading(false);
    }
  };

  const handleSeeAllClick = () => {
    setShowAll(true);
  };

  const handleStoryClick = (story) => {
    setSelectedStory(story);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedStory(null);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Determine stories to display based on `showAll`
  const displayedStories = showAll ? stories : stories.slice(0, 3);

  return (
    <>
      <AppDiv
        sx={{
          ...PaperStyle,
          width: "100%",
          background: "white",
          p: 2,
        }}
      >
        {/* Header */}
        <AppDiv sx={{ display: "flex", justifyContent: "space-between" }}>
          <AppLabel>Stories</AppLabel>
          <MoreHorizIcon sx={{ color: secondary }} />
        </AppDiv>
        <Divider sx={{ my: 2 }} />

        {/* Create Story Section */}
        <AppDiv sx={{ display: "flex", alignItems: "flex-start" }}>
          <IconButton
            sx={{ background: "white", border: "1px solid #F3F3F3" }}
            onClick={handleCreateStory}
            disabled={uploading}
          >
            <AddIcon sx={{ color: gamma }} />
          </IconButton>
          <AppDiv sx={{ ml: 1 }}>
            <Appfont sx={{ textAlign: "start" }}>Create Your Story</Appfont>
            <Appcaption sx={{ textAlign: "start" }}>
              Click button beside to create yours.
            </Appcaption>
          </AppDiv>
        </AppDiv>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        {/* Stories List */}
        {displayedStories.length > 0 ? (
          displayedStories.map((story) => (
            <AppDiv
              key={story.id}
              sx={{ display: "flex", alignItems: "center", mt: 1, cursor: "pointer" }}
              onClick={() => handleStoryClick(story)} // Open modal on story click
            >
              <Avatar src={story.media || "/default-avatar.png"} />
              <AppDiv sx={{ ml: 1 }}>
                <AppLabel sx={{ textAlign: "start" }}>{story.title}</AppLabel>
                <Appcaption sx={{ textAlign: "start" }}>
                  {new Date(story.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </Appcaption>
              </AppDiv>
            </AppDiv>
          ))
        ) : (
          <Appfont>No stories available</Appfont>
        )}

        {/* See All Button */}
        {!showAll && stories.length > 3 && (
          <AppButton
            sx={{
              height: 40,
              mt: 3,
              background: "#F4FDFF",
              color: "#27CEF8",
              textTransform: "uppercase",
            }}
            fullWidth
            color="primary"
            onClick={handleSeeAllClick}
          >
            See All
          </AppButton>
        )}
      </AppDiv>

      {/* Modal to Display Story */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseModal}
            aria-label="close"
            sx={{ position: "absolute", top: 10, right: 10 }}
          >
            <CloseIcon />
          </IconButton>
          {selectedStory && (
            <AppDiv
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={selectedStory.media}
                alt={selectedStory.title}
                style={{ width: "100%", maxHeight: "60vh", objectFit: "contain" }}
              />
              <Appfont sx={{ mt: 2 }}>{selectedStory.title}</Appfont>
              <Appcaption sx={{ mt: 1 }}>
                {new Date(selectedStory.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </Appcaption>
            </AppDiv>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StoriesCard;
