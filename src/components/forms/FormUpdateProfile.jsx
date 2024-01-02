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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../lib/api";
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react";


function FormUpdateProfile({user}) {

  const queryClient = useQueryClient();
  const {toast } = useToast();

  const [error, setError] = useState(null)

  const userUpdateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: ()=>{ 
      queryClient.invalidateQueries("user");
      toast({
        title: "Actualización Correcta",
        description: "Tus datos se actualizaron correctamente"
      });
    },
    onError: (e)=> setError(e.response.data.errors.email)
  })

  const MAX_FILE_SIZE = 100000;
  const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];


  const formSchema = z.object({
    photo: z.any()
    .refine((photo) => photo? photo?.size <= MAX_FILE_SIZE: true, `La imagen no debe ser mayor a 10MB.`)
    .refine(
      (photo) => photo? ACCEPTED_IMAGE_TYPES.includes(photo.type): true,
      "Solo se permite .jpg, .jpeg, .png and .webp"
    ),
    name: z.string().min(10, "Mínimo 10 Caracteres"),
    nickname: z
      .string()
      .min(1, "Nombre de Usuario es Requerido")
      .max(50, "Máximo 50 Caracteres"),
    email: z
      .string()
      .min(1, "Email es Requerido")
      .max(50, "Máximo 50 Caracteres")
      .email("Email Invalido"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {...user, photo: null},
  });

  const onSubmit = (values)=> {
    const form = new FormData()
    form.append("name", values.name);
    form.append("nickname", values.nickname);
    form.append("email", values.email);
    if(values.photo){
      form.append("photo", values.photo);
    }
    userUpdateMutation.mutate(form)
  };
  

  return (
    <Dialog>
      <DialogTrigger className="bg-gray-200 hover:bg-gray-300 border  px-3 py-1.5 rounded-lg text-sm font-semibold">
        Editar Perfil
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-left text-gray-50">
          <DialogTitle className="text-center">Editar Perfil</DialogTitle>
          {error && <p className="text-center text-orange-300 bg-gray-800">{error}</p>}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit) }  className="space-y-4">
              <FormField
                control={form.control}
                name="photo"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Foto de Perfil</FormLabel>
                    <FormControl>
                      <Input 
                        type="file" 
                        className="block w-full mt-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-purple-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-purple-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                        {...field} {...field}
                        value={value?.fileName}
                        onChange={(event) => {
                          onChange(event.target.files[0]);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <hr />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese su nombre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de Usuario</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingrese su nombre de usuario"
                        {...field}
                      />
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
                      <Input placeholder="Ingrese su correo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Actualizar</Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default FormUpdateProfile;
