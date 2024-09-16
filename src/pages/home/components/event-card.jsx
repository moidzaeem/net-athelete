import AppDiv from "../../../components/atoms/AppDiv";
import { AppLabel } from "../../../utils/theme";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { secondary } from "../../../utils/theme/colors";
import { Divider } from "@mui/material";
import calendericon from "../../../assets/svg/ic_Schedule.svg";
import { PaperStyle } from "../../../utils/styles";
import React from "react";
import useCrypto from "../../../utils/hooks/encrypt";
import axios from "axios";

const EventCard = () => {
  const { decryptedData } = useCrypto();
  const url = import.meta.env.VITE_BASE_URL;

  const [allEventsList, setAllEventsList] = React.useState([]);

  React.useEffect(() => {
    const getAllEvents = async () => {
      try {
        const token = decryptedData?.tokens?.access?.token;
        if (!token) {
          throw new Error("No token found in local storage");
        }

        const response = await axios.get(`${url}/event/get-all-events`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setAllEventsList(response.data.data);
        } else {
          throw new Error("Failed to fetch user profile data");
        }
      } catch (error) {
        console.error("Error fetching user profile data:", error);
      }
    };
    getAllEvents();
  }, [decryptedData]);

  console.log("events list has: ", allEventsList);

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
        <AppLabel>Events</AppLabel>
        <MoreHorizIcon sx={{ color: secondary }} />
      </AppDiv>
      <Divider sx={{ my: 2 }} />
      {allEventsList.slice(0, 3).map((event) => {
        const startDate = new Date(event.start_date);
        const formattedStartDate = startDate.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        return (
          <AppDiv
            key={event.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              my: 2,
            }}
          >
            <div className="flex items-center gap-1">
              <img src={calendericon} />
              <AppLabel>{event.name}</AppLabel>
            </div>
            {/* <br /> */}
            {/* <p className="text-xs text-[#000000e6] font-medium">
              {formattedStartDate}
            </p> */}
          </AppDiv>
        );
      })}
    </AppDiv>
  );
};

export default EventCard;
