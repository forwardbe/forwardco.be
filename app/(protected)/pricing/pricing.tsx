'use client';

import { getStripe } from '@/utils/stripe/client';
import { checkoutWithStripe } from '@/utils/stripe/server';
import { getErrorRedirect } from '@/utils/helpers';
import { User } from '@supabase/supabase-js';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import clsx from 'clsx';

export default function Pricing({ user, products, subscription }: any) {
  const intervals = Array.from(
    new Set(
      products.flatMap((product: any) =>
        product?.prices?.map((price: any) => price?.interval)
      )
    )
  );
  const router = useRouter();
  const [billingInterval, setBillingInterval] = useState('month');
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const currentPath = usePathname();

  const handleStripeCheckout = async (price: any) => {
    setPriceIdLoading(price.id);

    if (!user) {
      setPriceIdLoading(undefined);
      return router.push('/signin/signup');
    }

    const { errorRedirect, sessionId } = await checkoutWithStripe(
      price,
      currentPath
    );

    if (errorRedirect) {
      setPriceIdLoading(undefined);
      return router.push(errorRedirect);
    }

    if (!sessionId) {
      setPriceIdLoading(undefined);
      return router.push(
        getErrorRedirect(
          currentPath,
          'An unknown error occurred.',
          'Please try again later or contact a system administrator.'
        )
      );
    }

    const stripe = await getStripe();
    stripe?.redirectToCheckout({ sessionId });

    setPriceIdLoading(undefined);
  };

  if (!products.length) {
    return (
      <div>
        <p className="text-lg font-semibold">Pricing</p>
        <p className="mt-4">No pricing found.</p>
      </div>
    );
  } else {
    return (
      <div>
        <p className="text-lg font-semibold">Pricing</p>

        <div>
          {products.map((product: any) => {
            const price = product?.prices?.find(
              (price: any) => price.interval === billingInterval
            );
            if (!price) return null;
            const priceString = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: price.currency!,
              minimumFractionDigits: 0,
            }).format((price?.unit_amount || 0) / 100);
            return (
              <div key={product.id} className="mt-4 grid grid-cols-4 gap-12 border rounded-lg p-6">
                <div>
                  <p>
                    <span>{priceString}</span>
                    <span>/{billingInterval}</span>
                  </p>
                  <h2 className="text-xl mt-1 font-semibold">{product.name}</h2>
                  <button
                    type="button"
                    onClick={() => handleStripeCheckout(price)}
                    className="py-2 mt-6 flex w-fit px-4 disabled:opacity-40 disabled:cursor-not-allowed text-sm rounded-md no-underline bg-neutral-200 hover:bg-neutral-300 transition"
                  >
                    {subscription ? 'Manage' : 'Subscribe'}
                  </button>
                </div>
                <div className="col-span-2">{product.description}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
