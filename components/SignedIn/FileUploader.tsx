import { cn } from "@/lib/utils";

import React, { Dispatch, SetStateAction, useState } from "react";

import { Button } from "../ui/button";
import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  Drawer,
} from "../ui/drawer";
import { useMediaQuery } from "@/hooks/mediaQuery";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useToast } from "../ui/use-toast";
import { Doc } from "@/convex/_generated/dataModel";

const formSchema = z.object({
  title: z.string().min(2).max(200),
  file: z
    .custom<FileList>((val) => val instanceof FileList, "Required")
    .refine((files) => files.length > 0, "Required"),
});

export const FileUploader = () => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default">Upload File</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] lg:min-w-96">
          <DialogHeader>
            <DialogTitle>Upload your File</DialogTitle>
            <DialogDescription>
              Give your file a name and upload.
            </DialogDescription>
          </DialogHeader>
          <UploadForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Upload File</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Upload your File</DrawerTitle>
          <DrawerDescription>
            Give your file a name and upload.
          </DrawerDescription>
        </DrawerHeader>
        <UploadForm setOpen={setOpen} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

interface UploadFormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const UploadForm: React.FC<UploadFormProps> = ({ setOpen }) => {
  const { toast } = useToast();
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      file: undefined,
    },
  });

  const fileRef = form.register("file");
  const { isLoaded: orgLoaded, organization } = useOrganization();
  const { user, isLoaded: userLoaded } = useUser();
  console.log(user);

  let orgId: string | undefined = undefined;
  if (orgLoaded && userLoaded) {
    orgId = organization?.id ?? user?.id;
  }
  const createFiles = useMutation(api.files.createFile);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!orgId) return;

      console.log(values);
      const postUrl = await generateUploadUrl();
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": values.file[0].type },
        body: values.file[0],
      });
      const { storageId } = await result.json();
      console.log(values.file[0].type);

      const types = {
        "image/png": "image",
        "image/jpeg": "image",
        "application/pdf": "pdf",
        "text/csv": "csv",
        "application/zip": "zip",
      } as Record<string, Doc<"files">["fileType"]>;

      await createFiles({
        name: values.title,
        fileId: storageId,
        orgId,
        fileType: types[values.file[0].type],
      });
      form.reset();
      setOpen(false);
      toast({
        variant: "default",
        title: "File Uploaded",
        //   description: "Friday, February 10, 2023 at 5:57 PM",
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        //   description: "Friday, February 10, 2023 at 5:57 PM",
      });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-3 ">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={() => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input type="file" {...fileRef} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          className="w-full"
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Submit
        </Button>
      </form>
    </Form>
  );
};
