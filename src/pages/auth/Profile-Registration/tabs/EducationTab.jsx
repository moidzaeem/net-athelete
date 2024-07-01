import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  Paper,
  Stack,
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

const EducationTab = () => {
  return (
    <Paper
      sx={{
        ...PaperStyle,
        width: "100%",
        p: 2,
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

      <AppDiv sx={{ display: "flex", justifyContent: "space-between" }}>
        <AppDiv sx={{ display: "flex", justifyContent: "space-between" }}>
          <AppAvatar alt="Remy Sharp" src={education} sx={{ width: 45, height: 45 }} />
          <AppDiv sx={{ ml: 2 }}>
            <Appfont sx={{ textAlign: "left", fontSize: 14 }}>
              <b>Oxford University</b>{" "}
            </Appfont>
            <Appfont sx={{ textAlign: "left", color: "#7F879E" }}>
              Student - Software Engienering
            </Appfont>
            <Appcaption sx={{ textAlign: "left", color: "#7F879E" }}>
              {" "}
              2018 - 2021 . 8 Mos
            </Appcaption>
          </AppDiv>
        </AppDiv>

        <AppDiv sx={{ mt: 3 }}>
          <IconButton>
            <img src={edit} alt="" style={{ width: 20 }} />
          </IconButton>
          <IconButton>
            <img src={trash} alt="" style={{ width: 20 }} />
          </IconButton>
        </AppDiv>
      </AppDiv>
      <Divider sx={{ my: 5 }} />
      <Appheading sx={{ fontSize: 16, textAlign: "left" }}>
        <b>Add New Experience</b>
      </Appheading>
      <AppDiv height={30} />
      <AppTextFeild label={"School Name"} placeholder="Enter school name" icon={teacher} />
      <AppDiv height={30} />
      <AppTextFeild label={"Degree"} placeholder="Enter degree" icon={medal} />
      <AppDiv height={30} />
      <AppTextFeild
        label={"Field of Study"}
        placeholder="Enter your field of study"
        icon={buildings}
      />
      <AppDiv height={30} />
      <AppTextFeild label={"Grade"} placeholder="Select  grade" icon={ranking} />
      <AppDiv height={30} />

      <FormGroup>
        <FormControlLabel
          control={<Checkbox color="success" />}
          label="I’m currently studying in this school"
        />
      </FormGroup>
      <AppDiv height={30} />
      <AppDiv
        sx={{
          display: "flex",
          alignItems: "end",
          justifyContent: "space-between",
          gap: 3,
          flexDirection: {
            md: "row",
            xs: "column",
          },
        }}
      >
        <AppSelect
          label="Start Date"
          img={calendar}
          iconStyle={{ width: "25px" }}
          options={[{ label: "Select start date" }]}
        />
        <AppSelect
          label="End Date"
          img={calendar}
          iconStyle={{ width: "25px" }}
          options={[{ label: "Select end date" }]}
        />
      </AppDiv>
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

export default EducationTab;
