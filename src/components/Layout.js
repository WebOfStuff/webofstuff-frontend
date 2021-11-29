import LeftMenu from "./LeftMenu";

const Layout = ({children})=> {
    return(
<div className ="content">
    <LeftMenu />
    {children}
</div>
    );
}

export default Layout