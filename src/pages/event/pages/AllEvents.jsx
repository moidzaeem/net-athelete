/* eslint-disable react/prop-types */
import AppDiv from "../../../components/atoms/AppDiv";
import { PaperStyle } from "../../../utils/styles";
import SearchSidebar from "../components/SearchSidebar";
import { Appcaption, Appfont, Appheading } from "./../../../utils/theme/index";
import { useState } from "react";
import { Select, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid";
import { AppButton } from "../../../components/atoms/AppButton";
import AppIconButton from "../../../components/atoms/AppIconButton";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareIcon from "@mui/icons-material/Share";
import { secondary } from "../../../utils/theme/colors";
import PlaceIcon from "@mui/icons-material/Place";

const AllEvents = ({ setshowEvents }) => {
  const [sortBy, setSortBy] = useState("");

  const handleChange = (event) => {
    setSortBy(event.target.value);
    // You can perform sorting logic here based on the selected value
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={2.5}>
        <AppDiv
          sx={{
            ...PaperStyle,
            background: "white",
            p: 2,
            borderRadius: "none",
            width: {
              lg: 300,
              xs: "100%",
            },
          }}
        >
          <SearchSidebar />
        </AppDiv>
      </Grid>
      <Grid item xs={12} md={9.3}>
        {/* heading */}
        <AppDiv
          sx={{
            display: "flex",
            justifyContent: {
              lg: "space-between",
              xs: "space-around",
            },
            width: {
              lg: "60%",
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
              Popularity
            </MenuItem>
            {/* Add more sorting options here if needed */}
          </Select>
        </AppDiv>
        {/* card */}
        {[1, 2, 3, 4, 5, 6].map((items) => {
          return (
            <AppDiv
              onClick={() => setshowEvents("eventcalender")}
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
                  width={200}
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
                    <Appcaption sx={{ ml: 1 }}>Jakarta, Indonesia</Appcaption>
                    <PlaceIcon fontSize="small" sx={{ ml: 1 }} />
                  </AppDiv>
                  <AppDiv sx={{ display: "flex" }}>
                    <img src="/Member.svg" alt="" />
                    <Appcaption sx={{ ml: 2 }}>5 Friends Join</Appcaption>
                  </AppDiv>
                  <AppDiv sx={{ display: "flex", alignItems: "center", mt: 1 }}>
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
                  sx={{ backgroundColor: "#F83C4D", width: 100 }}
                  variant="contained"
                  color="error"
                >
                  Follow
                </AppButton>
                <AppIconButton sx={{ border: "1px solid #E2E2EA", mr: 1, ml: 1 }}>
                  <BookmarkIcon fontSize="small" />
                </AppIconButton>
                <AppIconButton sx={{ border: `1px solid #E2E2EA` }}>
                  <ShareIcon fontSize="small" />
                </AppIconButton>
              </AppDiv>
            </AppDiv>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default AllEvents;
