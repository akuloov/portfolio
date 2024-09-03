export default function getCurrentTime(): string {
  const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true, timeZoneName: 'short' };
  return new Date().toLocaleTimeString('en-US', options);
}