import AppDiv from "../../../components/atoms/AppDiv";
import { PaperStyle } from "../../../utils/styles";
import { AppLabel, Appcaption, Appfont } from "../../../utils/theme";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { AppAvatar } from "./../../../components/atoms/AppAvatar";
import AppIconButton from "./../../../components/atoms/AppIconButton";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Avatar, Divider, TextField } from "@mui/material";
import commenticon from "../../../assets/svg/comment.svg";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import { secondary } from "../../../utils/theme/colors";
import gallery from "../../../assets/svg/gallery.svg";
import attach from "../../../assets/svg/attach.svg";
import smile from "../../../assets/svg/smile.svg";
import { useEffect, useState } from "react";
import useCrypto from "../../../utils/hooks/encrypt";
import axios from "axios";

const FeedCard = () => {
  const { decryptedData } = useCrypto();
  const [feedData, setFeedData] = useState([]); // Initialize feedData as an empty array

  const url = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchFeedData = async () => {
      try {
        const token = decryptedData?.tokens?.access?.token; // Get JWT token from local storage
        if (!token) {
          throw new Error('No token found in local storage');
        }
console.log(token)
        const response = await axios.get(
          `${url}/feed`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
          }
        );

        if (response.status === 200) {
          setFeedData(response.data.data.result); // Set fetched data to state
        } else {
          throw new Error('Failed to fetch feed data');
        }
      } catch (error) {
        console.error('Error fetching feed data:', error);
        // Handle error state or notify user of failure
      }
    };

    fetchFeedData();
  }, [decryptedData?.tokens.access.token]);

  console.log(feedData)

  
  // Handle loading state while fetching data
  if (!feedData) {
    return <p>Loading...</p>;
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
      {feedData.map((item, index) => (
        <div key={index}>
          <AppDiv sx={{ display: "flex", alignItems: "flex-start", mt: 1, justifyContent: "space-between" }}>
            <AppAvatar src={item.avatar} />
            <AppDiv sx={{ ml: 1, mt: 1 }}>
              <AppLabel sx={{ textAlign: "start" }}>{item.author}</AppLabel>
              <Appcaption sx={{ textAlign: "start" }}>{new Date(item.createdAt).toLocaleString()}</Appcaption>

            </AppDiv>
            <AppIconButton>
              <MoreHorizOutlinedIcon />
            </AppIconButton>
          </AppDiv>
          <Appfont sx={{ textAlign: "start", mt: 2 }}>
            {item.text}
          </Appfont>
          <Grid container gap={1} sx={{ alignItems: "center", mt: 3 }}>
            <Grid xs={5.5}>
              <img
                style={{ backgroundSize:"cover", width: "100%", height: "400px", borderRadius: "20px" }}
                src={item.media}
                alt=""
              />
            </Grid>
            <Grid xs={5.5}>
              <div>
                <img
                  style={{ backgroundSize:"cover", width: "100%", height: "200px", borderRadius: "20px" }}
                  src={item.media}
                  alt=""
                />
              </div>
              <div>
                <img
                  style={{ backgroundSize:"cover", width: "100%", height: "200px", borderRadius: "20px" }}
                  src={item.media}
                  alt=""
                />
              </div>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />
          <AppDiv sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <AppDiv sx={{ display: "flex" }}>
              <img src={commenticon} alt="" style={{ cursor: "pointer" }} />
              <Appcaption sx={iconSty}> {item.total_comments} Comments</Appcaption>
            </AppDiv>
            <AppDiv sx={{ display: "flex" }}>
              <FavoriteBorderIcon sx={{ color: secondary, cursor: "pointer" }} />
              <Appcaption sx={iconSty}>{item.total_likes} Likes</Appcaption>
            </AppDiv>
            <AppDiv sx={{ display: "flex" }}>
              <ShareIcon sx={{ color: secondary, cursor: "pointer" }} />
              <Appcaption sx={iconSty}>{item.total_shares} Share</Appcaption>
            </AppDiv>
            <AppDiv sx={{ display: "flex" }}>
              <TurnedInIcon sx={{ color: secondary, cursor: "pointer" }} />
              <Appcaption sx={iconSty}>{item.total_saved} Saved</Appcaption>
            </AppDiv>
          </AppDiv>
        </div>
      ))}

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
            border: "1px solid #F1F1F5",
            borderRadius: 3,
          }}
          inputProps={{ style: { fontSize: 12, background: "#FAFAFB" } }}
          variant="outlined"
          placeholder={"What’s on your mind?"}
          fullWidth
          InputProps={{
            endAdornment: (
              <AppDiv sx={{ display: "flex" }}>
                <AppIconButton>
                  <img src={attach} style={{ width: 16 }} alt="" />
                </AppIconButton>
                <AppIconButton>
                  <img src={smile} style={{ width: 16 }} alt="" />
                </AppIconButton>
                <AppIconButton>
                  <img src={gallery} style={{ width: 16 }} alt="" />
                </AppIconButton>
              </AppDiv>
            ),
          }}
        />
      </AppDiv>
    </AppDiv>
  );
};

export default FeedCard;

const iconSty = {
  ml: 2,
  display: {
    md: "block",
    xs: "none",
  },
};
