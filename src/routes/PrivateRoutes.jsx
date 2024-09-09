import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RoutePath } from "../utils/enum/RoutePath";
import ProfileRegistrationPage from "../pages/auth/Profile-Registration";
import AppLayout, { AppLayoutSm } from "../components/molecules/AppLayout";
import HomePage from "../pages/home/HomePage";
import NetworkPage from "../pages/network/NetworkPage";
import NotFoundPage from "../pages/404";
import ResourcePage from "../pages/resource/ResourcePage";
import MarketPage from "../pages/market/MarketPage";
import EventPage from "../pages/event/EventPage";
import SingleEventPage from "../pages/event/pages/SingleEventPage";

const PrivateRoutes = () => {
  console.log("Private Routes Started");
  return (
    <Router>
      <Routes>
        {["/", RoutePath.HOME].map((path, key) => (
          <Route
            key={key}
            exact
            path={path}
            element={
              <AppLayout>
                <HomePage />
              </AppLayout>
            }
          />
        ))}
        <Route
          exact
          path={RoutePath.PROFILE_REGISTRATION}
          element={
            <AppLayout>
              <ProfileRegistrationPage />
            </AppLayout>
          }
        />
        <Route
          exact
          path={RoutePath.NETWORK}
          element={
            <AppLayoutSm pr={false} pt={false}>
              <NetworkPage />
            </AppLayoutSm>
          }
        />
        <Route
          exact
          path={RoutePath.MARKET}
          element={
            <AppLayoutSm>
              <MarketPage />
            </AppLayoutSm>
          }
        />
        <Route
          exact
          path={RoutePath.EVENT}
          element={
            <AppLayoutSm pr={false} pt={false}>
              <EventPage />
            </AppLayoutSm>
          }
        />
        <Route
          exact
          path={`${RoutePath.EVENT}/:id`}
          element={
            <AppLayoutSm pr={false} pt={false}>
              <SingleEventPage />
            </AppLayoutSm>
          }
        />

        <Route
          exact
          path={RoutePath.RESOURCES}
          element={
            <AppLayoutSm>
              <ResourcePage />
            </AppLayoutSm>
          }
        />
        <Route exact path={"*"} element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default PrivateRoutes;
