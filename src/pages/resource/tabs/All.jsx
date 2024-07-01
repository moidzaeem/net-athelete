import AppDiv from "../../../components/atoms/AppDiv";
import { Appcaption, Appfont } from "../../../utils/theme";
import { gamma } from "../../../utils/theme/colors";
import { AppPaper } from "./../../../components/atoms/AppPaper";
import DescriptionIcon from "@mui/icons-material/Description";
import WatchLaterIcon from "@mui/icons-material/WatchLater";

const All = () => {
  return (
    <AppDiv
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 7,
        width: "100%",
        gap: 3,
        flexWrap: "wrap",
      }}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((items) => {
        return (
          <AppDiv key={items} sx={{ width: 300 }}>
            <img
              width={"100%"}
              height={200}
              style={{ borderRadius: "10px 10px 0px 0px" }}
              src="https://w0.peakpx.com/wallpaper/903/781/HD-wallpaper-kylian-mbappe-fifa-22.jpg"
              alt=""
            />
            <AppPaper
              elevation={0}
              sx={{
                position: "relative",
                p: 2,
                width: "90%",
                top: { xs: -60, md: -70 },
                left: 10,
                borderRadius: 5,
              }}
            >
              <Appfont sx={{ fontSize: { xs: 12, md: 13 }, fontWeight: 600, textAlign: "left" }}>
                Lorem ipsum dolor sit amet, consectetur
              </Appfont>
              <AppDiv
                sx={{
                  display: "flex",
                  flexDirection: {
                    lg: "row",
                    xs: "column",
                  },
                  justifyContent: "space-between",
                  mt: 1,
                  mb: 1,
                }}
              >
                <AppDiv sx={{ display: "flex", alignItems: "center" }}>
                  <DescriptionIcon sx={{ width: 15, mr: 1, color: "red" }} />
                  <Appcaption>12 Modul</Appcaption>
                </AppDiv>
                <AppDiv sx={{ display: "flex", alignItems: "center" }}>
                  <WatchLaterIcon sx={{ width: 15, mr: 1, color: gamma }} />
                  <Appcaption>50 Min / Session</Appcaption>
                </AppDiv>
              </AppDiv>
            </AppPaper>
          </AppDiv>
        );
      })}
    </AppDiv>
  );
};

export default All;
