import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { RocketIcon } from "lucide-react";
import { useState } from "react";

function Bell() {

  const {toast} = useToast()

  const handleNotification = (checked)=>{
      if (checked) {
        toast({
          title: "Notificaciones",
          description: "Notificaciones Activadas",
        });
      } else {
        toast({
          title: "Notificaciones",
          description: "Notificaciones Desactivadas",
        });
      }


  }



  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-2 outline-none">
        <Badge>
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
            <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path>
          </svg>
          {/* <Badge variant="destructive" >100</Badge> */}
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
        <div className="flex items-center space-x-2">
      <Checkbox id="terms"  onCheckedChange={(checked)=> handleNotification(checked)}/>
      <label 
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Notificaciones
      </label>
    </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
        <Alert className="max-w-full">
          <RocketIcon className="w-4 h-4 " />
          <AlertTitle>Alguien le dio click a Facebook</AlertTitle>
        </Alert>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Bell;
