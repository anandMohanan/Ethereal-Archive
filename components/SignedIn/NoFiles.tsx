import React from "react";
import { FileUploader } from "./FileUploader";

export function EmptyLanding() {
  return (
    <div className="p-10">
      <p className="text-3xl  lg:text-4xl  text-center font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        You currently have no files uploaded.
      </p>
    </div>
  );
}
