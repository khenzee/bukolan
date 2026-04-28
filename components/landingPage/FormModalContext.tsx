"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';

type PlanTier = 'lite' | 'scale' | 'grand';

interface FormModalContextType {
  isOpen: boolean;
  activePlan: PlanTier;
  openForm: (plan?: PlanTier) => void;
  closeForm: () => void;
}

const FormModalContext = createContext<FormModalContextType | null>(null);

export function useFormModal() {
  const ctx = useContext(FormModalContext);
  if (!ctx) throw new Error('useFormModal must be used within FormModalProvider');
  return ctx;
}

export function FormModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activePlan, setActivePlan] = useState<PlanTier>('lite');

  const openForm = useCallback((plan: PlanTier = 'lite') => {
    setActivePlan(plan);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeForm = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  }, []);

  return (
    <FormModalContext.Provider value={{ isOpen, activePlan, openForm, closeForm }}>
      {children}
    </FormModalContext.Provider>
  );
}
