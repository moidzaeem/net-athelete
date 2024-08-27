import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { Appcaption, Appfont, Appheading } from "../../../../utils/theme";
import AddIcon from "@mui/icons-material/Add";
import AppDiv from "../../../../components/atoms/AppDiv";
import { PaperStyle } from "../../../../utils/styles";
import trash from "../../../../assets/svg/trash.svg";
import edit from "../../../../assets/svg/edit.svg";
import AppTextFeild from "../../../../components/molecules/AppTextFeild";
import buildings from "../../../../assets/red-svgs/buildings.svg";
import AppSelect from "../../../../components/molecules/AppSelect";
import calendar from "../../../../assets/red-svgs/calendar-2.svg";
import { AppButton } from "../../../../components/atoms/AppButton";
import { alpha, beta } from "../../../../utils/theme/colors";
import education from "../../../../assets/svg/education.svg";
import teacher from "../../../../assets/red-svgs/teacher.svg";
import ranking from "../../../../assets/red-svgs/ranking.svg";
import medal from "../../../../assets/red-svgs/medal.svg";
import { AppAvatar } from "../../../../components/atoms/AppAvatar";
import React from "react";
import useCrypto from "../../../../utils/hooks/encrypt";
import { flexCol } from "../../../../utils/styles";
import axios from "axios";
import { toast } from "react-toastify";

