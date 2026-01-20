export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-24 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 neon-text">Términos de Servicio</h1>
            <div className="prose prose-invert max-w-none">
                <p className="text-lg text-muted-foreground">
                    Bienvenido a BLXK Studio. Al utilizar nuestros servicios, usted acepta cumplir con los siguientes términos y condiciones.
                </p>
                <div className="mt-8 p-6 bg-card rounded-lg border border-border">
                    <p>
                        Actualmente estamos actualizando nuestros términos legales. Si tiene preguntas específicas sobre nuestros acuerdos de servicio, por favor contáctenos a través de nuestro formulario de contacto o enviando un correo a <a href="mailto:admin@blxkstudio.com" className="text-primary hover:underline">admin@blxkstudio.com</a>.
                    </p>
                </div>
            </div>
        </div>
    )
}
