import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLink, deleteSpace } from "../../lib/api";
import { useToast } from "@/components/ui/use-toast"

function AlertDelete({open, setOpen, resourceType, resource}) {

  const {toast} = useToast();
  const queryClient = useQueryClient()

  function deleteSuccess(){
    toast({
      title: "Eliminado",
      description: `${resource.name} se elimino correctamente.`
    })
  }

  function deleteError(){
    toast({
      title: "Ocurrió un Error",
      description: `Recargue la pagina e intente nuevamente.`
    })
  }

  const deleteSpaceMutation = useMutation({
    mutationFn: deleteSpace,
    onSuccess: ()=>{ 
      queryClient.invalidateQueries('spaces')
      deleteSuccess()
    },
    onError: ()=> deleteError()

  });
  const deleteLinkMutation = useMutation({
    mutationFn: deleteLink,
    onSuccess: ()=>{
       queryClient.invalidateQueries('space')
       deleteSuccess()
    },
    onError: ()=> deleteError()
  });


  const destroy = ()=>{
    switch(resourceType){
      case "space": deleteSpaceMutation.mutate(resource.id);
      break;
      case "link": deleteLinkMutation.mutate(resource.id);
      break;
    }
  } 

  return (
          <AlertDialog open={open} onOpenChange={()=>setOpen(!open)} >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                   Esto eliminará permanentemente el 
                   {resourceType == "space"? " espacio ": " enlace "}{resource.name} .
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel >Cancelar</AlertDialogCancel>
                <AlertDialogAction 
                onClick={destroy}
                >Eliminar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>  
  )
}

export default AlertDelete