const EducationTab = () => {
  const { decryptedData } = useCrypto();
  const url = import.meta.env.VITE_BASE_URL;
  const [educationList, setEducationList] = React.useState([]);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [educationFormData, setEducationFormData] = React.useState({
    degree_name: "",
    institute: "",
    current_institute: false,
    from: "",
    type: "university",
    to: "",
    major: "",
  });

  React.useEffect(() => {
    const getEducationList = async () => {
      try {
        const token = decryptedData?.tokens?.access?.token;
        if (!token) {
          throw new Error("No token found in local storage");
        }

        const response = await axios.get(`${url}/edu`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // console.log("response has: ", response);

        if (response.status === 200) {
          const userEducationList = response.data.data;
          setEducationList(userEducationList.result);
          // console.log("education list  ha:", educationList);
        } else {
          throw new Error("Failed to fetch User Education Detials");
        }
      } catch (error) {
        console.error("Error fetching user profile data:", error);
      }
    };
    getEducationList();
  }, [decryptedData, educationList]);
  // }, [decryptedData]);

  const handleDeleteEducation = async (eduId) => {
    try {
      const token = decryptedData?.tokens?.access?.token;
      if (!token) {
        throw new Error("No token found in local storage");
      }

      const response = await axios.delete(`${url}/edu/${eduId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setEducationList((prevEdu) =>
          prevEdu.filter((edu) => edu.id !== eduId)
        );
        toast.success("Work Experience Deleted Successfully.");
      } else {
        throw new Error("Failed to delete work experience");
      }
    } catch (error) {
      console.error("Error deleting work experience:", error);
    }
  };

  const handleChange = (field, value) => {
    setEducationFormData((prevData) => ({
      ...prevData,
      ...(field.includes(".")
        ? {
            [field.split(".")[0]]: {
              ...prevData[field.split(".")[0]],
              [field.split(".")[1]]: value,
            },
          }
        : { [field]: value }),
    }));
  };

  const handleAddEducation = async (e) => {
    e.preventDefault();
    // console.log("add is called...");
    // console.log("workExpFormData has: ", educationFormData);
    try {
      const token = decryptedData?.tokens?.access?.token;
      if (!token) {
        throw new Error("No token found in local storage");
      }
      const response = await axios.post(`${url}/edu`, educationFormData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        throw new Error("Failed to Add Eduction");
      }
    } catch (error) {
      console.error("Error adding Eduction: ", error);
      toast.error("Failed to Add Eduction. Please try again.");
    }
  };

  return (
    <Paper
      sx={{
        ...PaperStyle,
        width: "100%",
        p: {
          lg: 4,
          xs: 2,
        },
      }}
    >
      <AppDiv
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Appheading sx={{ fontSize: 16 }}>
          <b>Experience</b>
        </Appheading>
        <IconButton sx={{ background: "white", border: "1px solid #F3F3F3" }}>
          <AddIcon />
        </IconButton>
      </AppDiv>

      <AppDiv sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {educationList.length > 0 &&
          educationList.map((education) => {
            const start_date = new Date(education.from);
            const formattedDate = start_date.toLocaleString("en-US", {
              month: "short",
              year: "numeric",
            });

            const end_date = education.to ? new Date(education.to) : new Date();
            const current_edu = education.current_institute;

            let edu_duration;
            if (current_edu) {
              edu_duration = calculateJobDuration(start_date, new Date());
            } else {
              edu_duration = calculateJobDuration(start_date, end_date);
            }

            function calculateJobDuration(startDate, endDate) {
              const diffTime = Math.abs(endDate - startDate);
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              const years = Math.floor(diffDays / 365);
              const months = Math.floor((diffDays % 365) / 30);

              return `${years > 0 ? `${years} yrs` : ""} ${months} mon`;
            }

            return (
              <AppDiv sx={{ display: "flex", justifyContent: "space-between" }}>
                <AppDiv
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <AppAvatar
                    alt="Remy Sharp"
                    src={education}
                    sx={{ width: 45, height: 45 }}
                  />
                  <AppDiv sx={{ ml: 2 }}>
                    <Appfont sx={{ textAlign: "left", fontSize: 14 }}>
                      <b>{education.institute}</b>
                    </Appfont>
                    <Appfont sx={{ textAlign: "left", color: "#7F879E" }}>
                      {education.degree_name}
                    </Appfont>
                    <Appcaption sx={{ textAlign: "left", color: "#7F879E" }}>
                      {formattedDate}
                      {education.current_institute && " - Present"} -{" "}
                      {edu_duration}
                    </Appcaption>
                  </AppDiv>
                </AppDiv>
                <AppDiv sx={{ mt: 3 }}>
                  <IconButton
                    onClick={() => {
                      setEducationFormData({
                        // title: experience.title,
                        // employment_type: experience.employment_type,
                        // company: experience.company,
                        // location: experience.location,
                        // current_job: experience.current_job,
                        // start_date: experience.start_date,
                        // end_date: experience.end_date,
                      });
                      setIsUpdating(true);
                    }}
                  >
                    <img src={edit} alt="" style={{ width: 20 }} />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteEducation(education.id)}
                  >
                    <img src={trash} alt="" style={{ width: 20 }} />
                  </IconButton>
                </AppDiv>
              </AppDiv>
            );
          })}
      </AppDiv>

      <Divider sx={{ my: 5 }} />

      <Appheading sx={{ fontSize: 16, textAlign: "left" }}>
        <b>Add New Experience</b>
      </Appheading>

      <form onSubmit={handleAddEducation}>
        {/* ----| School Name |---- */}
        <AppDiv sx={{ ...flexCol, width: "100%", alignItems: "start" }}>
          <label style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}>
            School Name
          </label>
          <TextField
            fullWidth
            inputProps={{ style: { fontSize: 12 } }}
            variant="outlined"
            placeholder="Enter School Name"
            sx={{ mt: 1.5 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src={teacher} alt="icon" style={{ width: 25 }} />
                </InputAdornment>
              ),
            }}
            value={educationFormData.institute}
            onChange={(e) => handleChange("institute", e.target.value)}
          />
        </AppDiv>
        {/* ----| Degree | ---- */}
        <AppDiv sx={{ ...flexCol, mt: 3, width: "100%", alignItems: "start" }}>
          <label style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}>
            Degree
          </label>
          <TextField
            fullWidth
            inputProps={{ style: { fontSize: 12 } }}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src={medal} alt="icon" style={{ width: 25 }} />
                </InputAdornment>
              ),
            }}
            placeholder="Enter degree"
            value={educationFormData.degree_name}
            onChange={(e) => handleChange("degree_name", e.target.value)}
            sx={{ mt: 1.5 }}
          />
        </AppDiv>
        {/* ----| Field of Study | ---- */}
        <AppDiv sx={{ ...flexCol, mt: 3, width: "100%", alignItems: "start" }}>
          <label style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}>
            Field of Study
          </label>
          <TextField
            fullWidth
            inputProps={{ style: { fontSize: 12 } }}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src={buildings} alt="icon" style={{ width: 25 }} />
                </InputAdornment>
              ),
            }}
            placeholder="Enter your field study"
            value={educationFormData.major}
            onChange={(e) => handleChange("major", e.target.value)}
            sx={{ mt: 1.5 }}
          />
        </AppDiv>
        {/* ----| Grade | ---- */}
        {/* <AppDiv sx={{ ...flexCol, mt: 3, width: "100%", alignItems: "start" }}>
          <label style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}>
            Grade
          </label>
          <TextField
            fullWidth
            inputProps={{ style: { fontSize: 12 } }}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src={ranking} alt="icon" style={{ width: 25 }} />
                </InputAdornment>
              ),
            }}
            placeholder="Enter Grade"
            value={educationFormData.type}
            onChange={(e) => handleChange("type", e.target.value)}
            sx={{ mt: 1.5 }}
          />
        </AppDiv> */}
        {/* ----| Current Education | ---- */}
        <AppDiv sx={{ ...flexCol, mt: 3, width: "100%", alignItems: "start" }}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox color="success" />}
              label="I’m currently studying in this school"
              value={educationFormData.current_institute}
              checked={educationFormData.current_institute}
              onChange={(e) =>
                handleChange("current_institute", e.target.checked)
              }
            />
          </FormGroup>
        </AppDiv>
        <AppDiv
          sx={{
            mt: 3,
            display: "flex",
            alignItems: "center",
            gap: 3,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <AppDiv sx={{ ...flexCol, width: "100%", alignItems: "start" }}>
            <label style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}>
              Start Date
            </label>
            <TextField
              fullWidth
              type="date"
              placeholder="Select Start Date"
              inputProps={{ style: { fontSize: 12 } }}
              variant="outlined"
              value={educationFormData.from}
              onChange={(e) => handleChange("from", e.target.value)}
              sx={{ mt: 1.5 }}
            />
          </AppDiv>
          <AppDiv sx={{ ...flexCol, width: "100%", alignItems: "start" }}>
            <label style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}>
              End Date
            </label>
            <TextField
              fullWidth
              type="date"
              placeholder="Select End Date"
              inputProps={{ style: { fontSize: 12 } }}
              variant="outlined"
              value={educationFormData.to}
              onChange={(e) => handleChange("to", e.target.value)}
              sx={{ mt: 1.5 }}
            />
          </AppDiv>
        </AppDiv>
        <Stack direction="row" justifyContent={"end"} mt={8} gap={2}>
          <AppButton
            variant="contained"
            sx={{ backgroundColor: alpha, color: "#7F879E", width: 130 }}
          >
            <b> Discard</b>
          </AppButton>
          <AppButton
            sx={{ backgroundColor: beta, width: 130, color: "black" }}
            variant="contained"
            type="submit"
          >
            <b>{isUpdating ? "Update" : "Save Changes"}</b>
          </AppButton>
        </Stack>
      </form>
    </Paper>
  );
};

export default EducationTab;
