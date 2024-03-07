"use client";

import { Doc } from "@/convex/_generated/dataModel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  ChevronDown,
  DeleteIcon,
  Download,
  FileTextIcon,
  FolderArchive,
  GanttChartIcon,
  ImageIcon,
  TrashIcon,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { ReactNode, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useToast } from "../ui/use-toast";
import { GenericId } from "convex/values";
import Image from "next/image";
import { Protect } from "@clerk/nextjs";

const FileActions = ({ file }: { file: Doc<"files"> }) => {
  const { toast } = useToast();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const deleteFile = useMutation(api.files.deleteFile);
  return (
    <>
      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteFile({ fileId: file._id });
                toast({
                  variant: "default",
                  title: "File Deleted Successfully",
                  //   description: "Friday, February 10, 2023 at 5:57 PM",
                });
              }}
            >
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <ChevronDown />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              setConfirmDelete(true);
            }}
            className="flex gap-1 align-middle"
          >
            {" "}
            <TrashIcon className="w-5 h-5" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

const getFileUrl = (fileId: GenericId<"_storage">) => {
  return `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${fileId}`;
};

export const FileGrid = ({ file }: { file: Doc<"files"> }) => {
  const typeIcons = {
    image: <ImageIcon />,
    pdf: <FileTextIcon />,
    csv: <GanttChartIcon />,
    zip: <FolderArchive />,
  } as Record<Doc<"files">["fileType"], ReactNode>;

  return (
    <Card className="mr-8 mt-8">
      <CardHeader className="relative">
        <CardTitle>{file.name}</CardTitle>
        <div className="absolute right-2 top-2">
          <FileActions file={file} />
        </div>
      </CardHeader>
      <CardContent className="h-[200px] flex justify-center items-center">
        {/* {file.fileType === "image" && (
          <Image
            alt={file.name}
            width="100"
            height="100"
            src={getFileUrl(file.fileId)}
            className="rounded-sm"
          />
        )} */}

        {file.fileType === "csv" && <GanttChartIcon className="w-20 h-20" />}
        {file.fileType === "pdf" && <FileTextIcon className="w-20 h-20" />}
        {file.fileType === "zip" && <FolderArchive className="w-20 h-20" />}
        {file.fileType === "xlsx" && <GanttChartIcon className="w-20 h-20" />}
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            window.open(getFileUrl(file.fileId), "_blank");
          }}
        >
          <Download />
        </Button>
      </CardFooter>
    </Card>
  );
};
