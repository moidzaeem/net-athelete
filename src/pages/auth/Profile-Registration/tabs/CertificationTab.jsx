import { Checkbox, FormControlLabel, FormGroup, Paper, Stack } from "@mui/material";
import { Appheading } from "../../../../utils/theme";
import AppDiv from "../../../../components/atoms/AppDiv";
import { PaperStyle } from "../../../../utils/styles";
import AppTextFeild from "../../../../components/molecules/AppTextFeild";
import location from "../../../../assets/red-svgs/location.svg";
import AppSelect from "../../../../components/molecules/AppSelect";
import { AppButton } from "../../../../components/atoms/AppButton";
import { alpha, beta } from "../../../../utils/theme/colors";
import doc from "../../../../assets/red-svgs/doc.svg";
import buildings from "../../../../assets/red-svgs/buildings.svg";
import dd from "../../../../assets/red-svgs/Drag & Drop Area.svg";
import calendar from "../../../../assets/red-svgs/calendar-2.svg";

const CertificationTab = () => {
  return (
    <Paper
      sx={{
        ...PaperStyle,
        width: "100%",
        p: 2,
      }}
    >
      <Appheading sx={{ fontSize: 16, textAlign: "left" }}>
        <b>Certifications</b>
      </Appheading>
      <AppDiv height={30} />
      <AppTextFeild label={"Certifications Name"} placeholder="Enter work title" icon={doc} />
      <AppDiv height={30} />
      <AppTextFeild label={"Published By"} placeholder="Enter employment type" icon={buildings} />
      <AppDiv height={30} />
      <AppTextFeild label={"Location"} placeholder="Enter your company name" icon={location} />
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
      <AppDiv height={30} />
      <FormGroup>
        <FormControlLabel control={<Checkbox color="success" />} label="No expiration date" />
      </FormGroup>
      <AppDiv height={30} />
      <AppDiv sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <Appheading
          sx={{ fontFamily: "Poppins", fontWeight: 500, fontSize: 16, mb: 3 }}
          htmlFor="text"
        >
          Upload cv or project*
        </Appheading>
        <img src={dd} alt="" style={{ width: "100%" }} />
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

export default CertificationTab;
