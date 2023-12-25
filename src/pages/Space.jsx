import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardLink from "../components/cards/CardLink";
import AlertDelete from "../components/forms/AlertDelete";
import FormLink from "../components/forms/FormLink";
import { useQuery } from "@tanstack/react-query";
import { showSpace } from "../lib/api";
import LLoading from "../components/profile/LLoading";

function Space() {
  const { space } = useParams();


  const {data, isLoading, isError, error} = useQuery({
    queryKey: ["space"],
    queryFn: ()=> showSpace(space)
  });

  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [link, setLink] = useState({
    id: null,
    name: null,
  });

  useEffect(() => {
    document.title = space + " - rasus";
  }, []);

  if(isLoading){ <LLoading/> }

  if(isError){
    console.log(error)
  }

  if(data){

    const links = data.data.data
    return (
      <section>
        <h2 className="flex items-center mt-6 mb-4 text-xl font-bold text-purple-500">
          {space}
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
              <DropdownMenuSeparator />
              <Button variant="outline" className="w-full" onClick={()=>{
                setOpenForm(true)
                setIsEditing(false)
                }}>
                Acortar URL
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </h2>
        <FormLink open={openForm} setOpen={setOpenForm} isEditing={isEditing} />
  
        <AlertDelete
          open={openDelete}
          setOpen={setOpenDelete}
          resourceType={"link"}
          resource={link}
        />
        <div className="grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-2 xl:grid-cols-4 sm:px-8">
          {links.map((link, index)=>(
              <CardLink key={index} link={link}
              setOpenDelete={setOpenDelete}
              setLink={setLink}
              setIsEditing={setIsEditing}
              setOpenEdit={setOpenForm}
            />
          ))
            
          }
          
        </div>
      </section>
    );
  }
  
}

export default Space;
