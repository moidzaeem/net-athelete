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

const FeedCard = () => {
  return (
    <AppDiv
      sx={{
        ...PaperStyle,
        width: "100%",
        background: "white",
        p: 2,
      }}
    >
      <AppDiv
        sx={{ display: "flex", alignItems: "flex-start", mt: 1, justifyContent: "space-between" }}
      >
        <AppDiv sx={{ display: "flex", alignItems: "flex-start" }}>
          <AppAvatar src="/avatar.svg" />
          <AppDiv sx={{ ml: 1, mt: 1 }}>
            <AppLabel sx={{ textAlign: "start" }}>Mbappe</AppLabel>
            <Appcaption sx={{ textAlign: "start" }}>12 April at 09.28 PM</Appcaption>
          </AppDiv>
        </AppDiv>
        <AppIconButton>
          <MoreHorizOutlinedIcon />
        </AppIconButton>
      </AppDiv>
      <Appfont sx={{ textAlign: "start", mt: 2 }}>
        Planning a trip to see the northern lights in Norway is an excellent choice, as Norway
        offers some of the best opportunities to witness this natural phenomenon. suggested
        itinerary for a 3-day trip:
      </Appfont>
      <Grid container gap={1} sx={{ alignItems: "center", mt: 3 }}>
        <Grid xs={5.5}>
          <img
            style={{ width: "100%", height: "400px", borderRadius: "20px" }}
            src="https://e1.pxfuel.com/desktop-wallpaper/750/328/desktop-wallpaper-b-a-d-r-on-twitter-mbappe-psg-2022-thumbnail.jpg"
            alt=""
          />
        </Grid>
        <Grid xs={5.5}>
          {" "}
          <div>
            <img
              style={{ width: "100%", height: "200px", borderRadius: "20px" }}
              src="https://play-lh.googleusercontent.com/oht1RD5yMCy8Mc6nC0eaTqDrPvH5OmbcqI2SvkqiwsdjQPlVI0BOKnIqZ2_Oih_ejEk"
              alt=""
            />
          </div>
          <div>
            <img
              style={{ width: "100%", height: "200px", borderRadius: "20px" }}
              src="https://i.pinimg.com/originals/e3/59/8f/e3598f1283690433dd47166a69a290e5.gif"
              alt=""
            />
          </div>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />
      <AppDiv sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <AppDiv sx={{ display: "flex" }}>
          <img src={commenticon} alt="" style={{ cursor: "pointer" }} />
          <Appcaption sx={iconSty}> 25 Comments</Appcaption>
        </AppDiv>
        <AppDiv sx={{ display: "flex" }}>
          <FavoriteBorderIcon sx={{ color: secondary, cursor: "pointer" }} />
          <Appcaption sx={iconSty}>120k Likes</Appcaption>
        </AppDiv>
        <AppDiv sx={{ display: "flex" }}>
          <ShareIcon sx={{ color: secondary, cursor: "pointer" }} />
          <Appcaption sx={iconSty}>231 Share</Appcaption>
        </AppDiv>
        <AppDiv sx={{ display: "flex" }}>
          <TurnedInIcon sx={{ color: secondary, cursor: "pointer" }} />
          <Appcaption sx={iconSty}>12 Saved</Appcaption>
        </AppDiv>
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
