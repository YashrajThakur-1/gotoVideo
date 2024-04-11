import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import QRCode from "qrcode.react";

interface ColorPickerDialogProps {
  onClose: () => void;
  onColorChange: (linkId: string, color: string) => void;
  shortURL: string;
  linkId: string;
}

const ColorPickerDialog: React.FC<ColorPickerDialogProps> = ({
  onClose,
  onColorChange,
  shortURL,
  linkId,
}) => {
  const [localColor, setLocalColor] = React.useState<string>("#ABC111");

  // Maintain a state object to store colors for each linkId
  const [linkColors, setLinkColors] = React.useState<{ [key: string]: string }>(
    {}
  );

  React.useEffect(() => {
    // Set localColor to the color stored in the state for the current linkId
    setLocalColor(linkColors[linkId] || "#000");
  }, [linkId, linkColors]);

  const handleColorChange = (newColor: string) => {
    // Update the state with the new color for the current linkId
    setLinkColors((prevColors) => ({
      ...prevColors,
      [linkId]: newColor,
    }));
    setLocalColor(newColor); // Update localColor for immediate visual feedback
  };

  const handleSave = () => {
    onColorChange(linkId, localColor);
    onClose();
  };

  const colorOptions = [
    "#2196F3",
    "#4CAF50",
    "#FFC107",
    "#FF5722",
    "#673AB7",
    "#E91E63",
    "#00BCD4",
    "#ABC111",
  ];

  return (
    <Dialog open={true} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle
        style={{
          background: "linear-gradient(to right, #2196F3, #4CAF50)",
          color: "#fff",
          textAlign: "center",
        }}
      >
        Customize QR Code
      </DialogTitle>
      <DialogContent style={{ textAlign: "center", padding: "15px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <QRCode value={shortURL} fgColor={localColor} size={100} />
          <DialogContentText style={{ marginTop: "10px", color: "#555" }}>
            Select a color for customization.
          </DialogContentText>
        </div>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          {colorOptions.map((buttonColor) => (
            <button
              key={buttonColor}
              style={{
                backgroundColor: buttonColor,
                width: "30px",
                height: "30px",
                margin: "5px",
                border: "none",
                cursor: "pointer",
                borderRadius: "50%",
              }}
              onClick={() => handleColorChange(buttonColor)}
            />
          ))}
        </div>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <label style={{ color: "#555", fontSize: "14px" }}>Short URL:</label>
          <input
            type="text"
            value={shortURL}
            readOnly
            style={{
              marginLeft: "5px",
              padding: "8px",
              fontSize: "14px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
      </DialogContent>
      <DialogActions
        style={{
          justifyContent: "center",
          paddingBottom: "15px",
          borderTop: "1px solid #ccc",
        }}
      >
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          style={{
            background: "linear-gradient(to right, #4CAF50, #FFC107)",
            color: "#fff",
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ColorPickerDialog;
