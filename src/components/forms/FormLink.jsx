import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
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
  import * as z from "zod";
  import { useToast } from "@/components/ui/use-toast"
  


function FormLink({isEditing, open, setOpen }) {

    const { toast } = useToast()
     
    const formSchema = z.object({
        space_id: z.string().max(50, "Máximo 100 Caracteres"),
        name: z.string().min(1, "Requerido").max(50, "Máximo 100 Caracteres"),
        url: z.string().max(150, "Máximo 150 Caracteres"),
  
      });
    
      const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          space_id: "",
          name: "",
          url: "",
        },
      });
    
      function onSubmit(data) {
        toast({
            title: "Espacio Creado",
            description: "Espacio se creo con éxito"
        })
          console.log(data)
      }
    

  return (
    <Sheet open={open} onOpenChange={()=> setOpen(!open)} >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{isEditing? "Editar Link": "Acortar Link"}</SheetTitle>
          <SheetDescription>
            {isEditing? "" : "Acorta y Guarda Link"}
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit) }  className="space-y-8 text-white">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre del espacio </FormLabel>
                      <FormControl>
                        <Input placeholder="Ingrese el Nombre" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingrese la descripción" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">{isEditing? "Editar": "Guardar"}</Button>
              </form>
            </Form>
      </SheetContent>
    </Sheet>
  )
}

export default FormLink