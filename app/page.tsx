import Image from 'next/image';
import AuthButton from '../components/AuthButton';
import Logo from '@/assets/logo.png';
import Button from '@/components/Button';
import { GridPattern } from '@/components/GridPattern';

export default async function Index() {
  return (
    <div className="max-w-7xl mx-auto">
      <nav className="flex items-center bg-white justify-between border-b py-6 border-neutral-200">
        <div className="flex items-center gap-2">
          <Image src={Logo} alt="Chronobill Logo" width={40} />
          <p className="text-lg font-semibold">Chronobill</p>
        </div>
        <AuthButton homeButton={true} />
      </nav>
      <div className="flex items-center justify-center flex-col border-b border-neutral-200 pb-32">
        <Image className="mt-32" src={Logo} alt="Chronobill Logo" width={120} />

        <p className="text-5xl mt-12">More then time tracking</p>
        <p className="text-lg w-1/3 text-center mt-4 mb-8">
          Chronobill makes it easy to track time across all your clients and
          projects.
        </p>
        <Button as="link" href="/register">
          Get started
        </Button>
      </div>
    </div>
  );
}
