import LeftMenu from "./LeftMenu/LeftMenu";
import TopMenu from "./TopMenu/TopMenu";
import BottomMenu from "./BottomMenu/BottomMenu";

export default function Layout ({ children }) {
  return ( 
    <div id="website" className="flex flex-col h-full">
      <div id="topmenus" className="h-1/6 w-full">
        <TopMenu />
      </div>
      <div id="contentarea" className="flex flex-row h-4/6 w-full">
        <div id="leftmenu" className="w-1/6">
          <LeftMenu />
        </div>
        <div id="content" className="w-5/6">
          {children}
        </div>
      </div>
      <div id="bottommenu" className="h-1/6 w-full">
        <BottomMenu />
      </div>
    </div>
  );
}