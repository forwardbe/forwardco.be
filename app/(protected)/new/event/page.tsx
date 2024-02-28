import Button from '@/components/Button';
import Input from '@/components/Input';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import SubmitButton from '@/components/SubmitButton';
import toast from 'react-hot-toast';
import { timeDifferenceAsDecimal } from '@/app/utils/money';

async function getClients() {
  const supabase = createClient();
  const { data: clients, error } = await supabase.from('clients').select();

  if (error) {
    return redirect('/clients');
  }

  return clients || [];
}

export default async function Page({ searchParams }: { searchParams: any }) {
  const urlDate = searchParams.date;
  const clients = await getClients();

  async function addEvent(formData: FormData) {
    'use server';

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return redirect('/login');
    }

    const rawFormData = {
      date: formData.get('date') as string,
      start: formData.get('start') as string,
      end: formData.get('end') as string,
      client_id: formData.get('client') as string,
      user_id: user.id,
      timeAsDecimal: timeDifferenceAsDecimal(
        formData.get('start') as string,
        formData.get('end') as string
      ),
    };

    const [startHours, startMinutes] = rawFormData.start.split(':').map(Number);
    const [endHours, endMinutes] = rawFormData.end.split(':').map(Number);
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
    if (endTotalMinutes < startTotalMinutes) {
      return;
    } else {
      const { data, error } = await supabase
        .from('events')
        .insert([rawFormData])
        .select();

      if (data) {
        revalidatePath('/calendar');
        redirect('/calendar');
      }
    }
  }

  return (
    <div>
      <p className="text-lg font-semibold">Create event</p>
      {clients.length === 0 && (
        <p className="text-sm text-red-600 mt-2">
          You need to create a client first!
        </p>
      )}
      <form className="mt-4 bg-neutral-50 p-6 rounded-lg">
        <fieldset disabled={clients.length === 0}>
          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            <div className="sm:col-span-2">
              <Input
                defaultValue={urlDate}
                label="Date"
                id="date"
                type="date"
                required
              />
            </div>
            <Input
              label="Start time"
              type="time"
              min="00:00"
              max="24:00"
              id="start"
              required
            />
            <Input
              label="End time"
              id="end"
              type="time"
              min="00:00"
              max="24:00"
              required
            />
            <div className="flex flex-col">
              <label className="text-md" htmlFor="client">
                Client <span className="text-red-500">*</span>
              </label>
              <select
                className="rounded-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed bg-white border-neutral-300 focus:ring-2 ring-neutral-600 transition  focus:outline-none shadow px-4 mt-2 py-2 bg-inherit border"
                id="client"
                name="client"
              >
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>
        <div className="mt-6 gap-2 flex items-center justify-end">
          <Button as="link" href="/calendar">
            Cancel
          </Button>
          <SubmitButton
            formAction={addEvent}
            pendingText="Creating..."
            disabled={clients.length === 0}
          >
            Create
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
