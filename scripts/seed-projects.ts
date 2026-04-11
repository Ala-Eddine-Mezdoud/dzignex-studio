import { drizzle } from "drizzle-orm/neon-http";
import { projects, projectDetails, projectDetailImages } from "../db/schema/projects";
import * as dotenv from "dotenv";
import { config } from "dotenv";

config({ path: ".env" });

const db = drizzle(process.env.DATABASE_URL!);

async function seed() {
  console.log("🌱 Seeding projects...");

  try {
    // 1. Clear existing data (Optional, but good for clean seed)
    // await db.delete(projectDetailImages);
    // await db.delete(projectDetails);
    // await db.delete(projects);

    const projectData = [
      {
        id: crypto.randomUUID(),
        title: "Avure Skincare",
        slug: "avure-skincare",
        summary: "Refining the essence of natural beauty through clinical branding.",
        description: "Avure is a premium skincare brand that blends botanical ingredients with clinical precision. We were tasked with creating a brand identity that felt both organic and highly scientific.",
        category: "Branding & Packaging",
        services: ["Visual Identity", "Packaging Design", "E-commerce Website"],
        thumbnailUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800",
        clientName: "Avure Labs",
        isPublished: true,
      },
      {
        id: crypto.randomUUID(),
        title: "TechFlow SaaS",
        slug: "techflow-saas",
        summary: "Visualizing complex data flows for modern dev teams.",
        description: "TechFlow is a monitoring tool for distributed systems. The goal was to make complex infrastructure data look beautiful and intuitive.",
        category: "Web & Product",
        services: ["Product Design", "Logo Design", "Design System"],
        thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        clientName: "TechFlow Inc.",
        isPublished: true,
      },
    ];

    for (const project of projectData) {
      await db.insert(projects).values(project);
      console.log(`✅ Project '${project.title}' inserted.`);

      // Add details for Avure
      if (project.slug === "avure-skincare") {
        const details = [
          {
            id: crypto.randomUUID(),
            projectId: project.id,
            label: "The Logo Concept",
            description: "Inspired by cellular structures and circular harmony, the 'A' emblem represents the cycle of skin renewal.",
            orderIndex: 0,
          },
          {
            id: crypto.randomUUID(),
            projectId: project.id,
            label: "Materiality & Print",
            description: "Using high-tactile paper stocks and gold foil stamping to convey the premium nature of the products.",
            orderIndex: 1,
          },
        ];

        for (const detail of details) {
          await db.insert(projectDetails).values(detail);
          
          // Add dummy images for each detail
          await db.insert(projectDetailImages).values([
            {
              id: crypto.randomUUID(),
              detailId: detail.id,
              imageUrl: "https://images.unsplash.com/photo-1620916583389-343a60dbabee?auto=format&fit=crop&q=80&w=1200",
              altText: `${detail.label} process 1`,
              orderIndex: 0,
            },
            {
              id: crypto.randomUUID(),
              detailId: detail.id,
              imageUrl: "https://images.unsplash.com/photo-1581491395934-1cd72ec1f47f?auto=format&fit=crop&q=80&w=1200",
              altText: `${detail.label} process 2`,
              orderIndex: 1,
            },
          ]);
        }
      }

      // Add details for TechFlow
      if (project.slug === "techflow-saas") {
        const details = [
          {
            id: crypto.randomUUID(),
            projectId: project.id,
            label: "Dashboard Architecture",
            description: "We focused on reducing cognitive load by using a highly structured grid and custom iconography.",
            orderIndex: 0,
          },
        ];

        for (const detail of details) {
          await db.insert(projectDetails).values(detail);
          await db.insert(projectDetailImages).values([
            {
              id: crypto.randomUUID(),
              detailId: detail.id,
              imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
              altText: "Analytics Dashboard UI",
              orderIndex: 0,
            },
          ]);
        }
      }
    }

    console.log("✨ All projects seeded successfully!");
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
}

seed();
