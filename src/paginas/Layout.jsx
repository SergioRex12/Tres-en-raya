import { Outlet } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
    return (  
        <>
            <main>
                <h1 id="titulo">Tres en raya</h1>
                
            </main>
            <Outlet/>
            
        </>
    );
}
 
export default Layout;