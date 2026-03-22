import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
}

export function SectionHeading({ title, subtitle, align = "center" }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${
        align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left"
      }`}
    >
      <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <div className="w-full flex justify-center">
          <p className="text-muted-foreground max-w-2xl text-lg md:text-xl">
            {subtitle}
          </p>
        </div>
      )}
      <div
        className={`mt-4 h-1 w-20 bg-gradient-to-r from-primary to-purple-400 rounded-full ${
          align === "center" ? "mx-auto" : align === "right" ? "ml-auto" : ""
        }`}
      />
    </motion.div>
  );
}
