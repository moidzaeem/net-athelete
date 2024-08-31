import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
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
import { format } from "date-fns";
import UploadSvg from "../../../../assets/svg/UploadSvg";
import { toast } from "react-toastify";

const CertificationTab = () => {
  const { decryptedData } = useCrypto();
  const url = import.meta.env.VITE_BASE_URL;
  const [certificationsList, setCertificationsList] = React.useState([]);
  const [certificationId, setCertificationId] = React.useState();
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [isUploadingFile, setIsUploadingFile] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [media, setMedia] = React.useState("");
  const [certificationFormData, setCertificationFormData] = React.useState({
    name: "",
    published_by: "",
    location: "",
    start_date: "",
    end_date: "",
    no_expiration: false,
    cv: "",
  });

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    setIsUploadingFile(true);
    const url = import.meta.env.VITE_BASE_URL;

    try {
      const token = decryptedData.tokens.access.token;
      if (!token) {
        throw new Error("No token found in local storage");
      }

      const formData = new FormData();
      formData.append("file", selectedImage);

      const response = await axios.post(`${url}/user/upload-file`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        if (response.data.status !== 400) {
          setMedia(response.data.data.upload_link);
        }
        setIsUploadingFile(false);

        toast.success(response.data.message);
      } else {
        throw new Error("Failed to upload file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsUploadingFile(false);
      toast.error("Failed to upload file. Please try again.");
    }
  };

  const handleChange = (field, value) => {
    setCertificationFormData((prevData) => ({
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
  }, [decryptedData]);
  // }, [decryptedData, certificationsList]);

  const handleDeleteCertification = async (certificationId) => {
    try {
      const token = decryptedData?.tokens?.access?.token;
      if (!token) {
        throw new Error("No token found in local storage");
      }

      const response = await axios.delete(
        `${url}/certification/${certificationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setCertificationsList((prevCertification) =>
          prevCertification.filter(
            (certification) => certification.id !== certificationId
          )
        );
        toast.success("Certification Deleted Successfully.");
      } else {
        throw new Error("Failed to delete Certification");
      }
    } catch (error) {
      console.error("Error deleting Certification:", error);
    }
  };

  const handleAddCertification = async (e) => {
    e.preventDefault();
    // console.log("add is called...");
    // console.log("workExpFormData has: ", educationFormData);
    try {
      const token = decryptedData?.tokens?.access?.token;
      if (!token) {
        throw new Error("No token found in local storage");
      }
      const response = await axios.post(
        `${url}/certification`,
        { ...certificationFormData, cv: media },
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
        throw new Error("Failed to Add Certification");
      }
    } catch (error) {
      console.error("Error adding Certification: ", error);
      toast.error("Failed to Add Certification. Please try again.");
    }
  };

  const handleUpdateCertification = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    console.log("updated is called...");
    try {
      const token = decryptedData?.tokens?.access?.token;
      if (!token) {
        throw new Error("No token found in local storage");
      }
      const response = await axios.patch(
        `${url}/certification/${certificationId}`,
        certificationFormData,
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
        throw new Error("Failed to Update Certification Detail");
      }
    } catch (error) {
      console.error("Error Updating Certification Detail: ", error);
      toast.error("Failed to Update Certification Detail. Please try again.");
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
                  onClick={() => handleDeleteCertification(certification.id)}
                >
                  <img src={trash} alt="" style={{ width: 20 }} />
                </IconButton>
              </AppDiv>
            </AppDiv>
          );
        })}
      </AppDiv>

      <Divider sx={{ my: 5 }} />

      <Appheading sx={{ fontSize: 16, textAlign: "left" }}>
        <b>Add New Certification</b>
      </Appheading>

      <form
        onSubmit={
          isUpdating ? handleUpdateCertification : handleAddCertification
        }
      >
        {/* ----| Certification Name |---- */}
        <AppDiv sx={{ ...flexCol, width: "100%", alignItems: "start" }}>
          <label style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}>
            Certification Name
          </label>
          <TextField
            fullWidth
            inputProps={{ style: { fontSize: 12 } }}
            variant="outlined"
            placeholder="Enter Certification Name"
            sx={{ mt: 1.5 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src={doc} alt="icon" style={{ width: 25 }} />
                </InputAdornment>
              ),
            }}
            value={certificationFormData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </AppDiv>
        {/* ----| Published By |---- */}
        <AppDiv sx={{ ...flexCol, mt: 3, width: "100%", alignItems: "start" }}>
          <label style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}>
            Published By
          </label>
          <TextField
            fullWidth
            inputProps={{ style: { fontSize: 12 } }}
            variant="outlined"
            placeholder="Enter Published By"
            sx={{ mt: 1.5 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src={buildings} alt="icon" style={{ width: 25 }} />
                </InputAdornment>
              ),
            }}
            value={certificationFormData.published_by}
            onChange={(e) => handleChange("published_by", e.target.value)}
          />
        </AppDiv>
        {/* ----| Location |---- */}
        <AppDiv sx={{ ...flexCol, mt: 3, width: "100%", alignItems: "start" }}>
          <label style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}>
            Location
          </label>
          <TextField
            fullWidth
            inputProps={{ style: { fontSize: 12 } }}
            variant="outlined"
            placeholder="Enter Location"
            sx={{ mt: 1.5 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src={location} alt="icon" style={{ width: 25 }} />
                </InputAdornment>
              ),
            }}
            value={certificationFormData.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />
        </AppDiv>{" "}
        <AppDiv
          sx={{
            mt: 3,
            display: "flex",
            alignItems: "center",
            gap: 3,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* ----| Start Date |---- */}
          <AppDiv sx={{ ...flexCol, width: "100%", alignItems: "start" }}>
            <label style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}>
              Start Date
            </label>
            <TextField
              fullWidth
              type="date"
              placeholder="Select Start Date"
              inputProps={{ style: { fontSize: 12 } }}
              variant="outlined"
              value={
                certificationFormData.start_date
                  ? format(
                      new Date(certificationFormData.start_date),
                      "yyyy-MM-dd"
                    )
                  : ""
              }
              // value={educationFormData.from}
              onChange={(e) => handleChange("start_date", e.target.value)}
              sx={{ mt: 1.5 }}
            />
          </AppDiv>
          {/* ----| End Date |---- */}
          <AppDiv sx={{ ...flexCol, width: "100%", alignItems: "start" }}>
            <label style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}>
              End Date
            </label>
            <TextField
              fullWidth
              type="date"
              placeholder="Select End Date"
              inputProps={{ style: { fontSize: 12 } }}
              variant="outlined"
              value={
                certificationFormData.end_date
                  ? format(
                      new Date(certificationFormData.end_date),
                      "yyyy-MM-dd"
                    )
                  : ""
              }
              onChange={(e) => handleChange("end_date", e.target.value)}
              sx={{ mt: 1.5 }}
            />
          </AppDiv>
        </AppDiv>
        {/* ----| No Expiration |---- */}
        <AppDiv sx={{ ...flexCol, mt: 3, width: "100%", alignItems: "start" }}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox color="success" />}
              label="No Expiration Date"
              value={certificationFormData.no_expiration}
              checked={certificationFormData.no_expiration}
              onChange={(e) => handleChange("no_expiration", e.target.checked)}
            />
          </FormGroup>
        </AppDiv>
        {/* ----| Upload CV or Project |---- */}
        <AppDiv sx={{ ...flexCol, mt: 3, width: "100%", alignItems: "start" }}>
          <label style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}>
            Upload cv or project
          </label>
          <label
            htmlFor="upload-certificate"
            className="mt-3.5 bg-[#FFF6F6] w-full flex flex-col items-center py-8 text-[#7F879E] rounded-xl border-2 border-[#F83C4D] border-dashed cursor-pointer"
          >
            <UploadSvg className="group-hover:text-primary h-9 stroke-current w-9" />
            <p className="mt-3">
              Drag or{" "}
              <span
                className="text-[#F83C4D] text-sm font-normal"
                style={{ fontFamily: "Poppins" }}
              >
                upload
              </span>{" "}
              project files
            </p>
            <input
              disabled={isUploadingFile}
              type="file"
              multiple={false}
              id="upload-certificate"
              onChange={handleFileUpload} // onChange={handleFileChange}
              className="hidden"
            />
          </label>
          {/* {media}
          <button type="button" onClick={handleFileUpload}>
            upload file
          </button> */}
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
            <b>{isUpdating ? "Update" : "Save Changes"}</b>
          </AppButton>
        </Stack>
      </form>
    </Paper>
  );
};

export default CertificationTab;
