import Button from '@/components/Button';
import SubmitButton from '@/components/SubmitButton';
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

async function getClients() {
  const supabase = createClient();
  const { data: clients, error } = await supabase.from('clients').select();

  if (error) {
    return redirect('/clients');
  }

  return clients || [];
}

export default async function Page() {
  const user = await getUser();
  const clients = await getClients();

  if (
    user.user_metadata.name === '' ||
    user.user_metadata.btw === '' ||
    user.user_metadata.address === '' ||
    user.user_metadata.phone === '' ||
    user.user_metadata.email === '' ||
    user.user_metadata.iban === '' ||
    user.user_metadata.bic === '' ||
    user.user_metadata.account === ''
  ) {
    return (
      <div>
        <p>
          You need to fill in your business info before you can create invoices.
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
        <p className="text-lg font-semibold">Invoices</p>
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
      </div>
    </div>
  );
}
