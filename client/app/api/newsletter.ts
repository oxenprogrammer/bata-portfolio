import { z } from "zod";
import { API_URL } from "./constants";

const newsletterSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
});

type NewsletterInput = z.infer<typeof newsletterSchema>;

export async function subscribeToNewsletter(input: NewsletterInput) {
  const validated = newsletterSchema.parse(input);

  const response = await fetch(`${API_URL}/subscriber`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validated),
  });

  if (!response.ok) {
    throw new Error("Failed to subscribe to newsletter");
  }

  return response.json();
}
