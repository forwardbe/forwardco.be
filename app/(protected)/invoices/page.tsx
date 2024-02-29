import { formatCurrency } from '@/app/utils/money';
import SubmitButton from '@/components/SubmitButton';
import { createClient } from '@/utils/supabase/server';
import { format } from 'date-fns';
import Link from 'next/link';
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

async function getClients() {
  const supabase = createClient();
  const { data: clients, error } = await supabase.from('clients').select();

  if (error) {
    return redirect('/clients');
  }

  return clients || [];
}

async function getInvoices() {
  const supabase = createClient();
  const { data: invoices, error } = await supabase
    .from('invoices')
    .select(`*, client_id (name)`)
    .order('created_at', { ascending: false });

  if (error) {
    return redirect('/invoices');
  }

  return invoices;
}

export default async function Page() {
  const user = await getUser();
  const clients = await getClients();
  const invoices = await getInvoices();

  console.log(user.user_metadata.name);

  if (
    user.user_metadata.name === undefined ||
    user.user_metadata.btw === undefined ||
    user.user_metadata.address === undefined ||
    user.user_metadata.phone === undefined ||
    user.user_metadata.email === undefined ||
    user.user_metadata.iban === undefined ||
    user.user_metadata.bic === undefined ||
    user.user_metadata.account === undefined
  ) {
    return (
      <div>
        <p>
          You need to fill in your business info before you can create invoices.
          You can do this on the{' '}
          <Link className="underline" href="/account">
            account page
          </Link>
          .
        </p>
      </div>
    );
  }

  async function startCreatingInvoice(formData: FormData) {
    'use server';
    const rawFormData = {
      client: formData.get('client') as string,
    };
    redirect(`/invoices/${rawFormData.client}`);
  }

  return (
    <div>
      <div>
        <p className="text-lg font-semibold">Create new invoice</p>
        <form className="mt-4 bg-neutral-50 p-6 rounded-lg">
          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            <div className="col-span-2">
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
          </div>
          <div className="mt-6 gap-2 flex items-center justify-end">
            <SubmitButton
              formAction={startCreatingInvoice}
              pendingText="Creating invoice..."
              disabled={clients.length === 0}
            >
              Create invoice
            </SubmitButton>
          </div>
        </form>
        <p className="text-lg font-semibold mt-6">Previous invoices</p>
        <table className="w-full mt-4">
          <thead className="border rounded">
            <tr>
              <th className="text-left font-semibold border-r py-3 text-sm px-6 rounded-l">
                ID
              </th>
              <th className="text-left font-semibold border-r py-3 text-sm px-6">
                Client
              </th>
              <th className="text-left font-semibold border-r py-3 text-sm px-6">
                Issued
              </th>
              <th className="text-left font-semibold py-3 text-sm px-6">
                Due date
              </th>

              <th className="text-left font-semibold py-3 text-sm px-6 sr-only rounded-r">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="border-b last:border-none hover:bg-neutral-100 transition"
              >
                <td className="py-4 px-6 whitespace-nowrap">
                  {invoice.invoice_id}
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  {invoice.client_id.name}
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  {format(invoice.issue, 'dd/MM/yyyy')}
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  {format(invoice.due, 'dd/MM/yyyy')}
                </td>

                <td className="py-4 px-6 whitespace-nowrap flex items-center justify-end gap-3">
                  <Link
                    href={`/invoices/view/${invoice.id}`}
                    className="hover:underline"
                  >
                    View
                  </Link>
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
      </div>
    </div>
  );
}
