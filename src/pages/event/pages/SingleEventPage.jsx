import React from "react";
import EventCalendar from "./EventCalender";
import AppDiv from "./../../../components/atoms/AppDiv";
import { AppMainheading, Appfont } from "./../../../utils/theme/index";

const SingleEventPage = () => {
  return (
    <AppDiv
      sx={{
        pr: {
          lg: "25px",
          xs: 1,
        },
      }}
    >
       <AppMainheading sx={{ mt: 10, mb: 5, textAlign: "center", fontSize: 36 }}>
        Events
      </AppMainheading>
      <EventCalendar />
    </AppDiv>
  );
};

export default SingleEventPage;
