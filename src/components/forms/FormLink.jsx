import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
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
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLink, updateLink } from "../../lib/api";
import { useEffect} from "react";


function FormLink({ isEditing, open, setOpen, space_id, link }) {


  console.log(link)
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createLinkMutation = useMutation({
    mutationFn: createLink,
    onSuccess: ()=>{ 
      queryClient.invalidateQueries("space");
      toast({
        title: "Enlace Acortado",
        description: "Enlace se Acorto con éxito",
      });
      form.reset()
      form.setValue("space_id", space_id)
    },
    onError: (e) => console.log(e)
  })

  const updateLinkMutation = useMutation({
    mutationFn: updateLink,
    onSuccess: ()=>{ 
      queryClient.invalidateQueries("space");
      toast({
        title: "Enlace Editado",
        description: "Enlace se edito con éxito.",
      });
    }
  })

  const formSchema = z.object({
    space_id: z.any(),
    name: z.string().min(1, "Requerido").max(50, "Máximo 100 Caracteres"),
    link: z.string().min(1, "Requerido").url("Debe ser un enlace"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      space_id: "",
      name: "",
      link: "",
    },
  });

  useEffect(() => {
    form.setValue("space_id", space_id)
    console.log(space_id)

    if(isEditing && link){
      form.setValue("name", link.name)
      form.setValue("link", link.link)
    }
    else{
      form.setValue("name", "")
      form.setValue("link", "")
    }
  }, [isEditing, link, form])
  

  const onSubmit = (values) => {
    if(isEditing){
      updateLinkMutation.mutate({...values, id: link.id});
    }else{
      createLinkMutation.mutate(values);
    }
  };

  return (
    <Sheet open={open} onOpenChange={() => setOpen(!open)}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{isEditing ? "Editar Link" : "Acortar Link"}</SheetTitle>
          <SheetDescription>
            {isEditing ? "" : "Acorta y Guarda Link"}
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 text-white"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre </FormLabel>
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
                  <FormLabel>enlace</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese el enlace" {...field}  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{isEditing ? "Editar" : "Guardar"}</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

export default FormLink;
