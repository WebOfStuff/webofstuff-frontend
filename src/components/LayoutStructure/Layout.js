import LeftMenu from "./LeftMenu";
import TopMenu from "./TopMenu";
import BottomMenu from "./BottomMenu";
import React from "react";

export default function Layout ({ children }) {

  return ( 
    <div id="website" className="bg-base-100 text-base-content h-screen overflow-hidden">
        <TopMenu />
      <div id="contentarea" className="h-[90vh] flex flex-row w-full">
        <div id="leftmenu" className="w-[10vw]">
          <LeftMenu />
        </div>
        <div id="content" className="w-[90vw]">
        {children}
        </div>
      </div>
      <div id="bottommenu" className="h-[5vh] w-full">
        <BottomMenu />
      </div>
    </div>
  );
}