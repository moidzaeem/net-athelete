import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { PaperStyle } from "../../../utils/styles/index";
import AppDiv from "../../../components/atoms/AppDiv";
import { Appcaption, Appfont, Appheading } from "../../../utils/theme";
import AppSearchBar from "../../../components/molecules/AppSearchBar";
import { gamma, secondary } from "../../../utils/theme/colors";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import RoomIcon from "@mui/icons-material/Room";
import { AppButton } from "../../../components/atoms/AppButton";
import { Select, MenuItem } from "@mui/material";
import AppIconButton from "../../../components/atoms/AppIconButton";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareIcon from "@mui/icons-material/Share";
import PlaceIcon from "@mui/icons-material/Place";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import EventModal from "../components/CreateModal";
import useCrypto from "../../../utils/hooks/encrypt";

const EventCalendar = () => {
  const [sortBy, setSortBy] = useState("");
  const [value, onChange] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [todayEvents, setTodayEvents] = useState([]);
  const [futureEvents, setFutureEvents] = useState([]);
  const { decryptedData } = useCrypto();
  const url = import.meta.env.VITE_BASE_URL;
  const authenticatedUserId = decryptedData?.user?.id;

  const handleChange = (event) => {
    setSortBy(event.target.value);
    // You can perform sorting logic here based on the selected value
  };

  const fetchEvents = async () => {
    const token = decryptedData?.tokens?.access?.token;
    console.log(token);
    if (!token) {
      throw new Error("No token found in local storage");
    }

    try {
      const response = await axios.get(`${url}/event/get-all-events`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });      const fetchedEvents = response.data.data;
      
      // Filter today's events
      const today = new Date();
      const todayFiltered = fetchedEvents.filter((event) => {
        const eventDate = new Date(event.start_date); // Assuming event.date is the event date
        return eventDate.toDateString() === today.toDateString();
      });

      // Filter future events
      const futureFiltered = fetchedEvents.filter((event) => {
        const eventDate = new Date(event.start_date);
        return eventDate > today;
      });

      setEvents(fetchedEvents);
      setTodayEvents(todayFiltered);
      setFutureEvents(futureFiltered);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    if (decryptedData && decryptedData.tokens && decryptedData.tokens.access) {
      fetchEvents();
    }
  }, [decryptedData]);
  

  return (
    <Grid container spacing={2}>
      {/* First Column */}
      <Grid
        item
        xs={12}
        lg={6}
        sx={{
          ...PaperStyle,
          background: "white",
          borderRadius: "none",
        }}
      >
        <AppDiv
          sx={{
            p: {
              lg: 4,
              xs: 2,
            },
          }}
        >
          <AppDiv
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Appheading sx={{ textAlign: "left", width: 210 }}>
              Weekly Calendar
            </Appheading>
            <AppSearchBar />
          </AppDiv>
          <AppDiv
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 4,
            }}
          >
            <Appfont sx={{ textAlign: "left", fontSize: 18, color: gamma }}>
              April 2024
            </Appfont>
            <AppDiv sx={{ display: "flex" }}>
              <WestIcon sx={{ color: gamma }} />
              <EastIcon sx={{ ml: 2, color: gamma }} />
            </AppDiv>
          </AppDiv>

          {/* Today's Events */}
          <AppDiv
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 3,
              flexWrap: "wrap",
            }}
          >
            <Appheading sx={{ textAlign: "left", width: 210 }}>
              Today’s Event
            </Appheading>
          </AppDiv>
          {todayEvents.map((event, index) => (
            <AppDiv
              key={index}
              sx={{
                mt: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: {
                  lg: "center",
                  xs: "stretch",
                },
                border: "1px solid wheat",
                p: 2,
                borderRadius: 4,
                ":hover": {
                  backgroundColor: "",
                  border: "2px solid #FFC542",
                },
                flexDirection: {
                  lg: "row",
                  xs: "column",
                },
                gap: 2,
              }}
            >
              <AppDiv sx={{ display: "flex", alignItems: "center" }}>
                <img
                  width={150}
                  style={{ borderRadius: "12px" }}
                  src={event.image}
                  alt={event.title}
                />
                <AppDiv sx={{ display: "block", alignItems: "center" }}>
                  <Appfont sx={{ textAlign: "left", ml: 2 }}>
                    {event.title}
                  </Appfont>
                  <AppDiv sx={{ display: "flex", alignItems: "center" }}>
                    <RoomIcon
                      sx={{ color: "grey", ml: 1 }}
                      fontSize="small"
                    />
                    <Appfont sx={{ mr: 1, ml: 1 }}>
                      {event.location.name}
                    </Appfont>
                    <Appcaption>{event.location.city}, {event.location.country}</Appcaption>
                  </AppDiv>
                </AppDiv>
              </AppDiv>
              <AppDiv>
                <AppButton
                  variant="contained"
                  fullWidth
                  color="primary"
                  sx={{ background: gamma }}
                >
                  {event.category}
                </AppButton>
              </AppDiv>
            </AppDiv>
          ))}
        </AppDiv>
      </Grid>

      {/* Second Column */}
      <Grid
        item
        xs={12}
        lg={6}
        sx={{
          ...PaperStyle,
          borderRadius: "none",
        }}
      >
        <AppDiv>
          <AppDiv sx={alingItem}>
            <Appheading>Calendar of the Month</Appheading>
            <EventModal />
          </AppDiv>
          <AppDiv>
            <Calendar
              style={{ width: "100%" }}
              onChange={onChange}
              value={value}
            />
          </AppDiv>

          {/* Future Events */}
          <AppDiv sx={{ ...alingItem, mt: 10 }}>
            <Appheading sx={{ textAlign: "left", width: 210 }}>
              Events to Come
            </Appheading>
            <Select
              value={sortBy}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Sort By" }}
              variant="outlined"
              sx={{
                border: "1px solid #dcdcdd",
                borderRadius: 4,
                marginLeft: 2,
                height: 40,
                marginRight: 2,
                width: 150,
                fontSize: 12,
              }}
            >
              <MenuItem sx={{ fontSize: 12 }} value="" disabled>
                Sort By: Default
              </MenuItem>
              <MenuItem sx={{ fontSize: 12 }} value="popularity">
                Popularity
              </MenuItem>
              {/* Add more sorting options here if needed */}
            </Select>
          </AppDiv>
          <AppDiv>
            {futureEvents.map((event, index) => (
              <AppDiv
                key={index}
                sx={{
                  display: "flex",
                  mt: 3,
                  ...PaperStyle,
                  background: "white",
                  p: 2,
                  width: "100%",
                  justifyContent: {
                    lg: "space-between",
                    xs: "center",
                  },
                  flexWrap: "wrap",
                  cursor: "pointer",
                  backgroundColor: "white",
                  ":hover": {
                    backgroundColor: "",
                    border: "2px solid #FFC542",
                  },
                }}
              >
                <AppDiv
                  sx={{
                    display: "flex",
                    flexDirection: {
                      md: "row",
                      xs: "column",
                    },
                  }}
                >
                  <img
                    width={"150px"}
                    style={{ borderRadius: "10px" }}
                    src={event.image}
                    alt={event.title}
                  />
                  <AppDiv sx={{ ml: 2 }}>
                    <Appfont sx={{ textAlign: "left" }}>
                      <b>{event.title}</b>{" "}
                    </Appfont>
                    <AppDiv sx={{ display: "flex", mt: 1, mb: 1 }}>
                      <Appfont>{event.location}</Appfont>
                    
                      <PlaceIcon fontSize="small" sx={{ ml: 1 }} />
                    </AppDiv>
                    <AppDiv sx={{ display: "flex" }}>
                      <Appcaption sx={{ ml: 2 }}>{event.follower_list.length} People Join</Appcaption>
                    </AppDiv>
                    <AppDiv
                      sx={{ display: "flex", alignItems: "center", mt: 1 }}
                    >
                      <Appcaption>{event.category}</Appcaption>
                      <Appcaption sx={{ ml: 2 }}>
                        <b>{event.attendees}</b>
                      </Appcaption>
                    </AppDiv>
                  </AppDiv>
                </AppDiv>
                <AppDiv>
                  <Appfont
                    sx={{
                      textAlign: {
                        lg: "end",
                        xs: "center",
                      },
                      color: secondary,
                    }}
                  >
                    {event.dateMonth}
                  </Appfont>
                  <Appfont
                    sx={{
                      color: "#27CEF8",
                      fontSize: 20,
                      textAlign: {
                        lg: "end",
                        xs: "center",
                      },
                      mb: 2,
                      mt: 2,
                    }}
                  >
                    <b>{event.dateDay}</b>
                  </Appfont>
                  <AppButton
                    sx={{ backgroundColor: "#FFC542", width: 100 }}
                    variant="contained"
                    color="warning"
                  >
                    Follow
                  </AppButton>
                  {/* <AppIconButton
                    sx={{ border: "1px solid #E2E2EA", mr: 1, ml: 1 }}
                  >
                    <BookmarkIcon fontSize="small" />
                  </AppIconButton>
                  <AppIconButton sx={{ border: `1px solid #E2E2EA` }}>
                    <ShareIcon fontSize="small" />
                  </AppIconButton> */}
                </AppDiv>
              </AppDiv>
            ))}
          </AppDiv>
        </AppDiv>
      </Grid>
    </Grid>
  );
};

export default EventCalendar;

const alingItem = {
  display: "flex",
  justifyContent: {
    lg: "space-between",
    xs: "space-evenly",
  },
  alignItems: "center",
  mt: 3,
  mb: 3,
};
