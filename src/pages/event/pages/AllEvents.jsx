import React from 'react';
import { Grid, Select, MenuItem } from '@mui/material';
import AppDiv from "../../../components/atoms/AppDiv";
import { PaperStyle } from "../../../utils/styles";
import SearchSidebar from "../components/SearchSidebar";
import { Appcaption, Appfont, Appheading } from "./../../../utils/theme/index";
import { AppButton } from "../../../components/atoms/AppButton";
import AppIconButton from "../../../components/atoms/AppIconButton";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareIcon from "@mui/icons-material/Share";
import { secondary } from "../../../utils/theme/colors";
import PlaceIcon from "@mui/icons-material/Place";
import useCrypto from "../../../utils/hooks/encrypt";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import userPng from "../../../assets/images/user.png"
const AllEvents = () => {
  const { decryptedData } = useCrypto();
  const url = import.meta.env.VITE_BASE_URL;
  const authenticatedUserId = decryptedData?.user?.id;

  const [sortBy, setSortBy] = React.useState("");
  const [allEventsList, setAllEventsList] = React.useState([]);
  const [sortedEventsList, setSortedEventsList] = React.useState([]);

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
        setSortedEventsList(response.data.data); // Initially display all events
      } else {
        throw new Error("Failed to fetch events");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleFilterChange = (filters) => {
    let filteredEvents = [...allEventsList];
    console.log(filters);

    if (filters.dateRange.startDate) {
      filteredEvents = filteredEvents.filter(event =>
        new Date(event.start_date) >= new Date(filters.dateRange.startDate)
      );
    }
    if (filters.dateRange.endDate) {
      filteredEvents = filteredEvents.filter(event =>
        new Date(event.end_date) <= new Date(filters.dateRange.endDate)
      );
    }
    if (filters.followers) {
      filteredEvents = filteredEvents.filter(event =>
        event.follower_list.length >= filters.followers
      );
    }

    if (filters.location) {
      filteredEvents = filteredEvents.filter(event =>
        event.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    console.log(filteredEvents);

    setSortedEventsList(filteredEvents);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSortBy(value);
    sortEvents(value);
  };

  const sortEvents = (criteria) => {
    let sortedList = [...sortedEventsList];
    if (criteria === "popularity") {
      sortedList.sort((a, b) => b.follower_list?.length - a.follower_list?.length);
    } else if (criteria === "lastUpdated") {
      sortedList.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    }
    setSortedEventsList(sortedList);
  };

  React.useEffect(() => {
    getAllEvents(); // Fetch events initially without filters
  }, [decryptedData]);

  const handleFollowEvent = async (eventId) => {
    try {
      const token = decryptedData?.tokens?.access?.token;
      if (!token) {
        throw new Error("No token found in local storage");
      }
      const response = await axios.post(
        `${url}/event/follow`,
        { event_id: eventId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        // Update event follower list in local state
        setAllEventsList((prevList) =>
          prevList.map(event =>
            event.id === eventId
              ? { ...event, follower_list: [...event.follower_list, authenticatedUserId] }
              : event
          )
        );
        setSortedEventsList((prevList) =>
          prevList.map(event =>
            event.id === eventId
              ? { ...event, follower_list: [...event.follower_list, authenticatedUserId] }
              : event
          )
        );
      } else {
        throw new Error("Failed to Follow Event");
      }
    } catch (error) {
      console.error("Error following Event: ", error);
      toast.error("Failed to follow Event. Please try again.");
    }
  };

  const handleUnfollowEvent = async (eventId) => {
    try {
      const token = decryptedData?.tokens?.access?.token;
      if (!token) {
        throw new Error("No token found in local storage");
      }
      const response = await axios.post(
        `${url}/event/un-follow`,
        { event_id: eventId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        // Update event follower list in local state
        setAllEventsList((prevList) =>
          prevList.map(event =>
            event.id === eventId
              ? { ...event, follower_list: event.follower_list.filter(id => id !== authenticatedUserId) }
              : event
          )
        );
        setSortedEventsList((prevList) =>
          prevList.map(event =>
            event.id === eventId
              ? { ...event, follower_list: event.follower_list.filter(id => id !== authenticatedUserId) }
              : event
          )
        );
      } else {
        throw new Error("Failed to Un-Follow Event");
      }
    } catch (error) {
      console.error("Error Un-Following Event: ", error);
      toast.error("Failed to Un-Follow Event. Please try again.");
    }
  };

  return (
    <>
      <Grid container mt={8}>
        <Grid
          item
          xs={12}
          md={2.5}
          sx={{ background: "white", p: 2.5, width: { xs: "100%", lg: 300 } }}
        >
          <AppDiv
            sx={{
              ...PaperStyle,
              background: "white",
              p: 2.5,
              borderRadius: "none",
              width: {
                lg: 300,
                xs: "100%",
              },
            }}
          >
            <SearchSidebar onFilterChange={handleFilterChange} /> 
            
          </AppDiv>
        </Grid>
        <Grid item xs={12} md={9.3} className="px-6 md:px-10 py:10">
          {/* heading */}
          <AppDiv
            sx={{
              display: "flex",
              justifyContent: {
                lg: "space-between",
                xs: "space-around",
              },
              alignItems: "center",
              width: {
                xs: "100%",
              },
              mt: 5,
            }}
          >
            <Appheading sx={{ textAlign: "left" }}>Events</Appheading>
            <Select
              value={sortBy}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Sort By" }}
              variant="outlined"
              sx={{
                border: "1px solid #ffffff",
                borderRadius: 4,
                marginLeft: 2,
                height: 40,
                marginRight: 2,
                width: 180,
                fontSize: 12,
              }}
            >
              <MenuItem sx={{ fontSize: 12 }} value="" disabled>
                Sort By: Default
              </MenuItem>
              <MenuItem sx={{ fontSize: 12 }} value="popularity">
                High Followers
              </MenuItem>
              <MenuItem sx={{ fontSize: 12 }} value="lastUpdated">
                Last Updated
              </MenuItem>
              {/* Add more sorting options here if needed */}
            </Select>
          </AppDiv>
          {/* card */}
          <div className="flex flex-col gap-7.5 mt-7.5">
            {sortedEventsList.map((event) => {
              const startDate = new Date(event.start_date);
              const month = startDate.toLocaleString("default", {
                month: "long",
              });
              const date = startDate.getDate();
              return (
                <Link key={event.id} to={`/event/${event.id}`}>
                  <AppDiv
                    sx={{
                      ...PaperStyle,
                      backgroundColor: "white",
                      width: "100%",
                      display: "flex",
                      justifyContent: { xs: "center", lg: "space-between" },
                      flexWrap: "wrap",
                      p: 2,
                      cursor: "pointer",
                      border: "2px solid transparent",
                      ":hover": {
                        backgroundColor: "#FFFCF3",
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
                        width={200}
                        style={{ borderRadius: "10px" }}
                        src={event.image}
                        alt={event.name}
                      />
                      <AppDiv sx={{ ml: 2 }}>
                        <Appfont sx={{ textAlign: "left" }}>
                          <b>{event.name}</b>
                        </Appfont>
                        <AppDiv sx={{ display: "flex", mt: 1, mb: 1 }}>
                          <Appfont> {event.details}</Appfont>
                          <Appcaption sx={{ ml: 1 }}>
                            {event.location}
                          </Appcaption>
                          <PlaceIcon fontSize="small" sx={{ ml: 1 }} />
                        </AppDiv>
                        <AppDiv sx={{ display: "flex", mt: 1 }}>
      {event.follower_details.map((follower, index) => (
        <img
          key={index}
          src={follower?.image || userPng} // Replace with a placeholder URL
          alt={follower?.name || 'Follower'}
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            marginLeft: index > 0 ? -10 : 0 // Overlap images slightly
          }}
        />
      ))}
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
                        {month}
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
                        <b>{date}</b>
                      </Appfont>
                      <AppButton
                        sx={{ backgroundColor: "#F83C4D", width: 100 }}
                        variant="contained"
                        color="error"
                        onClick={() => {
                          if (event.follower_list.includes(authenticatedUserId))
                            handleUnfollowEvent(event.id);
                          else handleFollowEvent(event.id);
                        }}
                      >
                        {event.follower_list.includes(authenticatedUserId)
                          ? "Unfollow"
                          : "Follow"}
                      </AppButton>
                      <AppIconButton
                        sx={{ border: "1px solid #E2E2EA", mr: 1, ml: 1 }}
                      >
                        <BookmarkIcon fontSize="small" />
                      </AppIconButton>
                      <AppIconButton sx={{ border: `1px solid #E2E2EA` }}>
                        <ShareIcon fontSize="small" />
                      </AppIconButton>
                    </AppDiv>
                  </AppDiv>
                </Link>
              );
            })}
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default AllEvents;
