import AppDiv from "../../../components/atoms/AppDiv";
import { AppLabel, Appcaption } from "../../../utils/theme";
import { Appfont } from "./../../../utils/theme/index";
import { AppButton } from "../../../components/atoms/AppButton";
import { PaperStyle } from "../../../utils/styles";

// eslint-disable-next-line react/prop-types
const SuggestedGroupCard = ({ setShowNetwork }) => {
  return (
    <AppDiv
      sx={{
        ...PaperStyle,
        width: "100%",
        background: "white",
        p: 2,
      }}
    >
      <AppDiv
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <div>
          <AppLabel>Suggested Pages</AppLabel>
          <Appcaption>Groups you might be interested in.</Appcaption>
        </div>
        <AppButton
          sx={{
            background: "#fafdfd",
            color: "#27CEF8",
            textTransform: "uppercase",
          }}
          color="primary"
        >
          See All
        </AppButton>{" "}
      </AppDiv>
      <AppDiv
        sx={{
          display: "flex",
          alignItems: {
            lg: "center",
            xs: "flex-start",
          },
          justifyContent: "space-between",
          gap: 2,
          flexWrap: {
            lg: "nowrap",
            xs: "wrap",
          },
        }}
      >
        {[1, 2, 3, 4].map((items) => {
          return (
            <AppDiv
              key={items}
              sx={{
                width: {
                  md: 300,
                  xs: "100%",
                },
                borderRadius: 5,
                border: `1px solid #F1F1F5`,
              }}
            >
              <AppDiv sx={{ display: "flex", alignItems: "flex-start" }}>
                <AppDiv sx={{ width: "100%" }}>
                  <div
                    style={{
                      backgroundImage:
                        'url("https://images.pexels.com/photos/262524/pexels-photo-262524.jpeg")',
                      backgroundSize: "cover",
                      height: 100,
                      width: "100%",
                      backgroundColor: "red",
                      borderRadius: "10px 10px 0px 0px",
                    }}
                  />
                  <Appfont sx={{ textAlign: "start", ml: 2 }}>Group Name</Appfont>
                  <Appcaption sx={{ textAlign: "start", ml: 2 }}>
                    Yogyakarta - 2,351 Members
                  </Appcaption>
                </AppDiv>
              </AppDiv>
              <AppButton
                onClick={() => {
                  setShowNetwork("network-chat");
                }}
                sx={{
                  height: 40,
                  mt: 3,
                  color: "#44444F",
                  backgroundColor: "#F1F1F5",
                }}
                fullWidth
                color="primary"
              >
                Join Group{" "}
              </AppButton>
            </AppDiv>
          );
        })}
      </AppDiv>
    </AppDiv>
  );
};

export default SuggestedGroupCard;
