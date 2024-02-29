import Button from '@/components/Button';
import Input from '@/components/Input';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import SubmitButton from '@/components/SubmitButton';
import { revalidatePath } from 'next/cache';
import { timeDifferenceAsDecimal } from '@/app/utils/money';

async function getEvent(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('events')
    .select()
    .eq('id', id)
    .single();

  if (error) {
    return redirect('/calendar');
  }

  return data || {};
}

async function getClients() {
  const supabase = createClient();
  const { data: clients, error } = await supabase.from('clients').select();

  if (error) {
    return redirect('/clients');
  }

  return clients || [];
}

export default async function Page({ params }: { params: { id: string } }) {
  const event = await getEvent(params.id);
  const clients = await getClients();

  async function updateEvent(formData: FormData) {
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
        .update([rawFormData])
        .eq('id', params.id)
        .select();

      if (data) {
        revalidatePath('/calendar');
        redirect('/calendar');
      }
    }
  }

  async function deleteEvent(formData: FormData) {
    'use server';

    const supabase = createClient();
    const rawFormData = {
      id: formData.get('id') as string,
    };

    const { data } = await supabase
      .from('events')
      .delete()
      .eq('id', rawFormData.id)
      .select();

    if (data) {
      revalidatePath('/calendar');
      redirect('/calendar');
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Edit event</p>
        <form>
          <input type="hidden" name="id" value={event.id} />
          {event.invoiced ? (
            <p className="text-neutral-600">
              Event has been invoiced, cannot be deleted or updated.
            </p>
          ) : (
            <SubmitButton
              formAction={deleteEvent}
              pendingText="Deleting..."
              danger
              disabled={event.invoiced}
            >
              Delete event
            </SubmitButton>
          )}
        </form>
      </div>
      <form className="mt-4 bg-neutral-50 p-6 rounded-lg">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
          <div className="sm:col-span-2">
            <Input
              label="Date"
              id="date"
              type="date"
              required
              defaultValue={event.date}
            />
          </div>
          <Input
            label="Start time"
            type="time"
            min="00:00"
            max="24:00"
            id="start"
            required
            defaultValue={event.start}
          />
          <Input
            label="End time"
            id="end"
            type="time"
            min="00:00"
            max="24:00"
            required
            defaultValue={event.end}
          />
          <div className="flex flex-col">
            <label className="text-md" htmlFor="client">
              Client <span className="text-red-500">*</span>
            </label>
            <select
              className="rounded-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed bg-white border-neutral-300 focus:ring-2 ring-neutral-600 transition  focus:outline-none shadow px-4 mt-2 py-2 bg-inherit border"
              id="client"
              name="client"
              defaultValue={event.client_id}
            >
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-6">
          <fieldset
            disabled={event.invoiced}
            className="gap-2 flex items-center justify-end"
          >
            <Button as="link" href="/calendar">
              Cancel
            </Button>
            <SubmitButton
              formAction={updateEvent}
              pendingText="Updating..."
              disabled={clients.length === 0}
            >
              Update
            </SubmitButton>
          </fieldset>
        </div>
      </form>
    </div>
  );
}
