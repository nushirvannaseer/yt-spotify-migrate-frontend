"use server";
import { cookies } from "next/headers";

export const logout = async () => {
  await cookies().delete("session");
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/logout`, {
      credentials: "include",
    });
  } catch (error) {
    console.error("Failed to logout:", error);
    throw error;
  }
};
