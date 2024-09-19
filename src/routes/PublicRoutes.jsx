import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RoutePath } from "../utils/enum/RoutePath";
import SignInPage from "./../pages/auth/SignIn/SignIn";
import SignUpPage from "./../pages/auth/SignUp/SignUp";
import NotFoundPage from "../pages/404";
import ResetPasswordPage from "../pages/auth/components/ResetPasswordPage";

const PublicRoutes = () => {
  console.log("Public Routes");
  return (
    <Router>
      <Routes>
        {["/", RoutePath.SIGNIN].map((path, key) => (
          <Route key={key} exact path={path} element={<SignInPage />} />
        ))}
        <Route exact path={RoutePath.SIGNUP} element={<SignUpPage />} />
        <Route exact path={RoutePath.RESET_PASSWORD} element={<ResetPasswordPage />} />
        <Route exact path={"*"} element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default PublicRoutes;
