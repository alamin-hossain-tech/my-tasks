import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "../Components/layout/layout";
import AuthProvider from "../Contexts/AuthProvider/AuthProvider";
import "../styles/globals.css";

const queryClient = new QueryClient();
export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </QueryClientProvider>
  );
}
