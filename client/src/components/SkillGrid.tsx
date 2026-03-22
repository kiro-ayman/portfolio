import { motion } from "framer-motion";
import { type Skill } from "@shared/schema";
import * as SiIcons from "react-icons/si";
import { Code, Server, Wrench, Globe, Database, Terminal } from "lucide-react";
import { IconType } from "react-icons";

// Helper to resolve icon strings to components
const getIcon = (iconName: string | null) => {
  if (!iconName) return Code;
  
  // Check React Icons (Simple Icons)
  const siIcon = (SiIcons as unknown as Record<string, IconType>)[iconName];
  if (siIcon) return siIcon;

  // Lucide fallbacks if name matches
  if (iconName === "Frontend") return Globe;
  if (iconName === "Backend") return Server;
  if (iconName === "Database") return Database;
  if (iconName === "Tools") return Wrench;

  return Code;
};

interface SkillGridProps {
  skills: Skill[];
}

export function SkillGrid({ skills }: SkillGridProps) {
  // Group skills by category
  const categories = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Object.entries(categories).map(([category, categorySkills], idx) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className="glass-card rounded-2xl p-6 hover:bg-white/5 transition-colors duration-300"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              {category === "Frontend" && <Globe className="w-5 h-5" />}
              {category === "Backend" && <Server className="w-5 h-5" />}
              {category === "Tools" && <Wrench className="w-5 h-5" />}
              {category === "Database" && <Database className="w-5 h-5" />}
              {!["Frontend", "Backend", "Tools", "Database"].includes(category) && <Terminal className="w-5 h-5" />}
            </div>
            <h3 className="text-xl font-bold font-display text-white">{category}</h3>
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-3"
          >
            {categorySkills.map((skill) => {
              const Icon = getIcon(skill.icon);
              return (
                <motion.div
                  key={skill.id}
                  variants={item}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
                  className="flex items-center gap-2 p-3 rounded-lg border border-white/5 bg-black/20"
                >
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm font-medium text-gray-200">{skill.name}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
