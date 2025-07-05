"use server"

import { sql } from "@vercel/postgres"
import { revalidatePath } from "next/cache"
import { z } from "zod" // Assuming zod is installed for validation

// Define the Donation interface
export interface Donation {
  id: number
  donor_name: string
  amount: number
  project_id: string | null
  donation_date: string // ISO date string
  created_at: string // ISO date string
}

// Define a schema for validation
const DonationSchema = z.object({
  donor_name: z.string().min(1, "Donor name is required."),
  amount: z
    .string()
    .transform((val) => Number.parseFloat(val))
    .pipe(z.number().positive("Amount must be positive.")),
  project_id: z.string().optional().nullable(),
})

export default async function addDonation(formData: FormData) {
  console.log("Server Action: addDonation received formData:", formData)

  // Defensive check for formData itself
  if (!(formData instanceof FormData)) {
    console.error("Error: formData is not an instance of FormData. Received:", formData)
    return { success: false, message: "Invalid form data received. Please try again." }
  }

  try {
    const rawFormData = {
      donor_name: formData.get("donor_name"),
      amount: formData.get("amount"),
      project_id: formData.get("project_id"),
    }

    console.log("Raw form data extracted:", rawFormData)

    // Validate form data using Zod
    const validatedFields = DonationSchema.safeParse(rawFormData)

    if (!validatedFields.success) {
      console.error("Validation Error:", validatedFields.error.flatten().fieldErrors)
      return {
        success: false,
        message: "Validation failed. Please check your input.",
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    const { donor_name, amount, project_id } = validatedFields.data

    // Insert into database
    const result = await sql<Donation>`
      INSERT INTO donations (donor_name, amount, project_id, donation_date)
      VALUES (${donor_name}, ${amount}, ${project_id || null}, NOW())
      RETURNING id, donor_name, amount, project_id, donation_date, created_at;
    `

    revalidatePath("/donations")
    revalidatePath("/") // Revalidate homepage to update total donations

    console.log("Donation added successfully:", result.rows[0])
    return { success: true, message: "Donation added successfully!", donation: result.rows[0] }
  } catch (error) {
    console.error("Failed to add donation:", error)
    // Check if it's a VercelPostgresError
    if (error && typeof error === "object" && "code" in error && (error as any).code === "missing_connection_string") {
      return {
        success: false,
        message:
          "Database connection error: POSTGRES_URL is missing or invalid. Please configure your environment variables.",
      }
    }
    return { success: false, message: "Failed to add donation due to an unexpected error. Please check server logs." }
  }
}

export async function getDonations(): Promise<Donation[]> {
  if (!process.env.POSTGRES_URL) {
    console.warn("POSTGRES_URL is not set. Returning empty donations array.")
    return []
  }
  try {
    const { rows } = await sql<Donation>`SELECT * FROM donations ORDER BY created_at DESC;`
    return rows
  } catch (error) {
    console.error("Failed to fetch donations:", error)
    // For now, returning empty array to prevent build failures if DB is down/unreachable
    return []
  }
}
