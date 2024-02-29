import Input from '@/components/Input';
import SubmitButton from '@/components/SubmitButton';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import CustomerPortalForm from './customerPortalForm';

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

async function getSubscriptions() {
  const supabase = createClient();

  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .select('*, prices(*, products(*))')
    .in('status', ['trialing', 'active'])
    .maybeSingle();

  return subscription;
}

export default async function Page() {
  const user = await getUser();
  const subscription = await getSubscriptions();

  async function updateAccount(formData: FormData) {
    'use server';

    const supabase = createClient();

    const rawFormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      btw: formData.get('btw') as string,
      address: formData.get('address') as string,
      phone: formData.get('phone') as string,
      iban: formData.get('iban') as string,
      bic: formData.get('bic') as string,
      account: formData.get('account') as string,
    };

    const { data } = await supabase.auth.updateUser({
      data: rawFormData,
    });

    if (data) {
      revalidatePath('/account');
    }
  }

  return (
    <div>
      <p className="text-lg font-semibold">Business info</p>
      <Link href="https://buy.stripe.com/test_6oEbIK7mgeg3dxebII">
        PRO PLAN
      </Link>
      <CustomerPortalForm subscription={subscription} />
      <form className="mt-4 bg-neutral-50 p-6 rounded-lg">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
          <Input
            label="Business name"
            defaultValue={user.user_metadata.name}
            id="name"
            required
          />
          <Input
            label="Business phone"
            id="phone"
            defaultValue={user.user_metadata.phone}
            required
          />
          <Input
            label="Business email"
            id="email"
            defaultValue={user.user_metadata.email}
            required
          />
          <Input
            label="Business btw"
            id="btw"
            defaultValue={user.user_metadata.btw}
            required
          />
          <div className="sm:col-span-2">
            <Input
              label="Business address"
              id="address"
              defaultValue={user.user_metadata.address}
              required
            />
          </div>

          <Input
            label="Account number"
            id="account"
            defaultValue={user.user_metadata.account}
            required
          />
          <Input
            label="IBAN"
            id="iban"
            defaultValue={user.user_metadata.iban}
            required
          />
          <div className="sm:col-span-2">
            <Input
              label="BIC"
              id="bic"
              defaultValue={user.user_metadata.bic}
              required
            />
          </div>
        </div>
        <div className="mt-6 gap-2 flex items-center justify-end">
          <SubmitButton formAction={updateAccount} pendingText="Creating...">
            Update
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
