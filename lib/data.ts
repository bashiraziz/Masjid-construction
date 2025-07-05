// MARKER_PROJECTS_START
export const projects = [
  {
    id: 1,
    name: "Ageri Mosque",
    slug: "ageri-mosque",
    location: "Ageri, Uganda",
    description:
      "The Ageri Mosque project aims to construct a new mosque in the Ageri community, providing a much-needed place of worship and community gathering for the local Muslim population. The current structure is dilapidated and insufficient for the growing community.",
    goal: 60000, // USD
    raised: 25000, // USD
    image: "/placeholder.svg?height=400&width=600",
    videos: [
      "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder video
    ],
    gallery: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    budgetPhases: [
      { phase: "Phase 1: Foundation", costUSD: 15000 },
      { phase: "Phase 2: Walls & Roof", costUSD: 25000 },
      { phase: "Phase 3: Finishing & Minaret", costUSD: 20000 },
    ],
    accounting: [
      {
        date: "2024-01-15",
        description: "Cement purchase",
        amountUSD: 1500,
        receipt: "/placeholder.svg?height=100&width=100",
      },
      {
        date: "2024-02-01",
        description: "Labor wages (foundation)",
        amountUSD: 2000,
        receipt: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
  {
    id: 2,
    name: "Hidayah Mosque",
    slug: "hidayah-mosque",
    location: "Hidayah, Uganda",
    description:
      "The Hidayah Mosque project aims to build a new, larger mosque to accommodate the rapidly growing Muslim community in Hidayah. This will include a dedicated women's section and a small library.",
    goal: 80000, // USD
    raised: 35000, // USD
    image: "/placeholder.svg?height=400&width=600",
    videos: [
      "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder video
    ],
    gallery: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    budgetPhases: [
      { phase: "Phase 1: Land Acquisition & Site Prep", costUSD: 20000 },
      { phase: "Phase 2: Structure & Roofing", costUSD: 30000 },
      { phase: "Phase 3: Interior & Facilities", costUSD: 30000 },
    ],
    accounting: [
      {
        date: "2024-03-10",
        description: "Land purchase",
        amountUSD: 5000,
        receipt: "/placeholder.svg?height=100&width=100",
      },
      {
        date: "2024-04-05",
        description: "Architect fees",
        amountUSD: 1500,
        receipt: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
]

export const EXCHANGE_RATE_USD_TO_UGX = 3500 // 1 USD = 3500 UGX

export function getTotalGoal(): number {
  return projects.reduce((sum, project) => sum + project.goal, 0)
}

/**
 * Alias kept for backward compatibility.
 * Returns the same value as getTotalGoal().
 */
export function getTotalBudget(): number {
  return getTotalGoal()
}

export function getTotalRaised(): number {
  return projects.reduce((sum, project) => sum + project.raised, 0)
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug)
}
// MARKER_PROJECTS_END

// MARKER_DONATIONS_START
// This section is now handled by the database.
// MARKER_DONATIONS_END
