import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import FormCreateURLSpace from "../components/forms/FormCreateURLSpace";
import CardSpace from "../components/cards/CardSpace";
import { useState } from "react";
import AlertDelete from "../components/forms/AlertDelete";
import FormSpace from "../components/forms/FormSpace";
import { useQuery } from "@tanstack/react-query";
import { getSpaces } from "../lib/api";

function Spaces() {

  const {data, isLoading, isError} = useQuery({
    queryKey: ['spaces'],
    queryFn: getSpaces
  })

  // STATES
  const [openForm, setOpenForm] = useState( false);
  const [isEditing, setIsEditing] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [space, setSpace] = useState({
    id: null,
    name: null,
  });

  console.log(data)

  
  return (
    <div className="col-span-4 sm:col-span-9">
      <div className="rounded-lg shadow sm:p-6">
        <h2 className="flex items-center mt-6 mb-4 text-xl font-bold text-purple-500">
          Espacios
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
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <Button onClick={()=>{
                setOpenForm(!openForm)
                setIsEditing(false)
                }} variant="outline" className="w-full">
                Crear Espacio
              </Button>
              <DropdownMenuSeparator />
              <FormCreateURLSpace />
            </DropdownMenuContent>
          </DropdownMenu>
        </h2>
        <FormSpace open={openForm} setOpen={setOpenForm} isEditing={isEditing} />

        <AlertDelete
          open={openDelete}
          setOpen={setOpenDelete}
          resourceType={"space"}
          resource={space}
        />

{isError && "error" }
        <CardSpace
          edit={openForm}
          setOpenEdit={setOpenForm}
          setIsEditing={setIsEditing}
          setOpenDelete={setOpenDelete}
          setSpace={setSpace}
        />
      </div>
    </div>
  );
}

export default Spaces;
