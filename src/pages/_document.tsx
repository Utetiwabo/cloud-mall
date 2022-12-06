import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        {/* <link rel='manifest' href='/manifest.json' /> */}
        {/* <meta
          name='viewport'
          content='width=device-width,initial-scale=1,maximum-scale=1'
        /> */}
      </Head>
      <body
        style={{
          // position: "fixed",
          // right: 0,
          // left: 0,
          // top: 0,
          WebkitTapHighlightColor: "rgba(0,0,0,0)",
        }}>
        {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
