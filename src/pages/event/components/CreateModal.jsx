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
import calendar from "../../../assets/red-svgs/calendar-2.svg";
import AppTextFeild from "../../../components/molecules/AppTextFeild";
import location from "../../../assets/red-svgs/location.svg";

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
    xs: "90%",
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

export default function EventModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <AppButton
        onClick={handleOpen}
        color="primary"
        sx={{ backgroundColor: gamma }}
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
              <b>Create New Event</b>
            </Appheading>
            <AppDiv height={30} />
            <AppTextFeild label={"Event Name"} placeholder="Enter Event Name" icon={doc} />
            <AppDiv height={20} />
            <AppTextFeild
              label={"Location"}
              placeholder="Enter your company name"
              icon={location}
            />
            <AppDiv height={10} />
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
            <AppDiv height={20} />
            <AppTextFeild rest={{ height: 100 }} label={"Event Details"} />
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
