import "../styles/globals.css";
import type { AppProps } from "next/app";
import 'tailwindcss/tailwind.css'
import { AuthProvider } from "../contexts/Auth";
import AuthGuard from "../components/AuthGuard";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AuthGuard>
        <Component {...pageProps} />
      </AuthGuard>
    </AuthProvider>
  );
}
export default MyApp;
