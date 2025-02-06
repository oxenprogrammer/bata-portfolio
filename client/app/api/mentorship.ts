import { z } from "zod";
import { API_URL } from "./constants";

// Define the user types
export const UserType = {
  MENTOR: "MENTOR",
  MENTEE: "MENTEE",
} as const;

// Create a Zod schema for mentor signup
const mentorSignupSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  userType: z.enum([UserType.MENTOR, UserType.MENTEE], {
    errorMap: () => ({ message: "Please select a user type" }),
  }),
});

// Infer the type for TypeScript
type MentorSignupInput = z.infer<typeof mentorSignupSchema>;

// API function for mentor signup
export async function mentorSignupApi(input: MentorSignupInput) {
  const validated = mentorSignupSchema.parse(input);

  const response = await fetch(`${API_URL}/mentorship`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validated),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.errors?.email?.[0] || data.message || "Failed to sign up");
  }

  return data;
}