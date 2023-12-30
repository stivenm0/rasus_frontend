import { useEffect } from "react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

function Home() {
  useEffect(() => {
    document.title = "rasus";
  }, []);

  return (
    <div className="container p-8 mx-auto overflow-hidden text-gray-800 md:rounded-lg md:p-10 lg:p-12">
      <div className="flex flex-wrap justify-center gap-2 md:justify-between">
        <h1 className="font-serif text-3xl font-medium">RASUS</h1>
        <div>
          <Login />
          <Register />
        </div>
      </div>

      <div className="h-32 md:h-40"></div>

      <p className="max-w-5xl font-sans text-4xl font-bold text-gray-900 lg:text-7xl lg:pr-24 md:text-6xl">
        Enlaces simplificados, experiencias mejoradas.
      </p>
      <div className="h-10"></div>
      <p className="max-w-2xl font-serif text-xl text-gray-800 md:text-2xl">
        Tu herramienta para recortar enlaces de manera eficiente. Guarda y
        organiza tus enlaces mas necesitados de manera simple y rápida.
      </p>
    </div>
  );
}

export default Home;
