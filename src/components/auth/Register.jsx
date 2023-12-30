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
import { createUser } from "../../lib/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  const N = useNavigate();

  const [errors, setErrors] = useState(null);

  const registerMutation = useMutation({
    mutationFn: createUser,
    onSuccess: ({data: {data: { token }}}) => {
      localStorage.setItem("token", token);
      N("/perfil");
    },
    onError: (res) => {
      setErrors([...res.response.data.errors.email])
      setTimeout(()=> setErrors(null), "5000")
    },
  });

  const formSchema = z.object({
    name: z.string().min(10, "Mínimo 10 Caracteres"),
    email: z
      .string()
      .min(1, "Email es Requerido")
      .max(50, "Máximo 50 Caracteres")
      .email("Email Invalido"),
    password: z
      .string()
      .min(8, "Mínimo 8 Caracteres")
      .max(50, "Máximo 50 Caracteres"),
    password_confirmation: z
      .string()
      .min(1, "Requerido")
      .refine((data) => {
        return data === form.getValues().password;
      }, "Las Contraseñas no Coinciden"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = (values) => registerMutation.mutate(values);

  return (
    <Dialog>
      <DialogTrigger className="self-start px-3 py-2 leading-none text-gray-200 border border-gray-800 rounded-lg focus:outline-none focus:shadow-outline bg-gradient-to-b hover:from-indigo-500 from-gray-900 to-black">
        Regístrate
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-left text-gray-50">
          <DialogTitle className="text-center">únete a Rasus</DialogTitle>
          {errors && <span className="p-1 text-sm text-center text-white bg-red-500" >{errors}</span>}
           
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input 
                      placeholder="Ingrese su nombre" 
                      autoComplete="username"
                      {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                      placeholder="Ingrese su correo"
                      autoComplete="username"
                      {...field} />
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
                      <Input
                        type="password"
                        placeholder="Ingrese una contraseña"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmación de Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirme la contraseña"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Unirme</Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default Register;
