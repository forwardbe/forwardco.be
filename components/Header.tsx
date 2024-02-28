export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto">
      <nav className="flex items-center justify-between border-b py-6 border-neutral-200">
        {children}
      </nav>
    </div>
  );
}
