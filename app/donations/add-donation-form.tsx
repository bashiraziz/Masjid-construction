"use client"

import { useActionState, useEffect, useRef } from "react"
import { addDonation } from "./actions"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { projects } from "@/lib/data" // Import projects for the dropdown

export function AddDonationForm() {
  const [state, formAction, isPending] = useActionState(addDonation, null)
  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state?.message) {
      toast({
        title: state.success ? "Success!" : "Error!",
        description: state.message,
        variant: state.success ? "default" : "destructive",
      })
      if (state.success) {
        formRef.current?.reset() // Reset form on success
      }
    }
  }, [state, toast])

  return (
    <div className="mb-8 p-6 border rounded-lg shadow-sm bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Donation</h2>
      <form ref={formRef} action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="donorName">Donor Name</Label>
          <Input id="donorName" name="donorName" placeholder="Anonymous" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">Amount (USD)</Label>
          <Input id="amount" name="amount" type="number" step="0.01" placeholder="50.00" required />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="projectId">Project</Label>
          <Select name="projectId" required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id.toString()}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-2 flex justify-center">
          <Button type="submit" disabled={isPending} className="w-full md:w-auto">
            {isPending ? "Adding..." : "Add Donation"}
          </Button>
        </div>
      </form>
    </div>
  )
}
