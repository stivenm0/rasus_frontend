import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast"

function CardLink({setOpenDelete, setOpenEdit, setLink, setIsEditing}) {
  const {toast} = useToast();

  const copy = (link= "")=> {
      try {
        navigator.clipboard.writeText(link);
        toast({
          title: 'Enlace Copiado al Portapapeles'
        })
      } catch (err) {
        console.error('Error al copiar: ', err);
      }
    }
  
  return (
    <div className="flex items-center overflow-hidden bg-white border rounded-sm shadow">
      <div className="px-4 text-gray-700">
        <h1 className="flex items-center text-lg font-semibold tracking-wider text-blue-800">
          Facebook
          <DropdownMenu>
            <DropdownMenuTrigger>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <button
                className="w-full px-2 py-1 text-sm font-semibold text-white uppercase bg-teal-500 rounded shadow hover:bg-teal-600"
                onClick={()=> {
                  setOpenEdit(true)
                  setIsEditing(true)
                  setLink({id:2 , name: "link facebook"})
                }}
              >
                editar
              </button>
              <DropdownMenuSeparator />
              <button
                className="w-full px-2 py-1 text-sm font-semibold text-white uppercase bg-red-400 rounded shadow hover:bg-red-500"
                onClick={()=> {
                  setOpenDelete(true)
                  setLink({id:2 , name: "link facebook"})
                }}
              >
                Eliminar
              </button>
            </DropdownMenuContent>
          </DropdownMenu>
        </h1>
        <h2 className="text-sm tracking-wider">original:</h2>
        <div className="flex items-center justify-between w-full max-w-sm px-2 py-1 font-mono text-sm text-gray-800 bg-white border border-gray-800 rounded-md">
          <div className="flex gap-1">
            <span className="w-11/12 h-6 overflow-hidden">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat
              iusto voluptate sapiente officiis voluptas eveniet minima aliquid
              vero. Doloribus, molestias!
            </span>
          </div>
          <span
            className="flex w-5 h-5 text-gray-800 cursor-pointer hover:scale-125"
            title="Copiar al Portapapeles"
          >
            <svg
              className=""
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
            </svg>
          </span>
        </div>
        <h3 className="text-sm tracking-wider">corto: </h3>
        <div className="flex items-center justify-between w-full max-w-sm px-2 py-1 font-mono text-sm text-gray-800 bg-blue-100 border border-gray-800 rounded-md">
          <div className="flex w-full gap-1">
            <span className="block h-6 max-w-full overflow-hidden text-blue-900 ">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat
              iusto voluptate sapiente officiis voluptas eveniet minima aliquid
              vero. Doloribus, molestias!
            </span>
          </div>
          <span onClick={()=>copy("LINK")}
            className="flex w-5 h-5 text-gray-800 cursor-pointer hover:scale-125"
            title="Copiar al Portapapeles"
          >
            <svg
              className=""
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
            </svg>
          </span>
        </div>
        <p className="text-lg">clicks: 39,265</p>
      </div>
    </div>
  );
}

export default CardLink;
