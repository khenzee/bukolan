"use client";

import { FormModalProvider } from "@/components/landingPage/FormModalContext";
import ProjectFormModal from "@/components/landingPage/ProjectFormModal";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";

import dynamic from "next/dynamic";

const NoiseWrapper = dynamic(() => import("@/components/ui/NoiseWrapper"), {
  ssr: false,
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConvexClientProvider>
      <FormModalProvider>
        <NoiseWrapper />
        {children}
        <ProjectFormModal />
      </FormModalProvider>
    </ConvexClientProvider>
  );
}
