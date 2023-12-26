import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function App({ children }) {
  const N = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true)
    }else{
      N("/")
    }
  }, []);

  return isAuthenticated? <>{children}</>: null;
}

export default App;
