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
import  { useEffect, useState } from "react";
import useCrypto from "../../../utils/hooks/encrypt";
import axios from "axios";
import { toast } from "react-toastify";
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


const FeedCard = ({chnageFeedData}) => {
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
        throw new Error('No token found in local storage');
      }
      const response = await axios.get(
        `${url}/feed`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );

      if (response.status === 200) {
        setFeedData(response?.data?.data?.result); // Set fetched data to state
        setComment("")
      } else {
        throw new Error('Failed to fetch feed data');
      }
    } catch (error) {
      console.error('Error fetching feed data:', error);
      // Handle error state or notify user of failure
    }
  };


  const fetchUserProfile = async () => {
    try {
      const token = decryptedData?.tokens?.access?.token; // Get JWT token from local storage
      if (!token) {
        throw new Error('No token found in local storage');
      }
      const response = await axios.get(
        `${url}/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data)
        setProfile([response?.data?.data]); // Set fetched data to state
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
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
  
  }, [decryptedData?.tokens.access.token,chnageFeedData]);


  const LikePost = async (id,endp) => {

    setCommentLoading(true)
    
    const url = import.meta.env.VITE_BASE_URL;


    try {
      const token = decryptedData.tokens.access.token; // Get JWT token from local storage
      if (!token) {
        throw new Error('No token found in local storage');
      }

      const response = await axios.post(
        `${url}${endp}`,
        {
          feed_id:id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        }
      );

      if (response.status === 200) {
        setCommentLoading(false)
        toast.success(response.data.message); // Notify user of success
        await fetchFeedData();
      } else {
        setCommentLoading(false)
        throw new Error('Failed to Like post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      setCommentLoading(false)
      toast.error('Failed to Like post. Please try again.'); // Notify user of failure
    }
  }



  // console.log(feedData)


  
  // Handle loading state while fetching data
  if (!feedData) {
    return <p>Loading...</p>;
  }

  const handleComment = async (id) => {
    const url = import.meta.env.VITE_BASE_URL;
    setCommentLoading(true)


    try {
      const token = decryptedData.tokens.access.token; // Get JWT token from local storage
      if (!token) {
        throw new Error('No token found in local storage');
      }

      const response = await axios.post(
        `${url}/feed/feed-comment`,
        {
          feed_id:id,
          text:comment
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        }
      );

      if (response.status === 200) {
        // console.log(response)
        setComment("")
        toast.success(response.data.message); // Notify user of success
        await fetchFeedData();
        setCommentLoading(false)
      } else {
        throw new Error('Failed to comment on post');
      }
    } catch (error) {
      setCommentLoading(false)
      console.error('Error creating post:', error);

      toast.error('Failed to comment on post Please try again.'); // Notify user of failure
    }
  };

  const deleteFeed = async (feed_id) => {
    const url = import.meta.env.VITE_BASE_URL;


    
    
    try {
      const token = decryptedData.tokens.access.token; // Get JWT token from local storage
      if (!token) {
        throw new Error('No token found in local storage');
      }
     
      const response = await axios.delete(
        `${url}/feed/${feed_id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        }
      );

      if (response.status === 200) {
        if (response.data.status !== 400) {

          toast.success("feed Deleted sucessfuly"); // Notify user of success
          await fetchFeedData();
        }
       } else {
        throw new Error('Failed to delete feed');
      }
    } catch (error) {
      console.error('Failed to delete feed:', error);
      toast.error('Failed to delete feed Please try again.'); // Notify user of failure
    }
  };


  console.log(feedData)

  return (
    <AppDiv
      sx={{
        ...PaperStyle,
        width: "100%",
        background: "white",
        p: 2,
      }}
    >
      {feedData.map((item, index) => (
        <div key={index}>
          <AppDiv sx={{ display: "flex", alignItems: "flex-start", mt: 1, justifyContent: "space-between" }}>
            
          <div className="flex items-center gap-2 justify-center">
            <h2 className=" w-10 h-10 flex  text-white items-center justify-center text-[26px] pb-1 uppercase rounded-full bg-[#104bee]">{item?.user?.name.charAt(0) }</h2>
             <p className="capitalize tracking-wide  text-[#696060]">{item?.user?.name}</p>
             </div>

            <AppDiv sx={{ ml: 1, mt: 1 }}>
              <AppLabel sx={{ textAlign: "start" }}>{item.author}</AppLabel>
              <Appcaption sx={{ textAlign: "start" }}>{new Date(item.createdAt).toLocaleString()}</Appcaption>

            </AppDiv>
            <div className="flex items-center space-x-2">
      <AppIconButton onClick={handleMoreButtonClick}>
        <MoreHorizOutlinedIcon />
      </AppIconButton>

      {showDeleteButton && (
           profile?.map((profileData) => (
            profileData.id === item.user_id && (
        <AppIconButton onClick={() => deleteFeed(item.id)}>
          <DeleteOutlineOutlinedIcon />
        </AppIconButton>
            )) )
      )}
    </div>
          </AppDiv>
          <Appfont sx={{ textAlign: "start", mt: 2 }}>
            {item.text}
          </Appfont>
          <Grid container gap={1} sx={{ alignItems: "center", mt: 3 }}>
            <Grid xs={5.5}>
              <img
                style={{ objectFit:"cover", width: "100%", height: "400px", borderRadius: "20px" }}
                src={item.media}
                alt=""
              />
            </Grid>
            <Grid xs={5.5}>
              <div>
                <img
                  style={{ objectFit:"cover", width: "100%", height: "200px", borderRadius: "20px" }}
                  src={item.media}
                  alt=""
                />
              </div>
              <div>
                <img
                  style={{ objectFit:"cover", width: "100%", height: "200px", borderRadius: "20px" }}
                  src={item.media}
                  alt=""
                />
              </div>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
          <img src={commenticon} alt="comment" style={{ marginRight: "0.5rem" }} />
          <span>{item.total_comments} Comments</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
  {item.likes.find((like) => like.feed_id === item.id) ? (
    <FavoriteIcon sx={{ color: "red" }} />
  ) : (
    <button disabled={commentLoading} onClick={() => LikePost(item.id, "/feed/feed-like")}>
    <FavoriteBorderIcon  sx={{ color: secondary }} />
    </button>
  )}
  <span style={{ marginLeft: "0.5rem" }}>{item.total_likes} Likes</span>
</div>

        <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
          <ShareIcon sx={{ color: secondary }} />
          <span style={{ marginLeft: "0.5rem" }}>{item.total_shares} Share</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
          <TurnedInIcon sx={{ color: secondary }} />
          <span style={{ marginLeft: "0.5rem" }}>{item.total_saved} Saved</span>
        </div>
      </div>

      <Divider style={{ margin: "1rem 0" }} />

      {item?.comments && item.comments.length > 0 ? (
        
        <div className="w-full overflow-y-scroll h-[100px] my-2 no-scrollbar">
        {
          item?.comments?.map((it) => (
            <React.Fragment key={it.id}>

            <p className="border-b px-2 inline-block bg-[#f7f7f7] my-2 rounded-lg w-auto py-2">{it.text}</p>
            <br />
            </React.Fragment>
            
          ))
        }
      </div>
        ) : ''}

      {/* Comment Field */}
      <TextField
        placeholder="Add a comment..."
        variant="outlined"
        fullWidth
        value={comment}
        onChange={handleCommentChange}
        margin="dense"
        InputProps={{
          endAdornment: <button className={` ${ commentLoading && "post-btndisable"} post-btn`} onClick={() => handleComment(item.id)}>Post</button>, // Replace with your post button or icon
        }}
      />
        </div>
      ))}

      <Divider sx={{ my: 2 }} />
      <AppDiv sx={{ display: "flex", alignItems: "center" }}>
        <Avatar src="/avatar.svg" />
        <TextField
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#F6F8F9",
              },
            },
            "& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            border: "1px solid #F1F1F5",
            borderRadius: 3,
          }}
          inputProps={{ style: { fontSize: 12, background: "#FAFAFB" } }}
          variant="outlined"
          placeholder={"What’s on your mind?"}
          fullWidth
          InputProps={{
            endAdornment: (
              <AppDiv sx={{ display: "flex" }}>
                <AppIconButton>
                  <img src={attach} style={{ width: 16 }} alt="" />
                </AppIconButton>
                <AppIconButton>
                  <img src={smile} style={{ width: 16 }} alt="" />
                </AppIconButton>
                <AppIconButton>
                  <img src={gallery} style={{ width: 16 }} alt="" />
                </AppIconButton>
              </AppDiv>
            ),
          }}
        />
      </AppDiv>
    </AppDiv>
  );
};

export default FeedCard;


const iconSty = {
  ml: 2,
  display: {
    md: "block",
    xs: "none",
  },
};
