import "../styles/globals.css";
import type { AppProps } from "next/app";
import 'tailwindcss/tailwind.css'
import { AuthProvider } from "../contexts/Auth";
import AuthGuard from "../components/AuthGuard";
import { NextComponentType, NextPageContext } from "next";

type MyComponentType = NextComponentType<NextPageContext, any, {}> & { requireAuth: boolean };
type MyAppProps = AppProps & { Component: MyComponentType };

function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <AuthProvider>
      <AuthGuard requireAuth={Component.requireAuth}>
        <Component {...pageProps} />
      </AuthGuard>
    </AuthProvider>
  );
}
export default MyApp;
