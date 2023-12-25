import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createLink, getSpaces } from "../../lib/api";
import * as z from "zod";
import LLoading from "../profile/LLoading";


function FormCreateLinkSpace() {
  const { toast } = useToast();

  const {data, isLoading, isError } = useQuery({
    queryKey: ["spacesCombo"],
    queryFn: getSpaces
  })

  const queryClient = useQueryClient();

  const createLinkMutation = useMutation({
    mutationFn: createLink,
    onSuccess: (data) =>{
      queryClient.invalidateQueries();
      console.log(data)
      form.reset();
      toast({
        title: "Enlace Acortado",
        description: "Enlace Acortado y Guardado con éxito.",
      });
    },
    onError: (er)=> {console.log(er)}
  })

  const formSchema = z.object({
    space_id: z.string().max(50, "Máximo 100 Caracteres")
    .refine((space_id)=> space_id != "0" , "Debe Seleccionar un Espacio"),
    name: z.string().min(1, "Requerido").max(50, "Máximo 100 Caracteres"),
    link: z.string().max(150, "Máximo 150 Caracteres"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      space_id: "",
      name: "",
      link: "",
    },
  });

  const onSubmit = (values)=> {
      createLinkMutation.mutate(values);
      // console.log(values)
      
  }


  if(isLoading){ return <LLoading/> }

  if(data){
    const spaces = data.data.data;
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full">
            Acortar de Enlace
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Acorta URL</SheetTitle>
            <SheetDescription>Acorta y Guarda URL</SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 text-white"
            >
              <FormField
                control={form.control}
                name="space_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Escoge el Espacio a Donde Guardar </FormLabel>
                    <FormControl>                      
                      <select
                        className="block w-full font-medium transition duration-75 bg-gray-800 border border-gray-800 rounded-lg shadow-sm text-md h-9 focus:border-blue-600 focus:ring-1 focus:ring-inset focus:ring-blue-600"
                        {...field}
                      >
                        <option value={0} selected >Seleccione el Espacio</option>
                        {spaces.map((space, index)=>(
                          <option key={index} value={space.id}>{space.name}</option>
                        ))                          
                        }
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del Link </FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese el Nombre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enlace </FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese el enlace" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Acortar URL</Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    );
  } 


  
}

export default FormCreateLinkSpace;
