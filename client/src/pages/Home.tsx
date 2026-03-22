import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { useProjects, useSkills, useSendMessage } from "@/hooks/use-portfolio";
import { Navbar } from "@/components/Navbar";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectTimeline } from "@/components/ProjectTimeline";
import { SkillGrid } from "@/components/SkillGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema } from "@shared/schema";
import { Loader2, ArrowRight, Download, Mail, Github, Linkedin, Monitor, Zap, Layout, Code, Star } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import kirolosPhoto from "/assets/kirolos_ayman_final.jpg";

export default function Home() {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: skills, isLoading: skillsLoading } = useSkills();
  const sendMessageMutation = useSendMessage();

  const services = [
    {
      title: "Responsive Website Development",
      description: "I build fully responsive websites that work seamlessly across mobile, tablet, and desktop devices using modern HTML, CSS, and JavaScript.",
      icon: Monitor
    },
    {
      title: "High-Converting Landing Pages",
      description: "Modern, visually appealing landing pages designed to capture attention, increase engagement, and convert visitors into customers.",
      icon: Layout
    },
    {
      title: "Performance & UI Optimization",
      description: "Improve website speed, fix UI issues, enhance accessibility, and ensure smooth user experience with clean and optimized code.",
      icon: Zap
    },
    {
      title: "Figma / XD to Code",
      description: "Convert design files (Figma, Adobe XD) into pixel-perfect, responsive, and maintainable frontend code.",
      icon: Code
    }
  ];

  const testimonials = [
    {
      name: "Ahmed Hassan",
      role: "Startup Founder",
      feedback: "Professional, fast, and detail-oriented. The website exceeded my expectations and works perfectly on all devices.",
      rating: 5
    },
    {
      name: "Sara Mohamed",
      role: "Marketing Specialist",
      feedback: "Very clean design and smooth user experience. Communication was excellent and delivery was on time.",
      rating: 5
    },
    {
      name: "Mostafa Ali",
      role: "Small Business Owner",
      feedback: "Great frontend skills and attention to detail. The performance improvements made a huge difference.",
      rating: 4
    }
  ];

  const form = useForm<z.infer<typeof insertMessageSchema>>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: z.infer<typeof insertMessageSchema>) => {
    sendMessageMutation.mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  if (projectsLoading || skillsLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background text-primary">
        <Loader2 className="w-12 h-12 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center relative pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-block px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary font-medium text-sm mb-6">
              Available for Hire
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-display leading-tight mb-6">
              Hi, I'm <span className="text-gradient-purple">Kirolos Ayman</span> <br />
              <span className="text-gradient-purple">React Web Developer</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
              I don’t just write code — I design and architect scalable web solutions with strong attention to usability and clean design, ensuring ongoing optimization, stability, and growth.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="projects" smooth={true} offset={-100}>
                <Button size="lg" className="rounded-full px-8 text-base h-12 bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all">
                  View Projects <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              
              <a href="/assets/resume.pdf" download="Kirolos_Ayman_Resume.pdf">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-full px-8 text-base h-12 border-white/20 hover:bg-white/10"
                >
                  Download CV 
                  <Download className="ml-2 w-4 h-4" />
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:flex justify-center"
          >
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              {/* Abstract decorative elements */}
              <div className="absolute inset-0 border border-white/10 rounded-2xl rotate-6 backdrop-blur-sm bg-white/5" />
              <div className="absolute inset-0 border border-white/10 rounded-2xl -rotate-6 backdrop-blur-sm bg-white/5" />
              <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 to-black flex items-center justify-center border border-white/10">
                <img 
                  src={kirolosPhoto} 
                  alt="Kirolos Ayman" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative bg-black/20">
        <div className="container mx-auto px-6">
          <SectionHeading title="About Me" subtitle="The person behind the code" />
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Unsplash abstract tech image */}
              {/* computer setup clean modern */}
              <div className="relative rounded-2xl overflow-hidden aspect-square md:aspect-auto md:h-[500px] shadow-2xl">
                 <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10" />
                 <img 
                   src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" 
                   alt="Coding setup" 
                   className="w-full h-full object-cover"
                 />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold font-display">React Web Developer & Software Engineering student.</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Currently pursuing a Bachelor of Engineering in Software Engineering at Egyptian Chinese University (GPA: 3.84). I have extensive experience in building responsive web interfaces and solving algorithmic challenges.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                As a React Web Developer at Digital Egypt Pioneers Initiative (DEPI), I design and develop responsive applications. I am also an ECPC Finalist and an active member of the technical teams at ICPC and IEEE ECU communities.
              </p>
              
             
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 relative">
        <div className="container mx-auto px-6">
          <SectionHeading title="Tech Stack" subtitle="Tools and technologies I use to bring ideas to life" />
          {skills && <SkillGrid skills={skills} />}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 relative bg-black/20">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="My Services" 
            subtitle="I create modern, responsive, and high-performance websites that help businesses build a strong digital presence." 
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 relative">
        <div className="container mx-auto px-6">
          <SectionHeading title="Featured Projects" subtitle="A selection of my recent work" />
          {projects && <ProjectTimeline projects={projects} />}
        </div>
      </section>

      {/* Feedback Section */}
      <section id="feedback" className="py-24 relative bg-black/20">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="What Clients Say" 
            subtitle="Here’s what people say about working with me." 
          />
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 rounded-2xl border border-white/5 relative"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-white/10"}`} 
                    />
                  ))}
                </div>
                <p className="text-lg text-white/90 italic mb-6 leading-relaxed">
                  "{testimonial.feedback}"
                </p>
                <div>
                  <h4 className="font-bold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-primary">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative">
        <div className="container mx-auto px-6 max-w-4xl">
          <SectionHeading title="Get In Touch" subtitle="Have a project in mind? Let's work together." />

          <div className="glass-card rounded-2xl p-8 md:p-12 border border-white/10">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold font-display text-white mb-2">Contact Information</h3>
                  <p className="text-muted-foreground">
                    Fill out the form or reach out directly via email or social media.
                  </p>
                </div>

                <div className="space-y-4">
                  <a href="mailto:hello@example.com" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span>kiroayman2005@gmail.com</span>
                  </a>
                  <a href="https://github.com/kiro-ayman" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                      <Github className="w-5 h-5" />
                    </div>
                    <span>github.com/kiro-ayman</span>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/kirolos-ayman/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <span>linkedin.com/in/kirolos-ayman</span>
                  </a>


                </div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            placeholder="Your Name" 
                            className="bg-white/5 border-white/10 h-12 rounded-xl focus:ring-primary/50" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            placeholder="Your Email" 
                            className="bg-white/5 border-white/10 h-12 rounded-xl focus:ring-primary/50" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea 
                            placeholder="Your Message" 
                            className="bg-white/5 border-white/10 min-h-[150px] rounded-xl focus:ring-primary/50 resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-semibold shadow-lg shadow-purple-900/20"
                    disabled={sendMessageMutation.isPending}
                  >
                    {sendMessageMutation.isPending ? (
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-6 text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} Kirolos Ayman. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
