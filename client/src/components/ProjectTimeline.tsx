import { motion } from "framer-motion";
import { type Project } from "@shared/schema";
import { Github, ExternalLink, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProjectTimelineProps {
  projects: Project[];
}

export function ProjectTimeline({ projects }: ProjectTimelineProps) {
  return (
    <div className="relative container mx-auto px-4 py-12">
      {/* Central Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-purple-500/20 to-transparent" />

      <div className="space-y-12 md:space-y-24">
        {projects.map((project, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${
                isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background transform -translate-x-1/2 mt-6 md:mt-8 z-10 shadow-[0_0_15px_rgba(124,58,237,0.5)]" />

              {/* Content Side */}
              <div className="md:w-1/2 flex justify-center md:px-12 pl-12">
                <div className="w-full glass-card p-6 md:p-8 rounded-2xl hover:border-primary/30 transition-colors duration-300 group">
                  
                  {/* Image Placeholder or Actual Image */}
                  <div className="aspect-video w-full rounded-xl overflow-hidden bg-black/50 mb-6 border border-white/5 relative group-hover:shadow-2xl transition-all">
                    {project.imageUrl ? (
                      <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-purple-900/10">
                        <span className="text-4xl font-display font-bold text-white/10">{project.title[0]}</span>
                      </div>
                    )}
                    
                    {/* Hover Overlay with Links */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
                          title="View Live Demo"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="p-3 bg-black text-white border border-white/20 rounded-full hover:scale-110 transition-transform"
                          title="View Source Code"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-2xl font-bold font-display text-white group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      {project.shortDescription}
                    </p>

                    {project.liveUrl && (
                      <div className="pt-2">
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                        >
                          View Live Demo
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.technologies.map((tech) => (
                        <Badge 
                          key={tech} 
                          variant="secondary" 
                          className="bg-white/5 hover:bg-white/10 text-primary-foreground border-white/5"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Empty Side for Layout Balance */}
              <div className="md:w-1/2" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
