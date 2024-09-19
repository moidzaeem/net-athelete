/* eslint-disable react/prop-types */
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import searchIcon from "../../assets/svg/search.svg";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: "#F1F1F5",
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
  color: "#92929D",
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
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "115px",
      "&:focus": {
        width: "190px",
      },
    },
  },
  fontSize: 12,
  fontFamily: "Poppins",
}));

const AppSearchBar = ({ 
  onChange, 
  onSearch, 
  placeholder = "Find", 
  value = "" 
}) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch(value);
    }
  };

  return (
    <Search>
      <SearchIconWrapper>
        <img src={searchIcon} width={20} alt="Search icon" />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  );
};

export default AppSearchBar;
