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


function FormUpdateProfile() {


  const MAX_FILE_SIZE = 5000000000000;
  const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];


  const formSchema = z.object({
    photo: z.any()
    .refine((file) => true, `Max image size 5MB.`)
    .refine(
      (file) => true,
      "Only .jpg, .jpeg, .png and .webp formats are supported."
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
    defaultValues: {
      photo: null,
      name: "",
      nickname: "",
      email: "",
    },
  });

  function onSubmit(data, e) {
    console.log(data)
    console.log(e.target.photo.files)
  }

  return (
    <Dialog>
      <DialogTrigger className="bg-gray-200 hover:bg-gray-300 border  px-3 py-1.5 rounded-lg text-sm font-semibold">
        Editar Perfil
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-left text-gray-50">
          <DialogTitle className="text-center">Editar Perfil</DialogTitle>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit) }  className="space-y-4">
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Foto de Perfil</FormLabel>
                    <FormControl>
                      <Input 
                        type="file" 
                        className="block w-full mt-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-purple-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-purple-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                        {...field}
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
