"use client";
import React, { useState, ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className="flex">
        <div className="flex text-xs">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>
        <div className="relative flex flex-1 flex-col lg:ml-54"> {/* Reduced margin */}
          <div className="flex font-size-xs">
            {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
          </div>
          <main>
            <div className="mx-auto mt-3 text-xs">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}