import { useState, useMemo } from "react";
import { Share2 } from "lucide-react";
import Button from "./ui/Button";
import ShareModal from "./ShareModal";

interface ShareButtonProps {
  projectId?: string;
  projectName?: string;
  className?: string;
  disabled?: boolean;
}

const ShareButton = ({
  projectId,
  projectName,
  className,
  disabled = false,
}: ShareButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Generate share link safely (handles SSR)
  const shareLink = useMemo(() => {
    if (typeof window === "undefined") {
      return "";
    }

    const baseUrl = window.location.origin;
    const path = projectId
      ? `/visualizer/${projectId}`
      : window.location.pathname;

    return `${baseUrl}${path}`;
  }, [projectId]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        size="sm"
        onClick={handleOpenModal}
        className={className || "share"}
        disabled={disabled}
        aria-label="Share design"
        type="button"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </Button>

      <ShareModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        shareLink={shareLink}
        projectName={projectName}
      />
    </>
  );
};

export default ShareButton;
