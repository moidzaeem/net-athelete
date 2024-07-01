import AppDiv from "../../../components/atoms/AppDiv";
import { AppLabel, Appcaption } from "../../../utils/theme";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { gamma, secondary } from "../../../utils/theme/colors";
import { Avatar, Divider, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Appfont } from "./../../../utils/theme/index";
import { AppButton } from "../../../components/atoms/AppButton";
import { PaperStyle } from "../../../utils/styles";

const StoriesCard = () => {
  return (
    <AppDiv
      sx={{
        ...PaperStyle,
        width: "100%",
        background: "white",
        p: 2,
      }}
    >
      {/* three dot */}
      <AppDiv sx={{ display: "flex", justifyContent: "space-between" }}>
        <AppLabel> Sosmed Stories</AppLabel>
        <MoreHorizIcon sx={{ color: secondary }} />
      </AppDiv>
      <Divider sx={{ my: 2 }} />
      {/* three dot end */}
      <AppDiv sx={{ display: "flex", alignItems: "flex-start" }}>
        <IconButton sx={{ background: "white", border: "1px solid #F3F3F3" }}>
          <AddIcon sx={{ color: gamma }} />
        </IconButton>
        <AppDiv sx={{ ml: 1 }}>
          <Appfont sx={{ textAlign: "start" }}>Create Your Story</Appfont>
          <Appcaption sx={{ textAlign: "start" }}>Click button beside to create yours.</Appcaption>
        </AppDiv>
      </AppDiv>
      {/* avatar */}
      {[1, 2, 3].map((items) => {
        return (
          <div key={items}>
            <AppDiv sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <Avatar src="/avatar.svg" />
              <AppDiv sx={{ ml: 1, mt: 1 }}>
                <AppLabel sx={{ textAlign: "start" }}>Mbappe</AppLabel>
                <Appcaption sx={{ textAlign: "start" }}>12 April at 09.28 PM</Appcaption>
              </AppDiv>
            </AppDiv>
          </div>
        );
      })}
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
      >
        See All
      </AppButton>
    </AppDiv>
  );
};

export default StoriesCard;
