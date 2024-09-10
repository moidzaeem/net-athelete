import { useState } from "react";
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

const EventCalendar = () => {
  const [sortBy, setSortBy] = useState("");
  const [value, onChange] = useState(new Date());

  const handleChange = (event) => {
    setSortBy(event.target.value);
    // You can perform sorting logic here based on the selected value
  };

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
          <AppDiv
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 4,
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((items) => {
              return (
                <AppDiv
                  key={items}
                  sx={{
                    height: 80,
                    width: 80,
                    background: "#E9E9E9",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 4,
                  }}
                >
                  <Appheading>{items}</Appheading>
                  <Appfont sx={{ color: "red" }}>
                    <b>Mon</b>
                  </Appfont>
                </AppDiv>
              );
            })}
          </AppDiv>
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
          {/* the card */}
          {[1, 2, 3].map((items) => {
            return (
              <AppDiv
                key={items}
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
                    src="https://img.freepik.com/free-photo/success-grass-soccer-ball-generated-by-ai_188544-9819.jpg"
                    alt=""
                  />
                  <AppDiv sx={{ display: "block", alignItems: "center" }}>
                    <Appfont sx={{ textAlign: "left", ml: 2 }}>
                      Indonesia Creative Job Fair 2019
                    </Appfont>
                    <AppDiv sx={{ display: "flex", alignItems: "center" }}>
                      <RoomIcon
                        sx={{ color: "grey", ml: 1 }}
                        fontSize="small"
                      />
                      <Appfont sx={{ mr: 1, ml: 1 }}>
                        Grand Sarila Hotel
                      </Appfont>
                      <Appcaption>Jakarta, Indonesia</Appcaption>
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
                    Sport Name
                  </AppButton>
                </AppDiv>
              </AppDiv>
            );
          })}
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
          {/* first box */}
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
          {/* second box */}
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
            {[1, 2, 3, 4, 5, 6].map((items) => {
              return (
                <AppDiv
                  key={items}
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
                      src="https://img.freepik.com/free-photo/success-grass-soccer-ball-generated-by-ai_188544-9819.jpg"
                      alt=""
                    />
                    <AppDiv sx={{ ml: 2 }}>
                      <Appfont sx={{ textAlign: "left" }}>
                        <b>Indonesia Creative Job Fair 2019</b>{" "}
                      </Appfont>
                      <AppDiv sx={{ display: "flex", mt: 1, mb: 1 }}>
                        <Appfont> Grand Sarila Hotel</Appfont>
                        <Appcaption sx={{ ml: 1 }}>
                          Jakarta, Indonesia
                        </Appcaption>
                        <PlaceIcon fontSize="small" sx={{ ml: 1 }} />
                      </AppDiv>
                      <AppDiv sx={{ display: "flex" }}>
                        <img src="/Member.svg" alt="" />
                        <Appcaption sx={{ ml: 2 }}>5 Friends Join</Appcaption>
                      </AppDiv>
                      <AppDiv
                        sx={{ display: "flex", alignItems: "center", mt: 1 }}
                      >
                        <Appcaption>E-commerce, Design</Appcaption>
                        <Appcaption sx={{ ml: 2 }}>
                          <b>158</b>
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
                      APR
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
                      <b> 27</b>
                    </Appfont>
                    <AppButton
                      sx={{ backgroundColor: "#FFC542", width: 100 }}
                      variant="contained"
                      color="warning"
                    >
                      Follow
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
              );
            })}
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
