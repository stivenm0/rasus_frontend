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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteNotifications, notifications } from "../../lib/api";
import LLoading from "./LLoading";
import { useState } from "react";

function Bell() {

  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery({
    queryKey: ["notifications"],
    queryFn: notifications,
    refetchInterval: 10000,
  });

  const deleteNotificationsMutation = useMutation({
    mutationFn: deleteNotifications,
    onSuccess: () => queryClient.invalidateQueries("notifications"),
  });

  const deleteN = ()=>{
    if(open){
      deleteNotificationsMutation.mutate()
    }
  }

  if (isLoading) {
    <LLoading />;
  }

  if (data) {
    const notifications = data.data.data;

    return (
      <DropdownMenu open={open} onOpenChange={() => {
        setOpen(!open)
        deleteN()
      }} >
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

            <Badge variant="destructive">
              {notifications.length > 100 ? "+99" : notifications.length}
            </Badge>
          </Badge>
        </DropdownMenuTrigger>
        <DropdownMenuContent >
          <DropdownMenuLabel>
            <div className="flex items-center space-x-2">
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
            <div className="flex flex-col gap-1 overflow-y-auto h-72 w-52 ">
              {notifications.length > 0 ? (
                notifications.map((n, index) => (
                  <Alert key={index} className="max-w-full p-1">
                    <AlertTitle className="text-sm">
                      {n.name} <br /> obtuvo {n.clicks} clicks
                    </AlertTitle>
                  </Alert>
                ))
              ) : (
                <Alert className="max-w-full p-1">
                  <AlertTitle className="text-sm">
                    No Hay Notificaciones
                  </AlertTitle>
                </Alert>
              )}
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}

export default Bell;
