import { useState, useEffect } from "react";
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

  const [allResourcesList, setAllResourcesList] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [allCoursesList, setAllCoursesList] = useState([]);
  const [allArticlesList, setAllArticlesList] = useState([]);
  const [allWebinarsList, setAllWebinarsList] = useState([]);

  useEffect(() => {
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

  useEffect(() => {
    const sortResources = (resources, order) => {
      const sortedResources = [...resources].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        if (order === "newest") {
          return dateB - dateA;
        } else if (order === "oldest") {
          return dateA - dateB;
        }
        return 0;
      });
      return sortedResources;
    };

    let sortedList = [];
    switch (activeTab) {
      case "all":
        sortedList = sortResources(allResourcesList, sortBy);
        setAllResourcesList(sortedList);
        break;
      case "courses":
        sortedList = sortResources(allCoursesList, sortBy);
        setAllCoursesList(sortedList);
        break;
      case "articles":
        sortedList = sortResources(allArticlesList, sortBy);
        setAllArticlesList(sortedList);
        break;
      case "webinars":
        sortedList = sortResources(allWebinarsList, sortBy);
        setAllWebinarsList(sortedList);
        break;
      default:
        break;
    }
  }, [sortBy, allResourcesList, allCoursesList, allArticlesList, allWebinarsList, activeTab]);

  useEffect(() => {
    const filterResources = (resources) => {
      if (!searchTerm) return resources;
      return resources.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    };

    let filteredList = [];
    switch (activeTab) {
      case "all":
        filteredList = filterResources(allResourcesList);
        setAllResourcesList(filteredList);
        break;
      case "courses":
        filteredList = filterResources(allCoursesList);
        setAllCoursesList(filteredList);
        break;
      case "articles":
        filteredList = filterResources(allArticlesList);
        setAllArticlesList(filteredList);
        break;
      case "webinars":
        filteredList = filterResources(allWebinarsList);
        setAllWebinarsList(filteredList);
        break;
      default:
        break;
    }
  }, [ activeTab, allResourcesList, allCoursesList, allArticlesList, allWebinarsList]);

  const handleChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleTabClick = (page) => {
    setActiveTab(page);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
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
          <AppSearchBar onChange={handleSearch} value={searchTerm} />
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
        <AppDiv sx={{ display: "flex", alignItems: "center" }}>
          <Select
            value={sortBy}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Sort By" }}
            variant="outlined"
            sx={{
              border: "1px solid #dcdcdd",
              borderRadius: 4,
              marginTop: 0,
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
            <MenuItem sx={{ fontSize: 12 }} value="newest">
              Newest
            </MenuItem>
            <MenuItem sx={{ fontSize: 12 }} value="oldest">
              Oldest
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
        </AppDiv>
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
