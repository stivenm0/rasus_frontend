import { useQuery } from "@tanstack/react-query";
import { showLink } from "../lib/api";
import LLoading from "../components/profile/LLoading";
import { Link, useNavigate, useParams } from "react-router-dom";

function ShortLink() {

  const {short} = useParams()
  const N = useNavigate();


  const { data, isLoading } = useQuery({
    queryKey: ["link"],
    queryFn: ()=> showLink(short),
  });

  if (isLoading) {
    <LLoading />;
  }

  if (data) {
    const link = data.data.data;
    return( 
     <main className="flex flex-col items-center justify-center w-screen h-screen gap-2 bg-gradient-to-r from-green-200 via-green-400 to-purple-700">
        <Link to="/" className="fixed px-4 py-2 text-2xl text-purple-800 top-5 left-4" >Rasus</Link>
        <Link className="px-4 py-2 text-sm font-bold leading-6 capitalize duration-100 transform bg-green-300 border border-gray-500 rounded-sm shadow cursor-pointer mbs-4 focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none sm:mb-0 sm:w-auto sm:mr-4 md:pl-8 md:pr-6 xl:pl-12 xl:pr-10 hover:shadow-lg hover:-translate-y-1"
        to={link} >Ir al Enlace</Link>
      </main>
    )
  }

}

export default ShortLink;
