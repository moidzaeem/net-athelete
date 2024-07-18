import bg from "../../../assets/images/Bg.png";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import lockicon from "../../../assets/svg/lock.svg";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import DoneIcon from "@mui/icons-material/Done";
import { useState } from "react";
import { Appcaption, Appfont, Appheading } from "../../../utils/theme";
import { AppButton } from "../../../components/atoms/AppButton";
import { beta, gamma } from "../../../utils/theme/colors";
import logo from "../../../assets/svg/logo.svg";
import AppDiv from "../../../components/atoms/AppDiv";
import googleIcon from "../../../assets/svg/googleIcon.svg";
import facebookIcon from "../../../assets/svg/fbIcon.svg";
import twitterIcon from "../../../assets/svg/twiiterIcon.svg";
import { Link, useNavigate } from "react-router-dom";
import {
  PaperStyle,
  flexCol,
  gridOverFlow,
  imageStyle,
} from "../../../utils/styles";
import { RoutePath } from "../../../utils/enum/RoutePath";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import useCrypto from "../../../utils/hooks/encrypt";

const SignInPage = () => {
  // hooks
  const { encrypt } = useCrypto();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      if (response?.status === 200) {
        console.log(response)
        encrypt(response.data.data); 
        toast(response.data.message);
        navigate("/"); 
        // Delay the reload to give time for the toast to be visible
        setTimeout(() => {
          window.location.reload();
        }, 1000); // 1 second delay
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh", overflow: "hidden" }}
      >
        <Grid item xs={12} style={{ height: "50%", overflow: "hidden" }}>
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
            <AppDiv sx={{ position: "relative", bottom: 40 }}>
              <img src={logo} alt="" style={{ width: "130px" }} />
            </AppDiv>
            <Grid item sx={flexCol}>
              <Paper sx={PaperStyle}>
                <Appcaption> JUST SignInPage FIRST</Appcaption>
                <Appheading sx={{ mt: 2 }}>
                  Find the Million Opportunities
                </Appheading>
                <Appheading> to Level Up u’r Careers </Appheading>

                {/* Input field with icons */}
                <TextField
                  sx={{ mb: 4, mt: 3 }}
                  inputProps={{ style: { fontSize: 12 } }}
                  variant="standard"
                  placeholder="username"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlineIcon sx={{ width: "14px" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <DoneIcon sx={{ width: "14px" }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  sx={{ mb: 3 }}
                  inputProps={{ style: { fontSize: 12 } }}
                  variant="standard"
                  placeholder="password"
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                <AppButton
                  onClick={handleSignIn}
                  sx={{ backgroundColor: beta, color: "black" }}
                  fullWidth
                  variant="contained"
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Login"
                  )}
                </AppButton>
                {error && <div>Error: {error}</div>}

                <Divider sx={{ my: 2 }}>
                  <Appcaption>OR</Appcaption>
                </Divider>
                <Stack spacing={2} direction="row">
                  {[googleIcon, facebookIcon, twitterIcon].map(
                    (icon, index) => (
                      <AppButton
                        key={index}
                        fullWidth
                        sx={{ border: "1px solid #F1F1F5" }}
                        variant="outlined"
                      >
                        <img src={icon} alt="" />
                      </AppButton>
                    )
                  )}
                </Stack>
              </Paper>
              <Appfont sx={{ mt: 4 }}>
                Forgot Password{" "}
                <Link to={RoutePath.SIGNUP} style={{ color: gamma }}>
                  Sign up for new user?
                </Link>
              </Appfont>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SignInPage;

const GridStyle = {
  position: "absolute",
  top: {
    lg: "55%",
    xs: "60%",
  },
  left: "50%",
  transform: "translate(-50%, -50%)",
};
