import { useState } from "react";
import NetworkChat from "./pages/NetworkChat";
import NetworkGroups from "./pages/NetworkGroups";
import AppDiv from "../../components/atoms/AppDiv";

const NetworkPage = () => {
  const [showNetwork, setShowNetwork] = useState("network-groups");
  return (
    <div>
      {showNetwork === "network-groups" && (
        <AppDiv sx={sty}>
          <NetworkGroups setShowNetwork={setShowNetwork} />
        </AppDiv>
      )}
      {showNetwork === "network-chat" && <NetworkChat />}
    </div>
  );
};

export default NetworkPage;

const sty = {
  pl: {
    lg: "25px",
    xs: 1,
  },
  pr: {
    lg: "0",
    xs: 0,
  },
  pt: 3,
  pb: 3,
  background: "#FAFAFB",
};
