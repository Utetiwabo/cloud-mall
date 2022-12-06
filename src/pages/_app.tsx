import type { AppProps } from "next/app";
import "styles/globals.css";
// import Auth from "src/components/AuthModal";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@lib/firebase";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  QueryFunction,
  QueryFunctionContext,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";
import Head from "next/head";
import { Loading } from "src/components/Loading";
import font from "@next/font/local";
import dynamic from "next/dynamic";

const poppins = font({
  src: [
    {
      path: "../../public/fonts/Poppins-Regular.ttf",
      style: "normal",
      weight: "500",
    },
  ],
  variable: "--font-poppins",
});
// import "@fontsource/poppins";

interface QueryFunctionWithV
  extends QueryFunction<
    boolean,
    [string, { query: {}; offset: number; limit: number }]
  > {}

const defaultQueryFn = async ({ queryKey }: any) => {
  const [key, args] = queryKey;
  const response = await axios.get(`/api/${key}`, {
    params: {
      query: JSON.stringify(args?.query),
      offset: args?.offset,
      limit: args?.limit,
    },
  });
  return response?.data;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      networkMode: "offlineFirst",
    },
    mutations: { networkMode: "offlineFirst" },
  },
});

const Auth = dynamic(() => import("src/components/AuthModal"), {
  // ssr: true,
});

function MyApp({ Component, pageProps }: AppProps) {
  const [user, loadingUser] = useAuthState(auth);
  return (
    <QueryClientProvider client={queryClient}>
      {/* <Hydrate state={pageProps.dehydratedState}> */}

      <style jsx global>
        {`
          html {
            font-family: ${poppins.style.fontFamily};
          }
        `}
      </style>
      <Head>
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1,maximum-scale=1'
        />
      </Head>

      <main className={` ${poppins.variable} bg-neutral-100`}>
        <Auth />
        <Component user={user} loadingUser={loadingUser} {...pageProps} />
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
      {/* </Hydrate> */}
    </QueryClientProvider>
  );
}

export default MyApp;
