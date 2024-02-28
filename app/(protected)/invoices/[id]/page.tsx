import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Selection from './selection';

async function getEventsById(id: string) {
  const supabase = createClient();
  const { data: events, error } = await supabase
    .from('events')
    .select(`*, client_id (name)`)
    .eq('client_id', id);

  if (error) {
    return redirect('/invoices');
  }

  return events;
}

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

async function getClientById(id: string) {
  const supabase = createClient();
  const { data: client, error } = await supabase
    .from('clients')
    .select()
    .eq('id', id)
    .single();

  if (error) {
    return redirect('/invoices');
  }

  return client;
}

export default async function Page({ params }: { params: { id: string } }) {
  const events = await getEventsById(params.id);
  const user = await getUser();
  const client = await getClientById(params.id);

  return (
    <div>
      <Selection events={events} user={user} client={client} />
    </div>
  );
}
