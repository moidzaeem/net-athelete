import AppDiv from "../../../components/atoms/AppDiv";
import { AppLabel, Appcaption } from "../../../utils/theme";
import { Appfont } from "./../../../utils/theme/index";
import { AppButton } from "../../../components/atoms/AppButton";
import { PaperStyle } from "../../../utils/styles";
import React from "react";
import useCrypto from "../../../utils/hooks/encrypt";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const SuggestedGroupCard = ({ setShowNetwork }) => {
  const { decryptedData } = useCrypto();
  const url = import.meta.env.VITE_BASE_URL;
  const [groupsList, setGroupsList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchGroups = async () => {
      if (!decryptedData?.tokens?.access?.token) {
        setLoading(false);
        return; // Exit early if token is not available
      }

      try {
        const token = decryptedData.tokens.access.token;
        
        // Fetch all groups
        const groupsResponse = await axios.get(`${url}/group/get-all-groups`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      

        if (groupsResponse.status === 200 && groupsResponse.data) {
          setGroupsList(groupsResponse.data.data);
        } else {
          throw new Error("Failed to fetch Groups");
        }

      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [decryptedData, url]);

  const joinGroup = async (groupId) => {
    if (!decryptedData?.tokens?.access?.token) {
      setError("No token available");
      return;
    }

    try {
      const token = decryptedData.tokens.access.token;
      const response = await axios.post(
        `${url}/group/${groupId}/requests`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Join request sent successfully!");
        // Optionally refresh data
        // fetchGroups(); // Uncomment if you want to refresh data
      } else {
        throw new Error("Failed to send join request");
      }
    } catch (error) {
      setError(error.message);
      console.error("Error sending join request:", error);
    }
  };

  const cancelRequest = async (groupId, memberIds) => {
    if (!decryptedData?.tokens?.access?.token) {
      setError("No token available");
      return;
    }
  
    try {
      const token = decryptedData.tokens.access.token;
      const userId = decryptedData?.user?.id;

      if (!userId) {
        throw new Error("User ID is not available");
      }
      const updatedMemberIds = memberIds.filter(id => id === userId);

      // Perform the PATCH request
      const response = await axios.patch(
        `${url}/group/${groupId}/remove-members`,
        { memberList: updatedMemberIds },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        alert("Request canceled successfully!");
        // Optionally refresh data
        // fetchGroups(); // Uncomment if you want to refresh data
      } else {
        throw new Error("Failed to cancel request");
      }
    } catch (error) {
      setError(error.message);
      console.error("Error canceling request:", error);
    }
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
      </AppDiv>
      <AppDiv
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "space-between",
        }}
      >
        {groupsList.map((group) => {
          const isMember = group.members.includes(decryptedData?.user?.id);

          // const isPendingRequest = pendingRequests.some((request) => request.group_id === group.id);

          return (
            <AppDiv
              key={group.id}
              sx={{
                width: {
                  md: "30%",
                  xs: "100%",
                },
                borderRadius: 5,
                border: `1px solid #F1F1F5`,
                overflow: "hidden",
                boxSizing: "border-box",
                mb: 2,
              }}
            >
              <AppDiv
                sx={{ display: "flex", flexDirection: "column", height: "100%" }}
              >
                <div
                  style={{
                    backgroundImage: group.cover_pic
                      ? `url(${group.cover_pic})`
                      : 'url("https://images.pexels.com/photos/262524/pexels-photo-262524.jpeg")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: 100,
                    width: "100%",
                    borderRadius: "10px 10px 0 0",
                  }}
                />
                <AppDiv sx={{ p: 2 }}>
                  <Appfont sx={{ textAlign: "start" }}>{group.name}</Appfont>
                  <Appcaption sx={{ textAlign: "start" }}>
                    {group.total_members} Members
                  </Appcaption>
                </AppDiv>
                <AppButton
                  onClick={() => {
                    isMember ? cancelRequest(group.id, group.members) : joinGroup(group.id);
                  }}
                  sx={{
                    height: 40,
                    mt: 2,
                    color: "#44444F",
                    backgroundColor: "#F1F1F5",
                  }}
                  fullWidth
                  color="primary"
                >
                  {isMember
                    ? "Cancel Request"
                    
                    : "Join Group"}
                </AppButton>
              </AppDiv>
            </AppDiv>
          );
        })}
      </AppDiv>
    </AppDiv>
  );
};

export default SuggestedGroupCard;
