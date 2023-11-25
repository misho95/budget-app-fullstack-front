import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ContentContainer from "./components/shared/content.container";
import SingUpPage from "./pages/signup.page";
import ResponsContainer from "./components/shared/respons.container";
import HomePage from "./pages/home.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/signup",
    element: (
      <ContentContainer
        customStyle={"pt-[30px] sm:justify-center bg-neutral-100"}
      >
        <ResponsContainer customStyle={""}>
          <SingUpPage />
        </ResponsContainer>
      </ContentContainer>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
