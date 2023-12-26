import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import FormUpdateProfile from "../components/forms/FormUpdateProfile";
import FormDeleteProfile from "../components/forms/FormDeleteProfile";
import Bell from "../components/profile/Bell";
import { Toaster } from "@/components/ui/toaster";
import { client, getUser, logout } from "../lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import LLoading from "../components/profile/LLoading";

function Profile() {

  const N = useNavigate();

  
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: ()=>{
      localStorage.clear();
      N("/");
    },
    onError:(e)=> console.log(e) 
  });


  const handleLogout = ()=> logoutMutation.mutate()

  useEffect(() => {
    document.title = "perfil - rasus";
    console.log(client.defaults.headers)
  }, []);

  if (isLoading) {
    return <LLoading />;
  }

  if (data) {
    const user = data.data.data;

    return (
      <div>
        <Toaster />
        <h1 className="text-xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
          RASUS
        </h1>
        <main className="flex justify-center py-2 ">
          <section className="w-full p-4 mb-2 border rounded-lg shadow-2xl bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 md:max-w-screen-lg shadow-purple-600 md:w-7/12">
            <div className="flex justify-center mx-auto">
              <div className="max-w-lg card md:flex">
                <div className="flex-shrink-0 w-20 mx-auto mb-6 md:mr-6">
                  <img
                    className="object-cover rounded-full"
                    src="https://tailwindflex.com/public/images/user.png"
                  />
                </div>
                <div className="flex-grow text-center text-gray-200 md:text-left">
                  <p className="text-2xl font-bold">{user.nickname}</p>
                  <h3 className="text-lg font-bold heading">{user.name}</h3>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full gap-1 m-1 sm:flex-row items">
              <Bell />
              <FormUpdateProfile user={user} />
              <FormDeleteProfile />
              <button onClick={handleLogout}
              className="bg-gray-500 hover:bg-gray-700 text-white  px-3 py-1.5 rounded-lg text-sm font-semibold">
                Salir
              </button>
            </div>

            <Outlet />
          </section>
        </main>
      </div>
    );
  }
}

export default Profile;
