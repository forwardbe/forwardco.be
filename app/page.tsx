import AuthButton from '@/components/AuthButton';
import Code from '@/components/Code';
import { Input, Select } from '@/components/FormElements';
import { Euro } from 'lucide-react';

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
      </div>
      <div className="py-20">
        <Input id="password" label="Password" type="password" small />
        <Input
          id="password"
          label="Password"
          startIcon={Euro}
          endIcon={Euro}
          small
        />
        <Input id="password" label="Password" endIcon={Euro} small />
        <Input id="password" label="Password" endIcon={Euro} small />
        <Input id="password" label="Password" endIcon={Euro} />
        <Input id="password" label="Password" startIcon={Euro} />
        <div className="w-40">
          <Input
            id="password"
            label="Password"
            endText=".com"
            textPadding="pr-[72px]"
          />
        </div>
        <Select
          small
          label="Client"
          id="client"
          options={[
            { id: 1, name: 'test' },
            { id: 1, name: 'test' },
            { id: 1, name: 'test' },
          ]}
        />
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
