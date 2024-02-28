import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Button from './Button';

export default async function AuthButton({ homeButton = false }) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    'use server';

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect('/login');
  };

  return user ? (
    <div className="flex items-center gap-6">
      {homeButton ? <Link href="/calendar">Go to app</Link> : `Hi, ${user.email}!`}
      <form action={signOut}>
        <Button as="button" type="submit">
          Logout
        </Button>
      </form>
    </div>
  ) : (
    <Button as="link" href="/login">
      Login
    </Button>
  );
}
