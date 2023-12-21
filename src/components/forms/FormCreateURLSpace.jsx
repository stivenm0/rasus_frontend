import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
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
  


function FormCreateURLSpace() {

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
    
      function onSubmit(data,e) {
        toast({
            title: "Espacio Creado",
            description: "Espacio se creo con éxito"
        })
          console.log(data)
      }
    

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">
            Acortar URL
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Acorta URL</SheetTitle>
          <SheetDescription>
            Acorta y Guarda URL
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit) }  className="space-y-8 text-white">
                <FormField
                  control={form.control}
                  name="space_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Escoge el Espacio a Donde Guardar </FormLabel>
                      <FormControl>
                      <select className="block w-full font-medium transition duration-75 bg-gray-800 border border-gray-800 rounded-lg shadow-sm text-md h-9 focus:border-blue-600 focus:ring-1 focus:ring-inset focus:ring-blue-600" {...field}>
                      <option value="1">Favoritos</option>
                      <option value="2">Last month</option>
                      <option value="3">Last year</option>
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
                      <FormLabel>URL </FormLabel>
                      <FormControl>
                        <Input placeholder="Ingrese la descripción" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Acortar URL</Button>
              </form>
            </Form>

        {/* <div className="grid gap-4 py-4 text-white">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div> */}

        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  )
}

export default FormCreateURLSpace