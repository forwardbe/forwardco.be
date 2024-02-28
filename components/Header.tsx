import Link from 'next/link';
import AuthButton from './AuthButton';
import Navigation from './Navigation';

export default function Header() {
  return (
    <div className="max-w-7xl mx-auto">
      <nav className="flex items-center justify-between border-b py-6 border-neutral-200">
        <div className="flex items-center gap-10">
          <Link href="/calendar" className="text-lg font-semibold">
            Chronobill {'->'}
          </Link>
          <Navigation />
        </div>
        <AuthButton />
      </nav>
    </div>
  );
}
