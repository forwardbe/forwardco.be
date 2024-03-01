import Link from 'next/link';
import { headers } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { SubmitButton } from './submit-button';
import Button from '@/components/Button';
import Image from 'next/image';
import Logo from '@/assets/logo.png';

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signUp = async (formData: FormData) => {
    'use server';
    const origin = headers().get('origin');
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    console.log(error);

    if (error) {
      return redirect(`/signup?message=${error.message}`);
    }
    return redirect('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto py-16">
      <Button as="link" href="/">
        {'<-'}
      </Button>
      <p className="text-2xl font-semibold mt-8">Sign Up</p>
      <form className="mt-4 flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />

        <SubmitButton
          formAction={signUp}
          className="bg-neutral-900 text-white rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Signing Up..."
        >
          Sign Up
        </SubmitButton>
        <Link href="/signin">
          Already have an account? <span className="underline">Sign In</span>
        </Link>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
