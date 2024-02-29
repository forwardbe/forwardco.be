import { convertToDate, timeToDecimal } from '@/app/utils/dates';
import clsx from 'clsx';
import {
  format,
  startOfToday,
  startOfWeek,
  endOfWeek,
  add,
  nextMonday,
  previousMonday,
  isToday,
} from 'date-fns';
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Dot,
  Plus,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import ClientFilter from './clientFilter';

async function getEvents(client: number | undefined) {
  const supabase = createClient();

  if (client) {
    const { data: events, error } = await supabase
      .from('events')
      .select(`*, client_id (name)`)
      .eq('client_id', client);

    if (error) {
      return redirect('/calendar');
    }

    return events || [];
  }

  const { data: events, error } = await supabase
    .from('events')
    .select(`*, client_id (name)`);

  if (error) {
    return redirect('/calendar');
  }

  return events || [];
}

async function getClients() {
  const supabase = createClient();
  const { data: clients, error } = await supabase.from('clients').select();

  if (error) {
    return redirect('/clients');
  }

  return clients || [];
}

export default async function Page({ searchParams }: { searchParams: any }) {
  const weekNumberFromUrl = searchParams.week;

  const events = await getEvents(searchParams.client);
  const clients = await getClients();

  let today;
  if (weekNumberFromUrl) {
    today = convertToDate(weekNumberFromUrl);
  } else {
    today = startOfWeek(startOfToday(), { weekStartsOn: 1 });
  }

  const startOfWeekDate = startOfWeek(today, { weekStartsOn: 1 });
  const endOfWeekDate = endOfWeek(today, { weekStartsOn: 1 });

  const week = [
    {
      day: 'Mon',
      date: format(startOfWeekDate, 'dd/MM'),
      dateFull: format(startOfWeekDate, 'dd/MM/yyyy'),
      dateFormat: format(startOfWeekDate, 'yyyy-MM-dd'),
      isToday: isToday(startOfWeekDate),
    },
    {
      day: 'Tue',
      date: format(add(startOfWeekDate, { days: 1 }), 'dd/MM'),
      dateFull: format(add(startOfWeekDate, { days: 1 }), 'dd/MM/yyyy'),
      dateFormat: format(add(startOfWeekDate, { days: 1 }), 'yyyy-MM-dd'),
      isToday: isToday(add(startOfWeekDate, { days: 1 })),
    },
    {
      day: 'Wed',
      date: format(add(startOfWeekDate, { days: 2 }), 'dd/MM'),
      dateFull: format(add(startOfWeekDate, { days: 2 }), 'dd/MM/yyyy'),
      dateFormat: format(add(startOfWeekDate, { days: 2 }), 'yyyy-MM-dd'),
      isToday: isToday(add(startOfWeekDate, { days: 2 })),
    },
    {
      day: 'Thu',
      date: format(add(startOfWeekDate, { days: 3 }), 'dd/MM'),
      dateFull: format(add(startOfWeekDate, { days: 3 }), 'dd/MM/yyyy'),
      dateFormat: format(add(startOfWeekDate, { days: 3 }), 'yyyy-MM-dd'),
      isToday: isToday(add(startOfWeekDate, { days: 3 })),
    },
    {
      day: 'Fri',
      date: format(add(startOfWeekDate, { days: 4 }), 'dd/MM'),
      dateFull: format(add(startOfWeekDate, { days: 4 }), 'dd/MM/yyyy'),
      dateFormat: format(add(startOfWeekDate, { days: 4 }), 'yyyy-MM-dd'),
      isToday: isToday(add(startOfWeekDate, { days: 4 })),
    },
    {
      day: 'Sat',
      date: format(add(startOfWeekDate, { days: 5 }), 'dd/MM'),
      dateFull: format(add(startOfWeekDate, { days: 5 }), 'dd/MM/yyyy'),
      dateFormat: format(add(startOfWeekDate, { days: 5 }), 'yyyy-MM-dd'),
      isToday: isToday(add(startOfWeekDate, { days: 5 })),
      isWeekend: true,
    },
    {
      day: 'Sun',
      date: format(endOfWeekDate, 'dd/MM'),
      dateFull: format(endOfWeekDate, 'dd/MM/yyyy'),
      dateFormat: format(endOfWeekDate, 'yyyy-MM-dd'),
      isToday: isToday(endOfWeekDate),
      isWeekend: true,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Calendar</p>
        <div className="flex gap-2 items-center">
          <div className="flex items-center">
            <Link
              className="hover:bg-neutral-100 p-1.5 rounded"
              href={`?week=${format(previousMonday(today), 'dd/MM/yyyy')}`}
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>
            <Link
              className="hover:bg-neutral-100 p-1.5 rounded"
              href="/calendar"
            >
              <Dot className="w-4 h-4" />
            </Link>
            <Link
              className="hover:bg-neutral-100 p-1.5 rounded"
              href={`?week=${format(nextMonday(today), 'dd/MM/yyyy')}`}
            >
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          {/* <ClientFilter clients={clients} /> */}
        </div>
      </div>
      <div>
        <div className="grid grid-cols-7 mt-4">
          {week.map((day) => (
            <div
              key={day.day}
              className={clsx(
                'border-b border-r first:rounded-l last:rounded-r first:border-l border-t py-3 px-6 flex items-center justify-between',
                day.isWeekend
                  ? 'bg-neutral-100 first:rounded-tl last:rounded-tr'
                  : null,
                day.isToday ? '!pl-4' : null
              )}
            >
              <div className="flex items-center gap-1">
                {day.isToday ? (
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                ) : null}
                <p className="font-semibold text-sm">{day.day}</p>
                <p className={clsx('text-neutral-700 text-sm')}>{day.date}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {week.map((day) => (
            <div key={day.date}>
              {events
                .filter((event) => event.date === day.dateFormat)
                .sort((a, b) => timeToDecimal(a.start) - timeToDecimal(b.start))
                .map((event) => (
                  <Link
                    key={event.id}
                    href={`/edit/event/${event.id}`}
                    className="border-b hover:bg-neutral-100 transition flex last:border-none flex-col  p-4"
                  >
                    <div className="flex items-center gap-1 text-sm">
                      <p>{event.start}</p>
                      <ArrowRight className="w-3 h-3" />
                      <p>{event.end}</p>
                    </div>
                    <div className="flex mt-1 text-sm items-center gap-1 break-words whitespace-nowrap text-ellipsis overflow-hidden">
                      <div>
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <p>{event.client_id.name}</p>
                    </div>
                    {event.invoiced ? (
                      <div className="flex mt-1 text-sm items-center gap-1 break-words whitespace-nowrap text-ellipsis overflow-hidden">
                        <div>
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <p>Invoiced</p>
                      </div>
                    ) : null}
                  </Link>
                ))}
              <div className="flex p-4 items-center group">
                <Link
                  href={`/new/event?date=${day.dateFormat}`}
                  className="text-sm opacity-30 group-hover:opacity-100 transition flex items-center gap-1 bg-neutral-200 rounded-full py-2 px-2 hover:bg-neutral-300"
                >
                  <Plus className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
