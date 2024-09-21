export const logout = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/logout`,
      {
        credentials: "include",
      }
    );
    document.cookie =
      "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log("Successfully logged out");
    console.log("Logout response", response);
  } catch (error) {
    console.error("Failed to logout:", error);
    throw error;
  }
};
