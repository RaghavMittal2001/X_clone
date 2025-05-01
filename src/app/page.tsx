import Left_Sidebar from "@/components/Left_Sidebar";
import Main_Timeline from "@/components/Main_Timeline";
import Right_Sidebar from "@/components/Right_Sidebar";
import React from "react";

const Home = () => {
  return (
    <div className="h-full w-full flex items-center justify-center bg-back relative">
      <div className="max-w-screen-xl w-full flex relative">
        {/* Left sidebar */}
        <Left_Sidebar />
        {/* Main content */}
        <Main_Timeline />
        {/* Right sidebar */}
       <Right_Sidebar />
      </div>
    </div>
  );
};

export default Home;
