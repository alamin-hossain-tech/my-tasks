import Layout from "../components/layout/layout";
import AuthProvider from "../Contexts/AuthProvider/AuthProvider";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
