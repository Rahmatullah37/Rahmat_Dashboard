export function EmptyNote({ text }: { text: string }) {
  return <p className="rounded-xl border border-dashed border-line p-4 text-sm text-muted">{text}</p>;
}
