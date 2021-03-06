// AuthGuard.tsx
import { useAuth } from "../contexts/Auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AuthGuard({
  children,
  requireAuth,
}: {
  children: JSX.Element;
  requireAuth: boolean;
}) {
  const { user, initializing } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!initializing && user && router.route === '/login') {
      router.replace('/dashboard/records')
    }
    if (!initializing && !user) {
      router.push("/login");
    }
  }, [initializing, user, router.route]);

  // if auth initialized with a valid user show protected page
  if (user || !requireAuth) {
    return <>{children}</>;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null;
}
