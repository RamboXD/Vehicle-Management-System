import { z } from "zod";

export const caregiverSchema = z.object({
  step: z.literal(1),
  email: z
    .string()
    .email({ message: "Please provide a valid email" })
    .min(1, { message: "Please provide a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  givenName: z.string(),
  surname: z.string(),
  city: z.string(),
  phoneNumber: z.string().min(1, { message: "Please enter a phone number" }),
  profileDescription: z.string(),
  photo: z.string(),
  gender: z.string(),
  caregivingType: z.string(),
  hourlyRate: z.number(),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Please provide a valid email" })
    .min(1, { message: "Please provide a valid email" }),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters long" }),
});

export const memberSchema = z.object({
  step: z.literal(1),
  email: z
    .string()
    .email({ message: "Please provide a valid email" })
    .min(1, { message: "Please provide a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  givenName: z.string(),
  surname: z.string(),
  city: z.string(),
  phoneNumber: z.string().min(1, { message: "Please enter a phone number" }),
  profileDescription: z.string(),
  houseRules: z.string(),
  houseNumber: z.string(),
  street: z.string(),
  town: z.string(),
});
