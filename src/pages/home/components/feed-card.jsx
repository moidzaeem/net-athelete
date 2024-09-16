import React from "react";
import AppDiv from "../../../components/atoms/AppDiv";
import { PaperStyle } from "../../../utils/styles";
import { AppLabel, Appcaption, Appfont } from "../../../utils/theme";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { AppAvatar } from "./../../../components/atoms/AppAvatar";
import AppIconButton from "./../../../components/atoms/AppIconButton";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Avatar, Divider, TextField } from "@mui/material";
import commenticon from "../../../assets/svg/comment.svg";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import { secondary } from "../../../utils/theme/colors";
import gallery from "../../../assets/svg/gallery.svg";
import attach from "../../../assets/svg/attach.svg";
import smile from "../../../assets/svg/smile.svg";
import { useEffect, useState } from "react";
import useCrypto from "../../../utils/hooks/encrypt";
import axios from "axios";
import { toast } from "react-toastify";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { PostAdd, Send } from "@mui/icons-material";

const FeedCard = ({ chnageFeedData }) => {
  const { decryptedData } = useCrypto();
  const [comment, setComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [feedData, setFeedData] = useState([]); // Initialize
  const [profile, setProfile] = useState([]); // Initialize

  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const handleMoreButtonClick = () => {
    setShowDeleteButton(true); // Hide the delete button when more button is clicked
    // You can add more logic here based on your requirements
  };

  const url = import.meta.env.VITE_BASE_URL;
  const handleCommentChange = (e) => setComment(e.target.value);
  const fetchFeedData = async () => {
    try {
      const token = decryptedData?.tokens?.access?.token; // Get JWT token from local storage
      if (!token) {
        throw new Error("No token found in local storage");
      }
      const response = await axios.get(`${url}/feed`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setFeedData(response?.data?.data?.result); // Set fetched data to state
        setComment("");
      } else {
        throw new Error("Failed to fetch feed data");
      }
    } catch (error) {
      console.error("Error fetching feed data:", error);
      // Handle error state or notify user of failure
    }
  };

  const fetchUserProfile = async () => {
    try {
      const token = decryptedData?.tokens?.access?.token; // Get JWT token from local storage
      if (!token) {
        throw new Error("No token found in local storage");
      }
      const response = await axios.get(`${url}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log(response.data);
        setProfile([response?.data?.data]); // Set fetched data to state
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle error state or notify user of failure
    }
  };

  useEffect(() => {
    (async () => {
      await fetchUserProfile();
    })();
  }, [decryptedData?.tokens.access.token]);

  useEffect(() => {
    (async () => {
      await fetchFeedData();
    })();
  }, [decryptedData?.tokens.access.token, chnageFeedData]);

  const LikePost = async (id, endp) => {
    setCommentLoading(true);

    const url = import.meta.env.VITE_BASE_URL;

    try {
      const token = decryptedData.tokens.access.token; // Get JWT token from local storage
      if (!token) {
        throw new Error("No token found in local storage");
      }

      const response = await axios.post(
        `${url}${endp}`,
        {
          feed_id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setCommentLoading(false);
        toast.success(response.data.message); // Notify user of success
        await fetchFeedData();
      } else {
        setCommentLoading(false);
        throw new Error("Failed to Like post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      setCommentLoading(false);
      toast.error("Failed to Like post. Please try again."); // Notify user of failure
    }
  };

  // console.log(feedData)

  // Handle loading state while fetching data
  if (!feedData) {
    return <p>Loading...</p>;
  }

  const handleComment = async (id) => {
    const url = import.meta.env.VITE_BASE_URL;
    setCommentLoading(true);

    try {
      const token = decryptedData.tokens.access.token; // Get JWT token from local storage
      if (!token) {
        throw new Error("No token found in local storage");
      }

      const response = await axios.post(
        `${url}/feed/feed-comment`,
        {
          feed_id: id,
          text: comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // console.log(response)
        setComment("");
        toast.success(response.data.message); // Notify user of success
        await fetchFeedData();
        setCommentLoading(false);
      } else {
        throw new Error("Failed to comment on post");
      }
    } catch (error) {
      setCommentLoading(false);
      console.error("Error creating post:", error);

      toast.error("Failed to comment on post Please try again."); // Notify user of failure
    }
  };

  const deleteFeed = async (feed_id) => {
    const url = import.meta.env.VITE_BASE_URL;

    try {
      const token = decryptedData.tokens.access.token; // Get JWT token from local storage
      if (!token) {
        throw new Error("No token found in local storage");
      }

      const response = await axios.delete(`${url}/feed/${feed_id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        if (response.data.status !== 400) {
          toast.success("feed Deleted sucessfuly"); // Notify user of success
          await fetchFeedData();
        }
      } else {
        throw new Error("Failed to delete feed");
      }
    } catch (error) {
      console.error("Failed to delete feed:", error);
      toast.error("Failed to delete feed Please try again."); // Notify user of failure
    }
  };

  return (
    <div className="grid gap-5">
      {feedData.map((feed) => (
        <div
          key={feed.id}
          className="bg-white flex flex-col py-5 px-7 rounded-2xl"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <img
                alt="Remy Sharp"
                src={
                  feed.user.image
                    ? feed.user.image
                    : "https://img.lovepik.com/free-png/20210923/lovepik-cute-girl-avatar-png-image_401231841_wh1200.png"
                }
                className="w-10 h-10 rounded-full"
              />
              {/* {feed.user.image ? (
                  <img
                    src={feed.user.image}
                    alt={feed.user.name}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <p className="w-10 h-10 flex justify-center items-center text-2xl pb-1 uppercase rounded-full bg-[#92929D]">
                    {feed?.user?.name.charAt(0)}
                  </p>
                )} */}
              <div className="flex flex-col gap-1">
                <p className="text-sm text-[#171725] font-semibold capitalize">
                  {feed?.user?.name}
                </p>
                <p className="text-xs text-[#92929D] font-normal">
                  {new Date(feed.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <AppIconButton onClick={handleMoreButtonClick}>
              <MoreHorizOutlinedIcon />
            </AppIconButton>
          </div>
          <p className="mt-5 text-sm text-[#44444F] font-normal font-Roboto line-clamp-2">
            {feed.text}
          </p>
          <Grid container gap={1} sx={{ alignItems: "center", mt: 3 }}>
            <Grid xs={5.5}>
              <img
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "400px",
                  borderRadius: "20px",
                }}
                src={feed.media}
                alt=""
              />
            </Grid>
            <Grid xs={5.5}>
              <div>
                <img
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "200px",
                    borderRadius: "20px",
                  }}
                  src={feed.media}
                  alt=""
                />
              </div>
              <div>
                <img
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "200px",
                    borderRadius: "20px",
                  }}
                  src={feed.media}
                  alt=""
                />
              </div>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <img
                src={commenticon}
                alt="comment"
                style={{ marginRight: "0.5rem" }}
              />
              <span>{feed.total_comments} Comments</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              {feed.likes.find((like) => like.feed_id === feed.id) ? (
                <FavoriteIcon sx={{ color: "red" }} />
              ) : (
                <button
                  disabled={commentLoading}
                  onClick={() => LikePost(feed.id, "/feed/feed-like")}
                >
                  <FavoriteBorderIcon sx={{ color: secondary }} />
                </button>
              )}
              <span style={{ marginLeft: "0.5rem" }}>
                {feed.total_likes} Likes
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <ShareIcon sx={{ color: secondary }} />
              <span style={{ marginLeft: "0.5rem" }}>
                {feed.total_shares} Share
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <TurnedInIcon sx={{ color: secondary }} />
              <span style={{ marginLeft: "0.5rem" }}>
                {feed.total_saved} Saved
              </span>
            </div>
          </div>
          <Divider sx={{ my: 2 }} />
          {feed?.comments && feed.comments.length > 0 && (
            <div className="grid gap-4">
              {feed?.comments?.map((comment) => {
                const createdAt = new Date(comment.createdAt);
                const formattedDate = createdAt.toLocaleString("en-US", {
                  day: "numeric",
                  month: "long",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                });

                return (
                  <div className="flex items-start gap-2">
                    <img
                      alt="Remy Sharp"
                      src={
                        feed.user.image
                          ? feed.user.image
                          : "https://img.lovepik.com/free-png/20210923/lovepik-cute-girl-avatar-png-image_401231841_wh1200.png"
                      }
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex flex-col gap-2 bg-[#f7f7f7] flex-grow rounded-md p-2.5">
                      <div className="flex flex-col gap-1">
                        <p className="text-xs text-[#000000e6] font-semibold capitalize">
                          {feed.user.name}
                        </p>
                        <p className="text-[10px] text-[#92929D] font-normal">
                          {formattedDate}
                        </p>
                      </div>
                      <p className="text-sm text-[#000000e6] font-normal">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Add a comment..."
            margin="dense"
            InputProps={{
              endAdornment: (
                <button
                  className={`!p-0 ${
                    commentLoading && "post-btndisable"
                  } post-btn`}
                  onClick={() => handleComment(feed.id)}
                >
                  <Send sx={{ color: secondary }} />
                </button>
              ),
            }}
            value={comment}
            onChange={handleCommentChange}
          />
        </div>
      ))}
    </div>
  );
};

export default FeedCard;

// const iconSty = {
//   ml: 2,
//   display: {
//     md: "block",
//     xs: "none",
//   },
// };
