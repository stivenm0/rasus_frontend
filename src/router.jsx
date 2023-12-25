
import { createBrowserRouter, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Spaces from "./pages/Spaces";
import Space from "./pages/Space";

// const N = useNavigate();

// function guest (element){
//     if(localStorage.getItem("token")){
//         N("profile");
//     }
//     return element
// }


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/perfil",
        element: <Profile/>,
        children: [
            {
                path: "/perfil",
                element: <Spaces/>,
            },
            {
                path: "/perfil/:space",
                element: <Space/>,
            }
        ]
    },

]);

export default router;