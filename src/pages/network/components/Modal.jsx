import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import { AppButton } from "./../../../components/atoms/AppButton";
import { flexCol, PaperStyle } from "../../../utils/styles";
import { AppPaper } from "./../../../components/atoms/AppPaper";
import AppDiv from "../../../components/atoms/AppDiv";
import { InputAdornment, Stack, TextField } from "@mui/material";
import { Appheading } from "../../../utils/theme";
import AppSelect from "../../../components/molecules/AppSelect";
import AppTextFeild from "../../../components/molecules/AppTextFeild";
import doc from "../../../assets/red-svgs/doc.svg";
import usersIcon from "../../../assets/red-svgs/users-group.svg";
import list from "../../../assets/red-svgs/list.svg";
import axios from "axios"; // Import axios at the top of your file
import { toast } from "react-toastify";
import useCrypto from "../../../utils/hooks/encrypt";
import AppTextField from "../../../components/molecules/AppTextFeild";
import UploadSvg from "../../../assets/svg/UploadSvg";
import { alpha, beta } from "../../../utils/theme/colors";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    lg: 700,
    xs: "90%",
  },
  // height: {
  //   xs: "85%",
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

const NetworkModal = () => {
  const { decryptedData } = useCrypto();
  const url = import.meta.env.VITE_BASE_URL;

  const [open, setOpen] = React.useState(false);
  // const [name, setName] = useState("");
  // const [category, setCategory] = useState("");
  // const [isPublic, setIsPublic] = useState(false);
  // const [groupRules, setGroupRules] = useState("");

  const [selectedImage, setSelectedImage] = React.useState(null);
  const [media, setMedia] = React.useState("");
  const [isUploadingFile, setIsUploadingFile] = React.useState(false);
  const [groupFormData, setGroupFormData] = React.useState({
    name: "",
    cover_pic: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const handleNameChange = (value) => setName(value);
  // const handleCategoryChange = (value) => setCategory(value);
  // const handleIsPublicChange = (value) => setIsPublic(value === "true");
  // const handleGroupRulesChange = (value) => setGroupRules(value);

  const handleChange = (field, value) => {
    setGroupFormData((prevData) => ({
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

  const handleAddGroup = async (e) => {
    e.preventDefault();

    console.log("add group called.");
    console.log("groupFormData has: ", groupFormData);
    try {
      const token = decryptedData?.tokens?.access?.token;
      if (!token) {
        throw new Error("No token found in local storage");
      }

      const response = await axios.post(
        `${url}/group`,
        { ...groupFormData, cover_pic: media },
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
        throw new Error("Failed to Create Group");
      }
    } catch (error) {
      console.error("Error Ceating Group: ", error);
      toast.error("Failed to Create Group. Please try again.");
    }
  };

  // const handleSubmit = async () => {
  //   try {
  //     const token = decryptedData.tokens.access.token; // Get JWT token from local storage
  //     if (!token) {
  //       throw new Error("No token found in local storage");
  //     }

  //     const response = await axios.post(
  //       `${url}/group`,
  //       {
  //         name,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       toast.success(response.data.message); // Notify user of success
  //       handleClose(); // Close modal after successful submission
  //     } else {
  //       throw new Error("Failed to create group");
  //     }
  //   } catch (error) {
  //     console.error("Error creating group:", error);
  //     toast.error("Failed to create group. Please try again."); // Notify user of failure
  //   }
  // };

  return (
    <div>
      <AppButton
        onClick={handleOpen}
        sx={{ background: "#FF0000", color: "white", ml: 1 }}
        color="primary"
        variant="contained"
        startIcon={<AddIcon />}
      >
        Create Group
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
              <b>Create New Group</b>
            </Appheading>
            <form onSubmit={handleAddGroup}>
              {/* ----| Group Name | ---- */}
              <AppDiv sx={{ ...flexCol, width: "100%", alignItems: "start" }}>
                <label
                  style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}
                >
                  Group Name
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
                  value={groupFormData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Enter Group Name"
                  sx={{ mt: 1.5 }}
                />
              </AppDiv>
              {/* ----| Group Image | ---- */}
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
              {/* <AppDiv
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
                  label="Category"
                  img={list}
                  iconStyle={{ width: "25px" }}
                  options={[{ label: "Select start date" }]}
                  // value={category}
                  // onChange={handleCategoryChange}
                />
                <AppSelect
                  label="Public"
                  img={usersIcon}
                  iconStyle={{ width: "25px" }}
                  options={[{ label: "Public" }]}
                  // value={isPublic ? "true" : "false"}
                  // onChange={handleIsPublicChange}
                />
              </AppDiv>
              <AppDiv height={30} />
              <AppTextField
                rest={{ height: 100 }}
                label="Group Rules"
                value={groupRules}
                onChange={handleGroupRulesChange}
              />
              <AppDiv height={60} /> */}

              <Stack direction="row" justifyContent={"end"} mt={8} gap={2}>
                <AppButton
                  type="button"
                  onClick={handleClose}
                  variant="contained"
                  sx={{ backgroundColor: alpha, color: "#7F879E", width: 130 }}
                >
                  <b> Discard</b>
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
};

export default NetworkModal;
