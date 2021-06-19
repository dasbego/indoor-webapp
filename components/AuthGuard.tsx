// AuthGuard.tsx
import { useAuth } from "../contexts/Auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: JSX.Element }) {
  const { user, initializing } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!initializing && !user) {
      router.push("/login");
    }
  }, [initializing, user]);

  // if auth initialized with a valid user show protected page
  if (user) {
    return <>{children}</>;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null;
}
