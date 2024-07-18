import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import { AppButton } from "./../../../components/atoms/AppButton";
import { PaperStyle } from "../../../utils/styles";
import { AppPaper } from "./../../../components/atoms/AppPaper";
import AppDiv from "../../../components/atoms/AppDiv";
import { Stack } from "@mui/material";
import { Appheading } from "../../../utils/theme";
import AppSelect from "../../../components/molecules/AppSelect";
import AppTextFeild from "../../../components/molecules/AppTextFeild";
import doc from "../../../assets/red-svgs/doc.svg";
import usersIcon from "../../../assets/red-svgs/users-group.svg";
import list from "../../../assets/red-svgs/list.svg";
import axios from 'axios'; // Import axios at the top of your file
import { toast } from "react-toastify";
import useCrypto from "../../../utils/hooks/encrypt";
import AppTextField from "../../../components/molecules/AppTextFeild";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    lg: 700,
    xs: "90%",
  },
  height: {
    xs: "85%",
  },
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
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [groupRules, setGroupRules] = useState("");
  const { decryptedData } = useCrypto();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const url = import.meta.env.VITE_BASE_URL;

  const handleNameChange = (value) => setName(value);
  const handleCategoryChange = (value) => setCategory(value);
  const handleIsPublicChange = (value) => setIsPublic(value === "true");
  const handleGroupRulesChange = (value) => setGroupRules(value);

  const handleSubmit = async () => {
    try {
      const token = decryptedData.tokens.access.token; // Get JWT token from local storage
      if (!token) {
        throw new Error('No token found in local storage');
      }

      const response = await axios.post(
        `${url}/group`,
        {
          name,
       
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message); // Notify user of success
        handleClose(); // Close modal after successful submission
      } else {
        throw new Error('Failed to create group');
      }
    } catch (error) {
      console.error('Error creating group:', error);
      toast.error('Failed to create group. Please try again.'); // Notify user of failure
    }
  };

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
            <AppDiv height={30} />
            <AppTextField
              label="Group Name"
              placeholder="Enter Group Name"
              icon={doc}
              value={name}
              onChange={handleNameChange}
            />
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
                label="Category"
                img={list}
                iconStyle={{ width: "25px" }}
                options={[{ label: "Select start date" }]}
                value={category}
                onChange={handleCategoryChange}
              />
              <AppSelect
                label="Public"
                img={usersIcon}
                iconStyle={{ width: "25px" }}
                options={[{ label: "Public" }]}
                value={isPublic ? "true" : "false"}
                onChange={handleIsPublicChange}
              />
            </AppDiv>
            <AppDiv height={30} />
            <AppTextField
              rest={{ height: 100 }}
              label="Group Rules"
              value={groupRules}
              onChange={handleGroupRulesChange}
            />
            <AppDiv height={60} />
            <AppDiv>
              <Stack spacing={2} direction="row" justifyContent="end">
                <AppButton
                  onClick={handleClose}
                  variant="contained"
                  sx={{ backgroundColor: "#CCCCCC", color: "#7F879E", width: 130 }}
                >
                  <b> Discard</b>
                </AppButton>
                <AppButton
                  onClick={handleSubmit}
                  sx={{ backgroundColor: "#00FF00", width: 130, color: "black" }}
                  variant="contained"
                >
                  <b> Save Changes</b>
                </AppButton>
              </Stack>
            </AppDiv>
          </AppPaper>
        </Box>
      </Modal>
    </div>
  );
};

export default NetworkModal;
