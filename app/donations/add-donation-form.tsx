"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { addDonation } from "@/app/donations/actions" // Corrected import for default export

interface AddDonationFormProps {
  projectId?: number // Optional projectId for project-specific donations
}

export function AddDonationForm({ projectId }: AddDonationFormProps) {
  const [state, formAction, isPending] = useActionState(addDonation, null)
  const { toast } = useToast()

  // Show toast message based on action state
  if (state?.message) {
    toast({
      title: state.success ? "Success!" : "Error!",
      description: state.message,
      variant: state.success ? "default" : "destructive",
    })
    // Reset state message after showing toast to prevent re-showing on re-renders
    state.message = undefined
  }

  return (
    <form action={formAction} className="space-y-4">
      {projectId && <input type="hidden" name="projectId" value={projectId} />}
      <div>
        <Label htmlFor="amount">Amount (USD)</Label>
        <Input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          min="0.01"
          placeholder="e.g., 50.00"
          required
          disabled={isPending}
        />
      </div>
      <div>
        <Label htmlFor="donor_name">Your Name (Optional)</Label>
        <Input id="donor_name" name="donor_name" type="text" placeholder="Anonymous" disabled={isPending} />
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Submitting..." : "Donate Now"}
      </Button>
    </form>
  )
}
