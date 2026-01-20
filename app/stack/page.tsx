import dynamic from "next/dynamic";
import { Navigation } from "@/components/navigation";
import { TechStackSkeleton } from "@/components/skeletons/tech-stack-skeleton";

const TechStack = dynamic(() => import("@/components/tech-stack").then(m => ({ default: m.TechStack })), {
  loading: () => <TechStackSkeleton />,
})

const FloatingThemeToggle = dynamic(() => import("@/components/theme-toggle").then(m => ({ default: m.FloatingThemeToggle })), {
  loading: () => null,
})

export const metadata = {
  title: "Stack Tecnológico | BLXK Studio",
  description: "Descubre nuestro stack tecnológico y herramientas de vanguardia para soluciones de clase mundial.",
};

export default function StackPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <FloatingThemeToggle />
      <div className="pt-20 md:pt-0">
        <TechStack />
      </div>
    </main>
  );
}
