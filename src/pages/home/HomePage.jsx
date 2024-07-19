import Grid from "@mui/material/Grid";
import AppDiv from "../../components/atoms/AppDiv";
import FriendsSidebar from "../../components/molecules/FriendsSidebar";
import EventCard from "./components/event-card";
import FeedCard from "./components/feed-card";
import PostCard from "./components/post-card";
import StoriesCard from "./components/stories-card";
import SuggestionCard from "./components/suggestion-card";
import { useState } from "react";

const HomePage = () => {
  

  const [chnageFeedData, setChangeFeedData] = useState(true); // Initialize 



  return (
    <Grid container spacing={2}>
      {/* center - Displayed first on smaller screens */}
      <Grid item xs={12} md={7} order={{ xs: 1, md: 2 }}>
        <AppDiv>
          <PostCard chnageFeedData={chnageFeedData} setChangeFeedData={setChangeFeedData} />
          <AppDiv height={20} />
          <FeedCard chnageFeedData={chnageFeedData} />
        </AppDiv>
      </Grid>
      {/* left - Displayed second on smaller screens */}
      <Grid item xs={12} md={2.5} order={{ xs: 2, md: 1 }}>
        <AppDiv>
          <StoriesCard />
          <AppDiv height={20} />
          <EventCard />
          <AppDiv height={20} />
          <SuggestionCard />
        </AppDiv>
      </Grid>
      {/* right - Displayed third on smaller screens */}
      <Grid item xs={12} md={2.5} order={{ xs: 3, md: 3 }}>
        <AppDiv>
          <FriendsSidebar />
        </AppDiv>
      </Grid>
    </Grid>
  );
};

export default HomePage;
