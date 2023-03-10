import React, { useEffect } from "react";
import { Navigate, useRoutes, useNavigate } from "react-router-dom";
// layouts
import DashboardLayout from "../layouts/dashboard";
import LogoOnlyLayout from "../layouts/LogoOnlyLayout";
//

import Login from "../pages/Login";
import Register from "../pages/Register";

import NotFound from "../pages/Page404";
import DashboardApp from "../pages/DashboardApp";

import ForgotPassword from "src/pages/ForgotPassword";
import ResetPassword from "src/pages/ResetPassword";

//protected
import LoggedInProtection from "./LoggedInProtection";
import LoggedOutProtection from "./LoggedOutProtection";
import { getToken, deleteToken } from "src/store/localStorage";
import { loadProfile } from "src/store/actions/authActions";
import { useSelector, useDispatch } from "react-redux";
import VerifyEmail from "src/pages/VerifyEmail";
import EmailToBeVerified from "src/pages/EmailToBeVerified";

// ----------------------------------------------------------------------

export default function Router() {
  const { isSignedIn = false } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = getToken();
      if (token && !isSignedIn) {
        const loadProfileResponse = await dispatch(loadProfile(token));
        if (loadProfileResponse) {
          deleteToken();
          navigate("/");
        }
      }
    };
    fetchProfile();
  }, [isSignedIn, dispatch, navigate]);

  return useRoutes([
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        { path: "/", element: <Navigate to="/login" /> },
        {
          path: "/signup",
          element: (
            <LoggedOutProtection redirectTo={"/dashboard/main"}>
              <Register />
            </LoggedOutProtection>
          ),
        },
        {
          path: "login",
          element: (
            <LoggedOutProtection redirectTo={"/dashboard/main"}>
              <Login />
            </LoggedOutProtection>
          ),
        },

        {
          path: "forgot-password",
          element: (
            <LoggedOutProtection redirectTo={"/dashboard/main"}>
              <ForgotPassword />
            </LoggedOutProtection>
          ),
        },
        {
          path: "reset-password",
          element: <ResetPassword />,
        },
        {
          path: "verify-email",
          element: <VerifyEmail />,
        },
        {
          path: "email-to-verify",
          element: <EmailToBeVerified />,
        },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <LoggedInProtection redirectTo={"/"}>
          <DashboardLayout />
        </LoggedInProtection>
      ),
      children: [
        {
          path: "main",
          element: (
            <LoggedInProtection redirectTo={"/"}>
              <DashboardApp />
            </LoggedInProtection>
          ),
        },
      ],
    },

    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
