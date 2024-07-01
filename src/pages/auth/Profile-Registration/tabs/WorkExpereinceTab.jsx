import {
  Avatar,
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
import light from "../../../../assets/svg/light.svg";
import briefcase from "../../../../assets/red-svgs/briefcase.svg";
import AppTextFeild from "../../../../components/molecules/AppTextFeild";
import location from "../../../../assets/red-svgs/location.svg";
import buildings from "../../../../assets/red-svgs/buildings.svg";
import AppSelect from "../../../../components/molecules/AppSelect";
import calendar from "../../../../assets/red-svgs/calendar-2.svg";
import { AppButton } from "../../../../components/atoms/AppButton";
import { alpha, beta } from "../../../../utils/theme/colors";

const WorkExpereinceTab = () => {
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
          <Avatar alt="Remy Sharp" src={light} sx={{ width: 45, height: 45 }} />
          <AppDiv sx={{ ml: 2 }}>
            <Appfont sx={{ textAlign: "left", fontSize: 14 }}>
              <b>Soccer Coach</b>{" "}
            </Appfont>
            <Appfont sx={{ textAlign: "left", color: "#7F879E" }}>Ideologist Team </Appfont>
            <Appcaption sx={{ textAlign: "left", color: "#7F879E" }}>
              {" "}
              Jan 2022 - Present . 8 Mos
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
      <AppTextFeild label={"Work Title"} placeholder="Enter work title" icon={briefcase} />
      <AppDiv height={30} />
      <AppTextFeild
        label={"Employment Type"}
        placeholder="Enter employment type"
        icon={briefcase}
      />
      <AppDiv height={30} />
      <AppTextFeild label={"Company Name"} placeholder="Enter your company name" icon={buildings} />
      <AppDiv height={30} />
      <AppTextFeild label={"Location"} placeholder="Select working location" icon={location} />
      <AppDiv height={30} />

      <FormGroup>
        <FormControlLabel
          control={<Checkbox color="success" />}
          label="I’m currently working in this role"
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

export default WorkExpereinceTab;
