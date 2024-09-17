import React, { useState, useEffect } from "react";
import { AppLabel, Appcaption } from "../../utils/theme";
import { Avatar } from "@mui/material";
import { PaperStyle } from "../../utils/styles";
import AppDiv from "../atoms/AppDiv";
import { secondary } from "../../utils/theme/colors";
import axios from "axios";
import { toast } from "react-toastify";
import useCrypto from "../../utils/hooks/encrypt";
import userPng from "../../assets/images/user.png"
const FriendsSidebar = () => {
  const { decryptedData } = useCrypto();
  const [friends, setFriends] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriendsAndGroups = async () => {
      try {
        const url = import.meta.env.VITE_BASE_URL;
        const token = decryptedData?.tokens?.access?.token;

        if (!token) {
          throw new Error("No token found");
        }

        const [friendsResponse, groupsResponse] = await Promise.all([
          axios.get(`${url}/friend`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${url}/group`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        // Adjust this based on the actual response structure
        setFriends(friendsResponse.data.data.users || []);
        setGroups(groupsResponse.data.data || []);
      } catch (error) {
        console.error(error.message);
        setError("Failed to fetch data");
        toast.error("Error fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (decryptedData) {
      fetchFriendsAndGroups();
    }
  }, [decryptedData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <AppDiv
      sx={{
        ...PaperStyle,
        width: "100%",
        background: "white",
        p: 2,
      }}
    >
      {/* Friends Section */}
      <AppDiv sx={{ display: "flex", justifyContent: "space-between" }}>
        <AppLabel
          sx={{ color: secondary, fontSize: 13, textTransform: "uppercase" }}
        >
          Friends
        </AppLabel>
      </AppDiv>
      {friends.length > 0 ? (
        friends.map((friend) => (
          <AppDiv
            key={friend.id} // Assuming friends have unique IDs
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 2,
              justifyContent: "space-between",
            }}
          >
            <AppDiv sx={{ display: "flex", alignItems: "center" }}>
              <Avatar src={friend.image || userPng} />
              <AppLabel sx={{ textAlign: "start", ml: 1 }}>
                {friend.name}
              </AppLabel>
            </AppDiv>
            {/* <Appcaption sx={{ textAlign: "end" }}>{friend.lastActive}</Appcaption> */}
          </AppDiv>
        ))
      ) : (
        <div>No friends found.</div>
      )}

      {/* Groups Section */}
      <AppDiv sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <AppLabel
          sx={{ color: secondary, fontSize: 13, textTransform: "uppercase" }}
        >
          Groups
        </AppLabel>
      </AppDiv>
      {groups.length > 0 ? (
        groups.map((group) => (
          <AppDiv
            key={group.id} // Assuming groups have unique IDs
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 2,
              justifyContent: "space-between",
            }}
          >
            <AppDiv sx={{ display: "flex", alignItems: "center" }}>
              <Avatar src={group.avatarUrl || "/avatar.svg"} />
              <AppLabel sx={{ textAlign: "start", ml: 1 }}>
                {group.name}
              </AppLabel>
            </AppDiv>
            <Appcaption sx={{ textAlign: "end" }}>
              {group.lastActive}
            </Appcaption>
          </AppDiv>
        ))
      ) : (
        <div>No groups found.</div>
      )}
    </AppDiv>
  );
};

export default FriendsSidebar;
