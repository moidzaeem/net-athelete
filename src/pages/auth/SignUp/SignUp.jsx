import bg from "../../../assets/images/Bg.png";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import lockicon from "../../../assets/svg/lock.svg";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useState } from "react";
import { Appcaption, Appfont, Appheading } from "../../../utils/theme";
import { AppButton } from "../../../components/atoms/AppButton";
import { beta, gamma } from "../../../utils/theme/colors";
import logo from "../../../assets/svg/logo.svg";
import AppDiv from "../../../components/atoms/AppDiv";
import ic_Achievements from "../../../assets/svg/ic_Achievements.svg";
import PersonIcon from "@mui/icons-material/Person";
import {
  PaperStyle,
  flexCol,
  gridOverFlow,
  imageStyle,
} from "../../../utils/styles";
import { Link, useNavigate } from "react-router-dom";
import { RoutePath } from "../../../utils/enum/RoutePath";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { Checkbox } from "@mui/material";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    education: {
      degree_name: "",
      major: "",
      institute: "",
      current_institute: false,
      type: "university",
      from: "",
      to: "",
    },
  });
  console.log(formData, "formData");
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEducationChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      education: {
        ...formData.education,
        [name]: value,
      },
    });
  };

  
  
  
  const url = import.meta.env.VITE_BASE_URL;

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${url}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response)
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // console.log("Success:", data);
        toast(data.message);
        navigate("/signin");
        // You can handle success response here, e.g., redirect to another page
      })
      .catch((error) => {
        console.error("Error:", error);
        // You can handle error response here, e.g., display error message to user
      });
  };
  const handleCheckboxChange = (event) => {
    const { checked } = event.target;
    setFormData({
      ...formData,
      education: {
        ...formData.education,
        current_institute: checked,
      },
    });
  };

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ overflow: "hidden" }}
      >
        <Grid item xs={12} style={{ height: "50%" }}>
          <img src={bg} alt="" style={imageStyle} />
        </Grid>
        <Grid item xs={12} sx={gridOverFlow}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={GridStyle}
          >
            <AppDiv sx={{ position: "relative", bottom: 30 }}>
              <img src={logo} alt="" style={{ width: "130px" }} />
            </AppDiv>
            <Grid sx={flexCol} item>
              <Paper sx={PaperStyle}>
                <Appcaption>GET STARTED</Appcaption>
                <Appheading>Find the Million Opportunities</Appheading>
                <Appheading>to Level Up u’r Careers</Appheading>
                {/* Names */}
                <AppDiv
                  sx={{ display: "flex", alignItems: "center", gap: 3, mt: 5 }}
                >
                  <TextField
                    inputProps={{ style: { fontSize: 12 } }}
                    variant="standard"
                    placeholder="Email"
                    fullWidth
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon sx={{ width: "14px" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    inputProps={{ style: { fontSize: 12 } }}
                    variant="standard"
                    placeholder="Name"
                    fullWidth
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutlineIcon sx={{ width: "14px" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </AppDiv>
                <TextField
                  sx={{ mt: 3 }}
                  inputProps={{ style: { fontSize: 12 } }}
                  variant="standard"
                  placeholder="Degree Name"
                  fullWidth
                  name="degree_name"
                  value={formData.education.degree_name}
                  onChange={handleEducationChange}
                />

                {/* Major */}
                <AppDiv
                  sx={{ display: "flex", alignItems: "center", gap: 3, mt: 4 }}
                >
                  <TextField
                    inputProps={{ style: { fontSize: 12 } }}
                    variant="standard"
                    placeholder="Major"
                    fullWidth
                    name="major"
                    value={formData.education.major}
                    onChange={handleEducationChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <img
                            src={ic_Achievements}
                            alt=""
                            style={{ width: "14px" }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {/* Names */}
                  <AppDiv
                    sx={{ display: "flex", alignItems: "center", gap: 3 }}
                  >
                    <TextField
                      inputProps={{ style: { fontSize: 12 } }}
                      variant="standard"
                      placeholder="From"
                      fullWidth
                      type="date"
                      name="from"
                      value={formData.education.from}
                      onChange={handleEducationChange}
                    />
                    <TextField
                      inputProps={{ style: { fontSize: 12 } }}
                      variant="standard"
                      placeholder="To"
                      type="date"
                      fullWidth
                      name="to"
                      value={formData.education.to}
                      onChange={handleEducationChange}
                    />
                  </AppDiv>
                </AppDiv>
                {/* Select */}
                {/* Email */}
                <TextField
                  inputProps={{ style: { fontSize: 12 } }}
                  variant="standard"
                  placeholder="Institute"
                  fullWidth
                  name="institute"
                  value={formData.education.institute}
                  onChange={handleEducationChange}
                  sx={{ mb: 4, mt: 4 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlineIcon sx={{ width: "14px" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Appfont>@circle.co</Appfont>
                      </InputAdornment>
                    ),
                  }}
                />
                {/* Passwords */}
                <AppDiv
                  sx={{ display: "flex", alignItems: "center", gap: 3, mt: 1 }}
                >
                  <TextField
                    sx={{ mb: 3 }}
                    inputProps={{ style: { fontSize: 12 } }}
                    variant="standard"
                    placeholder="Create Password"
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <img
                            src={lockicon}
                            style={{ width: "14px", height: "14px" }}
                            alt=""
                          />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOffIcon sx={{ width: "14px" }} />
                            ) : (
                              <RemoveRedEyeIcon sx={{ width: "14px" }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    sx={{ mb: 3 }}
                    inputProps={{ style: { fontSize: 12 } }}
                    variant="standard"
                    placeholder="Repeat Password"
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <img
                            src={lockicon}
                            style={{ width: "14px", height: "14px" }}
                            alt=""
                          />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOffIcon sx={{ width: "14px" }} />
                            ) : (
                              <RemoveRedEyeIcon sx={{ width: "14px" }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </AppDiv>
                <FormControl
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Appfont>Current Institure</Appfont>{" "}
                  <Checkbox
                    name="current_institute"
                    checked={formData.education.current_institute}
                    onChange={handleCheckboxChange}
                  />
                </FormControl>
                <AppButton
                  sx={{ backgroundColor: beta, color: "black", mt: 3 }}
                  fullWidth
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Get Started
                </AppButton>
              </Paper>
              <Appfont sx={{ color: "#92929D", mb: 8 }}>
                By clicking &#34;Get Started - Free!&#34; I agree to Terms of
                Service{" "}
              </Appfont>
              <Appfont sx={{ mt: 1, mb: 10 }}>
                <Link to={RoutePath.SIGNIN} style={{ color: gamma }}>
                  Already user ?
                </Link>
              </Appfont>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SignUpPage;

const GridStyle = {
  position: "absolute",
  top: {
    lg: "70%",
    xs: "80%",
  },
  left: "50%",
  transform: "translate(-50%, -50%)",
};
