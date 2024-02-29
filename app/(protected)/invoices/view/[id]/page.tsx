import Button from '@/components/Button';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

async function getEventsByInvoiceId(id: string) {
  const supabase = createClient();
  const { data: events, error } = await supabase
    .from('events')
    .select(`*, client_id (name)`)
    .eq('linked_invoice', id)
    .eq('invoiced', true);

  if (error) {
    return redirect('/invoices');
  }

  return events;
}

async function getInvoicebyId(id: string) {
  const supabase = createClient();
  const { data: invoice, error } = await supabase
    .from('invoices')
    .select(`*, client_id (name)`)
    .eq('id', id)
    .single();

  if (error) {
    return redirect('/invoices');
  }

  return invoice;
}

export default async function Page({ params }: { params: { id: string } }) {
  const events = await getEventsByInvoiceId(params.id);
  const invoice = await getInvoicebyId(params.id);

  console.log(events);

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Invoice</p>
        <Button as="button">Download document</Button>
      </div>
      <div className="mt-4">
        <p>Document details</p>
      </div>
      <div className="mt-4 bg-neutral-50 p-6 rounded-lg">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
          <div className="flex flex-col">
            <label className="text-md" htmlFor="number">
              Invoice number <span className="text-red-500">*</span>
            </label>
            <input
              className="rounded-md disabled:cursor-not-allowed bg-white border-neutral-300 focus:ring-2 ring-neutral-600 transition  focus:outline-none shadow px-4 mt-2 py-2 bg-inherit border"
              name="number"
              type="text"
              defaultValue={invoice.invoice_id}
              disabled
            />
          </div>
          <div className="flex flex-col">
            <label className="text-md" htmlFor="number">
              Tax <span className="text-red-500">*</span>
            </label>
            <input
              className="rounded-md disabled:cursor-not-allowed bg-white border-neutral-300 focus:ring-2 ring-neutral-600 transition  focus:outline-none shadow px-4 mt-2 py-2 bg-inherit border"
              name="tax"
              type="text"
              defaultValue={invoice.tax}
              disabled
            />
          </div>
          <div className="flex flex-col">
            <label className="text-md" htmlFor="number">
              Issue date <span className="text-red-500">*</span>
            </label>
            <input
              className="rounded-md disabled:cursor-not-allowed bg-white border-neutral-300 focus:ring-2 ring-neutral-600 transition  focus:outline-none shadow px-4 mt-2 py-2 bg-inherit border"
              name="issue"
              type="date"
              defaultValue={invoice.issue}
              disabled
            />
          </div>
          <div className="flex flex-col">
            <label className="text-md" htmlFor="number">
              Due date <span className="text-red-500">*</span>
            </label>
            <input
              className="rounded-md disabled:cursor-not-allowed bg-white border-neutral-300 focus:ring-2 ring-neutral-600 transition  focus:outline-none shadow px-4 mt-2 py-2 bg-inherit border"
              name="due"
              type="date"
              defaultValue={invoice.due}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <p>Document events</p>
      </div>
      <table className="w-full mt-4">
        <thead className="border rounded">
          <tr>
            <th className="text-left font-semibold border-r py-3 text-sm px-6 rounded-l">
              Date
            </th>

            <th className="text-left font-semibold border-r py-3 text-sm px-6">
              Start
            </th>
            <th className="text-left font-semibold py-3 text-sm px-6">End</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr
              key={event.id}
              className="border-b last:border-none hover:bg-neutral-100 transition"
            >
              <td className="py-4 px-6 whitespace-nowrap">{event.date}</td>

              <td className="py-4 px-6 whitespace-nowrap">{event.start}</td>
              <td className="py-4 px-6 whitespace-nowrap">{event.end}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
