import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function MarkdownView({ md }: { md: string }) {

  return (
    <pre
      className="p-4"
      style={{
        fontSize: 12,
        backgroundColor: "transparent",
        borderRadius: 0,
        margin: 0,
      }}
    >
       <SyntaxHighlighter
        language="markdown"
        style={tomorrow}
        showLineNumbers={true}
        wrapLines={true}
      >
        {md}
      </SyntaxHighlighter>
    </pre>
  );
}
