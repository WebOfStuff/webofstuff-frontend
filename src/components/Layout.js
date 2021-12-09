import LeftMenu from "./LeftMenu";


const Layout = ({ children }) => {
    return (
        <div id="website" className="flex">
                <div id="leftmenu" className="flex w-1/6">
                    <LeftMenu />
                </div>
                <div id="content" className="flex w-5/6">
                    {children}
                </div>
        </div>

    );
}

export default Layout