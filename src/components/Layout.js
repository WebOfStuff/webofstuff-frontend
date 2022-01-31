import LeftMenu from "./LeftMenu/LeftMenu";
import TopMenu from "./TopMenu/TopMenu";
import BottomMenu from "./BottomMenu/BottomMenu";

export default function Layout ({ children }) {
  return ( 
    <div id="website" className="h-screen">
      <div id="topmenus" className="h-[5vh] w-full">
        <TopMenu />
      </div>
      <div id="contentarea" className="h-[90vh] flex flex-row w-full overflow-">
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