import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import svgCopy from '../../assets/copy.svg'

function CardLink({ setOpenDelete, setOpenEdit, setLink, setIsEditing, link }) {
  const { toast } = useToast();

  const shortFull = window.location.origin + "/" + link.short;

  const copy = (link = "") => {
    try {
      navigator.clipboard.writeText(link);
      toast({
        title: "Enlace Copiado al Portapapeles",
      });
    } catch (err) {
      console.error("Error al copiar: ", err);
    }
  };

  return (
    <div className="flex items-center bg-white border rounded-sm shadow">
      <div className="w-full px-4 text-gray-700">
        <h1 className="flex items-center text-lg font-semibold tracking-wider text-blue-800">
          {link.name}
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
                className="w-full px-2 py-1 text-sm font-semibold text-white bg-teal-500 rounded shadow hover:bg-teal-600"
                onClick={() => {
                  setOpenEdit(true);
                  setIsEditing(true);
                  setLink({ id: link.id, name: link.name, link: link.link });
                }}
              >
                Editar
              </button>
              <DropdownMenuSeparator />
              <button
                className="w-full px-2 py-1 text-sm font-semibold text-white bg-red-400 rounded shadow hover:bg-red-500"
                onClick={() => {
                  setOpenDelete(true);
                  setLink({ id: link.id, name: link.name });
                }}
              >
                Eliminar
              </button>
            </DropdownMenuContent>
          </DropdownMenu>
        </h1>
        <h2 className="flex text-sm tracking-wider ">original</h2>
        <div className="flex items-center justify-between max-w-sm px-2 py-1 font-mono text-sm text-gray-800 bg-white border border-gray-800 rounded-md">
          <div className="flex gap-1">
            <span className="inline-block w-full h-6 overflow-hidden">
              {link.link}
            </span>
          </div>
          <span onClick={()=>copy(link.link)}
            className="flex w-5 h-5 text-gray-800 cursor-pointer hover:scale-125"
            title="Copiar al Portapapeles"
          >
            <img src={svgCopy} alt="" />
          </span>
        </div>
        <h3 className="text-sm tracking-wider">corto: </h3>
        <div className="flex items-center justify-between w-full max-w-sm px-2 py-1 font-mono text-sm text-gray-800 bg-blue-100 border border-gray-800 rounded-md">
          <div className="flex w-full gap-1">
            <span className="block h-6 max-w-full overflow-hidden text-blue-900 ">
              {shortFull}
            </span>
          </div>
          <span
            onClick={() => copy(shortFull)}
            className="flex w-5 h-5 text-gray-800 cursor-pointer hover:scale-125"
            title="Copiar al Portapapeles"
          >
            <img src={svgCopy} alt="" />
          </span>
        </div>
        <p className="text-lg">clicks: {link.clicks}</p>
      </div>
    </div>
  );
}

export default CardLink;
