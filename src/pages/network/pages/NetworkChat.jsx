import Grid from "@mui/material/Grid";
import AppDiv from "../../../components/atoms/AppDiv";
import FriendsSidebar from "../../../components/molecules/FriendsSidebar";
import MessageSidebar from "../components/MessageSidebar";
import ChatLayout from "../components/ChatLayout";

const NetworkChat = () => {
  return (
    <Grid container>
      {/* center - Displayed first on smaller screens */}
      <Grid item xs={12} lg={7} order={{ lg: 2, xs: 1 }}>
        <AppDiv sx={{ paddingRight: 2 }}>
          <ChatLayout />
        </AppDiv>
      </Grid>
      {/* left - Displayed second on smaller screens */}
      <Grid item xs={12} lg={2.5} order={{ lg: 1, xs: 2 }}>
        <AppDiv>
          <MessageSidebar />
        </AppDiv>
      </Grid>
      {/* right - Displayed third on smaller screens */}
      <Grid item xs={12} lg={2.5} order={{ lg: 3, xs: 3 }}>
        <AppDiv>
          <FriendsSidebar />
        </AppDiv>
      </Grid>
    </Grid>
  );
};

export default NetworkChat;
