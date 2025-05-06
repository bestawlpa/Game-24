import { useEffect } from "react";
import { useNavigate } from "react-router";

type RedirectCondition = "authenticated" | "unauthenticated";

export const useGetJwtUser = ( redirectPath: string, redirectIf: RedirectCondition ) => {
  const navigate = useNavigate();

  const getUserProfile = async () => {
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

    } catch (error) {
      const err = error as Error;
      console.log(err.message);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, [redirectPath, redirectIf, navigate]);
};