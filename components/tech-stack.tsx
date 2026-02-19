export function TechStack() {
  const techCategories = [
    {
      category: "Backend",
      technologies: [
        { name: "Java", logo: "/stack/java.svg" },
        { name: "Spring Boot", logo: "/stack/spring.svg" },
        { name: "Node.js", logo: "/stack/nodejs.svg" },
        {
          name: "Express",
          logo: "/stack/express.svg",
          modeClass: "dark:invert",
        },
        { name: "FastAPI", logo: "/stack/fastapi.svg" },
      ],
    },
    {
      category: "Frontend",
      technologies: [
        {
          name: "Next.js",
          logo: "/stack/nextjs.svg",
          modeClass: "dark:invert",
        },
        { name: "React", logo: "/stack/react.svg" },
        { name: "Angular", logo: "/stack/angular.svg" },
        {
          name: "TailwindCSS",
          logo: "/stack/tailwindcss.svg",
        },
      ],
    },
    {
      category: "Bases de Datos",
      technologies: [
        {
          name: "PostgreSQL",
          logo: "/stack/postgresql.svg",
        },
        { name: "MySQL", logo: "/stack/mysql.svg" },
        { name: "MongoDB", logo: "/stack/mongodb.svg" },
      ],
    },
    {
      category: "DevOps & Cloud",
      technologies: [
        { name: "Docker", logo: "/stack/docker.svg" },
        { name: "Git", logo: "/stack/git.svg" },
        {
          name: "GitHub",
          logo: "/stack/github.svg",
          modeClass: "dark:invert",
        },
        { name: "WordPress", logo: "/stack/wordpress.svg" },
        { name: "cPanel", logo: "/stack/cpanel.svg" },
      ],
    },
    {
      category: "Automatización & AI",
      technologies: [
        { name: "n8n", logo: "/stack/n8n.svg" },
        { name: "OpenAI", logo: "/stack/openai.svg", modeClass: "dark:invert" },
        { name: "Anthropic", logo: "/stack/anthropic-claude.svg" },
        { name: "Gemini", logo: "/stack/gemini.svg" },
        { name: "Hugging Face", logo: "/stack/huggingface.svg" },
      ],
    },
  ]

  return (
    <section
      id="tech"
      className="py-10 md:py-24 relative overflow-hidden bg-background"
    >
      <div className="container mx-auto px-4 relative z-10 mb-8 md:mb-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            Stack Tecnológico
          </h2>
          <p className="text-base md:text-xl text-muted-foreground/80 leading-relaxed max-w-2xl mx-auto">
            Herramientas de vanguardia para soluciones de clase mundial
          </p>
        </div>
      </div>

      <div className="space-y-10 md:space-y-16">
        {techCategories.map((category, catIndex) => {
          // Duplicate items enough times to ensure seamless loop on large screens
          // If items are few, we need more duplications
          const carouselItems = Array(10).fill(category.technologies).flat()
          // Alternate direction: even index = normal (left), odd index = reverse (right)
          const directionClass = catIndex % 2 === 0 ? "animate-scroll" : "animate-scroll-reverse"

          return (
            <div key={category.category} className="space-y-6">
              <div className="container mx-auto px-4">
                <h3 className="text-xl md:text-2xl font-bold text-primary tracking-tight text-center uppercase">
                  {category.category}
                </h3>
              </div>

              {/* Carousel Container */}
              <div className="relative w-full overflow-hidden py-4">
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

                <div className={`flex w-max ${directionClass} hover:[animation-play-state:paused]`}>
                  {carouselItems.map((tech, index) => (
                    <div
                      key={`${category.category}-${tech.name}-${index}`}
                      className="flex flex-col items-center justify-center gap-4 mx-8 md:mx-12 group select-none"
                    >
                      <div className="relative w-14 h-14 md:w-16 md:h-16 transition-transform duration-300 group-hover:scale-110">
                        <img
                          src={tech.logo || "/placeholder.svg"}
                          alt={tech.name}
                          className={`w-full h-full object-contain transition-transform duration-300 transform group-hover:scale-110 ${tech.modeClass || ""}`}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <span className="text-xs md:text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
