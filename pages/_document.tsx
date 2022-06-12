import Document, { DocumentContext } from "next/document";
import { SheetsRegistry, JssProvider } from "react-jss";

/**
 * This code is lifted straight from Next.js example
 * https://github.com/vercel/next.js/tree/canary/examples/with-react-jss
 */
export default class JssDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const registry = new SheetsRegistry();

    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => (
          <JssProvider registry={registry}>
            <App {...props} />
          </JssProvider>
        ),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style type="text/css" id="server-side-styles">
            {registry.toString()}
          </style>
        </>
      ),
    };
  }
}
