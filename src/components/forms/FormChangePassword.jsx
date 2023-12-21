import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  
  import { Input } from "@/components/ui/input";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { useForm } from "react-hook-form";
  import * as z from "zod";
  
  
  function FormUpdatePassword() {

  
    const formSchema = z.object({
      current_password: z.string().min(1, "Requerido").max(20, "Máximo 20 Caracteres"),
      new_password: z.string().min(1, "Requerido").max(20, "Máximo 20 Caracteres"),

    });
  
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        current_password: "",
        new_password: "",
      },
    });
  
    function onSubmit() {
        console.log('hecho')
    }
  
    return (
      <Dialog>
        <DialogTrigger className="bg-blue-700 text-white hover:bg-blue-800 border  px-3 py-1.5 rounded-lg text-sm font-semibold">
         Cambiar Contraseña
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="text-left text-gray-50">
            <DialogTitle className="text-center">Cambiar Contraseña</DialogTitle>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit) }  className="space-y-2">
                <FormField
                  control={form.control}
                  name="current_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña Actual</FormLabel>
                      <FormControl>
                        <Input  placeholder="Ingrese la Contraseña Actual" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="new_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña Nueva</FormLabel>
                      <FormControl>
                        <Input  placeholder="Ingrese la Contraseña Nueva" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Actualizar Contraseña</Button>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }
  
  export default FormUpdatePassword;
  