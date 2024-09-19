
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
      <code>{md}</code>
    </pre>
  );
}
