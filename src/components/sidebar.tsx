"use client";
import { useState } from "react";
import Link from "next/link";
import React from "react";

// Define the props interface
interface SidebarProps {
  onHover: (status: boolean) => void; // Function to handle hover status
}

const Sidebar: React.FC<SidebarProps> = ({ onHover }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [openSubsets, setOpenSubsets] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleHover = (status: boolean) => {
    setIsHovered(status);
    onHover(status); // Pass the hover status to the parent component
  };

  const toggleSubset = (key: string) => {
    setOpenSubsets((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Define the navigation structure
  const navItems = [
    { name: "Home", href: "/", icon: "Home" },
    {
      name: "Profile",
      icon: "Profile",
      subset: [
        { name: "View Profile", href: "/profile/view", icon: "VP" },
        { name: "Edit Profile", href: "/profile/edit", icon: "EP" },
      ],
    },
    {
      name: "Pipeline",
      icon: "Pipeline",
      subset: [
        { name: "Jobs", href: "/pipeline/jobs", icon: "J" },
        { name: "Candidates", href: "/pipeline/candidates", icon: "C" },
      ],
    },
    { name: "Settings", href: "/settings", icon: "Settings" },
  ];

  return (
    <div
      className={`h-screen bg-black text-white transition-all duration-300 ${
        isHovered ? "w-64 z-10" : "w-32 z-0"
      } flex flex-col`}
      onMouseEnter={() => toggleHover(true)}
      onMouseLeave={() => toggleHover(false)}
    >
      {/* Logo / Brand */}
      <div className="p-4 text-xl font-semibold text-center bg-gray-900">
        <div className="flex items-center justify-center text-center">
          {isHovered ? <span>My Brand</span> : <span>B</span>}
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-4">
        {navItems.map((item) => (
          <div key={item.name}>
            {item.subset ? (
              <>
                <div
                  className="flex items-center justify-between text-center hover:bg-gray-700 p-2 rounded transition-colors border border-transparent hover:border-white cursor-pointer"
                  onClick={() => toggleSubset(item.name)}
                >
                  <span className="flex-1 text-left">
                    {isHovered ? item.name : item.icon}
                  </span>
                  <span>
                    {isHovered ? (openSubsets[item.name] ? "-" : "+") : null}
                  </span>
                </div>
                {/* Subset Navigation */}
                {openSubsets[item.name] && (
                  <div className="pl-4 space-y-2">
                    {item.subset.map((subItem) => (
                      <Link key={subItem.name} href={subItem.href}>
                        <div className="flex items-center justify-between text-center hover:bg-gray-600 p-2 rounded transition-colors border border-transparent hover:border-white">
                          <span className="flex-1 text-left">
                            {isHovered ? subItem.name : subItem.icon}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link href={item.href}>
                <div className="flex items-center justify-between text-center hover:bg-gray-700 p-2 rounded transition-colors border border-transparent hover:border-white">
                  <span className="flex-1 text-left">
                    {isHovered ? item.name : item.icon}
                  </span>
                </div>
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Logout Button */}
      <Link href="/logout">
        <div className="p-2">
          <div className="flex items-center justify-center text-center hover:bg-red-600 p-1 pr-2 my-4 rounded transition-colors border border-transparent hover:border-white">
            {isHovered ? <span>Logout</span> : <span>Logout</span>}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
