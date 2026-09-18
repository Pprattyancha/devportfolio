"use client";

import { useState } from "react";
import { downloadFile } from "@/app/lib/utils";
import { Button } from "../ui/Button";
import { Popup } from "./Popup";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
interface ResumePreviewProps {
  trigger: React.ReactNode;
}

const resumePath =
  "/Resume_Prattyancha_Patharkar_Software_developer_5years.pdf";

const resumeName = "Prattyancha_Patharkar_Resume.pdf";

export function ResumePreview({ trigger }: ResumePreviewProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDownload = () => {
    downloadFile(resumePath, resumeName);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger */}
      <span
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setIsOpen(true);
          }
        }}
        className="cursor-pointer"
      >
        {trigger}
      </span>

      {/* Resume Popup */}
      <Popup
        isOpen={isOpen}
        onClose={closePopup}
        title="Resume Preview"
        subtitle="Prattyancha Patharkar"
        footer={
          <>
            {/* Cancel */}
            <Button
              type="button"
              variant="primary"
              onClick={closePopup}
              className="!bg-white !text-black"
            >
              Cancel
            </Button>

            {/* Download */}
            <Button type="button" variant="secondary" onClick={handleDownload}>
              Download <FileDownloadOutlinedIcon className="ml-5" />
            </Button>
          </>
        }
      >
        <iframe
          src={resumePath}
          title="Prattyancha Patharkar Resume"
          className="h-full w-full border-0"
        />
      </Popup>
    </>
  );
}
