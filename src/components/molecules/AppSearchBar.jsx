/* eslint-disable react/prop-types */
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import searchIcon from "../../assets/svg/search.svg";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: "#F1F1F5",
  "&:hover": {
    backgroundColor: "#F1F1F5",
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
  color: "#92929D",
  fontSize: 6,
  borderRadius: 10,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 6,
}));

const AppSearchBar = ({ w1 = "6ch", w2 = "15ch" }) => {
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "black",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: w1,
        "&:focus": {
          width: w2,
        },
      },
    },
    fontSize: 12,
    fontFamily: "Poppins",
  }));
  return (
    <div>
      {/* search */}
      <Search>
        <SearchIconWrapper>
          <img src={searchIcon} width={20} alt="" />
        </SearchIconWrapper>
        <StyledInputBase placeholder="Find" inputProps={{ "aria-label": "search" }} />
      </Search>
    </div>
  );
};

export default AppSearchBar;
