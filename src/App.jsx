import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { refreshUser } from "./redux/auth/operations";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MainLayout from "./components/Layout/MainLayout/MainLayout";
import Loader from "./components/Shared/Loader/Loader";
import PrivateRoute from "./components/Routes/PrivateRoute";
import PublicRoute from "./components/Routes/PublicRoute";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage/RegisterPage"));
const NewsPage = lazy(() => import("./pages/NewsPage/NewsPage"));
const NoticesPage = lazy(() => import("./pages/NoticesPage/NoticesPage"));
const FriendsPage = lazy(() => import("./pages/FriendsPage/FriendsPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage/ProfilePage"));
const AddPetPage = lazy(() => import("./pages/AddPetPage/AddPetPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

const EmptyFallback = () => null;

const App = () => {
  const dispatch = useDispatch();
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      await dispatch(refreshUser());

      setTimeout(() => {
        setIsInitialLoading(false);
      }, 1500);
    };

    initialize();
  }, [dispatch]);

  if (isInitialLoading) {
    return <Loader />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={
              <Suspense fallback={<EmptyFallback />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="news"
            element={
              <Suspense fallback={<EmptyFallback />}>
                <NewsPage />
              </Suspense>
            }
          />
          <Route
            path="notices"
            element={
              <Suspense fallback={<EmptyFallback />}>
                <NoticesPage />
              </Suspense>
            }
          />
          <Route
            path="friends"
            element={
              <Suspense fallback={<EmptyFallback />}>
                <FriendsPage />
              </Suspense>
            }
          />

          <Route
            path="login"
            element={
              <Suspense fallback={<EmptyFallback />}>
                <PublicRoute redirectTo="/profile" component={<LoginPage />} />
              </Suspense>
            }
          />
          <Route
            path="register"
            element={
              <Suspense fallback={<EmptyFallback />}>
                <PublicRoute
                  redirectTo="/profile"
                  component={<RegisterPage />}
                />
              </Suspense>
            }
          />

          <Route
            path="profile"
            element={
              <Suspense fallback={<EmptyFallback />}>
                <PrivateRoute redirectTo="/login" component={<ProfilePage />} />
              </Suspense>
            }
          />
          <Route
            path="add-pet"
            element={
              <Suspense fallback={<EmptyFallback />}>
                <PrivateRoute redirectTo="/login" component={<AddPetPage />} />
              </Suspense>
            }
          />

          <Route
            path="*"
            element={
              <Suspense fallback={<EmptyFallback />}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default App;
