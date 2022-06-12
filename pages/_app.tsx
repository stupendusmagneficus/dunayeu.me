import NextApp from "next/app";
import { ThemeProvider } from "react-jss";
import theme from "@/utils/theme";

import "normalize.css";
import "@/utils/global.css";

export default class App extends NextApp {
  /**
   * Lifted straight from Next.js example
   * https://github.com/vercel/next.js/tree/canary/examples/with-react-jss
   */
  componentDidMount() {
    const style = document.getElementById("server-side-styles");

    if (style) {
      style.parentNode!.removeChild(style);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}
