import {
  Avatar,
  InputAdornment,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  TextField,
} from "@mui/material";
import cameraIcon from "../../../../assets/svg/camera.svg";
import bgRec from "../../../../assets/svg/bgRec.svg";
import { AppButton } from "../../../../components/atoms/AppButton";
import EditIcon from "@mui/icons-material/Edit";
import AppDiv from "../../../../components/atoms/AppDiv";
import { Appcaption, Appheading } from "../../../../utils/theme";
import AppTextFeild from "../../../../components/molecules/AppTextFeild";
import PersonIcon from "../../../../assets/red-svgs/profile.svg";
import smsIcon from "../../../../assets/red-svgs/sms.svg";
import globalIcon from "../../../../assets/red-svgs/global.svg";
import locationIcon from "../../../../assets/red-svgs/location.svg";
import discover from "../../../../assets/red-svgs/discover.svg";
import calendar from "../../../../assets/red-svgs/calendar-2.svg";
import pc from "../../../../assets/red-svgs/profile-circle.svg";
import { alpha, beta } from "../../../../utils/theme/colors";
import AppSelect from "../../../../components/molecules/AppSelect";
import gender from "../../../../assets/red-svgs/gender.svg";
import briefcase from "../../../../assets/red-svgs/briefcase.svg";
import React from "react";
import useCrypto from "../../../../utils/hooks/encrypt";
import { flexCol } from "../../../../utils/styles";
import axios from "axios";
import { toast } from "react-toastify";

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const birthPlaceOptions = [
  { label: "Auckland", value: "auckland" },
  { label: "London", value: "london" },
];
const idPptions = [
  { label: "ID Card", value: "idCard" },
  { label: "Passport", value: "passport" },
];

