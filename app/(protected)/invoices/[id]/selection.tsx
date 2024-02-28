'use client';

import Button from '@/components/Button';
import { format } from 'date-fns';
import { ArrowRight, Calendar, Check } from 'lucide-react';
import { useState } from 'react';
import jsPDF from 'jspdf';
import { decimalToTime, formatCurrency } from '@/app/utils/money';
import { useRouter } from 'next/navigation';

export default function Selection({
  events,
  user,
  client,
}: {
  events: any;
  user: any;
  client: any;
}) {
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState([]);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tax, setTax] = useState('');

  function toggleItem(item) {
    if (selectedItems.find((i) => i.id === item.id)) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
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

  function downloadInvoice() {
    // eslint-disable-next-line new-cap
    const doc = new jsPDF();

    // update invoiced boolean on items
    // items.forEach(async (item) => {
    //   await supabase
    //     .from('events')
    //     .update({ invoiced: true })
    //     .eq('id', item.id);
    // });

    const start = 24;
    const middle = 100;
    const end = 186;

    // Title
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#111827');
    doc.text('Invoice', start, 28);

    doc.setFontSize(10.5);

    // Invoice Number
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#111827');
    doc.text('Invoice number', start, 40);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor('#88909e');
    doc.text(invoiceNumber.toString(), start, 45.5);

    // Invoice date
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#111827');
    doc.text('Invoice date', start, 56);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor('#88909e');
    doc.text(format(issueDate, 'dd-MM-yyyy'), start, 61.5);

    // Payment due date
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#111827');
    doc.text('Payment due', middle, 56);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor('#88909e');
    doc.text(format(dueDate, 'dd-MM-yyyy'), middle, 61.5);

    // Divider line
    doc.setDrawColor(209, 213, 219);
    doc.line(start, 69.5, end, 69.5);

    // To
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#111827');
    doc.text('To', start, 80.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor('#88909e');
    doc.text(client.name, start, 86);
    doc.text(client.address, start, 91.5);
    doc.text(client.phone, start, 97);
    doc.text(client.email, start, 102.5);

    // From
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#111827');
    doc.text('From', middle, 80.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor('#88909e');
    doc.text(user.user_metadata.name, middle, 86);
    doc.text(user.user_metadata.address, middle, 91.5);
    doc.text(user.user_metadata.phone, middle, 97);
    doc.text(user.user_metadata.email, middle, 102.5);

    // BTW
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#111827');
    doc.text('BTW number', start, 113);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor('#88909e');
    doc.text(client.btw, start, 118.5);

    // BTW
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#111827');
    doc.text('BTW number', middle, 113);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor('#88909e');
    doc.text(user.user_metadata.btw, middle, 118.5);

    // Divider line
    doc.line(start, 129.5, end, 129.5);

    // Price bg
    doc.setDrawColor('#F3F4F6');
    doc.setFillColor('#F3F4F6');
    doc.roundedRect(start, 136.2, 162, 10, 1, 1, 'FD');

    // Name
    doc.setTextColor('#111827');
    doc.text('Item', 28, 142.5);
    doc.text('Quantity', 110, 142.5);
    doc.text('Unit price', 135, 142.5);
    doc.text('Amount', 182, 142.5, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    doc.setTextColor('#88909e');
    doc.setDrawColor(229, 231, 235);

    doc.setTextColor('#88909e');
    doc.text(
      `Hours worked from (${format(
        events.sort((a, b) => {
          const dateA = a.date.split('/').reverse().join('-');
          const dateB = b.date.split('/').reverse().join('-');
          return new Date(dateA) - new Date(dateB);
        })[0].date,
        'dd-MM-yyyy'
      )} - ${format(
        events.sort((a, b) => {
          const dateA = a.date.split('/').reverse().join('-');
          const dateB = b.date.split('/').reverse().join('-');
          return new Date(dateA) - new Date(dateB);
        })[events.length - 1].date,
        'dd-MM-yyyy'
      )})`,
      28,
      152
    );
    doc.text(
      `${events.reduce((prev, cur) => prev + cur.timeAsDecimal, 0).toFixed(2)}`,
      110,
      152
    );
    doc.text(formatCurrency(client.rate), 135, 152);
    doc.text(
      formatCurrency(
        events.reduce((prev, cur) => prev + cur.timeAsDecimal, 0) * client.rate
      ),
      182,
      152,
      { align: 'right' }
    );
    doc.setFont('helvetica', 'normal');
    doc.setTextColor('#88909e');
    doc.setDrawColor(229, 231, 235);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#111827');
    doc.text('Total excl BTW:', 125, 175);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor('#9ca3af');
    doc.text(
      formatCurrency(
        events.reduce((prev, cur) => prev + cur.timeAsDecimal, 0) * client.rate
      ),
      180,
      175,
      { align: 'right' }
    );

    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#111827');
    doc.text('Total BTW:', 125, 185);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor('#9ca3af');
    doc.text(
      `${formatCurrency(
        events.reduce((prev, cur) => prev + cur.timeAsDecimal, 0) *
          client.rate *
          (Number(tax) / 100)
      )}`,
      180,
      185,
      { align: 'right' }
    );

    doc.setDrawColor('#F3F4F6');
    doc.setFillColor('#F3F4F6');
    doc.roundedRect(122, 188.5, 62, 10, 1, 1, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#111827');
    doc.text('Total:', 125, 195);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor('#9ca3af');
    doc.text(
      formatCurrency(
        events.reduce((prev, cur) => prev + cur.timeAsDecimal, 0) *
          client.rate +
          events.reduce((prev, cur) => prev + cur.timeAsDecimal, 0) *
            client.rate *
            (Number(tax) / 100)
      ),
      180,
      195,
      { align: 'right' }
    );

    doc.setDrawColor(209, 213, 219);
    doc.line(start, 210, end, 210);

    // Account
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#111827');
    doc.text('Account', start, 220);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor('#88909e');
    doc.text(user.user_metadata.account, start, 225.5);

    // IBAN
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#111827');
    doc.text('IBAN', start, 236);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor('#88909e');
    doc.text(user.user_metadata.iban, start, 241.5);

    // BIC
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#111827');
    doc.text('BIC', middle, 220);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor('#9ca3af');
    doc.text(user.user_metadata.bic, middle, 225.5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#111827');
    doc.text('BTW', middle, 236);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor('#9ca3af');
    doc.text(user.user_metadata.btw, middle, 241.5);

    doc.addPage();
    doc.setFontSize(10.5);
    doc.setTextColor('#111827');

    let counter = 1;
    // eslint-disable-next-line array-callback-return
    events.map((item) => {
      doc.text(item.date, start, 30 + (counter - 1) * 10);
      doc.text(item.start, middle, 30 + (counter - 1) * 10);
      doc.text(item.end, middle + 20, 30 + (counter - 1) * 10);
      doc.text(
        decimalToTime(item.timeAsDecimal),
        182,
        30 + (counter - 1) * 10,
        { align: 'right' }
      );

      // eslint-disable-next-line no-plusplus
      counter++;

      if (counter > 24) {
        counter = 1;
        doc.addPage();
      }
    });

    return doc.save(`invoice.pdf`);
  }

  return (
    <div>
      <p className="text-lg font-semibold">Document details</p>

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
      <div className="mt-6 flex items-center gap-2">
        <p className="text-lg font-semibold">Select events</p>
        <button
          onClick={() => toggleSelectAll()}
          className="hover:underline mt-0.5"
        >
          Select all
        </button>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {events
          .sort((a, b) => new Date(a.date) - new Date(b.date))
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
                <p>{event.client_id.name}</p>
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
