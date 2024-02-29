import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Pricing from './pricing';

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

async function getProducts() {
  const supabase = createClient();

  const { data: products } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .eq('prices.active', true)
    .order('metadata->index')
    .order('unit_amount', { referencedTable: 'prices' });

  return products;
}

export default async function Page() {
  const user = await getUser();
  const subscription = await getSubscriptions();
  const products = await getProducts();

  console.log(products)

  return (
    <div>
      <Pricing
        user={user}
        products={products ?? []}
        subscription={subscription}
      />
    </div>
  );
}
