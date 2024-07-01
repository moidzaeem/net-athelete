/* eslint-disable react/prop-types */
import AppDiv from "../atoms/AppDiv";
import AppNavbar from "./AppNavbar";

const AppLayout = ({ children }) => {
  return (
    <div>
      <AppNavbar />
      <AppDiv
        sx={{
          pl: {
            lg: 15,
            xs: 1,
          },
          pr: {
            lg: 15,
            xs: 1,
          },
          pt: 3,
          pb: 3,
          background: "#FAFAFB",
        }}
      >
        {children}
      </AppDiv>
    </div>
  );
};

export default AppLayout;

export const AppLayoutSm = ({ children, pr = true, pt = true }) => {
  return (
    <div>
      <AppNavbar />
      <AppDiv
        sx={{
          pl: pr && {
            lg: "25px",
            xs: 1,
          },
          pr: {
            lg: "0",
            xs: 0,
          },
          pt: pt && 3,
          pb: 3,
          background: "#FAFAFB",
        }}
      >
        {children}
      </AppDiv>
    </div>
  );
};
