import { ImageGenerationForm } from "@/components/ui/image-generator-form";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center mt-10">
      <ImageGenerationForm />
    </main>
  );
}
