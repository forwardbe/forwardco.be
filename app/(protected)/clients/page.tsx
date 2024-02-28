import { formatCurrency } from '@/app/utils/money';
import Button from '@/components/Button';

const clients = [
  {
    id: 1,
    name: 'John Doe',
    phone: '555-555-5555',
    email: 'jaspervermeulen@icloud.com',
    address: '1234 Main St',
    btw: 'BE1234567890',
    rate: 50,
  },
  {
    id: 2,
    name: 'John Doe',
    phone: '555-555-5555',
    email: 'jaspervermeulen@icloud.com',
    address: '1234 Main St',
    btw: 'BE1234567890',
    rate: 50,
  },
  {
    id: 3,
    name: 'John Doe',
    phone: '555-555-5555',
    email: 'jaspervermeulen@icloud.com',
    address: '1234 Main St',
    btw: 'BE1234567890',
    rate: 50,
  },
  {
    id: 4,
    name: 'John Doe',
    phone: '555-555-5555',
    email: 'jaspervermeulen@icloud.com',
    address: '1234 Main St',
    btw: 'BE1234567890',
    rate: 50,
  },
  {
    id: 5,
    name: 'John Doe',
    phone: '555-555-5555',
    email: 'jaspervermeulen@icloud.com',
    address: '1234 Main St',
    btw: 'BE1234567890',
    rate: 50,
  },
];

export default function Page() {
  return (
    <div>
      <p className="text-lg font-semibold">Clients</p>
      <table className="w-full mt-4">
        <thead className="bg-neutral-100">
          <tr>
            <th className="text-left font-semibold py-4 px-6 rounded-l">
              Name
            </th>
            <th className="text-left font-semibold py-4 px-6">Phone</th>
            <th className="text-left font-semibold py-4 px-6">Email</th>
            <th className="text-left font-semibold py-4 px-6">Address</th>
            <th className="text-left font-semibold py-4 px-6">BTW</th>
            <th className="text-left font-semibold py-4 px-6">Rate</th>
            <th className="text-left font-semibold py-4 px-6 sr-only rounded-r">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id} className="border-b last:border-none">
              <td className="py-4 px-6">{client.name}</td>
              <td className="py-4 px-6">{client.phone}</td>
              <td className="py-4 px-6">{client.email}</td>
              <td className="py-4 px-6">{client.address}</td>
              <td className="py-4 px-6">{client.btw}</td>
              <td className="py-4 px-6">{formatCurrency(client.rate)}</td>
              <td className="py-4 px-6 flex items-center justify-end gap-3">
                <button className="hover:underline">Edit</button>
                <button className="hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 mr-4 flex items-center justify-end">
        <Button as="link" href="/new/client">Add client</Button>
      </div>
    </div>
  );
}
