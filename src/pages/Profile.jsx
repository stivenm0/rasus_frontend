import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";

import FormUpdateProfile from "../components/forms/FormUpdateProfile";
import FormDeleteProfile from "../components/forms/FormDeleteProfile";
import FormUpdatePassword from "../components/forms/FormChangePassword";
import Bell from "../components/profile/Bell";
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"



function Profile() {
  const {user} = useParams()

  useEffect(() => {
    document.title = user + " - rasus"

  }, [])
  


  return (
    <div>
      <Toaster/>
      <h1 className="text-xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
          RASUS
      </h1>
    <main className="flex justify-center py-2 ">
      
      <section className="p-4 mb-2 border rounded-lg shadow-2xl bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 md:max-w-screen-lg shadow-purple-600"> 
        <div className="flex justify-center mx-auto">
          <div className="max-w-lg card md:flex">
            <div className="flex-shrink-0 w-20 mx-auto mb-6 md:mr-6">
              <img
                className="object-cover rounded-full"
                src="https://tailwindflex.com/public/images/user.png"
              />
            </div>
            <div className="flex-grow text-center text-gray-200 md:text-left">
              <p className="text-2xl font-bold">@estivenm0</p>
              <h3 className="text-lg font-bold heading">John Doe Muñoz Carmona</h3>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full gap-1 m-1 sm:flex-row items">
          <Bell/>
          <FormUpdateProfile/>
          <FormUpdatePassword/>
          <FormDeleteProfile/>
        </div>

        <Outlet/>
      </section>
    </main>
    </div>

  );
}

export default Profile;
