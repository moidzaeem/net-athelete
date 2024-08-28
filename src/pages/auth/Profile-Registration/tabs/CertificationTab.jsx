import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Paper,
  Stack,
} from "@mui/material";
import { Appcaption, Appfont, Appheading } from "../../../../utils/theme";
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
import React from "react";
import useCrypto from "../../../../utils/hooks/encrypt";
import { flexCol } from "../../../../utils/styles";
import axios from "axios";
import { AppAvatar } from "../../../../components/atoms/AppAvatar";
import education from "../../../../assets/svg/education.svg";
import edit from "../../../../assets/svg/edit.svg";
import trash from "../../../../assets/svg/trash.svg";

const CertificationTab = () => {
  const { decryptedData } = useCrypto();
  const url = import.meta.env.VITE_BASE_URL;
  const [certificationsList, setCertificationsList] = React.useState([]);
  const [certificationDetailsId, setCertificationId] = React.useState();
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [certificationFormData, setCertificationFormData] = React.useState({
    name: "",
    published_by: "",
    location: "",
    start_date: "",
    end_date: "",
    no_expiration: "",
    cv: "",
  });

  React.useEffect(() => {
    const getCertificationsList = async () => {
      try {
        const token = decryptedData?.tokens?.access?.token;
        if (!token) {
          throw new Error("No token found in local storage");
        }

        const response = await axios.get(`${url}/certification`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // console.log("response has: ", response);

        if (response.status === 200) {
          const userCertificationsList = response.data.data;
          setCertificationsList(userCertificationsList.result);
          // console.log("education list  ha:", educationList);
        } else {
          throw new Error("Failed to fetch User Certificatons.");
        }
      } catch (error) {
        console.error("Error fetching user profile data:", error);
      }
    };
    getCertificationsList();
  }, [decryptedData, certificationsList]);
  // }, [decryptedData]);

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
        <Appheading sx={{ fontSize: 16, textAlign: "left" }}>
          <b>Certifications</b>
        </Appheading>
      </AppDiv>

      <AppDiv sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {certificationsList.map((certification) => {
          const start_date = new Date(certification.start_date);
          const formattedDate = start_date.toLocaleString("en-US", {
            month: "short",
            year: "numeric",
          });
          const end_date = certification.end_date
            ? new Date(certification.end_date)
            : new Date();

          const certification_duration = calculateDuration(
            start_date,
            end_date
          );

          function calculateDuration(startDate, endDate) {
            const diffTime = Math.abs(endDate - startDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const years = Math.floor(diffDays / 365);
            const months = Math.floor((diffDays % 365) / 30);

            return `${years > 0 ? `${years} yrs` : ""} ${months} mon`;
          }

          return (
            <AppDiv
              key={certification.id}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <AppDiv sx={{ display: "flex", justifyContent: "space-between" }}>
                <AppAvatar
                  alt="Remy Sharp"
                  src={education}
                  sx={{ width: 45, height: 45 }}
                />
                <AppDiv sx={{ ml: 2 }}>
                  <Appfont sx={{ textAlign: "left", fontSize: 14 }}>
                    <b>{certification.published_by}</b>
                  </Appfont>
                  <Appfont sx={{ textAlign: "left", color: "#7F879E" }}>
                    {certification.name}
                  </Appfont>
                  <Appcaption sx={{ textAlign: "left", color: "#7F879E" }}>
                    {formattedDate}
                    {" - "}
                    {certification_duration}
                  </Appcaption>
                </AppDiv>
              </AppDiv>
              <AppDiv sx={{ mt: 3 }}>
                <IconButton
                  onClick={() => {
                    setCertificationFormData({
                      name: certification.name,
                      published_by: certification.published_by,
                      location: certification.location,
                      start_date: certification.start_date,
                      end_date: certification.end_date,
                      no_expiration: certification.no_expiration,
                      cv: certification.cv,
                    });
                    setIsUpdating(true);
                    setCertificationId(certification.id);
                  }}
                >
                  <img src={edit} alt="" style={{ width: 20 }} />
                </IconButton>
                <IconButton
                // onClick={() => handleDeleteEducation(education.id)}
                >
                  <img src={trash} alt="" style={{ width: 20 }} />
                </IconButton>
              </AppDiv>
            </AppDiv>
          );
        })}
      </AppDiv>

      <AppDiv height={30} />
      <AppTextFeild
        label={"Certifications Name"}
        placeholder="Enter work title"
        icon={doc}
      />
      <AppDiv height={30} />
      <AppTextFeild
        label={"Published By"}
        placeholder="Enter employment type"
        icon={buildings}
      />
      <AppDiv height={30} />
      <AppTextFeild
        label={"Location"}
        placeholder="Enter your company name"
        icon={location}
      />
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
        <FormControlLabel
          control={<Checkbox color="success" />}
          label="No expiration date"
        />
      </FormGroup>
      <AppDiv height={30} />
      <AppDiv
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
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
          <AppButton
            sx={{ backgroundColor: beta, width: 130, color: "black" }}
            variant="contained"
          >
            <b> Save Changes</b>
          </AppButton>
        </Stack>
      </AppDiv>
    </Paper>
  );
};

export default CertificationTab;
