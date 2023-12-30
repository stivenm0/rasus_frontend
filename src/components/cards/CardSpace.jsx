import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

function CardSpace({
  space,
  setOpenDelete,
  setOpenEdit,
  setIsEditing,
  setSpace,
}) {
  
  return (
    <div className="p-1 mb-2 bg-gray-700 border rounded-md">
      <div className="flex flex-wrap justify-between w-full gap-2">
        <Link to={`/perfil/${space.slug}`} className="font-bold text-gray-300">
          {space.name}
        </Link>
        <Badge className="font-bold ">{space.count_links}</Badge>
      </div>
      <p className="mt-2 text-gray-50">{space.description}</p>
      <button
        className="inline-block px-2 py-1 text-sm font-semibold tracking-wide text-white no-underline uppercase bg-teal-500 rounded shadow hover:bg-teal-600"
        onClick={() => {
          setOpenEdit(true);
          setIsEditing(true);
          setSpace({
            id: space.id,
            name: space.name,
            description: space.description,
          });
        }}
      >
        editar
      </button>
      <button
        className="inline-block px-2 py-1 m-1 text-sm font-semibold tracking-wide text-white no-underline uppercase bg-red-400 rounded shadow hover:bg-red-500"
        onClick={() => {
          setOpenDelete(true);
          setSpace({ id: space.id, name: space.name });
        }}
      >
        Eliminar
      </button>
    </div>
  );
}

export default CardSpace;
