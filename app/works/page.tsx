import WorksList from "@/components/works/WorksList";

export const metadata = {
  title: "Works | Bukola",
  description: "Creating next-level digital products.",
};

const Works = () => {
  return (
    <main className="min-h-screen bg-white pt-32 lg:pt-48 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 lg:mb-24">
        <h1 className="text-foreground">
          Creating next level <br className="hidden md:block" />
          digital products
        </h1>
      </div>
      
      <WorksList />
    </main>
  );
};

export default Works;