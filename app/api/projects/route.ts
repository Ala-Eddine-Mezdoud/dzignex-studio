import { NextResponse } from "next/server"

import { createProject } from "../../../db-actions/projects"

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    const result = await createProject(payload)
    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error("Error in /api/projects:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create project" },
      { status: 500 }
    )
  }
}
