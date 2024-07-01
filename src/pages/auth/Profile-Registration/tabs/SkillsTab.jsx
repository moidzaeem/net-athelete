import { Paper, Stack } from "@mui/material";
import { Appcaption, Appheading } from "../../../../utils/theme";
import AppDiv from "../../../../components/atoms/AppDiv";
import { PaperStyle } from "../../../../utils/styles";
import AppTextFeild from "../../../../components/molecules/AppTextFeild";
import { AppButton } from "../../../../components/atoms/AppButton";
import { alpha, beta } from "../../../../utils/theme/colors";

const SkillsTab = () => {
  return (
    <Paper
      sx={{
        ...PaperStyle,
        width: "100%",
        p: 2,
      }}
    >
      <Appheading sx={{ fontSize: 16, textAlign: "left" }}>
        <b>Skills</b>
      </Appheading>
      <AppDiv height={30} />
      <AppTextFeild label={"Skills You Have"} />
      <AppDiv height={20} />
      <Appcaption sx={{ textAlign: "left", fontSize: 12 }}>
        Clients will be easy to find based on the skills you have
      </Appcaption>
      <AppDiv height={60} />
      <AppDiv>
        <Stack spacing={2} direction="row" justifyContent={"end"}>
          <AppButton
            variant="contained"
            sx={{ backgroundColor: alpha, color: "#7F879E", width: 130 }}
          >
            <b> Discard</b>
          </AppButton>
          <AppButton sx={{ backgroundColor: beta, width: 130, color: "black" }} variant="contained">
            <b> Save Changes</b>
          </AppButton>
        </Stack>
      </AppDiv>
    </Paper>
  );
};

export default SkillsTab;
