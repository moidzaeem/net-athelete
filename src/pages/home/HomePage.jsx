import Grid from "@mui/material/Grid";
import AppDiv from "../../components/atoms/AppDiv";
import FriendsSidebar from "../../components/molecules/FriendsSidebar";
import EventCard from "./components/event-card";
import FeedCard from "./components/feed-card";
import PostCard from "./components/post-card";
import StoriesCard from "./components/stories-card";
import SuggestionCard from "./components/suggestion-card";
import { useState } from "react";
import useCrypto from "../../utils/hooks/encrypt";

const HomePage = () => {
  const { decryptedData } = useCrypto();
  console.log("decrypted data has: ", decryptedData);
  const [chnageFeedData, setChangeFeedData] = useState(true); // Initialize

  return (
    <Grid container spacing={2} mt={5.5}>
      {/* center - Displayed first on smaller screens */}
      <Grid item xs={12} md={7} order={{ xs: 1, md: 2 }}>
        <AppDiv>
          <PostCard
            chnageFeedData={chnageFeedData}
            setChangeFeedData={setChangeFeedData}
          />
          <AppDiv height={20} />
          <FeedCard chnageFeedData={chnageFeedData} />
        </AppDiv>
      </Grid>
      {/* left - Displayed second on smaller screens */}
      <Grid item xs={12} md={2.5} order={{ xs: 2, md: 1 }}>
        <AppDiv>
          StoriesCard <StoriesCard />
          <AppDiv height={20} />
          EventCard <EventCard />
          <AppDiv height={20} />
          SuggestionCard <SuggestionCard />
        </AppDiv>
      </Grid>
      {/* right - Displayed third on smaller screens */}
      <Grid item xs={12} md={2.5} order={{ xs: 3, md: 3 }}>
        <AppDiv>
          FriendsSidebar <FriendsSidebar />
        </AppDiv>
      </Grid>
    </Grid>
  );
};

export default HomePage;
