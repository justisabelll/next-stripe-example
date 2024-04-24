"use server";

import { eq } from "drizzle-orm";
import { users } from "~/server/db/schema";
import { db } from "~/server/db";
import { stripe } from "~/lib/stripe";

export type AuthResponse = {
  message: string;
};

export async function SignUp(
  prevState: AuthResponse,
  formData: FormData,
): Promise<AuthResponse> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  const user = await db.select().from(users).where(eq(users.email, email));

  if (user.length > 0) {
    return { message: "User with that email already exists. 🤔" };
  }

  // normally you would hash the password here
  // but for the sake of this example we will skip that
  // please DO NOT store plain text passwords in production
  // in fact, email and password should only be your
  // auth choice if you really have to

  await db.insert(users).values({
    email,
    password,
    name,
  });

  return { message: "User created successfully. 🎉" };
}

export async function createPortalSession(customerId: string) {
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: "http://localhost:3000",
  });

  return { id: portalSession.id, url: portalSession.url };
}
