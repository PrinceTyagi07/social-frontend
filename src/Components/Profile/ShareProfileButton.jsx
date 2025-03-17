import { useState } from "react";

const ShareProfileButton = ({ username }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const profileUrl = `${window.location.origin}/profile/${username}`;
    
    navigator.clipboard.writeText(profileUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => console.error("Error copying to clipboard", err));
  };

  return (
    <div className="">
      <button className="w-full py-2 px-4 rounded-md text-white font-semibold bg-gradient-to-r from-orange-500 to-red-400 hover:from-red-400 hover:to-orange-500 transition duration-300" onClick={handleShare}>
        Share Profile
      </button>
      {copied && <p className="text-green-500 ml-2">Copied!</p>}
    </div>
  );
};

export default ShareProfileButton;
