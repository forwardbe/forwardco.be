import Input from '@/components/Input';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import SubmitButton from '@/components/SubmitButton';

async function getClient(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('clients')
    .select()
    .eq('id', id)
    .single();

  if (error) {
    return redirect('/clients');
  }

  return data || {};
}

export default async function Page({ params }: { params: { id: string } }) {
  const client = await getClient(params.id);

  async function updateClient(formData: FormData) {
    'use server';

    const supabase = createClient();
    const rawFormData = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      btw: formData.get('btw') as string,
      address: formData.get('address') as string,
      rate: parseFloat(formData.get('rate') as string),
    };

    const { data } = await supabase
      .from('clients')
      .update(rawFormData)
      .eq('id', params.id)
      .select();

    if (data) {
      revalidatePath('/clients');
      redirect('/clients');
    }
  }

  return (
    <div>
      <p className="text-lg font-semibold">Edit client</p>
      <form className="mt-4 bg-neutral-50 p-6 rounded-lg">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
          <Input label="Name" id="name" defaultValue={client.name} required />
          <Input
            label="Phone"
            id="phone"
            defaultValue={client.phone}
            required
          />
          <Input
            label="Email"
            id="email"
            defaultValue={client.email}
            required
          />
          <Input label="BTW" id="btw" defaultValue={client.btw} required />
          <div className="col-span-2">
            <Input
              label="Address"
              defaultValue={client.address}
              id="address"
              required
            />
          </div>
          <Input
            label="Rate"
            id="rate"
            defaultValue={client.rate}
            required
            type="number"
            step=".01"
          />
        </div>
        <div className="mt-6 flex items-center justify-end">
          <SubmitButton
            formAction={updateClient}
            className="bg-neutral-900 text-white rounded-md px-4 py-2 text-foreground mb-2"
            pendingText="Updating..."
          >
            Update
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
