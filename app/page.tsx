import { Logo } from '@/components/logo';
import Link from 'next/link';

export default function Index() {
  return (
    <div className="max-w-xl mx-4 md:mx-10 py-14 md:py-20">
      <Logo />
      <p className="mt-8 text-neutral-600">
        Forward is a tiny spec on the internet, we build visually and
        technically sound web experiences for humans. We build applications that
        solve problems and make the web a better place.
      </p>
      <p className="mt-4 mb-12 text-neutral-600">
        Great things can be achieved through a combination of unwavering passion
        and perseverance in the face of adversity. We are passionate and are
        constantly learning and growing.
      </p>
      <Link
        className="text-sm bg-black text-white px-4 py-3 rounded-full"
        href="mailto:jasper@forwardco.be"
      >
        Contact
      </Link>
    </div>
  );
}
