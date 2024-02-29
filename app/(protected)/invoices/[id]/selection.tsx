'use client';

import { format } from 'date-fns';
import { ArrowRight, Calendar, Check } from 'lucide-react';
import { useState } from 'react';
import jsPDF from 'jspdf';
import { decimalToTime, formatCurrency } from '@/app/utils/money';
import { useRouter } from 'next/navigation';
import { Event } from '@/types/events';
import { createClient } from '@/utils/supabase/client';

export default function Selection({
  events,
  user,
  client,
}: {
  events: Event[];
  user: any;
  client: any;
}) {
  const supabase = createClient();
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState<Event[]>([]);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tax, setTax] = useState('');

  function toggleItem(item: Event) {
    if (selectedItems.find((event: Event) => event.id === item.id)) {
      setSelectedItems(
        selectedItems.filter((event: Event) => event.id !== item.id)
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  }

  function toggleSelectAll() {
    if (selectedItems.length === events.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(events);
    }
  }

  async function downloadInvoice() {
    // eslint-disable-next-line new-cap
    const doc = new jsPDF();

    const { data } = await supabase
      .from('invoices')
      .insert({
        client_id: client.id,
        user_id: user.id,
        invoice_id: invoiceNumber,
        issue: issueDate,
        due: dueDate,
        tax: tax,
        total: formatCurrency(
          events.reduce((prev, cur) => prev + cur.timeAsDecimal, 0) *
            client.rate +
            events.reduce((prev, cur) => prev + cur.timeAsDecimal, 0) *
              client.rate *
              (Number(tax) / 100)
        ),
      })
      .select()
      .single();

    if (data) {
      events.forEach(async (item) => {
        await supabase
          .from('events')
          .update({ invoiced: true, linked_invoice: data.id })
          .eq('id', item.id);
      });
      const start = 24;
      const middle = 100;
      const end = 186;

      doc.setFontSize(24);
      doc.text('Invoice', start, 28);
      doc.setFontSize(10.5);

      // Invoice Number
      doc.setTextColor('#000');
      doc.text('Invoice number', start, 40);
      doc.setTextColor('#737373');
      doc.text(invoiceNumber.toString(), start, 45.5);

      // Invoice date
      doc.setTextColor('#000');
      doc.text('Invoice date', start, 56);
      doc.setTextColor('#737373');
      doc.text(format(issueDate, 'dd-MM-yyyy'), start, 61.5);

      // Payment due date
      doc.setTextColor('#000');
      doc.text('Payment due', middle, 56);
      doc.setTextColor('#737373');
      doc.text(format(dueDate, 'dd-MM-yyyy'), middle, 61.5);

      // Divider line
      doc.setDrawColor(209, 213, 219);
      doc.line(start, 69.5, end, 69.5);

      // To
      doc.setTextColor('#000');
      doc.text('To', start, 80.5);
      doc.setTextColor('#737373');
      doc.text(client.name, start, 86);
      doc.text(client.address, start, 91.5);
      doc.text(client.phone, start, 97);
      doc.text(client.email, start, 102.5);

      // From
      doc.setTextColor('#000');
      doc.text('From', middle, 80.5);
      doc.setTextColor('#737373');
      doc.text(user.user_metadata.name, middle, 86);
      doc.text(user.user_metadata.address, middle, 91.5);
      doc.text(user.user_metadata.phone, middle, 97);
      doc.text(user.user_metadata.email, middle, 102.5);

      // BTW
      doc.setTextColor('#000');
      doc.text('BTW number', start, 113);
      doc.setTextColor('#737373');
      doc.text(client.btw, start, 118.5);

      // BTW
      doc.setTextColor('#000');
      doc.text('BTW number', middle, 113);
      doc.setTextColor('#737373');
      doc.text(user.user_metadata.btw, middle, 118.5);

      // Divider line
      doc.setDrawColor(209, 213, 219);
      doc.line(start, 129.5, end, 129.5);

      // Table background
      doc.setDrawColor(209, 213, 219);
      doc.roundedRect(start, 136.2, 162, 10, 0, 0, 'S');

      // Table header
      doc.setTextColor('#000');
      doc.text('Item', 28, 142.5);
      doc.text('Quantity', 110, 142.5);
      doc.text('Unit price', 135, 142.5);
      doc.text('Amount', 182, 142.5, { align: 'right' });
      doc.setDrawColor(229, 231, 235);

      // Table items
      doc.setTextColor('#737373');
      doc.text(
        `Hours worked from (${format(
          events.sort((a, b) => {
            const dateA = a.date.split('/').reverse().join('-');
            const dateB = b.date.split('/').reverse().join('-');
            return new Date(dateA).getTime() - new Date(dateB).getTime();
          })[0].date,
          'dd-MM-yyyy'
        )} - ${format(
          events.sort((a, b) => {
            const dateA = a.date.split('/').reverse().join('-');
            const dateB = b.date.split('/').reverse().join('-');
            return new Date(dateA).getTime() - new Date(dateB).getTime();
          })[events.length - 1].date,
          'dd-MM-yyyy'
        )})`,
        28,
        152
      );
      doc.text(
        `${events
          .reduce((prev, cur) => prev + cur.timeAsDecimal, 0)
          .toFixed(2)}`,
        110,
        152
      );
      doc.text(formatCurrency(client.rate), 135, 152);
      doc.text(
        formatCurrency(
          events.reduce((prev, cur) => prev + cur.timeAsDecimal, 0) *
            client.rate
        ),
        182,
        152,
        { align: 'right' }
      );

      // Total excl btw
      doc.setTextColor('#000');
      doc.text('Total excl BTW:', 125, 168);
      doc.setTextColor('#737373');
      doc.text(
        formatCurrency(
          events.reduce((prev, cur) => prev + cur.timeAsDecimal, 0) *
            client.rate
        ),
        182,
        168,
        { align: 'right' }
      );

      // Total btw
      doc.setTextColor('#000');
      doc.text('Total BTW:', 125, 178);
      doc.setTextColor('#737373');
      doc.text(
        `${formatCurrency(
          events.reduce((prev, cur) => prev + cur.timeAsDecimal, 0) *
            client.rate *
            (Number(tax) / 100)
        )}`,
        182,
        178,
        { align: 'right' }
      );

      // Total background
      doc.setDrawColor(209, 213, 219);
      doc.roundedRect(122, 182, 64, 10, 0, 0, 'S');

      // Total
      doc.setTextColor('#000');
      doc.text('Total:', 125, 188);
      doc.setTextColor('#737373');
      doc.text(
        formatCurrency(
          events.reduce((prev, cur) => prev + cur.timeAsDecimal, 0) *
            client.rate +
            events.reduce((prev, cur) => prev + cur.timeAsDecimal, 0) *
              client.rate *
              (Number(tax) / 100)
        ),
        182,
        188,
        { align: 'right' }
      );

      doc.setDrawColor(209, 213, 219);
      doc.line(start, 199, end, 199);

      // Account
      doc.setTextColor('#000');
      doc.text('Account', start, 210);
      doc.setTextColor('#737373');
      doc.text(user.user_metadata.account, start, 215.5);

      // BIC
      doc.setTextColor('#000');
      doc.text('BIC', middle, 210);
      doc.setTextColor('#737373');
      doc.text(user.user_metadata.bic, middle, 215.5);

      // IBAN
      doc.setTextColor('#000');
      doc.text('IBAN', start, 226);
      doc.setTextColor('#737373');
      doc.text(user.user_metadata.iban, start, 231.5);

      // BTW
      doc.setTextColor('#000');
      doc.text('BTW', middle, 226);
      doc.setTextColor('#737373');
      doc.text(user.user_metadata.btw, middle, 231.5);

      doc.addPage();
      doc.setTextColor('#000');
      doc.text('Invoiced events', start, 28);
      doc.setTextColor('#737373');
      let counter = 1;
      events.map((item) => {
        doc.text(
          format(item.date, 'dd/MM/yyyy'),
          start,
          40 + (counter - 1) * 10
        );
        doc.text(item.start, middle, 40 + (counter - 1) * 10);
        doc.text(item.end, middle + 20, 40 + (counter - 1) * 10);
        doc.text(
          decimalToTime(item.timeAsDecimal),
          182,
          40 + (counter - 1) * 10,
          { align: 'right' }
        );

        counter++;

        if (counter > 24) {
          counter = 1;
          doc.addPage();
        }
      });

      return doc.save(`invoice.pdf`);
    }
  }

  return (
    <div>
      <p className="text-lg font-semibold">Document details</p>
      {/*todo/ SHOW CLIENT AS INPUT BUT DISABLED BECAUSE ALREADY CHOSEN*/}
      <div className="mt-4 bg-neutral-50 p-6 rounded-lg">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
          <div className="flex flex-col">
            <label className="text-md" htmlFor="number">
              Invoice number <span className="text-red-500">*</span>
            </label>
            <input
              className="rounded-md disabled:opacity-40 disabled:cursor-not-allowed bg-white border-neutral-300 focus:ring-2 ring-neutral-600 transition  focus:outline-none shadow px-4 mt-2 py-2 bg-inherit border"
              name="number"
              type="text"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-md" htmlFor="number">
              Tax <span className="text-red-500">*</span>
            </label>
            <input
              className="rounded-md disabled:opacity-40 disabled:cursor-not-allowed bg-white border-neutral-300 focus:ring-2 ring-neutral-600 transition  focus:outline-none shadow px-4 mt-2 py-2 bg-inherit border"
              name="tax"
              type="text"
              value={tax}
              onChange={(e) => setTax(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-md" htmlFor="number">
              Issue date <span className="text-red-500">*</span>
            </label>
            <input
              className="rounded-md disabled:opacity-40 disabled:cursor-not-allowed bg-white border-neutral-300 focus:ring-2 ring-neutral-600 transition  focus:outline-none shadow px-4 mt-2 py-2 bg-inherit border"
              name="issue"
              type="date"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-md" htmlFor="number">
              Due date <span className="text-red-500">*</span>
            </label>
            <input
              className="rounded-md disabled:opacity-40 disabled:cursor-not-allowed bg-white border-neutral-300 focus:ring-2 ring-neutral-600 transition  focus:outline-none shadow px-4 mt-2 py-2 bg-inherit border"
              name="due"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-4">
        <p className="text-lg font-semibold">Select events</p>
        <button
          onClick={() => toggleSelectAll()}
          className="hover:underline mt-0.5"
        >
          Select all
        </button>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {events.length === 0 && (
          <div className="py-2">
            <p className="text-neutral-500">
              No events found for this client, start by tracking your time.
            </p>
          </div>
        )}
        {events
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
          .map((event: any) => {
            return (
              <button
                onClick={() => toggleItem(event)}
                key={event.id}
                className="flex items-center gap-4"
              >
                {selectedItems.find((item) => item.id === event.id) ? (
                  <div className="group p-1 rounded bg-neutral-50 border">
                    <Check className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="group p-2 rounded bg-neutral-50 border">
                    <div className="w-2 h-2" />
                  </div>
                )}
                <p>{format(event.date, 'dd/MM/yyyy')}</p>
                <div className="flex items-center gap-2">
                  <p>{event.start}</p>
                  <ArrowRight className="w-4 h-4" />
                  <p>{event.end}</p>
                </div>
              </button>
            );
          })}
      </div>
      <div className="mt-6 flex items-center justify-end">
        <button
          disabled={
            selectedItems.length === 0 ||
            invoiceNumber === '' ||
            dueDate === '' ||
            issueDate === ''
          }
          onClick={() => {
            downloadInvoice();
            router.push('/invoices');
          }}
          className="py-2 flex w-fit px-4 disabled:opacity-40 disabled:cursor-not-allowed text-sm rounded-md no-underline bg-neutral-200 hover:bg-neutral-300 transition"
        >
          Create invoice
        </button>
      </div>
    </div>
  );
}
