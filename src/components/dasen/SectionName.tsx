export function SectionName({ children }: { children: React.ReactNode }) {
  return (
    <div className="sec-name">
      <i aria-hidden />
      {children}
    </div>
  );
}
