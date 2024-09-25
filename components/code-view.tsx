import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function CodeView({ content }: { content: string }) {
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
        language="html"
        style={tomorrow}
        showLineNumbers={false}
        wrapLines={true}
      >
        {content}
      </SyntaxHighlighter>
    </pre>
  );
}
