import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./Routes/router";
import AuthProvider from "./providers/AuthProvider";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <div className="max-w-screen">
        <RouterProvider router={router}></RouterProvider>
      </div>
    </AuthProvider>
    <ToastContainer autoClose={2000}></ToastContainer>
  </StrictMode>
);
