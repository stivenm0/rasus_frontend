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
import { useMutation} from "@tanstack/react-query";
import {  login } from "../../lib/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {

    const [error, setError] = useState(false);
    const N = useNavigate();

    const loginMutation = useMutation({
      mutationFn: login, 
      onSuccess: ({data: {data: {token}}})=>{
        localStorage.setItem("token", token)
        N('/perfil') 
      },
      onError: ()=> setError(true)
    })
    
    const formSchema = z.object({
        email: z.string().min(1, "Email es Requerido").max(50, "Máximo 50 Caracteres").email("Email Invalido"),
        password: z.string().min(1, "Contraseña Requerida").max(50, "Máximo 50 Caracteres"),
    });
  
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    });
  
    const onSubmit = (credentials) => loginMutation.mutate(credentials);
  
  return (
    <Dialog>
      <DialogTrigger className="self-start px-3 py-2 leading-none text-gray-200 border border-gray-800 rounded-lg focus:outline-none focus:shadow-outline bg-gradient-to-b hover:from-indigo-500 from-gray-900 to-black">
        Ingresar
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-left text-gray-50">
          <DialogTitle className="text-center">Inicia Sesión</DialogTitle>
            {error && 
            <p className="font-semibold text-center text-white bg-red-500">Credenciales Incorrectas </p>
            }
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese su Correo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Ingrese su Contraseña" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Ingresar</Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default Login;
