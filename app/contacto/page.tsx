import dynamic from "next/dynamic";
import { Navigation } from "@/components/layout/navigation";
import { ContactSkeleton } from "@/components/skeletons/contact-skeleton";

const Contact = dynamic(() => import("@/components/contact").then(m => ({ default: m.Contact })), {
  loading: () => <ContactSkeleton />,
})

const FloatingThemeToggle = dynamic(() => import("@/components/layout/theme-toggle").then(m => ({ default: m.FloatingThemeToggle })), {
  loading: () => null,
})

export const metadata = {
  title: "Contacto | BLXK Studio",
  description: "Ponte en contacto con nosotros. Estamos listos para transformar tu negocio.",
};

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
