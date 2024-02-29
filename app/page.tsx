import Image from 'next/image';
import AuthButton from '../components/AuthButton';
import Logo from '@/assets/logo.png';

export default async function Index() {
  return (
    <div className="max-w-7xl mx-auto">
      <nav className="flex items-center justify-between border-b py-6 border-neutral-200">
        <div className="flex items-center gap-2">
          <Image className="fl" src={Logo} alt="Chronobill Logo" width={40} />
          <p className="text-lg font-semibold">Chronobill</p>
        </div>
        <AuthButton homeButton={true} />
      </nav>
    </div>
  );
}
