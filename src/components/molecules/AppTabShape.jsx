import AppDiv from "../atoms/AppDiv";
import { Appfont } from "../../utils/theme";
import rightIcon from "../../assets/svg/rightarrow.svg";

// eslint-disable-next-line react/prop-types
const AppTabShape = ({ label, img1, handler, isActive = false }) => {
  return (
    <div onClick={handler}>
      <AppDiv
        sx={{
          backgroundColor: isActive && "#C8FA3B",
          p: 2,
          display: "flex",
          alignItems: "center",
          borderRadius: 3,
          height: 45,
          cursor: "pointer",
          width: {
            lg: "100%",
            xs: "220px",
          },
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <AppDiv sx={{ display: "flex", alignItems: "center" }}>
          <img src={img1} alt="" width={17} />
          <Appfont sx={{ ml: 1, mr: 1, fontWeight: 500, color: isActive ? "black" : "#7F879E" }}>
            {label}
          </Appfont>
        </AppDiv>
        <img src={rightIcon} alt="" width={17} />
      </AppDiv>
    </div>
  );
};

export default AppTabShape;
