import { SignedInComponents } from "@/components/AuthBasedComponents/SignedinComponents";
import { SignedOutComponents } from "@/components/AuthBasedComponents/SignedoutComponents";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ethereal Archive",
  description: "Upload and Manage files easily",
};

export default function Home() {
  return (
    <main className="container mx-auto pt-12">
      <SignedInComponents />
      <SignedOutComponents />
    </main>
  );
}
