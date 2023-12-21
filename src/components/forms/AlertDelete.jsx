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

function AlertDelete({open, setOpen, resourceType, resource}) {

  const destroy = ()=>{
    switch(resourceType){
      case "space": console.log("space");
      break;
      case "link": console.log("link");
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