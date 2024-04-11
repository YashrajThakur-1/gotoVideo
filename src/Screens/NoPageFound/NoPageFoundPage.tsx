import React, { useState } from "react";
import SideNavigationLayout from "../../component/ui/SideNavigationLayout";
import QRCode from "qrcode.react";
import "./NoPageFoundPage.css"; // Import your CSS file
import Qr from "../../assets/images/Qr-code.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setQrCode } from "../../redux/Slice/authSlice";

const NoPageFoundPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [link, setLink] = useState<string>("");
  const [generatedLink, setGeneratedLink] = useState("");
  localStorage.setItem("qrcode", generatedLink);
  const generateQRCode = () => {
    setGeneratedLink(link);
    // navigate(`${encodeURIComponent(generatedLink)}`);
  };
  console.log("Generated", generatedLink);
  return (
    <SideNavigationLayout>
      <div className="container mt-5">
        <div className="qr-image-container">
          <img src={Qr} className="qr-image" alt="QR Code Generator" />
        </div>
        <div className="card p-4 custom-card">
          <h2 className="mb-4">Generate QR Code</h2>
          <div className="mb-3">
            <label className="form-label">Enter Link:</label>
            <input
              type="text"
              placeholder="Paste Link here"
              className="form-control"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              generateQRCode();

              // dispatch(setQrCode(generatedLink));
            }}
          >
            Generate QR Code
          </button>
          {/* {generatedLink} */}
          {generatedLink && (
            <div className="mt-4">
              <h3 className="mb-3">Generated QR Code for {generatedLink}</h3>
              <QRCode value={generatedLink} />
            </div>
          )}
        </div>
      </div>
    </SideNavigationLayout>
  );
};

export default NoPageFoundPage;
