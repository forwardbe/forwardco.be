import AuthButton from '@/components/AuthButton';
import Code from '@/components/Code';
import Link from 'next/link';

const client = `
'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [notes, setNotes] = useState(null)
  const supabase = createClient()

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('notes').select()
      setNotes(data)
    }
    getData()
  }, [])

  return <pre>{JSON.stringify(notes, null, 2)}</pre>
}
`.trim();

const server = `
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

async function getUser() {
  const supabase = createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user === null) {
    return redirect('/login');
  }

  return user;
}

`.trim();

export default async function Index() {
  return (
    <div className="max-w-7xl mx-auto py-20">
      <div className="flex items-center justify-between border-b pb-4 mb-8">
        <p className="text-lg font-semibold">Nextjs Supabase Starter</p>
        <AuthButton />
        {/* <div className="flex items-center gap-2">
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
        </div> */}
      </div>
      <div>
        <p className="text-lg font-semibold mb-4">Client</p>
        <Code code={client} />
        <p className="text-lg font-semibold mb-4 mt-12">Server</p>
        <Code code={server} />
      </div>
    </div>
  );
}
