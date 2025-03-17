import React from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const MiniProfile = () => {
  // Menu sections
  const sections = [
    {
      title: "How You Use App",
      items: ["Saved", "Archive", "Track Your Activity", "Notification", "Time Management"],
    },
    {
      title: "Who Can See Your Content",
      items: ["Account Privacy", "Close Friends", "Cross-Posting", "Blocked", "Hide Story and Live"],
    },
  ];

  return (
    <div className="-px-2 w-full bg-white rounded-lg shadow-md">
      {/* Search Box */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Dynamic Menu Sections */}
      {sections.map((section, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">{section.title}</h2>
          {section.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer">
              <span className="text-gray-700">{item}</span>
              <MdOutlineKeyboardArrowRight className="text-gray-500" />
            </div>
          ))}
          {/* Line break after each section */}
          {index < sections.length - 1 && <hr className="my-2 border-gray-300" />}
        </div>
      ))}
    </div>
  );
};

export default MiniProfile;
