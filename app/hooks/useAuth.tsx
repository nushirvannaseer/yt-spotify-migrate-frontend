"use client";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("http://localhost:8888/session", {
        credentials: "include",
      });
      const data = await response.json();
      setUser(data);
    };
    fetchUser();
  }, []);
  return { user };
};

export default useAuth;
