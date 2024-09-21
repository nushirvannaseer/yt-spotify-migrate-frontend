export const logout = async () => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/logout`, {
      credentials: "include",
    });
    document.cookie =
      "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  } catch (error) {
    console.error("Failed to logout:", error);
    throw error;
  }
};
