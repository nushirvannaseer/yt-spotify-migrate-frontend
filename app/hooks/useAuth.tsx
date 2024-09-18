"use client";
import { useEffect, useState } from "react";
import { ErrorResponse } from "../types/errors";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorResponse | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8888/session", {
          credentials: "include",
        });
        const data = await response.json();
        setUser(data);
      } catch (error) {
        setError(error as ErrorResponse);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  return { user, loading, error };
};

export default useAuth;
