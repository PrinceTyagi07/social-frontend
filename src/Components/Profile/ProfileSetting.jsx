import React from "react";
import { Link } from "react-router-dom";
import {
  MdOutlineKeyboardArrowRight,
  MdSave,
  MdNotifications,
  MdArchive,
  MdLock,
  MdAccessTime,
  MdPerson,
  MdBlock,
  MdVisibilityOff,
} from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { RiTimeLine } from "react-icons/ri";
import { BsCrosshair } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import Logout from "../Auth/Logout";

const MiniProfile = () => {
  // Menu sections with icons
  const sections = [
    {
      title: "How You Use App",
      items: [
        { name: "Saved", icon: <MdSave /> },
        { name: "Archive", icon: <MdArchive /> },
        { name: "Track Your Activity", icon: <RiTimeLine /> },
        { name: "Notification", icon: <MdNotifications /> },
        { name: "Time Management", icon: <MdAccessTime /> },
      ],
    },
    {
      title: "Who Can See Your Content",
      items: [
        { name: "Account Privacy", icon: <MdLock /> },
        { name: "Close Friends", icon: <AiOutlineUsergroupAdd /> },
        { name: "Cross-Posting", icon: <BsCrosshair /> },
        { name: "Blocked", icon: <MdBlock /> },
        { name: "Hide Story and Live", icon: <MdVisibilityOff /> },
      ],
    },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className=" flex gap-2 w-[120px]  ">
        <Link to="/profile" className="justify-around flex items-center">
          <FaArrowLeft className="cursor-pointer hover:text-orange-500 transition" />
        </Link>
          <h2 className="font-bold pt-2 text-xl mb-3">Settings</h2>
      </div>
      <div className=" flex items-start mb-3">
        <Logout/>

        </div>
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
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            {section.title}
          </h2>
          {section.items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer transition-transform duration-200 hover:scale-105"
            >
              <div className="flex items-center gap-2 text-gray-700">
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </div>
              <MdOutlineKeyboardArrowRight className="text-gray-500" />
            </div>
          ))}
          {/* Line break after each section */}
          {index < sections.length - 1 && (
            <hr className="my-2 border-gray-300" />
          )}
   
        
        </div>
      ))}
      
    </div>
  );
};

export default MiniProfile;
