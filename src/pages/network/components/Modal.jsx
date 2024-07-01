import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { alpha, beta, gamma } from "../../../utils/theme/colors";
import { AppButton } from "./../../../components/atoms/AppButton";
import AddIcon from "@mui/icons-material/Add";
import { PaperStyle } from "../../../utils/styles";
import { AppPaper } from "./../../../components/atoms/AppPaper";
import AppDiv from "../../../components/atoms/AppDiv";
import { Stack } from "@mui/material";
import { Appheading } from "../../../utils/theme";
import AppSelect from "../../../components/molecules/AppSelect";
import doc from "../../../assets/red-svgs/doc.svg";
import AppTextFeild from "../../../components/molecules/AppTextFeild";
import usersIcon from "../../../assets/red-svgs/users-group.svg";
import list from "../../../assets/red-svgs/list.svg";

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

export default function NetworkModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <AppButton
        onClick={handleOpen}
        sx={{ background: gamma, color: "white", ml: 1 }}
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
            <AppTextFeild label={"Group Name"} placeholder="Enter Group Name" icon={doc} />
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
              />
              <AppSelect
                label="Public"
                img={usersIcon}
                iconStyle={{ width: "25px" }}
                options={[{ label: "Public" }]}
              />
            </AppDiv>
            <AppDiv height={30} />
            <AppTextFeild rest={{ height: 100 }} label={"Group Rules"} />
            <AppDiv height={60} />
            <AppDiv>
              <Stack spacing={2} direction="row" justifyContent={"end"}>
                <AppButton
                  onClick={handleClose}
                  variant="contained"
                  sx={{ backgroundColor: alpha, color: "#7F879E", width: 130 }}
                >
                  <b> Discard</b>
                </AppButton>
                <AppButton
                  onClick={handleClose}
                  sx={{ backgroundColor: beta, width: 130, color: "black" }}
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
}
