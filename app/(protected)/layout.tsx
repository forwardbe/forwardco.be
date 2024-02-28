import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import AuthButton from '@/components/AuthButton';
import Header from '@/components/Header';
import Link from 'next/link';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mx-4">
        <Header>
          <div className="flex items-center gap-10">
            <Link href="/calendar" className="text-lg font-semibold">
              Chronobill {'->'}
            </Link>
            <div className="flex items-center gap-2">
              <Link href="/calendar">Calendar</Link>
              <Link href="/clients">Clients</Link>
              <Link href="/clients">Invoices</Link>
            </div>
          </div>
          <AuthButton />
        </Header>
        <div className="py-10">{children}</div>
      </div>
    </div>
  );
}
