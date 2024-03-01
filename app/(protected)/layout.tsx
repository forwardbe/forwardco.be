import AuthButton from '@/components/AuthButton';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

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
    return redirect('/signin');
  }

  return (
    <div className="max-w-7xl mx-auto py-20">
      <div className="flex items-center justify-between border-b pb-4 mb-8">
        <p className="text-lg font-semibold">Dashboard</p>
        <AuthButton />
      </div>
      {children}
    </div>
  );
}
