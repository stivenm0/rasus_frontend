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
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../../lib/api";
import { useNavigate } from "react-router-dom";
  
  
function FormDeleteProfile() {

    const N = useNavigate();

    const deleteUserMutations = useMutation({
      mutationFn: deleteUser,
      onSuccess: ()=>{
       localStorage.clear();
       N("/");
      }
    })
  
    const formSchema = z.object({
      confirmation: z.string().min(1, "Requerido")
      .refine((value) => value.toUpperCase().trim() === "BORRAR", `El valor no coincide con la palabra BORRAR`),
    });
  
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        confirmation: "",
      },
    });
  
    function onSubmit() {
        deleteUserMutations.mutate()
    }
  
    return (
      <Dialog>
        <DialogTrigger className="bg-red-700 text-white hover:bg-red-800  px-3 py-1.5 rounded-lg text-sm font-semibold">
         Borrar Cuenta
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="text-left text-gray-50">
            <DialogTitle className="text-center">Borrar Mi Cuenta</DialogTitle>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit) }  className="space-y-8">
                <FormField
                  control={form.control}
                  name="confirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Escriba la Palabra **BORRAR** para Borrar su Cuenta de Forma Permanente </FormLabel>
                      <FormControl>
                        <Input className="uppercase" placeholder="BORRAR" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Eliminar Cuenta</Button>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }
  
  export default FormDeleteProfile;
  