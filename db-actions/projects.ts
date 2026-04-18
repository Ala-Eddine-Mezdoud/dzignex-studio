"use server"

import { db } from "../db/drizzle";
import { projects, projectDetails, projectDetailImages } from "../db/schema/projects";
import { testimonials } from "../db/schema/testimonials";
import { eq, desc, asc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2Client, BUCKET_NAME } from "../lib/r2Client";
import { requireAuth, requireAdmin } from "../lib/auth-guard";

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
export async function updateProjectBasic(id: string, data: Partial<typeof projects.$inferInsert>) {
  await requireAdmin()
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
 * Update a project with full data including details and testimonials
 */
export type UpdateProjectData = CreateProjectData

export async function updateProject(slug: string, data: UpdateProjectData) {
  await requireAdmin()
  try {
    console.log("Updating project with data:", JSON.stringify(data, null, 2))
    const { details, testimonials: testimonialEntries, ...projectData } = data

    // First, get the existing project by slug
    const existingProject = await getProjectBySlug(slug)
    if (!existingProject) {
      return { success: false, error: "Project not found" }
    }

    console.log("Project data to update:", JSON.stringify(projectData, null, 2))
    await db.update(projects)
      .set(projectData)
      .where(eq(projects.id, existingProject.id))

    // Handle details - delete existing and recreate
    const existingDetailIds = existingProject.details?.map(d => d.id) || []
    if (existingDetailIds.length > 0) {
      await db.delete(projectDetails)
        .where(eq(projectDetails.projectId, existingProject.id))
    }

    if (details?.length) {
      for (const [detailIndex, detail] of details.entries()) {
        const [createdDetail] = await db.insert(projectDetails)
          .values({
            projectId: existingProject.id,
            label: detail.label,
            description: detail.description ?? null,
            orderIndex: detail.orderIndex ?? detailIndex,
          })
          .returning()

        if (detail.images?.length) {
          await db.insert(projectDetailImages).values(
            detail.images.map((imageUrl, imageIndex) => ({
              detailId: createdDetail.id,
              imageUrl,
              altText: null,
              orderIndex: imageIndex,
            }))
          )
        }
      }
    }

    // Handle testimonials - delete existing and recreate
    if (existingProject.testimonial) {
      await db.delete(testimonials)
        .where(eq(testimonials.projectId, existingProject.id))
    }

    if (testimonialEntries?.length) {
      await db.insert(testimonials).values(
        testimonialEntries.map((testimonial) => ({
          projectId: existingProject.id,
          authorName: testimonial.authorName,
          authorRole: testimonial.authorRole ?? null,
          authorCompany: testimonial.authorCompany ?? null,
          feedbackText: testimonial.feedbackText,
          statValue: testimonial.statValue ?? null,
          statLabel: testimonial.statLabel ?? null,
          rating: testimonial.rating ?? null,
        }))
      )
    }

    revalidatePath("/dashboard/projects");
    revalidatePath("/projects");
    return { success: true, project: existingProject }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error("Error updating project:", errorMessage)
    console.error("Full error:", error)
    return {
      success: false,
      error: errorMessage
    }
  }
}

/**
 * Delete a project and all its associated details/images (cascaded in DB)
 */
export async function deleteProject(id: string) {
  await requireAdmin()
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
  await requireAdmin()
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

/**
 * Create project
 */
export type CreateProjectData = Omit<typeof projects.$inferInsert, "id"> & {
  details?: {
    label: string
    description?: string | null
    images?: string[]
    orderIndex?: number
  }[]
  testimonials?: {
    authorName: string
    authorRole?: string | null
    authorCompany?: string | null
    feedbackText: string
    statValue?: string | null
    statLabel?: string | null
    rating?: number | null
    orderIndex?: number
  }[]
}

export async function createProject(data: CreateProjectData) {
  await requireAdmin()
  try {
    console.log("Creating project with data:", JSON.stringify(data, null, 2))
    const { details, testimonials: testimonialEntries, ...projectData } = data

    console.log("Project data to insert:", JSON.stringify(projectData, null, 2))
    const [createdProject] = await db.insert(projects).values(projectData).returning()
    console.log("Project created:", createdProject.id)

    if (details?.length) {
      for (const [detailIndex, detail] of details.entries()) {
        const [createdDetail] = await db.insert(projectDetails)
          .values({
            projectId: createdProject.id,
            label: detail.label,
            description: detail.description ?? null,
            orderIndex: detail.orderIndex ?? detailIndex,
          })
          .returning()

        if (detail.images?.length) {
          await db.insert(projectDetailImages).values(
            detail.images.map((imageUrl, imageIndex) => ({
              detailId: createdDetail.id,
              imageUrl,
              altText: null,
              orderIndex: imageIndex,
            }))
          )
        }
      }
    }

    if (testimonialEntries?.length) {
      await db.insert(testimonials).values(
        testimonialEntries.map((testimonial) => ({
          projectId: createdProject.id,
          authorName: testimonial.authorName,
          authorRole: testimonial.authorRole ?? null,
          authorCompany: testimonial.authorCompany ?? null,
          feedbackText: testimonial.feedbackText,
          statValue: testimonial.statValue ?? null,
          statLabel: testimonial.statLabel ?? null,
          rating: testimonial.rating ?? null,
        }))
      )
    }

    revalidatePath("/dashboard/projects");
    return { success: true, project: createdProject }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error("Error creating project:", errorMessage)
    console.error("Full error:", error)
    return {
      success: false,
      error: errorMessage
    }
  }
}

export async function getProjectUploadPresignedUrl(key: string, contentType: string) {
  await requireAuth()
  try {
    const normalizedKey = key.replace(/^\/+/, "")
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: normalizedKey,
      ContentType: contentType,
    })

    const url = await getSignedUrl(r2Client, command, { expiresIn: 3600 })

    return {
      success: true,
      data: {
        url,
        publicUrl: `${process.env.R2_PUBLIC_URL}/${normalizedKey}`,
      },
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unable to create upload URL.",
    }
  }
}