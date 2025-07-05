import { getDonations } from "@/app/donations/actions"

export interface Project {
  id: number
  name: string
  description: string
  location: string
  goal: number
  raised: number // This will eventually come from the database
  images?: string[] // Optional array of image URLs
  slug: string
}

// Exchange rate from USD to UGX (Ugandan Shillings)
export const UGX_EXCHANGE_RATE = 3750 // Example rate: 1 USD = 3750 UGX

// Dummy project data (will eventually be fetched from a database)
export const projects: Project[] = [
  {
    id: 1,
    name: "Grand Mosque of Kampala",
    description:
      "A monumental project to construct the largest mosque in Kampala, featuring traditional Islamic architecture and modern facilities for the community.",
    location: "Kampala, Uganda",
    goal: 500000,
    raised: 150000, // Example raised amount
    images: ["/placeholder.svg?height=400&width=600&text=Grand+Mosque+Kampala"],
    slug: "grand-mosque-kampala",
  },
  {
    id: 2,
    name: "Community Mosque & School, Jinja",
    description:
      "Building a new mosque combined with an Islamic school to provide education and spiritual guidance for children and adults in Jinja.",
    location: "Jinja, Uganda",
    goal: 250000,
    raised: 80000, // Example raised amount
    images: ["/placeholder.svg?height=400&width=600&text=Jinja+Community+Mosque"],
    slug: "community-mosque-jinja",
  },
  {
    id: 3,
    name: "Rural Prayer Center, Mbale",
    description:
      "Establishing small prayer centers in underserved rural areas, starting with Mbale, to ensure access to prayer facilities for remote communities.",
    location: "Mbale, Uganda",
    goal: 100000,
    raised: 45000, // Example raised amount
    images: ["/placeholder.svg?height=400&width=600&text=Mbale+Prayer+Center"],
    slug: "rural-prayer-center-mbale",
  },
  {
    id: 4,
    name: "Masjid Al-Noor Renovation",
    description:
      "A project focused on renovating and expanding the historic Masjid Al-Noor, preserving its heritage while upgrading facilities for increased capacity.",
    location: "Entebbe, Uganda",
    goal: 300000,
    raised: 120000,
    images: ["/placeholder.svg?height=400&width=600&text=Masjid+Al-Noor+Renovation"],
    slug: "masjid-al-noor-renovation",
  },
  {
    id: 5,
    name: "Islamic Cultural Center, Gulu",
    description:
      "Developing a multi-purpose Islamic cultural center in Gulu, including a mosque, library, and community hall to foster Islamic knowledge and community engagement.",
    location: "Gulu, Uganda",
    goal: 400000,
    raised: 200000,
    images: ["/placeholder.svg?height=400&width=600&text=Gulu+Cultural+Center"],
    slug: "islamic-cultural-center-gulu",
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

/**
 * Return the sum of all projectsʼ `raised` amounts (USD).
 */
export function getTotalRaised(): number {
  return projects.reduce((sum, project) => sum + project.raised, 0)
}

export function getTotalBudget(): number {
  return projects.reduce((sum, project) => sum + project.goal, 0)
}

// This function now fetches donations and calculates totals dynamically
export async function getTotalDonated(projectId?: number): Promise<number> {
  const donations = await getDonations()
  if (projectId) {
    return donations
      .filter((donation) => donation.project_id === projectId)
      .reduce((sum, donation) => sum + donation.amount, 0)
  }
  return donations.reduce((sum, donation) => sum + donation.amount, 0)
}
