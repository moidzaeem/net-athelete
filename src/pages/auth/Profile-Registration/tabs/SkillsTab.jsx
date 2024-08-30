import { Autocomplete, Paper, Stack, TextField } from "@mui/material";
import { Appcaption, Appheading } from "../../../../utils/theme";
import AppDiv from "../../../../components/atoms/AppDiv";
import { PaperStyle } from "../../../../utils/styles";
import AppTextFeild from "../../../../components/molecules/AppTextFeild";
import { AppButton } from "../../../../components/atoms/AppButton";
import { alpha, beta } from "../../../../utils/theme/colors";
import React from "react";
import useCrypto from "../../../../utils/hooks/encrypt";
import { flexCol } from "../../../../utils/styles";

const SkillsTab = () => {
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

      <AppDiv height={30} />

      <form>
        <AppDiv sx={{ ...flexCol, width: "100%", alignItems: "start" }}>
          <label style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}>
            Skills You Have
          </label>
          <Autocomplete
            multiple
            options={names}
            getOptionLabel={(option) => option}
            disableCloseOnSelect
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Multiple Autocomplete"
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
            <b>Save Changes</b>
            {/* <b>{isUpdating ? "Update" : "Save Changes"}</b> */}
          </AppButton>
        </Stack>
      </form>
    </Paper>
  );
};

export default SkillsTab;
