import React, { useState, useEffect } from "react";
import AppDiv from "../../../components/atoms/AppDiv";
import { AppLabel, Appcaption } from "../../../utils/theme";
import { Avatar, Divider, CircularProgress } from "@mui/material";
import { Appfont } from "./../../../utils/theme/index";
import { AppButton } from "../../../components/atoms/AppButton";
import { PaperStyle } from "../../../utils/styles";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import axios from "axios";
import useCrypto from "../../../utils/hooks/encrypt";
import { toast } from "react-toastify";

const SuggestionCard = () => {
  const { decryptedData } = useCrypto();
  const [suggestedPages, setSuggestedPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  useEffect(() => {
    const fetchSuggestedPages = async () => {
      try {
        const url = import.meta.env.VITE_BASE_URL;
        const token = decryptedData?.tokens?.access?.token;

        console.log("Decrypted Data:", decryptedData); // Debugging
        console.log("Token:", token); // Debugging

        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get(`${url}/group/get-all-groups`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setSuggestedPages(response.data.data || []);
        } else {
          throw new Error("Failed to fetch user profile data");
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestedPages();
  }, [decryptedData]); // Dependency array

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <AppDiv
      sx={{
        ...PaperStyle,
        width: "100%",
        background: "white",
        p: 2,
      }}
    >
      {/* Header */}
      <AppDiv
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <AppLabel>Suggested Pages</AppLabel>
        {/* Optional See All Button */}
        {/* <AppButton
          sx={{
            background: "#F4FDFF",
            color: "#27CEF8",
            textTransform: "uppercase",
          }}
          color="primary"
        >
          See All
        </AppButton>{" "} */}
      </AppDiv>
      <Divider sx={{ my: 2 }} />
      {/* Content */}
      {suggestedPages.length ? (
        suggestedPages.slice(0,1).map((page) => (
          <AppDiv
            key={page.id}
            sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}
          >
            <Avatar src={page.cover_pic} />
            <AppDiv sx={{ ml: 1 }}>
              <Appfont sx={{ textAlign: "start" }}>{page.name}</Appfont>
              <Appcaption sx={{ textAlign: "start" }}>
                {formatDate(page.createdAt)}
              </Appcaption>
            </AppDiv>
            {/* <AppButton
              startIcon={<ThumbUpOutlinedIcon />}
              sx={{
                height: 40,
                ml: "auto",
                color: "#44444F",
                textTransform: "uppercase",
              }}
              color="primary"
            >
              Like Page
            </AppButton> */}
          </AppDiv>
        ))
      ) : (
        <Appfont>No suggested pages available</Appfont>
      )}
    </AppDiv>
  );
};

export default SuggestionCard;
