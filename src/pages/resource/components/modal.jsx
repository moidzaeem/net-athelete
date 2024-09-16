import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { alpha, beta } from "../../../utils/theme/colors";
import { AppButton } from "./../../../components/atoms/AppButton";
import AddIcon from "@mui/icons-material/Add";
import { flexCol, PaperStyle } from "../../../utils/styles";
import { AppPaper } from "./../../../components/atoms/AppPaper";
import AppDiv from "../../../components/atoms/AppDiv";
import {
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { Appcaption, Appheading } from "../../../utils/theme";
import AppSelect from "../../../components/molecules/AppSelect";
import doc from "../../../assets/red-svgs/doc.svg";
import AppTextFeild from "../../../components/molecules/AppTextFeild";
import usersIcon from "../../../assets/red-svgs/users-group.svg";
import dd from "../../../assets/red-svgs/Drag & Drop Area.svg";
import list from "../../../assets/red-svgs/list.svg";
import UploadSvg from "../../../assets/svg/UploadSvg";
import useCrypto from "../../../utils/hooks/encrypt";
import { toast } from "react-toastify";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    lg: "45vw",
    xs: "90%",
  },
  // height: {
  //   xs: "90%",
  // },
  bgcolor: "background.paper",
  border: "2px solid white",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
  overflow: {
    xs: "scroll",
  },
};

export default function ResourceModal() {
  const url = import.meta.env.VITE_BASE_URL;
  const { decryptedData } = useCrypto();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const categories = ["course", "webinar", "article"];
  const privacies = ["public", "private"];

  const [selectedImage, setSelectedImage] = React.useState(null);
  const [media, setMedia] = React.useState("");
  const [isUploadingFile, setIsUploadingFile] = React.useState(false);
  const [resourceFormData, setResourceFormData] = React.useState({
    title: "",
    category: "",
    privacy: "",
    // course_id: "",
    details: "",
  });

  const handleChange = (field, value) => {
    setResourceFormData((prevData) => ({
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

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    setIsUploadingFile(true);

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

  const handleAddResource = async (e) => {
    e.preventDefault();

    console.log("add resouce called.");
    console.log("resourceFormData has: ", resourceFormData);
    try {
      const token = decryptedData?.tokens?.access?.token;
      if (!token) {
        throw new Error("No token found in local storage");
      }

      const response = await axios.post(
        `${url}/resource`,
        { ...resourceFormData, media: media },
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
        throw new Error("Failed to Add Resource");
      }
    } catch (error) {
      console.error("Error adding Resource: ", error);
      toast.error("Failed to Add Resource. Please try again.");
    }
  };

  return (
    <div>
      <AppButton
        onClick={handleOpen}
        color="error"
        sx={{ backgroundColor: "#F83C4D", ml: 2 }}
        variant="contained"
        startIcon={<AddIcon />}
      >
        New
      </AppButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AppPaper
            sx={{
              ...PaperStyle,
              width: "100%",
              p: 0,
            }}
          >
            <Appheading sx={{ fontSize: 16, textAlign: "left" }}>
              <b>Create New Resource</b>
            </Appheading>
            <form onSubmit={handleAddResource} className="mt-3">
              {/* ----| Title | ---- */}
              <AppDiv sx={{ ...flexCol, width: "100%", alignItems: "start" }}>
                <label
                  style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}
                >
                  Title
                </label>
                <TextField
                  fullWidth
                  inputProps={{ style: { fontSize: 12 } }}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={doc} alt="icon" style={{ width: 25 }} />
                      </InputAdornment>
                    ),
                  }}
                  value={resourceFormData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Enter Title"
                  sx={{ mt: 1.5 }}
                />
              </AppDiv>
              <AppDiv
                sx={{
                  mt: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <AppDiv sx={{ ...flexCol, width: "100%", alignItems: "start" }}>
                  <label
                    style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}
                  >
                    Category
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
                          src={list}
                          style={{
                            position: "relative",
                            marginRight: 2,
                            width: 18,
                          }}
                        />
                        <span>{resourceFormData.category}</span>
                      </span>
                    )}
                    value={resourceFormData.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    sx={{ mt: 1.5 }}
                  >
                    {categories.map((category, index) => (
                      <MenuItem key={index} value={category}>
                        <Appcaption
                          sx={{ color: "black", textTransform: "capitalize" }}
                        >
                          {category}
                        </Appcaption>
                      </MenuItem>
                    ))}
                  </Select>
                </AppDiv>
                <AppDiv sx={{ ...flexCol, width: "100%", alignItems: "start" }}>
                  <label
                    style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}
                  >
                    Privacy
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
                          src={usersIcon}
                          style={{
                            position: "relative",
                            marginRight: 2,
                            width: 18,
                          }}
                        />
                        <span>{resourceFormData.privacy}</span>
                      </span>
                    )}
                    value={resourceFormData.privacy}
                    onChange={(e) => handleChange("privacy", e.target.value)}
                    sx={{ mt: 1.5 }}
                  >
                    {privacies.map((privacy, index) => (
                      <MenuItem key={index} value={privacy}>
                        <Appcaption
                          sx={{ color: "black", textTransform: "capitalize" }}
                        >
                          {privacy}
                        </Appcaption>
                      </MenuItem>
                    ))}
                  </Select>
                </AppDiv>
              </AppDiv>
              <AppDiv
                sx={{ ...flexCol, mt: 3, width: "100%", alignItems: "start" }}
              >
                <label
                  style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}
                >
                  Details
                </label>
                <TextField
                  fullWidth
                  inputProps={{ style: { fontSize: 12 } }}
                  variant="outlined"
                  value={resourceFormData.details}
                  onChange={(e) => handleChange("details", e.target.value)}
                  placeholder="Enter details"
                  sx={{ mt: 1.5 }}
                />
              </AppDiv>
              <AppDiv
                sx={{ ...flexCol, mt: 3, width: "100%", alignItems: "start" }}
              >
                <label
                  style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}
                >
                  Upload Media
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
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </AppDiv>
              <Stack direction="row" justifyContent={"end"} mt={8} gap={2}>
                <AppButton
                  type="button"
                  onClick={handleClose}
                  variant="contained"
                  sx={{ backgroundColor: alpha, color: "#7F879E", width: 130 }}
                >
                  <b>Discard</b>
                </AppButton>
                <AppButton
                  type="submit"
                  sx={{ backgroundColor: beta, width: 130, color: "black" }}
                  variant="contained"
                >
                  <b>Save Changes</b>
                </AppButton>
              </Stack>
            </form>
          </AppPaper>
        </Box>
      </Modal>
    </div>
  );
}
