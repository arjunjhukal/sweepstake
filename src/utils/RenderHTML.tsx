export function renderHTML(content: string) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: content }
      }
    />
  );
}
