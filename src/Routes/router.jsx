import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import SearchDonors from "../pages/SearchDonors";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import HomePage from "../components/Dashboard/HomePage";
import Blogs from "../pages/blogs/Blogs";
import BlogDetails from "../pages/blogs/BlogDetails";
import RequestDetails from "../pages/RequestDetails";
import PendingRequests from "../pages/PendingRequests";
import CreateDonationRequest from "../pages/CreateDonationRequest";
import Profile from "../components/Dashboard/Profile";
import Homepage from "../components/Dashboard/Common/Homepage";
import EditDonationRequest from "../components/Dashboard/Donor/EditDonationRequest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/searchDonor",
        element: <SearchDonors></SearchDonors>,
      },
      {
        path: "/blogs",
        element: <Blogs></Blogs>,
      },
      {
        path: "/donation-requests",
        element: <PendingRequests></PendingRequests>,
      },
      {
        path: "/create-donation-request",
        element: <CreateDonationRequest></CreateDonationRequest>,
      },
      {
        path: "/blogs/:id",
        element: <BlogDetails></BlogDetails>,
      },
      {
        path: "/donation-requests/:id",
        element: (
          <PrivateRoute>
            <RequestDetails></RequestDetails>
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Homepage></Homepage>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/donation-requests/edit/:id",
        element: (
          <PrivateRoute>
            <EditDonationRequest></EditDonationRequest>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
