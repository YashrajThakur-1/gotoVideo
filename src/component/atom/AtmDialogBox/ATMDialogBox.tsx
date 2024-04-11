import React from "react";
import Dialog from "@mui/material/Dialog";
import { DialogContent } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import { IconType } from "react-icons";
import { IoCloseSharp } from "react-icons/io5";
type Props = {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  title: string;
  closeIcon?: IconType;
  showCloseIcon?: boolean;
  extraClasses?: string;
  showButton?: boolean;
  onClick?: () => void;
};
const ATMDialogBox = ({
  isOpen,
  onClose,
  children,
  extraClasses,
  title,
  onClick,
  closeIcon,
  showButton,
  showCloseIcon = true,
}: Props) => {
  return (
    <div>
      <Dialog open={isOpen} onClose={onClose && (() => onClose())}>
        <div className={`${extraClasses}`}>
          <DialogTitle>
            {showCloseIcon && (
              <div className="flex justify-between">
                <h1 className="font-bold">{title}</h1>
                <button className="font-medium" onClick={onClose}>
                  <IoCloseSharp />
                </button>
              </div>
            )}
          </DialogTitle>
          <DialogContent>
            {children}
            {showButton && (
              <div className="flex gap-2 justify-end text-[14px] py-4 font-medium">
                <button
                  className="border-[1px] border-gray-300 py-1 px-3 rounded hover:bg-[#E3F1FE]"
                  onClick={onClick}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#2a5bd7] py-1 px-3 rounded text-white hover:bg-[#0C3EBB]"
                  onClick={onClick}
                >
                  Save
                </button>
              </div>
            )}
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};

export default ATMDialogBox;
