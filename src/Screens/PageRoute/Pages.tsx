import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import BitlyLinkDialog from "../DialogBox/BitlyLinkDialog";
import ShortenLinkWrapper from "../shortLink/ShortLinkWrapper";
import LiveSongLinksWrapper from "../LiveSongLinks/LiveSongLinksWrapper";
import LinksViewWrapper from "../LinksView.tsx/LinksViewWrapper";
import SingleViewLinkWrapper from "../SingleViewLink/SingleViewLinkWrapper";
import CreateLinkWrapper from "../CreateLink/CreateLinkWrapper";
import NoPageFoundPage from "../NoPageFound/NoPageFoundPage";
import Page1 from "../NoPageFound/Page1";
import Page2 from "../NoPageFound/Page2";
import Page3 from "../NoPageFound/Page3";
import { useNavigate } from "react-router-dom";
import Login from "../Auth/Login";
import SignIn from "../Auth/SignIn";
import ShortenURLComponent from "../CreateLink/ShortenComponent";
import Analytics from "../NoPageFound/Analytics";

const PageRoute = () => {
  const navigate = useNavigate();
  const hasFacebookAccessToken = localStorage.getItem("facebookAccessToken");
  const hasGoogleAccessToken = localStorage.getItem("GoogleAccessToken");
  const hasEmail = localStorage.getItem("email");
  const userIsLoggedIn =
    hasFacebookAccessToken || hasGoogleAccessToken || hasEmail;
  const [isAuthenticated, setIsAuthenticated] = useState(userIsLoggedIn);

  useEffect(() => {
    const userIsLoggedIn =
      hasFacebookAccessToken || hasGoogleAccessToken || hasEmail;
    setIsAuthenticated(userIsLoggedIn);
    // if (!userIsLoggedIn) {
    //   navigate("/");
    // }
  });

  return (
    <Routes>
      <Route
        path="home"
        element={isAuthenticated ? <CreateLinkWrapper /> : <Navigate to="/" />}
      />
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/home" /> : <ShortenLinkWrapper />
        }
      />
      <Route path="liveSong" element={<LiveSongLinksWrapper />} />
      <Route path="links-view" element={<LinksViewWrapper />} />
      <Route
        path="/links-view/:customName"
        element={<SingleViewLinkWrapper />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/sign_in" element={<SignIn />} />
      {/* <Route path="/create" element={<ShortenURLComponent />} /> */}
      <Route path="/create" element={<CreateLinkWrapper />} />
      <Route path="/01" element={<NoPageFoundPage />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/02" element={<Page1 />} />
      <Route path="/03" element={<Page2 />} />
      <Route path="/04" element={<Page3 />} />
    </Routes>
  );
};

export default PageRoute;
