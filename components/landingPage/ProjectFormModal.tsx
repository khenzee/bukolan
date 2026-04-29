"use client";

import React, { useState, useEffect } from 'react';
import { X, Loader2, CheckCircle2 } from 'lucide-react';
import { useFormModal } from './FormModalContext';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useLenis } from 'lenis/react';

type PlanTier = 'lite' | 'scale' | 'grand';

/* ─── Form field definitions per plan ─── */

interface OptionGroup {
  label: string;
  name: string;
  options: string[];
  type: 'multi' | 'single'; 
}

interface FormSection {
  title: string;
  groups: OptionGroup[];
}

interface PlanConfig {
  heading: string;
  subtitle: string;
  priceLabel: string;
  price: string;
  personalFields: { label: string; name: string; placeholder: string; type: string }[];
  sections: FormSection[];
  textareaLabel: string;
  textareaPlaceholder: string;
  submitLabel: string;
  notice?: string;
  nextTier?: { label: string; tier: PlanTier };
}

const PLANS: Record<PlanTier, PlanConfig> = {
  lite: {
    heading: "Lite",
    subtitle: "Fast one-page launch to validate your idea.",
    priceLabel: "",
    price: "$200 / Project",
    personalFields: [
      { label: "Your Name", name: "name", placeholder: "SARAH DOE", type: "text" },
      { label: "Your Email", name: "email", placeholder: "SARAH@COMPANY.COM", type: "email" },
      { label: "Phone Number", name: "phone", placeholder: "+234 ...", type: "tel" },
      { label: "Project / Business Name", name: "project", placeholder: "MY PROJECT", type: "text" },
    ],
    sections: [
      {
        title: "Qualification",
        groups: [
          {
            label: "What are you launching?",
            name: "launching",
            type: "single",
            options: ["Startup waitlist", "Service business", "Restaurant / menu", "Personal brand", "Product landing", "Other"],
          },
          {
            label: "What should the page do?",
            name: "pageGoal",
            type: "multi",
            options: ["Collect leads", "Booking requests", "Showcase services", "Collect signups", "Share information", "Other"],
          },
        ],
      },
      {
        title: "Branding & Assets",
        groups: [
          {
            label: "Do you have branding?",
            name: "branding",
            type: "single",
            options: ["Logo + colors", "Logo only", "No branding yet"],
          },
          {
            label: "Content readiness",
            name: "contentReady",
            type: "single",
            options: ["Ready", "Partially ready", "Need help"],
          },
        ],
      },
      {
        title: "Delivery Timeline",
        groups: [
          {
            label: "When do you want it live?",
            name: "timeline",
            type: "single",
            options: ["3–5 days", "1 week", "2 weeks", "Flexible"],
          },
        ],
      },
    ],
    textareaLabel: "Additional notes",
    textareaPlaceholder: "ANY EXTRA DETAILS WE SHOULD KNOW?",
    submitLabel: "Submit Lite Request",
    notice: "No CMS, no features, no complexity — because Lite is fast.",
    nextTier: { label: "Scale Form", tier: "scale" },
  },

  scale: {
    heading: "Scale",
    subtitle: "Multi-page website built for growth.",
    priceLabel: "Starting at",
    price: "$500 / project",
    personalFields: [
      { label: "Your Name", name: "name", placeholder: "SARAH DOE", type: "text" },
      { label: "Your Email", name: "email", placeholder: "SARAH@COMPANY.COM", type: "email" },
      { label: "Phone Number", name: "phone", placeholder: "+234 ...", type: "tel" },
      { label: "Company Name", name: "project", placeholder: "ACME INC", type: "text" },
    ],
    sections: [
      {
        title: "Project Scope",
        groups: [
          {
            label: "Project type",
            name: "projectType",
            type: "multi",
            options: ["Company website", "Service website", "Portfolio", "Organization", "Marketing site", "Other"],
          },
          {
            label: "Number of pages",
            name: "pageCount",
            type: "single",
            options: ["3–5", "5–8", "8+", "Not sure"],
          },
        ],
      },
      {
        title: "Features & Planning",
        groups: [
          {
            label: "Features needed",
            name: "features",
            type: "multi",
            options: ["CMS / blog", "Booking form", "Pricing page", "Testimonials", "Animations", "Dashboard", "Multiple forms", "Other"],
          },
          {
            label: "Content status",
            name: "contentStatus",
            type: "single",
            options: ["Ready", "In progress", "Need help"],
          },
        ],
      },
      {
        title: "Timeline & Budget",
        groups: [
          {
            label: "Timeline",
            name: "timeline",
            type: "single",
            options: ["1–2 weeks", "2–3 weeks", "1 month", "Flexible"],
          },
          {
            label: "Budget range",
            name: "budget",
            type: "single",
            options: ["$500–$800", "$800–$1,200", "$1,200+"],
          },
        ],
      },
    ],
    textareaLabel: "Additional notes",
    textareaPlaceholder: "TELL US MORE ABOUT YOUR PROJECT...",
    submitLabel: "Submit Scale Request",
  },

  grand: {
    heading: "Grand",
    subtitle: "Custom MVP or web application.",
    priceLabel: "Starting at",
    price: "$800 / project",
    personalFields: [
      { label: "Your Name", name: "name", placeholder: "SARAH DOE", type: "text" },
      { label: "Your Email", name: "email", placeholder: "SARAH@COMPANY.COM", type: "email" },
      { label: "Phone Number", name: "phone", placeholder: "+234 ...", type: "tel" },
      { label: "Startup / Product Name", name: "project", placeholder: "MY STARTUP", type: "text" },
    ],
    sections: [
      {
        title: "Product Discovery",
        groups: [
          {
            label: "What are you building?",
            name: "building",
            type: "multi",
            options: ["SaaS product", "Marketplace", "Startup MVP", "Internal tool", "Custom platform", "Other"],
          },
          {
            label: "Core functionality",
            name: "coreFunc",
            type: "multi",
            options: ["User accounts", "Dashboard", "Admin panel", "Payments", "Booking system", "API integration", "Other"],
          },
        ],
      },
      {
        title: "Audience & Stage",
        groups: [
          {
            label: "Users",
            name: "users",
            type: "single",
            options: ["Single user type", "Admin + users", "Multiple roles"],
          },
          {
            label: "Project stage",
            name: "stage",
            type: "single",
            options: ["Idea only", "Wireframes ready", "Design ready", "MVP needed"],
          },
        ],
      },
      {
        title: "Timeline & Budget",
        groups: [
          {
            label: "Timeline",
            name: "timeline",
            type: "single",
            options: ["2–3 weeks MVP", "1 month", "2+ months", "Flexible"],
          },
          {
            label: "Budget",
            name: "budget",
            type: "single",
            options: ["$800–$1,500", "$1,500–$3,000", "$3,000+"],
          },
        ],
      },
    ],
    textareaLabel: "Describe your idea",
    textareaPlaceholder: "WHAT PROBLEM DOES YOUR PRODUCT SOLVE?",
    submitLabel: "Submit Grand Request",
  },
};

