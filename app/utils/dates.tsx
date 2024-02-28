export function convertToDate(dateString: string) {
  const parts = dateString.split('/');
  const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
  const date = new Date(formattedDate);
  return date;
}

export function timeToDecimal(time: string) {
  const [hours, minutes] = time.split(':');
  return Number(hours) + Number(minutes) / 60;
}
