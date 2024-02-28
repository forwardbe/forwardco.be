import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Button from './Button';

export default async function AuthButton() {
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
    <div className="flex items-center gap-2">
      <Button as="link" href="/calendar">
        Go to calendar
      </Button>
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
