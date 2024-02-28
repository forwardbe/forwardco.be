import Button from '@/components/Button';
import Input from '@/components/Input';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export default async function Page() {
  async function addClient(formData: FormData) {
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
      .insert([rawFormData])
      .select();

    if (data) {
      revalidatePath('/clients');
      redirect('/clients');
    }
  }

  return (
    <div>
      <p className="text-lg font-semibold">Create client</p>
      <form action={addClient} className="mt-4 bg-neutral-50 p-6 rounded-lg">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
          <Input label="Name" id="name" required />
          <Input label="Phone" id="phone" required />
          <Input label="Email" id="email" required />
          <Input label="BTW" id="btw" required />
          <div className="col-span-2">
            <Input label="Address" id="address" required />
          </div>
          <Input label="Rate" id="rate" required type="number" step=".01" />
        </div>
        <div className="mt-6 flex items-center justify-end">
          <Button type="submit" as="button">
            Create
          </Button>
        </div>
      </form>
    </div>
  );
}
