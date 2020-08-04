export default function convertHourToMinutes(time: string): Number {
  const [hour, minutes] = time.split(':').map(Number);

  const timeInMinutes = (hour * 60) + minutes;

  return timeInMinutes;
}