import { AppButton } from "../../../components/atoms/AppButton";
import AppDiv from "../../../components/atoms/AppDiv";
import AppIconButton from "../../../components/atoms/AppIconButton";
import { Appfont, Appheading } from "../../../utils/theme";
import AddIcon from "@mui/icons-material/Add";
import ButtonGroup from "@mui/material/ButtonGroup";
import { PaperStyle } from "../../../utils/styles";
import ActiveAvatar from "../../../components/molecules/ActiveAvatar";
const MessageSidebar = () => {
  return (
    <AppDiv
      sx={{
        ...PaperStyle,
        width: "100%",
        background: "white",
        p: 2,
      }}
    >
      <AppDiv sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Appheading>Messages</Appheading>
        <AppIconButton style={{ border: "1px solid #F3F3F3" }}>
          <AddIcon />
        </AppIconButton>
      </AppDiv>
      <ButtonGroup
        fullWidth
        variant="contained"
        sx={{ mt: 4, mb: 4 }}
        aria-label="Basic button group"
      >
        <AppButton variant="contained" sx={{ backgroundColor: "#F6F8F9", color: "black" }}>
          Personal
        </AppButton>
        <AppButton variant="contained" sx={{ backgroundColor: "#F6F8F9", color: "black" }}>
          Group
        </AppButton>
        <AppButton variant="contained" sx={{ backgroundColor: "#F6F8F9", color: "black" }}>
          Archive
        </AppButton>
      </ButtonGroup>
      <AppDiv
        sx={{
          height: 200,
          overflow: {
            lg: "visible",
            xs: "scroll",
          },
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((item) => {
          return (
            <AppDiv
              key={item}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid #F3F3F3",
                p: 1,
                borderRadius: 3,
              }}
            >
              <ActiveAvatar key={item} />
              <Appfont>7:30</Appfont>
            </AppDiv>
          );
        })}
      </AppDiv>
    </AppDiv>
  );
};

export default MessageSidebar;