const PersonalInfoTab = () => {
  const { decryptedData } = useCrypto();
  const url = import.meta.env.VITE_BASE_URL;
  const [personalInfoFormData, setPersonalInfoFormData] = React.useState({
    firstName: "",
    lastName: "",
    description: "", // don't use
    headline: "",
    // email: "",
    portfolio_link: "",
    gender: "", // don't use
    birth_place: "",
    date_of_birth: "",
    cityTown: "",
    zipCode: "",
    detailAddress: "",
    // identity: { identityType: "", identityNumber: "" },
    id_card: "",
  });

  React.useEffect(() => {
    const getUserProfile = async () => {
      try {
        const token = decryptedData?.tokens?.access?.token;
        if (!token) {
          throw new Error("No token found in local storage");
        }
  
        const response = await axios.get(`${url}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.status === 200) {
          const userProfileData = response.data.data;
  
          // Handle potential missing or unexpected data
          const [firstName = '', lastName = ''] = userProfileData.name ? userProfileData.name.split(" ") : [];
          const headline = userProfileData.headline || '';
          const portfolio_link = userProfileData.portfolio_link || '';
          const birth_place = userProfileData.birth_place || '';
          const date_of_birth = userProfileData.date_of_birth || '';
  
          // Ensure address splitting handles missing or unexpected formats
          const addressParts = userProfileData.address ? userProfileData.address.split(", ") : [];
          const [detailAddress = '', zipCode = '', cityTown = ''] = addressParts;
          
          const id_card = userProfileData.id_card || '';
  
          setPersonalInfoFormData({
            ...personalInfoFormData,
            firstName,
            lastName,
            headline,
            portfolio_link,
            birth_place,
            date_of_birth,
            detailAddress,
            zipCode,
            cityTown,
            id_card,
          });
        } else {
          throw new Error("Failed to fetch user profile data");
        }
      } catch (error) {
        console.error("Error fetching user profile data:", error);
        // Optional: You might want to handle errors or show a user-friendly message here
      }
    };
  
    getUserProfile();
  }, [decryptedData]);
  

  const handleChange = (field, value) => {
    setPersonalInfoFormData((prevData) => ({
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

  const onPersonalInfoSubmit = async (e) => {
    e.preventDefault();
    const transformedObject = {
      name: `${personalInfoFormData.firstName} ${personalInfoFormData.lastName}`,
      headline: personalInfoFormData.headline,
      portfolio_link: personalInfoFormData.portfolio_link,
      birth_place: personalInfoFormData.birth_place,
      date_of_birth: personalInfoFormData.date_of_birth,
      address: `${personalInfoFormData.detailAddress}, ${personalInfoFormData.zipCode}, ${personalInfoFormData.cityTown}`,
      id_card: personalInfoFormData.id_card,
    };

    try {
      const token = decryptedData?.tokens?.access?.token;
      if (!token) {
        throw new Error("No token found in local storage");
      }
      const response = await axios.patch(`${url}/user`, transformedObject, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        throw new Error("Failed to update Personal Information");
      }
    } catch (error) {
      console.error("Error updating Personal Information: ", error);
      toast.error("Failed to update Personal Information. Please try again.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url("${bgRec}")`,
        backgroundSize: "cover",
        width: "100%",
        height: "170px",
      }}
    >
      <AppDiv sx={{ textAlign: "right" }}>
        {/* <AppButton
          startIcon={<EditIcon />}
          variant="contained"
          sx={{ background: "black", color: "white", top: 70, right: 30 }}
        >
          Change Image
        </AppButton> */}
      </AppDiv>
      <Avatar
        alt={cameraIcon}
        src={cameraIcon}
        sx={{ width: 100, height: 100, top: 40, left: 30 }}
      />
      <form onSubmit={onPersonalInfoSubmit}>
        <AppDiv
          sx={{
            background: "white",
            p: {
              lg: 4,
              xs: 2,
            },
          }}
        >
          <Appheading mt={8} sx={{ textAlign: "left" }}>
            Personal Information
          </Appheading>
          <AppDiv
            sx={{
              mt: 3,
              display: "flex",
              alignItems: "center",
              gap: 3,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {/* ----| First Name | ---- */}
            <AppDiv
              sx={{ ...flexCol, mt: 3, width: "100%", alignItems: "start" }}
            >
              <label
                style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}
              >
                First Name
              </label>
              <TextField
                fullWidth
                inputProps={{ style: { fontSize: 12 } }}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={PersonIcon} alt="icon" style={{ width: 25 }} />
                    </InputAdornment>
                  ),
                }}
                placeholder="First Name"
                value={personalInfoFormData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                sx={{ mt: 1.5 }}
              />
            </AppDiv>
            {/* ----| Last Name | ---- */}
            <AppDiv
              sx={{ ...flexCol, mt: 3, width: "100%", alignItems: "start" }}
            >
              <label
                style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}
              >
                Last Name
              </label>
              <TextField
                fullWidth
                inputProps={{ style: { fontSize: 12 } }}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={PersonIcon} alt="icon" style={{ width: 25 }} />
                    </InputAdornment>
                  ),
                }}
                placeholder="Last Name"
                value={personalInfoFormData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                sx={{ mt: 1.5 }}
              />
            </AppDiv>
          </AppDiv>
          {/* ----| Description Name | ---- */}
          <AppDiv
            sx={{ ...flexCol, mt: 3, width: "100%", alignItems: "start" }}
          >
            <label style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}>
              Description
            </label>
            <TextField
              fullWidth
              minRows={3}
              inputProps={{ style: { fontSize: 12 } }}
              variant="outlined"
              placeholder="Description"
              value={personalInfoFormData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              sx={{ mt: 1.5 }}
            />
          </AppDiv>
          {/* ----| Headline | ---- */}
          <AppDiv
            sx={{ ...flexCol, mt: 3, width: "100%", alignItems: "start" }}
          >
            <label style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}>
              Headline
            </label>
            <TextField
              fullWidth
              minRows={3}
              inputProps={{ style: { fontSize: 12 } }}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={briefcase} alt="icon" style={{ width: 25 }} />
                  </InputAdornment>
                ),
              }}
              placeholder="Headline"
              value={personalInfoFormData.headline}
              onChange={(e) => handleChange("headline", e.target.value)}
              sx={{ mt: 1.5 }}
            />
          </AppDiv>
          <AppDiv
            sx={{
              my: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 3,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {/* ----| Email | ---- */}
            <AppDiv sx={{ ...flexCol, width: "100%", alignItems: "start" }}>
              <label
                style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}
              >
                Email
              </label>
              <TextField
                fullWidth
                disabled
                minRows={3}
                inputProps={{ style: { fontSize: 12 } }}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={smsIcon} alt="icon" style={{ width: 25 }} />
                    </InputAdornment>
                  ),
                }}
                placeholder="Email"
                // value={decryptedData.user.email}
                // onChange={(e) => handleChange("email", e.target.value)}
                sx={{ mt: 1.5 }}
              />
            </AppDiv>
            {/* ----| Portfolio Link | ---- */}
            <AppDiv sx={{ ...flexCol, width: "100%", alignItems: "start" }}>
              <label
                style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}
              >
                Portfolio Link
              </label>
              <TextField
                fullWidth
                minRows={3}
                inputProps={{ style: { fontSize: 12 } }}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={globalIcon} alt="icon" style={{ width: 25 }} />
                    </InputAdornment>
                  ),
                }}
                placeholder="Portfolio Link"
                value={personalInfoFormData.portfolio_link}
                onChange={(e) => handleChange("portfolio_link", e.target.value)}
                sx={{ mt: 1.5 }}
              />
            </AppDiv>
          </AppDiv>
          {/* ----| Gender | ---- */}
          <AppDiv
            sx={{ ...flexCol, mt: 3, width: "100%", alignItems: "start" }}
          >
            <label style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}>
              Gender
            </label>
            <Select
              displayEmpty
              fullWidth
              renderValue={() => (
                <span
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <img
                    src={gender}
                    style={{
                      position: "relative",
                      marginRight: 2,
                      width: 18,
                    }}
                  />
                  <span> {personalInfoFormData.gender}</span>
                </span>
              )}
              value={personalInfoFormData.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              sx={{ mt: 1.5 }}
            >
              {genderOptions.map((option, index) => (
                <MenuItem key={index} value={option.label}>
                  <Appcaption sx={{ color: "black" }}>
                    {option.label}
                  </Appcaption>
                </MenuItem>
              ))}
            </Select>
          </AppDiv>
          <AppDiv
            sx={{
              my: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 3,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {/* ----| Birth Place | ---- */}
            <AppDiv
              sx={{ ...flexCol, mt: 3, width: "100%", alignItems: "start" }}
            >
              <label
                style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}
              >
                Birth Place
              </label>
              <Select
                displayEmpty
                fullWidth
                renderValue={() => (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <img
                      src={locationIcon}
                      style={{
                        position: "relative",
                        marginRight: 2,
                        width: 18,
                      }}
                    />
                    <span> {personalInfoFormData.birth_place}</span>
                  </span>
                )}
                value={personalInfoFormData.birth_place}
                onChange={(e) => handleChange("birth_place", e.target.value)}
                sx={{ mt: 1.5 }}
              >
                {birthPlaceOptions.map((option, index) => (
                  <MenuItem key={index} value={option.label}>
                    <Appcaption sx={{ color: "black" }}>
                      {option.label}
                    </Appcaption>
                  </MenuItem>
                ))}
              </Select>
            </AppDiv>
            {/* ----| Date of Birth | ---- */}
            <AppDiv
              sx={{ ...flexCol, mt: 3, width: "100%", alignItems: "start" }}
            >
              <label
                style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}
              >
                Date of Birth
              </label>
              <TextField
                fullWidth
                type="date"
                inputProps={{ style: { fontSize: 12 } }}
                variant="outlined"
                value={personalInfoFormData.date_of_birth}
                onChange={(e) => handleChange("date_of_birth", e.target.value)}
                sx={{ mt: 1.5 }}
              />
            </AppDiv>
          </AppDiv>
          <Appheading sx={{ mt: 4, textAlign: "left" }}>Address</Appheading>
          <AppDiv
            sx={{
              my: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 3,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {/* ----| City / Town | ---- */}
            <AppDiv sx={{ ...flexCol, width: "100%", alignItems: "start" }}>
              <label
                style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}
              >
                City / Town
              </label>
              <Select
                displayEmpty
                fullWidth
                placeholder="City / Town"
                renderValue={() => (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <img
                      src={locationIcon}
                      style={{
                        position: "relative",
                        marginRight: 2,
                        width: 18,
                      }}
                    />
                    <span> {personalInfoFormData.cityTown}</span>
                  </span>
                )}
                value={personalInfoFormData.cityTown}
                onChange={(e) => handleChange("cityTown", e.target.value)}
                sx={{ mt: 1.5 }}
              >
                {birthPlaceOptions.map((option, index) => (
                  <MenuItem key={index} value={option.label}>
                    <Appcaption sx={{ color: "black" }}>
                      {option.label}
                    </Appcaption>
                  </MenuItem>
                ))}
              </Select>
            </AppDiv>
            {/* ----| Zip Code | ---- */}
            <AppDiv sx={{ ...flexCol, width: "100%", alignItems: "start" }}>
              <label
                style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}
              >
                Zip Code
              </label>
              <TextField
                fullWidth
                inputProps={{ style: { fontSize: 12 } }}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={discover} alt="icon" style={{ width: 25 }} />
                    </InputAdornment>
                  ),
                }}
                placeholder="Zip Code"
                value={personalInfoFormData.zipCode}
                onChange={(e) => handleChange("zipCode", e.target.value)}
                sx={{ mt: 1.5 }}
              />
            </AppDiv>
          </AppDiv>

          {/* ----| Detail Address | ---- */}
          <AppDiv
            sx={{ ...flexCol, mt: 3, width: "100%", alignItems: "start" }}
          >
            <label style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}>
              Detail Address
            </label>
            <TextField
              fullWidth
              inputProps={{ style: { fontSize: 12 } }}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={locationIcon} alt="icon" style={{ width: 25 }} />
                  </InputAdornment>
                ),
              }}
              placeholder="Detail Address"
              value={personalInfoFormData.detailAddress}
              onChange={(e) => handleChange("detailAddress", e.target.value)}
              sx={{ mt: 1.5 }}
            />
          </AppDiv>
          <Appheading sx={{ mt: 4, textAlign: "left" }}>
            Identity Card
          </Appheading>
          <AppDiv
            sx={{
              my: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 3,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {/* ----| Identity Type | ---- */}
            <AppDiv sx={{ ...flexCol, width: "100%", alignItems: "start" }}>
              <label
                style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}
              >
                Identity Type
              </label>
              <Select
                displayEmpty
                fullWidth
                placeholder="Identity Type"
                renderValue={() => (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <img
                      src={pc}
                      style={{
                        position: "relative",
                        marginRight: 2,
                        width: 18,
                      }}
                    />
                    <span> {personalInfoFormData.cityTown}</span>
                  </span>
                )}
                value={personalInfoFormData.cityTown}
                onChange={(e) => handleChange("cityTown", e.target.value)}
                sx={{ mt: 1.5 }}
              >
                {birthPlaceOptions.map((option, index) => (
                  <MenuItem key={index} value={option.label}>
                    <Appcaption sx={{ color: "black" }}>
                      {option.label}
                    </Appcaption>
                  </MenuItem>
                ))}
              </Select>
            </AppDiv>
            {/* ----| Identity Number | ---- */}
            <AppDiv sx={{ ...flexCol, width: "100%", alignItems: "start" }}>
              <label
                style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}
              >
                Identity Number
              </label>
              <TextField
                fullWidth
                inputProps={{ style: { fontSize: 12 } }}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={pc} alt="icon" style={{ width: 25 }} />
                    </InputAdornment>
                  ),
                }}
                placeholder="Identity Number"
                value={personalInfoFormData.id_card}
                onChange={(e) => handleChange("id_card", e.target.value)}
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
              <b> Save Changes</b>
            </AppButton>
          </Stack>
        </AppDiv>
      </form>
    </div>
  );
};

export default PersonalInfoTab;
