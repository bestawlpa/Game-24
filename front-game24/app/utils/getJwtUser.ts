import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import type { User } from "~/interfaces/user.interface";

type RedirectCondition = "authenticated" | "unauthenticated";

export const useGetJwtUser = ( redirectPath: string, redirectIf: RedirectCondition ) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User>();

  const getUserProfile = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3088/api/profile`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const isAuthenticated = response.ok;

      if (redirectIf === "authenticated" && isAuthenticated) {
        navigate(redirectPath);
      }

      if (redirectIf === "unauthenticated" && !isAuthenticated) {
        navigate(redirectPath);
      }

      if (isAuthenticated) {
        const data = await response.json(); 
        setUserData(data); 
      }

    } catch (error) {
      const err = error as Error;
      console.log(err.message);
    }
  },[ redirectIf, redirectPath, navigate ]);

  useEffect(() => {
    getUserProfile();
  }, [redirectPath, redirectIf, navigate]);

  return userData;
};