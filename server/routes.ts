import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { insertMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.projects.list.path, async (_req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.skills.list.path, async (_req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const messageData = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(messageData);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  return httpServer;
}

// Seed function — always syncs the latest project & skill data on startup
export async function seedDatabase() {
  // Always clear and re-seed projects to keep production in sync
  await storage.clearProjects();

  await storage.createProject({
    title: "The CPU Scheduling Simulator",
    shortDescription: "A web application built using Streamlit and Plotly that allows users to define a set of processes and simulate various CPU scheduling algorithms.",
    content: "Calculates performance metrics (Average Waiting Time, Average Turnaround Time, etc.), displays a detailed process result table, and visualizes the schedule using an interactive Gantt Chart. Implements: fcfs() (Non-Preemptive), sjf() (Non-Preemptive), srtf() (Shortest Remaining Preemptive), round_robin(quantum) (Preemptive), priority_scheduling(preemptive) (Preemptive/Non-Preemptive).",
    technologies: ["Python", "Streamlit", "Plotly"],
    displayOrder: 1,
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2426",
    liveUrl: "https://kiro-ayman-os-scheduler-visuals-app-e4v0hb.streamlit.app/"
  });

  await storage.createProject({
    title: "Sugar Ring",
    shortDescription: "A fully responsive HTML & CSS website for a donut shop brand — capturing the shop's playful, indulgent identity with a smooth, modern browsing experience across all devices.",
    content: "Sugar Ring is a donut shop brand that needed a full digital presence to showcase its menu, story, and personality online. The goal was to design and build a fully responsive HTML & CSS website that captures the shop's playful, indulgent identity — from its glazed rings to its quirky flavors — while delivering a smooth, modern browsing experience across all devices.",
    technologies: ["HTML", "CSS"],
    displayOrder: 2,
    imageUrl: "/assets/sugar_ring.png",
    liveUrl: "https://lnkd.in/drwhAzwE"
  });

  await storage.createProject({
    title: "Banking System",
    shortDescription: "Designed and implemented a modular banking system using C++ and object-oriented programming (OOP).",
    content: "Focused on system design and robust modular architecture.",
    technologies: ["C++", "System Design"],
    displayOrder: 3,
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=2370"
  });

  // Only seed skills if none exist
  const existingSkills = await storage.getSkills();
  if (existingSkills.length === 0) {
    const skills = [
      { name: "JavaScript", category: "Frontend Development", proficiency: 90 },
      { name: "HTML5", category: "Frontend Development", proficiency: 95 },
      { name: "CSS3", category: "Frontend Development", proficiency: 90 },
      { name: "Python", category: "Languages", proficiency: 80 },
      { name: "C/C++", category: "Languages", proficiency: 85 },
      { name: "Git", category: "Development Tools", proficiency: 85 },
      { name: "GitHub", category: "Development Tools", proficiency: 90 },
      { name: "AI Tools", category: "Development Tools", proficiency: 85 },
      { name: "Algorithms", category: "Others", proficiency: 90 },
      { name: "Data Structures", category: "Others", proficiency: 90 },
      { name: "Problem Solving", category: "Others", proficiency: 95 },
    ];

    for (const skill of skills) {
      await storage.createSkill(skill);
    }
  }
}
