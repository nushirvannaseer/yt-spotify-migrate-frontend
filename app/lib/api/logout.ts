import { cookies } from "next/headers";

export const logout = async () => {
  await cookies().delete("session");
  console.log("cookies", cookies().getAll());
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/logout`,
      {
        credentials: "include",
      }
    );
    console.log("Logout response", response);
  } catch (error) {
    console.error("Failed to logout:", error);
    throw error;
  }
};
