import Document, { Html, Head, Main, NextScript } from "next/document";
import CssBaseline from "@material-ui/core/CssBaseline";

function MyDocument() {
  return (
    <Html>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <body>
        <CssBaseline />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: any) => {
  const initialProps = await Document.getInitialProps(ctx);
  return { ...initialProps };
};
MyDocument.renderDocument = Document.renderDocument;
export default MyDocument;
