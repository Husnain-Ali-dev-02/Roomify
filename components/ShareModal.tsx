
import { useState, useEffect } from "react";
import { X, Copy, Check } from "lucide-react";
import Button from "./ui/Button";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareLink: string;
  projectName?: string;
}

const ShareModal = ({
  isOpen,
  onClose,
  shareLink,
  projectName = "Design",
}: ShareModalProps) => {
  const [isCopied, setIsCopied] = useState(false);

  // Reset copied state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsCopied(false);
    }
  }, [isOpen]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        {/* Modal Header */}
        <div className="modal-header">
          <h2 id="share-modal-title" className="modal-title">
            Share {projectName}
          </h2>
          <button
            onClick={onClose}
            className="modal-close"
            aria-label="Close share modal"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="modal-content">
          <p className="modal-description">
            Share this design with anyone using the link below:
          </p>

          {/* Share Link Container */}
          <div className="share-link-container">
            <input
              type="text"
              readOnly
              value={shareLink}
              className="share-link-input"
              aria-label="Shareable link"
            />
            <Button
              size="sm"
              onClick={handleCopyLink}
              className={`copy-button ${isCopied ? "copied" : ""}`}
              aria-label={isCopied ? "Link copied to clipboard" : "Copy link"}
              type="button"
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4 mr-1" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-1" />
                  <span>Copy Link</span>
                </>
              )}
            </Button>
          </div>

          {/* Additional Info */}
          <p className="modal-info">
            Anyone with this link can view your design. No login required.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
