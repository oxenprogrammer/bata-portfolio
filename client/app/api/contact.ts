import { z } from "zod";
import { API_URL } from "./constants";
const contactSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  name: z.string().optional(),
  phone: z
    .string()
    .transform((val) => val.replace(/\s+/g, ''))
    .pipe(
      z.string().regex(
        /^\+?[0-9]{6,15}$/,
        "Please enter a valid phone number"
      )
    )
    .optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message cannot exceed 1000 characters"),
});

type ContactInput = z.infer<typeof contactSchema>;

export async function contactApi(input: ContactInput) {
  const validated = contactSchema.parse(input);

  const response = await fetch(`${API_URL}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validated),
  });

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  return response.json();
}
