
import { createBrowserRouter} from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Spaces from "./pages/Spaces";
import Space from "./pages/Space";
import App from "./components/auth/App";
import Guest from "./components/auth/guest";
import ShortLink from "./pages/ShortLink";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Guest><Home/></Guest> ,
    },
    {
        path: "/perfil",
        element: <App><Profile/></App> ,
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
    {
        path: "/:short",
        element: <ShortLink/>
    }

]);

export default router;