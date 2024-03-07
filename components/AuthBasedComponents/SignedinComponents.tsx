"use client";

import { api } from "@/convex/_generated/api";
import { SignedIn, useOrganization, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { FileGrid } from "../SignedIn/FileGrid";
import { FileUploader } from "../SignedIn/FileUploader";
import { EmptyLanding } from "../SignedIn/NoFiles";
import { SearchBar } from "../SignedIn/SearchBar";

export const SignedInComponents = () => {
  const { isLoaded: orgLoaded, organization } = useOrganization();
  const { user, isLoaded: userLoaded } = useUser();
  console.log(user);

  let orgId: string | undefined = undefined;
  if (orgLoaded && userLoaded) {
    orgId = organization?.id ?? user?.id;
  }
  const [query, setQuery] = useState("");
  const createFiles = useMutation(api.files.createFile);
  const fetchFiles = useQuery(
    api.files.getFiles,
    orgId ? { orgId, query } : "skip"
  );
  return (
    <SignedIn>
      {fetchFiles === undefined && (
        <div className="flex flex-col items-center gap-8 w-full mt-24">
          <Loader2 className="animate-spin h-16 w-16" />
        </div>
      )}
      {fetchFiles && (
        <>
          <div className="flex justify-between ">
            {/* <h1> Your files</h1> */}
            {/* <Button
             onClick={() => {
               if (!orgId) return;
               createFiles({ name: "hello", orgId });
             }}
           >
             {" "}
             hello world{" "}
           </Button> */}
            <SearchBar query={query} setQuery={setQuery} />
            <FileUploader />
          </div>
        </>
      )}
      {fetchFiles && !query && fetchFiles.length === 0 && <EmptyLanding />}
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {fetchFiles?.map((e) => {
          return <FileGrid file={e} key={e._id} />;
        })}
      </div>
    </SignedIn>
  );
};
