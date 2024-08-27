import {
  Avatar,
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
import light from "../../../../assets/svg/light.svg";
import briefcase from "../../../../assets/red-svgs/briefcase.svg";
import AppTextFeild from "../../../../components/molecules/AppTextFeild";
import location from "../../../../assets/red-svgs/location.svg";
import buildings from "../../../../assets/red-svgs/buildings.svg";
import AppSelect from "../../../../components/molecules/AppSelect";
import calendar from "../../../../assets/red-svgs/calendar-2.svg";
import { AppButton } from "../../../../components/atoms/AppButton";
import { alpha, beta } from "../../../../utils/theme/colors";
import React from "react";
import { flexCol } from "../../../../utils/styles";
import useCrypto from "../../../../utils/hooks/encrypt";
import axios from "axios";
import { toast } from "react-toastify";

const WorkExpereinceTab = () => {
  const { decryptedData } = useCrypto();
  const url = import.meta.env.VITE_BASE_URL;
  const [workExp, setWorkExp] = React.useState([]);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [workExpFormData, setWorkExpFormData] = React.useState({
    title: "",
    employment_type: "",
    company: "",
    location: "",
    current_job: false,
    start_date: "",
    end_date: "",
  });

  React.useEffect(() => {
    const getWorkExp = async () => {
      try {
        const token = decryptedData?.tokens?.access?.token;
        if (!token) {
          throw new Error("No token found in local storage");
        }

        const response = await axios.get(`${url}/work`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("response has: ", response);

        if (response.status === 200) {
          const userWorkExp = response.data.data;
          setWorkExp(userWorkExp.result);
          console.log("experience ha:", workExp);
        } else {
          throw new Error("Failed to fetch User Work Experiences");
        }
      } catch (error) {
        console.error("Error fetching user profile data:", error);
      }
    };
    getWorkExp();
  }, [decryptedData, workExp]);

  const handleDeleteWorkExp = async (expId) => {
    try {
      const token = decryptedData?.tokens?.access?.token;
      if (!token) {
        throw new Error("No token found in local storage");
      }

      const response = await axios.delete(`${url}/work/${expId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setWorkExp((prevExp) =>
          prevExp.filter((exp) => exp.work_exp_id !== expId)
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
    setWorkExpFormData((prevData) => ({
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

  const handleAddWorkExp = async (e) => {
    e.preventDefault();
    console.log("add is called...");
    console.log("workExpFormData has: ", workExpFormData);
    try {
      const token = decryptedData?.tokens?.access?.token;
      if (!token) {
        throw new Error("No token found in local storage");
      }
      const response = await axios.post(`${url}/work`, workExpFormData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        throw new Error("Failed to Add Work Experience");
      }
    } catch (error) {
      console.error("Error adding Work Experience: ", error);
      toast.error("Failed to Add Work Experience. Please try again.");
    }
  };

  const handleUpdateWorkExp = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    console.log("updated is called...");
    console.log("workExpFormData has: ", workExpFormData);
    try {
      const token = decryptedData?.tokens?.access?.token;
      if (!token) {
        throw new Error("No token found in local storage");
      }
      // console.log("work exp form data has: ", workExpFormData);
      // console.log("url has: ", `${url}/work`);

      const response = await axios.patch(`${url}/work`, workExpFormData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        throw new Error("Failed to Update Work Experience");
      }
    } catch (error) {
      console.error("Error Updating Work Experience: ", error);
      toast.error("Failed to Update Work Experience. Please try again.");
    }
    setIsUpdating(false);
  }; // update this please

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
        {workExp.length > 1 &&
          workExp.map((experience) => {
            const start_date = new Date(experience.start_date);
            const formattedDate = start_date.toLocaleString("en-US", {
              month: "short",
              year: "numeric",
            });

            const end_date = experience.end_date
              ? new Date(experience.end_date)
              : new Date();
            const current_job = experience.current_job;

            let job_duration;
            if (current_job) {
              job_duration = calculateJobDuration(start_date, new Date());
            } else {
              job_duration = calculateJobDuration(start_date, end_date);
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
                  <Avatar
                    alt="Remy Sharp"
                    src={light}
                    sx={{ width: 45, height: 45 }}
                  />
                  <AppDiv sx={{ ml: 2 }}>
                    <Appfont sx={{ textAlign: "left", fontSize: 14 }}>
                      <b>{experience.title}</b>
                    </Appfont>
                    <Appfont sx={{ textAlign: "left", color: "#7F879E" }}>
                      {experience.company}
                    </Appfont>
                    <Appcaption sx={{ textAlign: "left", color: "#7F879E" }}>
                      {formattedDate}
                      {experience.current_job && " - Present"} - {job_duration}
                    </Appcaption>
                  </AppDiv>
                </AppDiv>
                <AppDiv sx={{ mt: 3 }}>
                  <IconButton
                    onClick={() => {
                      setWorkExpFormData({
                        title: experience.title,
                        employment_type: experience.employment_type,
                        company: experience.company,
                        location: experience.location,
                        current_job: experience.current_job,
                        start_date: experience.start_date,
                        end_date: experience.end_date,
                      });
                      setIsUpdating(true);
                    }}
                  >
                    <img src={edit} alt="" style={{ width: 20 }} />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteWorkExp(experience.id)}
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

      <form onSubmit={setIsUpdating ? handleUpdateWorkExp : handleAddWorkExp}>
        {/* ----| Work Title | ---- */}
        <AppDiv sx={{ ...flexCol, width: "100%", alignItems: "start" }}>
          <label style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}>
            Work Title
          </label>
          <TextField
            fullWidth
            inputProps={{ style: { fontSize: 12 } }}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src={briefcase} alt="icon" style={{ width: 25 }} />
                </InputAdornment>
              ),
            }}
            placeholder="Work Title"
            value={workExpFormData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            sx={{ mt: 1.5 }}
          />
        </AppDiv>
        {/* ----| Employment Type | ---- */}
        <AppDiv sx={{ ...flexCol, mt: 3, width: "100%", alignItems: "start" }}>
          <label style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}>
            Employment Type
          </label>
          <TextField
            fullWidth
            inputProps={{ style: { fontSize: 12 } }}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src={briefcase} alt="icon" style={{ width: 25 }} />
                </InputAdornment>
              ),
            }}
            placeholder="Employment Type"
            value={workExpFormData.employment_type}
            onChange={(e) => handleChange("employment_type", e.target.value)}
            sx={{ mt: 1.5 }}
          />
        </AppDiv>
        {/* ----| Company Name | ---- */}
        <AppDiv sx={{ ...flexCol, mt: 3, width: "100%", alignItems: "start" }}>
          <label style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}>
            Company Name
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
            placeholder="Company Name"
            value={workExpFormData.company}
            onChange={(e) => handleChange("company", e.target.value)}
            sx={{ mt: 1.5 }}
          />
        </AppDiv>
        {/* ----| Location | ---- */}
        <AppDiv sx={{ ...flexCol, mt: 3, width: "100%", alignItems: "start" }}>
          <label style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}>
            Location
          </label>
          <TextField
            fullWidth
            inputProps={{ style: { fontSize: 12 } }}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src={location} alt="icon" style={{ width: 25 }} />
                </InputAdornment>
              ),
            }}
            placeholder="Location"
            value={workExpFormData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            sx={{ mt: 1.5 }}
          />
        </AppDiv>
        {/* ----| Current Work Experience | ---- */}
        <AppDiv sx={{ ...flexCol, mt: 3, width: "100%", alignItems: "start" }}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox color="success" />}
              label="I’m currently working in this role"
              value={workExpFormData.current_job}
              checked={workExpFormData.current_job}
              onChange={(e) => handleChange("current_job", e.target.checked)}
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
              value={workExpFormData.start_date}
              onChange={(e) => handleChange("start_date", e.target.value)}
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
              value={workExpFormData.end_date}
              onChange={(e) => handleChange("end_date", e.target.value)}
              sx={{ mt: 1.5 }}
            />
          </AppDiv>
        </AppDiv>
        <Stack direction="row" justifyContent={"end"} mt={8} gap={2}>
          <AppButton
            variant="contained"
            sx={{ backgroundColor: alpha, color: "#7F879E", width: 130 }}
            onClick={() => {
              setWorkExpFormData({
                title: "",
                employment_type: "",
                company: "",
                location: "",
                current_job: false,
                start_date: "",
                end_date: "",
              });
              setIsUpdating(false);
            }}
          >
            <b>Discard</b>
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

export default WorkExpereinceTab;
