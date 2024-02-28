export function formatCurrency(value: number) {
  return new Intl.NumberFormat('nl-BE', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);
}

export function timeDifferenceAsDecimal(startTime, endTime) {
  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);

  const startTotalMinutes = startHours * 60 + startMinutes;
  const endTotalMinutes = endHours * 60 + endMinutes;

  const differenceInMinutes = endTotalMinutes - startTotalMinutes;

  const differenceAsDecimal = differenceInMinutes / 60;

  return differenceAsDecimal;
}

export function decimalToTime(decimal) {
  const hours = Math.floor(decimal);
  const minutes = Math.round((decimal - hours) * 60);

  // Check if there are no minutes
  if (minutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${minutes}min`;
}
