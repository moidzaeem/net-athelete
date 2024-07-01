import AppDiv from "../../../components/atoms/AppDiv";
import AppIconButton from "../../../components/atoms/AppIconButton";
import ActiveAvatar from "../../../components/molecules/ActiveAvatar";
import { PaperStyle } from "../../../utils/styles";
import searchlogo from "../../../assets/svg/search.svg";
import VideocamIcon from "../../../assets/svg/videocall.svg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import callicon from "../../../assets/svg/call.svg";
import { Appcaption, Appfont } from "../../../utils/theme";
import doubleTick from "../../../assets/svg/doubletick.svg";
import { TextField } from "@mui/material";
import attach from "../../../assets/svg/attach.svg";
import mic from "../../../assets/svg/mic.svg";
import sendIcon from "../../../assets/svg/sendicon.svg";
import { gamma } from "../../../utils/theme/colors";
import happy from "../../../assets/svg/emoji-happy.svg";
const ChatLayout = () => {
  return (
    <AppDiv
      sx={{
        ...PaperStyle,
        width: "100%",
        background: "#F3F3F3",
        p: 0,
        borderRadius: 0,
      }}
    >
      <AppDiv
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "white",
          p: 2,
        }}
      >
        <ActiveAvatar />

        <AppDiv sx={{ display: "flex", alignItems: "center" }}>
          <AppIconButton sx={{ border: "1px solid #F3F3F3" }}>
            <img src={searchlogo} alt="" />
          </AppIconButton>
          <AppIconButton>
            <img src={callicon} alt="" />
          </AppIconButton>
          <AppIconButton>
            <img src={VideocamIcon} alt="" />
          </AppIconButton>
          <AppIconButton>
            <MoreVertIcon />
          </AppIconButton>
        </AppDiv>
      </AppDiv>
      <AppDiv height={30} />
      <AppDiv sx={{ p: 4 }}>
        <Appfont
          sx={{
            textAlign: "left",
            background: "white",
            p: 2,
            borderRadius: 2,
            border: "1px solid #F3F3F3",
          }}
        >
          For the zoom meeting link, we will add you on Google Calendar <br /> that is connected
          with your google account. <br /> Good Luck! 🤩
        </Appfont>
        <Appcaption sx={{ textAlign: "left" }}>4:32 Am</Appcaption>
      </AppDiv>

      <AppDiv sx={{ m: 0, display: "flex", justifyContent: "flex-end" }}>
        <Appfont
          sx={{
            p: 2,
            borderRadius: 2,
            border: "1px solid #25C5F7",
            background: "#25C5F7",
            color: "white",
            textAlign: "center",
            width: "350px",
          }}
        >
          Uwaa! Thank you so much. I’ll do my best mate! 🔥
        </Appfont>
      </AppDiv>

      <AppDiv
        sx={{
          textAlign: "right",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <img src={doubleTick} alt="" />
        <Appcaption sx={{ ml: 1 }}>4:32 Am</Appcaption>
      </AppDiv>
      <AppDiv height={150} />
      <AppDiv sx={{ display: "flex", alignItems: "center", p: 2, width: "100%" }}>
        <AppDiv
          sx={{ display: "flex", background: "white", height: 50, alignItems: "center", pl: 1 }}
        >
          <img src={happy} alt="" />
        </AppDiv>
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
          inputProps={{ style: { fontSize: 12, background: "white" } }}
          variant="outlined"
          placeholder={"What’s on your mind?"}
          fullWidth
          InputProps={{
            endAdornment: (
              <AppDiv
                sx={{
                  display: "flex",
                  background: "white",
                  height: 50,
                  alignItems: "center",
                  pr: 1,
                }}
              >
                <AppIconButton>
                  <img src={attach} style={{ width: 16 }} alt="" />
                </AppIconButton>
                <AppIconButton>
                  <img src={mic} style={{ width: 16 }} alt="" />
                </AppIconButton>
                <AppIconButton sx={{ backgroundColor: gamma }}>
                  <img src={sendIcon} style={{ width: 16 }} alt="" />
                </AppIconButton>
              </AppDiv>
            ),
          }}
        />
      </AppDiv>
    </AppDiv>
  );
};

export default ChatLayout;
