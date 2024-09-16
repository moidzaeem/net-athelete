import AppDiv from "../../../components/atoms/AppDiv";
import { AppLabel, Appcaption } from "../../../utils/theme";
import { Avatar, Divider } from "@mui/material";
import { Appfont } from "./../../../utils/theme/index";
import { AppButton } from "../../../components/atoms/AppButton";
import { PaperStyle } from "../../../utils/styles";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

const SuggestionCard = () => {
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
      <AppDiv
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <AppLabel>Suggested Pages</AppLabel>
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
      {/* three dot end */}
      <AppDiv sx={{ display: "flex", alignItems: "flex-start" }}>
        <Avatar src="/src/assets/svg/light.svg" />
        <AppDiv sx={{ ml: 1 }}>
          <Appfont sx={{ textAlign: "start" }}>Sebo Studio</Appfont>
          <Appcaption sx={{ textAlign: "start" }}>Design Studio</Appcaption>
        </AppDiv>
      </AppDiv>

      <AppButton
        startIcon={<ThumbUpOutlinedIcon />}
        sx={{
          height: 40,
          mt: 3,
          color: "#44444F",
          textTransform: "uppercase",
        }}
        fullWidth
        color="primary"
      >
        Like Page
      </AppButton>
    </AppDiv>
  );
};

export default SuggestionCard;
