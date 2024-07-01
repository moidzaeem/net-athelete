import AppDiv from "../../components/atoms/AppDiv";
import { PaperStyle } from "../../utils/styles";
import bgimag from "../../assets/images/bg.svg";
import rec from "../../assets/images/Rectangle 94.svg";

import { Appcaption, Appfont, Appheading } from "../../utils/theme";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { AppPaper } from "../../components/atoms/AppPaper";
import { AppAvatar } from "../../components/atoms/AppAvatar";
import { AppButton } from "../../components/atoms/AppButton";
import { beta } from "../../utils/theme/colors";
const bgColor = "#F6F8F9";
const MarketPage = () => {
  return (
    <AppDiv
      sx={{
        pr: {
          lg: "25px",
          xs: 1,
        },
      }}
    >
      <AppDiv style={{ position: "relative" }}>
        <img src={bgimag} alt="" width={"100%"} />
        <Appheading
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white", // Optional: Change text color to improve visibility
            zIndex: 1, // Optional: Ensure text is above the image
            fontSize: 30,
          }}
        >
          Marketplace{" "}
        </Appheading>
      </AppDiv>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <AppDiv
            sx={{
              ...PaperStyle,
              width: "100%",
              background: "white",
              p: 2,
            }}
          >
            <Appheading sx={{ textAlign: "left" }}>Talent Search</Appheading>
            <AppDiv sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
              {[1, 2, 3].map((items) => {
                return (
                  <AppPaper
                    elevation={0}
                    key={items}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                      p: 2,
                      background: bgColor,
                      borderRadius: 4,
                    }}
                  >
                    <AppAvatar sx={{ width: 80, height: 80 }} src="/avatar.svg" />
                    <Appfont sx={{ mt: 1 }}>
                      <b>Tiontay Carroll</b>{" "}
                    </Appfont>
                    <Appcaption>Hockey Player</Appcaption>
                    <AppButton
                      variant="contained"
                      sx={{ backgroundColor: beta, color: "black", mt: 2 }}
                    >
                      View Details
                    </AppButton>
                  </AppPaper>
                );
              })}
              <YellowCard />
            </AppDiv>
          </AppDiv>
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppDiv
            sx={{
              ...PaperStyle,
              width: "100%",
              background: "white",
              p: 2,
            }}
          >
            <Appheading sx={{ textAlign: "left" }}>Transfer and Contacts</Appheading>
            <AppDiv sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
              {[1, 2, 3].map((items) => {
                return (
                  <AppPaper
                    elevation={0}
                    key={items}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                      p: 2,
                      background: bgColor,
                      borderRadius: 4,
                    }}
                  >
                    <AppAvatar sx={{ width: 80, height: 80 }} src={rec} />
                    <Appfont sx={{ mt: 1, mb: 1 }}>
                      <b>Heading</b>{" "}
                    </Appfont>
                    <Appcaption>
                      <b>
                        {" "}
                        Lorem ipsum dolor <br /> consectetur a
                      </b>
                    </Appcaption>
                  </AppPaper>
                );
              })}
              <YellowCard />
            </AppDiv>
          </AppDiv>
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppDiv
            sx={{
              ...PaperStyle,
              width: "100%",
              background: "white",
              p: 2,
            }}
          >
            <Appheading sx={{ textAlign: "left" }}>Equipment and Products</Appheading>
            <AppDiv sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
              {[1, 2, 3].map((items) => {
                return (
                  <AppPaper
                    elevation={0}
                    key={items}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                      p: 2,
                      background: bgColor,
                      borderRadius: 4,
                    }}
                  >
                    <AppAvatar sx={{ width: 80, height: 80 }} src={rec} />
                    <Appfont sx={{ mt: 1, mb: 1 }}>
                      <b>Product Title</b>{" "}
                    </Appfont>
                    <Appcaption sx={{ color: "red" }}>
                      <b>$ 0.00</b>
                    </Appcaption>
                  </AppPaper>
                );
              })}
              <YellowCard />
            </AppDiv>
          </AppDiv>
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* Content for the second row, second column */}
          <Grid item xs={12} sm={6}>
            <AppDiv
              sx={{
                ...PaperStyle,
                width: "100%",
                background: "white",
                p: 2,
              }}
            >
              <Appheading sx={{ textAlign: "left" }}>Professional Services</Appheading>
              <AppDiv sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                {[1, 2, 3].map((items) => {
                  return (
                    <AppPaper
                      elevation={0}
                      key={items}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                        p: 2,
                        background: bgColor,
                        borderRadius: 4,
                      }}
                    >
                      <AppAvatar sx={{ width: 80, height: 80 }} src={rec} />
                      <Appfont sx={{ mt: 1 }}>
                        <b>Service Title</b>{" "}
                      </Appfont>
                      <Appcaption>
                        <b> Lorem ipsum sit</b>
                      </Appcaption>
                      <AppButton
                        variant="contained"
                        sx={{ backgroundColor: beta, color: "black", mt: 2 }}
                      >
                        View Details
                      </AppButton>
                    </AppPaper>
                  );
                })}
                <YellowCard />
              </AppDiv>
            </AppDiv>
          </Grid>
        </Grid>
      </Grid>
    </AppDiv>
  );
};

export default MarketPage;

export const YellowCard = () => {
  return (
    <AppDiv
      sx={{
        backgroundColor: "#FADE34",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 150,
        height: 200,
        justifyContent: "center",
        borderRadius: 4,
      }}
    >
      <Appfont sx={{ fontSize: 16 }}>
        <b>Browse All</b>{" "}
      </Appfont>
    </AppDiv>
  );
};
