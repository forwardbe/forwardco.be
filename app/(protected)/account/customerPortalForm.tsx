'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { createStripePortal } from '@/utils/stripe/server';
import Link from 'next/link';

export default function CustomerPortalForm({ subscription }: any) {
  const router = useRouter();
  const currentPath = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: subscription?.prices?.currency!,
      minimumFractionDigits: 0,
    }).format((subscription?.prices?.unit_amount || 0) / 100);

  const handleStripePortalRequest = async () => {
    setIsSubmitting(true);
    const redirectUrl = await createStripePortal(currentPath);
    setIsSubmitting(false);
    return router.push(redirectUrl);
  };

  return (
    <div>
      {subscription
        ? `You are currently on the ${subscription?.prices?.products?.name} plan.`
        : 'You are not currently subscribed to any plan.'}
      <div className="flex items-center gap-2 mt-2">
        <div className="">
          {subscription ? (
            <p className="py-2 flex w-fit px-4 disabled:opacity-40 disabled:cursor-not-allowed text-sm rounded-md no-underline bg-neutral-200 hover:bg-neutral-300 transition">
              Your plan: {subscriptionPrice}/{subscription?.prices?.interval}
            </p>
          ) : (
            <Link
              className="py-2 flex w-fit px-4 disabled:opacity-40 disabled:cursor-not-allowed text-sm rounded-md no-underline bg-neutral-200 hover:bg-neutral-300 transition"
              href="/pricing"
            >
              Choose your plan
            </Link>
          )}
        </div>
        <button
          className="py-2 flex w-fit px-4 disabled:opacity-40 disabled:cursor-not-allowed text-sm rounded-md no-underline bg-neutral-200 hover:bg-neutral-300 transition"
          onClick={handleStripePortalRequest}
        >
          Manage plan
        </button>
      </div>
    </div>
  );
}
