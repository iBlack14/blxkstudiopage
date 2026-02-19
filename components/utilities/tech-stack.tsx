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
      className="py-24 relative bg-secondary/30"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold neon-text-sm">Stack Tecnológico</h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-loose">Herramientas de vanguardia para soluciones de clase mundial</p>
          </div>

          <div className="space-y-12">
            {techCategories.map((category, index) => (
              <div key={index} className="space-y-6">
                <h3 className="text-2xl font-bold text-primary text-center">{category.category}</h3>
                <div className="flex md:flex-wrap md:items-center md:justify-center gap-4 md:gap-10 overflow-x-auto md:overflow-visible pb-2 md:pb-0 snap-x snap-mandatory scroll-smooth scrollbar-hide">
                  {category.technologies.map((tech, techIndex) => (
                    <div key={techIndex} className="flex-shrink-0 snap-start min-w-[104px] md:min-w-0 flex flex-col items-center gap-3 md:gap-4 group">
                      <div className="w-18 h-18 rounded-lg neon-logo-rotating stack-logo-shell p-3 flex items-center justify-center relative z-10">
                        <img
                          src={tech.logo || "/placeholder.svg"}
                          alt={tech.name}
                          className={`w-full h-full object-contain group-hover:scale-110 transition-transform relative z-10 ${tech.modeClass || ""}`}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <span className="text-base text-muted-foreground group-hover:text-primary transition-colors text-center">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


