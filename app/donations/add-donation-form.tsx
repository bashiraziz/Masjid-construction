"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { projects } from "@/lib/data" // Assuming projects are still loaded from here for the form
import addDonation from "./actions" // Corrected import for default export

export function AddDonationForm() {
  const [state, formAction, isPending] = useActionState(addDonation, null)

  // Show toast messages based on the action state
  if (state?.success) {
    toast({
      title: "Donation Successful!",
      description: state.message,
      variant: "default",
    })
    // Optionally reset the form here if needed
    state.success = false // Prevent re-showing toast on re-render
  } else if (state?.message && !state.success) {
    toast({
      title: "Donation Failed",
      description: state.message,
      variant: "destructive",
    })
    state.message = "" // Prevent re-showing toast on re-render
  }

  return (
    <form action={formAction} className="space-y-4 p-4 border rounded-lg shadow-sm mb-8">
      <h2 className="text-2xl font-semibold mb-4">Make a Donation</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="donor_name">Donor Name</Label>
          <Input id="donor_name" name="donor_name" placeholder="Anonymous" type="text" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">Amount (UGX)</Label>
          <Input id="amount" name="amount" placeholder="e.g., 50000" type="number" step="any" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="project_id">Select Project (Optional)</Label>
        <Select name="project_id">
          <SelectTrigger>
            <SelectValue placeholder="Select a project" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General Donation</SelectItem>
            {projects.map((project) => (
              <SelectItem key={project.id} value={project.id.toString()}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Submitting..." : "Donate Now"}
      </Button>
    </form>
  )
}
