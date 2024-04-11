import React, { useState } from "react";

const ShortenURLPage: React.FC = () => {
  const [longURL, setLongURL] = useState("");
  const [customName, setCustomName] = useState("");
  const [shortenedURL, setShortenedURL] = useState("");
  const [email, setEmail] = useState("");

  React.useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleURLShortening = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const data = {
        email: email,
        customName: customName,
        longURL: longURL,
      };
      const token = localStorage.getItem("GoogleAccessToken");
      const requestOptions: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
        mode: "cors",
        body: JSON.stringify(data),
      };

      const response = await fetch(
        "https://testapi.go2.video/createshorturl",
        requestOptions
      );

      const result = await response.json();
      setShortenedURL(result.url);
      console.log(result); // Log the response in the console
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6                   ">
      <input
        type="text"
        placeholder="Enter long URL"
        value={longURL}
        onChange={(e) => setLongURL(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter custom name"
        value={customName}
        onChange={(e) => setCustomName(e.target.value)}
      />
      <button onClick={handleURLShortening}>Shorten URL</button>
      {shortenedURL && (
        <p>
          Shortened URL: <a href={shortenedURL}>{shortenedURL}</a>
        </p>
      )}
    </div>
  );
};

export default ShortenURLPage;
