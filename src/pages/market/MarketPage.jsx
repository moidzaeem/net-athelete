import React, { useState, useEffect } from "react";
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
import useCrypto from "../../utils/hooks/encrypt";
import axios from "axios";
import userPng from "../../assets/images/user.png"
const bgColor = "#F6F8F9";

const MarketPage = () => {
  const { decryptedData } = useCrypto();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = decryptedData?.tokens?.access?.token;
        if (!token) {
          throw new Error("No token found in local storage");
        }

        const response = await axios.get(`${url}/user/get-all-users`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setUsers(response.data.users || []);
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [decryptedData, url]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
        <img src={bgimag} alt="Background" width="100%" />
        <Appheading
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
            zIndex: 1,
            fontSize: 30,
          }}
        >
          Marketplace
        </Appheading>
      </AppDiv>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={9}>
          <AppDiv
            sx={{
              ...PaperStyle,
              width: "100%",
              background: "white",
              p: 2,
            }}
          >
            <Appheading sx={{ textAlign: "left" }}>Talent Search</Appheading>
            <AppDiv
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {users.length > 0 ? (
                users.map((user) => (
                  <AppPaper
                    elevation={0}
                    key={user.id}
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
                    <AppAvatar
                      sx={{ width: 80, height: 80 }}
                      src={user.image || userPng}
                    />
                    <Appfont sx={{ mt: 1 }}>
                      <b>{user.name || "Unknown Name"}</b>
                    </Appfont>
                    <Appcaption>
                      {user.experience?.[0]?.title || "Unknown Profession"}
                    </Appcaption>
                    <AppButton
                      variant="contained"
                      sx={{ backgroundColor: beta, color: "black", mt: 2 }}
                    >
                      View Details
                    </AppButton>
                  </AppPaper>
                ))
              ) : (
                <AppDiv>No users found.</AppDiv>
              )}
              {/* Uncomment YellowCard if needed */}
              {/* <YellowCard /> */}
            </AppDiv>
          </AppDiv>
        </Grid>

        {/* Uncomment and complete other sections if needed */}
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
        <b>Browse All</b>
      </Appfont>
    </AppDiv>
  );
};
