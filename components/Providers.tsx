"use client";

import { FormModalProvider } from "@/components/landingPage/FormModalContext";
import ProjectFormModal from "@/components/landingPage/ProjectFormModal";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConvexClientProvider>
      <FormModalProvider>
        {children}
        <ProjectFormModal />
      </FormModalProvider>
    </ConvexClientProvider>
  );
}
