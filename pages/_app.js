import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/api";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