/* ─── Component ─── */

const ProjectFormModal = () => {
  const { isOpen, activePlan, openForm, closeForm } = useFormModal();
  const submitInquiry = useMutation(api.submissions.submitForm);
  const lenis = useLenis();

  // Stop Lenis when modal is open
  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
    return () => {
      lenis?.start();
    };
  }, [isOpen, lenis]);

  // Form State
  const [personalInfo, setPersonalInfo] = useState<Record<string, string>>({});
  const [multiSelections, setMultiSelections] = useState<Record<string, string[]>>({});
  const [singleSelections, setSingleSelections] = useState<Record<string, string>>({});
  const [contactPreference, setContactPreference] = useState("email");
  const [notes, setNotes] = useState("");
  const [hp, setHp] = useState(""); // Honeypot field

  // UI State
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const config = PLANS[activePlan];

  const handleTabChange = (tab: PlanTier) => {
    openForm(tab);
  };

  const toggleMulti = (groupName: string, option: string) => {
    setMultiSelections((prev) => {
      const current = prev[groupName] || [];
      return {
        ...prev,
        [groupName]: current.includes(option)
          ? current.filter((o) => o !== option)
          : [...current, option],
      };
    });
  };

  const selectSingle = (groupName: string, option: string) => {
    setSingleSelections((prev) => ({ ...prev, [groupName]: option }));
  };

  const handlePersonalChange = (name: string, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Honeypot check
    if (hp !== "") {
      console.warn("Bot detected.");
      return;
    }

    // 2. Email validation
    if (!validateEmail(personalInfo.email)) {
      setStatus('error');
      return;
    }

    setStatus('submitting');

    // Transform selections into the structured array format
    const selectionsArray: { question: string; answer: string | string[] }[] = [];
    
    config.sections.forEach(section => {
      section.groups.forEach(group => {
        if (group.type === 'multi') {
          const answers = multiSelections[group.name] || [];
          if (answers.length > 0) {
            selectionsArray.push({
              question: group.label,
              answer: answers
            });
          }
        } else {
          const answer = singleSelections[group.name];
          if (answer) {
            selectionsArray.push({
              question: group.label,
              answer: answer
            });
          }
        }
      });
    });

    try {
      await submitInquiry({
        plan: activePlan,
        name: personalInfo.name || "Anonymous",
        email: personalInfo.email || "no-email@provided.com",
        phone: personalInfo.phone || "N/A",
        contactPreference,
        projectName: personalInfo.project || "Unnamed Project",
        selections: selectionsArray,
        additionalNotes: notes,
      });
      setStatus('success');
      setTimeout(() => {
        closeForm();
        setStatus('idle');
        // Reset state
        setPersonalInfo({});
        setMultiSelections({});
        setSingleSelections({});
        setContactPreference("email");
        setNotes("");
      }, 2000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm animate-fadeIn"
        onClick={closeForm}
      />

      {/* Modal Panel */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
        <div className="relative w-full max-w-3xl max-h-[85vh] bg-background border border-foreground/15 shadow-2xl flex flex-col pointer-events-auto animate-slideUp overflow-hidden">

          {/* ── Sticky Header ── */}
          <div className="shrink-0 border-b border-foreground/10 px-6 sm:px-8 pt-6 pb-5">
            {/* Close + Title */}
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight">
                  Start Your <span className="text-foreground/40">{config.heading}</span> Project
                </h2>
                <p className="text-xs text-foreground/50 uppercase tracking-widest mt-1.5 font-medium">
                  {config.subtitle}
                </p>
              </div>
              <button
                onClick={closeForm}
                className="shrink-0 ml-4 p-2 rounded-full border border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-300"
                aria-label="Close form"
              >
                <X size={16} />
              </button>
            </div>

            {/* Tab Switcher + Price */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex items-center gap-1 border border-foreground/20 p-1 rounded-full">
                {(['lite', 'scale', 'grand'] as PlanTier[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`px-4 py-1.5 rounded-full uppercase tracking-widest text-[10px] font-bold transition-all duration-300 ${
                      activePlan === tab
                        ? 'bg-foreground text-background'
                        : 'text-foreground hover:bg-foreground/5'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <span className="text-sm font-medium tracking-tight text-foreground/70">
                {config.priceLabel && (
                  <span className="text-foreground/40 mr-1">{config.priceLabel}</span>
                )}
                {config.price}
              </span>
            </div>
          </div>

          {/* ── Scrollable Body ── */}
          <div 
            className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 relative"
            data-lenis-prevent
          >
            
            {/* Success Overlay */}
            {status === 'success' && (
              <div className="absolute inset-0 bg-background/90 z-10 flex flex-col items-center justify-center animate-fadeIn">
                <CheckCircle2 size={48} className="text-foreground mb-4 animate-bounce" />
                <h3 className="text-xl font-bold uppercase tracking-widest">Inquiry Received</h3>
                <p className="text-xs text-foreground/50 uppercase tracking-widest mt-2 px-6 text-center leading-relaxed">
                  We{"'"}ll review your details and reach out via your preferred contact method within 24 hours.
                </p>
              </div>
            )}

            <form className="space-y-10" onSubmit={handleSubmit}>

              {/* Honeypot field - visually hidden */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="user_nickname"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Personal Information */}
              <section>
                <h3 className="text-xs uppercase tracking-widest font-bold text-foreground/40 mb-5 pb-3 border-b border-foreground/10">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {config.personalFields.map((field) => (
                    <div key={field.name} className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-foreground/50">
                        {field.label}
                      </label>
                      <input
                        required
                        type={field.type}
                        value={personalInfo[field.name] || ''}
                        onChange={(e) => handlePersonalChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full bg-transparent border border-foreground/20 px-3 py-2.5 outline-none focus:border-foreground transition-colors uppercase text-xs"
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* Communication Preference */}
              <section>
                <h3 className="text-xs uppercase tracking-widest font-bold text-foreground/40 mb-5 pb-3 border-b border-foreground/10">
                  Communication
                </h3>
                <div className="space-y-3">
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-foreground/60 mb-3">
                    How would you like us to contact you?
                  </h4>
                  <div className="flex flex-wrap gap-6">
                    {["email", "whatsapp", "call"].map((method) => (
                      <label
                        key={method}
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={() => setContactPreference(method)}
                      >
                        <div
                          className={`shrink-0 flex items-center justify-center border rounded-full transition-colors w-4 h-4 ${
                            contactPreference === method
                              ? 'bg-foreground border-foreground'
                              : 'border-foreground/30 group-hover:border-foreground/60'
                          }`}
                        >
                          {contactPreference === method && (
                            <div className="bg-background w-1.5 h-1.5 rounded-full" />
                          )}
                        </div>
                        <span
                          className={`text-xs uppercase tracking-wider transition-colors ${
                            contactPreference === method
                              ? 'text-foreground font-medium'
                              : 'text-foreground/60 group-hover:text-foreground'
                          }`}
                        >
                          {method}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </section>

              {/* Dynamic Sections */}
              {config.sections.map((section, sIdx) => (
                <section key={sIdx}>
                  <h3 className="text-xs uppercase tracking-widest font-bold text-foreground/40 mb-5 pb-3 border-b border-foreground/10">
                    {section.title}
                  </h3>
                  <div className={`grid gap-8 ${
                    section.groups.length > 1 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'
                  }`}>
                    {section.groups.map((group, gIdx) => (
                      <div key={gIdx} className="space-y-3">
                        <h4 className="text-[10px] uppercase tracking-widest font-bold text-foreground/60 mb-3">
                          {group.label}
                        </h4>
                        <div className="space-y-2">
                          {group.options.map((option, oIdx) => {
                            const isMulti = group.type === 'multi';
                            const isChecked = isMulti
                              ? (multiSelections[group.name] || []).includes(option)
                              : singleSelections[group.name] === option;

                            return (
                              <label
                                key={oIdx}
                                className="flex items-center gap-3 cursor-pointer group"
                                onClick={() =>
                                  isMulti
                                    ? toggleMulti(group.name, option)
                                    : selectSingle(group.name, option)
                                }
                              >
                                <div
                                  className={`shrink-0 flex items-center justify-center border transition-colors ${
                                    isMulti ? 'w-4 h-4' : 'w-4 h-4 rounded-full'
                                  } ${
                                    isChecked
                                      ? 'bg-foreground border-foreground'
                                      : 'border-foreground/30 group-hover:border-foreground/60'
                                  }`}
                                >
                                  {isChecked && (
                                    <div
                                      className={`bg-background ${
                                        isMulti ? 'w-1.5 h-1.5' : 'w-1.5 h-1.5 rounded-full'
                                      }`}
                                    />
                                  )}
                                </div>
                                <span
                                  className={`text-xs uppercase tracking-wider transition-colors ${
                                    isChecked
                                      ? 'text-foreground font-medium'
                                      : 'text-foreground/60 group-hover:text-foreground'
                                  }`}
                                >
                                  {option}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}

              {/* Additional Information */}
              <section>
                <h3 className="text-xs uppercase tracking-widest font-bold text-foreground/40 mb-5 pb-3 border-b border-foreground/10">
                  Additional Information
                </h3>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-foreground/50">
                    {config.textareaLabel}
                  </label>
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={config.textareaPlaceholder}
                    className="w-full bg-transparent border border-foreground/20 px-3 py-2.5 outline-none focus:border-foreground transition-colors uppercase text-xs resize-none"
                  />
                </div>
              </section>

              {/* Submit & Notice */}
              <div className="pt-4 border-t border-foreground/10">
                <div className="flex items-center gap-3 mb-4">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="flex-1 py-4 border border-foreground text-foreground hover:bg-foreground hover:text-background uppercase tracking-widest text-xs font-bold transition-all duration-500 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      config.submitLabel
                    )}
                  </button>
                  {config.nextTier && status === 'idle' && (
                    <button
                      type="button"
                      onClick={() => handleTabChange(config.nextTier!.tier)}
                      className="py-4 px-6 border border-foreground/20 text-foreground/50 hover:border-foreground hover:text-foreground uppercase tracking-widest text-xs font-bold transition-all duration-300"
                    >
                      {config.nextTier.label}
                    </button>
                  )}
                </div>
                {status === 'error' && (
                  <p className="text-[10px] text-red-500 uppercase tracking-widest text-center font-bold mb-4">
                    Something went wrong. Please try again.
                  </p>
                )}
                {config.notice && (
                  <p className="text-[10px] text-foreground/40 uppercase tracking-widest text-center font-medium">
                    {config.notice}
                  </p>
                )}
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectFormModal;
