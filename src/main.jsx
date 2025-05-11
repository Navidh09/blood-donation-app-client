import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./Routes/router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="max-w-screen">
      <RouterProvider router={router}></RouterProvider>
    </div>
  </StrictMode>
);
