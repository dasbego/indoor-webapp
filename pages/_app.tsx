import "../styles/globals.css";
import type { AppProps } from "next/app";
import 'tailwindcss/tailwind.css'
import { AuthProvider } from "../auth";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
export default MyApp;
