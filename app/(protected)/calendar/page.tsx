import Button from '@/components/Button';
import Header from '@/components/Header';
import Link from 'next/link';

export default function Page() {
  return (
    <div>
      <Header>
        <Link
          href="/"
          className="py-2 flex w-fit px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
        >
          Go back
        </Link>
        <Button as="link" href="/">
          Go back
        </Button>
        <p>Calendar</p>
      </Header>
    </div>
  );
}
