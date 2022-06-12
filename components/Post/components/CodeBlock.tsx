import { FunctionComponent } from "react";
import {
  PrismAsyncLight as SyntaxHighlighter,
  SyntaxHighlighterProps,
} from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const CodeBlock: FunctionComponent<SyntaxHighlighterProps> = ({
  language,
  value,
}) => (
  <SyntaxHighlighter
    language={language || "text"}
    style={atomDark}
    showLineNumbers
  >
    {value}
  </SyntaxHighlighter>
);

export default CodeBlock;
