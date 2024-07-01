import AppDiv from "../../../components/atoms/AppDiv";
import { AppLabel } from "../../../utils/theme";
import { Avatar, Divider, TextField } from "@mui/material";
import { PaperStyle } from "../../../utils/styles";
import gallery from "../../../assets/svg/gallery.svg";
const PostCard = () => {
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
        />
        <img src={gallery} alt="" />
      </AppDiv>
    </AppDiv>
  );
};

export default PostCard;
