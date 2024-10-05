// src/app/layout.tsx
"use client";

import React, { useState } from "react";
import Sidebar from "@/components/sidebar";
import { Navigation } from "@/components/maindashboard/Navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleHover = (status: boolean) => {
    setIsHovered(status);
  };

  return (
    <html lang="en">
      <body>
        <div className="h-screen relative">
          <div className="grid grid-cols-12 h-full">
            {/* Sidebar */}
            <div className={`col-span-1 ${isHovered ? "z-10" : "z-0"}`}>
              <Sidebar onHover={handleHover} />
            </div>

            {/* Main Content */}
            <div
              className={`h-full col-span-${
                isHovered ? "11" : "11"
              } transition-all duration-300 grid grid-rows-11 gap-1`}
            >
              <div className="row-span-1 bg-slate-800">
                {/* Navigation Bar */}
                <h1 className="text-white"></h1>
              </div>

              {/* Page Content */}
              <div className="row-span-10">{children}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
