import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Navigation } from "@/components/layout/navigation";
import { ContactSkeleton } from "@/components/skeletons/contact-skeleton";
import { buildPageMetadata } from "@/lib/seo";

const Contact = dynamic(() => import("@/components/contact").then(m => ({ default: m.Contact })), {
  loading: () => <ContactSkeleton />,
})

const FloatingThemeToggle = dynamic(() => import("@/components/layout/theme-toggle").then(m => ({ default: m.FloatingThemeToggle })), {
  loading: () => null,
})

export const metadata: Metadata = buildPageMetadata({
  title: "Contacto | BLXK Studio",
  description: "Habla con BLXK Studio y cotiza tu proyecto de desarrollo web, automatización o inteligencia artificial.",
  path: "/contacto",
  keywords: [
    "contacto blxk studio",
    "cotizar desarrollo web",
    "consultoría automatización",
    "agencia ia",
  ],
});

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <FloatingThemeToggle />
      <div className="pt-20 md:pt-0">
        <Contact />
      </div>
    </main>
  );
}
