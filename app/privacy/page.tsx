import type { Metadata } from "next";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = buildNoIndexMetadata({
    title: "Política de Privacidad | BLXK Studio",
    description: "Conoce cómo BLXK Studio recopila, usa y protege tus datos personales en sus servicios digitales.",
    path: "/privacy",
});

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-24 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 neon-text">Política de Privacidad</h1>
            <div className="prose prose-invert max-w-none">
                <p className="text-lg text-muted-foreground">
                    En BLXK Studio, valoramos su privacidad. Esta página describe cómo recopilamos, usamos y protegemos su información personal.
                </p>
                <div className="mt-8 p-6 bg-card rounded-lg border border-border">
                    <p>
                        Actualmente estamos actualizando nuestros términos legales. Para cualquier consulta relacionada con la privacidad de sus datos, por favor contáctenos directamente a través de nuestro formulario de contacto o enviando un correo a <a href="mailto:admin@blxkstudio.com" className="text-primary hover:underline">admin@blxkstudio.com</a>.
                    </p>
                </div>
            </div>
        </div>
    )
}
