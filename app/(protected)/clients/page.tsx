import { formatCurrency } from '@/app/utils/money';
import Button from '@/components/Button';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { DeleteButton } from './deleteButton';
import Link from 'next/link';
import SubmitButton from '@/components/SubmitButton';

async function getClients() {
  const supabase = createClient();
  const { data: clients } = await supabase.from('clients').select();
  return clients || [];
}

export default async function Page() {
  const clients = await getClients();

  async function deleteClient(formData: FormData) {
    'use server';

    const supabase = createClient();
    const rawFormData = {
      id: formData.get('id') as string,
    };

    const { data } = await supabase
      .from('clients')
      .delete()
      .eq('id', rawFormData.id)
      .select();

    if (data) {
      revalidatePath('/clients');
    }
  }

  return (
    <div>
      <p className="text-lg font-semibold">Clients</p>
      <table className="w-full mt-4">
        <thead className="bg-neutral-100">
          <tr>
            <th className="text-left font-semibold py-3 text-sm px-6 rounded-l">
              Name
            </th>
            <th className="text-left font-semibold py-3 text-sm px-6">Email</th>
            <th className="text-left font-semibold py-3 text-sm px-6">Phone</th>
            <th className="text-left font-semibold py-3 text-sm px-6">BTW</th>
            <th className="text-left font-semibold py-3 text-sm px-6">Rate</th>
            <th className="text-left font-semibold py-3 text-sm px-6 sr-only rounded-r">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id} className="border-b last:border-none">
              <td className="py-4 px-6 whitespace-nowrap">{client.name}</td>
              <td className="py-4 px-6 whitespace-nowrap">{client.email}</td>
              <td className="py-4 px-6 whitespace-nowrap">{client.phone}</td>
              <td className="py-4 px-6 whitespace-nowrap">{client.btw}</td>
              <td className="py-4 px-6 whitespace-nowrap">
                {formatCurrency(client.rate)}
              </td>
              <td className="py-4 px-6 whitespace-nowrap flex items-center justify-end gap-3">
                <Link href={`/edit/client/${client.id}`} className="hover:underline">Edit</Link>
                <form>
                  <input type="hidden" name="id" value={client.id} />
                  <SubmitButton
                    formAction={deleteClient}
                    pendingText="Deleting..."
                    blank
                  >
                    Delete
                  </SubmitButton>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {clients.length === 0 && (
        <p className="mt-4 ml-6 text-neutral-400">
          No clients yet. Add your first client to get started.
        </p>
      )}
      <div className="mt-4 mr-6 flex items-center justify-end">
        <Button as="link" href="/new/client">
          Add client
        </Button>
      </div>
    </div>
  );
}
