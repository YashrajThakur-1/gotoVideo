import React, { FC } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core";

interface CreateLinkErrorProps {
  message: string;
  onClose: () => void;
}

const CreateLinkError: FC<CreateLinkErrorProps> = ({ message, onClose }) => {
  return (
    <Dialog open={true} onClose={onClose} className="max-w-md mx-auto">
      <DialogTitle className="bg-red-500 text-white p-4">Error</DialogTitle>
      <DialogContent className="p-4">
        <p className="text-red-500">{message}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} className="text-red-500">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateLinkError;
