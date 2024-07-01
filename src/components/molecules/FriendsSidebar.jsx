import { AppLabel, Appcaption } from "../../utils/theme";
import { Avatar } from "@mui/material";
import { PaperStyle } from "../../utils/styles";
import AppDiv from "../atoms/AppDiv";
import { secondary } from "../../utils/theme/colors";

const FriendsSidebar = () => {
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
        <AppLabel sx={{ color: secondary, fontSize: 13, textTransform: "uppercase" }}>
          Friends
        </AppLabel>
      </AppDiv>
      {/* avatar */}
      {[1, 2, 3, 4, 5, 6].map((items) => {
        return (
          <div key={items}>
            <AppDiv
              sx={{ display: "flex", alignItems: "center", mt: 2, justifyContent: "space-between" }}
            >
              <AppDiv
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar src="/avatar.svg" />
                <AppLabel sx={{ textAlign: "start", ml: 1 }}>Morgan</AppLabel>
              </AppDiv>
              <Appcaption sx={{ textAlign: "end" }}>11 min</Appcaption>
            </AppDiv>
          </div>
        );
      })}
      {/* group */}
      <AppDiv sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <AppLabel sx={{ color: secondary, fontSize: 13, textTransform: "uppercase" }}>
          Groups
        </AppLabel>
      </AppDiv>
      {/* avatar */}
      {[1, 2, 3, 4, 5, 6].map((items) => {
        return (
          <div key={items}>
            <AppDiv
              sx={{ display: "flex", alignItems: "center", mt: 2, justifyContent: "space-between" }}
            >
              <AppDiv
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar src="/avatar.svg" />
                <AppLabel sx={{ textAlign: "start", ml: 1 }}>Web Designer</AppLabel>
              </AppDiv>
              <Appcaption sx={{ textAlign: "end" }}>1 hour</Appcaption>
            </AppDiv>
          </div>
        );
      })}
    </AppDiv>
  );
};

export default FriendsSidebar;
