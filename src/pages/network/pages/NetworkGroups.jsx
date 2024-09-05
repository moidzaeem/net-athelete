import Grid from "@mui/material/Grid";
import AppDiv from "../../../components/atoms/AppDiv";
import FriendsSidebar from "../../../components/molecules/FriendsSidebar";
import { Appheading } from "../../../utils/theme";
import AppSearchBar from "../../../components/molecules/AppSearchBar";
import SuggestedGroupCard from "../components/suggestedgroup-card";
import StickerCard from "../components/StickerCard";
import FriendListCard from "../components/FriendListCard";
import NetworkModal from "../components/Modal";

// eslint-disable-next-line react/prop-types
const NetworkGroups = ({ setShowNetwork }) => {
  return (
    <Grid container spacing={2} mt={5.5}>
      {/* left */}
      <Grid item xs={12} md={9.5}>
        {/* twin navbar */}
        <AppDiv
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: {
              lg: "space-between",
              xs: "center",
            },
            width: "100%",
            flexWrap: {
              lg: "nowrap",
              xs: "wrap",
            },
          }}
        >
          <Appheading>Discover Groups</Appheading>
          <AppDiv
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <AppSearchBar w1={"20ch"} w2={"30ch"} />
            <NetworkModal />
          </AppDiv>
        </AppDiv>
        <AppDiv height={20} />

        {/* cards started */}
        <SuggestedGroupCard setShowNetwork={setShowNetwork} />
        <AppDiv height={20} />
        <StickerCard />
        {/* friends */}
        <Appheading sx={{ textAlign: "left" }}>Friends List</Appheading>
        <AppDiv height={20} />
        <FriendListCard />

        <AppDiv height={60} />
      </Grid>
      {/* right */}
      <Grid item xs={12} md={2.5}>
        <AppDiv>
          <FriendsSidebar />
        </AppDiv>
      </Grid>
    </Grid>
  );
};

export default NetworkGroups;
