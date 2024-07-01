import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import useCrypto from "../utils/hooks/encrypt";

const AppRouting = () => {
  const { decryptedData: isAuthenticated } = useCrypto();
  return <div>{isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />}</div>;
};

export default AppRouting;
