import Link from 'next/link';
import AuthButton from './AuthButton';
import Navigation from './Navigation';
import Image from 'next/image';
import Logo from '@/assets/logo.png';

export default function Header() {
  return (
    <div className="max-w-7xl mx-auto">
      <nav className="flex items-center justify-between border-b py-6 border-neutral-200">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <Image className="fl" src={Logo} alt="Chronobill Logo" width={40} />
            <Link href="/calendar" className="text-lg font-semibold">
              Chronobill
            </Link>
          </div>
          <Navigation />
        </div>
        <AuthButton />
      </nav>
    </div>
  );
}
