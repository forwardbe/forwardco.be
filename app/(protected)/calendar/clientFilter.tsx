'use client';

import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

export default function ClientFilter({ clients }: { clients: any }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const client = searchParams.get('client') || '';

  return (
    <select
      value={client}
      onChange={(e) => {
        router.push(`/calendar?client=${e.target.value}`);
      }}
      className="rounded-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed bg-white border-neutral-300 focus:ring-2 ring-neutral-600 transition focus:outline-none shadow px-4 py-2 bg-inherit border"
    >
      <option value="">All clients</option>
      {clients.map((client: any) => (
        <option key={client.id} value={client.id}>
          {client.name}
        </option>
      ))}
    </select>
  );
}
