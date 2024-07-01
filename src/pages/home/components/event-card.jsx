import AppDiv from "../../../components/atoms/AppDiv";
import { AppLabel } from "../../../utils/theme";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { secondary } from "../../../utils/theme/colors";
import { Divider } from "@mui/material";
import calendericon from "../../../assets/svg/ic_Schedule.svg";
import { PaperStyle } from "../../../utils/styles";

const EventCard = () => {
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
        <AppLabel>Events</AppLabel>
        <MoreHorizIcon sx={{ color: secondary }} />
      </AppDiv>
      <Divider sx={{ my: 2 }} />
      {/* three dot end */}
      {[1, 2, 3].map((items) => {
        return (
          <AppDiv key={items} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <img src={calendericon} />
            <AppLabel sx={{ ml: 1 }}>10 Events Invites</AppLabel>
          </AppDiv>
        );
      })}
    </AppDiv>
  );
};

export default EventCard;
