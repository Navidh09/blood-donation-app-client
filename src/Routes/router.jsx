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
        path: "/searchDonor",
        element: <SearchDonors></SearchDonors>,
      },
      {
        path: "/blogs",
        element: <Blogs></Blogs>,
      },
      {
        path: "/blogs/:id",
        element: <BlogDetails></BlogDetails>,
      },
    ],
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
            <HomePage></HomePage>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
