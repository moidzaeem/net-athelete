import { AppButton } from "../../../components/atoms/AppButton";
import AppDiv from "../../../components/atoms/AppDiv";
import { Appcaption, Appfont } from "../../../utils/theme";
import { AppAvatar } from "./../../../components/atoms/AppAvatar";

const FriendListCard = () => {
  return (
    <div>
      {" "}
      <AppDiv
        sx={{
          display: "flex",
          alignItems: {
            lg: "center",
            xs: "start",
          },
          justifyContent: "space-between",
          gap: 2,
          flexDirection: {
            lg: "row",
            xs: "column",
          },
          width: "100%",
        }}
      >
        {[1, 2, 3].map((items) => {
          return (
            <AppDiv
              key={items}
              sx={{
                width: {
                  lg: 350,
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
                  <AppDiv
                    sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
                  >
                    <AppAvatar
                      src="/avatar.svg"
                      sx={{
                        width: 80,
                        height: 80,
                        background: "white",
                        top: -35,
                        right: -10,
                      }}
                    />

                    <AppDiv sx={{ bottom: 3 }}>
                      <Appfont sx={{ textAlign: "start", ml: 2 }}>
                        {" "}
                        <b>Group Name</b>{" "}
                      </Appfont>
                      <Appcaption sx={{ textAlign: "start", ml: 2 }}>@maymayke</Appcaption>
                      <Appfont sx={{ textAlign: "start", ml: 2 }}>Not a Man but a Ghost 👻</Appfont>
                    </AppDiv>
                    <AppButton
                      variant="contained"
                      color="warning"
                      sx={{
                        backgroundColor: "#FADE34",
                        fontSize: 9,
                        color: "black",
                        height: 20,
                        width: 30,
                      }}
                    >
                      <b> Following</b>
                    </AppButton>
                  </AppDiv>
                </AppDiv>
              </AppDiv>
            </AppDiv>
          );
        })}
      </AppDiv>
    </div>
  );
};

export default FriendListCard;
