"use server"

import { db } from "../db/drizzle";
import { projects, projectDetails, projectDetailImages } from "../db/schema/projects";
import { eq, desc, asc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

/**
 * Get all projects ordered by title
 */
export async function getProjects() {
  try {
    return await db.query.projects.findMany({
      orderBy: [desc(projects.id)], // Or any other sorting preference
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch projects");
  }
}

/**
 * Get a detailed project by its slug (or ID)
 * This includes all detail sections and their associated images
 */
export async function getProjectBySlug(slug: string) {
  try {
    const project = await db.query.projects.findFirst({
      where: eq(projects.slug, slug),
      with: {
        details: {
          orderBy: [asc(projectDetails.orderIndex)],
          with: {
            images: {
              orderBy: [asc(projectDetailImages.orderIndex)],
            },
          },
        },
        testimonial: true,
      },
    });
    return project;
  } catch (error) {
    console.error(`Error fetching project with slug ${slug}:`, error);
    throw new Error("Failed to fetch project details");
  }
}

/**
 * Update a project's main information
 */
export async function updateProject(id: string, data: Partial<typeof projects.$inferInsert>) {
  try {
    await db.update(projects)
      .set(data)
      .where(eq(projects.id, id));
    
    revalidatePath("/dashboard/projects");
    revalidatePath("/projects");
    return { success: true };
  } catch (error) {
    console.error(`Error updating project ${id}:`, error);
    throw new Error("Failed to update project");
  }
}

/**
 * Delete a project and all its associated details/images (cascaded in DB)
 */
export async function deleteProject(id: string) {
  try {
    await db.delete(projects)
      .where(eq(projects.id, id));
    
    revalidatePath("/dashboard/projects");
    revalidatePath("/projects");
    return { success: true };
  } catch (error) {
    console.error(`Error deleting project ${id}:`, error);
    throw new Error("Failed to delete project");
  }
}

/**
 * Toggle publication status
 */
export async function toggleProjectPublish(id: string, isPublished: boolean) {
  try {
    await db.update(projects)
      .set({ isPublished })
      .where(eq(projects.id, id));
    
    revalidatePath("/dashboard/projects");
    return { success: true };
  } catch (error) {
    console.error(`Error toggling publish for project ${id}:`, error);
    throw new Error("Failed to toggle publish status");
  }
}
