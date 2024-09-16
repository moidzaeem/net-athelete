import { useState } from "react";
import { Select, MenuItem } from "@mui/material";
import { AppMainheading, Appfont } from "./../../utils/theme/index";
import AppSearchBar from "./../../components/molecules/AppSearchBar";
import { AppButton } from "./../../components/atoms/AppButton";
import AppDiv from "./../../components/atoms/AppDiv";
import AppIconButton from "./../../components/atoms/AppIconButton";
import filterIcon from "../../assets/svg/filter.svg";
import verticalthreeline from "../../assets/svg/verticalthreeline.svg";
import horizatalthreelines from "../../assets/svg/horizatalthreelines.svg";
import boxes from "../../assets/svg/4boxes.svg";
import { gamma } from "../../utils/theme/colors";
import All from "./tabs/All";
import Courses from "./tabs/Courses";
import Articles from "./tabs/Articles";
import Webinars from "./tabs/Webinars";
import ResourceModal from "./components/modal";
import ResourcesList from "./tabs/ResourcesList";
import useCrypto from "../../../src/utils/hooks/encrypt";
import React from "react";
import axios from "axios";

const pages = ["all", "courses", "articles", "webinars"];

const ResourcePage = () => {
  const { decryptedData } = useCrypto();
  const url = import.meta.env.VITE_BASE_URL;

  const [allResourcesList, setAllResourcesList] = React.useState([]);
  const [sortBy, setSortBy] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("all");
  const [allCoursesList, setAllCoursesList] = React.useState([]);
  const [allArticlesList, setAllArticlesList] = React.useState([]);
  const [allWebinarsList, setAllWebinarsList] = React.useState([]);

  React.useEffect(() => {
    const getAllResources = async () => {
      try {
        const token = decryptedData?.tokens?.access?.token;
        if (!token) {
          throw new Error("No token found in local storage");
        }
        const response = await axios.get(`${url}/resource`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          // setAllResourcesList(response.data.data.result);

          const resources = response.data.data.result;
          const courses = resources.filter(
            (resource) => resource.category === "course"
          );
          const webinars = resources.filter(
            (resource) => resource.category === "webinar"
          );
          const articles = resources.filter(
            (resource) => resource.category === "article"
          );

          setAllResourcesList(resources);
          setAllCoursesList(courses);
          setAllWebinarsList(webinars);
          setAllArticlesList(articles);
        } else {
          throw new Error("Failed to fetch Resources");
        }
      } catch (error) {
        console.error("Error fetching Resources:", error);
      }
    };
    getAllResources();
  }, [decryptedData]);

  const handleChange = (event) => {
    setSortBy(event.target.value);
    // You can perform sorting logic here based on the selected value
  };

  const handleTabClick = (page) => {
    setActiveTab(page);
  };

  return (
    <AppDiv
      sx={{
        pr: {
          lg: "25px",
          xs: 1,
        },
      }}
    >
      <AppMainheading sx={{ mt: 10, mb: 5, textAlign: "center", fontSize: 36 }}>
        Resources
      </AppMainheading>
      <AppDiv
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: {
            lg: "row",
            xs: "column",
          },
          alignItems: "center",
          gap: 3,
          overflow: {
            lg: "hidden",
            xs: "scroll",
          },
          px: { lg: 3 },
        }}
      >
        <AppDiv sx={{ display: "flex", alignItems: "center" }}>
          <AppSearchBar />
          <ResourceModal />
        </AppDiv>
        <AppDiv
          sx={{
            flexGrow: 4,
            display: { xs: "flex", lg: "flex" },
            justifyContent: "center",
          }}
        >
          {pages.map((page, index) => (
            <Appfont
              key={index}
              sx={{
                my: 2,
                display: "block",
                cursor: "pointer",
                ml: 6,
                fontSize: 14,
                fontWeight: 500,
                textTransform: "capitalize",
                color: page === activeTab ? gamma : "inherit",
                textDecoration: activeTab === page ? "underline" : "none",
                textUnderlineOffset: 20,
                textDecorationThickness: 3,
              }}
              onClick={() => handleTabClick(page)}
            >
              {page}
            </Appfont>
          ))}
        </AppDiv>
        {/* <AppDiv sx={{ display: "flex", alignItems: "center" }}>
          <AppIconButton sx={{ border: "1px solid #dcdcdd" }}>
            <img src={filterIcon} alt="" width={20} />
          </AppIconButton>
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
              width: 180,
              fontSize: 12,
            }}
          >
            <MenuItem sx={{ fontSize: 12 }} value="" disabled>
              Sort By: Popular Class
            </MenuItem>
            <MenuItem sx={{ fontSize: 12 }} value="popularity">
              Popularity
            </MenuItem>
          </Select>
          <AppDiv
            sx={{
              display: "flex",
              flexDirection: {
                md: "row",
                xs: "column",
              },
            }}
          >
            <AppButton
              size="small"
              sx={{
                border: "1px solid #dcdcdd",
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              <img src={horizatalthreelines} alt="" width={16} />
            </AppButton>
            <AppButton
              size="small"
              sx={{ border: "1px solid #dcdcdd", borderRadius: 0 }}
            >
              <img src={verticalthreeline} alt="" width={16} />
            </AppButton>
            <AppButton
              size="small"
              sx={{
                border: "1px solid #dcdcdd",
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}
            >
              <img src={boxes} alt="" width={16} />
            </AppButton>
          </AppDiv>
        </AppDiv> */}
      </AppDiv>
      {/* Render content based on activeTab */}
      {activeTab === "all" && (
        <ResourcesList allResourcesList={allResourcesList} />
      )}
      {activeTab === "courses" && <Courses allCoursesList={allCoursesList} />}
      {activeTab === "articles" && (
        <Articles allArticlesList={allArticlesList} />
      )}
      {activeTab === "webinars" && (
        <Webinars allWebinarsList={allWebinarsList} />
      )}
    </AppDiv>
  );
};

export default ResourcePage;
