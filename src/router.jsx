
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Spaces from "./pages/Spaces";
import Space from "./pages/Space";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/:user",
        element: <Profile/>,
        children: [
            {
                path: "/:user",
                element: <Spaces/>,
            },
            {
                path: "/:user/:space",
                element: <Space/>,
            }
        ]
    },

]);

export default router;