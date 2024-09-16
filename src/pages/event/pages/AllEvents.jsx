/* eslint-disable react/prop-types */
import AppDiv from "../../../components/atoms/AppDiv";
import { PaperStyle } from "../../../utils/styles";
import SearchSidebar from "../components/SearchSidebar";
import { Appcaption, Appfont, Appheading } from "./../../../utils/theme/index";
import {
  Select,
  MenuItem,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Divider,
  List,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { AppButton } from "../../../components/atoms/AppButton";
import AppIconButton from "../../../components/atoms/AppIconButton";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareIcon from "@mui/icons-material/Share";
import { secondary } from "../../../utils/theme/colors";
import PlaceIcon from "@mui/icons-material/Place";
import React from "react";
import useCrypto from "../../../utils/hooks/encrypt";
import axios from "axios";
import { toast } from "react-toastify";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Link } from "react-router-dom";

// const AllEvents = ({ setshowEvents }) => {
const AllEvents = () => {
  const { decryptedData } = useCrypto();
  const url = import.meta.env.VITE_BASE_URL;
  const authenticatedUserId = decryptedData?.user?.id;

  const [sortBy, setSortBy] = React.useState("");
  const [allEventsList, setAllEventsList] = React.useState([]);
  // const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleChange = (event) => {
    setSortBy(event.target.value);
    // You can perform sorting logic here based on the selected value
  };

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

  console.log("all events list has: ", allEventsList);

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
      {/* <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer
          sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" },
          }}
          variant="persistent"
          anchor="left"
          open={drawerOpen}
        >
          <DrawerHeader>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <ChevronLeft />
              <ChevronRight />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil
            expedita dolore modi tempora quaerat accusamus quo fugiat eaque
            voluptates unde, a eligendi voluptatem labore, sint voluptas
            similique! Harum, iusto aperiam?
          </div>
        </Drawer>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
          exercitationem consequatur nihil nostrum mollitia libero magnam
          reprehenderit ex id distinctio quibusdam maxime assumenda facere
          aliquid totam, vitae laudantium iste perferendis?
        </div>
      </Box> */}
      <Grid container mt={8}>
        {/* <Grid
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
          <SearchSidebar />
          </AppDiv>
        </Grid> */}
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
            {allEventsList.map((event, index) => {
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
                        src="https://img.freepik.com/free-photo/success-grass-soccer-ball-generated-by-ai_188544-9819.jpg"
                        alt=""
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
                        <AppDiv sx={{ display: "flex" }}>
                          {/* <img src="/Member.svg" alt="" /> */}
                          <Appcaption sx={{ ml: 2 }}>
                            {event.follower_list?.length} People Join
                          </Appcaption>
                        </AppDiv>
                        {/* <AppDiv
                          sx={{ display: "flex", alignItems: "center", mt: 1 }}
                        >
                          <Appcaption>E-commerce, Design</Appcaption>
                          <Appcaption sx={{ ml: 2 }}>
                            <b>158</b>
                          </Appcaption>
                        </AppDiv> */}
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
