import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ContentContainer from "./components/shared/content.container";
import SingUpPage from "./pages/signup.page";
import ResponsContainer from "./components/shared/respons.container";
import HomePage from "./pages/home.page";
import SingInPage from "./pages/signin.page";
import ProtectedRout from "./utils/protected.rout";
import Header from "./components/header/header";
import InvoicePage from "./pages/invoice.page";
import StatsTitle from "./components/header/stats.title";
import ProfilePage from "./pages/profile.page";
import UsersPage from "./pages/users.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ContentContainer customStyle="bg-neutral-100">
        <ResponsContainer customStyle="">
          <ProtectedRout>
            <StatsTitle />
            <Header />
            <HomePage />
          </ProtectedRout>
        </ResponsContainer>
      </ContentContainer>
    ),
  },
  {
    path: "/invoice",
    element: (
      <ContentContainer customStyle="bg-neutral-100">
        <ResponsContainer customStyle="">
          <ProtectedRout>
            <StatsTitle />
            <Header />
            <InvoicePage />
          </ProtectedRout>
        </ResponsContainer>
      </ContentContainer>
    ),
  },
  {
    path: "/invoice/:expenseId",
    element: (
      <ContentContainer customStyle="bg-neutral-100">
        <ResponsContainer customStyle="">
          <ProtectedRout>
            <StatsTitle />
            <Header />
            <InvoicePage />
          </ProtectedRout>
        </ResponsContainer>
      </ContentContainer>
    ),
  },
  {
    path: "/signup",
    element: (
      <ContentContainer
        customStyle={
          "pt-[30px] sm:justify-center bg-neutral-100 bg-[url('./assets/123.jpg')] bg-cover"
        }
      >
        <ResponsContainer customStyle={""}>
          <SingUpPage />
        </ResponsContainer>
      </ContentContainer>
    ),
  },
  {
    path: "/signin",
    element: (
      <ContentContainer
        customStyle={
          "pt-[30px] sm:justify-center bg-neutral-100 bg-[url('./assets/123.jpg')] bg-cover"
        }
      >
        <ResponsContainer customStyle={""}>
          <SingInPage />
        </ResponsContainer>
      </ContentContainer>
    ),
  },
  {
    path: "/profile",
    element: (
      <ContentContainer customStyle="bg-neutral-100">
        <ResponsContainer customStyle="">
          <ProtectedRout>
            <StatsTitle />
            <Header />
            <ProfilePage />
          </ProtectedRout>
        </ResponsContainer>
      </ContentContainer>
    ),
  },
  {
    path: "/profile/:userId",
    element: (
      <ContentContainer customStyle="bg-neutral-100">
        <ResponsContainer customStyle="">
          <ProtectedRout>
            <StatsTitle />
            <Header />
            <ProfilePage />
          </ProtectedRout>
        </ResponsContainer>
      </ContentContainer>
    ),
  },
  {
    path: "/users",
    element: (
      <ContentContainer customStyle="bg-neutral-100">
        <ResponsContainer customStyle="">
          <ProtectedRout>
            <StatsTitle />
            <Header />
            <UsersPage />
          </ProtectedRout>
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
