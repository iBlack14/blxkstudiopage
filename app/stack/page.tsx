import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Navigation } from "@/components/layout/navigation";
import { TechStackSkeleton } from "@/components/skeletons/tech-stack-skeleton";
import { buildPageMetadata } from "@/lib/seo";

const TechStack = dynamic(() => import("@/components/utilities/tech-stack").then(m => ({ default: m.TechStack })), {
  loading: () => <TechStackSkeleton />,
})

const FloatingThemeToggle = dynamic(() => import("@/components/layout/theme-toggle").then(m => ({ default: m.FloatingThemeToggle })), {
  loading: () => null,
})

export const metadata: Metadata = buildPageMetadata({
  title: "Stack Tecnológico | BLXK Studio",
  description: "Tecnologías que usa BLXK Studio: Next.js, React, Node.js, IA, automatización y herramientas modernas para productos escalables.",
  path: "/stack",
  keywords: [
    "stack tecnológico",
    "next.js react node.js",
    "herramientas ia",
    "tecnologías blxk studio",
  ],
});

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
