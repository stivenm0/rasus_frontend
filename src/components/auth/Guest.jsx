import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Guest({ children }) {
  const N = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      N("/perfil");
    }
  }, []);

  return <>{children}</>;
}

export default Guest;
