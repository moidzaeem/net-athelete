import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { alpha, beta, gamma } from "../../../utils/theme/colors";
import { AppButton } from "../../../components/atoms/AppButton";
import AddIcon from "@mui/icons-material/Add";
import { PaperStyle } from "../../../utils/styles";
import { AppPaper } from "../../../components/atoms/AppPaper";
import { Stack, TextField, InputAdornment } from "@mui/material";
import { Appheading } from "../../../utils/theme";
import location from "../../../assets/red-svgs/location.svg";
import doc from "../../../assets/red-svgs/doc.svg"; // Ensure this path is correct
import axios from "axios";
import useCrypto from "../../../utils/hooks/encrypt";
import UploadSvg from "../../../assets/svg/UploadSvg"; // Add UploadSvg if used for image upload
import { toast } from "react-toastify";

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
  overflowY: "auto", // Ensure scroll if content overflows
};

export default function EventModal() {
  const { decryptedData } = useCrypto();
  const [open, setOpen] = React.useState(false);
  const [eventName, setEventName] = React.useState("");
  const [eventDetails, setEventDetails] = React.useState("");
  const [locationName, setLocationName] = React.useState("");
  const [startDateTime, setStartDateTime] = React.useState("");
  const [endDateTime, setEndDateTime] = React.useState("");
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [media, setMedia] = React.useState("");
  const [isUploadingFile, setIsUploadingFile] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      formData.append("file", file); // Corrected: file instead of selectedImage

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/upload-file`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setMedia(response.data.data.upload_link);
        // toast.success(response.data.message);
      } else {
        throw new Error("Failed to upload file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload file. Please try again.");
    } finally {
      setIsUploadingFile(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = decryptedData?.tokens?.access?.token;
      if (!token) {
        throw new Error("No token found in local storage");
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/event`, // Adjust the endpoint URL if necessary
        {
          name: eventName,
          details: eventDetails,
          location: locationName,
          start_date: startDateTime,
          end_date: endDateTime,
          image: media, // Include media URL
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Event created successfully");
        handleClose(); // Close the modal on success
      } else {
        throw new Error("Failed to create event");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to create event. Please try again.");
    }
  };

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
            <form onSubmit={handleSubmit}>
              <TextField
                label="Event Name"
                placeholder="Enter Event Name"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={doc} alt="Event Name Icon" style={{ marginRight: 8, width: 24 }} />
                    </InputAdornment>
                  ),
                }}
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Location"
                placeholder="Enter location"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={location} alt="Location Icon" style={{ marginRight: 8, width: 24 }} />
                    </InputAdornment>
                  ),
                }}
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Start Date & Time"
                type="datetime-local"
                fullWidth
                value={startDateTime}
                onChange={(e) => setStartDateTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
              <TextField
                label="End Date & Time"
                type="datetime-local"
                fullWidth
                value={endDateTime}
                onChange={(e) => setEndDateTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Event Details"
                multiline
                rows={4}
                fullWidth
                value={eventDetails}
                onChange={(e) => setEventDetails(e.target.value)}
                sx={{ mb: 4 }}
              />
              <Box sx={{ mt: 3 }}>
                <label
                  htmlFor="upload-image"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '16px',
                    border: '2px dashed #ccc',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  <UploadSvg style={{ width: '48px', height: '48px' }} />
                  <p style={{ marginTop: '8px', textAlign: 'center' }}>
                    Drag or <span style={{ color: '#F83C4D' }}>upload</span> event image
                  </p>
                  <input
                    type="file"
                    id="upload-image"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                    disabled={isUploadingFile}
                  />
                </label>
                {selectedImage && (
                  <div style={{ marginTop: '16px' }}>
                    {selectedImage.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Uploaded file preview"
                        style={{
                          maxWidth: "100%",
                          height: "auto",
                          borderRadius: 8,
                        }}
                      />
                    ) : (
                      <p>Uploaded file: {selectedImage.name}</p>
                    )}
                  </div>
                )}
              </Box>
              <Stack direction="row" justifyContent="flex-end" mt={4} spacing={2}>
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
