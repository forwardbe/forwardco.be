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
    return redirect('/signin');
  };

  return user ? (
    <div className="flex items-center gap-6">
      {homeButton ? (
        <Link href="/dashboard">Go to dashboard</Link>
      ) : (
        <Link href="/account">Account</Link>
      )}
      <form action={signOut}>
        <Button as="button" type="submit">
          Logout
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <Link
        href="/signin"
        className="text-sm hover:bg-neutral-300 transition bg-neutral-200 px-4 py-2 rounded-lg"
      >
        Sign In
      </Link>
      <Link
        href="/signup"
        className="text-sm hover:bg-neutral-300 transition bg-neutral-200 px-4 py-2 rounded-lg"
      >
        Sign Up
      </Link>
    </div>
  );
}
