import { Autocomplete, Divider, Paper, Stack, TextField } from "@mui/material";
import { Appcaption, Appheading } from "../../../../utils/theme";
import AppDiv from "../../../../components/atoms/AppDiv";
import { PaperStyle } from "../../../../utils/styles";
import AppTextFeild from "../../../../components/molecules/AppTextFeild";
import { AppButton } from "../../../../components/atoms/AppButton";
import { alpha, beta } from "../../../../utils/theme/colors";
import React from "react";
import useCrypto from "../../../../utils/hooks/encrypt";
import { flexCol } from "../../../../utils/styles";
import axios from "axios";
import { toast } from "react-toastify";

const SkillsTab = () => {
  const { decryptedData } = useCrypto();
  const url = import.meta.env.VITE_BASE_URL;
  const [userInfo, setUserInfo] = React.useState();
  const [skills, setSkills] = React.useState([]);
  const names = [
    "OOP",
    "JS",
    "Node.js",
    "React",
    "Next.js",
    "React Native",
    "C#",
    "Ruby",
    ".Net",
  ];

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

          setUserInfo(userProfileData);
          console.log("userProfileData: ", userInfo);
        } else {
          throw new Error("Failed to fetch user profile data");
        }
      } catch (error) {
        console.error("Error fetching user profile data:", error);
      }
    };
    getUserProfile();
  }, [decryptedData]);

  const handleUpdateSkills = async (e) => {
    e.preventDefault();
    console.log("skill shas: ", skills);
    try {
      const token = decryptedData?.tokens?.access?.token;
      if (!token) {
        throw new Error("No token found in local storage");
      }
      const response = await axios.patch(
        `${url}/user/add-skills`,
        { skills },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        throw new Error("Failed to Update Skills");
      }
    } catch (error) {
      console.error("Error Updating Skills: ", error);
      toast.error("Failed to Update Skills. Please try again.");
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
      <Appheading sx={{ fontSize: 16, textAlign: "left" }}>
        <b>Skills</b>
      </Appheading>

      <div className="mt-3 flex gap-3">
        {userInfo?.skills.map((skill) => (
          <div
            key={skill}
            className="bg-[#C8FA3B] py-2 px-4 rounded-full text-lg"
          >
            <b>{skill}</b>
          </div>
        ))}
      </div>

      <Divider sx={{ my: 5 }} />

      <form onSubmit={handleUpdateSkills}>
        <AppDiv sx={{ ...flexCol, width: "100%", alignItems: "start" }}>
          <label style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}>
            Skills You Have
          </label>
          <Autocomplete
            multiple
            options={names}
            getOptionLabel={(option) => option}
            disableCloseOnSelect
            value={skills} // Bind the state to the Autocomplete
            onChange={(event, newValue) => setSkills(newValue)}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Multiple Autocomplete"
                // value={skills}
                // onChange={(e) => setSkills(e.target.value)}
              />
            )}
          />
        </AppDiv>
        <Appcaption sx={{ mt: 2, textAlign: "left", fontSize: 12 }}>
          Clients will be easy to find based on the skills you have
        </Appcaption>
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
            Save Changes
          </AppButton>
        </Stack>
      </form>
    </Paper>
  );
};

export default SkillsTab;
